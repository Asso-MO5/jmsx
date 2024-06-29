'use client'
import { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'

export function QrFlash() {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  async function checkAccess() {
    if (!data) return
    setLoading(true)
    setError('')
    setMsg('')
    try {
      const res = await fetch('/api/qr', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: data }),
      })

      const jsonRes = (await res.json()) as { error: string; msg: string }

      setError(jsonRes.error)
      setMsg(jsonRes.msg)
    } catch (e) {
      setError('Accès refusé')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) checkAccess()
  }, [data])

  return (
    <div className="flex items-center h-[100dvh] flex-col gap-2 p-5">
      <div className="max-w-[400px] w-full relative mb-5">
        {loading && (
          <p className="text-center inset-0 z-20  text-xl text-msx-cyan absolute  flex justify-center items-center bg-black bg-opacity-50">
            Vérification en cours
          </p>
        )}

        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result) => {
            if (!!result) {
              if (data) return
              // @ts-ignore
              setData(result?.text)
            }
          }}
          className="w-full"
        />

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            // @ts-ignore
            const code = e.target['code'].value as string
            if (code) setData(code)
            // @ts-ignore
            e.target['code'].value = ''
          }}
        >
          <input
            type="text"
            className="input"
            placeholder="code manuel"
            name="code"
            id="code"
          />
          <button type="submit" className="btn" disabled={loading}>
            envoyer
          </button>
          <button type="button" className="btn" onClick={() => setData('')}>
            Effacer
          </button>
        </form>
      </div>
      <p className="text-center text-msx-mediumGreen text-2xl">{msg}</p>
      <p className="text-center text-msx-lightRed text-2xl">{error}</p>
    </div>
  )
}
