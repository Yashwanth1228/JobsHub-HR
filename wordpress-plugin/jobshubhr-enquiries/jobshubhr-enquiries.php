<?php
/**
 * Plugin Name: JobsHub HR Enquiries
 * Description: Private enquiry storage and notification endpoint.
 * Version: 1.1.0
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

const JOBSHUBHR_ENQUIRIES_VERSION = '1.1.0';
const JOBSHUBHR_ENQUIRIES_CAP = 'submit_jobshubhr_enquiries';

function jobshubhr_table() { global $wpdb; return $wpdb->prefix . 'jobshubhr_enquiries'; }
function jobshubhr_schema() {
 global $wpdb;
 require_once ABSPATH . 'wp-admin/includes/upgrade.php';
 $table = jobshubhr_table();
 $collate = $wpdb->get_charset_collate();
 dbDelta( "CREATE TABLE $table (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  reference char(32) NOT NULL,
  request_key char(64) NOT NULL,
  payload_hash char(64) NOT NULL,
  source varchar(16) NOT NULL,
  name varchar(120) NOT NULL DEFAULT '',
  email varchar(254) NOT NULL,
  phone varchar(32) NOT NULL DEFAULT '',
  audience varchar(16) NOT NULL DEFAULT '',
  message text NOT NULL,
  created_at datetime NOT NULL,
  notification varchar(16) NOT NULL DEFAULT 'pending',
  notified_at datetime DEFAULT NULL,
  PRIMARY KEY  (id),
  UNIQUE KEY request_key (request_key),
  UNIQUE KEY reference (reference),
  KEY source_status (source,notification)
 ) $collate;" );
 $rate_table = $wpdb->prefix . 'jobshubhr_enquiry_limits';
 dbDelta( "CREATE TABLE $rate_table (
  bucket char(64) NOT NULL,
  expires_at bigint(20) unsigned NOT NULL,
  hits int unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY  (bucket),
  KEY expires_at (expires_at)
 ) $collate;" );
 // Do not mark a failed or incomplete migration as installed.
 $indexes = $wpdb->get_results( "SHOW INDEX FROM $table", ARRAY_A );
 $unique = array();
 foreach ( (array) $indexes as $index ) { if ( '0' === (string) $index['Non_unique'] ) { $unique[] = $index['Key_name']; } }
 $rate_exists = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $rate_table ) ) ) === $rate_table;
 if ( $rate_exists && in_array( 'request_key', $unique, true ) && in_array( 'reference', $unique, true ) ) { update_option( 'jobshubhr_enquiries_schema', JOBSHUBHR_ENQUIRIES_VERSION, false ); }
}
register_activation_hook( __FILE__, 'jobshubhr_schema' );
add_action( 'admin_init', function () { if ( get_option( 'jobshubhr_enquiries_schema' ) !== JOBSHUBHR_ENQUIRIES_VERSION ) { jobshubhr_schema(); } } );

function jobshubhr_validate( $data ) {
 if ( ! is_array( $data ) || array_diff( array_keys( $data ), array( 'type', 'email', 'name', 'phone', 'audience', 'message' ) ) ) { return false; }
 foreach ( $data as $value ) { if ( ! is_string( $value ) ) { return false; } }
 $data = wp_parse_args( $data, array( 'type' => '', 'email' => '', 'name' => '', 'phone' => '', 'audience' => '', 'message' => '' ) );
 foreach ( $data as $key => $value ) { $data[ $key ] = trim( $value ); }
 if ( ! in_array( $data['type'], array( 'contact', 'quote' ), true ) || strlen( $data['email'] ) > 254 || ! is_email( $data['email'] ) || preg_match( '/[\r\n]/', $data['email'] . $data['name'] ) || mb_strlen( $data['name'] ) > 120 || mb_strlen( $data['phone'] ) > 32 || mb_strlen( $data['message'] ) > 4000 || ( $data['phone'] && ! preg_match( '/^[0-9()#&+*\s.=-]+$/', $data['phone'] ) ) || ( 'contact' === $data['type'] && ! in_array( $data['audience'], array( 'Candidate', 'Company' ), true ) ) || ( 'quote' === $data['type'] && ( $data['phone'] || $data['audience'] ) ) ) { return false; }
 return $data;
}

function jobshubhr_notify( $id ) {
 global $wpdb;
 $table = jobshubhr_table();
 // Atomic claim prevents concurrent requests or admin retries from sending simultaneously.
 $claimed = $wpdb->query( $wpdb->prepare( "UPDATE $table SET notification='sending' WHERE id=%d AND notification IN ('pending','failed')", $id ) );
 if ( 1 !== $claimed ) { return; }
 $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE id=%d", $id ) );
 $recipient = get_option( 'jobshubhr_enquiries_recipient', '' );
 $sender = get_option( 'jobshubhr_enquiries_sender', '' );
 $ok = false;
 if ( $row && is_email( $recipient ) && is_email( $sender ) && ! preg_match( '/[\r\n]/', $recipient . $sender . $row->email ) ) {
  $body = "Reference: {$row->reference}\nSource: {$row->source}\nName: {$row->name}\nEmail: {$row->email}\nPhone: {$row->phone}\nAudience: {$row->audience}\n\nMessage:\n{$row->message}";
  $ok = wp_mail( $recipient, 'New JobsHub HR enquiry', $body, array( 'From: JobsHub HR <' . $sender . '>', 'Reply-To: ' . $row->email ) );
 }
 $wpdb->update( $table, array( 'notification' => $ok ? 'accepted' : 'failed', 'notified_at' => $ok ? current_time( 'mysql', true ) : null ), array( 'id' => $id ), array( '%s', '%s' ), array( '%d' ) );
}

add_action( 'rest_api_init', function () {
 register_rest_route( 'jobshubhr/v1', '/enquiries', array( 'methods' => 'POST', 'permission_callback' => function () { return current_user_can( JOBSHUBHR_ENQUIRIES_CAP ); }, 'callback' => 'jobshubhr_receive' ) );
 register_rest_route( 'jobshubhr/v1', '/enquiry-limit', array( 'methods' => 'POST', 'permission_callback' => function () { return current_user_can( JOBSHUBHR_ENQUIRIES_CAP ); }, 'callback' => 'jobshubhr_limit_request' ) );
} );

// One atomic fixed-window upsert per bucket. No raw email is persisted.
function jobshubhr_limit_request( WP_REST_Request $request ) {
 global $wpdb;
 if ( get_option( 'jobshubhr_enquiries_schema' ) !== JOBSHUBHR_ENQUIRIES_VERSION ) { return new WP_Error( 'limiter_unavailable', 'Unavailable.', array( 'status' => 503 ) ); }
 $input = $request->get_json_params();
 if ( ! is_array( $input ) || ! isset( $input['scope'] ) || ! in_array( $input['scope'], array( 'global', 'email' ), true ) ) { return new WP_Error( 'invalid_scope', 'Invalid request.', array( 'status' => 400 ) ); }
 $scope = $input['scope'];
 $window = defined( 'JOBSHUBHR_LIMIT_WINDOW' ) ? max( 60, (int) JOBSHUBHR_LIMIT_WINDOW ) : 3600;
 $limit = 'global' === $scope ? ( defined( 'JOBSHUBHR_GLOBAL_LIMIT' ) ? max( 1, (int) JOBSHUBHR_GLOBAL_LIMIT ) : 120 ) : ( defined( 'JOBSHUBHR_EMAIL_LIMIT' ) ? max( 1, (int) JOBSHUBHR_EMAIL_LIMIT ) : 10 );
 $email = isset( $input['email'] ) && is_string( $input['email'] ) ? strtolower( trim( $input['email'] ) ) : '';
 if ( 'email' === $scope && ( ! $email || strlen( $email ) > 254 ) ) { return new WP_Error( 'invalid_email', 'Invalid request.', array( 'status' => 400 ) ); }
 $table = $wpdb->prefix . 'jobshubhr_enquiry_limits';
 $now = time(); $expiry = ( intdiv( $now, $window ) + 1 ) * $window;
 $bucket = hash_hmac( 'sha256', $scope . ':' . ( 'email' === $scope ? $email : 'all' ), wp_salt( 'auth' ) );
 $sql = $wpdb->prepare( "INSERT INTO $table (bucket,expires_at,hits) VALUES (%s,%d,1) ON DUPLICATE KEY UPDATE hits=IF(expires_at<=%d,1,hits+1), expires_at=IF(expires_at<=%d,%d,expires_at)", $bucket, $expiry, $now, $now, $expiry );
 if ( false === $wpdb->query( $sql ) ) { return new WP_Error( 'limiter_unavailable', 'Unavailable.', array( 'status' => 503 ) ); }
 $row = $wpdb->get_row( $wpdb->prepare( "SELECT hits,expires_at FROM $table WHERE bucket=%s", $bucket ) );
 if ( ! $row ) { return new WP_Error( 'limiter_unavailable', 'Unavailable.', array( 'status' => 503 ) ); }
 $wpdb->query( $wpdb->prepare( "DELETE FROM $table WHERE expires_at < %d LIMIT 50", $now - $window ) );
 if ( (int) $row->hits > $limit ) { $response = new WP_REST_Response( array( 'code' => 'rate_limited' ), 429 ); $response->header( 'Retry-After', max( 1, (int) $row->expires_at - $now ) ); return $response; }
 return new WP_REST_Response( array( 'allowed' => true ), 200 );
}
function jobshubhr_receive( WP_REST_Request $request ) {
 global $wpdb;
 if ( get_option( 'jobshubhr_enquiries_schema' ) !== JOBSHUBHR_ENQUIRIES_VERSION ) { return new WP_Error( 'storage_unavailable', 'Storage unavailable.', array( 'status' => 503 ) ); }
 if ( strlen( $request->get_body() ) > 16384 ) { return new WP_Error( 'too_large', 'Request too large.', array( 'status' => 413 ) ); }
 $key = $request->get_header( 'Idempotency-Key' );
 if ( ! preg_match( '/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $key ) ) { return new WP_Error( 'invalid_key', 'Invalid request.', array( 'status' => 400 ) ); }
 $data = jobshubhr_validate( $request->get_json_params() );
 if ( ! $data ) { return new WP_Error( 'invalid_data', 'Invalid request.', array( 'status' => 422 ) ); }
 $key_hash = hash( 'sha256', strtolower( $key ) );
 $payload_hash = hash( 'sha256', wp_json_encode( $data ) );
 $table = jobshubhr_table();
 $reference = bin2hex( random_bytes( 16 ) );
 $inserted = $wpdb->insert( $table, array( 'reference' => $reference, 'request_key' => $key_hash, 'payload_hash' => $payload_hash, 'source' => $data['type'], 'name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'], 'audience' => $data['audience'], 'message' => $data['message'], 'created_at' => current_time( 'mysql', true ), 'notification' => 'pending' ) );
 if ( false === $inserted ) {
  $existing = $wpdb->get_row( $wpdb->prepare( "SELECT id, reference, payload_hash, notification FROM $table WHERE request_key=%s", $key_hash ) );
  if ( ! $existing ) { return new WP_Error( 'storage_unavailable', 'Storage unavailable.', array( 'status' => 503 ) ); }
  if ( ! hash_equals( $existing->payload_hash, $payload_hash ) ) { return new WP_Error( 'conflict', 'Request conflict.', array( 'status' => 409 ) ); }
  return new WP_REST_Response( array( 'reference' => $existing->reference, 'notification' => $existing->notification ), 200 );
 }
 $id = $wpdb->insert_id;
 jobshubhr_notify( $id );
 $status = $wpdb->get_var( $wpdb->prepare( "SELECT notification FROM $table WHERE id=%d", $id ) );
 return new WP_REST_Response( array( 'reference' => $reference, 'notification' => $status ), 'accepted' === $status ? 201 : 202 );
}

add_action( 'admin_menu', function () { add_menu_page( 'Enquiries', 'Enquiries', 'manage_options', 'jobshubhr-enquiries', 'jobshubhr_admin', 'dashicons-email-alt' ); } );
add_action( 'admin_post_jobshubhr_retry', function () {
 if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Forbidden', 403 ); }
 $id = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
 check_admin_referer( 'jobshubhr_retry_' . $id );
 jobshubhr_notify( $id );
 wp_safe_redirect( admin_url( 'admin.php?page=jobshubhr-enquiries&detail=' . $id ) ); exit;
} );
add_action( 'admin_post_jobshubhr_settings', function () {
 if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Forbidden', 403 ); }
 check_admin_referer( 'jobshubhr_settings' );
 foreach ( array( 'recipient', 'sender' ) as $field ) {
  $value = isset( $_POST[ $field ] ) ? trim( wp_unslash( $_POST[ $field ] ) ) : '';
  if ( ! is_email( $value ) || preg_match( '/[\r\n]/', $value ) ) { wp_die( 'Enter valid email addresses.' ); }
  update_option( 'jobshubhr_enquiries_' . $field, $value, false );
 }
 wp_safe_redirect( admin_url( 'admin.php?page=jobshubhr-enquiries' ) ); exit;
} );
function jobshubhr_admin() {
 if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Forbidden', 403 ); }
 global $wpdb; $table = jobshubhr_table();
 echo '<div class="wrap"><h1>Enquiries</h1><p>Accepted means the mailer accepted the request; it does not confirm inbox delivery. Inspect pending, sending and failed enquiries.</p>';
 echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '"><input type="hidden" name="action" value="jobshubhr_settings">'; wp_nonce_field( 'jobshubhr_settings' );
 foreach ( array( 'recipient' => 'Approved recipient', 'sender' => 'Approved sender' ) as $key => $label ) { echo '<label>' . esc_html( $label ) . ' <input type="email" required name="' . esc_attr( $key ) . '" value="' . esc_attr( get_option( 'jobshubhr_enquiries_' . $key, '' ) ) . '"></label> '; }
 submit_button( 'Save notification settings', 'secondary', 'submit', false ); echo '</form>';
 $detail = isset( $_GET['detail'] ) ? absint( $_GET['detail'] ) : 0;
 if ( $detail ) {
  $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE id=%d", $detail ), ARRAY_A );
  if ( ! $row ) { echo '<p>Enquiry not found.</p></div>'; return; }
  echo '<h2>Enquiry detail</h2><dl>';
  foreach ( array( 'reference', 'source', 'name', 'email', 'phone', 'audience', 'message', 'created_at', 'notification', 'notified_at' ) as $field ) { echo '<dt><strong>' . esc_html( ucfirst( $field ) ) . '</strong></dt><dd>' . nl2br( esc_html( (string) $row[ $field ] ) ) . '</dd>'; }
  echo '</dl>';
  if ( in_array( $row['notification'], array( 'pending', 'failed' ), true ) ) { echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '"><input type="hidden" name="action" value="jobshubhr_retry"><input type="hidden" name="id" value="' . esc_attr( $detail ) . '">'; wp_nonce_field( 'jobshubhr_retry_' . $detail ); submit_button( 'Retry notification' ); echo '</form>'; }
  echo '</div>'; return;
 }
 $source = isset( $_GET['source'] ) ? sanitize_key( wp_unslash( $_GET['source'] ) ) : '';
 $status = isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : '';
 $where = array( '1=1' ); $params = array();
 if ( in_array( $source, array( 'contact', 'quote' ), true ) ) { $where[] = 'source=%s'; $params[] = $source; }
 if ( in_array( $status, array( 'pending', 'sending', 'failed', 'accepted' ), true ) ) { $where[] = 'notification=%s'; $params[] = $status; }
 $clause = implode( ' AND ', $where ); $page = max( 1, isset( $_GET['paged'] ) ? absint( $_GET['paged'] ) : 1 );
 $sql = "SELECT id, reference, source, name, email, created_at, notification FROM $table WHERE $clause ORDER BY id DESC LIMIT %d OFFSET %d";
 $rows = $wpdb->get_results( $wpdb->prepare( $sql, array_merge( $params, array( 21, ( $page - 1 ) * 20 ) ) ), ARRAY_A );
 echo '<form method="get"><input type="hidden" name="page" value="jobshubhr-enquiries"><label>Source <select name="source"><option value="">All</option>';
 foreach ( array( 'quote' => 'Homepage', 'contact' => 'Contact Us' ) as $value => $label ) { echo '<option value="' . esc_attr( $value ) . '" ' . selected( $source, $value, false ) . '>' . esc_html( $label ) . '</option>'; }
 echo '</select></label> <label>Notification <select name="status"><option value="">All</option>';
 foreach ( array( 'pending', 'sending', 'failed', 'accepted' ) as $value ) { echo '<option value="' . esc_attr( $value ) . '" ' . selected( $status, $value, false ) . '>' . esc_html( ucfirst( $value ) ) . '</option>'; }
 echo '</select></label> <button class="button">Filter</button></form><table class="widefat striped"><thead><tr><th>Reference</th><th>Source</th><th>Name</th><th>Email</th><th>UTC date</th><th>Notification</th></tr></thead><tbody>';
 foreach ( array_slice( $rows, 0, 20 ) as $row ) { echo '<tr><td><a href="' . esc_url( admin_url( 'admin.php?page=jobshubhr-enquiries&detail=' . $row['id'] ) ) . '">' . esc_html( $row['reference'] ) . '</a></td>'; foreach ( array( 'source', 'name', 'email', 'created_at', 'notification' ) as $field ) { echo '<td>' . esc_html( $row[ $field ] ) . '</td>'; } echo '</tr>'; }
 echo '</tbody></table><p>';
 foreach ( array( max( 1, $page - 1 ) => 'Previous', $page + 1 => 'Next' ) as $p => $label ) { if ( ( 'Previous' === $label && $page > 1 ) || ( 'Next' === $label && count( $rows ) > 20 ) ) { echo '<a class="button" href="' . esc_url( add_query_arg( array( 'page' => 'jobshubhr-enquiries', 'paged' => $p, 'source' => $source, 'status' => $status ), admin_url( 'admin.php' ) ) ) . '">' . esc_html( $label ) . '</a> '; } }
 echo '</p></div>';
}
