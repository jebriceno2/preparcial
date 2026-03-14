import Image from 'next/image';
import Link from 'next/link';

type DictionaryDetail = {
  back: string;
  gender: string;
  house: string;
  wand: string;
  wood: string;
  core: string;
  length: string;
};

type CharacterDetailProps = {
  lang: string;
  dictionary: DictionaryDetail;
  character: {
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
};

const BorderColorHouses: Record<string, string> = {
  Gryffindor: 'border-[#740001]',
  Slytherin: 'border-[#1A472A]',
  Ravenclaw: 'border-[#0E1A40]',
  Hufflepuff: 'border-[#FFD800]',
  NoHouse: 'border-[#D1D5DB]'
};

function getBorderColor(house: string) {
  return BorderColorHouses[house] ?? BorderColorHouses.NoHouse;
}

function formatValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  return value;
}

export default function CharacterDetail({
  lang,
  dictionary,
  character
}: CharacterDetailProps) {
  const borderClass = getBorderColor(character.house || 'NoHouse');

  return (
    <main className="min-h-screen bg-[#e0e0e0] px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${lang}`}
          className="mb-6 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold shadow"
        >
          {dictionary.back}
        </Link>

        <h1 className="mb-6 text-center text-3xl font-bold text-[#D4A017]">
          {character.name}
        </h1>

        <article
          className={`mx-auto grid max-w-3xl overflow-hidden rounded-xl border-2 bg-white shadow-lg md:grid-cols-2 ${borderClass}`}
        >
          <div className="flex flex-col justify-center p-6 text-sm leading-7">
            <p>
              <span className="font-bold">{dictionary.house}:</span>{' '}
              {formatValue(character.house)}
            </p>
            <p>
              <span className="font-bold">{dictionary.gender}:</span>{' '}
              {formatValue(character.gender)}
            </p>
            <p>
              <span className="font-bold">{dictionary.wand}:</span>{' '}
              {formatValue(character.wand.core)}
            </p>
            <p>
              <span className="font-bold">{dictionary.wood}:</span>{' '}
              {formatValue(character.wand.wood)}
            </p>
            <p>
              <span className="font-bold">{dictionary.length}:</span>{' '}
              {formatValue(character.wand.length)}
            </p>
          </div>

          <div className="relative min-h-[500px] bg-slate-100">
            <Image
              src={
                character.image && character.image.trim() !== ''
                  ? character.image
                  : '/placeholder-character.png'
              }
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </article>
      </div>
    </main>
  );
}