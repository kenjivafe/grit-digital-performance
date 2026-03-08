import Layout from "@/components/layout/layout";
import SportsCard from "@/components/ui/sports-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy } from "lucide-react";

export default function PortfolioPage() {
  const projects = [
    {
      title: "Denver United Soccer Club",
      description: "Complete website redesign with integrated player registration, schedule management, and fan engagement features.",
      category: "Website Development",
      stats: [
        { label: "Page Load Speed", value: "1.2s" },
        { label: "User Engagement", value: "+250%" }
      ],
      image: "/portfolio/denver-united.jpg",
      link: "/portfolio/denver-united"
    },
    {
      title: "Mountain State Basketball Tournament",
      description: "Custom event registration system handling 5,000+ registrations with automated payment processing and team management.",
      category: "Event Registration",
      stats: [
        { label: "Registrations", value: "5,000+" },
        { label: "Processing Time", value: "<30s" }
      ],
      image: "/portfolio/basketball-tournament.jpg",
      link: "/portfolio/basketball-tournament"
    },
    {
      title: "Colorado Youth Hockey League",
      description: "Multi-organization platform serving 20+ teams with unified scheduling, registration, and communication tools.",
      category: "Platform Development",
      stats: [
        { label: "Teams Served", value: "20+" },
        { label: "Monthly Users", value: "10,000+" }
      ],
      image: "/portfolio/hockey-league.jpg",
      link: "/portfolio/hockey-league"
    },
    {
      title: "Rocky Mountain Marathon",
      description: "End-to-end race management system with registration, timing integration, and real-time results display.",
      category: "Event Management",
      stats: [
        { label: "Participants", value: "3,000+" },
        { label: "Revenue Generated", value: "$450K" }
      ],
      image: "/portfolio/marathon.jpg",
      link: "/portfolio/marathon"
    },
    {
      title: "Frontier Football Academy",
      description: "Mobile-first website with training program registration, coach communication, and performance tracking.",
      category: "Mobile Development",
      stats: [
        { label: "Mobile Traffic", value: "75%" },
        { label: "Conversion Rate", value: "12%" }
      ],
      image: "/portfolio/football-academy.jpg",
      link: "/portfolio/football-academy"
    },
    {
      title: "Summit Volleyball Series",
      description: "Tournament management platform with live scoring, bracket updates, and spectator engagement features.",
      category: "Tournament Platform",
      stats: [
        { label: "Tournaments", value: "15+" },
        { label: "Live Spectators", value: "50,000+" }
      ],
      image: "/portfolio/volleyball-series.jpg",
      link: "/portfolio/volleyball-series"
    }
  ];

  const categories = ["All", "Website Development", "Event Registration", "Platform Development", "Event Management", "Mobile Development", "Tournament Platform"];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-red-600 text-white hover:bg-red-700 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Our Success Stories
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Champion Results for Sports Organizations
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              Discover how we&apos;ve helped sports organizations transform their digital presence 
              and achieve remarkable results through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "btn-primary" : "btn-outline"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <SportsCard
                key={index}
                title={project.title}
                description={project.description}
                category={project.category}
                stats={project.stats}
              >
                <div className="pt-4">
                  <Button className="btn-primary w-full">
                    View Case Study
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Results That Speak for Themselves
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our portfolio isn&apos;t just about pretty websites—it&apos;s about delivering measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "100K+", label: "Users Served" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "$2M+", label: "Revenue Generated" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s discuss how we can create similar results for your sports organization.
            </p>
            <Button className="btn-primary text-lg px-8 py-4">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
