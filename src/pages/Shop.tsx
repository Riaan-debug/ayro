import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { categoryLabels, site } from '../data/site'
import { btnPrimaryClass } from '../lib/ui'
import type { Product } from '../types/product'

const categories: { value: Product['category'] | 'all'; label: string }[] = [
  { value: 'all', label: categoryLabels.all },
  { value: 'essentials', label: categoryLabels.essentials },
  { value: 'graphics', label: categoryLabels.graphics },
  { value: 'limited', label: categoryLabels.limited },
]

const filterActive =
  'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
const filterInactive =
  'border border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-400'

function categoryHref(value: Product['category'] | 'all'): string {
  return value === 'all' ? '/shop' : `/shop?category=${value}`
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const category = (searchParams.get('category') ?? 'all') as
    | Product['category']
    | 'all'

  const filtered = useMemo(() => {
    if (category === 'all') return products
    return products.filter((p) => p.category === category)
  }, [category])

  const countLabel = useMemo(() => {
    const n = filtered.length
    const word = n === 1 ? 'product' : 'products'
    if (category === 'all') return `${n} ${word}`
    return `${n} ${word} in ${categoryLabels[category]}`
  }, [filtered.length, category])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {site.shop.title}
        </h1>
        <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
          {site.shop.subtitle}
        </p>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
          {site.promo}
        </p>
      </header>

      <div className="sticky top-16 z-30 -mx-4 border-b border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none dark:sm:bg-transparent">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={categoryHref(cat.value)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  category === cat.value ? filterActive : filterInactive
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {countLabel}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            No products in this category yet.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-wider underline hover:no-underline"
          >
            View all products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      )}

      <section className="mt-20 border-t border-neutral-200 pt-12 text-center dark:border-neutral-800">
        <h2 className="text-lg font-black uppercase tracking-tight">
          Need a custom run?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
          Bulk orders, custom graphics, or a design consultation for your crew.
        </p>
        <Link
          to="/custom-orders"
          className={`mt-6 inline-block px-8 ${btnPrimaryClass}`}
        >
          Request Custom Order
        </Link>
      </section>
    </div>
  )
}
