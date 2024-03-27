"use client";
import { createClient, createServerClient, texts } from "@/utils";
import { loadScript } from "@paypal/paypal-js";
import { cookies } from "next/headers";

import { useEffect, useId, useRef, useState } from "react";

type PaypalModalProps = {
  onClose: () => void;
};

const currency_code = "EUR";
export function PaypalModal({ onClose }: PaypalModalProps) {
  // === STATES ============================================================

  const [seats, setSeats] = useState(1);
  const form = useRef({ seats: 1 });
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const id = "paypal-button-container";

  // === HANDLERS =========================================================

  const handleIncrement = () => {
    const newSeat = seats + 1;
    setSeats(newSeat);
    form.current.seats = newSeat;
  };

  const handleDecrement = () => {
    if (seats === 1) return;
    const newSeat = seats - 1;
    setSeats(newSeat);
    form.current.seats = newSeat;
  };

  const initPaypal = async () => {
    const supabase = createClient();

    // Récupération des données depuis votre base de données
    const test = await supabase.from("seats").select();

    console.log(test?.data);

    if (paypalLoaded) return;
    const paypal = await loadScript({
      clientId: process.env.NEXT_PUBLIC_PAYPAL_API_KEY || "",
      commit: false,
      vault: true,
      locale: "fr_FR",
      currency: currency_code,
      merchantId: process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID,
    });

    if (!paypal?.Buttons || !id) return;

    const container = document.getElementById(id);
    if (container) container.innerHTML = "";

    try {
      await paypal
        .Buttons({
          style: {
            color: "blue",
            shape: "rect",
          },

          createOrder(_data, actions) {
            const amount = 15;

            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code,
                    value: `${amount * form.current.seats}`,
                  },
                },
              ],
            });
          },
          async onApprove(_data, actions) {
            if (!actions.order) return;
            const details = await actions.order.capture();
            //@ts-ignore
            const { payer, id: transaction_id } = details;

            console.log(details);

            await fetch("api/inscription", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                seat_number: form.current.seats,
                transaction_id,
                email: payer?.email_address || "unknown",
                name: payer?.name?.given_name || "unknown",
                lastname: payer?.name?.surname || "unknown",
                status: "paid",
                game_jam: false,
              }),
            });

            onClose();
          },
          onError: (err) => {
            onClose();

            console.error(err);
          },
        })
        .render(`#${id}`);
    } catch (error) {
      console.error("failed to render the PayPal Buttons", error);
    } finally {
      setPaypalLoaded(true);
    }
  };

  // === EFFECTS ==========================================================
  useEffect(() => {
    initPaypal();
  }, []);

  // === RENDER ===========================================================
  return (
    <div className="p-3 flex items-center justify-center">
      <div className="max-w-96 flex flex-col gap-4 justify-center">
        <div className="text-center">{texts.inscription_description}
        PLUSIEURS CHOIX - à implémenter. 
        </div>
        <div className="text-center">{texts.inscription_seat}</div>
        <div className="text-2xl flex justify-between">
          <button type="button" onClick={handleDecrement} className="p-3">
            -
          </button>
          <div className="text-4xl text-msx-darkYellow flex items-center">
            {seats}
          </div>
          <button type="button" onClick={handleIncrement} className="p-3">
            +
          </button>
        </div>
        <div id={id} />
      </div>
    </div>
  );
}
