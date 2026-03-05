import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import { getJson } from '@/lib/api';
import ItemGrid from '@/components/catalog/ItemGrid';

type ApiUser = {
  id: number;
  name: string;
  email: string;
  website: string;
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
    'https://jsonplaceholder.typicode.com/users'
  );

  const items = data.map((user) => ({
    id: user.id,
    title: user.name,
    subtitle: user.email,
    description: user.website
  }));

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{dictionary.home.title}</h1>

      </header>

      <ItemGrid items={items} lang={lang} />
    </main>
  );
}