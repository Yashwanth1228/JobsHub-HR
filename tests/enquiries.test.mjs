import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, validIdempotencyKey, MAX_BODY } from '../src/lib/enquiries-core.mjs';

test('accepts both forms and normalizes optional fields', () => {
  assert.equal(validateEnquiry({ type: 'contact', email: ' a@example.com ', audience: 'Candidate' }).value.email, 'a@example.com');
  assert.equal(validateEnquiry({ type: 'quote', email: 'a@example.com' }).value.message, '');
});
test('rejects missing required fields, invalid email and audience', () => {
  assert.equal(validateEnquiry({ type: 'contact' }).error, 'validation_error');
  assert.ok(validateEnquiry({ type: 'quote', email: 'bad' }).fields.email);
  assert.ok(validateEnquiry({ type: 'contact', email: 'a@example.com', audience: 'Other' }).fields.audience);
});
test('rejects extra fields, honeypots and injection', () => {
  assert.equal(validateEnquiry({ type: 'quote', email: 'a@example.com', extra: 'x' }).error, 'invalid_payload');
  assert.equal(validateEnquiry({ type: 'quote', email: 'a@example.com', website: 'spam' }).error, 'invalid_payload');
  assert.equal(validateEnquiry({ type: 'quote', email: 'a@example.com\nbcc:x@example.com' }).error, 'validation_error');
  assert.equal(validateEnquiry({ type: 'quote', email: 'a@example.com', message: 'x'.repeat(4001) }).error, 'validation_error');
});
test('requires UUID v4 idempotency keys and limits bodies', () => {
  assert.ok(validIdempotencyKey('d4e9e687-7f91-42b8-8fb9-4564be315433'));
  assert.equal(validIdempotencyKey('bad'), false);
  assert.equal(MAX_BODY, 16384);
});
