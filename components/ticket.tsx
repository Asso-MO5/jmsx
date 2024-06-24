import { Modal } from '@/ui/modal'
import { PaypalModal } from './paypal-form'

export function Ticket() {
  return null
  return (
    <Modal
      button={
        <div className="flex items-center gap-1">
          <div className="h-full flex items-center">
            <img
              src="/icons/ticket.png"
              alt="ticket"
              height={16}
              width={16}
              className="w-[16px]"
            />
          </div>
          <div className="leading-0">Billeterie</div>
        </div>
      }
    >
      {(onClose) => <PaypalModal onClose={onClose} />}
    </Modal>
  )
}
