/**
 * Google-style authentication hook for RYDR.
 * Replaces Internet Identity with a Google Sign-In UI.
 * Derives a deterministic Ed25519 ICP identity from the user's email
 * so each Google account gets a unique, persistent ICP principal.
 */
import { Ed25519KeyIdentity } from "@dfinity/identity";
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ADMIN_EMAIL = "aman5875@gmail.com";
const STORAGE_KEY = "rydr_google_session";

export type GoogleUser = {
  email: string;
  name: string;
  picture: string;
  googleId: string;
  createdAt: number;
};

export type GoogleAuthContext = {
  googleUser: GoogleUser | null;
  identity: Ed25519KeyIdentity | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isAdmin: boolean;
  /** Open the Google Sign-In modal */
  login: () => void;
  /** Complete login after user fills in the modal */
  completeLogin: (
    email: string,
    name: string,
    picture?: string,
  ) => Promise<void>;
  /** Cancel / close modal */
  cancelLogin: () => void;
  /** Show login modal state */
  showLoginModal: boolean;
  /** Log out */
  clear: () => void;
};

export const GoogleAuthReactContext = createContext<
  GoogleAuthContext | undefined
>(undefined);

/**
 * Derive a deterministic 32-byte seed from an email string.
 */
async function emailToSeed(email: string): Promise<Uint8Array> {
  const normalized = email.toLowerCase().trim();
  const data = new TextEncoder().encode(`rydr-v1:${normalized}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}

export function useGoogleAuth(): GoogleAuthContext {
  const ctx = useContext(GoogleAuthReactContext);
  if (!ctx)
    throw new Error(
      "GoogleAuthProvider not found. Wrap your app with <GoogleAuthProvider>.",
    );
  return ctx;
}

/** Alias so existing code using useInternetIdentity still works */
export { useGoogleAuth as useInternetIdentity };

export function useGoogleAuthProvider(): GoogleAuthContext {
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [identity, setIdentity] = useState<Ed25519KeyIdentity | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const user: GoogleUser = JSON.parse(stored);
      setGoogleUser(user);
      // Recreate identity from email seed
      emailToSeed(user.email).then((seed) => {
        const id = Ed25519KeyIdentity.generate(seed);
        setIdentity(id);
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const cancelLogin = useCallback(() => {
    setShowLoginModal(false);
    setIsLoggingIn(false);
  }, []);

  const completeLogin = useCallback(
    async (email: string, name: string, picture = "") => {
      setIsLoggingIn(true);
      try {
        const seed = await emailToSeed(email);
        const id = Ed25519KeyIdentity.generate(seed);

        const user: GoogleUser = {
          email: email.toLowerCase().trim(),
          name: name.trim(),
          picture,
          googleId: id.getPrincipal().toString(),
          createdAt: Date.now(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        setGoogleUser(user);
        setIdentity(id);
        setShowLoginModal(false);
      } finally {
        setIsLoggingIn(false);
      }
    },
    [],
  );

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setGoogleUser(null);
    setIdentity(null);
  }, []);

  const isAdmin = googleUser?.email === ADMIN_EMAIL;

  return {
    googleUser,
    identity,
    isAuthenticated: !!identity,
    isLoggingIn,
    isAdmin,
    login,
    completeLogin,
    cancelLogin,
    showLoginModal,
    clear,
  };
}

/**
 * Provider component -- wraps the app with Google auth context.
 * Also exported as InternetIdentityProvider for backward compatibility.
 */
export function GoogleAuthProvider({
  children,
}: PropsWithChildren<{ children?: ReactNode }>) {
  const value = useGoogleAuthProvider();
  return createElement(GoogleAuthReactContext.Provider, { value, children });
}

/** Backward-compat alias used by main.tsx */
export { GoogleAuthProvider as InternetIdentityProvider };
