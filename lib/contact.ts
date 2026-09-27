// Central place for outbound contact links used on the /pay page and in the footer.
// Replace these two placeholders with your real handles before deploying.

// TODO: INSERT YOUR TELEGRAM LINK HERE (e.g. "https://t.me/your_handle")
export const TELEGRAM_URL = 'https://t.me/nottsilencee'

// TODO: INSERT YOUR WHATSAPP NUMBER HERE (international format, digits only, e.g. "15551234567")
export const WHATSAPP_NUMBER = '+37127099333'

export function telegramLink(prefilledMessage: string): string {
  return `${TELEGRAM_URL}?text=${encodeURIComponent(prefilledMessage)}`
}

export function whatsappLink(prefilledMessage: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`
}
