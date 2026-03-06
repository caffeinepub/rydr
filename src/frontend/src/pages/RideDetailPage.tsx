import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  Briefcase,
  CheckCircle,
  Cigarette,
  ClipboardCheck,
  Clock,
  Loader2,
  MapPin,
  PawPrint,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { RideMap } from "../components/RideMap";
import { StarRating } from "../components/StarRating";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useBookRide,
  useGetUserProfile,
  useMyBookings,
  useRideDetail,
} from "../hooks/useQueries";
import {
  getBookingStatusLabel,
  isBookingConfirmed,
  isBookingPending,
  isRideActive,
} from "../types";

export function RideDetailPage() {
  const { rideId } = useParams({ strict: false }) as { rideId: string };
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const rideIdBigInt = rideId ? BigInt(rideId) : undefined;

  const { data: ride, isLoading: rideLoading } = useRideDetail(rideIdBigInt);
  const { data: myBookings } = useMyBookings();
  const { data: driver } = useGetUserProfile(ride?.driverId?.toString());
  const { mutateAsync: bookRide, isPending: isBooking } = useBookRide();

  const myBookingForRide = myBookings?.find((b) => b.rideId === rideIdBigInt);

  const handleBook = async () => {
    if (!rideIdBigInt) return;
    try {
      await bookRide(rideIdBigInt);
      toast.success("Ride booked successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to book ride");
    }
  };

  if (rideLoading) {
    return (
      <main className="container py-8 max-w-3xl" data-ocid="ride.loading_state">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-32 w-full" />
      </main>
    );
  }

  if (!ride) {
    return (
      <main className="container py-8 max-w-3xl" data-ocid="ride.error_state">
        <div className="text-center py-16">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h2 className="text-xl font-display font-bold mb-2">
            Ride not found
          </h2>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </main>
    );
  }

  const isInstant = "instant" in ride.approvalMode;
  const isActive = isRideActive(ride.status);
  const seatsAvailable = Number(ride.seatsAvailable);

  return (
    <main className="container py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/" })}
          className="mb-6 gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>

        {/* Route header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-px h-10 bg-border" />
                <div className="w-3 h-3 rounded-full border-2 border-primary" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    From
                  </p>
                  <p className="text-xl font-display font-bold">
                    {ride.origin}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    To
                  </p>
                  <p className="text-xl font-display font-bold">
                    {ride.destination}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-display font-black text-primary">
                ₹{Number(ride.pricePerSeat)}
              </p>
              <p className="text-sm text-muted-foreground">per seat</p>
            </div>
          </div>

          {/* Details row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium">{ride.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-medium">{ride.departureTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Seats Left</p>
                <p className="font-medium">
                  {seatsAvailable} / {Number(ride.totalSeats)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Approval</p>
                <p className="font-medium">
                  {isInstant ? "Instant" : "Manual"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <h3 className="font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
            Ride Preferences
          </h3>
          <div className="flex flex-wrap gap-3">
            <PreferenceItem
              allowed={ride.petsAllowed}
              label="Pets Allowed"
              icon={<PawPrint className="h-4 w-4" />}
            />
            <PreferenceItem
              allowed={ride.smokingAllowed}
              label="Smoking Allowed"
              icon={<Cigarette className="h-4 w-4" />}
            />
            <PreferenceItem
              allowed={ride.luggageAllowed}
              label="Luggage Allowed"
              icon={<Briefcase className="h-4 w-4" />}
            />
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border",
                isInstant
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary border-border text-foreground",
              )}
            >
              {isInstant ? (
                <Zap className="h-4 w-4" />
              ) : (
                <ClipboardCheck className="h-4 w-4" />
              )}
              {isInstant ? "Instant Booking" : "Needs Approval"}
            </div>
          </div>
        </div>

        {/* Driver info */}
        {driver && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <h3 className="font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
              Driver
            </h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={driver.avatarUrl} />
                <AvatarFallback className="bg-secondary text-secondary-foreground font-bold text-lg">
                  {driver.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display font-black text-lg">{driver.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={driver.averageRating} size="md" />
                  <span className="text-sm font-medium">
                    {driver.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({Number(driver.ratingCount)} ratings)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mb-6">
          <h3 className="font-display font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
            Route
          </h3>
          <RideMap origin={ride.origin} destination={ride.destination} />
        </div>

        {/* Booking section */}
        <div className="bg-card border border-border rounded-xl p-4">
          {!isLoggedIn ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-3">
                Sign in to book this ride
              </p>
              <Button onClick={() => navigate({ to: "/" })} variant="outline">
                Sign In to Book
              </Button>
            </div>
          ) : myBookingForRide ? (
            <div
              className="flex items-center gap-3"
              data-ocid="ride.booking_status"
            >
              {isBookingConfirmed(myBookingForRide.status) ? (
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              ) : isBookingPending(myBookingForRide.status) ? (
                <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              )}
              <div>
                <p className="font-medium">
                  Booking {getBookingStatusLabel(myBookingForRide.status)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isBookingConfirmed(myBookingForRide.status)
                    ? "Your seat is confirmed. Have a great trip!"
                    : isBookingPending(myBookingForRide.status)
                      ? "Waiting for driver approval."
                      : "Your booking was rejected."}
                </p>
              </div>
            </div>
          ) : isActive && seatsAvailable > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Ready to book?</p>
                <p className="text-sm text-muted-foreground">
                  {seatsAvailable} seat{seatsAvailable !== 1 ? "s" : ""}{" "}
                  available · ₹{Number(ride.pricePerSeat)} per seat
                </p>
              </div>
              <Button
                onClick={handleBook}
                disabled={isBooking}
                className="gap-2 shrink-0"
                data-ocid="ride.book_button"
              >
                {isBooking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {isBooking ? "Booking..." : "Book Seat"}
              </Button>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p>
                {!isActive
                  ? "This ride is no longer active."
                  : "No seats available."}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}

function PreferenceItem({
  allowed,
  label,
  icon,
}: {
  allowed: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border",
        allowed
          ? "bg-primary/10 border-primary/30 text-primary"
          : "bg-secondary border-border text-muted-foreground line-through opacity-60",
      )}
    >
      {icon}
      {label}
    </div>
  );
}
