import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useRouterState } from "@tanstack/react-router";
import { Car, MessageCircle, Plus, Search, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useNotificationStore } from "../hooks/useNotificationStore";
import { useMyProfile } from "../hooks/useQueries";

type NavTab = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
  isPublish?: boolean;
};

const TABS: NavTab[] = [
  {
    id: "search",
    label: "Search",
    path: "/",
    icon: <Search className="h-5 w-5" />,
    ocid: "bottom_nav.search.link",
  },
  {
    id: "publish",
    label: "Publish",
    path: "/post-ride",
    icon: <Plus className="h-6 w-6" strokeWidth={2.5} />,
    ocid: "bottom_nav.publish.link",
    isPublish: true,
  },
  {
    id: "rides",
    label: "Your rides",
    path: "/dashboard",
    icon: <Car className="h-5 w-5" />,
    ocid: "bottom_nav.rides.link",
  },
  {
    id: "chat",
    label: "Chat",
    path: "/chat",
    icon: <MessageCircle className="h-5 w-5" />,
    ocid: "bottom_nav.chat.link",
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: <User className="h-5 w-5" />,
    ocid: "bottom_nav.profile.link",
  },
];

export function BottomNav() {
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const { identity } = useInternetIdentity();
  const { data: profile } = useMyProfile();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  // Don't show bottom nav on welcome or admin pages
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

  const getTabIcon = (tab: NavTab) => {
    if (tab.id === "profile" && identity) {
      return (
        <Avatar className="h-6 w-6" data-ocid="bottom_nav.profile.avatar">
          <AvatarImage src={profile?.avatarUrl || ""} />
          <AvatarFallback className="text-[8px] bg-primary/30 text-primary font-bold leading-none">
            {initials}
          </AvatarFallback>
        </Avatar>
      );
    }
    return tab.icon;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bottom-nav-bar"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      data-ocid="bottom_nav.panel"
      aria-label="Bottom navigation"
    >
      {/* Subtle top shadow line */}
      <div className="bottom-nav-surface">
        <ul className="flex items-stretch" style={{ height: "64px" }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path);

            // ── Floating Publish Button ──────────────────────────
            if (tab.isPublish) {
              return (
                <li
                  key={tab.path}
                  className="flex-1 flex items-center justify-center relative"
                >
                  <Link
                    to={tab.path}
                    data-ocid={tab.ocid}
                    aria-label="Publish a ride"
                    className="publish-float-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    style={{ display: "block" }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.07 }}
                      className="publish-btn-inner"
                    >
                      <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <span className="publish-label">{tab.label}</span>
                  </Link>
                </li>
              );
            }

            // ── Regular Tab ─────────────────────────────────────
            return (
              <li key={tab.path} className="flex-1">
                <Link
                  to={tab.path}
                  data-ocid={tab.ocid}
                  className="nav-tab-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-current={active ? "page" : undefined}
                >
                  {/* Active indicator bar */}
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="nav-active-bar"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon wrapper with badge */}
                  <span className="relative flex items-center justify-center">
                    <motion.span
                      animate={{
                        scale: active ? 1.15 : 1,
                        y: active ? -1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`nav-icon ${active ? "nav-icon-active" : "nav-icon-inactive"}`}
                      aria-hidden="true"
                    >
                      {getTabIcon(tab)}
                    </motion.span>

                    {/* Chat badge */}
                    {tab.id === "chat" && unreadCount > 0 && (
                      <motion.span
                        key={unreadCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="chat-badge"
                        aria-label={`${unreadCount} unread messages`}
                      >
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </motion.span>
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className={`nav-label ${active ? "nav-label-active" : "nav-label-inactive"}`}
                  >
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
