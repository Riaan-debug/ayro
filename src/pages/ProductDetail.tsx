import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProductBySlugFrom, useProducts, useSite } from '../context/ContentContext'
import { categoryLabels } from '../data/site'
import { formatPrice } from '../lib/currency'
import { btnPrimaryClass } from '../lib/ui'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const products = useProducts()
  const site = useSite()
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlugFrom(products, slug) : undefined
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block underline">
          Back to shop
        </Link>
      </div>
    )
  }

  function handleAddToCart() {
    if (!product) return
    if (!selectedSize) {
      setError('Please select a size.')
      return
    }
    setError('')
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      size: selectedSize,
      quantity,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
        <Link to="/shop" className="hover:text-neutral-900 dark:hover:text-white">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/shop?category=${product.category}`}
          className="hover:text-neutral-900 dark:hover:text-white"
        >
          {categoryLabels[product.category]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={product.images[selectedImage] ?? product.image}
              alt={product.name}
              className="h-full w-full object-contain p-4"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-16 overflow-hidden border-2 bg-neutral-100 dark:bg-neutral-800 ${
                    selectedImage === i
                      ? 'border-neutral-900 dark:border-white'
                      : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            {categoryLabels[product.category]}
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-medium">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest">
              Select Size
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size)
                    setError('')
                  }}
                  className={`min-w-[3rem] border px-4 py-3 text-sm font-medium transition ${
                    selectedSize === size
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                      : 'border-neutral-300 hover:border-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              True-to-size fit. Size up for an oversized look.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest">
              Quantity
            </p>
            <div className="mt-3 inline-flex items-center border border-neutral-300 dark:border-neutral-600">
              <button
                type="button"
                className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center">{quantity}</span>
              <button
                type="button"
                className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className={`mt-8 w-full ${btnPrimaryClass}`}
          >
            Add to Bag
          </button>

          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <p>{site.promo}</p>
            <p>{site.shippingNote}</p>
            <p>Secure checkout at next step. Demo mode — no payment processed yet.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-neutral-200 pt-12 dark:border-neutral-800">
          <h2 className="text-lg font-black uppercase tracking-tight">
            You may also like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
