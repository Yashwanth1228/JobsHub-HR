import { MAX_BODY, validIdempotencyKey, validateEnquiry } from '@/lib/enquiries-core.mjs';

const reply = (data, status, headers = {}) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

export async function POST(request) {
  // Do not enable until staging, edge rate limits and notification recovery are accepted.
  if (process.env.ENQUIRIES_ENABLED !== 'true' || process.env.ENQUIRIES_RATE_LIMIT_VERIFIED !== 'true') return reply({ code: 'unavailable' }, 503);
  let origin, endpoint;
  try {
    origin = new URL(process.env.ENQUIRIES_ALLOWED_ORIGIN);
    const wp = new URL(process.env.ENQUIRIES_WORDPRESS_ORIGIN);
    if (origin.origin !== process.env.ENQUIRIES_ALLOWED_ORIGIN || wp.origin !== process.env.ENQUIRIES_WORDPRESS_ORIGIN || origin.protocol !== 'https:' || wp.protocol !== 'https:' || wp.username || wp.password) throw new Error();
    endpoint = new URL('/wp-json/jobshubhr/v1/enquiries', wp);
  } catch { return reply({ code: 'unavailable' }, 503); }
  if (request.headers.get('origin') !== origin.origin) return reply({ code: 'forbidden' }, 403);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return reply({ code: 'unsupported_media_type' }, 415);
  const key = request.headers.get('idempotency-key');
  if (!validIdempotencyKey(key)) return reply({ code: 'invalid_idempotency_key' }, 400);
  if (!process.env.ENQUIRIES_WP_USER || !process.env.ENQUIRIES_WP_APP_PASSWORD) return reply({ code: 'unavailable' }, 503);
  const length = Number(request.headers.get('content-length') || 0);
  if (!Number.isFinite(length) || length < 0 || length > MAX_BODY) return reply({ code: 'too_large' }, 413);
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ code: 'invalid_payload' }, 400);
    const chunks = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); return reply({ code: 'too_large' }, 413); }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return reply({ code: 'invalid_payload' }, 400); }
  const checked = validateEnquiry(data);
  if (checked.error) return reply({ code: checked.error, ...(checked.fields ? { fields: checked.fields } : {}) }, 422);
  try {
    const response = await fetch(endpoint, { method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(10000), headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key, Authorization: `Basic ${Buffer.from(`${process.env.ENQUIRIES_WP_USER}:${process.env.ENQUIRIES_WP_APP_PASSWORD}`).toString('base64')}` }, body: JSON.stringify(checked.value) });
    const result = await response.json().catch(() => null);
    if ([200, 201, 202].includes(response.status) && result && /^[a-f0-9]{32}$/.test(result.reference) && ['accepted', 'failed', 'pending', 'sending'].includes(result.notification)) return reply({ reference: result.reference, notification: result.notification }, response.status);
    if (response.status === 409) return reply({ code: 'idempotency_conflict' }, 409);
    if (response.status === 422) return reply({ code: 'validation_error' }, 422);
    return reply({ code: 'unavailable' }, 503);
  } catch { return reply({ code: 'unavailable', retry: 'Use the same idempotency key.' }, 503); }
}
