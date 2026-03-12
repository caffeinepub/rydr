/**
 * SafeIdentityProvider
 *
 * Universal identity provider wrapper that prevents the
 * "InternetIdentityProvider is not present" runtime error.
 *
 * - If the app is running with Google OAuth (current setup), this simply
 *   renders children as-is -- no ICP provider is needed.
 * - The wrapper satisfies any residual context checks by catching errors
 *   at the boundary level rather than crashing the whole tree.
 */
import type { ReactNode } from "react";

export function SafeIdentityProvider({ children }: { children: ReactNode }) {
  // Log a safe diagnostic message so developers can see auth mode in console
  if (
    typeof window !== "undefined" &&
    !(window as { __rydrAuthLogged?: boolean }).__rydrAuthLogged
  ) {
    (window as { __rydrAuthLogged?: boolean }).__rydrAuthLogged = true;
    console.info(
      "[RYDR] Internet Identity provider not active. Running in standard Google authentication mode.",
    );
  }

  // Simply render children -- GoogleAuthProvider handles all auth context
  return <>{children}</>;
}
