import { EVENTS, PAID_EVENTS, PaymentInfo, parseEvent, verifySignature } from './razorpay';

export interface Env {
  RAZORPAY_WEBHOOK_SECRET: string;
  LEAD_TOKEN?: string;
  CRM_ON_FAILED?: string;
  BOOKINGS_KV?: KVNamespace;
}

interface BookingRecord {
  event: string;
  contact: string;
  paymentId: string;
  orderId: string;
  linkId: string;
  amount: number;
  currency: string;
  processedAt: string;
}

const BUSINESS = 'LaptopRent';
const CRM_REPO = 'utkarshethics/leads-db';
const ALLOWED = [EVENTS.LINK_PAID, EVENTS.PAYMENT_CAPTURED, EVENTS.PAYMENT_FAILED];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function toRecord(p: PaymentInfo, event: string): BookingRecord {
  return {
    event,
    contact: p.contact,
    paymentId: p.paymentId,
    orderId: p.orderId,
    linkId: p.linkId,
    amount: p.amount,
    currency: p.currency,
    processedAt: new Date().toISOString(),
  };
}

function dedupeKey(p: PaymentInfo, event: string): string {
  return `evt_${event}|${p.paymentId || p.linkId || 'none'}`;
}

async function recordIssue(env: Env, r: BookingRecord): Promise<boolean> {
  const token = env.LEAD_TOKEN || '';
  if (!token) return false;

  const paid = PAID_EVENTS.includes(r.event as (typeof PAID_EVENTS)[number]);
  const amount = `${r.currency} ${(r.amount / 100).toFixed(2)}`;
  const title = paid
    ? `[${BUSINESS}] Token paid — ${r.linkId || r.orderId || r.paymentId} (${amount})`
    : `[${BUSINESS}] Payment FAILED — ${r.linkId || r.orderId || r.paymentId}`;
  const body = [
    `Event: ${r.event}`,
    `Payment ID: ${r.paymentId || 'n/a'}`,
    `Order ID: ${r.orderId || 'n/a'}`,
    `Payment Link: ${r.linkId || 'n/a'}`,
    `Amount: ${amount}`,
    `Customer Contact: ${r.contact || 'n/a'}`,
    `Processed: ${r.processedAt}`,
    paid
      ? 'Follow-up: confirm ₹50 booking token, collect KYC, schedule delivery, then bill full rent + deposit.'
      : 'Follow-up: payment attempt was declined/aborted — re-engage the lead.',
  ].join('\n\n');

  const res = await fetch(`https://api.github.com/repos/${CRM_REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, labels: [BUSINESS] }),
  });
  return res.ok;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/razorpay-webhook') {
      return json({ error: 'Not found' }, 404);
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const raw = await request.text();
    const signature = request.headers.get('X-Razorpay-Signature') || '';

    if (!env.RAZORPAY_WEBHOOK_SECRET) {
      return json({ error: 'Webhook secret not configured' }, 500);
    }
    if (!(await verifySignature(raw, signature, env.RAZORPAY_WEBHOOK_SECRET))) {
      return json({ error: 'Invalid signature' }, 401);
    }

    const parsed = parseEvent(raw);
    if (!parsed || !ALLOWED.includes(parsed.event as (typeof ALLOWED)[number])) {
      return json({ received: true, event: parsed?.event ?? 'unknown' });
    }

    const record = toRecord(parsed.payment, parsed.event);
    const key = dedupeKey(parsed.payment, parsed.event);
    if (env.BOOKINGS_KV && (await env.BOOKINGS_KV.get(key)) !== null) {
      return json({ received: true, event: parsed.event, duplicate: true });
    }

    const isFailure = parsed.event === EVENTS.PAYMENT_FAILED;
    const shouldPublish = !isFailure || env.CRM_ON_FAILED === '1';
    const crmOk = shouldPublish ? await recordIssue(env, record) : false;

    if (env.BOOKINGS_KV) {
      await env.BOOKINGS_KV.put(key, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 30 });
    }

    return json(
      { received: true, event: parsed.event, published: shouldPublish, crmOk },
      shouldPublish && !crmOk ? 202 : 200
    );
  },
};