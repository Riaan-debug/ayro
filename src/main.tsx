import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ContentProvider } from './context/ContentContext'
import { ThemeProvider } from './context/ThemeContext'
import { mountSplashOverlay, SPLASH_KEY } from './lib/splashIntro'
import './index.css'

document.getElementById('ayro-splash')?.remove()

// Show logo intro immediately — before React loads
mountSplashOverlay()

if (import.meta.env.DEV) {
  ;(window as Window & { resetAyroIntro?: () => void }).resetAyroIntro = () => {
    sessionStorage.removeItem(SPLASH_KEY)
    window.location.reload()
  }
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ContentProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </ContentProvider>
  </BrowserRouter>,
)
