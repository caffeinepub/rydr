# RYDR

## Current State

- Full-stack carpooling app on Internet Computer (Motoko backend + React frontend)
- Dark-first theme: dark navy backgrounds, electric green primary, cyan accent
- Fonts: Plus Jakarta Sans (headings) + Figtree (body) loaded from Google Fonts
- Bottom nav does NOT exist -- app uses a top Navbar with dropdown
- No "Chat" tab or messaging inbox
- Admin panel at `/admin` uses "first principal" logic -- blocks anyone who didn't first sign in at deployment time; no "Claim Admin" flow exists
- Welcome page exists with animated logo hero and Proceed button
- Ride posting is a single-page form (not a step-by-step wizard)
- Profile page exists but no BlaBlaCar-style "About you / Account" tab structure

## Requested Changes (Diff)

### Add
- **BlaBlaCar-style fonts**: Replace current font setup with the exact fonts visible in BlaBlaCar screenshots -- headings use an ultra-bold extra-heavy font (weight 800-900), body uses clean normal-weight. Load `Nunito` (weight 800/900 for headings) and `Inter` (weight 400/500 for body) from Google Fonts -- these most closely match the BlaBlaCar screenshot typography (ultra-rounded heavy headings, clean body). Apply globally.
- **Bottom navigation bar**: Replace top Navbar on mobile with a fixed bottom nav bar matching BlaBlaCar layout: Search, Publish, Your rides, Chat, Profile -- 5 tabs with icons and labels
- **Chat tab / messaging inbox**: New `/chat` page showing booking notifications and messages between riders/drivers. Shows list of conversations; each conversation has basic message thread. Accessible via bottom nav "Chat" tab.
- **"Claim Admin" flow**: On `/admin`, if no admin exists yet (backend returns false for isCallerAdmin), show a "Claim Admin" button. When clicked, call `_initializeAccessControlWithSecret` with a known secret to grant admin to the current user. This allows the app owner to self-serve admin access without needing to know the original deployment principal.
- **Step-by-step ride posting wizard**: Replace the single PostRide form with multi-step screens matching BlaBlaCar flow: Step 1 Pick-up (full address search input), Step 2 Drop-off, Step 3 Stopovers, Step 4 Date picker (calendar scroll), Step 5 Time picker, Step 6 Seats stepper + passenger options, Step 7 Price stepper with recommended range, Step 8 Booking mode (Instant vs Manual), Step 9 Preferences (pets/smoking/luggage), Step 10 Review & Publish, Step 11 Return ride prompt

### Modify
- **Font weights**: Headings must be weight 800+ (extra-bold/black), body stays at 400. Specifically match the visual from BlaBlaCar screenshots where large screen headings like "Pick-up", "When are you going?" are extremely heavy/black weight.
- **index.html font loading**: Update Google Fonts link to load `Nunito:wght@400;700;800;900` and `Inter:wght@400;500;600` instead of Plus Jakarta Sans + Figtree
- **tailwind.config.js**: Update `font-display` to Nunito, `font-sans` to Inter
- **index.css heading styles**: Update `h1-h6` to use Nunito at font-weight 800
- **App.tsx**: Add `/chat` route; on mobile, hide top Navbar and show bottom nav bar instead; bottom nav tabs: Search (/), Publish (/post-ride), Your rides (/dashboard), Chat (/chat), Profile (/profile)
- **Admin "Claim Admin"**: On the Access Denied screen, if user is logged in but not admin, show a "Claim Super Admin" button that calls `_initializeAccessControlWithSecret("rydr-admin-2026")`. After calling, refetch isAdmin and redirect to admin panel if successful.
- **Navbar**: On mobile, hide the top navbar (it's replaced by the bottom nav). On desktop, keep the top navbar.

### Remove
- Nothing removed -- all existing modules (admin tabs, profile, dashboard, welcome screen, map) remain intact

## Implementation Plan

1. Update `index.html` -- swap Google Fonts link from Plus Jakarta Sans + Figtree to Nunito + Inter
2. Update `tailwind.config.js` -- set font-display to Nunito, font-sans to Inter
3. Update `index.css` -- set heading font-family to Nunito at weight 800, body to Inter at 400; keep all other tokens and animations intact
4. Create `src/pages/ChatPage.tsx` -- messaging inbox UI showing mock conversations with booking notifications and message threads between riders/drivers
5. Create `src/components/BottomNav.tsx` -- fixed bottom nav with 5 tabs: Search, Publish, Your rides, Chat, Profile; active tab highlighted in brand color
6. Update `src/App.tsx` -- add `/chat` route; wrap layout so bottom nav appears on mobile (hidden on desktop); hide top Navbar on mobile
7. Update `src/pages/PostRidePage.tsx` -- replace single-form with BlaBlaCar-style multi-step wizard (10 steps as described above)
8. Update `src/pages/AdminPage.tsx` -- replace Access Denied screen with "Claim Admin" flow: if logged in but not admin, show Claim button that calls `_initializeAccessControlWithSecret`; on success refetch and grant access
9. Validate and fix all TypeScript/lint errors
