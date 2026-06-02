import LegalContent from '../components/LegalContent'
import LegalPage from '../components/LegalPage'
import { useSite } from '../context/ContentContext'

export default function Returns() {
  const site = useSite()

  return (
    <LegalPage title="Returns & Refunds">
      <LegalContent content={site.returnsPolicy} site={site} />
    </LegalPage>
  )
}
