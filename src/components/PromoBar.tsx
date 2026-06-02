import { useSite } from '../context/ContentContext'

export default function PromoBar() {
  const site = useSite()

  return (
    <div className="border-b border-neutral-200 bg-neutral-900 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-neutral-300 dark:border-neutral-800">
      {site.promo}
    </div>
  )
}
