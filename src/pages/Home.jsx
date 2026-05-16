import Footer from "../components/layout/Footer";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Stats from "../components/Home/Stats";


export default function Home() {
  return (
    <div className="app">
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </div>
  );
}