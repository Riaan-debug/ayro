import { useSite } from '../context/ContentContext'

export default function SocialStrip() {
  const site = useSite()
  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-10 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Follow the drop
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-wider underline hover:no-underline"
            >
              {s.label} · {s.handle}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
