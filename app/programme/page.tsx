import { program } from '@/utils/program'

export default function Progam() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Programme
          </h1>
          <p className="text-msx-gray italic text-center">
            {"Le programme des conférences de l'édition 2024."}
          </p>

          {program.map((day) => (
            <div key={day.date} className="p-2 border border-msx-darkBlue">
              <h2>{day.date}</h2>
              <ul>
                {day.events.map((event) => (
                  <li key={event.title}>
                    <span className="text-msx-lightBlue">{event.time} </span>
                    <span className="text-msx-cyan">{event.type}:</span>
                    {` ${event.title}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
