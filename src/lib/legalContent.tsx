import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { SiteContent } from '../data/site'

const linkClass = 'underline hover:no-underline'
const emailClass = 'font-medium text-neutral-900 underline hover:no-underline dark:text-white'

const tokenPattern =
  /\{\{(brandName|contactEmail|contactPage|privacyPage)\}\}|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

export function renderLegalText(text: string, site: SiteContent): ReactNode[] {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  tokenPattern.lastIndex = 0

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[1]
    if (token === 'brandName') {
      parts.push(site.brandName)
    } else if (token === 'contactEmail') {
      parts.push(
        <a key={`email-${match.index}`} href={`mailto:${site.contactEmail}`} className={emailClass}>
          {site.contactEmail}
        </a>,
      )
    } else if (token === 'contactPage') {
      parts.push(
        <Link key={`contact-${match.index}`} to="/contact" className={linkClass}>
          contact page
        </Link>,
      )
    } else if (token === 'privacyPage') {
      parts.push(
        <Link key={`privacy-${match.index}`} to="/privacy" className={linkClass}>
          Privacy Policy
        </Link>,
      )
    } else if (match[2] && match[3]) {
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {match[2]}
        </a>,
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}
