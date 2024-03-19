import { HeaderPlace } from "@/components/header-place";
import { Ticket } from "@/components/ticket";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex gap-2 p-2 pb-0 items-center">
      <Link href="/">
      <img src="/placeholder.webp" alt="logo" height={64} width={64} />
      </Link>
      <HeaderPlace/>
    </header>
  );
}
