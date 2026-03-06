import { Heart } from "lucide-react";
import { AdBanner } from "./AdBanner";
import { TrustSeal } from "./TrustSeal";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="container flex flex-col items-center gap-4 text-sm text-muted-foreground">
        {/* Footer ad banner */}
        <div className="w-full flex justify-center mb-4">
          <AdBanner
            placement="footer-banner"
            size="leaderboard"
            className="hidden md:block"
          />
          <AdBanner
            placement="footer-banner"
            size="mobile-banner"
            className="block md:hidden"
          />
        </div>

        {/* Logo + brand row */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/uploads/file_00000000650c720883073dd037e87b31-1.png"
            alt="RYDR"
            className="h-6 w-auto opacity-80"
          />
          <span>— Your ride, your rules.</span>
        </div>

        {/* Trust seal */}
        <TrustSeal compact />

        {/* Copyright */}
        <p className="flex items-center gap-1">
          © {year}. Built with{" "}
          <Heart className="h-3.5 w-3.5 fill-primary text-primary" /> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
