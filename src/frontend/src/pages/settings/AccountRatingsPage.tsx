import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Star } from "lucide-react";

export function AccountRatingsPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background" data-ocid="ratings.page">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="ratings.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Ratings</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <Star className="h-8 w-8 text-amber-500" />
        </div>
        <h3 className="font-bold text-lg">No ratings yet</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your ratings will appear here once you've completed rides. Complete
          rides to build your trust score.
        </p>
      </div>
    </main>
  );
}
