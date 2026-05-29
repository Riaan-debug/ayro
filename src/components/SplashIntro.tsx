import { useEffect } from 'react'
import { dismissSplashOverlay, SPLASH_HOLD_MS } from '../lib/splashIntro'

/** Wires up timers and click-to-dismiss for the DOM splash created in main.tsx */
export default function SplashIntro() {
  useEffect(() => {
    const overlay = document.getElementById('ayro-splash-overlay')
    if (!overlay) return

    const dismiss = () => dismissSplashOverlay(true)

    overlay.addEventListener('click', dismiss)
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') dismiss()
    })

    const timer = window.setTimeout(dismiss, SPLASH_HOLD_MS)

    return () => {
      overlay.removeEventListener('click', dismiss)
      window.clearTimeout(timer)
    }
  }, [])

  return null
}
