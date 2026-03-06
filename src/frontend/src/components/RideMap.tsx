import { Loader2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface RideMapProps {
  origin: string;
  destination: string;
}

interface Coords {
  lat: number;
  lon: number;
}

async function geocode(address: string): Promise<Coords | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "en" },
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lon: Number.parseFloat(data[0].lon),
      };
    }
  } catch {
    // ignore
  }
  return null;
}

export function RideMap({ origin, destination }: RideMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      if (!mapRef.current) return;

      setLoading(true);
      setError(null);

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const L: any = await new Promise((resolve, reject) => {
          if ((window as any).L) {
            resolve((window as any).L);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = () => resolve((window as any).L);
          script.onerror = reject;
          document.head.appendChild(script);
        });

        // Fix default icon issue with Leaflet + bundlers
        // @ts-ignore
        // biome-ignore lint/performance/noDelete: Required for Leaflet icon fix
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        if (cancelled) return;

        // Geocode in parallel
        const [originCoords, destCoords] = await Promise.all([
          geocode(origin),
          geocode(destination),
        ]);

        if (cancelled) return;

        if (!originCoords || !destCoords) {
          setError("Could not geocode one or both locations.");
          setLoading(false);
          return;
        }

        // Destroy existing map
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }

        // Create map centered between the two points
        const midLat = (originCoords.lat + destCoords.lat) / 2;
        const midLon = (originCoords.lon + destCoords.lon) / 2;

        const map = L.map(mapRef.current, { zoomControl: true });
        leafletMapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18,
        }).addTo(map);

        // Add markers
        const originIcon = L.divIcon({
          html: `<div style="width:12px;height:12px;background:#FACC15;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(250,204,21,0.6)"></div>`,
          className: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });
        const destIcon = L.divIcon({
          html: `<div style="width:12px;height:12px;background:#F59E0B;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(245,158,11,0.6)"></div>`,
          className: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([originCoords.lat, originCoords.lon], { icon: originIcon })
          .addTo(map)
          .bindPopup(`<b>From:</b> ${origin}`);

        L.marker([destCoords.lat, destCoords.lon], { icon: destIcon })
          .addTo(map)
          .bindPopup(`<b>To:</b> ${destination}`);

        // Draw polyline
        const line = L.polyline(
          [
            [originCoords.lat, originCoords.lon],
            [destCoords.lat, destCoords.lon],
          ],
          {
            color: "#FACC15",
            weight: 3,
            opacity: 0.85,
            dashArray: "8, 6",
          },
        ).addTo(map);

        map.fitBounds(line.getBounds(), { padding: [40, 40] });
        map.setView([midLat, midLon]);

        setLoading(false);
      } catch (_err) {
        if (!cancelled) {
          setError("Failed to load map.");
          setLoading(false);
        }
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <div
      className="relative rounded-lg overflow-hidden border border-border bg-card"
      style={{ height: "300px" }}
    >
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-card z-10"
          data-ocid="ride.map_loading_state"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      {error && !loading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-card z-10"
          data-ocid="ride.map_error_state"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm text-center px-4">
            <MapPin className="h-6 w-6 text-muted-foreground" />
            <p>{error}</p>
            <p className="text-xs">
              {origin} → {destination}
            </p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        className="w-full h-full"
        data-ocid="ride.map_marker"
        style={{ minHeight: "300px" }}
      />
    </div>
  );
}
