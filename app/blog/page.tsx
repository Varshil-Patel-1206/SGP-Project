"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Wooden Map for Your Space",
    excerpt:
      "Discover the key factors to consider when selecting a wooden map that complements your interior design and personal style.",
    image: "/images/blog-1.jpg",
    category: "Interior Design",
    date: "January 15, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Wood Finishing: Behind Our Craftsmanship",
    excerpt:
      "Take a peek behind the scenes at our workshop and learn about the traditional techniques we use to create lasting beauty.",
    image: "/images/blog-2.jpg",
    category: "Craftsmanship",
    date: "January 10, 2026",
    readTime: "7 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Sustainable Wood Sourcing: Our Commitment to the Planet",
    excerpt:
      "Learn about our partnerships with certified sustainable forests and our zero-waste manufacturing process.",
    image: "/images/blog-3.jpg",
    category: "Sustainability",
    date: "January 5, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 4,
    title: "5 Creative Ways to Display Your Wooden Map",
    excerpt:
      "From accent lighting to gallery walls, explore innovative ideas to showcase your wooden map as a stunning centerpiece.",
    image: "/images/world-map.jpg",
    category: "Interior Design",
    date: "December 28, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 5,
    title: "The History of Cartography in Wood Art",
    excerpt:
      "Journey through centuries of map-making and discover how wooden maps became a cherished form of wall art.",
    image: "/images/country-map.jpg",
    category: "History",
    date: "December 20, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Gift Guide: Wooden Maps for Every Occasion",
    excerpt:
      "Whether it's a wedding, housewarming, or anniversary, find the perfect wooden map gift for your loved ones.",
    image: "/images/city-map.jpg",
    category: "Gift Ideas",
    date: "December 15, 2025",
    readTime: "5 min read",
    featured: false,
  },
];

const categories = [
  "All",
  "Interior Design",
  "Craftsmanship",
  "Sustainability",
  "History",
  "Gift Ideas",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Stories & Inspiration
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Discover the artistry behind our wooden maps, interior design
                tips, and stories of craftsmanship that inspire.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Featured Stories
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                All Articles
              </h2>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {post.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="mt-10 text-center">
                <p className="text-muted-foreground">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
                Stay Inspired
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Subscribe to our newsletter for the latest articles, design
                tips, and exclusive offers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 sm:w-80"
                />
                <Button
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
