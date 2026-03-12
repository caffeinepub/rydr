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
  PlusCircle,
  Shield,
  User,
} from "lucide-react";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useMyProfile } from "../hooks/useQueries";

export function Navbar() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: profile } = useMyProfile();
  const { data: isAdmin } = useIsAdmin();
  const navigate = useNavigate();
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg hidden md:block">
      <div className="container flex h-14 items-center justify-between">
        {/* Brand wordmark */}
        <Link
          to="/"
          data-ocid="nav.home_link"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <span
            className="font-black text-xl text-white"
            style={{
              fontFamily:
                '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            Rydr
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" data-ocid="nav.home_link">
            <Link to="/">Find Rides</Link>
          </Button>
          {isLoggedIn && (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                data-ocid="nav.post_ride_link"
              >
                <Link to="/post-ride">Post Ride</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                data-ocid="nav.dashboard_link"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Auth actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="nav.profile_link"
                >
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={profile?.avatarUrl} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
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
              className="gap-1.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
              data-ocid="nav.login_button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isLoggingIn ? "Signing in..." : "Sign in with Google"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
