import { Hammer, Leaf, Palette, Truck } from "lucide-react";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description:
      "Each map is meticulously crafted by skilled artisans using traditional woodworking techniques combined with modern precision.",
  },
  {
    icon: Leaf,
    title: "Sustainable Wood",
    description:
      "We source our wood from certified sustainable forests, ensuring every purchase supports responsible forestry practices.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Choose your size, wood type, finish, and even add personalized engravings to create a truly unique piece.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Secure packaging and express shipping options ensure your map arrives safely and on time, anywhere in the world.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3 font-medium">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
            Crafted with Purpose
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            We believe in creating pieces that last generations, made with care for both craftsmanship and our planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
