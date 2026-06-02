import LegalContent from '../components/LegalContent'
import LegalPage from '../components/LegalPage'
import { useSite } from '../context/ContentContext'

export default function Privacy() {
  const site = useSite()

  return (
    <LegalPage title="Privacy Policy">
      <LegalContent content={site.privacyPolicy} site={site} />
    </LegalPage>
  )
}
