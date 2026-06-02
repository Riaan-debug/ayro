import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import PromoBar from './PromoBar'
import ScrollToTop from './ScrollToTop'
import BackToTop from './BackToTop'

export default function Layout() {
  const { pathname } = useLocation()
  const showPromo = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950">
      <ScrollToTop />
      <Navbar />
      {showPromo && <PromoBar />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </div>
  )
}
