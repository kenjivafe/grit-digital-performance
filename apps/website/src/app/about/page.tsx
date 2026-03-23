import PageHero from "@/components/layout/pageHero";
import Story from "./sections/story";
import Values from "./sections/values";
import WhyUs from "./sections/whyUs";
import Team from "./sections/team";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "About | Grit Digital Performance",
  description: "Learn about GRIT Digital Performance — our story, mission, values, and the team behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <Layout>
        <PageHero
          breadcrumb="About"
          titleLine1="Who We"
          titleLine2="Are."
          titleLine2Outline={true}
          descriptor="A focused agency built for organizations that compete to win."
        />
        <Story />
        <Values />
        <WhyUs />
        <Team />
      </Layout>
    </>
  );
}