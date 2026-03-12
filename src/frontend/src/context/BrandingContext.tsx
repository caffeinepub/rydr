import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type BrandingConfig = {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  appName: string;
};

const DEFAULT_BRANDING: BrandingConfig = {
  primaryColor: "#00AEEF",
  secondaryColor: "#1F7AE0",
  logoUrl: "",
  appName: "RYDR",
};

const STORAGE_KEY = "rydr_branding";

type BrandingCtx = {
  branding: BrandingConfig;
  updateBranding: (patch: Partial<BrandingConfig>) => void;
};

const BrandingContext = createContext<BrandingCtx>({
  branding: DEFAULT_BRANDING,
  updateBranding: () => {},
});

export function BrandingProvider({ children }: PropsWithChildren) {
  const [branding, setBranding] = useState<BrandingConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_BRANDING, ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }
    return DEFAULT_BRANDING;
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--rydr-primary",
      branding.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--rydr-secondary",
      branding.secondaryColor,
    );
  }, [branding.primaryColor, branding.secondaryColor]);

  const updateBranding = (patch: Partial<BrandingConfig>) => {
    setBranding((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => useContext(BrandingContext);
