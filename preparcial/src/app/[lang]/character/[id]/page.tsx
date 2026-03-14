import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/app/[lang]/dictionaries";
import { getJson } from "@/lib/api";
import CharacterDetail from "@/components/catalog/CharacterDetail";

type ApiCharacter = {
  id: string;
  name: string;
  image: string;
  house: string;
  gender: string;
  wand: {
    wood: string;
    core: string;
    length: number | null;
  };
};

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

async function getCharacterById(id: string) {
  const data = await getJson<ApiCharacter[]>(
    `https://hp-api.onrender.com/api/character/${id}`
  );

  return data[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;

  if (!hasLocale(lang)) {
    return {
      title: "Harry Potter App",
      description: "Harry Potter characters catalog",
    };
  }

  const dictionary = await getDictionary(lang);
  const character = await getCharacterById(id);

  if (!character) {
    return {
      title: dictionary.metadata?.detailTitle ?? "Harry Potter App",
      description: dictionary.metadata?.detailDescription ?? "Harry Potter characters catalog",
    };
  }

  return {
    title: `${dictionary.metadata?.detailTitle} ${character.name} ${dictionary.metadata?.detailTitle2 ?? "Harry Potter App"}`,
    description: `${character.name} - ${dictionary.metadata?.detailDescription ?? "Harry Potter characters catalog"}`,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const character = await getCharacterById(id);

  if (!character) notFound();

  return (
    <CharacterDetail
      lang={lang}
      dictionary={dictionary.detail}
      character={character}
    />
  );
}