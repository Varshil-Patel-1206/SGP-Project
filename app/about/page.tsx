import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TreePine, Heart, Users, Award, Leaf, Hammer, Globe, Sparkles } from "lucide-react";

const values = [
  {
    icon: Hammer,
    title: "Craftsmanship First",
    description: "Every map is handcrafted with meticulous attention to detail, combining traditional woodworking techniques with modern precision tools.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "We source our wood exclusively from certified sustainable forests, ensuring every purchase contributes to responsible forestry.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each piece carries the passion of our artisans who pour their hearts into creating something truly special for your home.",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "We believe in connecting people through art, bringing the beauty of our world into homes across every continent.",
  },
];

const process = [
  {
    step: "01",
    title: "Design & Planning",
    description: "Our designers meticulously plan each layer, ensuring every continent, country, and city is perfectly proportioned.",
  },
  {
    step: "02",
    title: "Wood Selection",
    description: "We hand-select premium birch plywood from sustainable forests, choosing pieces with the most beautiful natural grain.",
  },
  {
    step: "03",
    title: "Precision Cutting",
    description: "Using state-of-the-art laser cutting technology, we achieve incredibly precise borders and intricate details.",
  },
  {
    step: "04",
    title: "Hand Finishing",
    description: "Each piece is carefully sanded, stained, and finished by hand with natural oils that enhance the wood's natural beauty.",
  },
  {
    step: "05",
    title: "Quality Check",
    description: "Every map undergoes rigorous quality inspection before being carefully packaged for its journey to your home.",
  },
];

const stats = [
  { number: "10,000+", label: "Maps Delivered" },
  { number: "50+", label: "Countries Served" },
  { number: "8", label: "Years of Craft" },
  { number: "100%", label: "Sustainable Wood" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Our woodworking workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <p className="text-background/90 text-sm uppercase tracking-[0.3em] mb-6 font-medium">
            Our Story
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-background leading-tight mb-6 text-balance">
            Where Passion Meets Craftsmanship
          </h1>
          <p className="text-background/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
            From a small workshop to a global brand, we've been turning sustainably sourced wood 
            into meaningful art that connects people to the places they love.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
                The Beginning
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6 text-balance">
                A Dream Born in a Garage Workshop
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2015, in a small garage workshop in Portland, Oregon, our founder Marcus had a simple 
                  dream: to create beautiful wooden maps that would help people celebrate the places that 
                  shaped their lives.
                </p>
                <p>
                  What started as a passion project—creating a wooden world map for his own living room—quickly 
                  became something more when friends and family couldn't stop asking where he got it. That first 
                  map, with its imperfect edges and visible wood grain, sparked something that would grow into 
                  WoodMaps Co.
                </p>
                <p>
                  Today, we've delivered over 10,000 maps to homes across 50 countries, but our philosophy 
                  remains the same: every map should tell a story, honor the craft, and bring a piece of 
                  the world into your home.
                </p>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/images/crafting.jpg"
                alt="Artisan crafting a wooden map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              Our Mission & Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              We believe that art should be meaningful, sustainable, and crafted with intention. 
              These values guide everything we create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card p-8 rounded-lg border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wood Sourcing */}
      <section id="sustainability" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/hero-wooden-map.jpg"
                alt="Sustainable wood sourcing"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <TreePine className="w-6 h-6 text-accent" />
                <p className="text-accent text-sm uppercase tracking-[0.2em] font-medium">
                  Sustainability
                </p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6 text-balance">
                Responsibly Sourced, Thoughtfully Crafted
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We believe beautiful art shouldn't come at the cost of our planet. That's why every 
                  piece of wood we use is sourced from FSC-certified sustainable forests in Northern Europe 
                  and North America.
                </p>
                <p>
                  Our premium birch plywood comes from forests where new trees are planted for every 
                  one harvested, ensuring a continuous cycle of growth and renewal. We work directly 
                  with forestry partners who share our commitment to environmental stewardship.
                </p>
                <p>
                  From our eco-friendly finishing oils to our recycled packaging materials, sustainability 
                  touches every part of our process. When you hang a WoodMaps piece on your wall, you're 
                  not just adding art to your home—you're supporting responsible forestry.
                </p>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Award className="w-8 h-8 text-accent" />
                  <span className="text-sm font-medium text-foreground">FSC Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-8 h-8 text-accent" />
                  <span className="text-sm font-medium text-foreground">Carbon Neutral</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crafting Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
              The Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              From Raw Wood to Wall Art
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every map goes through a meticulous 5-step process that combines traditional 
              craftsmanship with modern precision.
            </p>
          </div>

          <div className="space-y-8">
            {process.map((item, index) => (
              <div
                key={item.step}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="font-serif text-3xl text-accent font-medium">{item.step}</span>
                  </div>
                </div>
                <div className="w-full md:w-2/3 bg-card p-8 rounded-lg border border-border">
                  <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl md:text-5xl font-medium mb-2">{stat.number}</p>
                <p className="text-primary-foreground/80 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Culture */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-accent" />
            <p className="text-accent text-sm uppercase tracking-[0.2em] font-medium">
              Our Team
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6 text-balance max-w-3xl mx-auto">
            A Family of Artisans, Designers, and Dreamers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Behind every map is a team of passionate craftspeople who believe in creating meaningful art. 
            From our designers in Portland to our artisans in our workshop, every member of our team 
            shares the same dedication to quality and sustainability.
          </p>

          <div className="bg-secondary rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-6" />
            <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-6 text-pretty">
              "We don't just make maps. We create pieces of art that connect people to the places 
              they love, the journeys they've taken, and the dreams they're still chasing."
            </p>
            <p className="text-accent font-medium">Marcus Chen</p>
            <p className="text-sm text-muted-foreground">Founder & Master Craftsman</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-6 text-balance">
            Ready to Bring the World Into Your Home?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Explore our collection of handcrafted wooden maps or create your own custom piece 
            that tells your unique story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 bg-transparent">
              <Link href="/customize">Create Custom Map</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
