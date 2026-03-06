import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { RegisterModal } from "./components/RegisterModal";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useMyProfile } from "./hooks/useQueries";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { PostRidePage } from "./pages/PostRidePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RideDetailPage } from "./pages/RideDetailPage";

// ── Root layout ───────────────────────────────────────────────
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
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
      />
      <Toaster richColors theme="dark" />
    </div>
  );
}

// ── Routes ─────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const rideDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ride/$rideId",
  component: RideDetailPage,
});

const postRideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-ride",
  component: PostRidePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  rideDetailRoute,
  postRideRoute,
  dashboardRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
