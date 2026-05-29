import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import type { Product } from '../types/product'

const categories: { value: Product['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'essentials', label: 'Essentials' },
  { value: 'graphics', label: 'Graphics' },
  { value: 'limited', label: 'Limited' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = (searchParams.get('category') ?? 'all') as
    | Product['category']
    | 'all'

  const filtered = useMemo(() => {
    if (category === 'all') return products
    return products.filter((p) => p.category === category)
  }, [category])

  function setCategory(value: Product['category'] | 'all') {
    if (value === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: value })
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
        Shop
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Premium tees — essentials, graphics, and limited drops.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              category === cat.value
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">
          No products in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
