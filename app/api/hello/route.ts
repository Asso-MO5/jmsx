import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { createServerClient } from '@/utils'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()


  const test = {data: 'Hello, World!'}
  // Ici, vous pouvez logger les données pour le débogage
  console.log('Data:', test)

  // Retourner une réponse avec les données au format JSON
  return new Response(JSON.stringify(test.data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
