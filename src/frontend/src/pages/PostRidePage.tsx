import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  Car,
  ChevronLeft,
  Cigarette,
  ClipboardCheck,
  Loader2,
  LogIn,
  MapPin,
  PawPrint,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LocationAutocomplete } from "../components/LocationAutocomplete";
import type { LocationResult } from "../components/LocationAutocomplete";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useMyProfile, usePostRide } from "../hooks/useQueries";
import type { ApprovalMode } from "../types";

const TOTAL_STEPS = 6;

const STEP_TITLES = [
  "Pickup Location",
  "Drop-off Location",
  "When are you leaving?",
  "Seats & price",
  "Ride preferences",
  "Review your ride",
];

const STEP_SUBTITLES = [
  "Where will you pick up passengers?",
  "Where is the final destination?",
  "Set the departure date and time.",
  "How many seats and at what price?",
  "Set your ride rules and booking type.",
  "Everything look good? Publish it!",
];

export function PostRidePage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: myProfile } = useMyProfile();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = usePostRide();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Form state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCoords, setOriginCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destCoords, setDestCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState("");
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [luggageAllowed, setLuggageAllowed] = useState(true);
  const [chatPreference, setChatPreference] = useState<"chatty" | "quiet">(
    "chatty",
  );
  const [approvalMode, setApprovalMode] = useState<"instant" | "manual">(
    "instant",
  );

  // Suppress unused variable warnings — coords stored for future map use
  void originCoords;
  void destCoords;

  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
      toast.info("Connecting to backend, retrying in 1 second…");
      retryRef.current = setTimeout(() => handlePublish(), 1000);
      return;
    }

    const priceNum = Number(price);
    const mode: ApprovalMode =
      approvalMode === "instant" ? { instant: null } : { manual: null };

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
        approvalMode: mode,
      });
      toast.success("Ride published successfully! 🎉");
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to publish ride.";
      toast.error(msg);
    }
  };

  const handleOriginSelect = (result: LocationResult) => {
    setOrigin(result.label);
    setOriginCoords({ lat: result.lat, lng: result.lng });
  };

  const handleDestSelect = (result: LocationResult) => {
    setDestination(result.label);
    setDestCoords({ lat: result.lat, lng: result.lng });
  };

  if (!identity) {
    return (
      <main className="container py-16 max-w-lg text-center px-4 sm:px-6">
        <Car className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="font-display text-2xl font-black mb-2">
          Sign in to post a ride
        </h1>
        <p className="text-muted-foreground mb-6">
          You need to be signed in to publish a ride.
        </p>
        <Button
          onClick={login}
          disabled={isLoggingIn}
          className="gap-2"
          data-ocid="post_ride.login_button"
        >
          {isLoggingIn ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {isLoggingIn ? "Connecting..." : "Sign In"}
        </Button>
      </main>
    );
  }

  // Driver role check: only allow users with driver profile to post rides
  if (
    identity &&
    myProfile &&
    myProfile.userRole &&
    myProfile.userRole !== "driver"
  ) {
    return (
      <main className="container py-16 max-w-lg text-center px-4 sm:px-6">
        <Car className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="font-display text-2xl font-black mb-2">
          Driver profile required
        </h1>
        <p className="text-muted-foreground mb-6">
          You need to set up a driver profile before posting rides. Add your
          vehicle info and a social profile link to get started.
        </p>
        <Button
          asChild
          className="gap-2 bg-[#00AEEF] hover:bg-[#1F7AE0] text-white"
          data-ocid="post_ride.driver_required.button"
        >
          <Link to="/profile">Complete Driver Profile →</Link>
        </Button>
      </main>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
    }),
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="container py-6 max-w-lg px-4 sm:px-6">
      {/* Header with back button + progress */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              data-ocid="post_ride.back_button"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              Step {step + 1} of {TOTAL_STEPS}
            </p>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                data-ocid="post_ride.progress_bar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated step content */}
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
          >
            {/* Step heading */}
            <div className="mb-6">
              <h1 className="font-display text-2xl font-black leading-tight mb-1">
                {STEP_TITLES[step]}
              </h1>
              <p className="text-sm text-muted-foreground">
                {STEP_SUBTITLES[step]}
              </p>
            </div>

            {/* Step 0: Pickup Location */}
            {step === 0 && (
              <StepPickup
                origin={origin}
                setOrigin={setOrigin}
                onSelect={handleOriginSelect}
                onNext={goNext}
                canAdvance={canAdvanceStep0}
              />
            )}

            {/* Step 1: Drop-off Location */}
            {step === 1 && (
              <StepDropoff
                destination={destination}
                setDestination={setDestination}
                onSelect={handleDestSelect}
                onNext={goNext}
                canAdvance={canAdvanceStep1}
              />
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <StepDateTime
                date={date}
                setDate={setDate}
                departureTime={departureTime}
                setDepartureTime={setDepartureTime}
                onNext={goNext}
                canAdvance={canAdvanceStep2}
              />
            )}

            {/* Step 3: Seats & Price */}
            {step === 3 && (
              <StepSeatsPrice
                seats={seats}
                setSeats={setSeats}
                price={price}
                setPrice={setPrice}
                onNext={goNext}
                canAdvance={canAdvanceStep3}
              />
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <StepPreferences
                petsAllowed={petsAllowed}
                setPetsAllowed={setPetsAllowed}
                smokingAllowed={smokingAllowed}
                setSmokingAllowed={setSmokingAllowed}
                luggageAllowed={luggageAllowed}
                setLuggageAllowed={setLuggageAllowed}
                chatPreference={chatPreference}
                setChatPreference={setChatPreference}
                approvalMode={approvalMode}
                setApprovalMode={setApprovalMode}
                onNext={goNext}
              />
            )}

            {/* Step 5: Review & Publish */}
            {step === 5 && (
              <StepReview
                origin={origin}
                destination={destination}
                date={date}
                departureTime={departureTime}
                seats={seats}
                price={price}
                petsAllowed={petsAllowed}
                smokingAllowed={smokingAllowed}
                luggageAllowed={luggageAllowed}
                chatPreference={chatPreference}
                approvalMode={approvalMode}
                onPublish={handlePublish}
                isPending={isPending}
                actorLoading={actorFetching && !actor}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ─── Step 0: Pickup Location ──────────────────────────────── */
function StepPickup({
  origin,
  setOrigin,
  onSelect,
  onNext,
  canAdvance,
}: {
  origin: string;
  setOrigin: (v: string) => void;
  onSelect: (r: LocationResult) => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="origin">Pickup location</Label>
        <LocationAutocomplete
          id="origin"
          placeholder="Pickup city or address"
          value={origin}
          onChange={setOrigin}
          onSelect={onSelect}
          icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          data-ocid="post_ride.pickup_input"
        />
      </div>
      <Button
        type="button"
        size="lg"
        className="w-full mt-2"
        onClick={onNext}
        disabled={!canAdvance}
        data-ocid="post_ride.step0_next_button"
      >
        Next
      </Button>
    </div>
  );
}

/* ─── Step 1: Drop-off Location ────────────────────────────── */
function StepDropoff({
  destination,
  setDestination,
  onSelect,
  onNext,
  canAdvance,
}: {
  destination: string;
  setDestination: (v: string) => void;
  onSelect: (r: LocationResult) => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="destination">Drop-off location</Label>
        <LocationAutocomplete
          id="destination"
          placeholder="Drop-off city or address"
          value={destination}
          onChange={setDestination}
          onSelect={onSelect}
          icon={<MapPin className="h-4 w-4 text-primary" />}
          data-ocid="post_ride.dropoff_input"
        />
      </div>
      <Button
        type="button"
        size="lg"
        className="w-full mt-2"
        onClick={onNext}
        disabled={!canAdvance}
        data-ocid="post_ride.step1_next_button"
      >
        Next
      </Button>
    </div>
  );
}

/* ─── Step 2: Date & Time ──────────────────────────────────── */
function StepDateTime({
  date,
  setDate,
  departureTime,
  setDepartureTime,
  onNext,
  canAdvance,
}: {
  date: string;
  setDate: (v: string) => void;
  departureTime: string;
  setDepartureTime: (v: string) => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-base h-12 [color-scheme:dark]"
          min={new Date().toISOString().split("T")[0]}
          data-ocid="post_ride.date_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="time">Departure time</Label>
        <Input
          id="time"
          type="time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="text-base h-12 [color-scheme:dark]"
          data-ocid="post_ride.time_input"
        />
      </div>
      <Button
        type="button"
        size="lg"
        className="w-full mt-2"
        onClick={onNext}
        disabled={!canAdvance}
        data-ocid="post_ride.step2_next_button"
      >
        Next
      </Button>
    </div>
  );
}

/* ─── Step 3: Seats & Price ────────────────────────────────── */
function StepSeatsPrice({
  seats,
  setSeats,
  price,
  setPrice,
  onNext,
  canAdvance,
}: {
  seats: number;
  setSeats: (v: number) => void;
  price: string;
  setPrice: (v: string) => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="space-y-5">
      {/* Seats stepper */}
      <div className="space-y-2">
        <Label>Available seats</Label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Decrease seats"
            onClick={() => setSeats(Math.max(1, seats - 1))}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-xl font-bold hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-40"
            disabled={seats <= 1}
            data-ocid="post_ride.seats_decrease_button"
          >
            −
          </button>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-3xl font-display font-black w-8 text-center">
              {seats}
            </span>
          </div>
          <button
            type="button"
            aria-label="Increase seats"
            onClick={() => setSeats(Math.min(8, seats + 1))}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-xl font-bold hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-40"
            disabled={seats >= 8}
            data-ocid="post_ride.seats_increase_button"
          >
            +
          </button>
        </div>
      </div>

      {/* Price input */}
      <div className="space-y-1.5">
        <Label htmlFor="price">
          Price per seat <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
            ₹
          </span>
          <Input
            id="price"
            type="number"
            min="1"
            step="1"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="pl-8 text-base h-12"
            data-ocid="post_ride.price_input"
          />
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Banknote className="h-3.5 w-3.5" />
          Recommended: ₹150–₹500 per seat
        </p>
        {price && Number(price) <= 0 && (
          <p
            className="text-xs text-destructive"
            data-ocid="post_ride.price_error"
          >
            Price must be greater than 0
          </p>
        )}
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full mt-2"
        onClick={onNext}
        disabled={!canAdvance}
        data-ocid="post_ride.step3_next_button"
      >
        Next
      </Button>
    </div>
  );
}

/* ─── Step 4: Preferences ──────────────────────────────────── */
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
  onNext,
}: {
  petsAllowed: boolean;
  setPetsAllowed: (v: boolean) => void;
  smokingAllowed: boolean;
  setSmokingAllowed: (v: boolean) => void;
  luggageAllowed: boolean;
  setLuggageAllowed: (v: boolean) => void;
  chatPreference: "chatty" | "quiet";
  setChatPreference: (v: "chatty" | "quiet") => void;
  approvalMode: "instant" | "manual";
  setApprovalMode: (v: "instant" | "manual") => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      {/* Chat preference */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
          Chat preference
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChatPreference("chatty")}
            data-ocid="post_ride.chatty_pill"
            className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
              chatPreference === "chatty"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            Chatty 🗣️
          </button>
          <button
            type="button"
            onClick={() => setChatPreference("quiet")}
            data-ocid="post_ride.quiet_pill"
            className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
              chatPreference === "quiet"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            Quiet 🤫
          </button>
        </div>
      </div>

      {/* Preference toggles */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
          Allowed on your ride
        </p>
        <SwitchRow
          id="pets"
          label="Pets"
          icon={<PawPrint className="h-4 w-4" />}
          checked={petsAllowed}
          onCheckedChange={setPetsAllowed}
          dataOcid="post_ride.pets_switch"
        />
        <SwitchRow
          id="smoking"
          label="Smoking"
          icon={<Cigarette className="h-4 w-4" />}
          checked={smokingAllowed}
          onCheckedChange={setSmokingAllowed}
          dataOcid="post_ride.smoking_switch"
        />
        <SwitchRow
          id="luggage"
          label="Luggage"
          icon={<Briefcase className="h-4 w-4" />}
          checked={luggageAllowed}
          onCheckedChange={setLuggageAllowed}
          dataOcid="post_ride.luggage_switch"
        />
      </div>

      {/* Booking approval */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Booking approval
        </p>
        <RadioGroup
          value={approvalMode}
          onValueChange={(v) => setApprovalMode(v as "instant" | "manual")}
          className="space-y-2"
          data-ocid="post_ride.approval_select"
        >
          <Label
            htmlFor="instant"
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors"
          >
            <RadioGroupItem value="instant" id="instant" className="mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-sm mb-0.5">
                <Zap className="h-4 w-4 text-primary" />
                Instant Booking
              </div>
              <p className="text-xs text-muted-foreground">
                Riders confirmed automatically when seats are available.
              </p>
            </div>
          </Label>
          <Label
            htmlFor="manual"
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors"
          >
            <RadioGroupItem value="manual" id="manual" className="mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-sm mb-0.5">
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                Manual Approval
              </div>
              <p className="text-xs text-muted-foreground">
                You review and approve each booking request.
              </p>
            </div>
          </Label>
        </RadioGroup>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full mt-2"
        onClick={onNext}
        data-ocid="post_ride.step4_next_button"
      >
        Review Ride
      </Button>
    </div>
  );
}

/* ─── Step 5: Review & Publish ─────────────────────────────── */
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
  actorLoading,
}: {
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  seats: number;
  price: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  luggageAllowed: boolean;
  chatPreference: "chatty" | "quiet";
  approvalMode: "instant" | "manual";
  onPublish: () => void;
  isPending: boolean;
  actorLoading: boolean;
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
      value: chatPreference === "chatty" ? "Chatty 🗣️" : "Quiet 🤫",
    },
    { label: "Pets", value: petsAllowed ? "Allowed" : "Not allowed" },
    { label: "Smoking", value: smokingAllowed ? "Allowed" : "Not allowed" },
    { label: "Luggage", value: luggageAllowed ? "Allowed" : "Not allowed" },
    {
      label: "Approval",
      value: approvalMode === "instant" ? "Instant" : "Manual",
    },
  ];

  const isLoading = isPending || actorLoading;

  return (
    <div className="space-y-4">
      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="post_ride.review_card"
      >
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex items-center justify-between px-4 py-3 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className="text-muted-foreground">{r.label}</span>
            <span className="font-semibold text-right max-w-[60%] truncate">
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {actorLoading && (
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg"
          data-ocid="post_ride.loading_state"
        >
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          <span>Connecting to backend…</span>
        </div>
      )}

      <Button
        type="button"
        size="lg"
        className="w-full gap-2"
        onClick={onPublish}
        disabled={isLoading}
        data-ocid="post_ride.submit_button"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Car className="h-4 w-4" />
        )}
        {isPending
          ? "Publishing…"
          : actorLoading
            ? "Connecting…"
            : "Publish Ride"}
      </Button>
    </div>
  );
}

/* ─── SwitchRow helper ─────────────────────────────────────── */
function SwitchRow({
  id,
  label,
  icon,
  checked,
  onCheckedChange,
  dataOcid,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  dataOcid: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label
        htmlFor={id}
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        data-ocid={dataOcid}
      />
    </div>
  );
}
