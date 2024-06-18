'use client'
import { TicketsPacks } from '@/app/api/inscription/route'
import { texts } from '@/utils'
import { dc } from '@/utils/dynamic-classes'
import { loadScript } from '@paypal/paypal-js'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type PaypalModalProps = {
  onClose?: () => void
}

const currency_code = 'EUR'
export function PaypalModal({ onClose }: PaypalModalProps) {
  // === HOOKS ============================================================
  const router = useRouter()

  // === STATES ============================================================

  const [loading, setLoading] = useState(false)
  const [packs, setPacks] = useState<TicketsPacks[]>([])
  const [packFilter, setPackFilter] = useState('visiteurs')
  const [selectedPack, setSelectedPack] = useState<TicketsPacks | null>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // === REFS ==============================================================
  const form = useRef<TicketsPacks | null>()
  const id = 'paypal-button-container'

  // === HANDLERS =========================================================

  const handleChangeEmail = (value: string) => {
    setEmail(value)
  }

  const handleFetchInfos = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/inscription')
      const data: TicketsPacks[] = await res.json()
      setPacks(data)
      setSelectedPack(data[0])
    } catch (err) {
      setError(
        'Une erreur est survenue lors de la récupération des informations'
      )
    } finally {
      setLoading(false)
    }
  }

  const initPaypal = async () => {
    setLoading(true)

    const paypal = await loadScript({
      clientId: process.env.NEXT_PUBLIC_PAYPAL_API_KEY || '',
      commit: false,
      vault: true,
      locale: 'fr_FR',
      currency: currency_code,
      merchantId: process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID,
    })

    if (!paypal?.Buttons || !id) return

    const container = document.getElementById(id)
    if (container) container.innerHTML = ''

    try {
      await paypal
        .Buttons({
          style: {
            color: 'blue',
            shape: 'rect',
          },

          createOrder(_data, actions) {
            const amount = form.current ? form.current.price : 15

            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code,
                    value: `${amount}`,
                  },
                  description: 'JMSX',
                },
              ],
            })
          },
          async onApprove(_data, actions) {
            if (!actions.order) return
            const details = await actions.order.capture()
            //@ts-ignore
            const { payer, id: transaction_id } = details

            await fetch('/api/inscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                pack_name: form.current?.name || selectedPack?.name,
                day_one: !!form.current?.days.find((day) => day === 1),
                day_two: !!form.current?.days.find((day) => day === 2),
                transaction_id,
                email: payer?.email_address || 'unknown',
                name: payer?.name?.given_name || 'unknown',
                lastname: payer?.name?.surname || 'unknown',
                amount: form.current?.price || selectedPack?.price,
                status: 'paid',
                game_jam: form.current?.type === 'gameJam',
                type: form.current?.type || selectedPack?.type,
              }),
            })
            router.push('/ticket/' + transaction_id)
            onClose?.()
          },
          onError: () => {
            setError('Une erreur est survenue lors du paiement')
          },
        })
        .render(`#${id}`)
    } catch (error) {
      console.error('failed to render the PayPal Buttons', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const domain = email.split('@')[1]
    if (!domain.match(/isartdigital.com|isartdigital.com/)) {
      setError('Veuillez renseigner une adresse email ISART')
      return
    }
    setLoading(true)

    try {
      const transaction_id = uuidv4()
      const res = await fetch('api/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pack_name: form.current?.name || selectedPack?.name,
          day_one: !!form.current?.days.find((day) => day === 1),
          day_two: !!form.current?.days.find((day) => day === 2),
          transaction_id: transaction_id,
          email: email,
          name: email.split('@')[0],
          lastname: '',
          amount: form.current?.price || selectedPack?.price,
          status: 'paid',
          game_jam: form.current?.type === 'gameJam',
          type: form.current?.type || selectedPack?.type,
        }),
      })

      if (!res.ok) throw new Error('failed to fetch')
      router.push('/ticket/' + transaction_id)
      onClose?.()
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription")
      console.error('failed to render the PayPal Buttons', error)
    }
    setLoading(false)
  }

  // === EFFECTS ==========================================================

  useEffect(() => {
    handleFetchInfos()
    initPaypal()
    const params = new URLSearchParams(window.location.search)
    if (params.get('pack')) setPackFilter(params.get('pack') || 'visiteurs')
  }, [])

  useEffect(() => {
    form.current = selectedPack
  }, [selectedPack])

  useEffect(() => {
    if (error) setError('')
  }, [selectedPack, email, packFilter])

  // === RENDER ===========================================================
  return (
    <div className="p-3 flex items-center justify-center">
      <div className="max-w-96 flex flex-col gap-4 justify-center">
        <div className="text-center">{texts.inscription_description}</div>
        {error && (
          <div className="text-msx-lightRed text-center text-lg border border-msx-mediumRed p-2">
            {'! '}
            {error}
          </div>
        )}
        {loading && <div>Chargement...</div>}

        <div className="flex gap-3 justify-center text-sm">
          {['visiteurs', 'exposants', 'étudiants ISART'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setPackFilter(type)
                router.push(
                  window.location.pathname + '?pack=' + type,
                  // @ts-ignore
                  { shallow: true }
                )
                setSelectedPack(
                  packs.filter((pack) =>
                    type.match(/tudiants|students/)
                      ? !!pack.type.match(/students|gamejam/i)
                      : pack.name.includes(type)
                  )[0]
                )
              }}
              className={dc('border border-msx-mediumGreen p-1', [
                packFilter === type,
                'bg-msx-mediumGreen',
              ])}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="text-2xl flex flex-col gap-3">
          {packs
            .filter((pack) =>
              packFilter.includes('tudiant')
                ? !!pack.type.match(/students|gamejam/i)
                : pack.name.includes(packFilter)
            )
            .map((pack) => (
              <button
                key={pack.name}
                className={dc(
                  'flex items-center justify-between border  p-2 text-sm gap-2 relative',
                  [
                    selectedPack?.name === pack.name,
                    'border-msx-mediumGreen',
                    'border-msx-lightBlue',
                  ]
                )}
                onClick={() => setSelectedPack(pack)}
              >
                <div>
                  {selectedPack?.name === pack.name && (
                    <div className="absolute top-0 right-0">✔️</div>
                  )}
                  <div
                    className={dc([
                      selectedPack?.name === pack.name,
                      'text-msx-mediumGreen',
                      'text-msx-darkYellow',
                    ])}
                  >
                    {pack.name}
                  </div>
                  <div>{pack.description}</div>
                </div>
                <div
                  className={dc('text-lg', [
                    selectedPack?.name === pack.name,
                    'text-msx-mediumGreen',
                    'text-msx-cyan',
                  ])}
                >
                  {pack.price === 0 ? 'gratuit' : `${pack.price}€`}
                </div>
              </button>
            ))}
        </div>
        <div
          id={id}
          className={dc([packFilter.includes('étudiants'), 'hidden'])}
        >
          <div className="flex items-center justify-center text-msx-cyan">
            Chargement du module de paiement...
          </div>
        </div>
        {packFilter.includes('étudiants') && (
          <form className="flex flex-col gap-8" onSubmit={handleSubmitStudent}>
            <fieldset>
              <label htmlFor="email">
                {
                  'Email (@isart.com, @student.isartdigital.com ou @isartdigital.com)'
                }
              </label>
              <input
                type="email"
                className="input"
                onChange={(e) => handleChangeEmail(e.target.value)}
                value={email}
              />
            </fieldset>
            <button className="btn">Valider</button>
          </form>
        )}
        {packFilter.includes('exposants') && (
          <div>
            {
              "Les exposants bénéficient d'une table de 1.6m sur 60cm, d'un accès à l'électricité. Le prêt de machine et écran est inclus. "
            }
            Pour toute demande particulière, vous pouvez nous{' '}
            <span>
              <Link href="/contact">contacter</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
