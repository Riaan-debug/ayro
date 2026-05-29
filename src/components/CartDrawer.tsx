import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/currency'
import { btnPrimaryClass } from '../lib/ui'

export default function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart()

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
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 shrink-0 bg-neutral-100 object-cover dark:bg-neutral-800"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-neutral-500">
                          Size {item.size}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-600">
                        <button
                          type="button"
                          className="px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-neutral-500 underline hover:text-neutral-900 dark:hover:text-white"
                        onClick={() =>
                          removeItem(item.productId, item.size)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
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
