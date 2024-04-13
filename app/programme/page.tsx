const program = [
  {
    date: 'Samedi 22 juin',
    events: [
      { time: '10:00', type: 'Game jam', title: 'Annonce du thème' },

      {
        time: '11:00',
        type: 'conférence',
        title: 'Les capacités techniques du MSX',
      },
      {
        time: '14:00',
        type: 'conférence',
        title: "L'histoire du MSX par Kazuhiko Nishi",
      },
      {
        time: '11:00',
        type: 'conférence',
        title: 'Konami et le MSX, les début de Kojima',
      },
    ],
  },
  {
    date: 'Dimanche 23 juin',
    events: [
      {
        time: '10:00',
        type: 'conférence',
        title: 'Développer un jeu MSX en 2024',
      },
      {
        time: '12:00',
        type: 'présentation',
        title: 'ROOM 5, un jeu créé open source en live',
      },
      {
        time: '14:00',
        type: 'conférence',
        title: "L'avenir du MSX par Kazuhiko Nishi",
      },
      {
        time: '12:00',
        type: 'présentation',
        title: 'Les meilleurs Homebrews MSX',
      },

      {
        time: '16:30',
        type: 'Game jam',
        title: 'présentation des projets réalisés',
      },
    ],
  },
]

export default function Progam() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Programme
          </h1>
          <p className="text-msx-gray italic text-center">
            {'Le programme sera complété'}
          </p>

          {program.map((day, index) => (
            <div key={index} className="p-2 border border-msx-darkBlue">
              <h2>{day.date}</h2>
              <ul>
                {day.events.map((event, index) => (
                  <li key={index}>
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
