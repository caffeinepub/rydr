import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useMyProfile } from "../hooks/useQueries";
import { AdBanner } from "./AdBanner";

export function Footer() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useMyProfile();

  const initials = (profile?.name || "?")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer className="border-t border-border mt-16 py-6">
      <div className="container flex flex-col items-center gap-3 text-sm text-muted-foreground px-4 sm:px-6">
        {/* Footer ad banner */}
        <div className="w-full flex justify-center">
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

        {/* Profile avatar row */}
        {identity ? (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7 text-xs">
              <AvatarImage src={profile?.avatarUrl || ""} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-[10px]">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <span className="font-medium text-foreground">
                {profile?.name || "User"}
              </span>
              <span className="text-muted-foreground ml-1">
                &middot; Signed in
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs">
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
              <LogIn className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <Link
              to="/welcome"
              className="text-primary hover:underline"
              data-ocid="footer.login_link"
            >
              Sign in to your account
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
