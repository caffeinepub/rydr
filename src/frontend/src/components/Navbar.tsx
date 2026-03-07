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
import { useInternetIdentity } from "../hooks/useInternetIdentity";
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
              className="gap-2"
              data-ocid="nav.login_button"
            >
              <LogIn className="h-4 w-4" />
              {isLoggingIn ? "Connecting..." : "Sign In"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
