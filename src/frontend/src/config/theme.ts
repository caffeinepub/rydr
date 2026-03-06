// RYDR Brand Theme — derived from logo palette
export const RYDR_THEME = {
  // Primary: Electric green (logo top swoosh)
  primary: "oklch(0.72 0.22 145)",
  primaryDim: "oklch(0.72 0.22 145 / 0.15)",
  // Secondary: Cyan/teal (logo bottom swoosh)
  accent: "oklch(0.72 0.15 195)",
  accentDim: "oklch(0.72 0.15 195 / 0.15)",
  // Background: Deep navy
  bg: "oklch(0.09 0.03 240)",
  bgCard: "oklch(0.12 0.03 240)",
  bgCardHover: "oklch(0.14 0.04 240)",
  // Gradients
  gradientBrand:
    "linear-gradient(135deg, oklch(0.72 0.22 145), oklch(0.72 0.15 195))",
  gradientBg:
    "radial-gradient(ellipse at 50% 0%, oklch(0.15 0.08 240) 0%, oklch(0.09 0.04 240) 45%, oklch(0.06 0.03 145) 100%)",
  // Shadows
  shadowCard: "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.25 0.03 240)",
  shadowGlow: "0 0 20px oklch(0.72 0.22 145 / 0.4)",
  shadowGlowLg: "0 0 40px oklch(0.72 0.22 145 / 0.3)",
  // Typography
  fontDisplay: '"Cabinet Grotesk", system-ui, sans-serif',
  fontBody: '"Mona Sans", system-ui, sans-serif',
} as const;
