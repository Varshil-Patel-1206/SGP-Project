import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCollections } from "@/components/featured-collections";
import { WhyChooseUs } from "@/components/why-choose-us";
import { BestSellers } from "@/components/best-sellers";
import { CustomerReviews } from "@/components/customer-reviews";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedCollections />
      <WhyChooseUs />
      <BestSellers />
      <CustomerReviews />
      <Footer />
    </>
  );
}
