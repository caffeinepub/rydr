/**
 * PERMANENT STUB — DO NOT MODIFY
 *
 * Redirects all ICP Internet Identity imports to Google auth.
 * Prevents "InternetIdentityProvider is not present" from ever returning.
 */
export {
  useGoogleAuth as useInternetIdentity,
  GoogleAuthProvider as InternetIdentityProvider,
  GoogleAuthProvider,
  GoogleAuthReactContext as InternetIdentityReactContext,
} from "./useGoogleAuth";

export type { GoogleAuthContext as InternetIdentityContext } from "./useGoogleAuth";
