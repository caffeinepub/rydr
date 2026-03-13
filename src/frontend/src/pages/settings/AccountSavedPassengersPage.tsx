import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Users } from "lucide-react";

export function AccountSavedPassengersPage() {
  const navigate = useNavigate();
  return (
    <main
      className="min-h-screen bg-background"
      data-ocid="saved_passengers.page"
    >
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="saved_passengers.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Saved Passengers</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-lg">No saved passengers</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Passengers you frequently travel with will appear here for quick
          booking.
        </p>
      </div>
    </main>
  );
}
