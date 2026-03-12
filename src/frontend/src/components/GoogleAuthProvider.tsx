import type React from "react";
import { useRef, useState } from "react";
import {
  GoogleAuthReactContext,
  useGoogleAuthProvider,
} from "../hooks/useGoogleAuth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function GoogleSignInModal({
  onSignIn,
  onCancel,
  isLoggingIn,
}: {
  onSignIn: (email: string, name: string) => Promise<void>;
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
    await onSignIn(email.trim(), name.trim());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-ocid="google_signin.modal"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Google-style header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* Google G logo */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Google"
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

export function GoogleAuthProvider({
  children,
}: { children: React.ReactNode }) {
  const auth = useGoogleAuthProvider();

  return (
    <GoogleAuthReactContext.Provider value={auth}>
      {auth.showLoginModal && (
        <GoogleSignInModal
          onSignIn={auth.completeLogin}
          onCancel={auth.cancelLogin}
          isLoggingIn={auth.isLoggingIn}
        />
      )}
      {children}
    </GoogleAuthReactContext.Provider>
  );
}
