import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  Car,
  Cigarette,
  ClipboardCheck,
  Clock,
  Loader2,
  LogIn,
  MapPin,
  PawPrint,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { usePostRide } from "../hooks/useQueries";
import type { ApprovalMode } from "../types";

export function PostRidePage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = usePostRide();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState("3");
  const [price, setPrice] = useState("");
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [luggageAllowed, setLuggageAllowed] = useState(true);
  const [approvalMode, setApprovalMode] = useState<"instant" | "manual">(
    "instant",
  );

  if (!identity) {
    return (
      <main className="container py-16 max-w-lg text-center">
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
          data-ocid="nav.login_button"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = Number(price);
    const seatsNum = Number(seats);

    if (!origin.trim() || !destination.trim() || !date || !departureTime) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (priceNum <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }
    if (seatsNum < 1) {
      toast.error("Must have at least 1 seat.");
      return;
    }

    const mode: ApprovalMode =
      approvalMode === "instant" ? { instant: null } : { manual: null };

    try {
      await mutateAsync({
        origin: origin.trim(),
        destination: destination.trim(),
        date,
        departureTime,
        totalSeats: BigInt(seatsNum),
        pricePerSeat: BigInt(Math.round(priceNum)),
        petsAllowed,
        smokingAllowed,
        luggageAllowed,
        approvalMode: mode,
      });
      toast.success("Ride published successfully!");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to publish ride.");
    }
  };

  return (
    <main className="container py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black mb-1">Post a Ride</h1>
          <p className="text-muted-foreground">
            Share your journey and split travel costs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Route
            </h2>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="origin">
                  Origin <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="origin"
                    placeholder="City or full address"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                    className="pl-9"
                    data-ocid="post_ride.origin_input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="destination">
                  Destination <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    id="destination"
                    placeholder="City or full address"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="pl-9"
                    data-ocid="post_ride.destination_input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Schedule
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="[color-scheme:dark]"
                  data-ocid="post_ride.date_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time">
                  Departure Time <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    required
                    className="pl-9 [color-scheme:dark]"
                    data-ocid="post_ride.time_input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Capacity & Pricing */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Capacity & Pricing
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="seats">
                  Available Seats <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    max="8"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    required
                    className="pl-9"
                    data-ocid="post_ride.seats_input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">
                  Price per Seat ($) <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="pl-9"
                    data-ocid="post_ride.price_input"
                  />
                </div>
                {price && Number(price) <= 0 && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="post_ride.price_error"
                  >
                    Price must be greater than 0
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Preferences
            </h2>
            <div className="space-y-3">
              <SwitchRow
                id="pets"
                label="Pets Allowed"
                icon={<PawPrint className="h-4 w-4" />}
                checked={petsAllowed}
                onCheckedChange={setPetsAllowed}
                dataOcid="post_ride.pets_switch"
              />
              <SwitchRow
                id="smoking"
                label="Smoking Allowed"
                icon={<Cigarette className="h-4 w-4" />}
                checked={smokingAllowed}
                onCheckedChange={setSmokingAllowed}
                dataOcid="post_ride.smoking_switch"
              />
              <SwitchRow
                id="luggage"
                label="Luggage Allowed"
                icon={<Briefcase className="h-4 w-4" />}
                checked={luggageAllowed}
                onCheckedChange={setLuggageAllowed}
                dataOcid="post_ride.luggage_switch"
              />
            </div>
          </div>

          {/* Booking mode */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Booking Approval
            </h2>
            <RadioGroup
              value={approvalMode}
              onValueChange={(v) => setApprovalMode(v as "instant" | "manual")}
              className="space-y-2"
              data-ocid="post_ride.approval_select"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors">
                <RadioGroupItem
                  value="instant"
                  id="instant"
                  className="mt-0.5"
                />
                <Label htmlFor="instant" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 font-medium mb-0.5">
                    <Zap className="h-4 w-4 text-primary" />
                    Instant Booking
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Riders are automatically confirmed when seats are available.
                  </p>
                </Label>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 transition-colors">
                <RadioGroupItem value="manual" id="manual" className="mt-0.5" />
                <Label htmlFor="manual" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 font-medium mb-0.5">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    Manual Approval
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You review and approve each booking request.
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={isPending || !price || Number(price) <= 0}
            data-ocid="post_ride.submit_button"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Car className="h-4 w-4" />
            )}
            {isPending ? "Publishing..." : "Publish Ride"}
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

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
