import { Loader2, MapPin, Navigation, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface LocationResult {
  label: string;
  lat: number;
  lng: number;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
  address?: {
    country?: string;
    city?: string;
    state?: string;
  };
}

export interface LocationAutocompleteProps {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (result: LocationResult) => void;
  icon?: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="text-foreground font-bold">
        {text.slice(idx, idx + query.length)}
      </strong>
      {text.slice(idx + query.length)}
    </>
  );
}

function getPlaceBadge(result: NominatimResult): string {
  const type = result.type || result.class || "";
  if (type === "aerodrome" || type === "airport") return "Airport";
  if (type === "railway" || type === "station") return "Station";
  if (type === "city" || type === "town") return "City";
  if (type === "suburb" || type === "neighbourhood") return "Area";
  if (type === "road" || type === "street") return "Road";
  if (type === "building") return "Building";
  if (type === "landmark") return "Landmark";
  if (result.class === "amenity") return "Place";
  if (result.class === "highway") return "Road";
  return "Place";
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m away`;
  return `${(meters / 1000).toFixed(1)}km away`;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function LocationAutocomplete({
  id,
  placeholder = "Search location\u2026",
  value,
  onChange,
  onSelect,
  icon,
  className = "",
  "data-ocid": dataOcid,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [gpsState, setGpsState] = useState<
    "idle" | "detecting" | "done" | "error"
  >("idle");
  const [nearbyResults, setNearbyResults] = useState<
    Array<NominatimResult & { distance: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowCurrentLocation(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = (query: string) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounceTimer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=1&accept-language=en&countrycodes=in,`;
        const res = await fetch(url, {
          headers: { "User-Agent": "RYDR-Carpooling-App/1.0" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as NominatimResult[];
        setSuggestions(data);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGpsState("detecting");
    setNearbyResults([]);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          // Reverse geocode
          const revRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { "User-Agent": "RYDR-Carpooling-App/1.0" } },
          );
          const revData = await revRes.json();
          const address =
            revData.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          onChange(address);
          onSelect({ label: address, lat, lng });

          // Fetch nearby places
          const nearbyRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=&lat=${lat}&lon=${lng}&format=json&limit=5&addressdetails=1&accept-language=en`,
            { headers: { "User-Agent": "RYDR-Carpooling-App/1.0" } },
          );
          const nearbyData = (await nearbyRes.json()) as NominatimResult[];
          const withDist = nearbyData
            .filter((r) => r.lat && r.lon)
            .map((r) => ({
              ...r,
              distance: haversineDistance(
                lat,
                lng,
                Number.parseFloat(r.lat),
                Number.parseFloat(r.lon),
              ),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);
          setNearbyResults(withDist);
          setGpsState("done");
          setSuggestions([]);
          setIsOpen(true);
        } catch {
          setGpsState("error");
          setIsOpen(false);
        }
      },
      () => {
        setGpsState("error");
      },
      { timeout: 10000 },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    setNearbyResults([]);
    setGpsState("idle");
    fetchSuggestions(val);
    if (val.length >= 2) {
      setIsOpen(true);
      setShowCurrentLocation(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setShowCurrentLocation(true);
    if (suggestions.length > 0 || nearbyResults.length > 0) {
      setIsOpen(true);
    } else {
      // Show only the "Use Current Location" row
      setIsOpen(true);
    }
  };

  const handleSelect = (result: NominatimResult) => {
    const label = result.display_name;
    onChange(label);
    onSelect({
      label,
      lat: Number.parseFloat(result.lat),
      lng: Number.parseFloat(result.lon),
    });
    setSuggestions([]);
    setNearbyResults([]);
    setIsOpen(false);
    setShowCurrentLocation(false);
    setActiveIndex(-1);
  };

  const totalItems =
    (showCurrentLocation ? 1 : 0) +
    (nearbyResults.length > 0 ? nearbyResults.length : suggestions.length);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const offset = showCurrentLocation ? 1 : 0;
      if (showCurrentLocation && activeIndex === 0) {
        handleUseCurrentLocation();
      } else {
        const list = nearbyResults.length > 0 ? nearbyResults : suggestions;
        const item = list[activeIndex - offset];
        if (item) handleSelect(item);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setShowCurrentLocation(false);
      setActiveIndex(-1);
    }
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setNearbyResults([]);
    setIsOpen(false);
    setShowCurrentLocation(false);
    setGpsState("idle");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const noResults =
    isOpen &&
    !isLoading &&
    value.trim().length >= 2 &&
    suggestions.length === 0 &&
    nearbyResults.length === 0 &&
    gpsState === "idle";

  const showDropdown =
    isOpen &&
    (showCurrentLocation ||
      suggestions.length > 0 ||
      nearbyResults.length > 0 ||
      gpsState === "detecting" ||
      noResults);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      data-ocid={dataOcid}
    >
      {/* Input wrapper */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none">
          {icon || <MapPin className="h-4 w-4" />}
        </div>
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full h-11 pl-9 pr-9 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading || gpsState === "detecting" ? (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          ) : value ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear location"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
          aria-label="Location suggestions"
        >
          {/* Use Current Location row */}
          {showCurrentLocation && (
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={gpsState === "detecting"}
              className="w-full px-4 py-3 flex items-center gap-3 text-left transition-colors"
              style={{
                background:
                  activeIndex === 0
                    ? "oklch(0.55 0.20 240 / 0.18)"
                    : "oklch(0.55 0.20 240 / 0.08)",
                borderBottom: "1px solid oklch(0.55 0.20 240 / 0.15)",
              }}
            >
              {gpsState === "detecting" ? (
                <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
              ) : (
                <Navigation className="h-4 w-4 text-primary shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-primary">
                  {gpsState === "detecting"
                    ? "Detecting your location\u2026"
                    : gpsState === "error"
                      ? "Location unavailable — try again"
                      : "Use Current Location"}
                </p>
                {gpsState === "idle" && (
                  <p className="text-[11px] text-muted-foreground">
                    Auto-detect via GPS
                  </p>
                )}
              </div>
            </button>
          )}

          {/* Nearby results after GPS */}
          {nearbyResults.length > 0 && (
            <>
              <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/30">
                Nearby Places
              </div>
              {nearbyResults.map((result, idx) => {
                const listIdx = (showCurrentLocation ? 1 : 0) + idx;
                const truncated =
                  result.display_name.length > 60
                    ? `${result.display_name.slice(0, 60)}\u2026`
                    : result.display_name;
                return (
                  <button
                    key={result.place_id}
                    type="button"
                    aria-selected={listIdx === activeIndex}
                    onMouseEnter={() => setActiveIndex(listIdx)}
                    onClick={() => handleSelect(result)}
                    className="w-full px-4 py-3 flex items-start gap-3 text-left transition-colors hover:bg-primary/10 focus:outline-none"
                    style={{
                      background:
                        listIdx === activeIndex
                          ? "oklch(0.55 0.20 240 / 0.12)"
                          : "transparent",
                    }}
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/90 leading-snug break-words">
                        {truncated}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {formatDistance(result.distance)}
                      </p>
                    </div>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium"
                      style={{
                        background: "oklch(0.55 0.20 240 / 0.12)",
                        color: "oklch(0.72 0.15 195)",
                      }}
                    >
                      Nearby
                    </span>
                  </button>
                );
              })}
            </>
          )}

          {/* Normal search results */}
          {suggestions.length > 0 &&
            nearbyResults.length === 0 &&
            suggestions.map((result, idx) => {
              const listIdx = (showCurrentLocation ? 1 : 0) + idx;
              const truncated =
                result.display_name.length > 60
                  ? `${result.display_name.slice(0, 60)}\u2026`
                  : result.display_name;
              const badge = getPlaceBadge(result);
              return (
                <button
                  key={result.place_id}
                  type="button"
                  aria-selected={listIdx === activeIndex}
                  onMouseEnter={() => setActiveIndex(listIdx)}
                  onClick={() => handleSelect(result)}
                  className="w-full px-4 py-3 flex items-start gap-3 text-left transition-colors hover:bg-primary/10 focus:outline-none"
                  style={{
                    background:
                      listIdx === activeIndex
                        ? "oklch(0.55 0.20 240 / 0.12)"
                        : "transparent",
                  }}
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/90 leading-snug break-words">
                      {highlightMatch(truncated, value)}
                    </p>
                  </div>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium"
                    style={{
                      background: "oklch(0.55 0.20 240 / 0.12)",
                      color: "oklch(0.72 0.15 195)",
                    }}
                  >
                    {badge}
                  </span>
                </button>
              );
            })}
          {/* No results message */}
          {noResults && !showCurrentLocation && (
            <div className="px-4 py-5 text-center text-sm text-muted-foreground">
              No locations found for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{value}&rdquo;
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
