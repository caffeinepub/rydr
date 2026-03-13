import { ar as useParams, at as useGetUserProfile, j as jsxRuntimeExports, S as Skeleton, v as Link, a8 as User, t as motion, aa as Avatar, ab as AvatarImage, ac as AvatarFallback, ae as ShieldCheck, M as MapPin, ad as StarRating, N as Star, av as MessageCircle, a2 as PawPrint, a3 as Cigarette, a4 as Briefcase, x as Car } from "./index-CbaSuiNq.js";
import { A as ArrowLeft } from "./arrow-left-BsB_naz0.js";
import { T as TriangleAlert } from "./triangle-alert-BB4FFqxB.js";
import { E as ExternalLink, L as Linkedin } from "./linkedin-CrVLqccV.js";
function UserProfileViewPage() {
  var _a, _b;
  const { userId } = useParams({ strict: false });
  const { data: user, isLoading } = useGetUserProfile(userId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: "container py-8 max-w-2xl px-4 sm:px-6",
        "data-ocid": "user_profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full mb-4" })
        ]
      }
    );
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: "container py-8 max-w-2xl px-4 sm:px-6",
        "data-ocid": "user_profile.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "User not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This profile doesn't exist or has been removed." })
          ] })
        ]
      }
    );
  }
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const hasDriverInfo = !!(user.carBrand || user.vehicleType);
  const hasFacebook = !!((_a = user.facebookUrl) == null ? void 0 : _a.trim());
  const hasLinkedin = !!((_b = user.linkedinUrl) == null ? void 0 : _b.trim());
  const hasSocial = hasFacebook || hasLinkedin;
  const vehicleLabel = [
    user.carBrand,
    user.carColor,
    user.vehicleType ? user.vehicleType.charAt(0).toUpperCase() + user.vehicleType.slice(1) : ""
  ].filter(Boolean).join(" · ");
  const chatLabel = user.chatPref === "chatty" ? "Chatty during ride" : user.chatPref === "quiet" ? "Quiet ride preferred" : null;
  const petsLabel = user.petsPreference === "allowed" ? "Pets allowed" : user.petsPreference === "not_allowed" ? "Pets not allowed" : null;
  const smokingLabel = user.smokingPreference === "allowed" ? "Smoking allowed" : user.smokingPreference === "not_allowed" ? "No smoking in car" : null;
  const luggageLabel = user.luggagePreference === "allowed" ? "Luggage allowed" : user.luggagePreference === "limited" ? "Limited luggage" : user.luggagePreference === "none" ? "No luggage" : null;
  const hasPreferences = chatLabel || petsLabel || smokingLabel || luggageLabel;
  const reliabilityScore = user.reliabilityScore ?? 0;
  const completedRidesCount = user.completedRidesCount ?? 0;
  const driverCancellations = user.driverCancellationCount ?? 0;
  const passengerCancellations = user.passengerCancellationCount ?? 0;
  const isDriver = hasDriverInfo || reliabilityScore > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container py-8 max-w-2xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 sm:p-6 mb-4",
            "data-ocid": "user_profile.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 text-xl shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user.avatarUrl }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground font-display font-black text-2xl", children: initials })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black break-words", children: user.name }),
                  hasSocial && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
                    "Social verified"
                  ] })
                ] }),
                user.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-sm text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  user.city
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: user.averageRating, size: "md" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: user.averageRating.toFixed(1) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "(",
                    Number(user.ratingCount),
                    " ratings)"
                  ] })
                ] }),
                isDriver && reliabilityScore > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "h-3.5 w-3.5",
                      fill: s <= Math.round(reliabilityScore) ? "#f59e0b" : "none",
                      stroke: s <= Math.round(reliabilityScore) ? "#f59e0b" : "currentColor",
                      strokeWidth: 1.5
                    },
                    s
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Driver Reliability Score: ",
                    reliabilityScore.toFixed(1),
                    "/5"
                  ] })
                ] }),
                isDriver && completedRidesCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "🚗 ",
                  completedRidesCount,
                  " completed rides"
                ] }),
                !isDriver && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Trust Score: ",
                  (user.averageRating || 0).toFixed(1),
                  "/5"
                ] }),
                (driverCancellations > 1 || passengerCancellations > 1) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-xs text-yellow-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
                  driverCancellations > 1 ? `⚠ ${driverCancellations} driver cancellations` : `⚠ ${passengerCancellations} passenger cancellations`
                ] })
              ] })
            ] })
          }
        ),
        user.about && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: user.about })
        ] }),
        hasPreferences && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4",
            "data-ocid": "user_profile.preferences.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3", children: "Ride Preferences" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                chatLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: chatLabel })
                ] }),
                petsLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PawPrint, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: petsLabel })
                ] }),
                smokingLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cigarette, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: smokingLabel })
                ] }),
                luggageLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: luggageLabel })
                ] })
              ] })
            ]
          }
        ),
        hasDriverInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4",
            "data-ocid": "user_profile.vehicle.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3", children: "Vehicle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  vehicleLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: vehicleLabel }),
                  user.licensePlate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "License: ",
                    user.licensePlate
                  ] })
                ] })
              ] })
            ]
          }
        ),
        (hasFacebook || hasLinkedin) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4",
            "data-ocid": "user_profile.social.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3", children: "Social Profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                hasFacebook && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: user.facebookUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors group",
                    "data-ocid": "user_profile.facebook_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0 font-bold text-white text-sm", children: "f" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Verified via Facebook" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: user.facebookUrl })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" })
                    ]
                  }
                ),
                hasLinkedin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: user.linkedinUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors group",
                    "data-ocid": "user_profile.linkedin_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4 text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Verified via LinkedIn" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: user.linkedinUrl })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
export {
  UserProfileViewPage
};
