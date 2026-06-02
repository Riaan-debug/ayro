import type { LegalPageContent } from '../data/site'
import type { SiteContent } from '../data/site'
import { renderLegalText } from '../lib/legalContent'
import { LegalSection } from './LegalPage'

type LegalContentProps = {
  content: LegalPageContent
  site: SiteContent
}

export default function LegalContent({ content, site }: LegalContentProps) {
  return (
    <>
      <p>{renderLegalText(content.intro, site)}</p>

      {content.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{renderLegalText(paragraph, site)}</p>
          ))}
          {section.listItems && section.listItems.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5">
              {section.listItems.map((item) => (
                <li key={item}>{renderLegalText(item, site)}</li>
              ))}
            </ul>
          ) : null}
        </LegalSection>
      ))}

      <p className="text-xs text-neutral-500 dark:text-neutral-500">
        Last updated: {content.lastUpdated}
      </p>
    </>
  )
}
