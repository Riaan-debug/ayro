export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: 'essentials' | 'graphics' | 'limited'
  image: string
  images: string[]
  sizes: string[]
  featured?: boolean
}

export type CartItem = {
  productId: string
  name: string
  slug: string
  image: string
  price: number
  size: string
  quantity: number
}

export type CheckoutLineItem = {
  name: string
  price: number
  quantity: number
  size: string
}
