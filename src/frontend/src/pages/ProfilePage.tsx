import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  CheckCircle,
  Edit3,
  ExternalLink,
  Linkedin,
  Loader2,
  LogOut,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Star,
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

/**
 * Calculate profile completion (0–6 fields).
 * Fields: photo, name, phone, city, about, social/vehicle
 */
function calcCompletion(fields: {
  avatarUrl: string;
  name: string;
  phoneNumber: string;
  city: string;
  about: string;
  socialOrVehicle: boolean;
}): number {
  let done = 0;
  if (fields.avatarUrl) done++;
  if (fields.name.trim()) done++;
  if (fields.phoneNumber.trim()) done++;
  if (fields.city.trim()) done++;
  if (fields.about.trim()) done++;
  if (fields.socialOrVehicle) done++;
  return done;
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

  // Role & contact
  const [userRole, setUserRole] = useState<"driver" | "rider" | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [isPhoneHidden, setIsPhoneHidden] = useState(false);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: googleUser used only for initial default
  useEffect(() => {
    if (profile) {
      setName(profile.name || googleUser?.name || "");
      setAvatarUrl(profile.avatarUrl || googleUser?.picture || "");
      setCity(profile.city || "");
      setAbout(profile.about || "");
      setCarBrand(profile.carBrand || "");
      setCarColor(profile.carColor || "");
      setVehicleType(profile.vehicleType || "");
      setLicensePlate(profile.licensePlate || "");
      setUserRole((profile.userRole as "driver" | "rider" | "") || "");
      setPhoneNumber(profile.phoneNumber || "");
      setGender(profile.gender || "");
      setIsPhoneHidden(profile.isPhoneHidden || false);

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
    if (userRole === "driver" && !facebookUrl.trim() && !linkedinUrl.trim()) {
      setSocialError(
        "Drivers must add a LinkedIn or Facebook profile to build rider trust.",
      );
      return;
    }
    try {
      await updateUserProfile({
        name: name.trim(),
        avatarUrl,
        city: city.trim(),
        about: about.trim(),
        chatPref: "",
        petsPreference: "",
        smokingPreference: "",
        luggagePreference: "",
        carBrand: userRole === "driver" ? carBrand.trim() : "",
        carColor: userRole === "driver" ? carColor.trim() : "",
        vehicleType: userRole === "driver" ? vehicleType : "",
        licensePlate: userRole === "driver" ? licensePlate.trim() : "",
        facebookUrl: facebookUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
      });
      if (principalId) {
        try {
          const extra = { userRole, phoneNumber, gender, isPhoneHidden };
          localStorage.setItem(
            `rydr_profile_ext_${principalId}`,
            JSON.stringify(extra),
          );
        } catch {
          /* ignore */
        }
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: unknown) {
      // Never render raw error to DOM — log to console and show friendly message
      console.error("[ProfilePage] handleSave error:", err);
      toast.error("Unable to update profile. Please try again.");
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

  const initials = (profile?.name || googleUser?.name || "??")
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

  // Profile completion progress
  const editSocialOrVehicle =
    userRole === "driver"
      ? !!(carBrand.trim() || vehicleType)
      : !!(facebookUrl.trim() || linkedinUrl.trim());
  const viewSocialOrVehicle =
    userRole === "driver"
      ? !!(profile?.carBrand || profile?.vehicleType)
      : !!(profile?.facebookUrl || profile?.linkedinUrl);
  const completionCount = calcCompletion({
    avatarUrl: isEditing ? avatarUrl : profile?.avatarUrl || "",
    name: isEditing ? name : profile?.name || "",
    phoneNumber: isEditing ? phoneNumber : profile?.phoneNumber || "",
    city: isEditing ? city : profile?.city || "",
    about: isEditing ? about : profile?.about || "",
    socialOrVehicle: isEditing ? editSocialOrVehicle : viewSocialOrVehicle,
  });
  const completionPct = Math.round((completionCount / 6) * 100);

  return (
    <main className="container py-6 max-w-2xl px-4 sm:px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-black">My Profile</h1>
          <Button
            variant="outline"
            className="md:hidden gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 text-sm"
            size="sm"
            onClick={() => {
              clear();
              navigate({ to: "/welcome" });
            }}
            data-ocid="profile.logout_button"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </Button>
        </div>

        {/* ── Profile completion bar ── */}
        {!profileLoading && (
          <div
            className="bg-card border border-border rounded-xl p-4"
            data-ocid="profile.completion.card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Profile Completion</span>
              <span
                className="text-sm font-bold text-primary"
                data-ocid="profile.completion.success_state"
              >
                {completionCount} of 6 complete
              </span>
            </div>
            <Progress value={completionPct} className="h-2" />
            {completionCount < 6 && (
              <p className="text-xs text-muted-foreground mt-2">
                Complete your profile to build trust with riders and drivers.
              </p>
            )}
          </div>
        )}

        {/* ── Profile header card ── */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-20 w-20 text-xl ring-2 ring-primary/30">
                  <AvatarImage
                    src={profile?.avatarUrl || googleUser?.picture}
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-display font-black text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {completionCount === 6 && (
                  <span className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl font-black mb-1 break-words">
                  {profile?.name || googleUser?.name || "Your Name"}
                </h2>
                {profile?.city && (
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.city}
                  </p>
                )}
                {userRole && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium mb-2 ${
                      userRole === "driver"
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {userRole === "driver" ? "🚗 Driver" : "🧑\u200d💼 Rider"}
                  </span>
                )}
                {profile && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <StarRating rating={profile.averageRating} size="md" />
                    <span className="font-medium text-sm">
                      {profile.averageRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({Number(profile.ratingCount)} ratings)
                    </span>
                  </div>
                )}
                {(hasFacebook || hasLinkedin) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hasFacebook && (
                      <a
                        href={displayFacebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                        data-ocid="profile.facebook_link"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        Facebook Verified
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    )}
                    {hasLinkedin && (
                      <a
                        href={displayLinkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                        data-ocid="profile.linkedin_link"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        <Linkedin className="h-3 w-3 text-[#0A66C2]" />
                        LinkedIn Verified
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
          )}

          {/* ── Edit form ── */}
          {isEditing && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSave}
              className="mt-4 pt-4 border-t border-border space-y-6"
            >
              {/* Role Selector */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  How will you use RYDR?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole("driver")}
                    data-ocid="profile.role_driver.toggle"
                    className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all text-center ${
                      userRole === "driver"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    🚗 Post Rides
                    <span className="block text-xs font-normal mt-0.5 opacity-80">
                      Driver
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole("rider")}
                    data-ocid="profile.role_rider.toggle"
                    className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all text-center ${
                      userRole === "rider"
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    🧑\u200d💼 Book Rides
                    <span className="block text-xs font-normal mt-0.5 opacity-80">
                      Rider
                    </span>
                  </button>
                </div>
              </div>

              {/* Section: Basic Information */}
              <div className="space-y-4 pt-2 border-t border-border">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  Basic Information
                </h3>

                {/* Photo upload */}
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Avatar className="h-16 w-16 shrink-0 ring-2 ring-border">
                      <AvatarImage src={avatarUrl} className="object-cover" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground font-black text-xl">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="profile-city">City</Label>
                    <Input
                      id="profile-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi"
                      data-ocid="profile.city_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="profile-phone"
                      className="flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5" /> Mobile Number
                    </Label>
                    <Input
                      id="profile-phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 9876543210"
                      type="tel"
                      data-ocid="profile.phone.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-gender">Gender</Label>
                  <select
                    id="profile-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-ocid="profile.gender.select"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not">Prefer not to say</option>
                  </select>
                </div>

                {gender === "female" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-medium">Keep number private</p>
                      <p className="text-xs text-muted-foreground">
                        Reveal phone number only after ride acceptance
                      </p>
                    </div>
                    <Switch
                      checked={isPhoneHidden}
                      onCheckedChange={setIsPhoneHidden}
                      data-ocid="profile.phone_hidden.switch"
                    />
                  </div>
                )}

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

              {/* Section: Driver Info — only for drivers */}
              {userRole === "driver" && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <div>
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      Driver Information
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Required for posting rides
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
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
                </div>
              )}

              {/* Section: Social Profile */}
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    Social Profile{userRole === "driver" ? " *" : ""}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {userRole === "driver"
                      ? "Mandatory for drivers — helps riders verify your identity"
                      : "Optional — helps build trust with other users"}
                  </p>
                </div>

                {userRole === "driver" && (
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-primary">
                        Adding a social profile helps passengers verify your
                        identity and increases booking rates.
                      </p>
                    </div>
                  </div>
                )}

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

        {/* ── View mode sections ── */}
        {!isEditing && (
          <>
            {/* Personal Info section */}
            {profile && (profile.about || profile.city) && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  About
                </h3>
                {profile.about && (
                  <p className="text-sm leading-relaxed mb-2">
                    {profile.about}
                  </p>
                )}
                {profile.city && (
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {profile.city}
                  </p>
                )}
              </div>
            )}

            {/* Driver Info */}
            {profile && (profile.carBrand || profile.vehicleType) && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  Vehicle
                </h3>
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold">
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

            {/* Trust & Ratings */}
            <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Trust &amp; Ratings
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Rides Posted"
                  value={myRides?.length ?? 0}
                  icon={<Car className="h-4 w-4 text-primary" />}
                />
                <StatCard
                  label="Completed"
                  value={completedRides}
                  icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                  label="Trips Taken"
                  value={confirmedBookings}
                  icon={<User className="h-4 w-4 text-primary" />}
                />
                <StatCard
                  label="Rating"
                  value={
                    profile ? `${profile.averageRating.toFixed(1)} ★` : "—"
                  }
                  icon={<Star className="h-4 w-4 text-amber-400" />}
                />
              </div>
            </div>

            {/* Recent Activity */}
            {myRides && myRides.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Recent Activity
                </h3>
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
                        <span className="hidden sm:inline text-xs">
                          {ride.date}
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                            "active" in ride.status
                              ? "bg-primary/10 text-primary"
                              : "completed" in ride.status
                                ? "bg-green-500/10 text-green-400"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
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
          </>
        )}

        {/* Desktop sign out */}
        <div className="hidden md:flex justify-end mt-4">
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
    <div className="bg-background border border-border rounded-lg p-3 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground truncate">{label}</span>
        {icon}
      </div>
      <p className="text-xl font-display font-black">{value}</p>
    </div>
  );
}
