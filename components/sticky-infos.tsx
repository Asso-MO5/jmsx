import { dc } from '@/utils/dynamic-classes'
import Link from 'next/link'

const infos = [
  {
    title: 'Invité: Kazuhiko Nishi',
    content:
      'Kazuhiko Nishi est un entrepreneur japonais, co-fondateur de Microsoft Japon et ASCII Corporation et créateur de la norme MSX.',
    img: '/nishi.webp',
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
            <Link
              href="/programme"
              className="px-4 py-2 mt-3 text-msx-white border border-msx-darkBlue sm:self-end"
            >
              En savoir plus
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
