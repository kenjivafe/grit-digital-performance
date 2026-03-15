import Layout from "@/components/layout/layout";
import { SportsCard } from "@/components/ui/sports-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Calendar, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      title: "Colorado Soccer Championship 2024",
      description: "Premier youth soccer tournament featuring teams from across the state with professional-level organization and player development focus.",
      category: "Tournament",
      date: "June 15-18, 2024",
      location: "Denver, CO",
      stats: [
        { label: "Teams", value: "64" },
        { label: "Players", value: "1,200+" }
      ],
      registrationStatus: "Open",
      price: "$350/team"
    },
    {
      title: "Mountain State Basketball Showcase",
      description: "Elite basketball tournament for high school players with college scouts and professional coaching staff.",
      category: "Showcase",
      date: "July 8-10, 2024",
      location: "Colorado Springs, CO",
      stats: [
        { label: "Teams", value: "32" },
        { label: "Scouts", value: "50+" }
      ],
      registrationStatus: "Open",
      price: "$500/team"
    },
    {
      title: "Rocky Mountain Volleyball Festival",
      description: "Multi-day volleyball festival featuring clinics, competitions, and skill development for all age groups.",
      category: "Festival",
      date: "August 2-6, 2024",
      location: "Boulder, CO",
      stats: [
        { label: "Teams", value: "96" },
        { label: "Participants", value: "1,500+" }
      ],
      registrationStatus: "Opening Soon",
      price: "$400/team"
    },
    {
      title: "Frontier Football Combine",
      description: "Professional-style combine for high school football players with performance testing and college recruitment.",
      category: "Combine",
      date: "May 20, 2024",
      location: "Fort Collins, CO",
      stats: [
        { label: "Athletes", value: "300+" },
        { label: "Colleges", value: "40+" }
      ],
      registrationStatus: "Limited Spots",
      price: "$150/athlete"
    },
    {
      title: "Summit Lacrosse Classic",
      description: "Competitive lacrosse tournament with divisions for youth, high school, and adult players.",
      category: "Tournament",
      date: "September 9-11, 2024",
      location: "Vail, CO",
      stats: [
        { label: "Teams", value: "48" },
        { label: "Divisions", value: "8" }
      ],
      registrationStatus: "Open",
      price: "$450/team"
    },
    {
      title: "Colorado Youth Hockey League Finals",
      description: "Championship tournament for the state's top youth hockey teams with playoff format and professional facilities.",
      category: "Championship",
      date: "April 5-7, 2024",
      location: "Denver, CO",
      stats: [
        { label: "Teams", value: "24" },
        { label: "Games", value: "60+" }
      ],
      registrationStatus: "By Invitation",
      price: "League Fee"
    }
  ];

  const categories = ["All", "Tournament", "Showcase", "Festival", "Combine", "Championship"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Limited Spots":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Opening Soon":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "By Invitation":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

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
              Sports Events & Tournaments
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Championship Events Powered by Technology
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              Discover and register for premier sports events across Colorado. 
              Our registration platform makes it easy to participate in the tournaments 
              that matter to your athletes and organization.
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

      {/* Events Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <SportsCard
                key={index}
                title={event.title}
                description={event.description}
                category={event.category}
                stats={event.stats}
              >
                <div className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-red-500" />
                      <span>{event.price}</span>
                    </div>
                  </div>

                  {/* Registration Status */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(event.registrationStatus)}>
                      {event.registrationStatus}
                    </Badge>
                    <Button size="sm" className="btn-primary">
                      Register
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Host Your Event Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Host Your Event With Us
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Looking to organize a sports tournament or event? Our comprehensive event 
                  management platform handles everything from registration to results, letting 
                  you focus on creating an amazing experience for participants.
                </p>
                <p>
                  Join hundreds of event organizers who trust our platform to deliver 
                  professional, seamless events that athletes and fans love.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-700">Easy online registration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-700">Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-700">Real-time participant management</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="btn-primary">
                  Plan Your Event
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-xl p-8">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Event Management Made Simple
                </h3>
                <p className="text-slate-600 mb-6">
                  From small local tournaments to large-scale championships, 
                  our platform scales to meet your needs.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-600">200+</div>
                    <div className="text-sm text-slate-600">Events Managed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">100K+</div>
                    <div className="text-sm text-slate-600">Registrations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Compete?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Browse our upcoming events or contact us to host your own tournament 
              with our professional event management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Register for Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-slate-900">
                Host Your Event
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


