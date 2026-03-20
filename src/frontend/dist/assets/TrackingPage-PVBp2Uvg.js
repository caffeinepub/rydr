import { z as createLucideIcon, ai as useParams, u as useGoogleAuth, U as useMyProfile, aj as useRideDetail, r as reactExports, j as jsxRuntimeExports, aV as Navigation, B as Button, l as Badge, M as MapPin } from "./index-7bcVhUG_.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DsA6KQRf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
];
const CircleStop = createLucideIcon("circle-stop", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
];
const Radio = createLucideIcon("radio", __iconNode);
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function loadLeafletCDN() {
  return new Promise((resolve) => {
    if (window.L) {
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
        if (window.L) {
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
function TrackingPage() {
  var _a;
  const { rideId } = useParams({ strict: false });
  const { identity } = useGoogleAuth();
  const { data: myProfile } = useMyProfile();
  const rideIdBigInt = rideId ? BigInt(rideId) : void 0;
  const { data: ride } = useRideDetail(rideIdBigInt);
  const isDriver = myProfile && ride && myProfile.id.toString() === ((_a = ride.driverId) == null ? void 0 : _a.toString());
  const [isSharing, setIsSharing] = reactExports.useState(false);
  const [shareMinutes, setShareMinutes] = reactExports.useState(0);
  const watchIdRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(null);
  const [driverLocation, setDriverLocation] = reactExports.useState(
    null
  );
  const [myLocation, setMyLocation] = reactExports.useState(null);
  const mapRef = reactExports.useRef(null);
  const leafletMapRef = reactExports.useRef(null);
  const markerRef = reactExports.useRef(null);
  const locationKey = `rydr_location_${rideId}`;
  reactExports.useEffect(() => {
    if (!isSharing) return;
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setShareMinutes(
          Math.floor((Date.now() - startTimeRef.current) / 6e4)
        );
      }
    }, 1e4);
    return () => clearInterval(interval);
  }, [isSharing]);
  reactExports.useEffect(() => {
    if (isDriver) return;
    const poll = () => {
      const raw = localStorage.getItem(locationKey);
      if (raw) {
        try {
          setDriverLocation(JSON.parse(raw));
        } catch {
        }
      }
    };
    poll();
    const interval = setInterval(poll, 5e3);
    return () => clearInterval(interval);
  }, [isDriver, locationKey]);
  reactExports.useEffect(() => {
    var _a2;
    if (isDriver) return;
    (_a2 = navigator.geolocation) == null ? void 0 : _a2.getCurrentPosition(
      (pos) => setMyLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {
      }
    );
  }, [isDriver]);
  reactExports.useEffect(() => {
    if (isDriver || !mapRef.current) return;
    let cancelled = false;
    loadLeafletCDN().then(() => {
      if (cancelled || !mapRef.current || leafletMapRef.current) return;
      const L = window.L;
      if (!L) return;
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
      }).addTo(map);
      leafletMapRef.current = map;
    });
    return () => {
      cancelled = true;
    };
  }, [isDriver]);
  reactExports.useEffect(() => {
    if (isDriver || !driverLocation || !leafletMapRef.current) return;
    const L = window.L;
    if (!L) return;
    const map = leafletMapRef.current;
    const latlng = [driverLocation.lat, driverLocation.lng];
    if (markerRef.current) {
      markerRef.current.setLatLng(latlng);
    } else {
      markerRef.current = L.marker(latlng).addTo(map).bindPopup("Driver");
    }
    map.setView(latlng, 13);
  }, [isDriver, driverLocation]);
  reactExports.useEffect(() => {
    return () => {
      var _a2;
      if (watchIdRef.current !== null) {
        (_a2 = navigator.geolocation) == null ? void 0 : _a2.clearWatch(watchIdRef.current);
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
        const data = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: Date.now()
        };
        localStorage.setItem(locationKey, JSON.stringify(data));
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 5e3 }
    );
  };
  const stopSharing = () => {
    var _a2;
    if (watchIdRef.current !== null) {
      (_a2 = navigator.geolocation) == null ? void 0 : _a2.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsSharing(false);
    startTimeRef.current = null;
  };
  const eta = !isDriver && driverLocation && myLocation ? (() => {
    const dist = haversine(
      driverLocation.lat,
      driverLocation.lng,
      myLocation.lat,
      myLocation.lng
    );
    const minutes = Math.round(dist / 40 * 60);
    return minutes < 1 ? "Less than 1 min" : `${minutes} min${minutes !== 1 ? "s" : ""}`;
  })() : null;
  const isLoggedIn = !!identity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      className: "container py-6 max-w-2xl px-4 sm:px-6",
      "data-ocid": "tracking.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-1", children: "Live Ride Tracking" }),
          ride && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            ride.origin,
            " → ",
            ride.destination,
            " ·",
            " ",
            ride.departureTime
          ] })
        ] }),
        !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please sign in to track this ride." }) }) }) : isDriver ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "tracking.driver_panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-5 w-5 text-primary" }),
            "Share Your Location"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: !isSharing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start sharing your location so passengers can track the ride." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: startSharing,
                className: "gap-2 w-full sm:w-auto",
                "data-ocid": "tracking.start_sharing_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4" }),
                  "Start Sharing Location"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-3 w-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-green-500" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: "Sharing Location" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Location shared",
              " ",
              shareMinutes === 0 ? "just now" : `${shareMinutes} minute${shareMinutes !== 1 ? "s" : ""} ago`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: stopSharing,
                variant: "destructive",
                className: "gap-2 w-full sm:w-auto",
                "data-ocid": "tracking.stop_sharing_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleStop, { className: "h-4 w-4" }),
                  "Stop Sharing"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "tracking.passenger_panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: driverLocation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Driver is on the way" }),
              eta && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Estimated time: ",
                eta
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Last updated:",
                " ",
                new Date(driverLocation.timestamp).toLocaleTimeString()
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Waiting for driver to share location..." }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0 overflow-hidden rounded-lg", children: [
            !driverLocation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64 bg-muted text-muted-foreground text-sm", children: "Map will show here once driver shares location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: mapRef,
                className: "w-full h-64 sm:h-80",
                style: { display: driverLocation ? "block" : "none" },
                "data-ocid": "tracking.canvas_target"
              }
            )
          ] }) })
        ] })
      ]
    }
  );
}
export {
  TrackingPage
};
