import Layout from "@/components/layout/layout";
import SportsCard from "@/components/ui/sports-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Zap, Shield, TrendingUp } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Sports Website Development",
      description: "Custom, high-performance websites built specifically for sports organizations. From professional teams to youth leagues, we create digital experiences that engage fans and drive growth.",
      category: "Web Services",
      features: [
        "Responsive design for all devices",
        "Fast loading and SEO optimized",
        "Custom branding and sports themes",
        "Content management system",
        "Analytics and performance tracking"
      ],
      stats: [
        { label: "Websites Launched", value: "50+" },
        { label: "Page Load Speed", value: "<2s" }
      ],
      price: "Starting at $5,000"
    },
    {
      title: "Event Registration System",
      description: "Complete online registration platform with payment processing, participant management, and real-time analytics. Perfect for tournaments, camps, and sports events of all sizes.",
      category: "Event Management",
      features: [
        "Online registration forms",
        "Secure payment processing",
        "Participant management",
        "Automated communications",
        "Revenue tracking and reporting"
      ],
      stats: [
        { label: "Events Managed", value: "200+" },
        { label: "Registrations Processed", value: "100K+" }
      ],
      price: "Starting at $2,500 + 2% per registration"
    },
    {
      title: "Sports Digital Consulting",
      description: "Strategic consulting to help sports organizations maximize their digital presence and fan engagement. We analyze your current setup and create a roadmap for digital success.",
      category: "Consulting",
      features: [
        "Digital strategy development",
        "Technology assessment",
        "Fan engagement analysis",
        "Revenue optimization",
        "Implementation roadmap"
      ],
      stats: [
        { label: "Organizations Helped", value: "30+" },
        { label: "Average Growth", value: "300%" }
      ],
      price: "Starting at $3,000"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for sports organizations. Keep your fans engaged with dedicated apps for schedules, scores, and team updates.",
      category: "Mobile Development",
      features: [
        "iOS and Android apps",
        "Real-time scores and updates",
        "Push notifications",
        "Ticket integration",
        "Fan engagement features"
      ],
      stats: [
        { label: "Apps Developed", value: "15+" },
        { label: "Active Users", value: "50K+" }
      ],
      price: "Starting at $15,000"
    },
    {
      title: "Sports Marketing Automation",
      description: "Automated marketing solutions tailored for sports organizations. From email campaigns to social media management, we help you reach and engage your audience effectively.",
      category: "Marketing",
      features: [
        "Email marketing automation",
        "Social media management",
        "Fan segmentation",
        "Campaign analytics",
        "Lead generation funnels"
      ],
      stats: [
        { label: "Campaigns Managed", value: "500+" },
        { label: "Open Rate", value: "45%" }
      ],
      price: "Starting at $1,500/month"
    },
    {
      title: "Data Analytics & Reporting",
      description: "Comprehensive analytics and reporting solutions for sports organizations. Track performance, fan engagement, and revenue with custom dashboards and insights.",
      category: "Analytics",
      features: [
        "Custom dashboards",
        "Performance metrics",
        "Fan behavior analysis",
        "Revenue tracking",
        "Predictive analytics"
      ],
      stats: [
        { label: "Data Points Tracked", value: "1M+" },
        { label: "Client Insights", value: "95%" }
      ],
      price: "Starting at $2,000/month"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-red-600 text-white hover:bg-red-700 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Professional Services
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Digital Solutions for Sports Champions
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              From website development to event registration systems, we provide comprehensive digital services designed specifically for sports organizations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-slate-900">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Services That Drive Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to build a powerful digital presence for your sports organization.
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
                <div className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-lg font-semibold text-slate-900 mb-3">
                      {service.price}
                    </div>
                    <Button className="btn-primary w-full">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure your project succeeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Discovery",
                description: "We learn about your organization, goals, and challenges to create a tailored strategy."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Strategy",
                description: "Our team develops a comprehensive digital strategy aligned with your objectives."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Implementation",
                description: "We build and deploy your solution with attention to detail and quality."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Optimization",
                description: "We continuously monitor and optimize performance to ensure maximum results."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">
                  {step.description}
                </p>
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
              Ready to Transform Your Sports Organization?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s discuss how our services can help you achieve your digital goals and drive growth.
            </p>
            <Button className="btn-primary text-lg px-8 py-4">
              Schedule Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
