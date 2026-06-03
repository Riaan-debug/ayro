import { ScrollLink } from './ScrollLink'
import { BrandLogoLink } from './BrandLogo'
import { useSite } from '../context/ContentContext'

const linkHover = 'hover:text-neutral-900 dark:hover:text-white'

export default function Footer() {
  const site = useSite()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogoLink imageClassName="h-10 w-10 object-contain" />
            <p className="mt-3 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
              Premium streetwear built for people who take their style seriously. Trustworthy quality, every time.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li><ScrollLink to="/shop" className={linkHover}>All Products</ScrollLink></li>
              <li><ScrollLink to="/shop?category=essentials" className={linkHover}>Essentials</ScrollLink></li>
              <li><ScrollLink to="/shop?category=graphics" className={linkHover}>Graphics</ScrollLink></li>
              <li><ScrollLink to="/shop?category=limited" className={linkHover}>Limited Drops</ScrollLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li><ScrollLink to="/custom-orders" className={linkHover}>Custom Orders</ScrollLink></li>
              <li><ScrollLink to="/contact" className={linkHover}>Contact Us</ScrollLink></li>
              <li><ScrollLink to="/returns" className={linkHover}>Returns & Refunds</ScrollLink></li>
              <li><ScrollLink to="/privacy" className={linkHover}>Privacy Policy</ScrollLink></li>
              <li><ScrollLink to="/about" className={linkHover}>Our Story</ScrollLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">Follow</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              {site.socials.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkHover}>
                    {link.label} · {link.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-8 text-xs text-neutral-500 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
          <p>Free returns on unworn items · {site.shippingNote}</p>
        </div>
      </div>
    </footer>
  )
}
