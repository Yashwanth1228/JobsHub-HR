'use client';

import { useRef, useState } from 'react';

// Prepared for an approved enablement; neither form currently uses this hook.
export default function useEnquirySubmission() {
  const [state, setState] = useState({ status: 'idle', message: '' });
  const attempt = useRef(null);
  const inFlight = useRef(false);
  async function submit(payload) {
    if (inFlight.current) return;
    const fingerprint = JSON.stringify(payload);
    if (attempt.current?.uncertain && attempt.current.fingerprint !== fingerprint) {
      setState({ status: 'error', message: 'The previous submission could not be confirmed. Please retry the same details or call us before submitting changes.' });
      return;
    }
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) attempt.current = { fingerprint, key: crypto.randomUUID(), uncertain: false };
    inFlight.current = true;
    setState({ status: 'loading', message: 'Sending enquiry…' });
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': attempt.current.key }, body: fingerprint });
      const result = await response.json();
      if (!response.ok) {
        attempt.current.uncertain = attempt.current.uncertain || response.status >= 500;
        setState({ status: 'error', message: result.code === 'validation_error' ? 'Please check your details.' : 'Unable to confirm your enquiry. Please try again or call us.', fields: result.fields });
        return;
      }
      if (!/^[a-f0-9]{32}$/.test(result.reference || '') || !['accepted', 'pending', 'sending', 'failed'].includes(result.notification)) throw new Error('Invalid response');
      attempt.current = null;
      const message = result.notification === 'accepted' ? 'Your enquiry has been received.' : 'Your enquiry was saved, but notification is pending. Please call us to ensure we can respond.';
      setState({ status: 'success', message });
      return { stored: true, notification: result.notification };
    } catch {
      attempt.current.uncertain = true;
      setState({ status: 'error', message: 'Unable to confirm your enquiry. Please try again or call us.' });
    } finally { inFlight.current = false; }
  }
  return { state, submit };
}
