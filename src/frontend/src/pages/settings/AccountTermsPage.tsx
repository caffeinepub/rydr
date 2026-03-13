import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function AccountTermsPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background" data-ocid="terms.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="terms.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Terms of Service</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 text-sm leading-relaxed text-foreground/90">
        <p className="text-muted-foreground text-xs">
          Last updated: January 2025
        </p>

        <section>
          <h3 className="font-bold mb-2">1. Acceptance of Terms</h3>
          <p>
            By using RYDR, you agree to our terms of service. RYDR is a
            ride-sharing platform connecting drivers and passengers across
            India.
          </p>
        </section>

        <section>
          <h3 className="font-bold mb-2">2. Platform Use</h3>
          <p>
            RYDR connects drivers who have empty seats with riders travelling
            the same route. Drivers set their own prices; RYDR does not
            guarantee any income. Riders must respect driver preferences.
          </p>
        </section>

        <section>
          <h3 className="font-bold mb-2">3. Safety</h3>
          <p>
            All users are responsible for their own safety. RYDR encourages
            sharing trips only with verified users. Report any safety concerns
            to support@rydr.in immediately.
          </p>
        </section>

        <section>
          <h3 className="font-bold mb-2">4. Cancellation Policy</h3>
          <p>
            Frequent cancellations by drivers or riders may result in reduced
            trust scores or account suspension. Please only book or post rides
            you intend to complete.
          </p>
        </section>

        <section>
          <h3 className="font-bold mb-2">5. Prohibited Conduct</h3>
          <p>
            Users must not use RYDR for illegal activities, harassment, or
            misrepresentation. Violations may result in immediate account
            termination.
          </p>
        </section>

        <p className="text-muted-foreground text-xs pt-4">
          For full terms, contact support@rydr.in
        </p>
      </div>
    </main>
  );
}
