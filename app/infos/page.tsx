export default function Infos() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex items-center justify-center">
        <img
          src="/map.webp"
          alt="infos"
          className=" border-msx-lightBlue"
          width={512}
          height={384}
        />
      </div>
      <div className="flex flex-col p-4 gap-5">
      <div>
          <h2>HORAIRES</h2>
          <p>Samedi 22 et dimanche 23 juin 2024</p>
          <p><span className="text-msx-magenta">publique:</span> de 10h à 19h30</p>
          <p><span className="text-msx-magenta">Exposants / game jam:</span> de 9h30 à 19h30</p>
        </div>
        <div>
          <h2>Lieu</h2>
          <p>ISART DIGITAL</p>
          <p>60, BD RICHARD-LENOIR 75011 PARIS</p>
        </div>

        <div className="flex flex-col gap-3">
          <h2>Métros</h2>
          <p>
            <span className="bg-msx-darkYellow  text-msx-white rounded-full px-2 py-1 border border-msx-white">
              9
            </span>{" "}
            Station Saint Ambroise
          </p>
          <p>
            Accessible depuis la gare{" "}
            <a
              href="https://www.ratp.fr/itineraires/Saint-Lazare_%2075008%20Paris%2660%20Boulevard%20Richard%20Lenoir%2075011%20Paris"
              target="_blank"
            >
              Saint Lazare
            </a>
          </p>
          <p>
            <span className="bg-msx-darkRed  text-msx-white rounded-full px-2 py-1 border border-msx-white">
              5
            </span>{" "}
            Station Richard Lenoir
          </p>
          <p>
            Accessible depuis la{" "}
            <a
              href="https://www.ratp.fr/itineraires/Gare%20du%20Nord_%2075010%20Paris%2660%20Boulevard%20Richard%20Lenoir%2075011%20Paris"
              target="_blank"
            >
              gare du Nord
            </a>
            ,{" "}
            <a
              href="https://www.ratp.fr/itineraires/gare%20du%20l%E2%80%99Est%2660%20Boulevard%20Richard%20Lenoir%2075011%20Paris"
              target="_blank"
            >
              {"gare du l'Est"}
            </a>{" "}
            et la <a href="https://www.ratp.fr/itineraires/Gare%20D%E2%80%99Austerlitz%2660%20Boulevard%20Richard%20Lenoir%2075011%20Paris" target="_blank">{"Gare D'Austerlitz"}</a>
          </p>
        </div>
      </div>
    </main>
  );
}
