'use client'

import { useEffect, useState } from 'react'
import { QrFlash } from './qr-flash'

const LS_KEY = 'jmsx_qr_access'

export function QrAccess() {
  const [password, setPassword] = useState('')
  const [access, setAccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function getAccess(pwd: string) {
    setError('')
    setLoading(true)
    const res = await fetch('/api/qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pwd }),
    })

    setLoading(false)
    if (res.status === 401) {
      setError('Mot de passe incorrect')
      localStorage.removeItem(LS_KEY)
      return
    }

    if (res.ok) setAccess(true)
    setPassword('')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    localStorage.setItem(LS_KEY, password)
    getAccess(password)
  }

  useEffect(() => {
    if (password) return
    const savedPwd = localStorage.getItem(LS_KEY)
    if (!savedPwd) return
    getAccess(savedPwd)
  }, [])

  if (!access)
    return (
      <div className="flex items-center justify-center h-[100dvh] flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Chargement...' : 'Valider'}
          </button>
        </form>
        <div className="text-msx-lightRed">{error}</div>
      </div>
    )

  return <QrFlash />
}
