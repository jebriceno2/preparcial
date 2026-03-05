import Link from 'next/link';
import Image from 'next/image';


type ItemCardProps = {
  id: string
  name: string;
  lang: string;
  image: string;
};

export default function ItemCard({
id,
name,
lang, 
image
}: ItemCardProps) {
  return (
    <article className="rounded-xl border p-4 shadow-sm">
              <h2 className='flex flex-center text-center'>{name}</h2> 
      <Link
        href={`/${lang}/character/${id}`}
        className="mt-4 inline-block text-sm font-medium underline bg-red-100 text-red-700 rounded "
      >
          <Image
            src={image}
            alt={name}
            className='bg-white'
            width={200} height={200}
          />

      </Link>
    </article>
  );
}