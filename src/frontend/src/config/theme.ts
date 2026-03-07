// RYDR Brand Theme — Deep Blue + Cyan + Green (logo-inspired)
export const RYDR_THEME = {
  // Primary: Deep blue (#1F7AE0 → oklch approx)
  primary: "oklch(0.55 0.20 240)",
  primaryDim: "oklch(0.55 0.20 240 / 0.15)",
  // Accent: Cyan (#00AEEF → oklch approx)
  accent: "oklch(0.72 0.15 195)",
  accentDim: "oklch(0.72 0.15 195 / 0.15)",
  // Green stop for tricolor gradient (#8BD448)
  green: "oklch(0.72 0.22 145)",
  greenDim: "oklch(0.72 0.22 145 / 0.15)",
  // Background: Dark navy (#071A2F)
  bg: "oklch(0.08 0.03 240)",
  bgCard: "oklch(0.12 0.04 240)",
  bgCardHover: "oklch(0.14 0.05 240)",
  // Gradients — Blue → Cyan
  gradientBrand:
    "linear-gradient(135deg, oklch(0.55 0.20 240), oklch(0.72 0.15 195))",
  // Tricolor gradient — Blue → Cyan → Green
  gradientTricolor:
    "linear-gradient(135deg, oklch(0.55 0.20 240), oklch(0.72 0.15 195), oklch(0.72 0.22 145))",
  gradientBg:
    "radial-gradient(ellipse at 50% 0%, oklch(0.15 0.08 240) 0%, oklch(0.08 0.04 240) 45%, oklch(0.05 0.02 240) 100%)",
  // Shadows
  shadowCard: "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.22 0.04 240)",
  shadowGlow: "0 0 20px oklch(0.55 0.20 240 / 0.4)",
  shadowGlowLg: "0 0 40px oklch(0.55 0.20 240 / 0.3)",
  // Typography
  fontDisplay: '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
  fontBody: '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif',
} as const;
