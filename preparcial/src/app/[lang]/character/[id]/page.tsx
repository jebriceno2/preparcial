import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from '../../dictionaries';
import { getJson } from '@/lib/api';
import Image from 'next/image';

type ApiPost = {
  id: string;
  image: string;
  house: string;
  name: string;
  wand: string;
  wood: string;
  length: number;
};

export default async function ItemDetailPage({
  params
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  const data = await getJson<ApiPost>(
    `https://hp-api.onrender.com/api/character/${id}`

  );
  const item=data[0]
  console.log(item);
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-8">
      <Link href={`/${lang}`} className="mb-6 inline-block underline">
        {dictionary.catalog.back}
      </Link>

      <article className="rounded-xl border p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        <p className="mt-4">{item.name}</p>
        
        <Image
            src={item.image}
            alt={item.name}
            className="bg-white"
            width={200} height={200}
          />
      </article>
    </main>
  );
}