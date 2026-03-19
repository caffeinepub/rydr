# RYDR – Full System Repair + Feature Completion

## Current State
- `main.tsx` still imports `InternetIdentityProvider` from `./hooks/useInternetIdentity` (the REAL ICP AuthClient file), which throws "InternetIdentityProvider is not present" on every load
- `useActor.ts` also imports `useInternetIdentity` from the ICP file, meaning every backend call uses a null anonymous identity and is rejected
- `useInternetIdentity.ts` is the real ICP implementation — causes the runtime error
- `AuthProviders` component exists and is correct (wraps `GoogleAuthProvider`) but is NOT used in `main.tsx`
- `useGoogleAuth.ts` is correct and ready but NOT used in `useActor.ts`
- Admin panel exists (AdminPage.tsx, ~2239 lines) but has no Google OAuth Client ID input or Razorpay API key console
- Live GPS tracking not implemented
- Only driver rating exists (`rateDriver`); no passenger-rates-driver-after-ride flow shown in UI clearly
- Notification system exists (useNotificationStore) but not wired to booking/ride events

## Requested Changes (Diff)

### Add
- Admin → Settings tab: Google OAuth Client ID input field with save/status indicator
- Admin → Settings tab: Razorpay Key ID + Key Secret fields with sandbox toggle
- Live tracking page `/ride/:id/tracking` — driver side: start tracking button uses browser Geolocation API to store coords in localStorage every 5s; passenger side: polls localStorage/backend every 5s to show driver on Leaflet map with ETA
- Razorpay payment modal wired when Razorpay keys are configured
- Notification triggers for: booking request sent, booking accepted/rejected, ride reminder

### Modify
- `main.tsx`: replace `InternetIdentityProvider` import+usage with `AuthProviders`
- `useActor.ts`: replace `useInternetIdentity` import with `useGoogleAuth`
- `useInternetIdentity.ts`: replace entire file contents with a permanent stub that re-exports everything from `useGoogleAuth`
- `GoogleAuthProvider.tsx`: wire up real Google GSI when Client ID is stored in localStorage/branding config
- Admin page: add Settings tab with Google OAuth + Razorpay consoles
- DashboardPage: show "Rate your driver" button for completed rides where rating hasn't been given
- RideDetailPage: add "Track Ride" button for accepted bookings
- Notifications: trigger notification events on bookRide, approveBooking, rejectBooking mutations

### Remove
- All direct `@dfinity/auth-client` usage in `useInternetIdentity.ts` (replaced by stub)

## Implementation Plan
1. Fix `main.tsx` — use `<AuthProviders>` wrapper
2. Fix `useActor.ts` — import `useGoogleAuth` instead of `useInternetIdentity`
3. Stub `useInternetIdentity.ts` — re-export from `useGoogleAuth` so any platform-injected import still resolves to Google auth
4. Add Settings tab to AdminPage with Google OAuth Client ID + Razorpay key inputs
5. Update `GoogleAuthProvider.tsx` to read stored Client ID and use real Google GSI popup
6. Add `/ride/:id/tracking` route and TrackingPage component
7. Wire notification events into useQueries mutations
8. Add ride completion rating modal for passengers
