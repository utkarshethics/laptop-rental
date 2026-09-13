export const WHATSAPP_NUMBER = '919019745931';

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

interface RentalMessageOptions {
  period?: string;
  price?: number;
  city?: string;
}

export function buildRentalMessage(productName: string, options: RentalMessageOptions = {}): string {
  let message = `Hi! I'm interested in renting ${productName}`;
  if (options.period) message += ` on a ${options.period} plan`;
  if (options.price) message += ` at \u20B9${options.price.toLocaleString('en-IN')}`;
  if (options.city) message += ` in ${options.city}`;
  message += `. Please share the availability and next steps.`;
  return message;
}