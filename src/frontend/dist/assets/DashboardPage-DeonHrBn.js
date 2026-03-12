import { r as reactExports, u as useDirection, a as useControllableState, j as jsxRuntimeExports, c as createContextScope, b as useId, P as Primitive, d as createRovingFocusGroupScope, R as Root, I as Item, e as composeEventHandlers, f as Presence, g as cn, h as useGoogleAuth, i as useMyPostedRides, k as useMyBookings, l as useBookingRequestsForDriver, m as useCompleteRide, n as useApproveBooking, o as useRejectBooking, p as useRateDriver, L as LayoutDashboard, B as Button, q as LoaderCircle, s as LogIn, t as motion, v as Link, C as CirclePlus, w as Badge, x as Car, M as MapPin, y as Clock, A as AdBanner, D as Dialog, z as DialogContent, E as DialogHeader, F as DialogTitle, G as DialogDescription, H as InteractiveStarRating, J as DialogFooter, S as Skeleton, K as ue, N as Star } from "./index-Df8kOu0f.js";
import { i as isBookingPending, a as isRideActive, b as isRideCompleted, g as getRideStatusLabel, c as isBookingConfirmed, d as getBookingStatusLabel } from "./index-DkmPAu21.js";
import { C as CircleCheckBig } from "./circle-check-big-BoyzoUPu.js";
import { C as CircleX } from "./circle-x-dTtbP8Xr.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function DashboardPage() {
  const { identity, login, isLoggingIn } = useGoogleAuth();
  const { data: myRides, isLoading: ridesLoading } = useMyPostedRides();
  const { data: myBookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: bookingRequests, isLoading: requestsLoading } = useBookingRequestsForDriver();
  const { mutateAsync: completeRide, isPending: isCompleting } = useCompleteRide();
  const { mutateAsync: approveBooking, isPending: isApproving } = useApproveBooking();
  const { mutateAsync: rejectBooking, isPending: isRejecting } = useRejectBooking();
  const { mutateAsync: rateDriver, isPending: isRating } = useRateDriver();
  const [ratingModal, setRatingModal] = reactExports.useState({
    open: false,
    bookingId: null
  });
  const [selectedRating, setSelectedRating] = reactExports.useState(5);
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-16 max-w-lg text-center px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-12 w-12 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black mb-2", children: "Sign in to view dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Track your rides, bookings, and requests." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: login,
          disabled: isLoggingIn,
          className: "gap-2",
          "data-ocid": "nav.login_button",
          children: [
            isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
            isLoggingIn ? "Connecting..." : "Sign In"
          ]
        }
      )
    ] });
  }
  const handleCompleteRide = async (rideId, _index) => {
    try {
      await completeRide(rideId);
      ue.success("Ride marked as completed!");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to complete ride");
    }
  };
  const handleApprove = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      ue.success("Booking approved!");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to approve booking");
    }
  };
  const handleReject = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      ue.success("Booking rejected.");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to reject booking");
    }
  };
  const openRatingModal = (bookingId) => {
    setRatingModal({ open: true, bookingId });
    setSelectedRating(5);
  };
  const handleSubmitRating = async () => {
    if (!ratingModal.bookingId) return;
    try {
      await rateDriver({
        bookingId: ratingModal.bookingId,
        rating: BigInt(selectedRating)
      });
      ue.success("Thanks for your rating!");
      setRatingModal({ open: false, bookingId: null });
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to submit rating");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-8 max-w-4xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black", children: "Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your rides and bookings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gap-2", "data-ocid": "nav.post_ride_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/post-ride", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
              "Post Ride"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "my-rides", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full md:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "my-rides",
                  "data-ocid": "dashboard.my_rides_tab",
                  className: "flex-1 md:flex-none",
                  children: [
                    "My Rides",
                    myRides && myRides.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: myRides.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "my-bookings",
                  "data-ocid": "dashboard.my_bookings_tab",
                  className: "flex-1 md:flex-none",
                  children: [
                    "My Bookings",
                    myBookings && myBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: myBookings.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "requests",
                  "data-ocid": "dashboard.requests_tab",
                  className: "flex-1 md:flex-none",
                  children: [
                    "Requests",
                    bookingRequests && bookingRequests.filter((b) => isBookingPending(b.status)).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 text-xs", children: bookingRequests.filter((b) => isBookingPending(b.status)).length })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my-rides", children: ridesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3",
                "data-ocid": "dashboard.rides_loading_state",
                children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RideRowSkeleton, {}, i))
              }
            ) : !myRides || myRides.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-10 w-10 opacity-30" }),
                title: "No rides posted yet",
                desc: "Post your first ride to start sharing travel costs.",
                action: { label: "Post a Ride", href: "/post-ride" },
                dataOcid: "dashboard.rides_empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: myRides.map((ride, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RideRow,
              {
                ride,
                index: i + 1,
                onComplete: handleCompleteRide,
                isCompleting
              },
              ride.id.toString()
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my-bookings", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3",
                "data-ocid": "dashboard.bookings_loading_state",
                children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RideRowSkeleton, {}, i))
              }
            ) : !myBookings || myBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 opacity-30" }),
                title: "No bookings yet",
                desc: "Search for rides and book your first trip.",
                action: { label: "Find a Ride", href: "/" },
                dataOcid: "dashboard.bookings_empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: myBookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingRow,
              {
                booking,
                index: i + 1,
                onRate: () => openRatingModal(booking.id)
              },
              booking.id.toString()
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requests", children: requestsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3",
                "data-ocid": "dashboard.requests_loading_state",
                children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RideRowSkeleton, {}, i))
              }
            ) : !bookingRequests || bookingRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 opacity-30" }),
                title: "No booking requests",
                desc: "When riders request your rides, they'll appear here.",
                dataOcid: "dashboard.requests_empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bookingRequests.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RequestRow,
              {
                booking,
                index: i + 1,
                onApprove: handleApprove,
                onReject: handleReject,
                isApproving,
                isRejecting
              },
              booking.id.toString()
            )) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { placement: "passenger-dashboard", size: "rectangle" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: ratingModal.open,
        onOpenChange: (o) => setRatingModal((prev) => ({ ...prev, open: o })),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "dashboard.rate_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-black", children: "Rate your driver" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "How was your trip? Your feedback helps the community." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InteractiveStarRating,
            {
              value: selectedRating,
              onChange: setSelectedRating
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setRatingModal({ open: false, bookingId: null }),
                "data-ocid": "dashboard.rate_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleSubmitRating,
                disabled: isRating,
                "data-ocid": "dashboard.rate_confirm_button",
                children: [
                  isRating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                  "Submit Rating"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function RideRow({
  ride,
  index,
  onComplete,
  isCompleting
}) {
  const isActive = isRideActive(ride.status);
  const isCompleted = isRideCompleted(ride.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4",
      "data-ocid": `dashboard.ride_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium truncate", children: [
              ride.origin,
              " → ",
              ride.destination
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                label: getRideStatusLabel(ride.status),
                variant: isActive ? "active" : isCompleted ? "completed" : "cancelled"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            ride.date,
            " · ",
            ride.departureTime,
            " · ",
            Number(ride.seatsAvailable),
            "/",
            Number(ride.totalSeats),
            " seats · ₹",
            Number(ride.pricePerSeat),
            "/seat"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/ride/$rideId", params: { rideId: ride.id.toString() }, children: "View" }) }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "secondary",
              onClick: () => onComplete(ride.id, index),
              disabled: isCompleting,
              "data-ocid": `dashboard.complete_ride_button.${index}`,
              children: [
                isCompleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Complete"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function BookingRow({
  booking,
  index,
  onRate
}) {
  const isConfirmed = isBookingConfirmed(booking.status);
  const hasRated = booking.ratingGiven.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4",
      "data-ocid": `dashboard.booking_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              "Ride #",
              booking.rideId.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                label: getBookingStatusLabel(booking.status),
                variant: isBookingConfirmed(booking.status) ? "active" : isBookingPending(booking.status) ? "pending" : "cancelled"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Booked · ID #",
            booking.id.toString()
          ] })
        ] }),
        isConfirmed && !hasRated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: onRate,
            className: "gap-1.5 shrink-0",
            "data-ocid": `dashboard.rate_button.${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
              "Rate Driver"
            ]
          }
        ),
        hasRated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }),
          "Rated ",
          Number(booking.ratingGiven[0]),
          "/5"
        ] })
      ]
    }
  );
}
function RequestRow({
  booking,
  index,
  onApprove,
  onReject,
  isApproving,
  isRejecting
}) {
  const isPending = isBookingPending(booking.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4",
      "data-ocid": `dashboard.request_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              "Booking Request #",
              booking.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                label: getBookingStatusLabel(booking.status),
                variant: isBookingConfirmed(booking.status) ? "active" : isPending ? "pending" : "cancelled"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "For ride #",
            booking.rideId.toString()
          ] })
        ] }),
        isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => onApprove(booking.id),
              disabled: isApproving || isRejecting,
              className: "gap-1.5",
              "data-ocid": `dashboard.approve_button.${index}`,
              children: [
                isApproving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                "Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "destructive",
              onClick: () => onReject(booking.id),
              disabled: isApproving || isRejecting,
              className: "gap-1.5",
              "data-ocid": `dashboard.reject_button.${index}`,
              children: [
                isRejecting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                "Reject"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EmptyState({
  icon,
  title,
  desc,
  action,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "text-center py-16 text-muted-foreground",
      "data-ocid": dataOcid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-center", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground mb-1", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: desc }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: action.href, children: action.label }) })
      ]
    }
  );
}
function RideRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" })
  ] });
}
function StatusBadge({
  label,
  variant
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn(
        "text-xs shrink-0",
        variant === "active" && "border-primary/40 text-primary bg-primary/10",
        variant === "completed" && "border-muted text-muted-foreground",
        variant === "cancelled" && "border-destructive/40 text-destructive bg-destructive/10",
        variant === "pending" && "border-yellow-500/40 text-yellow-500 bg-yellow-500/10"
      ),
      children: label
    }
  );
}
export {
  DashboardPage
};
