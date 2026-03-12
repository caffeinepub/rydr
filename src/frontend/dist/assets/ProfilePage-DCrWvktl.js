import { O as createLucideIcon, h as useInternetIdentity, V as useNavigate, a6 as useMyProfile, i as useMyPostedRides, k as useMyBookings, a7 as useUpdateProfile, r as reactExports, j as jsxRuntimeExports, a8 as User, B as Button, q as LoaderCircle, s as LogIn, t as motion, a9 as LogOut, S as Skeleton, aa as Avatar, ab as AvatarImage, ac as AvatarFallback, ad as StarRating, ae as ShieldCheck, Z as Label, $ as Input, x as Car, K as ue } from "./index-jWWoVaVf.js";
import { b as isRideCompleted, c as isBookingConfirmed } from "./index-DkmPAu21.js";
import { C as CircleCheckBig } from "./circle-check-big-qa1E49hH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$4);
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
function getSocialLinks(principalId) {
  try {
    const raw = localStorage.getItem(`rydr_social_${principalId}`);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { facebookUrl: "", linkedinUrl: "" };
}
function saveSocialLinks(principalId, links) {
  localStorage.setItem(`rydr_social_${principalId}`, JSON.stringify(links));
}
function ProfilePage() {
  const { identity, login, isLoggingIn, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myRides } = useMyPostedRides();
  const { data: myBookings } = useMyBookings();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [facebookUrl, setFacebookUrl] = reactExports.useState("");
  const [linkedinUrl, setLinkedinUrl] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const principalId = (identity == null ? void 0 : identity.getPrincipal().toString()) ?? "";
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAvatarUrl(profile.avatarUrl || "");
    }
  }, [profile]);
  reactExports.useEffect(() => {
    if (principalId) {
      const links = getSocialLinks(principalId);
      setFacebookUrl(links.facebookUrl);
      setLinkedinUrl(links.linkedinUrl);
    }
  }, [principalId]);
  const handlePhotoSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const result = (_a2 = ev.target) == null ? void 0 : _a2.result;
      if (typeof result === "string") {
        setAvatarUrl(result);
      }
    };
    reader.readAsDataURL(file);
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
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Name is required.");
      return;
    }
    try {
      await updateProfile({ name: name.trim(), avatarUrl });
      saveSocialLinks(principalId, { facebookUrl, linkedinUrl });
      ue.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      ue.error(
        (err == null ? void 0 : err.message) || "Failed to update profile. Please try again."
      );
    }
  };
  const initials = ((profile == null ? void 0 : profile.name) || "??").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const completedRides = (myRides == null ? void 0 : myRides.filter((r) => isRideCompleted(r.status)).length) ?? 0;
  const confirmedBookings = (myBookings == null ? void 0 : myBookings.filter((b) => isBookingConfirmed(b.status)).length) ?? 0;
  const hasFacebook = facebookUrl.trim().length > 0;
  const hasLinkedin = linkedinUrl.trim().length > 0;
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: profile.averageRating, size: "md" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.averageRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  "(",
                  Number(profile.ratingCount),
                  " ratings)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate mb-3 max-w-full", children: identity.getPrincipal().toString() }),
              (hasFacebook || hasLinkedin) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-1", children: [
                hasFacebook && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: facebookUrl,
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
                    href: linkedinUrl,
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
              className: "mt-4 pt-4 border-t border-border space-y-4",
              children: [
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "JPG, PNG, WebP" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Display Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "profile-name",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      placeholder: "Your name",
                      required: true,
                      "data-ocid": "profile.name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" }),
                    "Add social profile links to verify your identity and build trust with other riders"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
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
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    size: "sm",
                    disabled: isSaving,
                    className: "gap-2",
                    "data-ocid": "profile.save_button",
                    children: [
                      isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                      isSaving ? "Saving..." : "Save Changes"
                    ]
                  }
                )
              ]
            }
          )
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
                  " \\u2192 ",
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-3 sm:p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-xl sm:text-2xl mb-0.5", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
export {
  ProfilePage
};
