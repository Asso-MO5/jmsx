'use client'
import { Ticket } from '@/components'
import { useIsMobile } from '@/hooks'
import { dc } from '@/utils/dynamic-classes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const menulinks = [
  { href: '/', label: 'Accueil' },
  { href: '/infos', label: 'Informations pratiques' },
  { href: '/programme', label: 'Programme' },
  /* { href: "/gamejam", label: "Game Jam" },
  { href: "/presse", label: "Presses" }, */
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

// .....................................................

export function MenuPrimary() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useIsMobile(850)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (pathname.match(/\/screen\/|\/qr/) || !isClient) return null

  return isMobile ? <MenuMobile /> : <MenuDesktop />
}

// .....................................................

function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="p-3 flex items-center justify-center">
        {/* <Ticket /> */}
      </div>
      <div className="fixed top-4 right-4 z-50">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <img
            src={isOpen ? '/icons/cross.png' : '/icons/menu.png'}
            alt="menu"
            width={32}
            height={32}
          />
        </button>
      </div>
      {isOpen && (
        <div className="z-40 fixed inset-0 bg-msx-black">
          <div className="h-full flex gap-5 p-3 flex-col items-center justify-center whitespace-nowrap text-xl">
            <div className="p-4  w-full rounded-sm border border-msx-darkBlue flex items-center justify-center">
              {/* <Ticket /> */}
            </div>
            {menulinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// .....................................................

function MenuDesktop() {
  const [activeLink, setActiveLink] = useState(window.location.pathname || '/')

  return (
    <div className="flex gap-4 p-2 items-center justify-between sticky top-0 bg-msx-black z-50">
      <nav className="flex gap-4  items-center whitespace-nowrap">
        {menulinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
            className={dc('border-b-2', [
              activeLink === link.href,
              'border-msx-magenta',
              'border-transparent',
            ])}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mr-3">{/* <Ticket /> */}</div>
    </div>
  )
}
