import Link from 'next/link';
import Image from 'next/image';

type ItemCardProps = {
  id: string;
  name: string;
  lang: string;
  image: string;
  house: string;
};

const BgColorHouses: Record<string, string> = {
  Gryffindor: 'bg-[#740001]',
  Slytherin: 'bg-[#1A472A]',
  Ravenclaw: 'bg-[#0E1A40]',
  Hufflepuff: 'bg-[#FFD800]',
  NoHouse: 'bg-[#D1D5DB]'
};

function getHouseBg(house: string) {
  return BgColorHouses[house] ?? BgColorHouses.NoHouse;
}

export default function ItemCard({
  id,
  name,
  lang,
  image,
  house
}: ItemCardProps) {
  const bgClass = getHouseBg(house);
  const textColor = house === 'Hufflepuff' || house === 'NoHouse' ? 'text-black' : 'text-white';

  return (
    <Link
      href={`/${lang}/character/${id}`}
      className="block w-full max-w-[230px] overflow-hidden rounded-md shadow-md transition "
    >
      <article className="rounded-md bg-white">
        <div className={`${bgClass} ${textColor} px-3 py-2 text-center text-sm font-semibold`}>
          {name}
        </div>

        <div className="relative h-[280px] w-full bg-black">
          <Image
            src={image && image.trim() !== '' ? image : '/placeholder-character.png'}
            alt={name}
            fill
            className="object-cover"
            sizes="230px"
          />
        </div>
      </article>
    </Link>
  );
}