import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import { getJson } from '@/lib/api';
import ItemGrid from '@/components/catalog/ItemGrid';

type ApiUser = {
  id: string;
  name: string;
  image: string;
  house: string;
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
    'https://hp-api.onrender.com/api/characters'
  );

  const items = data.slice(0, 12).map((user) => ({
    id: user.id,
    name: user.name,
    image: user.image,
    house: user.house || 'NoHouse'
  }));

  return (
    <main className="mx-auto min-h-screen bg-[#e0e0e0] px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#FDB608]">
          {dictionary.home.title}
        </h1>
        <h1 className="text-lg font-medium">
          {dictionary.home.description}
        </h1>
      </header>

      <ItemGrid items={items} lang={lang} />
    </main>
  );
}