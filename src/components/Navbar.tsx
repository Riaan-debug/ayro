import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { BrandLogoLink } from './BrandLogo'
import ThemeToggle from './ThemeToggle'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium tracking-wide transition-colors ${
    isActive
      ? 'text-neutral-900 dark:text-white'
      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
  }`

export default function Navbar() {
  const { configured, user } = useAuth()
  const { itemCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogoLink />

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/custom-orders" className={navLinkClass}>
            Custom Orders
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {configured && (
            <NavLink
              to={user ? '/account' : '/login'}
              className={navLinkClass}
            >
              {user ? 'Account' : 'Log in'}
            </NavLink>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={openCart}
            className="relative text-sm font-medium tracking-wide text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            aria-label={`Open cart, ${itemCount} items`}
          >
            Bag
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white dark:bg-white dark:text-neutral-900">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <nav className="flex gap-6 overflow-x-auto border-t border-neutral-100 px-4 py-3 dark:border-neutral-800 md:hidden">
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
        <NavLink to="/custom-orders" className={navLinkClass}>
          Custom
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </nav>
    </header>
  )
}
