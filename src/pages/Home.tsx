import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import TrustIcon from '../components/TrustIcon'
import { useProducts, useSite } from '../context/ContentContext'
import { trustSignals } from '../data/site'
import { btnHeroPrimaryClass, btnHeroSecondaryClass, fadeInClass } from '../lib/ui'

export default function Home() {
  const products = useProducts()
  const site = useSite()
  const { hero, story, categoryTiles } = site
  const featured = products.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      <section className="relative flex min-h-[88vh] items-end bg-neutral-900 text-white">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>
          <p className="mt-6 max-w-lg text-sm text-neutral-300 sm:text-base">
            {hero.subcopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className={btnHeroPrimaryClass}>
              Shop Now
            </Link>
            <Link to="/custom-orders" className={btnHeroSecondaryClass}>
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          Shop by category
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {categoryTiles.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="group relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <img
                src={cat.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
              <span className="absolute bottom-4 left-4 text-lg font-black uppercase tracking-tight text-white">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Featured
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Our most-loved tees this season
            </p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 text-sm font-medium underline hover:no-underline"
          >
            View all
          </Link>
        </div>
        <div className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-8">
          {featured.map((product) => (
            <div key={product.id} className="w-[72vw] shrink-0 sm:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-100 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className={`grid gap-12 lg:grid-cols-2 lg:items-center ${fadeInClass}`}>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                {story.title}
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {story.body}
              </p>
              <Link
                to="/about"
                className="mt-6 inline-block text-sm font-semibold uppercase tracking-wider underline hover:no-underline"
              >
                Our story
              </Link>
            </div>
            <img
              src={story.image}
              alt={story.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {site.shippingNote}
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <TrustIcon type={signal.icon} />
              <h3 className="mt-4 text-sm font-bold uppercase tracking-widest">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {signal.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


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

      <section className="bg-neutral-900 px-4 py-16 text-center text-white sm:px-6 lg:py-20">
        <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
          Need Something Custom?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-400">
          Bulk orders, custom graphics, or a design consultation â€” tell us what
          you need and we&apos;ll make it happen.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/custom-orders" className={btnHeroPrimaryClass}>
            Request a Consultation
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-neutral-400 underline hover:text-white hover:no-underline"
          >
            Questions? Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
