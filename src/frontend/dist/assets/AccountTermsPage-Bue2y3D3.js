import { V as useNavigate, j as jsxRuntimeExports, B as Button, X as ChevronLeft } from "./index-Cxot6pCg.js";
function AccountTermsPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "terms.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "terms.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Terms of Service" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-6 space-y-4 text-sm leading-relaxed text-foreground/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Last updated: January 2025" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "1. Acceptance of Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By using RYDR, you agree to our terms of service. RYDR is a ride-sharing platform connecting drivers and passengers across India." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "2. Platform Use" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "RYDR connects drivers who have empty seats with riders travelling the same route. Drivers set their own prices; RYDR does not guarantee any income. Riders must respect driver preferences." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "3. Safety" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All users are responsible for their own safety. RYDR encourages sharing trips only with verified users. Report any safety concerns to support@rydr.in immediately." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "4. Cancellation Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Frequent cancellations by drivers or riders may result in reduced trust scores or account suspension. Please only book or post rides you intend to complete." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "5. Prohibited Conduct" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Users must not use RYDR for illegal activities, harassment, or misrepresentation. Violations may result in immediate account termination." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs pt-4", children: "For full terms, contact support@rydr.in" })
    ] })
  ] });
}
export {
  AccountTermsPage
};
