import { Link, useRouterState } from "@tanstack/react-router";
import { Car, MessageCircle, PlusCircle, Search, User } from "lucide-react";

type NavTab = {
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
};

const TABS: NavTab[] = [
  {
    label: "Search",
    path: "/",
    icon: <Search className="h-5 w-5" />,
    ocid: "bottom_nav.search.link",
  },
  {
    label: "Publish",
    path: "/post-ride",
    icon: <PlusCircle className="h-5 w-5" />,
    ocid: "bottom_nav.publish.link",
  },
  {
    label: "Your rides",
    path: "/dashboard",
    icon: <Car className="h-5 w-5" />,
    ocid: "bottom_nav.rides.link",
  },
  {
    label: "Chat",
    path: "/chat",
    icon: <MessageCircle className="h-5 w-5" />,
    ocid: "bottom_nav.chat.link",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <User className="h-5 w-5" />,
    ocid: "bottom_nav.profile.link",
  },
];

export function BottomNav() {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  // Don't show bottom nav on welcome or admin pages
  if (currentPath === "/welcome" || currentPath.startsWith("/admin")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "oklch(0.09 0.03 240 / 0.95)",
        borderTop: "1px solid oklch(0.25 0.03 240)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      data-ocid="bottom_nav.panel"
      aria-label="Bottom navigation"
    >
      <ul className="flex items-stretch h-16">
        {TABS.map((tab) => {
          const active = isActive(tab.path);
          return (
            <li key={tab.path} className="flex-1">
              <Link
                to={tab.path}
                data-ocid={tab.ocid}
                className="flex flex-col items-center justify-center gap-0.5 h-full w-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-current={active ? "page" : undefined}
                style={{
                  color: active
                    ? "oklch(0.55 0.20 240)"
                    : "oklch(0.55 0.02 220)",
                }}
              >
                <span
                  className="transition-transform duration-150"
                  style={{ transform: active ? "scale(1.1)" : "scale(1)" }}
                  aria-hidden="true"
                >
                  {tab.icon}
                </span>
                <span
                  className="text-[10px] leading-none font-medium"
                  style={{
                    fontFamily:
                      '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
