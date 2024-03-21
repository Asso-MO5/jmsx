"use client";
import { Ticket } from "@/components";
import { useIsMobile } from "@/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

// .....................................................

const menulinks = [
  { href: "/", label: "Accueil" },
  { href: "/infos", label: "Informations pratiques" },
  { href: "/programme", label: "Programme" },
  { href: "/actu", label: "Actualité" },
  { href: "/presse", label: "Presses" },
];

export function MenuPrimary() {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return isMobile ? <MenuMobile /> : <MenuDesktop />;
}

// .....................................................

function MenuMobile() {
  return <div>Menu mobile</div>;
}

// .....................................................

function MenuDesktop() {
  return (
    <div className="flex gap-4 p-2 items-center justify-between sticky top-0 bg-msx-black z-50">
      <nav className="flex gap-4  items-center">
        {menulinks.map((link, index) => (
          <Link key={index} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Ticket />
    </div>
  );
}
