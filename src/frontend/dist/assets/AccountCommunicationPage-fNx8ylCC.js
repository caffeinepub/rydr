import { V as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, X as ChevronLeft, Z as Label, x as ue } from "./index-o36hOOSD.js";
import { S as Separator } from "./separator-CrLfeobm.js";
import { S as Switch } from "./switch-B4qvDi6u.js";
function AccountCommunicationPage() {
  const navigate = useNavigate();
  const [rideNotifs, setRideNotifs] = reactExports.useState(true);
  const [chatNotifs, setChatNotifs] = reactExports.useState(true);
  const [promoEmails, setPromoEmails] = reactExports.useState(false);
  const handleChange = (setter, value, label) => {
    setter(value);
    ue.success(`${label} ${value ? "enabled" : "disabled"}.`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "communication.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "communication.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Communication Preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Manage how RYDR communicates with you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-4 px-1",
          "data-ocid": "communication.ride_notifs.switch",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 mr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold cursor-pointer", children: "Ride booking notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Alerts when someone books your ride or a booking is confirmed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: rideNotifs,
                onCheckedChange: (v) => handleChange(setRideNotifs, v, "Ride notifications")
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-4 px-1",
          "data-ocid": "communication.chat_notifs.switch",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 mr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold cursor-pointer", children: "Chat message notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Alerts when you receive new messages" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: chatNotifs,
                onCheckedChange: (v) => handleChange(setChatNotifs, v, "Chat notifications")
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-4 px-1",
          "data-ocid": "communication.promo_emails.switch",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 mr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold cursor-pointer", children: "Promotional emails" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Tips, new features, and RYDR updates" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: promoEmails,
                onCheckedChange: (v) => handleChange(setPromoEmails, v, "Promotional emails")
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  AccountCommunicationPage
};
