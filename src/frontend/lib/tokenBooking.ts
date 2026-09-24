import { WHATSAPP_NUMBER } from './whatsapp';

export const TOKEN_AMOUNT = 50;
export const TOKEN_PAYMENT_LINK =
  import.meta.env.VITE_TOKEN_PAYMENT_LINK ||
  'https://razorpay.com/payment-link/plink_TfrpceYFPIv3Ch';
export const BOOKING_STORAGE_KEY = 'laptoprent_token_bookings';

export interface TokenProduct {
  id: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  monthlyPrice: number;
  city?: string;
}

export type BookingStatus = 'payment_pending' | 'confirmed';

export interface TokenBooking {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  phone: string;
  pincode: string;
  city?: string;
  amount: number;
  status: BookingStatus;
  createdAt: string;
}

export function openTokenBooking(product: TokenProduct) {
  window.dispatchEvent(new CustomEvent('token-booking', { detail: { product } }));
}

export function getTokenBookings(): TokenBooking[] {
  try {
    const raw = localStorage.getItem(BOOKING_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TokenBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveTokenBooking(
  data: Omit<TokenBooking, 'id' | 'status' | 'createdAt'>
): TokenBooking {
  const booking: TokenBooking = {
    ...data,
    id: `tk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    status: 'payment_pending',
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(
    BOOKING_STORAGE_KEY,
    JSON.stringify([booking, ...getTokenBookings()])
  );
  return booking;
}

export function markTokenBookingConfirmed(bookingId: string) {
  const bookings = getTokenBookings();
  if (!bookings.some(b => b.id === bookingId)) return;
  localStorage.setItem(
    BOOKING_STORAGE_KEY,
    JSON.stringify(bookings.map(b => (b.id === bookingId ? { ...b, status: 'confirmed' } : b)))
  );
}

export function buildBookingConfirmUrl(booking: TokenBooking): string {
  const message = [
    `I just paid the \u20B950 booking token for ${booking.productName}.`,
    `Phone: ${booking.phone}`,
    `Delivery PIN: ${booking.pincode}`,
    `${booking.city ? `City: ${booking.city}.` : ''}`,
    `Booking ID: ${booking.id}.`,
    `Please confirm my booking and share the KYC link.`,
  ]
    .filter(Boolean)
    .join(' ');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildKycUrl(booking: TokenBooking): string {
  const message = `Hi! I want to upload my KYC to fast-track delivery of ${booking.productName} (Booking ID: ${booking.id}). Please share the steps.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatInr(amount: number): string {
  return `\u20B9${amount.toLocaleString('en-IN')}`;
}