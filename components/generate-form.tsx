'use client'
import { useState } from 'react'

export function GenerateForm() {
  // === STATE ==================================================================
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // === HANDLERS ===============================================================
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error('Une erreur est survenue')
      setSuccess(true)
    } catch (error) {
      setError('Une erreur est survenue, recommencez plus tard.')
    } finally {
      setEmail('')
      setLoading(false)
    }
  }

  // === RENDER =================================================================

  if (error) return <p className="text-red-500">{error}</p>

  if (success)
    return (
      <p>
        Vous recevrez un email pour confirmer votre demande dans quelques
        minutes.
      </p>
    )

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <p>
        Pour redemander une copie de vos billets, veuillez saisir
        {" l'adresse"} e-mail utilisée lors de votre achat. Si vous avez acheté
        plusieurs billets, vous recevrez un e-mail pour chaque billet après
        validation de votre adresse. Cette fonctionnalité vous permet de
        récupérer facilement vos billets en cas de besoin.
      </p>
      <fieldset>
        <label className="text-msx-magenta" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>

      <div className="flex justify-end">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Générer'}
        </button>
      </div>
    </form>
  )
}
