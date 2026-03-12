import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  ChevronRight,
  Cigarette,
  ClipboardCheck,
  Clock,
  MapPin,
  PawPrint,
  Users,
  Zap,
} from "lucide-react";
import type { Ride, UserPublic } from "../types";
import { StarRating } from "./StarRating";

interface RideCardProps {
  ride: Ride;
  driver?: UserPublic | null;
  index?: number;
  matchScore?: number;
}

function MatchBadge({ score }: { score: number }) {
  if (score >= 80) {
    return (
      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
        Great Match
      </span>
    );
  }
  if (score >= 60) {
    return (
      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
        Good Match
      </span>
    );
  }
  if (score >= 40) {
    return (
      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
        Nearby Match
      </span>
    );
  }
  return null;
}

export function RideCard({
  ride,
  driver,
  index = 1,
  matchScore,
}: RideCardProps) {
  const isInstant = "instant" in ride.approvalMode;
  const hasSocialVerified =
    driver && (driver.linkedinUrl?.trim() || driver.facebookUrl?.trim());
  const showRidesCount = driver && (driver.completedRidesCount ?? 0) > 0;
  const showReliability = driver && (driver.reliabilityScore ?? 0) > 0;

  return (
    <div
      data-ocid={`search.ride.item.${index}`}
      className="relative bg-card border border-[#00AEEF]/30 rounded-lg p-4 card-hover group shadow-[0_0_8px_rgba(0,174,239,0.1)]"
    >
      {/* Match badge */}
      {matchScore !== undefined && matchScore > 0 && (
        <MatchBadge score={matchScore} />
      )}

      {/* Route */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="w-px h-8 bg-border" />
          <div className="w-2.5 h-2.5 rounded-full border-2 border-primary" />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              From
            </p>
            <p className="font-semibold truncate">{ride.origin}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              To
            </p>
            <p className="font-semibold truncate">{ride.destination}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-display font-black text-primary">
            &#8377;{Number(ride.pricePerSeat)}
          </p>
          <p className="text-xs text-muted-foreground">per seat</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {ride.date} &middot; {ride.departureTime}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {Number(ride.seatsAvailable)} seats left
        </span>
      </div>

      {/* Preferences */}
      <div className="flex flex-wrap gap-2 mb-4">
        <PreferenceBadge
          allowed={ride.petsAllowed}
          label="Pets"
          icon={<PawPrint className="h-3 w-3" />}
        />
        <PreferenceBadge
          allowed={ride.smokingAllowed}
          label="Smoking"
          icon={<Cigarette className="h-3 w-3" />}
        />
        <PreferenceBadge
          allowed={ride.luggageAllowed}
          label="Luggage"
          icon={<Briefcase className="h-3 w-3" />}
        />
        <Badge
          variant="outline"
          className={cn(
            "text-xs gap-1",
            isInstant
              ? "border-primary/40 text-primary bg-primary/10"
              : "border-muted text-muted-foreground",
          )}
        >
          {isInstant ? (
            <Zap className="h-3 w-3" />
          ) : (
            <ClipboardCheck className="h-3 w-3" />
          )}
          {isInstant ? "Instant" : "Approval"}
        </Badge>
      </div>

      {/* Driver + CTA */}
      <div className="flex items-center justify-between">
        {driver ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={driver.avatarUrl} />
              <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                {driver.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{driver.name}</p>
              <div className="flex items-center gap-1 flex-wrap">
                <StarRating rating={driver.averageRating} size="sm" />
                <span className="text-xs text-muted-foreground">
                  ({Number(driver.ratingCount)})
                </span>
                {showRidesCount && (
                  <span className="text-xs text-muted-foreground">
                    🚗 {driver.completedRidesCount} rides
                  </span>
                )}
                {showReliability && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Reliability {driver.reliabilityScore.toFixed(1)}
                  </span>
                )}
                {hasSocialVerified && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium">
                    ✓ Social verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        <Button
          asChild
          size="sm"
          className="gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant="outline"
          data-ocid={`search.ride.button.${index}`}
        >
          <Link to="/ride/$rideId" params={{ rideId: ride.id.toString() }}>
            View
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PreferenceBadge({
  allowed,
  label,
  icon,
}: {
  allowed: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs gap-1",
        allowed
          ? "border-primary/40 text-primary bg-primary/10"
          : "border-muted text-muted-foreground opacity-50",
      )}
    >
      {icon}
      {label}
    </Badge>
  );
}
