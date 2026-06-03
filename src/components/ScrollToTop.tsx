import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollPageToTop } from './ScrollLink'

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    scrollPageToTop()
  }, [pathname, search, hash])

  return null
}
