import { useEffect, useRef, useState } from 'react';
import { submitLead, BUSINESS_NAME } from '@/lib/lead';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function WhatsAppLeadModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const intentRef = useRef('');

  useEffect(() => {
    const onOpen = (e: Event) => {
      intentRef.current = (e as CustomEvent).detail?.intent || '';
      setError('');
      setName('');
      setPhone('');
      setSubmitting(false);
      setOpen(true);
    };
    window.addEventListener('wa-lead', onOpen);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wa-lead', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setError('Please provide your name and phone number.');
      return;
    }
    setError('');
    setSubmitting(true);

    void submitLead({
      name: trimmedName,
      phone: trimmedPhone,
      intent: intentRef.current || `Inquiry from ${BUSINESS_NAME}`,
    }).catch(() => {
      setSubmitting(false);
    });

    const defaultText = encodeURIComponent(`Hi, my name is ${trimmedName}. I am contacting from ${BUSINESS_NAME}.`);
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultText}`;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      style={{ fontFamily: 'sans-serif' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Connect on WhatsApp"
    >
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-[360px] shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="m-0 text-secondary-900 text-lg font-bold">Connect on WhatsApp</h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-secondary-400 hover:text-secondary-600 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <p className="m-0 mb-4 text-sm text-secondary-500">Enter your details to chat with us directly.</p>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2.5 mb-2.5 border border-secondary-200 rounded-md box-border text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2.5 mb-4 border border-secondary-200 rounded-md box-border text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
        {error && <p className="m-0 mb-3 text-sm text-red-600">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 rounded-md bg-[#25D366] text-white font-bold cursor-pointer hover:bg-[#1eb557] disabled:opacity-60"
        >
          {submitting ? 'Starting chat...' : 'Start Chat'}
        </button>
      </div>
    </div>
  );
}

export default WhatsAppLeadModal;