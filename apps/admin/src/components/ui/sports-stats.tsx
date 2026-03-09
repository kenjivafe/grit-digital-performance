import { cn } from "@repo/utils";
import { Trophy, Users, Target, TrendingUp } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

interface SportsStatsProps {
  stats?: StatItem[];
  className?: string;
  variant?: "grid" | "carousel";
}

const defaultStats: StatItem[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    value: "50+",
    label: "Sports Organizations",
    description: "Trusted by leading sports organizations"
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "100K+",
    label: "Event Registrations",
    description: "Processed through our platform"
  },
  {
    icon: <Target className="w-6 h-6" />,
    value: "98%",
    label: "Client Satisfaction",
    description: "Exceeding expectations consistently"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "300%",
    label: "Average ROI",
    description: "Return on investment for our clients"
  }
];

const SportsStats = ({ 
  stats = defaultStats, 
  className, 
  variant = "grid" 
}: SportsStatsProps) => {
  const displayStats = stats || defaultStats;
  return (
    <section className={cn("py-16 bg-slate-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Champion Results for Sports Organizations
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We deliver measurable results that help sports organizations thrive in the digital landscape
          </p>
        </div>

        {variant === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                
                <div className="stat-number mb-2">{stat.value}</div>
                
                <div className="font-semibold text-slate-900 mb-2">
                  {stat.label}
                </div>
                
                {stat.description && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {displayStats.map((stat, index) => (
              <div 
                key={index}
                className="flex-1 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  {stat.icon}
                </div>
                
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                
                <div className="font-semibold text-slate-900 text-lg mb-2">
                  {stat.label}
                </div>
                
                {stat.description && (
                  <p className="text-slate-600 leading-relaxed px-4">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SportsStats;


