import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useRouterState } from "@tanstack/react-router";
import { Car, MessageCircle, Plus, Search, User } from "lucide-react";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useNotificationStore } from "../hooks/useNotificationStore";
import { useMyProfile } from "../hooks/useQueries";

type NavTab = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
};

const TABS: NavTab[] = [
  {
    id: "search",
    label: "Search",
    path: "/",
    icon: <Search size={22} strokeWidth={1.75} />,
    ocid: "bottom_nav.search.link",
  },
  {
    id: "publish",
    label: "Publish",
    path: "/post-ride",
    icon: <Plus size={22} strokeWidth={1.75} />,
    ocid: "bottom_nav.publish.link",
  },
  {
    id: "rides",
    label: "Your rides",
    path: "/dashboard",
    icon: <Car size={22} strokeWidth={1.75} />,
    ocid: "bottom_nav.rides.link",
  },
  {
    id: "chat",
    label: "Chat",
    path: "/chat",
    icon: <MessageCircle size={22} strokeWidth={1.75} />,
    ocid: "bottom_nav.chat.link",
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: <User size={22} strokeWidth={1.75} />,
    ocid: "bottom_nav.profile.link",
  },
];

export function BottomNav() {
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const { identity } = useInternetIdentity();
  const { data: profile } = useMyProfile();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  if (currentPath === "/welcome" || currentPath.startsWith("/admin")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const initials = (profile?.name || "?")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      data-ocid="bottom_nav.panel"
      aria-label="Bottom navigation"
    >
      <div
        style={{
          background: "#ffffff",
          borderTop: "1px solid #E5E7EB",
          height: "60px",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {TABS.map((tab) => {
          const active = isActive(tab.path);
          const iconNode =
            tab.id === "profile" && identity ? (
              <Avatar className="h-6 w-6" data-ocid="bottom_nav.profile.avatar">
                <AvatarImage src={profile?.avatarUrl || ""} />
                <AvatarFallback
                  style={{
                    fontSize: "8px",
                    background: "#E0F4FD",
                    color: "#00AEEF",
                    fontWeight: 700,
                  }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            ) : (
              tab.icon
            );

          return (
            <Link
              key={tab.path}
              to={tab.path}
              data-ocid={tab.ocid}
              aria-current={active ? "page" : undefined}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                textDecoration: "none",
                color: active ? "#00AEEF" : "#9CA3AF",
                position: "relative",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              {/* Top indicator bar */}
              {active && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "3px",
                    borderRadius: "0 0 3px 3px",
                    background: "#00AEEF",
                  }}
                />
              )}

              {/* Icon with optional badge */}
              <span style={{ position: "relative", display: "flex" }}>
                {iconNode}
                {tab.id === "chat" && unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-7px",
                      minWidth: "16px",
                      height: "16px",
                      padding: "0 3px",
                      borderRadius: "999px",
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1.5px solid #ffffff",
                      pointerEvents: "none",
                    }}
                    aria-label={`${unreadCount} unread messages`}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                style={{
                  fontSize: "10px",
                  lineHeight: 1,
                  fontWeight: active ? 700 : 500,
                  fontFamily:
                    '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
