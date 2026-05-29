import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { categoryLabels } from '../data/site'
import { formatPrice } from '../lib/currency'

type Props = {
  product: Product
  variant?: 'default' | 'grid'
}

function sizeRange(sizes: string[]): string {
  if (sizes.length === 0) return ''
  if (sizes.length === 1) return sizes[0]
  return `${sizes[0]}–${sizes[sizes.length - 1]}`
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const isGrid = variant === 'grid'

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {product.category === 'limited' && (
          <span className="absolute left-2 top-2 z-10 bg-neutral-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:bg-white dark:text-neutral-900">
            New
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
            isGrid ? 'object-contain p-3' : 'object-cover'
          }`}
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 group-hover:underline dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {categoryLabels[product.category]}
            {product.sizes.length > 0 && (
              <span className="text-neutral-400 dark:text-neutral-500">
                {' '}
                · {sizeRange(product.sizes)}
              </span>
            )}
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
