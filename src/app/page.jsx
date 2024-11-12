import Navbar from "./_components/Navbar/navbar";
import Footer from "./_components/Footer/footer";
import Hero from "./_components/heroSection/hero";
import About from "./_components/aboutSection/about";
import Faq from "./_components/faqSection/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Faq />
      <Footer />
    </>
  );
}