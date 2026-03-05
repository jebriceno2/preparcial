import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import { getJson } from '@/lib/api';
import ItemGrid from '@/components/catalog/ItemGrid';

type ApiUser = {
  id: string;
  name: string;
  image: string;
  lang: string;
};

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  const data = await getJson<ApiUser[]>(
    'https://hp-api.onrender.com/api/characters?limit=12'
  );

  const items = data.map((user) => ({
    id: user.id,
    name: user.name,
    image: user.image
  }));

  return (
    <main className="mx-auto min-h-scree  p-8 bg-[#BBCCBB]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold  text-center text-[#FDB608]" >{dictionary.home.title}</h1>
        
      </header>

      <ItemGrid items={items} lang={lang}/>
    </main>
  );
}