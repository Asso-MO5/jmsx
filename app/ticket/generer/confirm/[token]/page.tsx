import { createServerClient } from '@/utils'
import { tables } from '@/utils/supabase/tables'
import { cookies } from 'next/headers'

export const runtime = 'edge'

async function getData(token: string) {
  const cookieStore = cookies()

  const supabase = createServerClient(cookieStore)
  const { data: seats } = await supabase
    .from(tables.seats)
    .select('*')
    .eq('token', token)

  if (seats === null || !seats.length) return null

  await supabase
    .from(tables.seats)
    .update({ sended_state: '', sended_ticket: new Date(), token: null })
    .match({ email: seats[0].email })

  return { state: 'ok' }
}

export default async function GenererConfirm({
  params: { token },
}: {
  params: { token: string }
}) {
  const data = await getData(token)

  if (!data)
    return (
      <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
        <div className="flex flex-col p-4 gap-5">
          <div className="flex flex-col gap-3 text-msx-lightRed">
            {"Le lien que vous avez suivi n'est pas valide ou obsolète."}
          </div>
        </div>
      </main>
    )

  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Générez votre ticket
          </h1>
          <p className="text-msx-mediumGreen">
            Vous recevrez vos billets dans une dizaine de minutes.
          </p>
        </div>
      </div>
    </main>
  )
}
