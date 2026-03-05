import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from '../../dictionaries';
import { getJson } from '@/lib/api';

type ApiPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default async function ItemDetailPage({
  params
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  const item = await getJson<ApiPost>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-8">
      <Link href={`/${lang}`} className="mb-6 inline-block underline">
        {dictionary.catalog.back}
      </Link>

      <article className="rounded-xl border p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <p className="mt-4">{item.body}</p>
        
      </article>
    </main>
  );
}