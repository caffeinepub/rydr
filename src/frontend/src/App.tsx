import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { RegisterModal } from "./components/RegisterModal";
import { useInternetIdentity } from "./hooks/useGoogleAuth";
import { useMyProfile } from "./hooks/useQueries";
import { HomePage } from "./pages/HomePage";
import { WelcomePage } from "./pages/WelcomePage";

// Lazy-loaded pages for performance optimization
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const PostRidePage = lazy(() =>
  import("./pages/PostRidePage").then((m) => ({ default: m.PostRidePage })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const RideDetailPage = lazy(() =>
  import("./pages/RideDetailPage").then((m) => ({ default: m.RideDetailPage })),
);
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const ChatPage = lazy(() =>
  import("./pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);
const UserProfileViewPage = lazy(() =>
  import("./pages/UserProfileViewPage").then((m) => ({
    default: m.UserProfileViewPage,
  })),
);

// Fallback loading state for lazy-loaded pages
function PageFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      data-ocid="app.loading_state"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ── Root layout (with Navbar + Footer) ────────────────────────
function RootLayout() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const [showRegister, setShowRegister] = useState(false);

  // When user logs in and has no profile, prompt registration
  useEffect(() => {
    if (identity && !profileLoading && profile === null) {
      setShowRegister(true);
    }
  }, [identity, profile, profileLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      {/* On mobile, bottom nav takes 64px — add padding so content isn't hidden behind it */}
      <div className="flex-1 md:pb-0 pb-16">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
      />
      <Toaster richColors theme="dark" />
    </div>
  );
}

// ── Standalone layout (no Navbar, no Footer — for Welcome page) ──
function StandaloneLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
      <Toaster richColors theme="dark" />
    </>
  );
}

// ── Routes ─────────────────────────────────────────────────────
const rootRoute = createRootRoute();

// Standalone layout route (welcome page lives here)
const standaloneRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "standalone",
  component: StandaloneLayout,
});

const welcomeRoute = createRoute({
  getParentRoute: () => standaloneRoute,
  path: "/welcome",
  component: WelcomePage,
});

// Main app layout route
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/",
  beforeLoad: () => {
    // If first visit (no welcome seen), redirect to welcome screen
    const welcomed = localStorage.getItem("rydr_welcomed");
    if (!welcomed) {
      throw redirect({ to: "/welcome" });
    }
  },
  component: HomePage,
});

const rideDetailRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/ride/$rideId",
  component: RideDetailPage,
});

const postRideRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/post-ride",
  component: PostRidePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/profile",
  component: ProfilePage,
});

const userProfileViewRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/profile/$userId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <UserProfileViewPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => standaloneRoute,
  path: "/admin",
  component: AdminPage,
});

const chatRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/chat",
  component: ChatPage,
});

const routeTree = rootRoute.addChildren([
  standaloneRoute.addChildren([welcomeRoute, adminRoute]),
  mainRoute.addChildren([
    homeRoute,
    rideDetailRoute,
    postRideRoute,
    dashboardRoute,
    profileRoute,
    userProfileViewRoute,
    chatRoute,
  ]),
]);

const router = createRouter({ routeTree, trailingSlash: "never" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
