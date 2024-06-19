import type { NextRequest } from 'next/server'
import { createServerClient } from '@/utils'
import { cookies } from 'next/headers'
import { tables } from '@/utils/supabase/tables'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)

  if(formData.pwd !== process.env.QR_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 401,
    })
  }


  return new Response(JSON.stringify({ data:'ok' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function PUT(request: NextRequest) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  //First search for the seat
  const { data } = await supabase.from(tables.seats).select('*').eq('id', formData.id).single()

  const msg = (d: any) =>{
    let msg = ''
    if(d.day_zero) msg= "VENDREDI, "
    if(d.day_one && d.day_two) msg+= "SAMEDI & DIMANCHE"
    if(d.day_one && !d.day_two) msg+= "SAMEDI"
    if(!d.day_one && d.day_two) msg+= "DIMANCHE"
    return msg
  }

  if(data) {
    const {data: entrance } = await supabase.from(tables.entrance).select('*').eq('seat_id', data.id).single()
    if(entrance) {
      return new Response(JSON.stringify({ error:'Billet déjà scanné', msg:'' }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
        await supabase.from(tables.entrance).insert([{ seat_id: data.id }])

        return new Response(JSON.stringify({ error:'', msg: msg(data) }), {
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }
  } 
  else {
    const {data:staff} = await supabase.from(tables.staff).select('*').eq('discord_id', formData.id).single()

    if(!staff) {
        return new Response(JSON.stringify({ error:'Impossible de retrouver le billet', msg:'' }), {
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }

    const {data: entrance } = await supabase.from(tables.entrance).select('*').eq('seat_id', formData.id).single()
    if(entrance) {
      return new Response(JSON.stringify({ error:'Billet déjà scanné', msg:'' }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else{
        await supabase.from(tables.entrance).insert([{ seat_id: staff.discord_id }])
       
        return new Response(JSON.stringify({ error:'', msg: msg(staff) }), {
            headers: {
            'Content-Type': 'application/json',
            },
        })
    }
  }

}
