import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { Header, MenuPrimary } from "@/ui";

const silkscreen = Silkscreen({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J'MSX 24",
  description: "Convention MSX",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jmsx.mo5.com",
    description: "Convention MSX",
    siteName: "J'MSX 24",
    images: [
      {
        url: "https://jmsx.mo5.com/meta.png",
        width: 1024,
        height: 768,
        alt: "J'MSX 24",
      },
    ],
  },
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
        <footer></footer>
      </body>
    </html>
  );
}
