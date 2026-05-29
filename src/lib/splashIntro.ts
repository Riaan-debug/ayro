export const SPLASH_KEY = 'ayro-intro-seen'
export const SPLASH_HOLD_MS = 4000
export const SPLASH_FADE_MS = 900

const LOGO_SRC = '/images/ayro/logo.jpeg'

export function shouldShowSplash(): boolean {
  if (new URLSearchParams(window.location.search).has('intro')) return true
  return !sessionStorage.getItem(SPLASH_KEY)
}

function lockScroll() {
  document.documentElement.classList.add('splash-active')
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.documentElement.classList.remove('splash-active')
  document.body.style.overflow = ''
}

export function mountSplashOverlay(): void {
  if (!shouldShowSplash()) return
  if (document.getElementById('ayro-splash-overlay')) return

  lockScroll()

  const overlay = document.createElement('div')
  overlay.id = 'ayro-splash-overlay'
  overlay.setAttribute('role', 'button')
  overlay.setAttribute('aria-label', 'Enter AYRO store')
  overlay.tabIndex = 0
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:99999',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'justify-content:center',
    'background:#ffffff',
    'cursor:pointer',
    'opacity:1',
    'transition:opacity 900ms ease-in-out',
  ].join(';')

  const img = document.createElement('img')
  img.src = LOGO_SRC
  img.alt = 'AYRO logo'
  img.width = 176
  img.height = 176
  img.decoding = 'sync'
  img.fetchPriority = 'high'
  img.style.cssText =
    'height:11rem;width:11rem;object-fit:contain;opacity:0;transition:opacity 400ms ease-out;'
  img.addEventListener('load', () => {
    img.style.opacity = '1'
  })
  img.addEventListener('error', () => {
    img.style.opacity = '1'
  })

  const hint = document.createElement('p')
  hint.textContent = 'Tap to enter'
  hint.style.cssText =
    'margin-top:2rem;font-size:0.75rem;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:#737373;font-family:Inter,system-ui,sans-serif;'

  overlay.appendChild(img)
  overlay.appendChild(hint)
  document.body.appendChild(overlay)
}

export function dismissSplashOverlay(saveSeen = true): void {
  const overlay = document.getElementById('ayro-splash-overlay')
  if (!overlay) {
    unlockScroll()
    return
  }

  overlay.style.opacity = '0'
  overlay.style.pointerEvents = 'none'

  window.setTimeout(() => {
    overlay.remove()
    unlockScroll()
    if (saveSeen) sessionStorage.setItem(SPLASH_KEY, '1')
  }, SPLASH_FADE_MS)
}
