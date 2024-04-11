'use client'
import { useEffect, useState } from 'react'

type Invoice = {
  id: string
}

export function Invoice({ id }: Invoice) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const getData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/invoice/${id}`)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error)
      setError('Impossible de récupérer les données')
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-[512px]  m-auto p-3">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <h1 className="text-xl text-msx-lightYellow mb-5 text-center">
            {'Merci de votre participation !'}
          </h1>
          <div className="border border-msx-darkBlue p-2">
            <div className="flex flex-col gap-3">
              <div>
                Réservation pour :{' '}
                <span className="text-msx-cyan">{data.pack_name}</span>
              </div>
              <div>
                Contact: <span className="text-msx-cyan"> {data.email}</span>
              </div>
              <div>
                N° de commande:{' '}
                <span className="text-msx-cyan"> {data.transaction_id}</span>
              </div>
              {!data.type.match(/gamejam|student/i) && (
                <p>
                  Montant:{' '}
                  <span className="text-msx-cyan">
                    {data.amount}
                    {'€'}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
