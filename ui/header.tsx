import { HeaderPlace } from '@/components'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex p-2 pb-0 items-center justify-center w-full">
      <Link href="/">
        <img
          src="/logo.webp"
          alt="logo"
          height={64}
          width={64}
          className="w-[32px] md:w-[64px]"
        />
      </Link>
      <HeaderPlace />
    </header>
  )
}
