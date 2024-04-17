import { dc } from '@/utils/dynamic-classes'
import Link from 'next/link'

const infos = [
  {
    title: 'Invité: Kazuhiko Nishi',
    content:
      'Kazuhiko Nishi est un entrepreneur japonais, co-fondateur de Microsoft Japon et ASCII Corporation et créateur de la norme MSX.',
    img: '/nishi.webp',
    showMore: true,
  },
  {
    title: 'Invité: Cousin Hubert',
    content:
      "Amateur de jeux vidéo japonais, Cousin Hubert a décidé d'apprendre cette langue sur le tard et de plonger dans le gouffre sans fond des jeux sur ordinateur japonais des années 80-90. Pour combler sa solitude de collectionneur de retrogaming japonais de niche, il a créé sa chaîne Youtube pour rencontrer ses pairs et chaque jour, ils échangent et en apprennent toujours davantage sur ce merveilleux univers.",
    img: './c_hubert.webp',
  },
  {
    title: 'Invité: Gunhed TV',
    content:
      'David Hecq, anciennement maire, s\'est réinventé en créateur de contenu sur YouTube sous le pseudonyme de Gunhed TV. Passionné par le retrogaming, la bande dessinée et la culture populaire des années 80 et 90, David partage sa passion pour les consoles de jeux vidéo et autres gadgets technologiques, souvent avec une pointe d\'humour et de nostalgie. Sur sa chaîne, il aborde ces sujets sérieusement tout en gardant une approche légère, visant à divertir sans gaspiller le temps précieux de ses spectateurs. Outre ses vidéos, David est également auteur de plusieurs livres, où il couche sur papier ses réflexions et anecdotes, notamment à travers la série "Les Chroniques de Gunhed TV".',
    img: './gunhed.webp',
  },
]

export function StickyInfos() {
  return (
    <section className="flex flex-col my-7 mx-auto gap-5 max-w-[700px] ">
      {infos.map((info, index) => (
        <article
          key={index}
          className={dc(
            'flex flex-col items-center px-5 gap-4 lg:text-inherit text-sm w-full',
            [
              index % 2 === 0,
              'md:flex-row',
              'md:flex-row-reverse md:text-right',
            ]
          )}
        >
          <img
            src={info.img}
            alt={info.title}
            className="w-24 h-24 rounded-full"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-msx-lightYellow text-lg">
              {info.title}
            </h2>
            <p className="text-msx-white">{info.content}</p>
            {info.showMore && (
              <Link
                href="/programme"
                className="px-4 py-2 mt-3 text-msx-white border border-msx-darkBlue sm:self-end"
              >
                En savoir plus
              </Link>
            )}
          </div>
        </article>
      ))}
      <div className="text-xs text-msx-darkBlue">
        Bien que la présence des invités soit confirmée, il est possible que des
        annulations surviennent en raison de contraintes professionnelles, de
        maladies, de perturbations de voyage ou d'autres imprévus.
        L'organisation de JMSX ne peut être tenue responsable de ces annulations
        et cela ne constitue pas un motif valable pour le remboursement des
        billets.
      </div>
    </section>
  )
}
