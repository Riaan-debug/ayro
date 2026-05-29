import type { Product } from '../types/product'
import productsData from './products.json'

export const products: Product[] = productsData as Product[]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export { formatPrice } from '../lib/currency'
