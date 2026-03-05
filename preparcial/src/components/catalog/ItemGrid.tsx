import ItemCard from './ItemCard';

type Item = {
  id: string
  name: string;
  image: string;
};

type ItemGridProps = {
  items: Item[];
  lang: string
};

export default function ItemGrid({ items, lang}: ItemGridProps) {
  return (
    <section className="grid grid-cols-3  place-items-center">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image} 
          lang={lang}        />
      ))}
    </section>
  );
}