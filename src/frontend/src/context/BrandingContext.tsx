import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemePreset = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
};

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: "rydr-blue",
    name: "RYDR Blue",
    primaryColor: "#00AEEF",
    secondaryColor: "#0B3D91",
    backgroundColor: "#F6F7F9",
    textColor: "#1F2D3D",
    cardColor: "#FFFFFF",
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    backgroundColor: "#0F172A",
    textColor: "#F1F5F9",
    cardColor: "#1E293B",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    primaryColor: "#10B981",
    secondaryColor: "#065F46",
    backgroundColor: "#F0FDF4",
    textColor: "#064E3B",
    cardColor: "#FFFFFF",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    primaryColor: "#F97316",
    secondaryColor: "#C2410C",
    backgroundColor: "#FFF7ED",
    textColor: "#431407",
    cardColor: "#FFFFFF",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    primaryColor: "#8B5CF6",
    secondaryColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
    textColor: "#2E1065",
    cardColor: "#FFFFFF",
  },
];

export type BrandingConfig = {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  appName: string;
  backgroundColor?: string;
  textColor?: string;
  cardColor?: string;
};

const DEFAULT_BRANDING: BrandingConfig = {
  primaryColor: "#00AEEF",
  secondaryColor: "#0B3D91",
  logoUrl: "",
  appName: "RYDR",
  backgroundColor: "#F6F7F9",
  textColor: "#1F2D3D",
  cardColor: "#FFFFFF",
};

const STORAGE_KEY = "rydr_branding";
const THEME_KEY = "rydr_active_theme";

type BrandingCtx = {
  branding: BrandingConfig;
  updateBranding: (patch: Partial<BrandingConfig>) => void;
  activeThemeId: string;
  setTheme: (id: string) => void;
  presetThemes: ThemePreset[];
};

const BrandingContext = createContext<BrandingCtx>({
  branding: DEFAULT_BRANDING,
  updateBranding: () => {},
  activeThemeId: "rydr-blue",
  setTheme: () => {},
  presetThemes: PRESET_THEMES,
});

function applyThemeToDom(b: BrandingConfig) {
  const root = document.documentElement;
  root.style.setProperty("--rydr-primary", b.primaryColor);
  root.style.setProperty("--rydr-secondary", b.secondaryColor);
  if (b.backgroundColor) {
    root.style.setProperty("--rydr-bg", b.backgroundColor);
    document.body.style.backgroundColor = b.backgroundColor;
  }
  if (b.textColor) {
    root.style.setProperty("--rydr-text", b.textColor);
    document.body.style.color = b.textColor;
  }
  if (b.cardColor) {
    root.style.setProperty("--rydr-card", b.cardColor);
  }
}

export function BrandingProvider({ children }: PropsWithChildren) {
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    return localStorage.getItem(THEME_KEY) ?? "rydr-blue";
  });

  const [branding, setBranding] = useState<BrandingConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const themeId = localStorage.getItem(THEME_KEY) ?? "rydr-blue";
      const preset = PRESET_THEMES.find((t) => t.id === themeId);
      const base = preset
        ? {
            primaryColor: preset.primaryColor,
            secondaryColor: preset.secondaryColor,
            backgroundColor: preset.backgroundColor,
            textColor: preset.textColor,
            cardColor: preset.cardColor,
            logoUrl: "",
            appName: "RYDR",
          }
        : { ...DEFAULT_BRANDING };
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...base,
          logoUrl: parsed.logoUrl ?? "",
          appName: parsed.appName ?? "RYDR",
        };
      }
      return base;
    } catch {
      return { ...DEFAULT_BRANDING };
    }
  });

  useEffect(() => {
    applyThemeToDom(branding);
  }, [branding]);

  const updateBranding = (patch: Partial<BrandingConfig>) => {
    setBranding((prev) => {
      const next = { ...prev, ...patch };
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...stored, ...patch }),
        );
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(patch));
      }
      return next;
    });
  };

  const setTheme = (id: string) => {
    const preset = PRESET_THEMES.find((t) => t.id === id);
    if (!preset) return;
    setActiveThemeId(id);
    localStorage.setItem(THEME_KEY, id);
    const next: BrandingConfig = {
      ...branding,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
      cardColor: preset.cardColor,
    };
    setBranding(next);
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, ...next }));
    } catch {
      /* ignore */
    }
  };

  return (
    <BrandingContext.Provider
      value={{
        branding,
        updateBranding,
        activeThemeId,
        setTheme,
        presetThemes: PRESET_THEMES,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => useContext(BrandingContext);
