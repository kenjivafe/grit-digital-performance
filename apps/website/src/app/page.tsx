import Layout from "@/components/layout/layout";
import Hero from "./home/sections/hero";
import CTASection from "@/components/cta";
import Stats from "./home/sections/stats";
import Services from "./home/sections/services";
import FAQSection from "./home/sections/faq";
import HowItWorks from "./home/sections/howItWorks";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Stats />
      <HowItWorks />
      <CTASection />
      <FAQSection />
    </Layout>
  );
}


