import PageHero from "@/components/layout/pageHero";
import Layout from "@/components/layout/layout";
import CTASection from "@/components/cta";
import Features from "./sections/features";
import HowItWorks from "./sections/howItWorks";
import Payments from "./sections/payments";
import Templates from "./sections/templates";
import Pricing from "./sections/pricing";
import Portfolio from "./sections/portfolio";
import Testimonials from "./sections/testimonials";
import FAQ from "./sections/faq";

export const metadata = {
  title: "Event Registration Systems | Grit Digital Performance",
  description:
    "Custom event registration systems for sports organizations, schools, and camps. Stripe payments, digital waivers, QR check-in, and real-time reporting — all in one platform.",
};

export default function EventRegistrationPage() {
  return (
    <>
      <Layout>
        <PageHero
          breadcrumb="Event Registration"
          titleLine1="Event"
          titleLine2="Registration."
          titleLine2Outline={true}
          descriptor="End-to-end registration systems built for sports orgs, schools, and camps — from sign-up to check-in."
        />
        <Features />
        <HowItWorks />
        <Payments />
        <Templates />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTASection />
      </Layout>
    </>
  )
}