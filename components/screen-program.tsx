'use client'
import { program } from '@/utils/program'
import { useEffect, useRef, useState } from 'react'

export default function ScreenProgram() {
  const [programDay, setProgramDay] = useState(program[0].events)
  const [nextEventIndex, setNextEventIndex] = useState(0)

  const ref = useRef({
    index: 0,
  })

  function refreshProgram() {
    const day = new Date().getDate()
    const index = day <= 22 ? 0 : 1

    if (ref.current.index === index) return
    ref.current.index = index
    setProgramDay(program[index].events)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshProgram()

      const currentTime = new Date()
      const nextIndex = programDay.findIndex((event) => {
        const [hours, minutes] = event.time.split(':')
        const eventTime = new Date()
        eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        return eventTime > currentTime
      })
      setNextEventIndex(nextIndex === -1 ? 0 : nextIndex)
    }, 1000)
    return () => clearInterval(interval)
  }, [programDay])

  const nextEvent = programDay[nextEventIndex]

  return (
    <main className="relative flex flex-col gap-3 p-12 m-auto text-2xl">
      <div className="border border-msx-mediumRed p-5 text-3xl">
        <span className="text-msx-lightBlue">{nextEvent?.time} </span>
        <span className="text-msx-cyan">{nextEvent?.type}:</span>
        {` ${nextEvent?.title}`}
      </div>
      <ul className="flex flex-col gap-5 list-none mt-6">
        {programDay
          .filter((event, index) => {
            const currentTime = new Date()
            const [hours, minutes] = event.time.split(':')
            const eventTime = new Date()
            eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
            return index !== nextEventIndex && eventTime > currentTime
          })
          .map((event) => (
            <li key={event.title}>
              <span className="text-msx-lightBlue">{event.time} </span>
              <span className="text-msx-cyan">{event.type}:</span>
              {` ${event.title}`}
            </li>
          ))}
      </ul>
    </main>
  )
}
