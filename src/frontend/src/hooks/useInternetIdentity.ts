/**
 * STUB: This file now re-exports everything from useGoogleAuth.ts.
 *
 * This ensures that any import from this file (including the platform's
 * auto-injected InternetIdentityProvider in main.tsx) actually uses the
 * Google OAuth system, not ICP Internet Identity.
 *
 * DO NOT add real ICP imports here.
 */
export * from "./useGoogleAuth";
export { GoogleAuthProvider as InternetIdentityProvider } from "./useGoogleAuth";
export { useGoogleAuth as useInternetIdentity } from "./useGoogleAuth";
