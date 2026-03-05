import Link from 'next/link';
import Image from 'next/image';


type ItemCardProps = {
  id: string | number;
  lang: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
};

export default function ItemCard({
  id,
  lang,
  title,
  subtitle,
  description,
  image
}: ItemCardProps) {
  return (
    <article className="rounded-xl border p-4 shadow-sm">
       
        {image && (
          <Image
            src={image}
            alt={title}
            className="mb-3 h-40 w-full rounded-md object-cover"
            width={200} height={200}
          />
        )}
      

      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle ? <p className="text-sm opacity-70">{subtitle}</p> : null}
      {description ? <p className="mt-2 text-sm">{description}</p> : null}

      <Link
        href={`/${lang}/catalog/${id}`}
        className="mt-4 inline-block text-sm font-medium underline bg-red-100 text-red-700 rounded "
      >
        Ver más
      </Link>
    </article>
  );
}