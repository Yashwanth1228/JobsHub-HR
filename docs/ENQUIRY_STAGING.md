# Enquiry integration: isolated staging checklist

This local implementation has not been installed, activated, or tested in WordPress. Keep both public forms disabled. Use a private staging WordPress with isolated data and a controlled mail sink; do not use production recipients or send production enquiries.

## Architecture and contract

Browser → Next.js `POST /api/enquiries` → authenticated WordPress `POST /wp-json/jobshubhr/v1/enquiries` → plugin-owned WordPress table → `wp_mail()`. Next.js never connects to MariaDB. WordPress keeps its existing Elementor and homepage form data separate.

The Next.js endpoint accepts JSON and an `Idempotency-Key` UUID v4. `contact` requires `email` and `audience` (`Candidate` or `Company`), with optional `name`, `phone`, `message`; `quote` requires `email`, with optional `name` and `message`. Optional `website` must be empty and is a honeypot. Unknown fields fail. Limits: 16 KiB request, 254-character email, 120-character name, 32-character phone, and 4,000-character message. Validate real multilingual inputs on staging; WordPress and Next.js validation can differ.

The `{$wpdb->prefix}jobshubhr_enquiries` table stores reference, SHA-256 request-key and payload hashes, source, name, email, phone, audience, message, UTC creation time, notification status and mailer acceptance time. The unique request key makes concurrent inserts atomic. Idempotency records currently last as long as the enquiry: an approved retention and erasure policy is required. Versioned schema creation uses WordPress `dbDelta`; verify its unique indexes actually exist in staging before use.

Responses: 201 stored and mailer accepted; 202 stored but notification pending, sending or failed; 200 same-key repeat; 409 same key with changed payload; 422 validation; 413 too large; 415 wrong content type; 403 origin mismatch; 503 unavailable or ambiguous. On timeout do not generate a new key: retry the same payload with the same key. `accepted` is not proof of delivery.

## Installation and configuration

1. Back up the isolated staging site. Package the `wordpress-plugin/jobshubhr-enquiries/` directory as a ZIP with the `jobshubhr-enquiries` folder at its root. Install and activate that ZIP **only on authorized staging**. Confirm the table and both unique indexes were created; existing Elementor data must remain untouched.
2. On authorized staging, an administrator can use WP-CLI to create a restricted role: `wp role create jobshubhr_enquiry_service "JobsHub HR enquiry service"`, then `wp cap add jobshubhr_enquiry_service read` and `wp cap add jobshubhr_enquiry_service submit_jobshubhr_enquiries`. Create a dedicated user through WordPress admin and assign that role; create its application password through the user's profile and store it securely without pasting it into command history or source files. The plugin intentionally does not grant the capability automatically. Confirm the account cannot access enquiry admin screens or unrelated privileged endpoints. If WP-CLI is unavailable, have the authorized administrator provision the equivalent role and capability through an approved tool.
3. As an administrator, open Enquiries and configure an approved staging recipient and sender that use a controlled mail sink. Verify server mail transport. Do not enter production addresses in source files.
4. Copy the variable names from `.env.example` into a private local environment file. Set `ENQUIRIES_ALLOWED_ORIGIN` and `ENQUIRIES_WORDPRESS_ORIGIN` to exact HTTPS origins, and configure `ENQUIRIES_WP_USER` and `ENQUIRIES_WP_APP_PASSWORD` privately. The endpoint requires HTTPS even locally; use an authorized HTTPS staging frontend. Never commit environment files or credentials.
5. Keep both flags false initially. Configure and test a **durable** public rate limit across instances at the trusted edge or another approved layer. Only then set `ENQUIRIES_RATE_LIMIT_VERIFIED=true`. It is an assertion, not enforcement. Set `ENQUIRIES_ENABLED=true` only in isolated staging after approval.

## Acceptance checks

- Verify denied anonymous and unauthorized WordPress calls, correct capability, origin restrictions, body limits, honeypot, required fields, invalid values and concurrent duplicate keys.
- Submit controlled contact and quote enquiries to staging only. Confirm records, exact fields, source, admin filtering, pagination, detail escaping, nonce enforcement, and preservation of existing form submissions.
- Verify configured recipient/sender and controlled inbox delivery. Simulate mail failure; check durable `failed` status, operator visibility and authorized manual retry. Test `sending` interruptions: investigate mail logs before any resend. Verify timeouts and same-key retries do not create duplicates.
- Implement and verify dependable abuse prevention, monitoring/alerts, incident ownership, retention/privacy procedures, backups and restoration. Test mobile/desktop and keyboard-accessible frontend states after the forms are wired in a separately approved change.
- A 202 indicates storage, not confirmed email delivery. Do not enable the frontend until the client accepts how pending/failed notifications are detected and recovered. Confirm the operational owner can access records.

## Rollback

Disable `ENQUIRIES_ENABLED`, leave or restore the original WordPress forms and verify their availability. Revoke the dedicated application password if needed. Do not delete the plugin table or enquiry records during rollback; retention and migration require separate authorization. Production installation, activation, DNS and cutover require explicit approval.
