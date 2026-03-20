import { z as createLucideIcon, r as reactExports, E as createRovingFocusGroupScope, F as useDirection, G as useControllableState, j as jsxRuntimeExports, H as createContextScope, R as Root, P as Primitive, J as useComposedRefs, K as Item, N as composeEventHandlers, O as Presence, Q as useSize, y as cn, u as useGoogleAuth, T as useActor, U as useMyProfile, V as useNavigate, W as usePostRide, n as Car, B as Button, h as LoaderCircle, i as LogIn, k as Link, X as ChevronLeft, m as motion, Y as AnimatePresence, Z as Label, _ as LocationAutocomplete, M as MapPin, $ as Input, a0 as Users, a1 as PawPrint, a2 as Cigarette, a3 as Briefcase, a4 as Zap, a5 as ClipboardCheck, x as ue } from "./index-7bcVhUG_.js";
import { u as usePrevious, S as Switch } from "./switch-DJGlmvrz.js";
import { B as Banknote } from "./banknote-DDUK9r9-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
const TOTAL_STEPS = 6;
const STEP_TITLES = [
  "Pickup Location",
  "Drop-off Location",
  "When are you leaving?",
  "Seats & price",
  "Ride preferences",
  "Review your ride"
];
const STEP_SUBTITLES = [
  "Where will you pick up passengers?",
  "Where is the final destination?",
  "Set the departure date and time.",
  "How many seats and at what price?",
  "Set your ride rules and booking type.",
  "Everything look good? Publish it!"
];
function PostRidePage() {
  const { identity, login, isLoggingIn } = useGoogleAuth();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: myProfile } = useMyProfile();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = usePostRide();
  const [step, setStep] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState(1);
  const [origin, setOrigin] = reactExports.useState("");
  const [destination, setDestination] = reactExports.useState("");
  const [originCoords, setOriginCoords] = reactExports.useState(null);
  const [destCoords, setDestCoords] = reactExports.useState(null);
  const [date, setDate] = reactExports.useState("");
  const [departureTime, setDepartureTime] = reactExports.useState("");
  const [seats, setSeats] = reactExports.useState(3);
  const [price, setPrice] = reactExports.useState("");
  const [petsAllowed, setPetsAllowed] = reactExports.useState(false);
  const [smokingAllowed, setSmokingAllowed] = reactExports.useState(false);
  const [luggageAllowed, setLuggageAllowed] = reactExports.useState(true);
  const [chatPreference, setChatPreference] = reactExports.useState(
    "chatty"
  );
  const [approvalMode, setApprovalMode] = reactExports.useState(
    "instant"
  );
  const retryRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, []);
  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };
  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };
  const canAdvanceStep0 = origin.trim().length > 0;
  const canAdvanceStep1 = destination.trim().length > 0;
  const canAdvanceStep2 = date !== "" && departureTime !== "";
  const canAdvanceStep3 = price !== "" && Number(price) > 0;
  const handlePublish = async () => {
    if (actorFetching || !actor) {
      ue.info("Connecting to backend, retrying in 1 second…");
      retryRef.current = setTimeout(() => handlePublish(), 1e3);
      return;
    }
    const priceNum = Number(price);
    const mode = approvalMode === "instant" ? { instant: null } : { manual: null };
    try {
      await mutateAsync({
        origin: origin.trim(),
        destination: destination.trim(),
        date,
        departureTime,
        totalSeats: BigInt(seats),
        pricePerSeat: BigInt(Math.round(priceNum)),
        petsAllowed,
        smokingAllowed,
        luggageAllowed,
        approvalMode: mode
      });
      ue.success("Ride published successfully! 🎉");
      navigate({ to: "/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to publish ride.";
      ue.error(msg);
    }
  };
  const handleOriginSelect = (result) => {
    setOrigin(result.label);
    setOriginCoords({ lat: result.lat, lng: result.lng });
  };
  const handleDestSelect = (result) => {
    setDestination(result.label);
    setDestCoords({ lat: result.lat, lng: result.lng });
  };
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-16 max-w-lg text-center px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-12 w-12 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black mb-2", children: "Sign in to post a ride" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "You need to be signed in to publish a ride." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: login,
          disabled: isLoggingIn,
          className: "gap-2",
          "data-ocid": "post_ride.login_button",
          children: [
            isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
            isLoggingIn ? "Connecting..." : "Sign In"
          ]
        }
      )
    ] });
  }
  if (identity && myProfile && myProfile.userRole && myProfile.userRole !== "driver") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-16 max-w-lg text-center px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-12 w-12 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black mb-2", children: "Driver profile required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "You need to set up a driver profile before posting rides. Add your vehicle info and a social profile link to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          className: "gap-2 bg-[#00AEEF] hover:bg-[#1F7AE0] text-white",
          "data-ocid": "post_ride.driver_required.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: "Complete Driver Profile →" })
        }
      )
    ] });
  }
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0
    })
  };
  const progressPct = (step + 1) / TOTAL_STEPS * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-6 max-w-lg px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: goBack,
          "aria-label": "Go back",
          "data-ocid": "post_ride.back_button",
          className: "flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1", children: [
          "Step ",
          step + 1,
          " of ",
          TOTAL_STEPS
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full bg-primary",
            animate: { width: `${progressPct}%` },
            transition: { duration: 0.35, ease: "easeOut" },
            "data-ocid": "post_ride.progress_bar"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        custom: direction,
        variants: slideVariants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { duration: 0.28, ease: [0.32, 0, 0.67, 0] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black leading-tight mb-1", children: STEP_TITLES[step] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: STEP_SUBTITLES[step] })
          ] }),
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepPickup,
            {
              origin,
              setOrigin,
              onSelect: handleOriginSelect,
              onNext: goNext,
              canAdvance: canAdvanceStep0
            }
          ),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepDropoff,
            {
              destination,
              setDestination,
              onSelect: handleDestSelect,
              onNext: goNext,
              canAdvance: canAdvanceStep1
            }
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepDateTime,
            {
              date,
              setDate,
              departureTime,
              setDepartureTime,
              onNext: goNext,
              canAdvance: canAdvanceStep2
            }
          ),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepSeatsPrice,
            {
              seats,
              setSeats,
              price,
              setPrice,
              onNext: goNext,
              canAdvance: canAdvanceStep3
            }
          ),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepPreferences,
            {
              petsAllowed,
              setPetsAllowed,
              smokingAllowed,
              setSmokingAllowed,
              luggageAllowed,
              setLuggageAllowed,
              chatPreference,
              setChatPreference,
              approvalMode,
              setApprovalMode,
              onNext: goNext
            }
          ),
          step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepReview,
            {
              origin,
              destination,
              date,
              departureTime,
              seats,
              price,
              petsAllowed,
              smokingAllowed,
              luggageAllowed,
              chatPreference,
              approvalMode,
              onPublish: handlePublish,
              isPending,
              actorLoading: actorFetching && !actor
            }
          )
        ]
      },
      step
    ) }) })
  ] });
}
function StepPickup({
  origin,
  setOrigin,
  onSelect,
  onNext,
  canAdvance
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "origin", children: "Pickup location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationAutocomplete,
        {
          id: "origin",
          placeholder: "Pickup city or address",
          value: origin,
          onChange: setOrigin,
          onSelect,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
          "data-ocid": "post_ride.pickup_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full mt-2",
        onClick: onNext,
        disabled: !canAdvance,
        "data-ocid": "post_ride.step0_next_button",
        children: "Next"
      }
    )
  ] });
}
function StepDropoff({
  destination,
  setDestination,
  onSelect,
  onNext,
  canAdvance
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "destination", children: "Drop-off location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationAutocomplete,
        {
          id: "destination",
          placeholder: "Drop-off city or address",
          value: destination,
          onChange: setDestination,
          onSelect,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          "data-ocid": "post_ride.dropoff_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full mt-2",
        onClick: onNext,
        disabled: !canAdvance,
        "data-ocid": "post_ride.step1_next_button",
        children: "Next"
      }
    )
  ] });
}
function StepDateTime({
  date,
  setDate,
  departureTime,
  setDepartureTime,
  onNext,
  canAdvance
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "date",
          type: "date",
          value: date,
          onChange: (e) => setDate(e.target.value),
          className: "text-base h-12 [color-scheme:dark]",
          min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          "data-ocid": "post_ride.date_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "time", children: "Departure time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "time",
          type: "time",
          value: departureTime,
          onChange: (e) => setDepartureTime(e.target.value),
          className: "text-base h-12 [color-scheme:dark]",
          "data-ocid": "post_ride.time_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full mt-2",
        onClick: onNext,
        disabled: !canAdvance,
        "data-ocid": "post_ride.step2_next_button",
        children: "Next"
      }
    )
  ] });
}
function StepSeatsPrice({
  seats,
  setSeats,
  price,
  setPrice,
  onNext,
  canAdvance
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Available seats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Decrease seats",
            onClick: () => setSeats(Math.max(1, seats - 1)),
            className: "w-11 h-11 rounded-full border border-border flex items-center justify-center text-xl font-bold hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-40",
            disabled: seats <= 1,
            "data-ocid": "post_ride.seats_decrease_button",
            children: "−"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-black w-8 text-center", children: seats })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Increase seats",
            onClick: () => setSeats(Math.min(8, seats + 1)),
            className: "w-11 h-11 rounded-full border border-border flex items-center justify-center text-xl font-bold hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-40",
            disabled: seats >= 8,
            "data-ocid": "post_ride.seats_increase_button",
            children: "+"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
        "Price per seat ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold", children: "₹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "price",
            type: "number",
            min: "1",
            step: "1",
            placeholder: "0",
            value: price,
            onChange: (e) => setPrice(e.target.value),
            className: "pl-8 text-base h-12",
            "data-ocid": "post_ride.price_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "h-3.5 w-3.5" }),
        "Recommended: ₹150–₹500 per seat"
      ] }),
      price && Number(price) <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "post_ride.price_error",
          children: "Price must be greater than 0"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full mt-2",
        onClick: onNext,
        disabled: !canAdvance,
        "data-ocid": "post_ride.step3_next_button",
        children: "Next"
      }
    )
  ] });
}
function StepPreferences({
  petsAllowed,
  setPetsAllowed,
  smokingAllowed,
  setSmokingAllowed,
  luggageAllowed,
  setLuggageAllowed,
  chatPreference,
  setChatPreference,
  approvalMode,
  setApprovalMode,
  onNext
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2", children: "Chat preference" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setChatPreference("chatty"),
            "data-ocid": "post_ride.chatty_pill",
            className: `flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${chatPreference === "chatty" ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`,
            children: "Chatty 🗣️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setChatPreference("quiet"),
            "data-ocid": "post_ride.quiet_pill",
            className: `flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${chatPreference === "quiet" ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`,
            children: "Quiet 🤫"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2", children: "Allowed on your ride" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          id: "pets",
          label: "Pets",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PawPrint, { className: "h-4 w-4" }),
          checked: petsAllowed,
          onCheckedChange: setPetsAllowed,
          dataOcid: "post_ride.pets_switch"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          id: "smoking",
          label: "Smoking",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cigarette, { className: "h-4 w-4" }),
          checked: smokingAllowed,
          onCheckedChange: setSmokingAllowed,
          dataOcid: "post_ride.smoking_switch"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchRow,
        {
          id: "luggage",
          label: "Luggage",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }),
          checked: luggageAllowed,
          onCheckedChange: setLuggageAllowed,
          dataOcid: "post_ride.luggage_switch"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold", children: "Booking approval" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        RadioGroup,
        {
          value: approvalMode,
          onValueChange: (v) => setApprovalMode(v),
          className: "space-y-2",
          "data-ocid": "post_ride.approval_select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "instant",
                className: "flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "instant", id: "instant", className: "mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-sm mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
                      "Instant Booking"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Riders confirmed automatically when seats are available." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "manual",
                className: "flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "manual", id: "manual", className: "mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-sm mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-4 w-4 text-muted-foreground" }),
                      "Manual Approval"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You review and approve each booking request." })
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full mt-2",
        onClick: onNext,
        "data-ocid": "post_ride.step4_next_button",
        children: "Review Ride"
      }
    )
  ] });
}
function StepReview({
  origin,
  destination,
  date,
  departureTime,
  seats,
  price,
  petsAllowed,
  smokingAllowed,
  luggageAllowed,
  chatPreference,
  approvalMode,
  onPublish,
  isPending,
  actorLoading
}) {
  const rows = [
    { label: "From", value: origin },
    { label: "To", value: destination },
    { label: "Date", value: date },
    { label: "Time", value: departureTime },
    { label: "Seats", value: String(seats) },
    { label: "Price / seat", value: `₹${price}` },
    {
      label: "Chat",
      value: chatPreference === "chatty" ? "Chatty 🗣️" : "Quiet 🤫"
    },
    { label: "Pets", value: petsAllowed ? "Allowed" : "Not allowed" },
    { label: "Smoking", value: smokingAllowed ? "Allowed" : "Not allowed" },
    { label: "Luggage", value: luggageAllowed ? "Allowed" : "Not allowed" },
    {
      label: "Approval",
      value: approvalMode === "instant" ? "Instant" : "Manual"
    }
  ];
  const isLoading = isPending || actorLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "post_ride.review_card",
        children: rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between px-4 py-3 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: r.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-right max-w-[60%] truncate", children: r.value })
            ]
          },
          r.label
        ))
      }
    ),
    actorLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg",
        "data-ocid": "post_ride.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Connecting to backend…" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        size: "lg",
        className: "w-full gap-2",
        onClick: onPublish,
        disabled: isLoading,
        "data-ocid": "post_ride.submit_button",
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4" }),
          isPending ? "Publishing…" : actorLoading ? "Connecting…" : "Publish Ride"
        ]
      }
    )
  ] });
}
function SwitchRow({
  id,
  label,
  icon,
  checked,
  onCheckedChange,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Label,
      {
        htmlFor: id,
        className: "flex items-center gap-2 text-sm cursor-pointer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
          label
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Switch,
      {
        id,
        checked,
        onCheckedChange,
        "data-ocid": dataOcid
      }
    )
  ] });
}
export {
  PostRidePage
};
