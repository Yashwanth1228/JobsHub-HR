'use client';

import { useRef, useState } from 'react';

// Prepared for a later approved enablement; neither form currently uses this hook.
export default function useEnquirySubmission() {
  const [state, setState] = useState({ status: 'idle', message: '' });
  const attempt = useRef(null);
  async function submit(payload) {
    if (state.status === 'loading') return;
    const fingerprint = JSON.stringify(payload);
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) attempt.current = { fingerprint, key: crypto.randomUUID() };
    setState({ status: 'loading', message: 'Sending enquiry…' });
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': attempt.current.key }, body: fingerprint });
      const result = await response.json();
      if (!response.ok) { setState({ status: 'error', message: result.code === 'validation_error' ? 'Please check your details.' : 'Unable to confirm your enquiry. Please try again or call us.', fields: result.fields }); return; }
      attempt.current = null;
      setState({ status: 'success', message: 'Your enquiry has been received.' });
    } catch { setState({ status: 'error', message: 'Unable to confirm your enquiry. Please try again or call us.' }); }
  }
  return { state, submit };
}
