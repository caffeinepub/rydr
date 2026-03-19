import { V as useNavigate, j as jsxRuntimeExports, B as Button, X as ChevronLeft } from "./index-BnF20Gme.js";
import { D as DollarSign } from "./dollar-sign-gjR1JfNf.js";
function AccountPayoutsPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "payouts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "payouts.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Payouts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-8 w-8 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Coming Soon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Payout functionality will be available soon. You'll be able to withdraw your earnings directly to your bank account." })
    ] })
  ] });
}
export {
  AccountPayoutsPage
};
