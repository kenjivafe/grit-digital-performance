import PageHero from "@/components/layout/pageHero";
import Features from "./sections/features";
import Process from "./sections/process";
import TechStack from "./sections/techStack";
import Pricing from "./sections/pricing";
import Portfolio from "./sections/portfolio";
import Testimonials from "./sections/testimonials";
import FAQ from "./sections/faq";
import CTASection from "@/components/cta";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "Marketing Website Development | Grit Digital Performance",
  description:
    "Custom Next.js and WordPress websites built for sports organizations, schools, and camps. Fast, SEO-optimized, mobile-first — and built to perform.",
};

export default function WebDevelopmentPage() {
  return (
    <>
      <Layout>
        <PageHero
          breadcrumb="Website Development"
          titleLine1="Marketing"
          titleLine2="Websites."
          titleLine2Outline={true}
          descriptor="Custom-built, fast, and designed to convert — engineered for organizations that compete to win."
        />
        <Features />
        <Process />
        <TechStack />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTASection />
      </Layout>
    </>
  );
}