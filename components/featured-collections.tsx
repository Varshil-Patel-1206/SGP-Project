import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "World Maps",
    description: "Explore our collection of handcrafted world maps",
    image: "/images/world-map.jpg",
    href: "/shop?category=world",
    count: "24 Products",
  },
  {
    name: "Country Maps",
    description: "Celebrate your homeland with detailed country maps",
    image: "/images/country-map.jpg",
    href: "/shop?category=country",
    count: "36 Products",
  },
  {
    name: "City Maps",
    description: "Honor your favorite cities with intricate street maps",
    image: "/images/city-map.jpg",
    href: "/shop?category=city",
    count: "48 Products",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
            Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
            Find Your Perfect Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From sweeping world views to intimate city streets, discover the map that speaks to your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-background/70 text-xs uppercase tracking-wider mb-2">
                  {collection.count}
                </p>
                <h3 className="font-serif text-2xl text-background mb-2">
                  {collection.name}
                </h3>
                <p className="text-background/80 text-sm">
                  {collection.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-background text-sm font-medium">
                  <span>Explore Collection</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
