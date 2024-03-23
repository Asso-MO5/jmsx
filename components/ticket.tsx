import { Modal } from "@/ui/modal";
import { PaypalModal } from "./paypal-form";

export function Ticket() {
  return (
    <Modal
      button={
        <div className="flex items-center gap-1">
          <img src="/icons/ticket.png" alt="ticket" height={16} width={16} />
          inscription
        </div>
      }
    >
      {(onClose) => <PaypalModal onClose={onClose} />}
    </Modal>
  );
}
