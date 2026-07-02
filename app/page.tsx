// import Header from "../components/Header/Header";
import Hero from "../components/Home/Hero";
import CardSection from "../components/Home/CardSection";
import About from "../components/Home/About";
import Footer from "../components/Home/Footer";
import FAQ from "@/components/Home/FAQ";
import Header from "@/components/Header/Header-v1";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <Hero />
      <CardSection />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
}
