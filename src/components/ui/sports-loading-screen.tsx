import LoadingSpinner from "./loading-spinner";
import { Trophy } from "lucide-react";

interface SportsLoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "full";
}

const SportsLoadingScreen = ({ 
  message = "Loading...", 
  size = "lg",
  variant = "spinner"
}: SportsLoadingScreenProps) => {
  if (variant === "full") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-slate-800 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <LoadingSpinner size="sm" variant="primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <LoadingSpinner size="lg" variant="primary" />
            <p className="text-slate-600 font-medium">{message}</p>
          </div>
          
          <div className="text-sm text-slate-500">
            Preparing your sports digital experience...
          </div>
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-3">
      <LoadingSpinner size={size} variant="primary" />
      <span className="text-slate-600">{message}</span>
    </div>
  );
};

export default SportsLoadingScreen;
