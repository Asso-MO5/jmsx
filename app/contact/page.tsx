"use client";
import { useState } from "react";

export default function Page() {
  // === STATES ============================================================
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // === HANDLERS =========================================================
  const handleReset = () => {
    setEmail("");
    setText("");
    setError(false);
    setSuccess(false);
  };

  const handleClean = () => {
    if (error) setError(false);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !text || loading) return;
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ email, text }),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setEmail("");
    setText("");
    setLoading(false);
  };

  // === RENDER ===========================================================

  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-msx-gray italic text-center">
            {
              "Curieux de découvrir l'univers MSX ou intéressé à contribuer en tant qu’exposant ou sponsor ? Contactez-nous via le formulaire ci-dessous. Nous sommes prêts à répondre à vos questions et à explorer les opportunités de collaboration pour cet événement unique."
            }
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="email">Votre Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                value={email}
                onChange={(e) => {
                  handleClean();
                  setEmail(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="text">Votre Message</label>
              <textarea
                name="text"
                id="text"
                className="input"
                rows={text.split("\n").length + 2}
                value={text}
                onChange={(e) => {
                  handleClean();
                  setText(e.target.value);
                }}
              />
            </fieldset>
            {error && (
              <div className="text-msx-lightRed text-center">
                {"Erreur lors de l'inscription"}
              </div>
            )}
            {success && (
              <div className="text-msx-mediumGreen text-center">
                Message envoyé !
              </div>
            )}
            <button
              type="reset"
              className="btn bg-msx-darkRed"
              disabled={loading}
              onClick={handleReset}
            >
              Annuler
            </button>
            <button type="submit" className="btn" disabled={success || loading}>
              {loading ? "Patientez" : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
