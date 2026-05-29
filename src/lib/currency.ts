/** Store currency — South African Rand */
export const CURRENCY = 'ZAR'
export const LOCALE = 'en-ZA'

/** Free shipping when subtotal meets or exceeds this amount (ZAR) */
export const FREE_SHIPPING_THRESHOLD = 1000

/** Standard shipping fee (ZAR) */
export const SHIPPING_COST = 99

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
