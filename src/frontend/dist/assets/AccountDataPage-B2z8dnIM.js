import { V as useNavigate, j as jsxRuntimeExports, B as Button, X as ChevronLeft, af as Shield } from "./index-BnF20Gme.js";
function AccountDataPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "data.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "data.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Data Protection" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "Your privacy matters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "RYDR is committed to protecting your personal data." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm leading-relaxed text-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "Data We Collect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "RYDR collects only the data necessary to operate the platform: your name, email address, profile photo, and ride history. We do not sell your personal information to third parties." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "How We Use Your Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your data is used to match you with rides, communicate booking updates, and improve platform safety. Location data is used only during active rides and is not stored permanently." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "Your Rights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "You have the right to access, correct, or delete your personal data at any time. To request data deletion or export, contact us at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "mailto:support@rydr.in",
                className: "text-primary underline",
                children: "support@rydr.in"
              }
            ),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: "Data Retention" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Account data is retained for up to 2 years after your last activity. You may request immediate deletion of your account and data at any time." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs pt-4", children: "For data requests, email support@rydr.in" })
    ] })
  ] });
}
export {
  AccountDataPage
};
