import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Shield } from "lucide-react";

export function AccountDataPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background" data-ocid="data.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="data.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Data Protection</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Shield className="h-8 w-8 text-primary shrink-0" />
          <div>
            <p className="font-bold text-sm">Your privacy matters</p>
            <p className="text-xs text-muted-foreground">
              RYDR is committed to protecting your personal data.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
          <section>
            <h3 className="font-bold mb-2">Data We Collect</h3>
            <p>
              RYDR collects only the data necessary to operate the platform:
              your name, email address, profile photo, and ride history. We do
              not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-2">How We Use Your Data</h3>
            <p>
              Your data is used to match you with rides, communicate booking
              updates, and improve platform safety. Location data is used only
              during active rides and is not stored permanently.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-2">Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal
              data at any time. To request data deletion or export, contact us
              at{" "}
              <a
                href="mailto:support@rydr.in"
                className="text-primary underline"
              >
                support@rydr.in
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-2">Data Retention</h3>
            <p>
              Account data is retained for up to 2 years after your last
              activity. You may request immediate deletion of your account and
              data at any time.
            </p>
          </section>
        </div>

        <p className="text-muted-foreground text-xs pt-4">
          For data requests, email support@rydr.in
        </p>
      </div>
    </main>
  );
}
