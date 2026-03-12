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
import { ChunkErrorBoundary } from "./components/ChunkErrorBoundary";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { OfflineBanner } from "./components/OfflineBanner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterModal } from "./components/RegisterModal";
import { ChatSkeleton } from "./components/skeletons/ChatSkeleton";
import { DashboardSkeleton } from "./components/skeletons/DashboardSkeleton";
import { RideListSkeleton } from "./components/skeletons/RideListSkeleton";
import { BrandingProvider } from "./context/BrandingContext";
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

// Generic page loading fallback
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

// Wrapped lazy page helpers
function LazyDashboard() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyPostRide() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<RideListSkeleton />}>
        <PostRidePage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyProfile() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <ProfilePage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyRideDetail() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<RideListSkeleton />}>
        <RideDetailPage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyAdmin() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <AdminPage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyChat() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<ChatSkeleton />}>
        <ChatPage />
      </Suspense>
    </ChunkErrorBoundary>
  );
}

function LazyUserProfile() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <UserProfileViewPage />
      </Suspense>
    </ChunkErrorBoundary>
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
      <OfflineBanner />
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
      <OfflineBanner />
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

const adminRoute = createRoute({
  getParentRoute: () => standaloneRoute,
  path: "/admin",
  component: LazyAdmin,
});

// Main app layout route
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  component: RootLayout,
});

// ── Public routes (no login required) ──────────────────────────
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
  component: LazyRideDetail,
});

const userProfileViewRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/profile/$userId",
  component: LazyUserProfile,
});

// ── Protected layout route ──────────────────────────────────────
// ProtectedRoute checks auth and renders <Outlet /> or a sign-in prompt.
const protectedLayoutRoute = createRoute({
  getParentRoute: () => mainRoute,
  id: "protected",
  component: ProtectedRoute,
});

const postRideRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/post-ride",
  component: LazyPostRide,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/dashboard",
  component: LazyDashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile",
  component: LazyProfile,
});

const chatRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/chat",
  component: LazyChat,
});

const routeTree = rootRoute.addChildren([
  standaloneRoute.addChildren([welcomeRoute, adminRoute]),
  mainRoute.addChildren([
    homeRoute,
    rideDetailRoute,
    userProfileViewRoute,
    protectedLayoutRoute.addChildren([
      postRideRoute,
      dashboardRoute,
      profileRoute,
      chatRoute,
    ]),
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
    <ErrorBoundary>
      <BrandingProvider>
        <Suspense fallback={<PageFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </BrandingProvider>
    </ErrorBoundary>
  );
}
