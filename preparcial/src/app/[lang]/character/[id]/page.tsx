import { notFound } from 'next/navigation';
import { hasLocale, getDictionary } from '../../dictionaries';
import { getJson } from '@/lib/api';
import CharacterDetail from '@/components/catalog/CharacterDetail';

type ApiCharacter = {
  id: string;
  image: string;
  house: string;
  name: string;
  gender: string;
  wand: {
    wood: string;
    core: string;
    length: number | null;
  };
};

export default async function ItemDetailPage({
  params
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  const data = await getJson<ApiCharacter[]>(
    `https://hp-api.onrender.com/api/character/${id}`
  );
  const item = data[0];

  if (!item) notFound();

  return (
    <CharacterDetail
      lang={lang}
      dictionary={dictionary.detail}
      character={item}
    />
  );
}
