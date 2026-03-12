import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  Car,
  Cigarette,
  ExternalLink,
  Linkedin,
  MapPin,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { StarRating } from "../components/StarRating";
import { useGetUserProfile } from "../hooks/useQueries";

export function UserProfileViewPage() {
  const { userId } = useParams({ strict: false }) as { userId: string };
  const { data: user, isLoading } = useGetUserProfile(userId);

  if (isLoading) {
    return (
      <main
        className="container py-8 max-w-2xl px-4 sm:px-6"
        data-ocid="user_profile.loading_state"
      >
        <Skeleton className="h-6 w-24 mb-6" />
        <div className="bg-card border border-border rounded-xl p-6 mb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
      </main>
    );
  }

  if (!user) {
    return (
      <main
        className="container py-8 max-w-2xl px-4 sm:px-6"
        data-ocid="user_profile.error_state"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="text-center py-16">
          <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h2 className="font-display text-xl font-bold mb-2">
            User not found
          </h2>
          <p className="text-muted-foreground text-sm">
            This profile doesn't exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hasDriverInfo = !!(user.carBrand || user.vehicleType);
  const hasFacebook = !!user.facebookUrl?.trim();
  const hasLinkedin = !!user.linkedinUrl?.trim();
  const hasSocial = hasFacebook || hasLinkedin;

  const vehicleLabel = [
    user.carBrand,
    user.carColor,
    user.vehicleType
      ? user.vehicleType.charAt(0).toUpperCase() + user.vehicleType.slice(1)
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const chatLabel =
    user.chatPref === "chatty"
      ? "Chatty during ride"
      : user.chatPref === "quiet"
        ? "Quiet ride preferred"
        : null;
  const petsLabel =
    user.petsPreference === "allowed"
      ? "Pets allowed"
      : user.petsPreference === "not_allowed"
        ? "Pets not allowed"
        : null;
  const smokingLabel =
    user.smokingPreference === "allowed"
      ? "Smoking allowed"
      : user.smokingPreference === "not_allowed"
        ? "No smoking in car"
        : null;
  const luggageLabel =
    user.luggagePreference === "allowed"
      ? "Luggage allowed"
      : user.luggagePreference === "limited"
        ? "Limited luggage"
        : user.luggagePreference === "none"
          ? "No luggage"
          : null;

  const hasPreferences = chatLabel || petsLabel || smokingLabel || luggageLabel;

  const reliabilityScore = user.reliabilityScore ?? 0;
  const completedRidesCount = user.completedRidesCount ?? 0;
  const driverCancellations = user.driverCancellationCount ?? 0;
  const passengerCancellations = user.passengerCancellationCount ?? 0;
  const isDriver = hasDriverInfo || reliabilityScore > 0;

  return (
    <main className="container py-8 max-w-2xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* ── Profile header ── */}
        <div
          className="bg-card border border-border rounded-xl p-5 sm:p-6 mb-4"
          data-ocid="user_profile.card"
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 text-xl shrink-0">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="bg-secondary text-secondary-foreground font-display font-black text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                <h1 className="font-display text-2xl font-black break-words">
                  {user.name}
                </h1>
                {hasSocial && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium shrink-0">
                    <ShieldCheck className="h-3 w-3" />
                    Social verified
                  </span>
                )}
              </div>
              {user.city && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {user.city}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <StarRating rating={user.averageRating} size="md" />
                <span className="font-medium text-sm">
                  {user.averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({Number(user.ratingCount)} ratings)
                </span>
              </div>

              {/* Driver reliability score */}
              {isDriver && reliabilityScore > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5"
                        fill={
                          s <= Math.round(reliabilityScore) ? "#f59e0b" : "none"
                        }
                        stroke={
                          s <= Math.round(reliabilityScore)
                            ? "#f59e0b"
                            : "currentColor"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Driver Reliability Score: {reliabilityScore.toFixed(1)}/5
                  </span>
                </div>
              )}
              {isDriver && completedRidesCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  🚗 {completedRidesCount} completed rides
                </p>
              )}
              {!isDriver && (
                <p className="text-xs text-muted-foreground">
                  Trust Score: {(user.averageRating || 0).toFixed(1)}/5
                </p>
              )}

              {/* Cancellation warning */}
              {(driverCancellations > 1 || passengerCancellations > 1) && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-500">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {driverCancellations > 1
                    ? `⚠ ${driverCancellations} driver cancellations`
                    : `⚠ ${passengerCancellations} passenger cancellations`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── About ── */}
        {user.about && (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">
              About
            </h2>
            <p className="text-sm leading-relaxed">{user.about}</p>
          </div>
        )}

        {/* ── Ride Preferences ── */}
        {hasPreferences && (
          <div
            className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4"
            data-ocid="user_profile.preferences.panel"
          >
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Ride Preferences
            </h2>
            <div className="space-y-2.5">
              {chatLabel && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>{chatLabel}</span>
                </div>
              )}
              {petsLabel && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <PawPrint className="h-4 w-4 text-primary" />
                  </span>
                  <span>{petsLabel}</span>
                </div>
              )}
              {smokingLabel && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Cigarette className="h-4 w-4 text-primary" />
                  </span>
                  <span>{smokingLabel}</span>
                </div>
              )}
              {luggageLabel && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </span>
                  <span>{luggageLabel}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Vehicle (Driver Info) ── */}
        {hasDriverInfo && (
          <div
            className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4"
            data-ocid="user_profile.vehicle.card"
          >
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Vehicle
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Car className="h-5 w-5 text-primary" />
              </span>
              <div>
                {vehicleLabel && (
                  <p className="font-medium text-sm">{vehicleLabel}</p>
                )}
                {user.licensePlate && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    License: {user.licensePlate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Social Profile ── */}
        {(hasFacebook || hasLinkedin) && (
          <div
            className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4"
            data-ocid="user_profile.social.card"
          >
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Social Profile
            </h2>
            <div className="space-y-3">
              {hasFacebook && (
                <a
                  href={user.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                  data-ocid="user_profile.facebook_link"
                >
                  <span className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0 font-bold text-white text-sm">
                    f
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm font-medium">
                        Verified via Facebook
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {user.facebookUrl}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              )}
              {hasLinkedin && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                  data-ocid="user_profile.linkedin_link"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0">
                    <Linkedin className="h-4 w-4 text-white" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm font-medium">
                        Verified via LinkedIn
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {user.linkedinUrl}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
