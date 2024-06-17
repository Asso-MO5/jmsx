import type { NextRequest } from 'next/server'
import { createServerClient } from '@/utils'
import { cookies } from 'next/headers'
import { tables } from '@/utils/supabase/tables'

export const runtime = 'edge'

export type TicketsPacks = {
  name: string
  price: number
  seats: number
  days: number[]
  availablePlace: number
  description: string
  type: 'visitors' | 'exhibitors' | 'students' | 'gameJam'
}

const typeOfVisitors = {
  visitors: {
    name: 'Visiteurs',
    seat: 65,
    price: 10,
  },
  exhibitors: {
    name: 'Exposants',
    seat: 10,
    price: 15,
  },
  students: {
    name: 'Etudiants ISART',
    seat: 20,
    price: 0,
  },
  gamJam: {
    name: 'Etudiants ISART - Game Jam',
    seat: 20,
    price: 0,
  },
}

const ticketsPacks: TicketsPacks[] = [
  {
    name: '2 jours - visiteurs',
    price: typeOfVisitors.visitors.price * 2,
    seats: 1,
    days: [1, 2],
    availablePlace: typeOfVisitors.visitors.seat,
    description: 'Pass 2 jours pour les visiteurs',
    type: 'visitors',
  },
  {
    name: '2 jours - exposants',
    price: typeOfVisitors.exhibitors.price * 2,
    seats: 1,
    days: [1, 2],
    availablePlace: typeOfVisitors.exhibitors.seat,
    description: 'Pass 2 jours pour les exposants',
    type: 'exhibitors',
  },

  {
    name: '2 jours - étudiants ISART',
    price: typeOfVisitors.students.price * 2,
    seats: 1,
    days: [1, 2],
    availablePlace: typeOfVisitors.students.seat,
    description: 'Réservez aux étudiants ISART',
    type: 'students',
  },

  {
    name: 'samedi - visiteurs',
    price: typeOfVisitors.visitors.price,
    seats: 1,
    days: [1],
    availablePlace: typeOfVisitors.visitors.seat,
    description: 'Pass pour le samedi (visiteurs)',
    type: 'visitors',
  },
  {
    name: 'samedi - exposants',
    price: typeOfVisitors.exhibitors.price,
    seats: 1,
    days: [1],
    availablePlace: typeOfVisitors.exhibitors.seat,
    description: 'Pass pour le samedi (exposants)',
    type: 'exhibitors',
  },
  {
    name: 'samedi - étudiants ISART',
    price: typeOfVisitors.students.price,
    seats: 1,
    days: [1],
    availablePlace: typeOfVisitors.students.seat,
    description: 'Pass pour le samedi (étudiants ISART)',
    type: 'students',
  },

  {
    name: 'dimanche - visiteurs',
    price: typeOfVisitors.visitors.price,
    seats: 1,
    days: [2],
    availablePlace: typeOfVisitors.visitors.seat,
    description: 'Pass pour le dimanche (visiteurs)',
    type: 'visitors',
  },
  {
    name: 'dimanche - exposants',
    price: typeOfVisitors.exhibitors.price,
    seats: 1,
    days: [2],
    availablePlace: typeOfVisitors.exhibitors.seat,
    description: 'Pass pour le dimanche (exposants)',
    type: 'exhibitors',
  },
  {
    name: 'dimanche - étudiants ISART',
    price: typeOfVisitors.students.price,
    seats: 1,
    days: [2],
    availablePlace: typeOfVisitors.students.seat,
    description: 'Pass pour le dimanche (étudiants ISART)',
    type: 'students',
  },
    {
    name: 'Game jam',
    price: typeOfVisitors.students.price * 2,
    seats: 1,
    days: [1, 2],
    availablePlace: typeOfVisitors.gamJam.seat,
    description: 'Réservez aux étudiants ISART',
    type: 'gameJam',
  }
]

export async function GET() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data, error } = await supabase.from(tables.seats).select('*')

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response(
    JSON.stringify([...ticketsPacks].map((ticket) => {
    const ticketData = data.filter((seat) => seat.type === ticket.type)

    return {
      ...ticket,
      availablePlace:  ticket.availablePlace - ticketData.length,
    }
  }).filter((ticket) => ticket.availablePlace > 0)),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export async function POST(request: NextRequest) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data, error } = await supabase
    .from(tables.seats)
    .insert([{ ...formData, sended_state:'' }])

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

   const { data: seats } = await supabase.from(tables.seats).select('*')

   const total = seats ? seats.reduce((acc, seat) => acc + seat.amount, 0) : 0

  await fetch(process.env.DISCORD_HOOK || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `
      --------------------------------
      **Nouveau participant**
      **Email**: ${formData.email}
      **Type**: ${formData.pack_name}
      **N° de transaction**: ${formData.transaction_id}
      **Montant**: ${formData.amount}€
      **type**: ${formData.type}
      --------------------------------
      **Nombre de participants**: ${seats ? seats.length : 0}
      **Cagnotte: ** \`${total}€\`
      `,
    }),
  })

  return new Response(JSON.stringify({ data, error }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
