export const LEAD_WEBHOOK_URL = 'REPLACE_WITH_APPS_SCRIPT_WEB_APP_URL';
export const BUSINESS_NAME = 'LaptopRent';

export function openWhatsAppLead(intent: string) {
  window.dispatchEvent(new CustomEvent('wa-lead', { detail: { intent } }));
}