"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, Shield, Package, Minus, Plus, ChevronRight, Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const products: Record<string, {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
}> = {
  "1": {
    id: 1,
    name: "Classic World Map",
    price: 299,
    rating: 4.9,
    reviews: 128,
    images: ["/World.jpeg", "/Home.jpeg", "/Custom.jpeg", "/Country.jpeg"],
    description: "Our Classic World Map is a stunning centerpiece that brings the beauty of our planet into your home. Each continent is meticulously laser-cut from premium birch plywood and assembled by hand, creating a dimensional work of art that captures light and shadow throughout the day.",
    features: ["Multi-layered 3D design", "Premium birch plywood", "Hand-finished with natural oils", "Easy wall mounting system", "Includes installation kit"],
  },
  "2": {
    id: 2,
    name: "LED Europe Map",
    price: 349,
    rating: 4.8,
    reviews: 89,
    images: ["/Country.jpeg", "/World.jpeg", "/Custom.jpeg", "/Home.jpeg"],
    description: "Illuminate your space with our LED Europe Map. This stunning piece features integrated warm LED backlighting that creates an ambient glow, perfect for home offices or living spaces. Country borders are precisely defined, making it both decorative and educational.",
    features: ["Integrated LED lighting", "Remote control dimmer", "USB powered", "Country border details", "Includes power adapter"],
  },
  "3": {
    id: 3,
    name: "Minimalist Japan Map",
    price: 199,
    rating: 4.9,
    reviews: 67,
    images: ["/Custom.jpeg", "/World.jpeg", "/Country.jpeg", "/Home.jpeg"],
    description: "Experience the elegance of Japanese minimalism with our Japan Map. Clean lines and precise detailing showcase the island nation's unique geography. Perfect for modern interiors and Japan enthusiasts.",
    features: ["Minimalist design", "Detailed island contours", "Premium wood finish", "Lightweight construction", "Easy installation"],
  },
  "4": {
    id: 4,
    name: "USA States Map",
    price: 279,
    rating: 4.7,
    reviews: 156,
    images: ["/Home.jpeg", "/World.jpeg", "/Country.jpeg", "/Custom.jpeg"],
    description: "Celebrate American geography with our detailed USA States Map. Each state is individually cut and labeled, making it perfect for educational purposes or as a patriotic home decor piece.",
    features: ["All 50 states detailed", "State borders clearly defined", "Durable construction", "Educational and decorative", "Made in USA"],
  },
  "5": {
    id: 5,
    name: "World Map XL",
    price: 449,
    rating: 4.9,
    reviews: 203,
    images: ["/World.jpeg", "/Home.jpeg", "/Custom.jpeg", "/Country.jpeg"],
    description: "Make a bold statement with our extra-large World Map. This impressive piece spans over 4 feet wide, featuring intricate continental details and ocean depth variations. Perfect for large walls and open spaces.",
    features: ["Extra large size", "Detailed topography", "Premium materials", "Professional installation kit", "Lifetime warranty"],
  },
  "6": {
    id: 6,
    name: "NYC City Map",
    price: 189,
    rating: 4.8,
    reviews: 94,
    images: ["/BS1.jpeg", "/BS2.jpeg", "/BS3.jpeg", "/BS4.jpeg"],
    description: "Capture the energy of New York City with our detailed street map. From Manhattan to Brooklyn, every borough is represented with precision. Perfect for NYC lovers and urban design enthusiasts.",
    features: ["Detailed street layout", "All 5 boroughs", "Landmark locations", "Compact size", "Modern aesthetic"],
  },
  "7": {
    id: 7,
    name: "Paris Streets Map",
    price: 189,
    rating: 4.7,
    reviews: 78,
    images: ["/BS2.jpeg", "/BS1.jpeg", "/BS3.jpeg", "/BS4.jpeg"],
    description: "Bring the romance of Paris into your home with our intricate street map. The Seine River winds through the city, with major landmarks and arrondissements beautifully detailed.",
    features: ["Seine River detail", "Arrondissement divisions", "Landmark indicators", "French craftsmanship", "Elegant design"],
  },
  "8": {
    id: 8,
    name: "London City Map",
    price: 199,
    rating: 4.8,
    reviews: 112,
    images: ["/BS3.jpeg", "/BS1.jpeg", "/BS2.jpeg", "/BS4.jpeg"],
    description: "Explore the historic streets of London with our detailed city map. The Thames River, iconic neighborhoods, and major landmarks are all represented in this sophisticated piece.",
    features: ["Thames River detail", "Borough divisions", "Historic landmarks", "British craftsmanship", "Classic design"],
  },
  "9": {
    id: 9,
    name: "Australia Map",
    price: 259,
    rating: 4.6,
    reviews: 45,
    images: ["/BS4.jpeg", "/Country.jpeg", "/World.jpeg", "/Custom.jpeg"],
    description: "Showcase the vast beauty of Australia with our continental map. From the Outback to the Great Barrier Reef, this map captures the unique geography of the land down under.",
    features: ["Continental detail", "State boundaries", "Coastal features", "Australian timber", "Weather-resistant finish"],
  },
  "10": {
    id: 10,
    name: "Canada Map",
    price: 269,
    rating: 4.7,
    reviews: 67,
    images: ["/Country.jpeg", "/World.jpeg", "/Home.jpeg", "/Custom.jpeg"],
    description: "Celebrate Canada's vast landscape with our detailed provincial map. From coast to coast, this piece showcases the true north strong and free with precision and pride.",
    features: ["All provinces and territories", "Great Lakes detail", "Arctic archipelago", "Canadian maple wood", "Bilingual labels available"],
  },
  "11": {
    id: 11,
    name: "World Map LED",
    price: 499,
    rating: 4.9,
    reviews: 178,
    images: ["/World.jpeg", "/Home.jpeg", "/Custom.jpeg", "/Country.jpeg"],
    description: "Our premium LED World Map combines artistry with technology. Warm LED backlighting creates a stunning ambiance while highlighting continental details. Remote-controlled brightness for any mood.",
    features: ["Premium LED system", "Remote control", "Adjustable brightness", "Energy efficient", "Premium materials"],
  },
  "12": {
    id: 12,
    name: "Tokyo City Map",
    price: 179,
    rating: 4.8,
    reviews: 89,
    images: ["/Custom.jpeg", "/BS1.jpeg", "/BS2.jpeg", "/BS3.jpeg"],
    description: "Experience the intricate urban planning of Tokyo with our detailed city map. From Shibuya to Shinjuku, this map captures the organized chaos of Japan's capital city.",
    features: ["Ward divisions", "Major districts", "Railway lines", "Compact design", "Japanese aesthetic"],
  },
};

