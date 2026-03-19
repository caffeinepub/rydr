import { u as useGoogleAuth, a as useMyPostedRides, b as useMyBookings, c as useBookingRequestsForDriver, d as useCompleteRide, e as useApproveBooking, f as useRejectBooking, g as useRateDriver, r as reactExports, j as jsxRuntimeExports, L as LayoutDashboard, B as Button, h as LoaderCircle, i as LogIn, m as motion, k as Link, C as CirclePlus, l as Badge, n as Car, M as MapPin, o as Clock, A as AdBanner, D as Dialog, p as DialogContent, q as DialogHeader, s as DialogTitle, t as DialogDescription, I as InteractiveStarRating, v as DialogFooter, S as Skeleton, w as ue, x as Star, y as cn } from "./index-BnF20Gme.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BiydiSTP.js";
import { i as isBookingPending, a as isRideActive, b as isRideCompleted, g as getRideStatusLabel, c as isBookingConfirmed, d as getBookingStatusLabel } from "./index-DkmPAu21.js";
import { C as CircleCheckBig } from "./circle-check-big-C7C4d1Zy.js";
import { C as CircleX } from "./circle-x-DO27bPzh.js";
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3 mb-6", children: [
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
