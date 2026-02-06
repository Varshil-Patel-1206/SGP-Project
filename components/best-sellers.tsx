import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Classic World Map",
    price: 299,
    rating: 4.9,
    reviews: 128,
    image: "/images/product-1.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "LED Europe Map",
    price: 349,
    rating: 4.8,
    reviews: 89,
    image: "/images/product-2.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Minimalist Japan Map",
    price: 199,
    rating: 4.9,
    reviews: 67,
    image: "/images/product-3.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "USA States Map",
    price: 279,
    rating: 4.7,
    reviews: 156,
    image: "/images/product-4.jpg",
    badge: "Popular",
  },
];

export function BestSellers() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
              Shop
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-balance">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-accent hover:text-accent/80 font-medium flex items-center gap-2 transition-colors"
          >
            View All Products
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-foreground mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 bg-transparent"
          >
            <Link href="/shop">Browse All Maps</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
