import { V as useNavigate, j as jsxRuntimeExports, B as Button, X as ChevronLeft, x as Star } from "./index-BnF20Gme.js";
function AccountRatingsPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "ratings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "ratings.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Ratings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-8 w-8 text-amber-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "No ratings yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Your ratings will appear here once you've completed rides. Complete rides to build your trust score." })
    ] })
  ] });
}
export {
  AccountRatingsPage
};
