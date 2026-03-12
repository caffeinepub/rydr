import { Component, type ReactNode } from "react";
import { GoogleAuthProvider } from "./GoogleAuthProvider";
import { SafeIdentityProvider } from "./SafeIdentityProvider";

// Error boundary so if GoogleAuthProvider ever throws,
// children still render (just without auth context).
class AuthErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn(
      "[RYDR] AuthProviders caught an error — rendering without auth context:",
      error,
    );
  }

  render() {
    if (this.state.hasError) {
      // Render children without the Google provider so the app
      // at least loads rather than showing a blank screen.
      return this.props.children;
    }
    return this.props.children;
  }
}

/**
 * AuthProviders
 *
 * Single root wrapper that composes all authentication providers.
 * Order (outer → inner):
 *   SafeIdentityProvider  — silences any ICP context errors
 *   GoogleAuthProvider    — provides Google OAuth context
 *
 * AuthErrorBoundary ensures the app renders even if one provider fails.
 */
export function AuthProviders({ children }: { children: ReactNode }) {
  return (
    <AuthErrorBoundary>
      <SafeIdentityProvider>
        <GoogleAuthProvider>{children}</GoogleAuthProvider>
      </SafeIdentityProvider>
    </AuthErrorBoundary>
  );
}
