export default function Progam() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Programme
          </h1>

          <div className="p-2 border border-msx-darkBlue">
            <h2>Samedi 22 juin</h2>
            <ul>
              <li>
                <span className="text-msx-cyan">Game jam:</span>
                {" Annonce du thème"}
              </li>
              <li>
                <span className="text-msx-lightGreen">conférence:</span>
                {" L'histoire du MSX par son Kazuhiko Nishi"}
              </li>
              <li>
                <span className="text-msx-lightGreen">conférence:</span>
                {" Les capacités techniques du MSX"}
              </li>
            </ul>
          </div>
          <div className="p-2 border border-msx-darkBlue">
            <h2>Dimanche 23 juin</h2>
            <ul>
              <li>
                <span className="text-msx-lightGreen">conférence:</span>
                {" Développer un jeu MSX en 2024"}
              </li>
              <li>
                <span className="text-msx-lightGreen">conférence:</span>
                {" Konami et le MSX, les début de Kojima"}
              </li>
              <li>
                <span className="text-msx-cyan">Game jam:</span>
                {" présentation des projets réalisés"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
