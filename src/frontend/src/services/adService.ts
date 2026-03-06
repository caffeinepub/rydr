// RYDR Ad Service — Google AdSense integration
// Loads AdSense script asynchronously and provides tracking utilities

const AD_CLIENT = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID || "";
const AD_SLOT = import.meta.env.VITE_GOOGLE_ADSENSE_SLOT_ID || "";

export const adConfig = {
  clientId: AD_CLIENT,
  slotId: AD_SLOT,
  isConfigured: !!AD_CLIENT && !!AD_SLOT,
};

// Load AdSense script asynchronously (call once at app startup)
let scriptLoaded = false;
export function loadAdSenseScript(): void {
  if (scriptLoaded || !adConfig.clientId) return;
  scriptLoaded = true;
  const script = document.createElement("script");
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.clientId}`;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.onerror = () => {
    console.warn("[RYDR Ads] AdSense script failed to load");
    scriptLoaded = false;
  };
  document.head.appendChild(script);
}

// Track ad visibility
export function trackAdImpression(placement: string): void {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("rydr:ad:impression", {
    detail: { placement, timestamp: Date.now() },
  });
  window.dispatchEvent(event);
  // Future: send to analytics endpoint
}

// Track ad click
export function trackAdClick(placement: string): void {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("rydr:ad:click", {
    detail: { placement, timestamp: Date.now() },
  });
  window.dispatchEvent(event);
}
