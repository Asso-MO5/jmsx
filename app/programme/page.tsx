const program = [
  {
    date: 'Samedi 22 juin',
    events: [
      { time: '10:00', type: 'Game jam', title: 'Annonce du thème' },
      {
        time: '10:30',
        type: 'conférence',
        title:
          "Qu`'est-ce qu'un MSX ? Ou, La place du MSX dans la microinformatique mondiale",
      },
      {
        time: '12:00',
        type: 'conférence',
        title: 'ISART Digital',
      },

      {
        time: '14:00',
        type: 'conférence',
        title:
          "L'histoire du MSX par Kazuhiko Nishi, suivi d'une séance de questions-réponses",
      },
      {
        time: '16:00',
        type: 'conférence',
        title: 'Konami et le MSX, les début de Kojima',
      },
      {
        time: '18:00',
        type: 'conférence',
        title: 'Les capacités techniques du MSX',
      },
    ],
  },
  {
    date: 'Dimanche 23 juin',
    events: [
      {
        time: '11:00',
        type: 'conférence',
        title:
          "L'avenir du MSX par Kazuhiko Nishi, suivi d'une séance de questions-réponses",
      },
      {
        time: '14:00',
        type: 'conférence',
        title: 'Développer un jeu MSX en 2024',
      },
      {
        time: '15:00',
        type: 'présentation',
        title: 'Les meilleurs Homebrews MSX',
      },
      {
        time: '16:00',
        type: 'présentation',
        title: 'ROOM 5, un jeu créé open source en live',
      },

      {
        time: '19:00',
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
            {
              'Le programme sera complété, les horaires sont susceptibles de changer'
            }
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
