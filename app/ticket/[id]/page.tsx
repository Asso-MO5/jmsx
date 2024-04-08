import { Invoice } from '@/components/Invoice'

export default function Ticket({ params }: { params: { id: string } }) {
  return (
    <main className="relative flex max-w-[512px]  m-auto">
      <Invoice id={params.id} />
    </main>
  )
}
