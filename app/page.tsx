import { StickyInfos } from "@/components/sticky-infos";

export default function Home() {
  return (
    <main className="">
      <img
        src="/poster.webp"
        alt="Affiche JMSX 24"
        className="w-full h-full object-cover"
        title="By Kobipixel"
      />
      <StickyInfos />
    </main>
  );
}
