import { PaypalModal } from '@/components/paypal-form'

export default function Ticket() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Inscription
          </h1>
          <PaypalModal />
        </div>
      </div>
    </main>
  )
}
