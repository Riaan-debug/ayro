import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/ContentContext'

type Props = {
  className?: string
  imageClassName?: string
  showText?: boolean
}

export function BrandLogo({
  className = '',
  imageClassName = 'h-9 w-9 shrink-0 object-contain',
  showText = true,
}: Props) {
  const site = useSite()
  const [logoError, setLogoError] = useState(false)

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {!logoError && (
        <img
          src={site.logo}
          alt={site.logoAlt}
          className={`rounded-md bg-white object-contain ${imageClassName}`}
          width={36}
          height={36}
          onError={() => setLogoError(true)}
        />
      )}
      {showText && (
        <span className="text-xl font-black tracking-tighter uppercase">
          {site.brandName}
        </span>
      )}
    </span>
  )
}

export function BrandLogoLink({
  imageClassName,
  showText = true,
}: {
  imageClassName?: string
  showText?: boolean
}) {
  const site = useSite()

  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 transition opacity-100 hover:opacity-80"
      aria-label={`${site.brandName} home`}
    >
      <BrandLogo imageClassName={imageClassName} showText={showText} />
    </Link>
  )
}
