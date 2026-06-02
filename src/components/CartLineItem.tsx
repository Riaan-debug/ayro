import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/currency'
import type { CartItem } from '../types/product'

type CartLineItemProps = {
  item: CartItem
  variant: 'drawer' | 'checkout'
}

export default function CartLineItem({ item, variant }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const controls = (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-neutral-300 dark:border-neutral-600">
        <button
          type="button"
          className="px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() =>
            updateQuantity(item.productId, item.size, item.quantity - 1)
          }
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>
        <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
        <button
          type="button"
          className="px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() =>
            updateQuantity(item.productId, item.size, item.quantity + 1)
          }
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="text-xs text-neutral-500 underline hover:text-neutral-900 dark:hover:text-white"
        onClick={() => removeItem(item.productId, item.size)}
      >
        Remove
      </button>
    </div>
  )

  if (variant === 'drawer') {
    return (
      <li className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-20 shrink-0 bg-neutral-100 object-cover dark:bg-neutral-800"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-neutral-500">Size {item.size}</p>
            </div>
            <p className="shrink-0 text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
          <div className="mt-3">{controls}</div>
        </div>
      </li>
    )
  }

  return (
    <li className="flex gap-4 text-sm">
      <img
        src={item.image}
        alt=""
        className="h-16 w-14 shrink-0 bg-white object-contain p-1 dark:bg-neutral-800"
      />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium">{item.name}</p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Size {item.size}
            </p>
          </div>
          <span className="shrink-0 font-medium">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
        <div className="mt-3">{controls}</div>
      </div>
    </li>
  )
}
