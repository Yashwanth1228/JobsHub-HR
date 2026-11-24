export const MAX_BODY = 16384;
const fields = new Set(['type', 'email', 'name', 'phone', 'audience', 'message', 'website']);

export function validateEnquiry(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).some((key) => !fields.has(key))) return { error: 'invalid_payload' };
  if (Object.values(data).some((value) => typeof value !== 'string')) return { error: 'invalid_payload' };
  if (data.website) return { error: 'invalid_payload' };
  const type = data.type;
  const email = (data.email || '').trim();
  const name = (data.name || '').trim();
  const phone = (data.phone || '').trim();
  const message = (data.message || '').trim();
  const audience = data.audience || '';
  const errors = {};
  if (!['contact', 'quote'].includes(type)) errors.type = 'Invalid form type.';
  if (!email || email.length > 254 || /[\r\n]/.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (name.length > 120 || /[\r\n]/.test(name)) errors.name = 'Enter a valid name.';
  if (phone.length > 32 || (phone && !/^[0-9()#&+*\s.=-]+$/.test(phone))) errors.phone = 'Enter a valid phone number.';
  if (message.length > 4000) errors.message = 'Message is too long.';
  if (type === 'contact' && !['Candidate', 'Company'].includes(audience)) errors.audience = 'Select Candidate or Company.';
  if (type === 'quote' && (phone || audience)) errors.type = 'Invalid quote fields.';
  if (Object.keys(errors).length) return { error: 'validation_error', fields: errors };
  return { value: { type, email, name, phone, audience, message } };
}

export function validIdempotencyKey(key) {
  return typeof key === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key);
}
