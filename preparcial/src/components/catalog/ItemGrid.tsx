import ItemCard from './ItemCard';

type Item = {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
};

type ItemGridProps = {
  items: Item[];
  lang: string;
};

export default function ItemGrid({ items, lang }: ItemGridProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
              key={item.id}
              id={item.id}
              lang={lang}
              title={item.title} 
              image={item.image}
              subtitle={item.subtitle}
              description={item.description}
        />
      ))}
    </section>
  );
}