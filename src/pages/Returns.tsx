import { Link } from 'react-router-dom'
import LegalPage, { LegalSection } from '../components/LegalPage'
import { useSite } from '../context/ContentContext'

export default function Returns() {
  const site = useSite()

  return (
    <LegalPage title="Returns & Refunds">
      <p>
        We want you to love your {site.brandName} gear. If something is not right, here is
        how returns and refunds work for orders placed on our online store.
      </p>

      <LegalSection title="30-day returns">
        <p>
          Unworn items in original condition may be returned within <strong>30 days</strong>{' '}
          of delivery for a refund or exchange, subject to the conditions below.
        </p>
      </LegalSection>

      <LegalSection title="Eligible items">
        <ul className="list-disc space-y-2 pl-5">
          <li>Items must be unworn, unwashed, and free of odours or damage.</li>
          <li>Original tags and packaging should be included where possible.</li>
          <li>Custom-made or personalised orders may not be eligible unless faulty.</li>
          <li>Sale or final-clearance items are returnable only if faulty.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How to start a return">
        <p>
          Email{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-neutral-900 underline hover:no-underline dark:text-white"
          >
            {site.contactEmail}
          </a>{' '}
          with your order reference (from your Paystack confirmation or our reply email),
          the item(s) you wish to return, and the reason. We will confirm next steps and, if
          approved, provide return instructions for shipping within South Africa.
        </p>
        <p>
          You can also reach us via the{' '}
          <Link to="/contact" className="underline hover:no-underline">
            contact form
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          Approved refunds are processed to the original payment method used at checkout.
          Paystack and your bank may take several business days to show the credit on your
          account after we initiate the refund.
        </p>
        <p>
          Original shipping fees are non-refundable unless the return is due to our error or
          a faulty product.
        </p>
      </LegalSection>

      <LegalSection title="Exchanges">
        <p>
          To exchange for a different size or style, contact us with your order details. If
          the replacement item is available, we will guide you through the swap once we
          receive the returned item.
        </p>
      </LegalSection>

      <LegalSection title="Faulty or incorrect items">
        <p>
          If you receive the wrong item or a product with a manufacturing defect, contact us
          within 7 days of delivery with photos. We will arrange a replacement or full refund,
          including reasonable return shipping where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          See also our{' '}
          <Link to="/privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
          . For anything else, email{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-neutral-900 underline hover:no-underline dark:text-white"
          >
            {site.contactEmail}
          </a>
          .
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          Last updated: June 2026
        </p>
      </LegalSection>
    </LegalPage>
  )
}
