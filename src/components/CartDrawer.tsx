import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/currency'
import { btnPrimaryClass } from '../lib/ui'
import CartLineItem from './CartLineItem'

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart } = useCart()

  if (!isOpen) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/40"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-neutral-950"
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <h2 className="text-lg font-bold tracking-tight">Your Bag</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-neutral-500">
              Your bag is empty.
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <CartLineItem
                  key={`${item.productId}-${item.size}`}
                  item={item}
                  variant="drawer"
                />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-6 dark:border-neutral-800">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Shipping calculated at checkout.
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className={`mt-4 block w-full text-center ${btnPrimaryClass}`}
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
