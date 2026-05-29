import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, CheckoutLineItem } from '../types/product'

const STORAGE_KEY = 'ayro-cart'

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  getLineItems: () => CheckoutLineItem[]
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  )

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((o) => !o), [])

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const qty = item.quantity ?? 1
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === item.productId && i.size === item.size,
        )
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + qty }
              : i,
          )
        }
        return [...prev, { ...item, quantity: qty }]
      })
      setIsOpen(true)
    },
    [],
  )

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size)),
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, size)
        return
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i,
        ),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => setItems([]), [])

  const getLineItems = useCallback(
    (): CheckoutLineItem[] =>
      items.map((i) => ({
        name: `${i.name} (${i.size})`,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
      })),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getLineItems,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getLineItems,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
