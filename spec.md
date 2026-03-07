# RYDR – UI Refinement v12

## Current State

- Dark navy/green theme using Nunito/Nunito Sans fonts
- WelcomePage: single-screen with floating logo + Proceed button
- HomePage: search bar + recent searches + AdSense placeholder + sample rides + TrustSeal
- PostRidePage: 5-step wizard (Route, DateTime, Seats/Price, Preferences, Review)
- Navbar: "Rydr" wordmark in Cabinet Grotesk gradient
- Footer: "Made with ❤️ in India" already present, but TrustSeal compact still shows "Data secured on ICP blockchain"
- TrustSeal component: both variants show ICP blockchain messaging
- BottomNav: Search, Publish, Your rides, Chat, Profile tabs
- No location autocomplete — plain text inputs in search and post ride

## Requested Changes (Diff)

### Add
- 3-step onboarding welcome flow replacing single-screen welcome (Screen 1: Welcome to Rydr + Get Started/Login; Screen 2: Find or Share Rides Easily; Screen 3: Safe & Community Driven + Enter App) with smooth swipe/slide animation between steps
- LocationAutocomplete component using OpenStreetMap Nominatim API — dropdown suggestions, highlight matching text, captures lat/lng in background, mobile friendly, typo-tolerant debounced search
- Wire LocationAutocomplete into: HomePage search (From/To fields) and PostRidePage Step 0 (origin/destination)
- Ride posting Step 0 now labeled "Pickup Location", Step 1 "Drop Location" as separate steps for auto-advance UX clarity (keep current 5-step structure but enhance with autocomplete)
- Progress indicator label: "Step X of 5" (already exists, keep)

### Modify
- **Global theme**: Change primary color from electric green (oklch 0.72 0.22 145) to Deep Blue (#0B2A4A → oklch 0.19 0.06 240). Accent gradient: Blue #1F7AE0 → Cyan #00AEEF → Green #8BD448. Secondary: Dark Navy #071A2F. Buttons: gradient blue. Cards: white/light with soft shadows on dark background — keep dark theme overall but use blue as primary instead of green.
- **Typography**: Replace Nunito/Nunito Sans with Poppins. Headings: Poppins ExtraBold (800). Body: Poppins Medium (500). Fallback: Montserrat. Update index.html Google Fonts link. Update tailwind.config.js fontFamily. Update index.css body/heading font stacks.
- **Navbar**: "Rydr" wordmark → Poppins ExtraBold, white color, slightly expanded letter-spacing (0.05em). Remove gradient text on brand — use plain white.
- **BottomNav**: Update active color to new primary blue instead of green.
- **TrustSeal**: Change text from "Your data is secured on the Internet Computer blockchain" / "Data secured on ICP blockchain" to "Verified & Secure Platform" (remove all ICP/blockchain references).
- **HomePage FEATURES array**: Remove the "Secure & Blockchain" feature card that mentions Internet Computer blockchain. Replace with a neutral "Safe Rides" card.
- **WelcomePage**: Replace single-screen with 3-step onboarding. Remove ICP trust seal from welcome screen entirely.
- **PostRidePage**: Rename step titles to match: Step 1 "Pickup Location", Step 2 "Drop Location" (split route into two steps with autocomplete). Adjust TOTAL_STEPS to 6. Steps: Pickup → Drop → Date & Time → Seats & Price → Preferences → Review.
- **Footer**: TrustSeal compact already shows ICP text — fix via TrustSeal component change.
- **index.css**: Update CSS variables for primary to blue. Update gradient utilities. Update scrollbar color.

### Remove
- All occurrences of "Internet Computer blockchain", "ICP blockchain", "secured on the Internet Computer" text from UI components
- WelcomePage trust seal with ICP text
- FEATURES card "Secure & Blockchain" / "Your data is secured on the Internet Computer blockchain"

## Implementation Plan

1. **index.html**: Replace Nunito Google Fonts with Poppins + Montserrat
2. **tailwind.config.js**: Update fontFamily display/sans to Poppins/Montserrat
3. **index.css**: Update body/heading font declarations; update primary CSS variable from green oklch to blue oklch; update gradient/glow utilities to use blue palette
4. **config/theme.ts**: Update RYDR_THEME colors to blue palette
5. **TrustSeal.tsx**: Remove ICP blockchain text → "Verified & Secure Platform"
6. **components/LocationAutocomplete.tsx**: New component — debounced Nominatim API calls, dropdown list, highlight matching text, onSelect callback with {label, lat, lng}, mobile-friendly, data-ocid markers
7. **WelcomePage.tsx**: Rewrite as 3-step onboarding with slide animation. Step 1: logo hero + "Welcome to Rydr" + "Your City, Your Ride" + Get Started / Login buttons. Step 2: "Find or Share Rides Easily" + 3 bullet points. Step 3: "Safe & Community Driven" + 3 bullet points + "Enter App" button. Progress dots indicator.
8. **HomePage.tsx**: Wire LocationAutocomplete into From/To fields; remove "Secure & Blockchain" from FEATURES array; update ICP reference in FEATURES
9. **PostRidePage.tsx**: Split Step 0 into two steps (Pickup Location + Drop Location), total 6 steps; wire LocationAutocomplete into both location fields; update STEP_TITLES
10. **Navbar.tsx**: Poppins ExtraBold white wordmark, letter-spacing 0.05em
11. **BottomNav.tsx**: Update active color to blue
