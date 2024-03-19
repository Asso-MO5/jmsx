import type { Metadata } from "next";
import { Silkscreen} from "next/font/google";
import "./globals.css";
import { Header } from "@/ui/header";
import { MenuPrimary } from "@/ui/menu-primary";

const silkscreen = Silkscreen({ weight: "400", display: "swap", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "J'MSX 24",
  description: "Convention MSX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={silkscreen.className}>
        <Header />
        <MenuPrimary />
        {children}
        <footer>Ici les infos RS, sponsor, mentions legales... </footer>
      </body>
    </html>
  );
}
