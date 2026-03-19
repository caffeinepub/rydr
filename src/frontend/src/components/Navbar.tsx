import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  PlusCircle,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useBranding } from "../context/BrandingContext";
import { useDarkMode } from "../hooks/useDarkMode";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useMyProfile } from "../hooks/useQueries";

export function Navbar() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: profile } = useMyProfile();
  const { data: isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const { branding } = useBranding();
  const { isDark, toggle } = useDarkMode();
  const isLoggedIn = !!identity;

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header
      className="sticky top-0 z-50 w-full hidden md:block"
      style={{ background: "#0B3D91", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
    >
      <div className="container flex h-14 items-center justify-between">
        {/* Brand logo / wordmark */}
        <Link
          to="/"
          data-ocid="nav.home_link"
          className="flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          {branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={branding.appName || "RYDR"}
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                fontFamily:
                  '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
                fontWeight: 800,
                fontSize: "1.35rem",
                letterSpacing: "0.06em",
                color: "#ffffff",
                textShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }}
            >
              RYDR
            </span>
          )}
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            data-ocid="nav.home_link"
            style={{ color: "rgba(255,255,255,0.85)" }}
            className="hover:bg-white/10 hover:text-white"
          >
            <Link to="/">Find Rides</Link>
          </Button>
          {isLoggedIn && (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                data-ocid="nav.post_ride_link"
                style={{ color: "rgba(255,255,255,0.85)" }}
                className="hover:bg-white/10 hover:text-white"
              >
                <Link to="/post-ride">Post Ride</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                data-ocid="nav.dashboard_link"
                style={{ color: "rgba(255,255,255,0.85)" }}
                className="hover:bg-white/10 hover:text-white"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Auth actions + theme toggle */}
        <div className="flex items-center gap-2">
          {/* Dark/Light mode toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            data-ocid="nav.theme_toggle"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/15 transition-colors"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  data-ocid="nav.profile_link"
                >
                  <Avatar className="h-8 w-8 border-2 border-white/40">
                    <AvatarImage src={profile?.avatarUrl} />
                    <AvatarFallback
                      style={{
                        background: "#00AEEF",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate({ to: "/profile" })}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate({ to: "/dashboard" })}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem
                    className="cursor-pointer text-primary focus:text-primary"
                    onClick={() => navigate({ to: "/admin" })}
                    data-ocid="nav.admin_link"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate({ to: "/post-ride" })}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post a Ride
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={clear}
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="sm"
              style={{
                background: "#ffffff",
                color: "#0B3D91",
                border: "none",
                fontWeight: 600,
              }}
              className="hover:bg-gray-100 gap-1.5 shadow-sm"
              data-ocid="nav.login_button"
            >
              <LogIn className="h-4 w-4" />
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
