import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const core = new URL('../src/lib/enquiries-core.mjs', import.meta.url).href;
const source = (await readFile(new URL('../src/app/api/enquiries/route.js', import.meta.url), 'utf8')).replace('@/lib/enquiries-core.mjs', core);
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const key = 'd4e9e687-7f91-42b8-8fb9-4564be315433';
const payload = { type: 'quote', email: 'a@example.com' };
const request = (data = payload, extra = {}) => new Request('https://frontend.example/api/enquiries', { method: 'POST', headers: { origin: 'https://frontend.example', 'content-type': 'application/json', 'idempotency-key': key, ...extra }, body: typeof data === 'string' ? data : JSON.stringify(data) });

test('API rejects disabled configuration, bad origin and oversized requests; maps upstream results safely', async () => {
  const saved = { ...process.env }; const originalFetch = globalThis.fetch;
  try {
    delete process.env.ENQUIRIES_ENABLED;
    assert.equal((await POST(request())).status, 503);
    Object.assign(process.env, { ENQUIRIES_ENABLED: 'true', ENQUIRIES_RATE_LIMIT_VERIFIED: 'true', ENQUIRIES_ALLOWED_ORIGIN: 'https://frontend.example', ENQUIRIES_WORDPRESS_ORIGIN: 'https://cms.example', ENQUIRIES_WP_USER: 'test', ENQUIRIES_WP_APP_PASSWORD: 'test' });
    assert.equal((await POST(request(payload, { origin: 'https://other.example' }))).status, 403);
    assert.equal((await POST(request('x'.repeat(16385)))).status, 413);
    assert.equal((await POST(request({ type: 'quote', email: 'bad' }))).status, 422);
    globalThis.fetch = async () => new Response(JSON.stringify({ reference: 'a'.repeat(32), notification: 'failed' }), { status: 202 });
    assert.equal((await POST(request())).status, 202);
    globalThis.fetch = async () => new Response('{}', { status: 409 });
    assert.equal((await POST(request())).status, 409);
    globalThis.fetch = async () => new Response('{}', { status: 401 });
    assert.equal((await POST(request())).status, 503);
    globalThis.fetch = async () => { throw new DOMException('timeout', 'TimeoutError'); };
    assert.equal((await POST(request())).status, 503);
  } finally { process.env = saved; globalThis.fetch = originalFetch; }
});
