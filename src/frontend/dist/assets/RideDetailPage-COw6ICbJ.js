import { O as createLucideIcon, r as reactExports, af as createDialogScope, j as jsxRuntimeExports, ag as Root, Q as useComposedRefs, ah as WarningProvider, c as createContextScope, ai as Content, e as composeEventHandlers, aj as createSlottable, ak as Title, al as Description, am as Close, an as Portal, ao as Overlay, ap as Trigger, g as cn, aq as buttonVariants, q as LoaderCircle, M as MapPin, ar as useParams, W as useNavigate, h as useGoogleAuth, as as useRideDetail, k as useMyBookings, at as useGetUserProfile, au as useBookRide, S as Skeleton, B as Button, t as motion, y as Clock, a1 as Users, av as MessageCircle, a2 as PawPrint, a3 as Cigarette, a4 as Briefcase, a5 as Zap, a6 as ClipboardCheck, v as Link, aa as Avatar, ab as AvatarImage, ac as AvatarFallback, ad as StarRating, K as ue } from "./index-C15lWbsc.js";
import { a as isRideActive, c as isBookingConfirmed, i as isBookingPending, d as getBookingStatusLabel } from "./index-DkmPAu21.js";
import { A as ArrowLeft } from "./arrow-left-BZKMZpdq.js";
import { B as Banknote } from "./banknote-ClA61Zv7.js";
import { C as CircleCheckBig } from "./circle-check-big-6UVifAdc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
async function geocode(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "en" }
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lon: Number.parseFloat(data[0].lon)
      };
    }
  } catch {
  }
  return null;
}
function RideMap({ origin, destination }) {
  const mapRef = reactExports.useRef(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const leafletMapRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    const initMap = async () => {
      if (!mapRef.current) return;
      setLoading(true);
      setError(null);
      try {
        const L = await new Promise((resolve, reject) => {
          if (window.L) {
            resolve(window.L);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = () => resolve(window.L);
          script.onerror = reject;
          document.head.appendChild(script);
        });
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        });
        if (cancelled) return;
        const [originCoords, destCoords] = await Promise.all([
          geocode(origin),
          geocode(destination)
        ]);
        if (cancelled) return;
        if (!originCoords || !destCoords) {
          setError("Could not geocode one or both locations.");
          setLoading(false);
          return;
        }
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }
        const midLat = (originCoords.lat + destCoords.lat) / 2;
        const midLon = (originCoords.lon + destCoords.lon) / 2;
        const map = L.map(mapRef.current, { zoomControl: true });
        leafletMapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18
        }).addTo(map);
        const originIcon = L.divIcon({
          html: `<div style="width:12px;height:12px;background:#FACC15;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(250,204,21,0.6)"></div>`,
          className: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        const destIcon = L.divIcon({
          html: `<div style="width:12px;height:12px;background:#F59E0B;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(245,158,11,0.6)"></div>`,
          className: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        L.marker([originCoords.lat, originCoords.lon], { icon: originIcon }).addTo(map).bindPopup(`<b>From:</b> ${origin}`);
        L.marker([destCoords.lat, destCoords.lon], { icon: destIcon }).addTo(map).bindPopup(`<b>To:</b> ${destination}`);
        const line = L.polyline(
          [
            [originCoords.lat, originCoords.lon],
            [destCoords.lat, destCoords.lon]
          ],
          {
            color: "#FACC15",
            weight: 3,
            opacity: 0.85,
            dashArray: "8, 6"
          }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-lg overflow-hidden border border-border bg-card",
      style: { height: "300px" },
      children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center bg-card z-10",
            "data-ocid": "ride.map_loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading map..." })
            ] })
          }
        ),
        error && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center bg-card z-10",
            "data-ocid": "ride.map_error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground text-sm text-center px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: error }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
                origin,
                " → ",
                destination
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: mapRef,
            className: "w-full h-full",
            "data-ocid": "ride.map_marker",
            style: { minHeight: "300px" }
          }
        )
      ]
    }
  );
}
function RideDetailPage() {
  var _a;
  const { rideId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { identity } = useGoogleAuth();
  const isLoggedIn = !!identity;
  const rideIdBigInt = rideId ? BigInt(rideId) : void 0;
  const { data: ride, isLoading: rideLoading } = useRideDetail(rideIdBigInt);
  const { data: myBookings } = useMyBookings();
  const { data: driver } = useGetUserProfile((_a = ride == null ? void 0 : ride.driverId) == null ? void 0 : _a.toString());
  const { mutateAsync: bookRide, isPending: isBooking } = useBookRide();
  const myBookingForRide = myBookings == null ? void 0 : myBookings.find((b) => b.rideId === rideIdBigInt);
  const [showDuplicateDialog, setShowDuplicateDialog] = reactExports.useState(false);
  const [extraSeats, setExtraSeats] = reactExports.useState(1);
  const handleBook = async () => {
    if (myBookingForRide) {
      setShowDuplicateDialog(true);
      return;
    }
    if (!rideIdBigInt) return;
    try {
      await bookRide(rideIdBigInt);
      ue.success("Ride booked successfully!");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to book ride");
    }
  };
  if (rideLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: "container py-8 max-w-3xl px-4 sm:px-6",
        "data-ocid": "ride.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" })
        ]
      }
    );
  }
  if (!ride) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "container py-8 max-w-3xl px-4 sm:px-6",
        "data-ocid": "ride.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold mb-2", children: "Ride not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              className: "mt-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
                "Back to Search"
              ]
            }
          )
        ] })
      }
    );
  }
  const isInstant = "instant" in ride.approvalMode;
  const isActive = isRideActive(ride.status);
  const seatsAvailable = Number(ride.seatsAvailable);
  const maxExtraSeats = Math.min(4, seatsAvailable);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-8 max-w-3xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => navigate({ to: "/" }),
              className: "mb-6 gap-2 text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back to Search"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full border-2 border-primary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-0.5", children: "From" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold", children: ride.origin })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-0.5", children: "To" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold", children: ride.destination })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-display font-black text-primary", children: [
                  "₹",
                  Number(ride.pricePerSeat)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "per seat" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: ride.date })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: ride.departureTime })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Seats Left" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                    seatsAvailable,
                    " / ",
                    Number(ride.totalSeats)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approval" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: isInstant ? "Instant" : "Manual" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground", children: "Ride Preferences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border bg-secondary border-border text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                ride.chatPreference === "quiet" ? "Quiet ride 🤫" : "Chatty ride 🗣️"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PreferenceItem,
                {
                  allowed: ride.petsAllowed,
                  label: "Pets Allowed",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PawPrint, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PreferenceItem,
                {
                  allowed: ride.smokingAllowed,
                  label: "Smoking Allowed",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cigarette, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PreferenceItem,
                {
                  allowed: ride.luggageAllowed,
                  label: "Luggage Allowed",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border",
                    isInstant ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary border-border text-foreground"
                  ),
                  children: [
                    isInstant ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-4 w-4" }),
                    isInstant ? "Instant Booking" : "Needs Approval"
                  ]
                }
              )
            ] })
          ] }),
          driver && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground", children: "Driver" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/profile/$userId",
                params: { userId: ride.driverId.toString() },
                className: "flex items-center gap-4 group",
                "data-ocid": "ride.driver_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-14 w-14", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: driver.avatarUrl }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground font-bold text-lg", children: driver.name.slice(0, 2).toUpperCase() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-lg group-hover:text-primary transition-colors", children: driver.name }),
                    driver.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                      driver.city
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: driver.averageRating, size: "md" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: driver.averageRating.toFixed(1) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                        "(",
                        Number(driver.ratingCount),
                        " ratings)"
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground", children: "Route" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RideMap, { origin: ride.origin, destination: ride.destination })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Sign in to book this ride" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), variant: "outline", children: "Sign In to Book" })
          ] }) : myBookingForRide ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "ride.booking_status", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "You have already booked this ride." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs shrink-0 border-primary/40 text-primary hover:bg-primary/10",
                  onClick: () => setShowDuplicateDialog(true),
                  "data-ocid": "ride.modify_booking.button",
                  children: "Modify Booking"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              isBookingConfirmed(myBookingForRide.status) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-primary shrink-0" }) : isBookingPending(myBookingForRide.status) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-destructive shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                  "Booking ",
                  getBookingStatusLabel(myBookingForRide.status)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isBookingConfirmed(myBookingForRide.status) ? "Your seat is confirmed. Have a great trip!" : isBookingPending(myBookingForRide.status) ? "Waiting for driver approval." : "Your booking was rejected." })
              ] })
            ] })
          ] }) : isActive && seatsAvailable > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Ready to book?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                seatsAvailable,
                " seat",
                seatsAvailable !== 1 ? "s" : "",
                " ",
                "available · ₹",
                Number(ride.pricePerSeat),
                " per seat"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleBook,
                disabled: isBooking,
                className: "gap-2 shrink-0",
                "data-ocid": "ride.book_button",
                children: [
                  isBooking ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
                  isBooking ? "Booking..." : "Book Seat"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: !isActive ? "This ride is no longer active." : "No seats available." }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: showDuplicateDialog,
        onOpenChange: setShowDuplicateDialog,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "ride.duplicate.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Already Booked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "You already have a seat booked for this ride. Would you like to book additional seats for family or friends?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
              "Additional seats (max ",
              maxExtraSeats,
              "):"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => setExtraSeats((s) => Math.max(1, s - 1)),
                  disabled: extraSeats <= 1,
                  "data-ocid": "ride.extra_seats.decrease.button",
                  children: "-"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold w-8 text-center", children: extraSeats }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => setExtraSeats((s) => Math.min(maxExtraSeats, s + 1)),
                  disabled: extraSeats >= maxExtraSeats,
                  "data-ocid": "ride.extra_seats.increase.button",
                  children: "+"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "ride.duplicate.cancel.button", children: "Keep Current Booking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "ride.duplicate.confirm.button",
                onClick: () => {
                  ue.success(
                    `Additional seats request submitted — up to ${extraSeats} seat${extraSeats !== 1 ? "s" : ""}.`
                  );
                  setShowDuplicateDialog(false);
                },
                children: "Add Seats"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function PreferenceItem({
  allowed,
  label,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border",
        allowed ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary border-border text-muted-foreground line-through opacity-60"
      ),
      children: [
        icon,
        label
      ]
    }
  );
}
export {
  RideDetailPage
};
