'use client';

import { useState } from 'react';
import { validateEnquiry } from '@/lib/enquiries-core.mjs';
import useEnquirySubmission from './useEnquirySubmission';

export default function EnquiryForm({ type, enabled }) {
  const { state, submit } = useEnquirySubmission();
  const [errors, setErrors] = useState({});
  const contact = type === 'contact';
  const inputClass = 'block h-[42px] w-full rounded-[10px] border border-[#777] bg-white px-3 placeholder:text-[#666] placeholder:opacity-100';
  const error = (name) => errors[name] ? <span id={`${type}-${name}-error`} role="alert">{errors[name]}</span> : null;
  const described = (name) => errors[name] ? `${type}-${name}-error` : undefined;
  async function onSubmit(event) {
    event.preventDefault();
    if (!enabled || state.status === 'loading') return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const payload = { type, ...values };
    const result = validateEnquiry(payload);
    if (result.error) { setErrors(result.fields || { form: 'Please check your details.' }); return; }
    setErrors({});
    const outcome = await submit(payload);
    if (outcome?.stored) form.reset();
  }
  return <form onSubmit={onSubmit} noValidate aria-label={contact ? 'Contact us' : 'Get a quote'} className={contact ? 'contact-form' : ''}>
    <div className={contact ? 'contact-fields' : 'grid gap-5'}>
      {contact && <label><span className="contact-sr-only">Name</span><input name="name" placeholder="Name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={described('name')} />{error('name')}</label>}
      {contact && <label><span className="contact-sr-only">Phone Number</span><input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={described('phone')} />{error('phone')}</label>}
      <label className={contact ? 'contact-full' : undefined}><span className="sr-only">{contact ? 'Email' : 'Business Email'} (required)</span><input name="email" type="email" placeholder={contact ? 'Email' : 'Business Email'} autoComplete="email" required className={contact ? undefined : inputClass} aria-invalid={!!errors.email} aria-describedby={described('email')} />{error('email')}</label>
      {!contact && <label><span className="sr-only">Full Name</span><input name="name" placeholder="Full Name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={described('name')} />{error('name')}</label>}
      {contact && <fieldset className="contact-full" aria-describedby={described('audience')}><legend>Select Type</legend><label><input type="radio" name="audience" value="Candidate" required /> Candidate</label><label><input type="radio" name="audience" value="Company" required /> Company</label>{error('audience')}</fieldset>}
      <label className={contact ? 'contact-full' : undefined}><span className="sr-only">Message</span><textarea name="message" placeholder={contact ? 'Message' : 'Share why you are contacting'} rows={4} className={contact ? undefined : 'block h-[112px] w-full rounded-[10px] border border-[#777] bg-white p-3 placeholder:text-[#666] placeholder:opacity-100'} aria-invalid={!!errors.message} aria-describedby={described('message')} />{error('message')}</label>
      <label className="sr-only" aria-hidden="true">Leave this blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className={contact ? 'contact-full' : undefined}><button type="submit" disabled={!enabled || state.status === 'loading'} className={contact ? undefined : 'h-[40px] w-full rounded-[3px] bg-[#b61a00] px-6 text-black sm:w-1/2 disabled:cursor-not-allowed'}>{state.status === 'loading' ? 'Sending…' : contact ? 'Send' : 'Get a quote'}</button></div>
    </div>
    <p role="status" aria-live="polite" className={contact ? 'contact-notice' : 'mt-3 text-sm'}>{!enabled ? 'Online submissions are not yet available. Please call us.' : errors.form || state.message}</p>
  </form>;
}
