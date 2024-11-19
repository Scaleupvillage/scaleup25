import Hero from "./_components/heroSection/hero";
import About from "./_components/aboutSection/about";
import Faq from "./_components/faqSection/faq";
import Speaker from "./_components/speakerSection/speaker";
import Events from "./_components/eventSection/events";
import Schedule from "./_components/scheduleSection/schedule";
import Pre from "./_components/preSection/pre";
import Partner from "./_components/partnerSection/partner";

export default async function Home() {

  const res = await fetch('https://opensheet.elk.sh/19LTxx4geEuhY4RXCOJ6vOpYonO_mVAfA-wwPfNR5PDU/About', { cache: 'no-store' });
  const aboutData = await res.json();

  return (
    <>
      <Hero />
      <About content={aboutData} />
      {/* <Speaker /> */}
      <Events />
      <Pre />
      {/* <Schedule /> */}
      {/* <Partner /> */}
      <Faq />
    </>
  );
}