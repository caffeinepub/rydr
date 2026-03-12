import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useBranding } from "../context/BrandingContext";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useMyProfile } from "../hooks/useQueries";
import { AdBanner } from "./AdBanner";

export function Footer() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useMyProfile();
  const { branding } = useBranding();

  const primaryColor = branding?.primaryColor || "#00AEEF";

  const initials = (profile?.name || "?")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Ad banner — outside the colored footer band */}
      <div className="w-full bg-background py-2 flex justify-center">
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

      {/* Colored footer band */}
      <footer
        className="py-4"
        style={{ backgroundColor: primaryColor, borderTop: "none" }}
      >
        <div className="container flex flex-col items-center gap-3 text-sm px-4 sm:px-6">
          {/* Profile avatar row */}
          {identity ? (
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 text-xs">
                <AvatarImage src={profile?.avatarUrl || ""} />
                <AvatarFallback
                  className="font-bold text-[10px]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <span className="font-medium text-white">
                  {profile?.name || "User"}
                </span>
                <span
                  className="ml-1"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  &middot; Signed in
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <LogIn className="h-3.5 w-3.5 text-white" />
              </div>
              <Link
                to="/welcome"
                className="text-white hover:underline font-medium"
                data-ocid="footer.login_link"
              >
                Sign in to your account
              </Link>
            </div>
          )}

          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