const defaultProduct = {
  id: 1,
  name: "Classic World Map",
  price: 299,
  rating: 4.9,
  reviews: 128,
  images: ["/World.jpeg", "/Home.jpeg", "/Custom.jpeg", "/Country.jpeg"],
  description: "Our Classic World Map is a stunning centerpiece that brings the beauty of our planet into your home.",
  features: ["Multi-layered 3D design", "Premium birch plywood", "Hand-finished with natural oils", "Easy wall mounting system", "Includes installation kit"],
};

const sizeOptions = [
  { id: "small", label: "Small", dimensions: "30 x 20 cm", price: 0 },
  { id: "medium", label: "Medium", dimensions: "60 x 40 cm", price: 50 },
  { id: "large", label: "Large", dimensions: "90 x 60 cm", price: 100 },
  { id: "xl", label: "XL", dimensions: "120 x 80 cm", price: 200 },
];

const colorOptions = [
  { id: "natural", label: "Natural Oak", color: "#C4A77D" },
  { id: "walnut", label: "Dark Walnut", color: "#5C4033" },
  { id: "white", label: "White Wash", color: "#E8E4DC" },
];

const languageOptions = [
  { id: "en", label: "English" },
  { id: "de", label: "German" },
  { id: "fr", label: "French" },
  { id: "es", label: "Spanish" },
];

const relatedProducts = [
  { id: 3, name: "Minimalist Japan Map", price: 199, image: "/Custom.jpeg" },
  { id: 4, name: "USA States Map", price: 279, image: "/Home.jpeg" },
  { id: 5, name: "World Map XL", price: 449, image: "/World.jpeg" },
  { id: 6, name: "NYC City Map", price: 189, image: "/BS1.jpeg" },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products[productId] || defaultProduct;
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("natural");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizePrice = sizeOptions.find((s) => s.id === selectedSize)?.price || 0;
  const totalPrice = product.price + sizePrice;

  const handleAddToCart = () => {
    const selectedSizeOption = sizeOptions.find((s) => s.id === selectedSize);
    const selectedColorOption = colorOptions.find((c) => c.id === selectedColor);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: totalPrice,
      quantity: quantity,
      image: product.images[0],
      size: `${selectedSizeOption?.label} (${selectedSizeOption?.dimensions})`,
      color: selectedColorOption?.label || "Natural Oak"
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-muted ${
                      selectedImage === index ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    <Image src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-3xl font-semibold text-foreground mb-6">${totalPrice}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="space-y-6 mb-8">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Size</Label>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-2 gap-3">
                    {sizeOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                        <Label
                          htmlFor={option.id}
                          className="flex flex-col items-center justify-center p-4 border border-border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/5 hover:border-muted-foreground"
                        >
                          <span className="font-medium text-foreground">{option.label}</span>
                          <span className="text-sm text-muted-foreground">{option.dimensions}</span>
                          {option.price > 0 && (
                            <span className="text-sm text-accent mt-1">+${option.price}</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Wood Color</Label>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
                    {colorOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem value={option.id} id={`color-${option.id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${option.id}`}
                          className="flex flex-col items-center gap-2 p-3 border border-border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-accent hover:border-muted-foreground"
                        >
                          <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: option.color }} />
                          <span className="text-xs text-muted-foreground">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Label Language</Label>
                  <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="flex flex-wrap gap-3">
                    {languageOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem value={option.id} id={`lang-${option.id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`lang-${option.id}`}
                          className="px-4 py-2 border border-border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/5 hover:border-muted-foreground text-sm text-foreground"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full py-6 text-base bg-[#8b5a3c] hover:bg-[#6d4830]"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart - ${totalPrice * quantity}
                  </>
                )}
              </Button>

              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-accent" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>5-year warranty on all products</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Package className="w-5 h-5 text-accent" />
                  <span>Easy wall mounting - hardware included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 mb-8">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Shipping & Delivery
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Installation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="prose prose-neutral max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                <h3 className="font-serif text-xl text-foreground mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              <div className="prose prose-neutral max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We ship worldwide with care to ensure your map arrives in perfect condition.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Free shipping on orders over $200
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Standard delivery: 7-14 business days
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Express delivery: 3-5 business days (+$25)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Secure, custom packaging for safe transit
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="mt-0">
              <div className="prose prose-neutral max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every map comes with everything you need for easy installation.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Wall mounting template included
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Hidden hanging system for clean look
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Step-by-step video guide available
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    Customer support available if needed
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors text-sm">
                  {item.name}
                </h3>
                <p className="text-foreground font-semibold mt-1">${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
