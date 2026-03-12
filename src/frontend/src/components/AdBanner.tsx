import { useEffect, useRef, useState } from "react";
import { adConfig, trackAdImpression } from "../services/adService";

type AdPlacement =
  | "home-banner"
  | "search-results"
  | "passenger-dashboard"
  | "driver-dashboard"
  | "footer-banner";
type AdSize = "leaderboard" | "rectangle" | "mobile-banner";

interface AdBannerProps {
  placement: AdPlacement;
  size?: AdSize;
  className?: string;
}

const SIZE_DIMENSIONS: Record<AdSize, { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  "mobile-banner": { width: 320, height: 50 },
};

export function AdBanner({
  placement,
  size = "rectangle",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dims = SIZE_DIMENSIONS[size];

  useEffect(() => {
    if (!adConfig.isConfigured) {
      setAdFailed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          trackAdImpression(placement);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [placement]);

  useEffect(() => {
    if (!isVisible || !adConfig.isConfigured) return;
    try {
      const adsbygoogle =
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || [];
      (adsbygoogle as unknown[]).push({});
    } catch {
      setAdFailed(true);
    }
  }, [isVisible]);

  if (!adConfig.isConfigured) {
    // Clean placeholder — no dashed border, no background card
    return (
      <div
        ref={adRef}
        className={`flex items-center justify-center rounded-lg text-xs text-muted-foreground/30 ${className}`}
        style={{
          minHeight: Math.min(dims.height, 90),
          width: "100%",
          maxWidth: dims.width,
        }}
        data-ocid={`ad.${placement.replace(/-/g, "_")}_banner`}
        aria-hidden="true"
      />
    );
  }

  if (adFailed) {
    return <div style={{ minHeight: dims.height }} aria-hidden="true" />;
  }

  return (
    <div
      ref={adRef}
      className={`overflow-hidden ${className}`}
      style={{ minHeight: dims.height, width: "100%", maxWidth: dims.width }}
      data-ocid={`ad.${placement.replace(/-/g, "_")}_banner`}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: dims.height }}
          data-ad-client={adConfig.clientId}
          data-ad-slot={adConfig.slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
