import Layout from "@/components/layout/layout";
import { SportsCard } from "@/components/ui/sports-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Users, Target, Zap, Mail } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former professional athlete turned tech entrepreneur with 15+ years in digital sports solutions.",
      expertise: ["Strategy", "Sports Marketing", "Business Development"],
      image: "/team/alex.jpg"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Full-stack developer specializing in scalable web applications and event management systems.",
      expertise: ["Web Development", "System Architecture", "Performance Optimization"],
      image: "/team/sarah.jpg"
    },
    {
      name: "Mike Rodriguez",
      role: "Lead Designer",
      bio: "Creative director with a passion for sports branding and user experience design.",
      expertise: ["UI/UX Design", "Branding", "Frontend Development"],
      image: "/team/mike.jpg"
    },
    {
      name: "Emily Davis",
      role: "Head of Client Success",
      bio: "Dedicated to ensuring sports organizations achieve their digital goals and maximize ROI.",
      expertise: ["Client Management", "Strategy", "Analytics"],
      image: "/team/emily.jpg"
    }
  ];

  const values = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Championship Mindset",
      description: "We approach every project with the same dedication and excellence that champions bring to their game."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "We work as partners with our clients, treating their success as our own victory."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results-Driven",
      description: "Every solution we create is focused on delivering measurable results and tangible growth."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation First",
      description: "We stay ahead of digital trends to bring cutting-edge solutions to the sports industry."
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
              <Trophy className="w-4 h-4 mr-2" />
              About Grit Digital Performance
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Building Digital Champions
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              We&apos;re a team of sports enthusiasts and digital experts dedicated to helping sports organizations 
              thrive in the digital landscape through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2020, Grit Digital Performance was born from a simple observation: 
                  sports organizations were struggling to keep pace with digital transformation.
                </p>
                <p>
                  Our founder, a former professional athlete, experienced firsthand the challenges 
                  of managing team operations, fan engagement, and event registrations with outdated 
                  digital tools. This experience sparked a mission to create comprehensive digital 
                  solutions specifically designed for the sports industry.
                </p>
                <p>
                  Today, we&apos;ve helped over 50 sports organizations transform their digital presence, 
                  process more than 100,000 event registrations, and generate millions in revenue through 
                  our innovative platforms.
                </p>
              </div>
              
              <div className="mt-8">
                <Button className="btn-primary">
                  Partner With Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-600 to-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-white p-12">
                  <div className="text-center">
                    <Trophy className="w-20 h-20 mx-auto mb-6 text-red-300" />
                    <div className="text-3xl font-bold mb-4">50+ Organizations</div>
                    <div className="text-xl text-slate-200">Trust Our Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every solution we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to elevating sports organizations through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <SportsCard
                key={index}
                title={member.name}
                description={member.bio}
                category={member.role}
              >
                <div className="space-y-4">
                  {/* Expertise */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="pt-4 border-t border-slate-200">
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our impact speaks for itself through measurable results and satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Sports Organizations" },
              { value: "100K+", label: "Event Registrations" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "$2M+", label: "Revenue Generated" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Join Our Winning Team?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Whether you&apos;re looking to transform your digital presence or join our team, 
              we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg px-8 py-4">
                View Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


