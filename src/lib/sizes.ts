/** Keep in sync with sanity/schemas/sizeOptions.ts */
export const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'] as const

export function sortSizes(sizes: string[]): string[] {
  const rank = (size: string) => {
    const index = SIZE_ORDER.indexOf(size as (typeof SIZE_ORDER)[number])
    return index === -1 ? SIZE_ORDER.length : index
  }
  return [...sizes].sort((a, b) => rank(a) - rank(b))
}
