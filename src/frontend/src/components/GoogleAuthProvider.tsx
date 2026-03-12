import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleAuthReactContext,
  useGoogleAuthProvider,
} from "../hooks/useGoogleAuth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// ---------------------------------------------------------------------------
// Google Identity Services types
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }): void;
          renderButton(
            parent: HTMLElement,
            options: Record<string, unknown>,
          ): void;
          prompt(): void;
          disableAutoSelect(): void;
          revoke(email: string, done: () => void): void;
        };
      };
    };
    __googleGsiLoaded?: boolean;
  }
}

// ---------------------------------------------------------------------------
// Decode a Google JWT credential (no verify needed for client-side profile)
// ---------------------------------------------------------------------------
function decodeJwt(token: string): Record<string, string> {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Load GIS script once
// ---------------------------------------------------------------------------
function loadGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.__googleGsiLoaded || window.google?.accounts) {
      window.__googleGsiLoaded = true;
      resolve();
      return;
    }
    if (document.getElementById("gsi-script")) {
      // Script is loading; poll for readiness
      const poll = setInterval(() => {
        if (window.google?.accounts) {
          clearInterval(poll);
          window.__googleGsiLoaded = true;
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.id = "gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.__googleGsiLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ---------------------------------------------------------------------------
// Fallback modal (email + name form) — used when no Client ID is configured
// ---------------------------------------------------------------------------
function FallbackSignInModal({
  onSignIn,
  onCancel,
  isLoggingIn,
}: {
  onSignIn: (email: string, name: string, picture?: string) => Promise<void>;
  onCancel: () => void;
  isLoggingIn: boolean;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    await onSignIn(email.trim(), name.trim(), "");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onCancel();
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onCancel();
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: overlay backdrop uses keydown on inner dialog
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-ocid="google_signin.modal"
    >
      {/* biome-ignore lint/a11y/useSemanticElements: overlay modal uses div for custom styling */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in with Google"
        onKeyDown={handleOverlayKeyDown}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
      >
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-label="Google"
              role="img"
            >
              <title>Google</title>
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
            <span className="text-lg font-semibold text-gray-700">
              Sign in with Google
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Use your Google account to sign in to RYDR
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-8 pb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="google-email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </Label>
            <Input
              id="google-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              autoFocus
              data-ocid="google_signin.input"
              className="border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="google-name"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </Label>
            <Input
              id="google-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              data-ocid="google_signin.name_input"
              className="border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
            />
          </div>
          {error && (
            <p
              className="text-sm text-red-600"
              data-ocid="google_signin.error_state"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={isLoggingIn}
            data-ocid="google_signin.submit_button"
            className="w-full h-10 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium rounded-lg transition-colors"
          >
            {isLoggingIn ? "Signing in..." : "Continue"}
          </Button>
          <button
            type="button"
            onClick={onCancel}
            data-ocid="google_signin.cancel_button"
            className="text-sm text-[#1a73e8] hover:underline text-center"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Real Google One Tap / GIS modal
// ---------------------------------------------------------------------------
function GoogleGisModal({
  clientId,
  onCredential,
  onCancel,
}: {
  clientId: string;
  onCredential: (email: string, name: string, picture: string) => Promise<void>;
  onCancel: () => void;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleCredential = useCallback(
    async (response: { credential: string }) => {
      const payload = decodeJwt(response.credential);
      const email = payload.email ?? "";
      const name = payload.name ?? email.split("@")[0];
      const picture = payload.picture ?? "";
      if (!email) {
        setError(
          "Could not retrieve your email from Google. Please try again.",
        );
        return;
      }
      await onCredential(email, name, picture);
    },
    [onCredential],
  );

  useEffect(() => {
    let cancelled = false;
    loadGsiScript()
      .then(() => {
        if (cancelled || !btnRef.current || !window.google?.accounts) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredential,
          cancel_on_tap_outside: false,
        });
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: "outline",
          size: "large",
          width: 280,
          text: "signin_with",
          shape: "rectangular",
        });
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled)
          setError("Failed to load Google sign-in. Please try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, handleCredential]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onCancel();
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onCancel();
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: overlay backdrop uses keydown on inner dialog
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-ocid="google_signin.modal"
    >
      {/* biome-ignore lint/a11y/useSemanticElements: overlay modal uses div for custom styling */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to RYDR"
        onKeyDown={handleDialogKeyDown}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
      >
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              aria-label="Google"
              role="img"
            >
              <title>Google</title>
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
            <h2 className="text-xl font-bold text-gray-800">Sign in to RYDR</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Choose your Google account to continue
          </p>
        </div>
        <div className="px-8 pb-8 flex flex-col items-center gap-4">
          {loading && (
            <div className="w-8 h-8 rounded-full border-2 border-[#1a73e8] border-t-transparent animate-spin" />
          )}
          {error && (
            <p
              className="text-sm text-red-600 text-center"
              data-ocid="google_signin.error_state"
            >
              {error}
            </p>
          )}
          {/* GIS renders the button here */}
          <div ref={btnRef} className="min-h-[44px]" />
          <button
            type="button"
            onClick={onCancel}
            data-ocid="google_signin.cancel_button"
            className="text-sm text-[#1a73e8] hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main provider
// ---------------------------------------------------------------------------
export function GoogleAuthProvider({
  children,
}: { children: React.ReactNode }) {
  const auth = useGoogleAuthProvider();

  // Google OAuth Client ID — set VITE_GOOGLE_CLIENT_ID in env, or configure via Admin → Branding
  const envClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as
    | string
    | undefined;
  const localClientId = localStorage.getItem("RYDR_GOOGLE_CLIENT_ID") ?? "";
  const clientId = localClientId.trim() || envClientId;
  const hasRealOAuth = !!(
    clientId?.trim() && clientId !== "YOUR_GOOGLE_CLIENT_ID"
  );

  return (
    <GoogleAuthReactContext.Provider value={auth}>
      {auth.showLoginModal &&
        (hasRealOAuth ? (
          <GoogleGisModal
            clientId={clientId!}
            onCredential={auth.completeLogin}
            onCancel={auth.cancelLogin}
          />
        ) : (
          <FallbackSignInModal
            onSignIn={auth.completeLogin}
            onCancel={auth.cancelLogin}
            isLoggingIn={auth.isLoggingIn}
          />
        ))}
      {children}
    </GoogleAuthReactContext.Provider>
  );
}
