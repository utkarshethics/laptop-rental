import { useEffect, useRef, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle2, ExternalLink, Lock, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import {
  TOKEN_AMOUNT,
  TOKEN_PAYMENT_LINK,
  TokenProduct,
  TokenBooking,
  saveTokenBooking,
  markTokenBookingConfirmed,
  buildBookingConfirmUrl,
  buildKycUrl,
  formatInr,
} from '@/lib/tokenBooking';

type Step = 'details' | 'pay' | 'confirmed';

const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^\d{6}$/;

export function TokenBookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('details');
  const [product, setProduct] = useState<TokenProduct | null>(null);
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const bookingRef = useRef<TokenBooking | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ product: TokenProduct }>).detail;
      if (!detail?.product) return;
      setProduct(detail.product);
      setPhone('');
      setPincode('');
      setError('');
      bookingRef.current = null;
      setStep('details');
      setOpen(true);
    };
    window.addEventListener('token-booking', onOpen);
    return () => window.removeEventListener('token-booking', onOpen);
  }, []);

  const handleProceed = () => {
    if (!product) return;
    const phoneDigits = phone.replace(/\D/g, '');
    const pinDigits = pincode.replace(/\D/g, '');
    if (!PHONE_RE.test(phoneDigits)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    if (!PIN_RE.test(pinDigits)) {
      setError('Enter a valid 6-digit delivery PIN code.');
      return;
    }
    setError('');

    const booking = saveTokenBooking({
      productId: product.id,
      productName: product.name,
      brand: product.brand || '',
      phone: phoneDigits,
      pincode: pinDigits,
      city: product.city,
      amount: TOKEN_AMOUNT,
    });
    bookingRef.current = booking;

    const link = new URL(TOKEN_PAYMENT_LINK);
    link.searchParams.set('contact', phoneDigits);
    window.open(link.toString(), '_blank', 'noopener');

    setStep('pay');
  };

  const handleConfirmPaid = () => {
    if (!bookingRef.current) return;
    markTokenBookingConfirmed(bookingRef.current.id);
    bookingRef.current = { ...bookingRef.current, status: 'confirmed' };
    setStep('confirmed');
  };

  const handleClose = () => setOpen(false);

  const reopenPayment = () => {
    if (!bookingRef.current) return;
    const link = new URL(TOKEN_PAYMENT_LINK);
    link.searchParams.set('contact', bookingRef.current.phone);
    window.open(link.toString(), '_blank', 'noopener');
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Express Booking"
      description="Book at your doorstep for ₹50 — pay rent & deposit after delivery"
      size="md"
      closeOnOverlayClick={step !== 'pay'}
      closeOnEscape={step !== 'pay'}
    >
      {step === 'details' && product && (
        <div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-50 mb-4">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-12 object-contain rounded-md bg-white"
              />
            )}
            <div className="min-w-0">
              <p className="text-caption text-secondary-500 uppercase tracking-wide font-medium">
                {product.brand}
              </p>
              <h3 className="font-semibold text-secondary-900 truncate">{product.name}</h3>
              <p className="text-body-sm text-secondary-500">
                {formatInr(product.monthlyPrice)}/month{product.city ? ` · ${product.city}` : ''}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2.5 border border-secondary-200 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Delivery PIN Code
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="6-digit PIN code"
                value={pincode}
                maxLength={6}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2.5 border border-secondary-200 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {error && <p className="text-sm text-error-600 mb-3">{error}</p>}

          <div className="mb-4 rounded-xl bg-primary-50 border border-primary-100 p-3 space-y-1.5 text-body-sm text-secondary-700">
            <p className="font-medium text-primary-700">
              ₹{TOKEN_AMOUNT} token fee — adjusted in your 1st month rent
            </p>
            <p className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-primary-600" /> 100% refundable or adjusted against your 1st month invoice.
            </p>
            <p className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary-600" /> KYC verification link sent immediately after payment.
            </p>
          </div>

          <button onClick={handleProceed} className="btn-primary w-full justify-center py-3">
            Pay {formatInr(TOKEN_AMOUNT)} & Confirm Booking
          </button>
          <p className="mt-3 text-center text-body-sm text-secondary-500">
            UPI · Cards · NetBanking via secure Razorpay checkout
          </p>
        </div>
      )}

      {step === 'pay' && bookingRef.current && (
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <ExternalLink className="w-7 h-7 text-primary-600" />
          </div>
          <h3 className="text-heading-md font-semibold text-secondary-900 mb-2">
            Complete your ₹{TOKEN_AMOUNT} payment
          </h3>
          <p className="text-body-sm text-secondary-600 mb-2">
            A secure Razorpay payment window opened in a new tab for your booking token.
          </p>
          <p className="text-body-sm font-medium text-secondary-700 mb-6">
            {bookingRef.current.productName} · {formatInr(bookingRef.current.amount)} token
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={handleConfirmPaid} className="btn-primary w-full justify-center py-3">
              I've Paid ₹{TOKEN_AMOUNT} — Confirm Booking
            </button>
            <button onClick={reopenPayment} className="btn-secondary w-full justify-center">
              Reopen Payment Window
            </button>
            <button
              onClick={handleClose}
              className="text-body-sm text-secondary-500 hover:text-secondary-700 underline underline-offset-2"
            >
              Pay later — I'll finish in a while
            </button>
          </div>
        </div>
      )}

      {step === 'confirmed' && bookingRef.current && (
        <div>
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-success-600" />
            </div>
            <h3 className="text-heading-md font-bold text-secondary-900 mb-1">Booking Confirmed</h3>
            <p className="text-body-sm text-secondary-600">
              {bookingRef.current.productName} · ₹{TOKEN_AMOUNT} token received
            </p>
            <p className="text-body-sm text-secondary-500 mt-1">
              Booking ID: {bookingRef.current.id}
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <a
              href={buildBookingConfirmUrl(bookingRef.current)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3"
            >
              <MessageCircle className="w-5 h-5" /> Instant Confirmation on WhatsApp
            </a>
            <a
              href={buildKycUrl(bookingRef.current)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full justify-center py-3"
            >
              <ShieldCheck className="w-5 h-5" /> Upload KYC to Fast-track Delivery
            </a>
          </div>

          <div className="rounded-xl bg-secondary-50 p-3 space-y-1.5 text-body-sm text-secondary-600">
            <p className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-primary-600" /> ₹50 is 100% refundable or adjusted in your 1st month rent.
            </p>
            <p className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary-600" /> Full rent & security deposit collected after KYC verification & delivery schedule.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default TokenBookingModal;