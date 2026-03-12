import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Car,
  CheckCircle,
  Cigarette,
  Edit3,
  ExternalLink,
  Linkedin,
  Loader2,
  LogIn,
  LogOut,
  MapPin,
  MessageCircle,
  PawPrint,
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
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import {
  useMyBookings,
  useMyPostedRides,
  useMyProfile,
  useUpdateUserProfile,
} from "../hooks/useQueries";
import { isBookingConfirmed, isRideCompleted } from "../types";

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 200;
      let w = img.width;
      let h = img.height;
      if (w > h) {
        if (w > MAX) {
          h = Math.round((h * MAX) / w);
          w = MAX;
        }
      } else {
        if (h > MAX) {
          w = Math.round((w * MAX) / h);
          h = MAX;
        }
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function ProfilePage() {
  const { identity, login, isLoggingIn, clear, googleUser } =
    useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myRides } = useMyPostedRides();
  const { data: myBookings } = useMyBookings();
  const { mutateAsync: updateUserProfile, isPending: isSaving } =
    useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState(false);

  // Basic info
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");

  // Ride preferences
  const [chatPref, setChatPref] = useState("");
  const [petsPreference, setPetsPreference] = useState("");
  const [smokingPreference, setSmokingPreference] = useState("");
  const [luggagePreference, setLuggagePreference] = useState("");

  // Driver info
  const [carBrand, setCarBrand] = useState("");
  const [carColor, setCarColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  // Social
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [socialError, setSocialError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const principalId = identity?.getPrincipal().toString() ?? "";

  // biome-ignore lint/correctness/useExhaustiveDependencies: googleUser used only for initial default, not a reactive dep
  useEffect(() => {
    if (profile) {
      setName(profile.name || googleUser?.name || "");
      setAvatarUrl(profile.avatarUrl || googleUser?.picture || "");
      setCity(profile.city || "");
      setAbout(profile.about || "");
      setChatPref(profile.chatPref || "");
      setPetsPreference(profile.petsPreference || "");
      setSmokingPreference(profile.smokingPreference || "");
      setLuggagePreference(profile.luggagePreference || "");
      setCarBrand(profile.carBrand || "");
      setCarColor(profile.carColor || "");
      setVehicleType(profile.vehicleType || "");
      setLicensePlate(profile.licensePlate || "");
      // Use backend social links, fall back to localStorage
      const fbFromBackend = profile.facebookUrl || "";
      const liFromBackend = profile.linkedinUrl || "";
      if (fbFromBackend || liFromBackend) {
        setFacebookUrl(fbFromBackend);
        setLinkedinUrl(liFromBackend);
      } else if (principalId) {
        try {
          const raw = localStorage.getItem(`rydr_social_${principalId}`);
          if (raw) {
            const parsed = JSON.parse(raw) as {
              facebookUrl?: string;
              linkedinUrl?: string;
            };
            setFacebookUrl(parsed.facebookUrl || "");
            setLinkedinUrl(parsed.linkedinUrl || "");
          }
        } catch {
          // ignore
        }
      }
    }
  }, [profile, principalId]);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setAvatarUrl(compressed);
    } catch {
      toast.error("Failed to process image. Please try another file.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError("");
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (!facebookUrl.trim() && !linkedinUrl.trim()) {
      setSocialError(
        "At least one social profile link (Facebook or LinkedIn) is required.",
      );
      return;
    }
    try {
      await updateUserProfile({
        name: name.trim(),
        avatarUrl,
        city: city.trim(),
        about: about.trim(),
        chatPref,
        petsPreference,
        smokingPreference,
        luggagePreference,
        carBrand: carBrand.trim(),
        carColor: carColor.trim(),
        vehicleType,
        licensePlate: licensePlate.trim(),
        facebookUrl: facebookUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg && !msg.includes("not a function") && !msg.includes("actor")) {
        toast.error(msg);
      } else {
        toast.error("Unable to update profile. Please try again.");
      }
    }
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
          className="gap-1.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
          data-ocid="nav.login_button"
        >
          {isLoggingIn ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          {isLoggingIn ? "Signing in..." : "Sign in with Google"}
        </Button>
      </main>
    );
  }

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

  const hasFacebook = (profile?.facebookUrl || facebookUrl).trim().length > 0;
  const hasLinkedin = (profile?.linkedinUrl || linkedinUrl).trim().length > 0;
  const displayFacebook = profile?.facebookUrl || facebookUrl;
  const displayLinkedin = profile?.linkedinUrl || linkedinUrl;

  return (
    <main className="container py-8 max-w-2xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-black mb-6">My Profile</h1>

        {/* Mobile logout */}
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

        {/* ── Profile header card ── */}
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
                {profile.city && (
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.city}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <StarRating rating={profile.averageRating} size="md" />
                  <span className="font-medium">
                    {profile.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({Number(profile.ratingCount)} ratings)
                  </span>
                </div>
                {/* Social verification badges */}
                {(hasFacebook || hasLinkedin) && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {hasFacebook && (
                      <a
                        href={displayFacebook}
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
                        href={displayLinkedin}
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

          {/* ── Edit form ── */}
          {isEditing && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleSave}
              className="mt-4 pt-4 border-t border-border space-y-6"
            >
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Basic Information
                </h3>

                {/* Photo upload */}
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
                        JPG, PNG, WebP · auto-compressed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Full Name *</Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    data-ocid="profile.name_input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-city">City / Current Location</Label>
                  <Input
                    id="profile-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Delhi"
                    data-ocid="profile.city_input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-about">About Me</Label>
                  <Textarea
                    id="profile-about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder='e.g. "I travel frequently and enjoy quiet rides."'
                    maxLength={200}
                    rows={3}
                    data-ocid="profile.about_textarea"
                  />
                  <p className="text-[11px] text-muted-foreground text-right">
                    {about.length}/200
                  </p>
                </div>
              </div>

              {/* Section 2: Ride Preferences */}
              <div className="space-y-4 pt-2 border-t border-border">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Ride Preferences
                </h3>

                <PrefToggle
                  label="Chat Preference"
                  icon={<MessageCircle className="h-4 w-4" />}
                  value={chatPref}
                  onChange={setChatPref}
                  options={[
                    { value: "chatty", label: "Chatty during ride" },
                    { value: "quiet", label: "Quiet ride preferred" },
                  ]}
                />

                <PrefToggle
                  label="Pets"
                  icon={<PawPrint className="h-4 w-4" />}
                  value={petsPreference}
                  onChange={setPetsPreference}
                  options={[
                    { value: "allowed", label: "Pets allowed" },
                    { value: "not_allowed", label: "Pets not allowed" },
                  ]}
                />

                <PrefToggle
                  label="Smoking"
                  icon={<Cigarette className="h-4 w-4" />}
                  value={smokingPreference}
                  onChange={setSmokingPreference}
                  options={[
                    { value: "allowed", label: "Smoking allowed" },
                    { value: "not_allowed", label: "No smoking in car" },
                  ]}
                />

                <PrefToggle
                  label="Luggage"
                  icon={<Briefcase className="h-4 w-4" />}
                  value={luggagePreference}
                  onChange={setLuggagePreference}
                  options={[
                    { value: "allowed", label: "Luggage allowed" },
                    { value: "limited", label: "Limited luggage" },
                    { value: "none", label: "No luggage" },
                  ]}
                />
              </div>

              {/* Section 3: Driver Info */}
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    Driver Information
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Fill these if you post rides as a driver
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="car-brand">Car Brand / Model</Label>
                    <Input
                      id="car-brand"
                      value={carBrand}
                      onChange={(e) => setCarBrand(e.target.value)}
                      placeholder="e.g. MG Hector"
                      data-ocid="profile.car_brand_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="car-color">Car Color</Label>
                    <Input
                      id="car-color"
                      value={carColor}
                      onChange={(e) => setCarColor(e.target.value)}
                      placeholder="e.g. Blue"
                      data-ocid="profile.car_color_input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <select
                    id="vehicle-type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-ocid="profile.vehicle_type_select"
                  >
                    <option value="">Select type</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="license-plate">
                    License Plate{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="license-plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="e.g. MH 04 AB 1234"
                    data-ocid="profile.license_plate_input"
                  />
                </div>
              </div>

              {/* Section 4: Social Profile (Mandatory) */}
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    Social Profile *
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    At least one social profile required for trust verification
                  </p>
                </div>

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

                {socialError && (
                  <p
                    className="text-sm text-destructive flex items-center gap-1.5"
                    data-ocid="profile.social_error"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {socialError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full gap-2"
                data-ocid="profile.save_button"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </motion.form>
          )}
        </div>

        {/* ── View mode: About ── */}
        {!isEditing && profile?.about && (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">
              About
            </h3>
            <p className="text-sm leading-relaxed">{profile.about}</p>
          </div>
        )}

        {/* ── View mode: Preferences ── */}
        {!isEditing &&
          profile &&
          (profile.chatPref ||
            profile.petsPreference ||
            profile.smokingPreference ||
            profile.luggagePreference) && (
            <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Ride Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.chatPref && (
                  <PrefChip
                    icon={<MessageCircle className="h-3.5 w-3.5" />}
                    label={
                      profile.chatPref === "chatty"
                        ? "Chatty during ride"
                        : "Quiet ride preferred"
                    }
                  />
                )}
                {profile.petsPreference && (
                  <PrefChip
                    icon={<PawPrint className="h-3.5 w-3.5" />}
                    label={
                      profile.petsPreference === "allowed"
                        ? "Pets allowed"
                        : "Pets not allowed"
                    }
                  />
                )}
                {profile.smokingPreference && (
                  <PrefChip
                    icon={<Cigarette className="h-3.5 w-3.5" />}
                    label={
                      profile.smokingPreference === "allowed"
                        ? "Smoking allowed"
                        : "No smoking in car"
                    }
                  />
                )}
                {profile.luggagePreference && (
                  <PrefChip
                    icon={<Briefcase className="h-3.5 w-3.5" />}
                    label={
                      profile.luggagePreference === "allowed"
                        ? "Luggage allowed"
                        : profile.luggagePreference === "limited"
                          ? "Limited luggage"
                          : "No luggage"
                    }
                  />
                )}
              </div>
            </div>
          )}

        {/* ── View mode: Driver Info ── */}
        {!isEditing && profile && (profile.carBrand || profile.vehicleType) && (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Vehicle
            </h3>
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium">
                  {[
                    profile.carBrand,
                    profile.carColor,
                    profile.vehicleType
                      ? profile.vehicleType.charAt(0).toUpperCase() +
                        profile.vehicleType.slice(1)
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {profile.licensePlate && (
                  <p className="text-sm text-muted-foreground">
                    License: {profile.licensePlate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

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
            value={profile ? `${profile.averageRating.toFixed(1)} ★` : "—"}
            icon={<User className="h-4 w-4 text-primary" />}
          />
        </div>

        {/* Recent rides */}
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
                    {ride.origin} → {ride.destination}
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

function PrefToggle({
  label,
  icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(value === opt.value ? "" : opt.value)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              value === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border text-foreground hover:border-primary/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PrefChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-primary/30 bg-primary/5 text-primary">
      {icon}
      {label}
    </span>
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
