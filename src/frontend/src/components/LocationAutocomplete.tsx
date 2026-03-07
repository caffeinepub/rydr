import { Loader2, MapPin, X } from "lucide-react";
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

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function LocationAutocomplete({
  id,
  placeholder = "Search location…",
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
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounceTimer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=1&accept-language=en&countrycodes=in,`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "RYDR-Carpooling-App/1.0",
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as NominatimResult[];
        setSuggestions(data);
        setIsOpen(data.length > 0);
        setActiveIndex(-1);
      } catch {
        // Silently fail — no suggestions, no crash
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    fetchSuggestions(val);
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
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      data-ocid={dataOcid}
    >
      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
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
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full h-11 pl-9 pr-9 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors"
        />

        {/* Right: loading spinner or clear button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
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
      {isOpen && suggestions.length > 0 && (
        <div
          className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
          aria-label="Location suggestions"
        >
          {suggestions.map((result, idx) => {
            const truncated =
              result.display_name.length > 60
                ? `${result.display_name.slice(0, 60)}…`
                : result.display_name;
            const badge = getPlaceBadge(result);
            return (
              <button
                key={result.place_id}
                type="button"
                aria-selected={idx === activeIndex}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 flex items-start gap-3 text-left transition-colors hover:bg-primary/10 focus:outline-none"
                style={{
                  background:
                    idx === activeIndex
                      ? "oklch(0.55 0.20 240 / 0.12)"
                      : "transparent",
                }}
              >
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/90 leading-snug">
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
        </div>
      )}
    </div>
  );
}
