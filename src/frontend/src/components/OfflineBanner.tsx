import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
      style={{
        backgroundColor: "#92400E",
        color: "#FDE68A",
        position: "sticky",
        top: 0,
        zIndex: 9999,
      }}
      role="alert"
      aria-live="polite"
      data-ocid="app.offline_state"
    >
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>You are offline. Some features may not work.</span>
    </div>
  );
}
