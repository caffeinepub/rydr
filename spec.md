# RYDR - Ride Matching Engine

## Current State
- Full-stack carpooling app with dual-role users (driver/rider)
- Motoko backend with: user registration (name, avatarUrl), ride posting, search, booking (instant/manual approval), driver ratings
- React frontend with OpenStreetMap/Leaflet route visualization
- User type: `{ id, name, avatarUrl, totalRatingPoints, ratingCount }`
- No social profile links on user profiles
- No PWA support (no manifest, no service worker)
- No brand identity applied (no logo, no hero banner, no trust seal)
- Default color scheme (not yellow/black taxi-style)

## Requested Changes (Diff)

### Add
- **Social profile links on user profile**: Users can add a Facebook URL and/or LinkedIn URL to their profile. These are stored in the backend and displayed on the profile page with a "Verified via Facebook/LinkedIn" badge when set.
- **PWA support**: `manifest.json` with RYDR branding, service worker for offline caching, `<link rel="manifest">` in `index.html`. Theme color: yellow (#FACC15). App name: "RYDR".
- **Logo branding**: Use uploaded RYDR logo (`/assets/uploads/file_00000000650c720883073dd037e87b31-1.png`) in the navbar/header and on the welcome/home screen.
- **Hero banner**: Full-width background image on the welcome/home screen showing a city road at night (generated). Logo overlaid on top of the hero banner with tagline "Your City, Your Ride".
- **Trust seal**: Displayed on the welcome screen and optionally in the footer -- a badge/strip saying "Your data is secured on the Internet Computer blockchain" with a shield icon.
- **Yellow and black color scheme**: Primary yellow (#FACC15 / amber-400), backgrounds black/dark gray (#0F0F0F, #1A1A1A), white text on dark, black text on yellow buttons. Applied globally via Tailwind config and index.css.

### Modify
- **Backend `User` type**: Add `facebookUrl: Text` and `linkedinUrl: Text` optional fields (stored as empty string when not set).
- **`registerUser` function**: Accept two new optional parameters `facebookUrl` and `linkedinUrl`.
- **`UserPublic` type**: Expose `facebookUrl` and `linkedinUrl` so the frontend can display them.
- **`updateProfile` function**: New endpoint so users can update name, avatarUrl, facebookUrl, linkedinUrl after initial registration.
- **`backend.d.ts`**: Updated to reflect new User fields and `updateProfile` endpoint.
- **`index.html`**: Add PWA meta tags, manifest link, theme-color meta.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `main.mo`:
   - Add `facebookUrl` and `linkedinUrl` to `User` and `UserPublic` types
   - Update `registerUser` to accept and store these fields
   - Add `updateProfile(name, avatarUrl, facebookUrl, linkedinUrl)` endpoint
2. Update `backend.d.ts` to match new backend API
3. Generate hero banner background image (city road at night, yellow/black tones)
4. Add PWA files: `public/manifest.json`, `public/sw.js`
5. Update `index.html` with PWA meta tags and manifest link
6. Apply yellow/black Tailwind theme in `tailwind.config.js` and `index.css`
7. Update frontend pages:
   - **Welcome/Home page**: Hero banner with RYDR logo overlay, trust seal badge
   - **Profile page**: Show facebookUrl / linkedinUrl fields as editable inputs; display "Verified" badge when set
   - **Navbar**: Use RYDR logo instead of text-only branding
8. Validate (typecheck, lint, build)
