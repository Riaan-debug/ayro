import type { ReactNode } from 'react'

type LegalPageProps = {
  title: string
  children: ReactNode
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight">{title}</h1>
      <div className="prose-legal mt-8 space-y-8 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </div>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-base font-bold uppercase tracking-wide text-neutral-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}
