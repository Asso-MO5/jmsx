"use client";
import { useIsMobile } from "@/hooks";
import { dc } from "@/utils/dynamic-classes";
import { useState } from "react";

export function NewsletterForm() {
    const isMobile = useIsMobile(850);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!email || loading) return;
    setLoading(true);
    const response = await fetch("/api/newsletter_sub", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setEmail("");
    setLoading(false);
  }

  return (
    <div className={dc([!isMobile,'absolute inset-y-10 inset-x-0 flex justify-center items-center'] )}>
    <section className="flex items-center p-2 justify-center">
      <form
        className="max-w-[300px] flex flex-col gap-4 m-4 p-3 border-msx-darkBlue border bg-msx-black drop-shadow-[10px_10px_0_rgba(0,0,0,0.7)]"
        onSubmit={handleSubmit}
      >
        <header className="text-center">
          <h2>{`Restez Connecté avec J'MSX !`}</h2>
          <div className="italic">
          {`Rejoignez notre communauté passionnée et soyez les premiers à
            recevoir toutes les informations et annonces importantes concernant
            J'MSX directement dans votre boîte de réception !`}
          </div>
        </header>
        <fieldset>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            autoFocus
          />
        </fieldset>
        {error &&  <div className="text-msx-lightRed text-center">{"Erreur lors de l'inscription"}</div>}
        {success && <div className="text-msx-mediumGreen text-center">Inscription réussie !</div>}
        <button type="submit" className="btn" disabled={success}>
          {loading ? 'Patientez': "S'inscrire"}
        </button>
      </form>
    </section>
    </div>
  );
}
