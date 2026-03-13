import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink, Lock } from "lucide-react";

export function AccountPasswordPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background" data-ocid="password.page">
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => navigate({ to: "/profile" })}
          data-ocid="password.back.button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-bold text-base">Password</h2>
      </div>

      <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-bold text-lg">Managed by Google</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          RYDR uses Google Sign-In for authentication. Password management is
          handled by your Google account.
        </p>
        <Button
          asChild
          variant="outline"
          className="gap-2 mt-2"
          data-ocid="password.primary_button"
        >
          <a
            href="https://myaccount.google.com/security"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manage Google Account
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </main>
  );
}
