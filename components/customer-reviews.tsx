"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "The craftsmanship is absolutely stunning. Our world map became the centerpiece of our living room. The attention to detail in the wood grain and the precision of the laser cutting is remarkable.",
    product: "Classic World Map",
    avatar: "SM",
  },
  {
    id: 2,
    name: "James Thornton",
    location: "London, UK",
    rating: 5,
    text: "I ordered a custom UK map with our family's travel pins marked. The team was incredibly responsive and the final product exceeded all expectations. Truly a work of art.",
    product: "Custom UK Map",
    avatar: "JT",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "As an interior designer, I've recommended WoodMaps to countless clients. The quality is consistent, the designs are elegant, and the sustainable sourcing aligns with my values.",
    product: "LED Europe Map",
    avatar: "ER",
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "The LED-backlit world map transforms our office space. During the day it's a beautiful wooden piece, and at night the warm glow creates an incredible atmosphere.",
    product: "LED World Map XL",
    avatar: "MC",
  },
];

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
            <Quote className="w-12 h-12 text-accent/20 mb-6" />
            
            <div className="min-h-[200px]">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 text-pretty">
                {reviews[currentIndex].text}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold text-lg">
                  {reviews[currentIndex].avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {reviews[currentIndex].name}
                    </p>
                    <div className="flex">
                      {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reviews[currentIndex].location} &middot; {reviews[currentIndex].product}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif text-4xl font-medium text-foreground mb-2">10K+</p>
            <p className="text-muted-foreground text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-medium text-foreground mb-2">50+</p>
            <p className="text-muted-foreground text-sm">Countries Shipped</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-medium text-foreground mb-2">4.9</p>
            <p className="text-muted-foreground text-sm">Average Rating</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-medium text-foreground mb-2">8 Years</p>
            <p className="text-muted-foreground text-sm">In Business</p>
          </div>
        </div>
      </div>
    </section>
  );
}
