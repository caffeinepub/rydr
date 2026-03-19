import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import { MapPin, Navigation, Radio, StopCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useMyProfile, useRideDetail } from "../hooks/useQueries";

// Haversine formula for distance in km
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
}

function loadLeafletCDN(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).L) {
      resolve();
      return;
    }
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (document.getElementById("leaflet-js")) {
      const poll = setInterval(() => {
        if ((window as any).L) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.id = "leaflet-js";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export function TrackingPage() {
  const { rideId } = useParams({ strict: false }) as { rideId: string };
  const { identity } = useInternetIdentity();
  const { data: myProfile } = useMyProfile();
  const rideIdBigInt = rideId ? BigInt(rideId) : undefined;
  const { data: ride } = useRideDetail(rideIdBigInt);

  const isDriver =
    myProfile && ride && myProfile.id.toString() === ride.driverId?.toString();

  // Driver state
  const [isSharing, setIsSharing] = useState(false);
  const [shareMinutes, setShareMinutes] = useState(0);
  const watchIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Passenger state
  const [driverLocation, setDriverLocation] = useState<LocationData | null>(
    null,
  );
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const locationKey = `rydr_location_${rideId}`;

  // Update share minutes counter
  useEffect(() => {
    if (!isSharing) return;
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setShareMinutes(
          Math.floor((Date.now() - startTimeRef.current) / 60000),
        );
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isSharing]);

  // Passenger: poll for driver location
  useEffect(() => {
    if (isDriver) return;
    const poll = () => {
      const raw = localStorage.getItem(locationKey);
      if (raw) {
        try {
          setDriverLocation(JSON.parse(raw));
        } catch {
          /* noop */
        }
      }
    };
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [isDriver, locationKey]);

  // Passenger: get own location for ETA
  useEffect(() => {
    if (isDriver) return;
    navigator.geolocation?.getCurrentPosition(
      (pos) =>
        setMyLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {
        /* noop */
      },
    );
  }, [isDriver]);

  // Passenger: initialize Leaflet map from CDN
  useEffect(() => {
    if (isDriver || !mapRef.current) return;
    let cancelled = false;
    loadLeafletCDN().then(() => {
      if (cancelled || !mapRef.current || leafletMapRef.current) return;
      const L = (window as any).L;
      if (!L) return;
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "\u00a9 OpenStreetMap contributors",
      }).addTo(map);
      leafletMapRef.current = map;
    });
    return () => {
      cancelled = true;
    };
  }, [isDriver]);

  // Passenger: update marker when driver location changes
  useEffect(() => {
    if (isDriver || !driverLocation || !leafletMapRef.current) return;
    const L = (window as any).L;
    if (!L) return;
    const map = leafletMapRef.current;
    const latlng: [number, number] = [driverLocation.lat, driverLocation.lng];
    if (markerRef.current) {
      markerRef.current.setLatLng(latlng);
    } else {
      markerRef.current = L.marker(latlng).addTo(map).bindPopup("Driver");
    }
    map.setView(latlng, 13);
  }, [isDriver, driverLocation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation?.clearWatch(watchIdRef.current);
      }
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const startSharing = () => {
    if (!navigator.geolocation) return;
    startTimeRef.current = Date.now();
    setIsSharing(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const data: LocationData = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: Date.now(),
        };
        localStorage.setItem(locationKey, JSON.stringify(data));
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
  };

  const stopSharing = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation?.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsSharing(false);
    startTimeRef.current = null;
  };

  const eta =
    !isDriver && driverLocation && myLocation
      ? (() => {
          const dist = haversine(
            driverLocation.lat,
            driverLocation.lng,
            myLocation.lat,
            myLocation.lng,
          );
          const minutes = Math.round((dist / 40) * 60);
          return minutes < 1
            ? "Less than 1 min"
            : `${minutes} min${minutes !== 1 ? "s" : ""}`;
        })()
      : null;

  const isLoggedIn = !!identity;

  return (
    <main
      className="container py-6 max-w-2xl px-4 sm:px-6"
      data-ocid="tracking.page"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Live Ride Tracking</h1>
        {ride && (
          <p className="text-muted-foreground text-sm">
            {ride.origin} &rarr; {ride.destination} &middot;{" "}
            {ride.departureTime}
          </p>
        )}
      </div>

      {!isLoggedIn ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Please sign in to track this ride.
            </p>
          </CardContent>
        </Card>
      ) : isDriver ? (
        <Card data-ocid="tracking.driver_panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Share Your Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSharing ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Start sharing your location so passengers can track the ride.
                </p>
                <Button
                  onClick={startSharing}
                  className="gap-2 w-full sm:w-auto"
                  data-ocid="tracking.start_sharing_button"
                >
                  <Radio className="h-4 w-4" />
                  Start Sharing Location
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Sharing Location
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Location shared{" "}
                  {shareMinutes === 0
                    ? "just now"
                    : `${shareMinutes} minute${shareMinutes !== 1 ? "s" : ""} ago`}
                </p>
                <Button
                  onClick={stopSharing}
                  variant="destructive"
                  className="gap-2 w-full sm:w-auto"
                  data-ocid="tracking.stop_sharing_button"
                >
                  <StopCircle className="h-4 w-4" />
                  Stop Sharing
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4" data-ocid="tracking.passenger_panel">
          <Card>
            <CardContent className="py-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div>
                {driverLocation ? (
                  <>
                    <p className="font-medium text-sm">Driver is on the way</p>
                    {eta && (
                      <p className="text-sm text-muted-foreground">
                        Estimated time: {eta}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(driverLocation.timestamp).toLocaleTimeString()}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Waiting for driver to share location...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              {!driverLocation && (
                <div className="flex items-center justify-center h-64 bg-muted text-muted-foreground text-sm">
                  Map will show here once driver shares location
                </div>
              )}
              <div
                ref={mapRef}
                className="w-full h-64 sm:h-80"
                style={{ display: driverLocation ? "block" : "none" }}
                data-ocid="tracking.canvas_target"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
