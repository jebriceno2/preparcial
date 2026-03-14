import ItemCard from './ItemCard';

type Item = {
  id: string;
  name: string;
  image: string;
  house: string;
};

type ItemGridProps = {
  items: Item[];
  lang: string;
};

export default function ItemGrid({ items, lang }: ItemGridProps) {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          house={item.house}
          lang={lang}
        />
      ))}
    </section>
  );
}