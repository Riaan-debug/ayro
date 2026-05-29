import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../lib/currency'
import { btnPrimaryClass } from '../lib/ui'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

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
        <span className="text-neutral-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={product.images[selectedImage] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-16 overflow-hidden border-2 ${
                    selectedImage === i
                      ? 'border-neutral-900 dark:border-white'
                      : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">
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
              >
                −
              </button>
              <span className="min-w-[3rem] text-center">{quantity}</span>
              <button
                type="button"
                className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setQuantity((q) => q + 1)}
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

          <p className="mt-4 text-xs text-neutral-500">
            Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}. Secure checkout at next step.
          </p>
        </div>
      </div>
    </div>
  )
}
