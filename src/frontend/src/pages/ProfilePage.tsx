import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  CheckCircle,
  Edit3,
  ExternalLink,
  Linkedin,
  Loader2,
  LogIn,
  LogOut,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { StarRating } from "../components/StarRating";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useMyBookings,
  useMyPostedRides,
  useMyProfile,
  useUpdateProfile,
} from "../hooks/useQueries";
import { isBookingConfirmed, isRideCompleted } from "../types";

interface SocialLinks {
  facebookUrl: string;
  linkedinUrl: string;
}

function getSocialLinks(principalId: string): SocialLinks {
  try {
    const raw = localStorage.getItem(`rydr_social_${principalId}`);
    if (raw) return JSON.parse(raw) as SocialLinks;
  } catch {
    // ignore
  }
  return { facebookUrl: "", linkedinUrl: "" };
}

function saveSocialLinks(principalId: string, links: SocialLinks) {
  localStorage.setItem(`rydr_social_${principalId}`, JSON.stringify(links));
}

export function ProfilePage() {
  const { identity, login, isLoggingIn, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myRides } = useMyPostedRides();
  const { data: myBookings } = useMyBookings();
  const { mutateAsync: updateProfile, isPending: isSaving } =
    useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const principalId = identity?.getPrincipal().toString() ?? "";

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAvatarUrl(profile.avatarUrl || "");
    }
  }, [profile]);

  useEffect(() => {
    if (principalId) {
      const links = getSocialLinks(principalId);
      setFacebookUrl(links.facebookUrl);
      setLinkedinUrl(links.linkedinUrl);
    }
  }, [principalId]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        setAvatarUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!identity) {
    return (
      <main className="container py-16 max-w-lg text-center px-4 sm:px-6">
        <User className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="font-display text-2xl font-black mb-2">
          Sign in to view profile
        </h1>
        <p className="text-muted-foreground mb-6">
          Your profile, ride history, and ratings in one place.
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    try {
      await updateProfile({ name: name.trim(), avatarUrl });
      saveSocialLinks(principalId, { facebookUrl, linkedinUrl });
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  const initials = (profile?.name || "??")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const completedRides =
    myRides?.filter((r) => isRideCompleted(r.status)).length ?? 0;
  const confirmedBookings =
    myBookings?.filter((b) => isBookingConfirmed(b.status)).length ?? 0;

  const hasFacebook = facebookUrl.trim().length > 0;
  const hasLinkedin = linkedinUrl.trim().length > 0;

  return (
    <main className="container py-8 max-w-2xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-black mb-6">My Profile</h1>

        {/* Logout button - visible on mobile */}
        <Button
          variant="outline"
          className="md:hidden w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 mb-6"
          onClick={() => {
            clear();
            navigate({ to: "/welcome" });
          }}
          data-ocid="profile.logout_button"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>

        {/* Profile card */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-6">
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ) : profile ? (
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 text-xl shrink-0">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback className="bg-secondary text-secondary-foreground font-display font-black text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl font-black mb-1 break-words">
                  {profile.name}
                </h2>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <StarRating rating={profile.averageRating} size="md" />
                  <span className="font-medium">
                    {profile.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({Number(profile.ratingCount)} ratings)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate mb-3 max-w-full">
                  {identity.getPrincipal().toString()}
                </p>

                {/* Social verification badges */}
                {(hasFacebook || hasLinkedin) && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {hasFacebook && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                        data-ocid="profile.facebook_link"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span className="font-bold text-[10px] bg-[#1877F2] text-white px-1 py-0.5 rounded">
                          f
                        </span>
                        Verified via Facebook
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    )}
                    {hasLinkedin && (
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                        data-ocid="profile.linkedin_link"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                        Verified via LinkedIn
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2 shrink-0"
                data-ocid="profile.edit_button"
              >
                <Edit3 className="h-3.5 w-3.5" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-3">
                No profile set up yet.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                data-ocid="profile.setup_button"
              >
                Set Up Profile
              </Button>
            </div>
          )}

          {/* Edit form */}
          {isEditing && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleSave}
              className="mt-4 pt-4 border-t border-border space-y-4"
            >
              {/* Profile photo upload */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 text-xl shrink-0">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-black text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handlePhotoSelect}
                      data-ocid="profile.upload_button"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Upload Photo
                    </Button>
                    {avatarUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive"
                        onClick={() => setAvatarUrl("")}
                        data-ocid="profile.delete_button"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Photo
                      </Button>
                    )}
                    <p className="text-[11px] text-muted-foreground">
                      JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Display Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  data-ocid="profile.name_input"
                />
              </div>

              {/* Social profile links */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  Add social profile links to verify your identity and build
                  trust with other riders
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="profile-facebook"
                      className="flex items-center gap-2"
                    >
                      <span className="font-bold text-[11px] bg-[#1877F2] text-white px-1.5 py-0.5 rounded">
                        f
                      </span>
                      Facebook Profile URL
                    </Label>
                    <Input
                      id="profile-facebook"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="https://facebook.com/yourprofile"
                      type="url"
                      data-ocid="profile.facebook_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="profile-linkedin"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="profile-linkedin"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      type="url"
                      data-ocid="profile.linkedin_input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={isSaving}
                className="gap-2"
                data-ocid="profile.save_button"
              >
                {isSaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </motion.form>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard
            label="Rides Posted"
            value={myRides?.length ?? 0}
            icon={<Car className="h-4 w-4 text-primary" />}
          />
          <StatCard
            label="Completed"
            value={completedRides}
            icon={<CheckCircle className="h-4 w-4 text-primary" />}
          />
          <StatCard
            label="Trips Taken"
            value={confirmedBookings}
            icon={<Car className="h-4 w-4 text-primary" />}
          />
          <StatCard
            label="Rating"
            value={
              profile ? `${profile.averageRating.toFixed(1)} \u2605` : "\u2014"
            }
            icon={<User className="h-4 w-4 text-primary" />}
          />
        </div>

        {/* Recent posted rides */}
        {myRides && myRides.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
            <h3 className="font-display font-bold mb-4">Recent Posted Rides</h3>
            <div className="space-y-2">
              {myRides.slice(0, 5).map((ride) => (
                <div
                  key={ride.id.toString()}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0 gap-2"
                >
                  <span className="truncate min-w-0 flex-1">
                    {ride.origin} \u2192 {ride.destination}
                  </span>
                  <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                    <span className="hidden sm:inline">{ride.date}</span>
                    <span className="text-xs">
                      {"active" in ride.status
                        ? "Active"
                        : "completed" in ride.status
                          ? "Done"
                          : "Cancelled"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop sign out */}
        <div className="hidden md:flex justify-end mt-8">
          <Button
            variant="outline"
            className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => {
              clear();
              navigate({ to: "/welcome" });
            }}
            data-ocid="profile.logout_button"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="font-display font-black text-xl sm:text-2xl mb-0.5">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
