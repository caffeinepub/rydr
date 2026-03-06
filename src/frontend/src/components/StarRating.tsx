import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  className,
}: StarRatingProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxStars }, (_, i) => i).map((i) => (
        <Star
          key={`star-${i}`}
          className={cn(
            sizeMap[size],
            i < Math.round(rating)
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

interface InteractiveStarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  maxStars?: number;
  className?: string;
}

export function InteractiveStarRating({
  value,
  onChange,
  maxStars = 5,
  className,
}: InteractiveStarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxStars }, (_, i) => i).map((i) => (
        <button
          key={`star-btn-${i}`}
          type="button"
          onClick={() => onChange(i + 1)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors cursor-pointer hover:fill-primary hover:text-primary",
              i < value
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
}
