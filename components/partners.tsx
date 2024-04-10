const partners = [
  {
    name: 'ISART DIGITAL',
    logo: '/partners/isart.webp',
    url: 'https://www.isart.fr/paris/',
  },
  {
    name: 'Association MO5',
    logo: '/partners/mo5.webp',
    url: 'https://mo5.com',
  },
  {
    name: 'MSX Village',
    logo: '/partners/msx-village.webp',
    url: 'https://msxvillage.fr',
  },
]

export function Partners() {
  return (
    <div className="p-4">
      <h2 className="text-lg">Nos Partenaires</h2>

      <div
        className="flex gap-6 w-full overflow-x-auto md:overflow-x-hidden md:flex-wrap scroll-smooth snap-start snap-mandatory md:justify-center "
        data-hide-scrollbar
      >
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center cursor-pointer min-w-[160px] h-[160px]"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={160}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
