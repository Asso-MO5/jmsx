import type { NextRequest } from 'next/server'
import { createServerClient } from '@/utils'
import { cookies } from 'next/headers'
import { tables } from '@/utils/supabase/tables'

export const runtime = 'edge'


export async function GET(_request: NextRequest,{params: { id }}: any) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)


  const { data, error } = await supabase.from(tables.seats).select('*').eq('transaction_id', id).single()
  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response(
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
