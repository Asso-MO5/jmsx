import { NewsletterForm, Poster } from '@/components'
import { StickyInfos } from '@/components/sticky-infos'

export default function Home() {
  return (
    <main className="relative">
      <Poster />
      <NewsletterForm />
      <StickyInfos />
    </main>
  )
}
