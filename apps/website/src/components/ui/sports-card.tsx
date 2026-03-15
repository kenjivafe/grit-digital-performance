import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@repo/utils";

interface SportsCardProps {
  title: string;
  description: string;
  category?: string;
  image?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  className?: string;
  children?: React.ReactNode;
}

const SportsCard = ({ 
  title, 
  description, 
  category, 
  image, 
  stats, 
  className, 
  children 
}: SportsCardProps) => {
  return (
    <Card className={cn("card-sport group hover:scale-105 transition-all duration-300", className)}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 text-white hover:bg-red-700">
                {category}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className={image ? "pb-4" : undefined}>
        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-600 leading-relaxed">{description}</p>
        
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
};

export { SportsCard };


