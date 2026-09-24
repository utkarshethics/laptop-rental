export const LEAD_REPO = 'utkarshethics/leads-db';
export const LEAD_TOKEN = 'PASTE_FINE_GRAINED_LEADS_TOKEN_HERE';
export const BUSINESS_NAME = 'LaptopRent';

export interface LeadPayload {
  name: string;
  phone: string;
  intent: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const title = `[${BUSINESS_NAME}] ${payload.name} — ${payload.phone}`;
  const body = [
    `Business: ${BUSINESS_NAME}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Initial Intent: ${payload.intent}`,
    `Page: ${typeof window !== 'undefined' ? window.location.href : ''}`,
    `Recorded: ${new Date().toISOString()}`,
  ].join('\n\n');

  await fetch(`https://api.github.com/repos/${LEAD_REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LEAD_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, labels: [BUSINESS_NAME] }),
  });
}

export function openWhatsAppLead(intent: string) {
  window.dispatchEvent(new CustomEvent('wa-lead', { detail: { intent } }));
}
