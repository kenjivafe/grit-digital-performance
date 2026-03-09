import { cn } from "@repo/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const LoadingSkeleton = ({ 
  className, 
  variant = "rectangular",
  width,
  height,
  lines = 1
}: LoadingSkeletonProps) => {
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-lg"
  };

  const style = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "text" ? "1rem" : undefined),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse bg-slate-200",
              variantClasses[variant],
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{
              height: height || "1rem",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200",
        variantClasses[variant],
        className
      )}
      style={style}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkeleton;


