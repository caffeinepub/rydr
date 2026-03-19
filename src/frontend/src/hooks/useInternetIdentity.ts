/**
 * PERMANENT STUB – DO NOT MODIFY
 *
 * This file previously contained ICP Internet Identity logic.
 * RYDR now uses Google OAuth exclusively.
 *
 * All exports are re-routed to useGoogleAuth so any import of
 * useInternetIdentity (including platform-injected ones) resolves
 * to Google auth and never throws the ICP runtime error.
 */
export * from "./useGoogleAuth";
export { GoogleAuthProvider as InternetIdentityProvider } from "./useGoogleAuth";
export { useGoogleAuth as useInternetIdentity } from "./useGoogleAuth";
