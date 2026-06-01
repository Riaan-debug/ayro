import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { products as staticProducts } from '../data/products'
import { site as staticSite } from '../data/site'
import {
  fetchSanityContent,
  isSanityConfigured,
} from '../lib/sanity'
import type { SiteContent } from '../data/site'
import type { Product } from '../types/product'

type ContentState = {
  products: Product[]
  site: SiteContent
  loading: boolean
  source: 'static' | 'sanity'
}

const ContentContext = createContext<ContentState>({
  products: staticProducts,
  site: staticSite,
  loading: false,
  source: 'static',
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>({
    products: staticProducts,
    site: staticSite,
    loading: isSanityConfigured(),
    source: 'static',
  })

  useEffect(() => {
    if (!isSanityConfigured()) return

    let cancelled = false

    fetchSanityContent()
      .then(({ products, site }) => {
        if (cancelled) return
        setState({
          products,
          site,
          loading: false,
          source: 'sanity',
        })
      })
      .catch(() => {
        if (cancelled) return
        setState({
          products: staticProducts,
          site: staticSite,
          loading: false,
          source: 'static',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

export function useProducts() {
  return useContext(ContentContext).products
}

export function useSite() {
  return useContext(ContentContext).site
}

export function getProductBySlugFrom(
  products: Product[],
  slug: string,
): Product | undefined {
  return products.find((p) => p.slug === slug)
}
