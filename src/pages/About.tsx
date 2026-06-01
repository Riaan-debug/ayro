import { Link } from 'react-router-dom'
import SocialStrip from '../components/SocialStrip'
import { useSite } from '../context/ContentContext'
import { btnPrimaryClass, fadeInClass } from '../lib/ui'

const extraParagraphs = [
  'Inspired by brands that do it right, we focus on clean design, trustworthy materials, and a shopping experience that feels as good as the product. Whether you are grabbing a staple tee or working with us on a custom run, we treat every order like it matters.',
  'We are growing traffic, expanding e-commerce, and adding more automation — but the foundation stays the same: a solid website, happy customers, and quality you can feel in every tee.',
]

export default function About() {
  const { story } = useSite()

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className={`grid gap-12 lg:grid-cols-2 lg:items-start ${fadeInClass}`}>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              {story.title}
            </h1>
            <div className="mt-8 space-y-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
              <p>{story.body}</p>
              {extraParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className={`px-8 ${btnPrimaryClass}`}>
                Shop the Collection
              </Link>
              <Link
                to="/custom-orders"
                className="inline-flex items-center px-4 py-4 text-sm font-semibold uppercase tracking-wider underline hover:no-underline"
              >
                Custom Orders
              </Link>
            </div>
          </div>
          <img
            src={story.image}
            alt={story.imageAlt}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <SocialStrip />
    </>
  )
}
