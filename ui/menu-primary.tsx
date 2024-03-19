import { Ticket } from "@/components/ticket";
import Link from "next/link";

export function MenuPrimary() {
  return (
    <div className="flex gap-4 p-2 items-center justify-between sticky top-0 bg-msx-black z-50">
      <nav className="flex gap-4  items-center">
        <Link href="/">Accueil</Link>
        <Link href="/">Informations pratiques</Link>
        <Link href="/">Programme</Link>
        <Link href="/">Actualité</Link>
        <Link href="/">Presses</Link>
      </nav>
      <Ticket />
    </div>
  );
}
