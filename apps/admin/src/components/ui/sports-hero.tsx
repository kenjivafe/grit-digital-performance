"use client";

import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { ArrowRight, Play, Trophy } from "lucide-react";
import { cn } from "@repo/utils";

interface SportsHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  badge?: string;
  videoUrl?: string;
  backgroundImage?: string;
  className?: string;
}

const SportsHero = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  badge,
  videoUrl,
  backgroundImage,
  className
}: SportsHeroProps) => {
  return (
    <section className={cn(
      "relative overflow-hidden bg-slate-900",
      className
    )}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {badge && (
              <Badge className="bg-red-600 text-white hover:bg-red-700 text-sm px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            )}

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                {title}
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-red-400 font-semibold">
                {subtitle}
              </h2>
            </div>

            <p className="text-xl text-slate-200 leading-relaxed max-w-lg">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-primary text-lg px-8 py-4">
                <a href={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>

              {secondaryCta && (
              <Button asChild variant="outline" className="btn-outline text-lg px-8 py-4">
                <a href={secondaryCta.href}>
                  {secondaryCta.text}
                </a>
              </Button>
            )}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-slide-up">
            {videoUrl ? (
              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 p-0"
                  >
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-red-600 to-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-red-300" />
                  <div className="text-2xl font-bold mb-2">Champion Results</div>
                  <div className="text-slate-300">Trusted by 50+ Sports Organizations</div>
                </div>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default SportsHero;


