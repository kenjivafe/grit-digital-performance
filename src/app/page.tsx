import Layout from "@/components/layout/layout";
import SportsStats from "@/components/ui/sports-stats";
import SportsCard from "@/components/ui/sports-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import Hero from "./home/sections/hero";
import CTASection from "@/components/cta";

export default function Home() {
  const services = [
    {
      title: "Website Development",
      description:
        "Custom, high-performance websites built specifically for sports organizations to engage fans and drive growth.",
      category: "Web Services",
      stats: [
        { label: "Projects Completed", value: "50+" },
        { label: "Client Satisfaction", value: "98%" },
      ],
    },
    {
      title: "Event Registration",
      description:
        "Seamless online registration systems with payment processing that handle everything from sign-ups to check-ins.",
      category: "Event Management",
      stats: [
        { label: "Registrations Processed", value: "100K+" },
        { label: "Revenue Generated", value: "$2M+" },
      ],
    },
    {
      title: "Sports Consulting",
      description:
        "Strategic digital consulting to help sports organizations maximize their online presence and fan engagement.",
      category: "Consulting",
      stats: [
        { label: "Organizations Helped", value: "30+" },
        { label: "Growth Rate", value: "300%" },
      ],
    },
  ];

  return (
    <Layout>
      <Hero />

      {/* Stats Section */}
      <SportsStats />

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Services That Win
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From website development to event registration, we provide
              comprehensive digital solutions for sports organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <SportsCard
                key={index}
                title={service.title}
                description={service.description}
                category={service.category}
                stats={service.stats}
              >
                <div className="pt-4">
                  <Button className="btn-primary w-full">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
