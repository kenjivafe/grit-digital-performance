import Hero from "./sections/hero";
import ContactForm from "./sections/contactForm";
import FAQ from "./sections/faq";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "Contact | Grit Digital Performance",
  description: "Get in touch with Grit Digital Performance. We build marketing websites and event registration systems for sports organizations, schools, and camps.",
};

export default function ContactPage() {
  return (
    <>
      <Layout>
        <Hero
          breadcrumb="Contact"
          titleLine1="Let's"
          titleLine2="Talk."
          titleLine2Outline={false}
          descriptor="Tell us about your project and we'll be in touch within 24 hours."
        />
        <ContactForm />
        <FAQ />
      </Layout>
    </>
  );
}