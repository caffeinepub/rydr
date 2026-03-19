import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import type React from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { ChunkErrorBoundary } from "./components/ChunkErrorBoundary";
import { ErrorBoundary } from "./components/ErrorBoundary";
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
const TrackingPage = lazy(() =>
  import("./pages/TrackingPage").then((m) => ({ default: m.TrackingPage })),
);
const UserProfileViewPage = lazy(() =>
  import("./pages/UserProfileViewPage").then((m) => ({
    default: m.UserProfileViewPage,
  })),
);

// Settings sub-pages (lazy)
const AccountRatingsPage = lazy(() =>
  import("./pages/settings/AccountRatingsPage").then((m) => ({
    default: m.AccountRatingsPage,
  })),
);
const AccountSavedPassengersPage = lazy(() =>
  import("./pages/settings/AccountSavedPassengersPage").then((m) => ({
    default: m.AccountSavedPassengersPage,
  })),
);
const AccountCommunicationPage = lazy(() =>
  import("./pages/settings/AccountCommunicationPage").then((m) => ({
    default: m.AccountCommunicationPage,
  })),
);
const AccountPasswordPage = lazy(() =>
  import("./pages/settings/AccountPasswordPage").then((m) => ({
    default: m.AccountPasswordPage,
  })),
);
const AccountAddressPage = lazy(() =>
  import("./pages/settings/AccountAddressPage").then((m) => ({
    default: m.AccountAddressPage,
  })),
);
const AccountPayoutMethodsPage = lazy(() =>
  import("./pages/settings/AccountPayoutMethodsPage").then((m) => ({
    default: m.AccountPayoutMethodsPage,
  })),
);
const AccountPayoutsPage = lazy(() =>
  import("./pages/settings/AccountPayoutsPage").then((m) => ({
    default: m.AccountPayoutsPage,
  })),
);
const AccountPaymentMethodsPage = lazy(() =>
  import("./pages/settings/AccountPaymentMethodsPage").then((m) => ({
    default: m.AccountPaymentMethodsPage,
  })),
);
const AccountPaymentsPage = lazy(() =>
  import("./pages/settings/AccountPaymentsPage").then((m) => ({
    default: m.AccountPaymentsPage,
  })),
);
const AccountHelpPage = lazy(() =>
  import("./pages/settings/AccountHelpPage").then((m) => ({
    default: m.AccountHelpPage,
  })),
);
const AccountTermsPage = lazy(() =>
  import("./pages/settings/AccountTermsPage").then((m) => ({
    default: m.AccountTermsPage,
  })),
);
const AccountDataPage = lazy(() =>
  import("./pages/settings/AccountDataPage").then((m) => ({
    default: m.AccountDataPage,
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

function LazySettings(Page: React.ComponentType) {
  return function SettingsWrapper() {
    return (
      <ChunkErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <Page />
        </Suspense>
      </ChunkErrorBoundary>
    );
  };
}

const LazyRatings = LazySettings(AccountRatingsPage);
const LazySavedPassengers = LazySettings(AccountSavedPassengersPage);
const LazyCommunication = LazySettings(AccountCommunicationPage);
const LazyPassword = LazySettings(AccountPasswordPage);
const LazyAddress = LazySettings(AccountAddressPage);
const LazyPayoutMethods = LazySettings(AccountPayoutMethodsPage);
const LazyPayouts = LazySettings(AccountPayoutsPage);
const LazyPaymentMethods = LazySettings(AccountPaymentMethodsPage);
const LazyPayments = LazySettings(AccountPaymentsPage);
const LazyHelp = LazySettings(AccountHelpPage);
const LazyTerms = LazySettings(AccountTermsPage);
const LazyData = LazySettings(AccountDataPage);

// ── Root layout ────────────────────────────────────────────
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
      <div className="flex-1 pb-20 md:pb-4">
        <Outlet />
      </div>
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

const trackingRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/tracking/$rideId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ChunkErrorBoundary>
        <TrackingPage />
      </ChunkErrorBoundary>
    </Suspense>
  ),
});
const chatRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/chat",
  component: LazyChat,
});

// ── Settings sub-routes (protected) ────────────────────────────
const profileRatingsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/ratings",
  component: LazyRatings,
});

const profileSavedPassengersRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/saved-passengers",
  component: LazySavedPassengers,
});

const profileCommunicationRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/communication",
  component: LazyCommunication,
});

const profilePasswordRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/password",
  component: LazyPassword,
});

const profileAddressRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/address",
  component: LazyAddress,
});

const profilePayoutMethodsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/payout-methods",
  component: LazyPayoutMethods,
});

const profilePayoutsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/payouts",
  component: LazyPayouts,
});

const profilePaymentMethodsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/payment-methods",
  component: LazyPaymentMethods,
});

const profilePaymentsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/payments",
  component: LazyPayments,
});

const profileHelpRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/help",
  component: LazyHelp,
});

const profileTermsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/terms",
  component: LazyTerms,
});

const profileDataRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile/data",
  component: LazyData,
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
      trackingRoute,
      // Settings sub-routes
      profileRatingsRoute,
      profileSavedPassengersRoute,
      profileCommunicationRoute,
      profilePasswordRoute,
      profileAddressRoute,
      profilePayoutMethodsRoute,
      profilePayoutsRoute,
      profilePaymentMethodsRoute,
      profilePaymentsRoute,
      profileHelpRoute,
      profileTermsRoute,
      profileDataRoute,
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
