import Image from "next/image";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";


export default async function Home({ params }: { params: Promise<{ lang: 'es'|'en' }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{dictionary.home.title}</h1>
    </main>
  );
}
