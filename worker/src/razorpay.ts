export const EVENTS = {
  LINK_PAID: 'payment_link.paid',
  PAYMENT_CAPTURED: 'payment.captured',
  PAYMENT_FAILED: 'payment.failed',
} as const;

export const PAID_EVENTS = [EVENTS.LINK_PAID, EVENTS.PAYMENT_CAPTURED];

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifySignature(
  rawBody: string,
  signature: string,
  secret: string
): Promise<boolean> {
  if (!signature || !secret) return false;
  const computed = await hmacHex(secret, rawBody);
  return constantTimeEqual(computed, signature.toLowerCase());
}

export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function text(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

export interface PaymentInfo {
  paymentId: string;
  orderId: string;
  linkId: string;
  amount: number;
  currency: string;
  contact: string;
  email: string;
}

export function parseEvent(raw: string): { event: string; payment: PaymentInfo } | null {
  try {
    const body = JSON.parse(raw);
    const event = text(body.event);
    if (!event) return null;

    const ent = body.payload?.payment?.entity ?? {};
    const linkEnt = body.payload?.payment_link?.entity ?? {};

    const payment: PaymentInfo = {
      paymentId: text(ent.id),
      orderId: text(ent.order_id) || text(linkEnt.order_id),
      linkId: text(linkEnt.id),
      amount: Number(ent.amount ?? linkEnt.amount ?? 0),
      currency: text(ent.currency ?? linkEnt.currency) || 'INR',
      contact: text(ent.customer?.contact ?? linkEnt.customer?.contact),
      email: text(ent.customer?.email ?? linkEnt.customer?.email),
    };

    return { event, payment };
  } catch {
    return null;
  }
}