import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

/**
 * ProtectedRoute
 *
 * Layout route that guards protected pages.
 * - If authenticated: renders <Outlet /> (the nested page).
 * - If not authenticated: stores the intended path in sessionStorage,
 *   then shows a full-page sign-in prompt.
 */
export function ProtectedRoute() {
  const { isAuthenticated, login } = useGoogleAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      const path = window.location.pathname;
      if (path !== "/welcome" && path !== "/") {
        sessionStorage.setItem("rydr_redirect_after_login", path);
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center max-w-sm">
          {/* Lock icon */}
          <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00AEEF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in required
          </h2>
          <p className="text-gray-500 mb-8">
            You need to be logged in to access this page. Sign in with your
            Google account to continue.
          </p>

          <button
            type="button"
            onClick={login}
            data-ocid="protected_route.primary_button"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#00AEEF] hover:bg-[#1F7AE0] text-white rounded-xl font-semibold text-base transition-colors shadow-md hover:shadow-lg active:scale-95"
          >
            {/* Google logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#fff"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#fff"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#fff"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#fff"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-4 text-xs text-gray-400">
            Free to join · No spam · Rides shared safely
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
