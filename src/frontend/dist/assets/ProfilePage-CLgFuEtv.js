import { O as createLucideIcon, h as useGoogleAuth, W as useNavigate, V as useMyProfile, i as useMyPostedRides, k as useMyBookings, a7 as useUpdateUserProfile, r as reactExports, j as jsxRuntimeExports, a8 as User, B as Button, q as LoaderCircle, t as motion, a9 as LogOut, S as Skeleton, aa as Avatar, ab as AvatarImage, ac as AvatarFallback, M as MapPin, ad as StarRating, ae as ShieldCheck, _ as Label, a0 as Input, x as Car, K as ue } from "./index-C15lWbsc.js";
import { S as Switch } from "./switch-B1FmsJV3.js";
import { T as Textarea } from "./textarea-BDFPiBQF.js";
import { b as isRideCompleted, c as isBookingConfirmed } from "./index-DkmPAu21.js";
import { E as ExternalLink, L as Linkedin } from "./linkedin-Cj1PxcIp.js";
import { P as Phone } from "./phone-CtCUxORk.js";
import { C as CircleCheckBig } from "./circle-check-big-6UVifAdc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 200;
      let w = img.width;
      let h = img.height;
      if (w > h) {
        if (w > MAX) {
          h = Math.round(h * MAX / w);
          w = MAX;
        }
      } else {
        if (h > MAX) {
          w = Math.round(w * MAX / h);
          h = MAX;
        }
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}
function ProfilePage() {
  const { identity, login, isLoggingIn, clear, googleUser } = useGoogleAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myRides } = useMyPostedRides();
  const { data: myBookings } = useMyBookings();
  const { mutateAsync: updateUserProfile, isPending: isSaving } = useUpdateUserProfile();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [about, setAbout] = reactExports.useState("");
  const [userRole, setUserRole] = reactExports.useState("");
  const [phoneNumber, setPhoneNumber] = reactExports.useState("");
  const [gender, setGender] = reactExports.useState("");
  const [isPhoneHidden, setIsPhoneHidden] = reactExports.useState(false);
  const [carBrand, setCarBrand] = reactExports.useState("");
  const [carColor, setCarColor] = reactExports.useState("");
  const [vehicleType, setVehicleType] = reactExports.useState("");
  const [licensePlate, setLicensePlate] = reactExports.useState("");
  const [facebookUrl, setFacebookUrl] = reactExports.useState("");
  const [linkedinUrl, setLinkedinUrl] = reactExports.useState("");
  const [socialError, setSocialError] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const principalId = (identity == null ? void 0 : identity.getPrincipal().toString()) ?? "";
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name || (googleUser == null ? void 0 : googleUser.name) || "");
      setAvatarUrl(profile.avatarUrl || (googleUser == null ? void 0 : googleUser.picture) || "");
      setCity(profile.city || "");
      setAbout(profile.about || "");
      setCarBrand(profile.carBrand || "");
      setCarColor(profile.carColor || "");
      setVehicleType(profile.vehicleType || "");
      setLicensePlate(profile.licensePlate || "");
      setUserRole(profile.userRole || "");
      setPhoneNumber(profile.phoneNumber || "");
      setGender(profile.gender || "");
      setIsPhoneHidden(profile.isPhoneHidden || false);
      const fbFromBackend = profile.facebookUrl || "";
      const liFromBackend = profile.linkedinUrl || "";
      if (fbFromBackend || liFromBackend) {
        setFacebookUrl(fbFromBackend);
        setLinkedinUrl(liFromBackend);
      } else if (principalId) {
        try {
          const raw = localStorage.getItem(`rydr_social_${principalId}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            setFacebookUrl(parsed.facebookUrl || "");
            setLinkedinUrl(parsed.linkedinUrl || "");
          }
        } catch {
        }
      }
    }
  }, [profile, principalId]);
  const handlePhotoSelect = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setAvatarUrl(compressed);
    } catch {
      ue.error("Failed to process image. Please try another file.");
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setSocialError("");
    if (!name.trim()) {
      ue.error("Name is required.");
      return;
    }
    if (userRole === "driver" && !facebookUrl.trim() && !linkedinUrl.trim()) {
      setSocialError(
        "Drivers must add a LinkedIn or Facebook profile to build rider trust."
      );
      return;
    }
    try {
      await updateUserProfile({
        name: name.trim(),
        avatarUrl,
        city: city.trim(),
        about: about.trim(),
        chatPref: "",
        petsPreference: "",
        smokingPreference: "",
        luggagePreference: "",
        carBrand: userRole === "driver" ? carBrand.trim() : "",
        carColor: userRole === "driver" ? carColor.trim() : "",
        vehicleType: userRole === "driver" ? vehicleType : "",
        licensePlate: userRole === "driver" ? licensePlate.trim() : "",
        facebookUrl: facebookUrl.trim(),
        linkedinUrl: linkedinUrl.trim()
      });
      if (principalId) {
        try {
          const extra = { userRole, phoneNumber, gender, isPhoneHidden };
          localStorage.setItem(
            `rydr_profile_ext_${principalId}`,
            JSON.stringify(extra)
          );
        } catch {
        }
      }
      ue.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg && !msg.includes("not a function") && !msg.includes("actor")) {
        ue.error(msg);
      } else {
        ue.error("Unable to update profile. Please try again.");
      }
    }
  };
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-16 max-w-lg text-center px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-12 w-12 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black mb-2", children: "Sign in to view profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Your profile, ride history, and ratings in one place." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: login,
          disabled: isLoggingIn,
          className: "gap-1.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm",
          "data-ocid": "nav.login_button",
          children: [
            isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                  fill: "#4285F4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                  fill: "#34A853"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                  fill: "#FBBC05"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                  fill: "#EA4335"
                }
              )
            ] }),
            isLoggingIn ? "Signing in..." : "Sign in with Google"
          ]
        }
      )
    ] });
  }
  const initials = ((profile == null ? void 0 : profile.name) || "??").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const completedRides = (myRides == null ? void 0 : myRides.filter((r) => isRideCompleted(r.status)).length) ?? 0;
  const confirmedBookings = (myBookings == null ? void 0 : myBookings.filter((b) => isBookingConfirmed(b.status)).length) ?? 0;
  const hasFacebook = ((profile == null ? void 0 : profile.facebookUrl) || facebookUrl).trim().length > 0;
  const hasLinkedin = ((profile == null ? void 0 : profile.linkedinUrl) || linkedinUrl).trim().length > 0;
  const displayFacebook = (profile == null ? void 0 : profile.facebookUrl) || facebookUrl;
  const displayLinkedin = (profile == null ? void 0 : profile.linkedinUrl) || linkedinUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container py-8 max-w-2xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black mb-6", children: "My Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "md:hidden w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 mb-6",
            onClick: () => {
              clear();
              navigate({ to: "/welcome" });
            },
            "data-ocid": "profile.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              "Sign Out"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-6 mb-6", children: [
          profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
            ] })
          ] }) : profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-4 sm:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 text-xl shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatarUrl }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground font-display font-black text-2xl", children: initials })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black mb-1 break-words", children: profile.name }),
              profile.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-sm text-muted-foreground mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                profile.city
              ] }),
              userRole && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium mb-1 ${userRole === "driver" ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-border"}`,
                  children: userRole === "driver" ? "🚗 Driver" : "🧑‍💼 Rider"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: profile.averageRating, size: "md" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.averageRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  "(",
                  Number(profile.ratingCount),
                  " ratings)"
                ] })
              ] }),
              (hasFacebook || hasLinkedin) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-1", children: [
                hasFacebook && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: displayFacebook,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors",
                    "data-ocid": "profile.facebook_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[10px] bg-[#1877F2] text-white px-1 py-0.5 rounded", children: "f" }),
                      "Verified via Facebook",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-60" })
                    ]
                  }
                ),
                hasLinkedin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: displayLinkedin,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors",
                    "data-ocid": "profile.linkedin_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-3.5 w-3.5 text-[#0A66C2]" }),
                      "Verified via LinkedIn",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-60" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setIsEditing(!isEditing),
                className: "gap-2 shrink-0",
                "data-ocid": "profile.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }),
                  isEditing ? "Cancel" : "Edit"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "No profile set up yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setIsEditing(true),
                "data-ocid": "profile.setup_button",
                children: "Set Up Profile"
              }
            )
          ] }),
          isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              onSubmit: handleSave,
              className: "mt-4 pt-4 border-t border-border space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground", children: "How will you use RYDR?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setUserRole("driver"),
                        "data-ocid": "profile.role_driver.toggle",
                        className: `flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${userRole === "driver" ? "bg-[#00AEEF] text-white border-[#00AEEF] shadow-md" : "bg-background border-border text-foreground hover:border-[#00AEEF]/50"}`,
                        children: [
                          "🚗 Post Rides",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-normal mt-0.5 opacity-80", children: "Driver" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setUserRole("rider"),
                        "data-ocid": "profile.role_rider.toggle",
                        className: `flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${userRole === "rider" ? "bg-[#00AEEF] text-white border-[#00AEEF] shadow-md" : "bg-background border-border text-foreground hover:border-[#00AEEF]/50"}`,
                        children: [
                          "🧑‍💼 Book Rides",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-normal mt-0.5 opacity-80", children: "Rider" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground", children: "Basic Information" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Profile Photo" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 text-xl shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground font-black text-2xl", children: initials })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            ref: fileInputRef,
                            type: "file",
                            accept: "image/jpeg,image/png,image/webp",
                            className: "hidden",
                            onChange: handlePhotoSelect,
                            "data-ocid": "profile.upload_button"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            className: "gap-2",
                            onClick: () => {
                              var _a;
                              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                              "Upload Photo"
                            ]
                          }
                        ),
                        avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            type: "button",
                            variant: "ghost",
                            size: "sm",
                            className: "gap-2 text-destructive hover:text-destructive",
                            onClick: () => setAvatarUrl(""),
                            "data-ocid": "profile.delete_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                              "Delete Photo"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "JPG, PNG, WebP · auto-compressed" })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Full Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-name",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "Your full name",
                        required: true,
                        "data-ocid": "profile.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-city", children: "City / Current Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-city",
                        value: city,
                        onChange: (e) => setCity(e.target.value),
                        placeholder: "e.g. Mumbai, Delhi",
                        "data-ocid": "profile.city_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "profile-phone",
                        className: "flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
                          " Mobile Number"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-phone",
                        value: phoneNumber,
                        onChange: (e) => setPhoneNumber(e.target.value),
                        placeholder: "+91 9876543210",
                        type: "tel",
                        "data-ocid": "profile.phone.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-gender", children: "Gender" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "profile-gender",
                        value: gender,
                        onChange: (e) => setGender(e.target.value),
                        className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "data-ocid": "profile.gender.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Prefer not to say" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "male", children: "Male" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "female", children: "Female" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "prefer_not", children: "Prefer not to say" })
                        ]
                      }
                    )
                  ] }),
                  gender === "female" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 mr-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Keep number private" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reveal phone number only after ride acceptance" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: isPhoneHidden,
                        onCheckedChange: setIsPhoneHidden,
                        "data-ocid": "profile.phone_hidden.switch"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-about", children: "About Me" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "profile-about",
                        value: about,
                        onChange: (e) => setAbout(e.target.value),
                        placeholder: 'e.g. "I travel frequently and enjoy quiet rides."',
                        maxLength: 200,
                        rows: 3,
                        "data-ocid": "profile.about_textarea"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-right", children: [
                      about.length,
                      "/200"
                    ] })
                  ] })
                ] }),
                userRole === "driver" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground", children: "Driver Information" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Required for posting rides" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "car-brand", children: "Car Brand / Model" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "car-brand",
                          value: carBrand,
                          onChange: (e) => setCarBrand(e.target.value),
                          placeholder: "e.g. MG Hector",
                          "data-ocid": "profile.car_brand_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "car-color", children: "Car Color" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "car-color",
                          value: carColor,
                          onChange: (e) => setCarColor(e.target.value),
                          placeholder: "e.g. Blue",
                          "data-ocid": "profile.car_color_input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vehicle-type", children: "Vehicle Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "vehicle-type",
                        value: vehicleType,
                        onChange: (e) => setVehicleType(e.target.value),
                        className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "data-ocid": "profile.vehicle_type_select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select type" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hatchback", children: "Hatchback" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sedan", children: "Sedan" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suv", children: "SUV" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "license-plate", children: [
                      "License Plate",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "license-plate",
                        value: licensePlate,
                        onChange: (e) => setLicensePlate(e.target.value),
                        placeholder: "e.g. MH 04 AB 1234",
                        "data-ocid": "profile.license_plate_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground", children: [
                      "Social Profile",
                      userRole === "driver" ? " *" : ""
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: userRole === "driver" ? "Mandatory for drivers — helps riders verify your identity" : "Optional — helps build trust with other users" })
                  ] }),
                  userRole === "driver" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg border border-primary/30 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary", children: "As a driver, adding a social profile helps passengers verify your identity and increases booking rates. Add your LinkedIn or Facebook profile below." })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "profile-facebook",
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[11px] bg-[#1877F2] text-white px-1.5 py-0.5 rounded", children: "f" }),
                          "Facebook Profile URL"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-facebook",
                        value: facebookUrl,
                        onChange: (e) => setFacebookUrl(e.target.value),
                        placeholder: "https://facebook.com/yourprofile",
                        type: "url",
                        "data-ocid": "profile.facebook_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "profile-linkedin",
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4 text-[#0A66C2]" }),
                          "LinkedIn Profile URL"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "profile-linkedin",
                        value: linkedinUrl,
                        onChange: (e) => setLinkedinUrl(e.target.value),
                        placeholder: "https://linkedin.com/in/yourprofile",
                        type: "url",
                        "data-ocid": "profile.linkedin_input"
                      }
                    )
                  ] }),
                  socialError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm text-destructive flex items-center gap-1.5",
                      "data-ocid": "profile.social_error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
                        socialError
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "w-full gap-2",
                    "data-ocid": "profile.save_button",
                    children: [
                      isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                      isSaving ? "Saving..." : "Save Changes"
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        !isEditing && (profile == null ? void 0 : profile.about) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: profile.about })
        ] }),
        !isEditing && profile && (profile.carBrand || profile.vehicleType) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-5 w-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: [
                profile.carBrand,
                profile.carColor,
                profile.vehicleType ? profile.vehicleType.charAt(0).toUpperCase() + profile.vehicleType.slice(1) : ""
              ].filter(Boolean).join(" · ") }),
              profile.licensePlate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "License: ",
                profile.licensePlate
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Rides Posted",
              value: (myRides == null ? void 0 : myRides.length) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Completed",
              value: completedRides,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Trips Taken",
              value: confirmedBookings,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Rating",
              value: profile ? `${profile.averageRating.toFixed(1)} ★` : "—",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }),
        myRides && myRides.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold mb-4", children: "Recent Posted Rides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: myRides.slice(0, 5).map((ride) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-sm py-2 border-b border-border last:border-0 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate min-w-0 flex-1", children: [
                  ride.origin,
                  " → ",
                  ride.destination
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: ride.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "active" in ride.status ? "Active" : "completed" in ride.status ? "Done" : "Cancelled" })
                ] })
              ]
            },
            ride.id.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex justify-end mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2 text-destructive border-destructive/30 hover:bg-destructive/10",
            onClick: () => {
              clear();
              navigate({ to: "/welcome" });
            },
            "data-ocid": "profile.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              "Sign Out"
            ]
          }
        ) })
      ]
    }
  ) });
}
function StatCard({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-black", children: value })
  ] });
}
export {
  ProfilePage
};
