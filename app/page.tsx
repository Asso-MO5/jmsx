import { NewsletterForm } from "@/components/newsletter-form";
// import { StickyInfos } from "@/components/sticky-infos";

export default function Home() {
  return (
    <main className="relative">
      <img
        src="/poster.webp"
        alt="Affiche JMSX 24"
        className="w-full h-full object-cover"
        title="By Kobipixel"
      />
      <NewsletterForm />
      {/*  <StickyInfos /> */}
    </main>
  );
}
