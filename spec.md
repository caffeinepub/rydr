# RYDR

## Current State
- App is a carpooling platform with backend (Motoko) + React frontend
- Authentication: Google OAuth via `useGoogleAuth.ts` — but `main.tsx` keeps importing `InternetIdentityProvider` from the real ICP file (`useInternetIdentity.ts`), causing every backend call to run as anonymous and be rejected
- `useActor.ts` also imports `useInternetIdentity` from the ICP file, so identity is always null for Google users
- Profile save fails with "Unable to update profile" because actor has no identity
- Ride publishing fails for the same reason
- Logo not displaying — `BrandingContext` logoUrl defaults to empty string, no fallback SVG logo shown
- Dark/light mode toggle: `useDarkMode` hook exists, toggle needs wiring in Navbar
- Location search: `LocationAutocomplete` uses OpenStreetMap/Nominatim but may have issues
- Some UI visibility issues (low contrast), no consistent dark mode CSS
- Payment screens need to be hidden (future ready only)
- Footer (except bottom nav) should remain removed

## Requested Changes (Diff)

### Add
- Fallback RYDR text logo when no logoUrl is configured
- Dark/light mode toggle button in Navbar and BottomNav
- Save dark mode preference to localStorage
- Better error messages (network vs validation vs backend)
- Logo asset (generated SVG) for RYDR brand

### Modify
- **CRITICAL**: Replace `useInternetIdentity.ts` with a pure stub re-exporting everything from `useGoogleAuth.ts` — permanent fix so any import from this file uses Google auth
- **CRITICAL**: Fix `main.tsx` to use `<AuthProviders>` wrapper, remove ICP import
- **CRITICAL**: Fix `useActor.ts` to import `useGoogleAuth` not `useInternetIdentity`
- Profile page: ensure handleSave catches errors gracefully, shows field-specific messages
- Ride publish: ensure actor is authenticated before allowing publish
- Navbar: show RYDR logo fallback text, wire dark mode toggle
- Hide payment/payout/refund screens (mark as coming soon)
- Improve UI contrast on search panel (navy background #0A192F with white text)
- LocationAutocomplete: ensure it handles empty results gracefully

### Remove
- All real ICP/DFINITY imports from `useInternetIdentity.ts` — replace with stub
- Payment screens from navigation (hide until integration complete)

## Implementation Plan
1. Rewrite `useInternetIdentity.ts` as a pure re-export stub from `useGoogleAuth.ts`
2. Fix `main.tsx` — use `<AuthProviders>` as the sole auth wrapper
3. Fix `useActor.ts` — import from `useGoogleAuth` not `useInternetIdentity`
4. Fix `ProfilePage.tsx` error handling — catch errors with field-specific messages
5. Fix `PostRidePage.tsx` — show auth gate if not logged in, improve error messages
6. Fix `Navbar.tsx` — RYDR logo fallback, dark mode toggle
7. Fix `BottomNav.tsx` — dark mode toggle, theme consistency
8. Fix `index.css` — dark mode CSS variables for navy/white theme
9. Hide payment-related settings pages from navigation (AccountPaymentMethodsPage, etc.)
10. Fix location search contrast issues in search panel
