"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Star, SlidersHorizontal, X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

// TODO: Replace with real product images from database
// TODO: Add proper product descriptions
// TODO: Connect to inventory system
// TODO: Add product variants (wood type, finish, LED options)
const allProducts = [
  { id: 1, name: "Classic World Map", price: 299, rating: 4.9, reviews: 128, image: "/World.jpeg", size: "large", region: "world", badge: "Best Seller" },
  { id: 2, name: "LED Europe Map", price: 349, rating: 4.8, reviews: 89, image: "/Country.jpeg", size: "medium", region: "country", badge: "New" },
  { id: 3, name: "Minimalist Japan Map", price: 199, rating: 4.9, reviews: 67, image: "/Custom.jpeg", size: "medium", region: "country", badge: null },
  { id: 4, name: "USA States Map", price: 279, rating: 4.7, reviews: 156, image: "/Home.jpeg", size: "large", region: "country", badge: "Popular" },
  { id: 5, name: "World Map XL", price: 449, rating: 4.9, reviews: 203, image: "/World.jpeg", size: "xl", region: "world", badge: null },
  { id: 6, name: "NYC City Map", price: 189, rating: 4.8, reviews: 94, image: "/BS1.jpeg", size: "small", region: "city", badge: null },
  { id: 7, name: "Paris Streets Map", price: 189, rating: 4.7, reviews: 78, image: "/BS2.jpeg", size: "small", region: "city", badge: null },
  { id: 8, name: "London City Map", price: 199, rating: 4.8, reviews: 112, image: "/BS3.jpeg", size: "medium", region: "city", badge: "New" },
  { id: 9, name: "Australia Map", price: 259, rating: 4.6, reviews: 45, image: "/BS4.jpeg", size: "large", region: "country", badge: null },
  { id: 10, name: "Canada Map", price: 269, rating: 4.7, reviews: 67, image: "/Country.jpeg", size: "large", region: "country", badge: null },
  { id: 11, name: "World Map LED", price: 499, rating: 4.9, reviews: 178, image: "/World.jpeg", size: "xl", region: "world", badge: "Premium" },
  { id: 12, name: "Tokyo City Map", price: 179, rating: 4.8, reviews: 89, image: "/Custom.jpeg", size: "small", region: "city", badge: null },
];

const sizeFilters = [
  { id: "small", label: "Small (30x20 cm)" },
  { id: "medium", label: "Medium (60x40 cm)" },
  { id: "large", label: "Large (90x60 cm)" },
  { id: "xl", label: "Extra Large (120x80 cm)" },
];

const regionFilters = [
  { id: "world", label: "World Maps" },
  { id: "country", label: "Country Maps" },
  { id: "city", label: "City Maps" },
];

const ITEMS_PER_PAGE = 9;

export default function ShopPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(500);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  // Debounce price range updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setPriceRange([tempMinPrice, tempMaxPrice]);
      setCurrentPage(1);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [tempMinPrice, tempMaxPrice]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(product.region);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSize && matchesRegion && matchesPrice;
    });
  }, [selectedSizes, selectedRegions, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedRegions([]);
    setPriceRange([0, 500]);
    setTempMinPrice(0);
    setTempMaxPrice(500);
    setCurrentPage(1);
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof allProducts[0]) => {
    e.preventDefault(); // Prevent navigation to product page
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: product.size === "small" ? "Small (30x20 cm)" : 
            product.size === "medium" ? "Medium (60x40 cm)" : 
            product.size === "large" ? "Large (90x60 cm)" : 
            "Extra Large (120x80 cm)",
      color: "Natural Oak"
    });
  };

  const FiltersContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Size</h3>
        <div className="space-y-3">
          {sizeFilters.map((filter) => (
            <label key={filter.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedSizes.includes(filter.id)}
                onCheckedChange={() => toggleSize(filter.id)}
              />
              <span className="text-sm text-muted-foreground">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-4">Region</h3>
        <div className="space-y-3">
          {regionFilters.map((filter) => (
            <label key={filter.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedRegions.includes(filter.id)}
                onCheckedChange={() => toggleRegion(filter.id)}
              />
              <span className="text-sm text-muted-foreground">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Minimum Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={tempMinPrice}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setTempMinPrice(value);
                }}
                className="pl-7"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Maximum Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={tempMaxPrice}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setTempMaxPrice(value);
                }}
                className="pl-7"
                placeholder="No limit"
              />
            </div>
          </div>
        </div>
      </div>

      {(selectedSizes.length > 0 || selectedRegions.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
            Shop All Maps
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Discover our collection of handcrafted wooden maps, from sweeping world views to intricate city streets.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </p>
            <Button
              variant="outline"
              className="lg:hidden bg-transparent"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex gap-12">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h2 className="font-serif text-xl font-medium text-foreground mb-6">Filters</h2>
                <FiltersContent />
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300">
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="group animate-in fade-in duration-300"
                  >
                    <Link href={`/product/${product.id}`}>
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
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-foreground mt-1">${product.price}</p>
                    </Link>
                    <Button 
                      className="w-full mt-3 bg-[#8b5a3c] hover:bg-[#6d4830] text-white"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                    <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-medium text-foreground">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <FiltersContent />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
