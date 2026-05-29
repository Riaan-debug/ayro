import { Link } from 'react-router-dom'
import { btnPrimaryClass } from '../lib/ui'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
        Our Story
      </h1>
      <div className="mt-8 space-y-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          AYRO is a clothing brand built on a simple mission: sell premium
          t-shirts and grow into something people trust. We started with
          essentials — the tees you reach for every day — and we&apos;re building
          toward a full streetwear line with loyal customers and solid quality
          behind every drop.
        </p>
        <p>
          Inspired by brands that do it right, we focus on clean design,
          trustworthy materials, and a shopping experience that feels as good
          as the product. Whether you&apos;re grabbing a staple tee or working
          with us on a custom run, we treat every order like it matters.
        </p>
        <p>
          In the next 6–12 months, we&apos;re growing traffic, expanding
          e-commerce, and adding more automation — but the foundation stays the
          same: a solid website, happy customers, and a manufacturer we stand
          behind.
        </p>
      </div>
      <Link
        to="/shop"
        className={`mt-10 inline-block px-8 ${btnPrimaryClass}`}
      >
        Shop the Collection
      </Link>
    </div>
  )
}
