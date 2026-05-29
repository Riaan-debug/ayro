import { Link } from 'react-router-dom'
import { site } from '../data/site'

const linkHover = 'hover:text-neutral-900 dark:hover:text-white'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-black tracking-tighter uppercase">{site.brandName}</p>
            <p className="mt-3 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
              Premium streetwear built for people who take their style seriously. Trustworthy quality, every time.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li><Link to="/shop" className={linkHover}>All Products</Link></li>
              <li><Link to="/shop?category=essentials" className={linkHover}>Essentials</Link></li>
              <li><Link to="/shop?category=graphics" className={linkHover}>Graphics</Link></li>
              <li><Link to="/shop?category=limited" className={linkHover}>Limited Drops</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li><Link to="/custom-orders" className={linkHover}>Custom Orders</Link></li>
              <li><Link to="/contact" className={linkHover}>Contact Us</Link></li>
              <li><Link to="/about" className={linkHover}>Our Story</Link></li>
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