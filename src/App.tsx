import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SplashIntro from './components/SplashIntro'
import ContentGate from './components/ContentGate'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CustomOrders from './pages/CustomOrders'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <SplashIntro />
      <ContentGate>
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<CheckoutSuccess />} />
        <Route path="custom-orders" element={<CustomOrders />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      </Routes>
      </ContentGate>
    </>
  )
}
