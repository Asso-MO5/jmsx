import type { NextRequest } from 'next/server'
import { createServerClient } from '@/utils'
import { cookies } from 'next/headers'
import { tables } from '@/utils/supabase/tables'
import {v4 as uuidv4} from 'uuid'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from(tables.seats)
    .update([{ token: `${uuidv4()}-${new Date().getTime()}`, sended_state: 'pending' }])
    .eq ('email', formData.email)
    .select('email')

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response(JSON.stringify({ data, error }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
