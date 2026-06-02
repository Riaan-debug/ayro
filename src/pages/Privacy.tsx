import { Link } from 'react-router-dom'
import LegalPage, { LegalSection } from '../components/LegalPage'
import { useSite } from '../context/ContentContext'

export default function Privacy() {
  const site = useSite()

  return (
    <LegalPage title="Privacy Policy">
      <p>
        {site.brandName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
        explains what personal information we collect when you use our website and how we use
        it. By shopping with us or submitting a form, you agree to this policy.
      </p>

      <LegalSection title="Information we collect">
        <p>
          When you place an order, we collect your name, email address, and shipping details
          so we can fulfil and deliver your purchase.
        </p>
        <p>
          When you contact us or request a custom order, we collect the details you submit
          through our forms (name, email, and message content).
        </p>
        <p>
          We may collect basic technical data such as browser type and pages visited to keep
          the site secure and working correctly.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <p>
          We use your information to process orders, respond to enquiries, send order-related
          communication, and improve our store. We do not sell your personal information to
          third parties.
        </p>
      </LegalSection>

      <LegalSection title="Payment processing">
        <p>
          Card and EFT payments are processed by{' '}
          <a
            href="https://paystack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Paystack
          </a>
          . We do not store your full card details on our servers. Paystack handles payment
          data according to their own privacy and security standards.
        </p>
      </LegalSection>

      <LegalSection title="Form submissions">
        <p>
          Contact and custom-order forms may be delivered to us via Formspree or a similar
          service so we can read and reply to your message.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Under applicable South African law, including the Protection of Personal Information
          Act (POPIA), you may request access to, correction of, or deletion of personal
          information we hold about you. Contact us using the details below.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For privacy questions or requests, email{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-neutral-900 underline hover:no-underline dark:text-white"
          >
            {site.contactEmail}
          </a>{' '}
          or visit our{' '}
          <Link to="/contact" className="underline hover:no-underline">
            contact page
          </Link>
          .
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          Last updated: June 2026
        </p>
      </LegalSection>
    </LegalPage>
  )
}
