import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function WhatsAppFloat() {
  const url = buildWhatsAppUrl('Hi, I want to rent a laptop');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      <span className="hidden sm:inline-flex bg-white text-secondary-700 text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-secondary-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        Chat with us
      </span>
      <span className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] transition-all duration-200">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.2.6 4.3 1.7 6.2L3 29l7.5-2.1c1.7.9 3.6 1.4 5.5 1.4 6.9 0 12.5-5.6 12.5-12.5C28.5 8.6 22.9 3 16 3zm0 22.9c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.5 1.3 1.3-4.4-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C5.4 10.1 10.1 5.5 16 5.5s10.6 4.6 10.6 10.6S21.9 25.9 16 25.9zm5.9-7.8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.4-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.4-.6.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1-2.6-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-1 .5-1.6 1.6-2.1 4.3.9 7 3 2.8 5.3 3.6 7.2 3.9.9.1 1.8-.1 2.7-.6.6-.3 1.4-1.2 1.4-2.4 0-.9-.4-1.3-.7-1.5z" />
        </svg>
      </span>
    </a>
  );
}

export default WhatsAppFloat;