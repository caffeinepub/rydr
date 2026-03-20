import { V as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, X as ChevronLeft, Z as Label, $ as Input, h as LoaderCircle, x as ue } from "./index-7bcVhUG_.js";
import { S as Save } from "./save-CTEk9mnd.js";
function AccountAddressPage() {
  const navigate = useNavigate();
  const [address, setAddress] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      ue.error("Please enter a postal address.");
      return;
    }
    setSaving(true);
    try {
      localStorage.setItem("rydr_postal_address", address.trim());
      ue.success("Address saved.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", "data-ocid": "address.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8 shrink-0",
          onClick: () => navigate({ to: "/profile" }),
          "data-ocid": "address.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", children: "Postal Address" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postal-address", children: "Postal Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "postal-address",
            value: address,
            onChange: (e) => setAddress(e.target.value),
            placeholder: "e.g. 123 MG Road, Bengaluru, Karnataka 560001",
            "data-ocid": "address.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: saving,
          className: "w-full gap-2",
          "data-ocid": "address.save_button",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            saving ? "Saving..." : "Save Address"
          ]
        }
      )
    ] }) })
  ] });
}
export {
  AccountAddressPage
};
