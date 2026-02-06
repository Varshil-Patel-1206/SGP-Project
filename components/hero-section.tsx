import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-wooden-map.jpg"
          alt="Handcrafted wooden world map in a beautiful living room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="text-background/90 text-sm uppercase tracking-[0.3em] mb-6 font-medium">
          Artisan Craftsmanship Since 2015
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-background leading-tight mb-6 text-balance">
          Handcrafted Wooden Maps for Your Walls
        </h1>
        <p className="text-background/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          Transform your space with our premium wooden wall art. Each map is meticulously 
          crafted from sustainably sourced wood, bringing the world into your home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base font-medium"
          >
            <Link href="/shop">Shop Maps</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-background text-background hover:bg-background/10 px-8 py-6 text-base font-medium bg-transparent"
          >
            <Link href="/customize">Customize Your Map</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-background/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
