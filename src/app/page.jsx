import Hero from "./_components/heroSection/hero";
import About from "./_components/aboutSection/about";
import Faq from "./_components/faqSection/faq";
import Speaker from "./_components/speakerSection/speaker";
import Events from "./_components/eventSection/events";
import Schedule from "./_components/scheduleSection/schedule";
import Pre from "./_components/preSection/pre";
import Partner from "./_components/partnerSection/partner";
import Whatsapp from "./_components/whatsapp/whatsapp";

export default async function Home() {
    return (
        <>
            <Hero />
            <About />
            <Whatsapp />
            <Speaker />
            <Events />
            <Pre />
            {/* <Schedule /> */}
            {/* <Partner /> */}
            <Faq />
        </>
    );
}
