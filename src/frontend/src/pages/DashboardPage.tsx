import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Car,
  CheckCircle,
  Clock,
  LayoutDashboard,
  Loader2,
  LogIn,
  MapPin,
  PlusCircle,
  Star,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AdBanner } from "../components/AdBanner";
import { InteractiveStarRating } from "../components/StarRating";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useApproveBooking,
  useBookingRequestsForDriver,
  useCompleteRide,
  useMyBookings,
  useMyPostedRides,
  useRateDriver,
  useRejectBooking,
} from "../hooks/useQueries";
import type { Booking, Ride } from "../types";
import {
  getBookingStatusLabel,
  getRideStatusLabel,
  isBookingConfirmed,
  isBookingPending,
  isRideActive,
  isRideCompleted,
} from "../types";

export function DashboardPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();

  const { data: myRides, isLoading: ridesLoading } = useMyPostedRides();
  const { data: myBookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: bookingRequests, isLoading: requestsLoading } =
    useBookingRequestsForDriver();

  const { mutateAsync: completeRide, isPending: isCompleting } =
    useCompleteRide();
  const { mutateAsync: approveBooking, isPending: isApproving } =
    useApproveBooking();
  const { mutateAsync: rejectBooking, isPending: isRejecting } =
    useRejectBooking();
  const { mutateAsync: rateDriver, isPending: isRating } = useRateDriver();

  const [ratingModal, setRatingModal] = useState<{
    open: boolean;
    bookingId: bigint | null;
  }>({
    open: false,
    bookingId: null,
  });
  const [selectedRating, setSelectedRating] = useState(5);

  if (!identity) {
    return (
      <main className="container py-16 max-w-lg text-center">
        <LayoutDashboard className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="font-display text-2xl font-black mb-2">
          Sign in to view dashboard
        </h1>
        <p className="text-muted-foreground mb-6">
          Track your rides, bookings, and requests.
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

  const handleCompleteRide = async (rideId: bigint, _index: number) => {
    try {
      await completeRide(rideId);
      toast.success("Ride marked as completed!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to complete ride");
    }
  };

  const handleApprove = async (bookingId: bigint) => {
    try {
      await approveBooking(bookingId);
      toast.success("Booking approved!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve booking");
    }
  };

  const handleReject = async (bookingId: bigint) => {
    try {
      await rejectBooking(bookingId);
      toast.success("Booking rejected.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject booking");
    }
  };

  const openRatingModal = (bookingId: bigint) => {
    setRatingModal({ open: true, bookingId });
    setSelectedRating(5);
  };

  const handleSubmitRating = async () => {
    if (!ratingModal.bookingId) return;
    try {
      await rateDriver({
        bookingId: ratingModal.bookingId,
        rating: BigInt(selectedRating),
      });
      toast.success("Thanks for your rating!");
      setRatingModal({ open: false, bookingId: null });
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit rating");
    }
  };

  return (
    <main className="container py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your rides and bookings
            </p>
          </div>
          <Button asChild className="gap-2" data-ocid="nav.post_ride_link">
            <Link to="/post-ride">
              <PlusCircle className="h-4 w-4" />
              Post Ride
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="my-rides">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger
              value="my-rides"
              data-ocid="dashboard.my_rides_tab"
              className="flex-1 md:flex-none"
            >
              My Rides
              {myRides && myRides.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {myRides.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="my-bookings"
              data-ocid="dashboard.my_bookings_tab"
              className="flex-1 md:flex-none"
            >
              My Bookings
              {myBookings && myBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {myBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              data-ocid="dashboard.requests_tab"
              className="flex-1 md:flex-none"
            >
              Requests
              {bookingRequests &&
                bookingRequests.filter((b) => isBookingPending(b.status))
                  .length > 0 && (
                  <Badge className="ml-2 text-xs">
                    {
                      bookingRequests.filter((b) => isBookingPending(b.status))
                        .length
                    }
                  </Badge>
                )}
            </TabsTrigger>
          </TabsList>

          {/* My Rides Tab */}
          <TabsContent value="my-rides">
            {ridesLoading ? (
              <div
                className="space-y-3"
                data-ocid="dashboard.rides_loading_state"
              >
                {[1, 2].map((i) => (
                  <RideRowSkeleton key={i} />
                ))}
              </div>
            ) : !myRides || myRides.length === 0 ? (
              <EmptyState
                icon={<Car className="h-10 w-10 opacity-30" />}
                title="No rides posted yet"
                desc="Post your first ride to start sharing travel costs."
                action={{ label: "Post a Ride", href: "/post-ride" }}
                dataOcid="dashboard.rides_empty_state"
              />
            ) : (
              <div className="space-y-3">
                {myRides.map((ride, i) => (
                  <RideRow
                    key={ride.id.toString()}
                    ride={ride}
                    index={i + 1}
                    onComplete={handleCompleteRide}
                    isCompleting={isCompleting}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="my-bookings">
            {bookingsLoading ? (
              <div
                className="space-y-3"
                data-ocid="dashboard.bookings_loading_state"
              >
                {[1, 2].map((i) => (
                  <RideRowSkeleton key={i} />
                ))}
              </div>
            ) : !myBookings || myBookings.length === 0 ? (
              <EmptyState
                icon={<MapPin className="h-10 w-10 opacity-30" />}
                title="No bookings yet"
                desc="Search for rides and book your first trip."
                action={{ label: "Find a Ride", href: "/" }}
                dataOcid="dashboard.bookings_empty_state"
              />
            ) : (
              <div className="space-y-3">
                {myBookings.map((booking, i) => (
                  <BookingRow
                    key={booking.id.toString()}
                    booking={booking}
                    index={i + 1}
                    onRate={() => openRatingModal(booking.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            {requestsLoading ? (
              <div
                className="space-y-3"
                data-ocid="dashboard.requests_loading_state"
              >
                {[1, 2].map((i) => (
                  <RideRowSkeleton key={i} />
                ))}
              </div>
            ) : !bookingRequests || bookingRequests.length === 0 ? (
              <EmptyState
                icon={<Clock className="h-10 w-10 opacity-30" />}
                title="No booking requests"
                desc="When riders request your rides, they'll appear here."
                dataOcid="dashboard.requests_empty_state"
              />
            ) : (
              <div className="space-y-3">
                {bookingRequests.map((booking, i) => (
                  <RequestRow
                    key={booking.id.toString()}
                    booking={booking}
                    index={i + 1}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    isApproving={isApproving}
                    isRejecting={isRejecting}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Ad banner — passenger/driver dashboard */}
      <div className="mt-8 flex justify-center">
        <AdBanner placement="passenger-dashboard" size="rectangle" />
      </div>

      {/* Rating Modal */}
      <Dialog
        open={ratingModal.open}
        onOpenChange={(o) => setRatingModal((prev) => ({ ...prev, open: o }))}
      >
        <DialogContent data-ocid="dashboard.rate_dialog">
          <DialogHeader>
            <DialogTitle className="font-display font-black">
              Rate your driver
            </DialogTitle>
            <DialogDescription>
              How was your trip? Your feedback helps the community.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <InteractiveStarRating
              value={selectedRating}
              onChange={setSelectedRating}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setRatingModal({ open: false, bookingId: null })}
              data-ocid="dashboard.rate_cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={isRating}
              data-ocid="dashboard.rate_confirm_button"
            >
              {isRating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function RideRow({
  ride,
  index,
  onComplete,
  isCompleting,
}: {
  ride: Ride;
  index: number;
  onComplete: (id: bigint, index: number) => void;
  isCompleting: boolean;
}) {
  const isActive = isRideActive(ride.status);
  const isCompleted = isRideCompleted(ride.status);

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      data-ocid={`dashboard.ride_item.${index}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium truncate">
            {ride.origin} → {ride.destination}
          </p>
          <StatusBadge
            label={getRideStatusLabel(ride.status)}
            variant={
              isActive ? "active" : isCompleted ? "completed" : "cancelled"
            }
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {ride.date} · {ride.departureTime} · {Number(ride.seatsAvailable)}/
          {Number(ride.totalSeats)} seats · ₹{Number(ride.pricePerSeat)}/seat
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button asChild variant="outline" size="sm">
          <Link to="/ride/$rideId" params={{ rideId: ride.id.toString() }}>
            View
          </Link>
        </Button>
        {isActive && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onComplete(ride.id, index)}
            disabled={isCompleting}
            data-ocid={`dashboard.complete_ride_button.${index}`}
          >
            {isCompleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            )}
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}

function BookingRow({
  booking,
  index,
  onRate,
}: {
  booking: Booking;
  index: number;
  onRate: () => void;
}) {
  const isConfirmed = isBookingConfirmed(booking.status);
  const hasRated = booking.ratingGiven.length > 0;

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      data-ocid={`dashboard.booking_item.${index}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium">Ride #{booking.rideId.toString()}</p>
          <StatusBadge
            label={getBookingStatusLabel(booking.status)}
            variant={
              isBookingConfirmed(booking.status)
                ? "active"
                : isBookingPending(booking.status)
                  ? "pending"
                  : "cancelled"
            }
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Booked · ID #{booking.id.toString()}
        </p>
      </div>
      {isConfirmed && !hasRated && (
        <Button
          size="sm"
          variant="outline"
          onClick={onRate}
          className="gap-1.5 shrink-0"
          data-ocid={`dashboard.rate_button.${index}`}
        >
          <Star className="h-3.5 w-3.5" />
          Rate Driver
        </Button>
      )}
      {hasRated && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          Rated {Number(booking.ratingGiven[0])}/5
        </div>
      )}
    </div>
  );
}

function RequestRow({
  booking,
  index,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: {
  booking: Booking;
  index: number;
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
  isApproving: boolean;
  isRejecting: boolean;
}) {
  const isPending = isBookingPending(booking.status);

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      data-ocid={`dashboard.request_item.${index}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium">
            Booking Request #{booking.id.toString()}
          </p>
          <StatusBadge
            label={getBookingStatusLabel(booking.status)}
            variant={
              isBookingConfirmed(booking.status)
                ? "active"
                : isPending
                  ? "pending"
                  : "cancelled"
            }
          />
        </div>
        <p className="text-sm text-muted-foreground">
          For ride #{booking.rideId.toString()}
        </p>
      </div>
      {isPending && (
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={() => onApprove(booking.id)}
            disabled={isApproving || isRejecting}
            className="gap-1.5"
            data-ocid={`dashboard.approve_button.${index}`}
          >
            {isApproving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle className="h-3.5 w-3.5" />
            )}
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onReject(booking.id)}
            disabled={isApproving || isRejecting}
            className="gap-1.5"
            data-ocid={`dashboard.reject_button.${index}`}
          >
            {isRejecting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  desc,
  action,
  dataOcid,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action?: { label: string; href: string };
  dataOcid: string;
}) {
  return (
    <div
      className="text-center py-16 text-muted-foreground"
      data-ocid={dataOcid}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <p className="text-lg font-medium text-foreground mb-1">{title}</p>
      <p className="text-sm mb-4">{desc}</p>
      {action && (
        <Button asChild variant="outline" size="sm">
          <Link to={action.href as any}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}

function RideRowSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

type StatusVariant = "active" | "completed" | "cancelled" | "pending";

function StatusBadge({
  label,
  variant,
}: { label: string; variant: StatusVariant }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs shrink-0",
        variant === "active" && "border-primary/40 text-primary bg-primary/10",
        variant === "completed" && "border-muted text-muted-foreground",
        variant === "cancelled" &&
          "border-destructive/40 text-destructive bg-destructive/10",
        variant === "pending" &&
          "border-yellow-500/40 text-yellow-500 bg-yellow-500/10",
      )}
    >
      {label}
    </Badge>
  );
}
