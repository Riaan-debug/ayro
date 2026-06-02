import type { ReactNode } from 'react'
import { useContent } from '../context/ContentContext'
import { isSanityConfigured } from '../lib/sanity'

export default function ContentGate({ children }: { children: ReactNode }) {
  const { loading } = useContent()

  if (loading && isSanityConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white"
            aria-hidden
          />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Loading
          </p>
        </div>
      </div>
    )
  }

  return children
}
