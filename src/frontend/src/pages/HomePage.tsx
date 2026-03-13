import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  ChevronDown,
  Clock,
  LogIn,
  MapPin,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { AdBanner } from "../components/AdBanner";
import { LocationAutocomplete } from "../components/LocationAutocomplete";
import type { LocationResult } from "../components/LocationAutocomplete";
import { RideCard } from "../components/RideCard";
import { useInternetIdentity } from "../hooks/useGoogleAuth";
import { useSearchRides } from "../hooks/useQueries";
import { scoreRides } from "../utils/rideMatching";

const RYDR_SEARCHES_KEY = "rydr_recent_searches";

interface RecentSearch {
  origin: string;
  destination: string;
  date: string;
}

function loadRecentSearches(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(RYDR_SEARCHES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentSearch[];
  } catch {
    return [];
  }
}

function saveRecentSearch(s: RecentSearch) {
  try {
    const existing = loadRecentSearches().filter(
      (r) => !(r.origin === s.origin && r.destination === s.destination),
    );
    const updated = [s, ...existing].slice(0, 5);
    localStorage.setItem(RYDR_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

const FEATURES = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Instant Booking",
    desc: "Book in seconds with instant confirmation or driver approval.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Route Matching",
    desc: "Smart matching finds rides on your exact route.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community Verified",
    desc: "Rated drivers, verified profiles, trusted community.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Safe Rides",
    desc: "Verified profiles and community ratings keep you safe.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [originCoords, setOriginCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destCoords, setDestCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
  });
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [filterQuiet, setFilterQuiet] = useState(false);
  const [filterPets, setFilterPets] = useState(false);
  const [filterSmoking, setFilterSmoking] = useState(false);
  const [filterLuggage, setFilterLuggage] = useState(false);

  useEffect(() => {
    setRecentSearches(loadRecentSearches().slice(0, 2));
  }, []);

  const { data: searchResults, isLoading } = useSearchRides(
    searchParams.origin,
    searchParams.destination,
    searchParams.date,
    searchEnabled,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    const s: RecentSearch = { origin, destination, date };
    saveRecentSearch(s);
    setRecentSearches(loadRecentSearches().slice(0, 2));
    setSearchParams({ origin, destination, date });
    setSearchEnabled(true);
  };

  const applyRecentSearch = (s: RecentSearch) => {
    setOrigin(s.origin);
    setDestination(s.destination);
    setDate(s.date);
    setOriginCoords(null);
    setDestCoords(null);
  };

  const handleOriginSelect = (result: LocationResult) => {
    setOrigin(result.label);
    setOriginCoords({ lat: result.lat, lng: result.lng });
  };

  const handleDestSelect = (result: LocationResult) => {
    setDestination(result.label);
    setDestCoords({ lat: result.lat, lng: result.lng });
  };

  const scoredRides = useMemo(() => {
    if (!searchResults) return [];
    let rides = searchResults;
    if (filterQuiet)
      rides = rides.filter((r: any) => r.chatPreference === "quiet");
    if (filterPets) rides = rides.filter((r: any) => r.petsAllowed === true);
    if (filterSmoking)
      rides = rides.filter((r: any) => r.smokingAllowed === true);
    if (filterLuggage)
      rides = rides.filter((r: any) => r.luggageAllowed === true);
    return scoreRides(rides, originCoords, destCoords, new Map());
  }, [
    searchResults,
    originCoords,
    destCoords,
    filterQuiet,
    filterPets,
    filterSmoking,
    filterLuggage,
  ]);

  return (
    <main>
      {/* ── Hero Search Section ─────────────────────────────── */}
      <section
        className="relative py-10 md:py-14"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.10 0.04 240), oklch(0.09 0.03 240))",
          borderBottom: "1px solid oklch(0.22 0.04 240 / 0.5)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.69 0.15 220 / 0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="container relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-black mb-1 leading-tight">
              Where are you going?
            </h1>
            <p className="text-muted-foreground text-sm mb-5">
              Find affordable rides across India.
            </p>
          </motion.div>

          {/* Search form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-card border border-[#00AEEF]/40 rounded-2xl p-4 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="search-origin"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  From
                </Label>
                <LocationAutocomplete
                  id="search-origin"
                  placeholder="City or address"
                  value={origin}
                  onChange={setOrigin}
                  onSelect={handleOriginSelect}
                  icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                  data-ocid="search.origin_input"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="search-destination"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  To
                </Label>
                <LocationAutocomplete
                  id="search-destination"
                  placeholder="City or address"
                  value={destination}
                  onChange={setDestination}
                  onSelect={handleDestSelect}
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                  data-ocid="search.destination_input"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="search-date"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Date
                </Label>
                <input
                  id="search-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors [color-scheme:dark]"
                  data-ocid="search.date_input"
                />
              </div>
            </div>
            <div className="mt-3">
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 h-11"
                disabled={!origin.trim() || !destination.trim()}
                data-ocid="search.submit_button"
              >
                <Search className="h-4 w-4" />
                Search Rides
              </Button>
            </div>

            {/* Advanced Filters */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setAdvancedOpen((o) => !o)}
                data-ocid="search.advanced_toggle"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${advancedOpen ? "rotate-180" : ""}`}
                />
                Advanced Filters
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: advancedOpen ? "200px" : "0px",
                  opacity: advancedOpen ? 1 : 0,
                }}
              >
                <div className="pt-3 pb-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterQuiet}
                      onChange={(e) => setFilterQuiet(e.target.checked)}
                      data-ocid="search.quiet_checkbox"
                      className="rounded border-border accent-primary"
                    />
                    <span className="text-muted-foreground">
                      Quiet ride only
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterPets}
                      onChange={(e) => setFilterPets(e.target.checked)}
                      data-ocid="search.pets_checkbox"
                      className="rounded border-border accent-primary"
                    />
                    <span className="text-muted-foreground">Pets allowed</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterSmoking}
                      onChange={(e) => setFilterSmoking(e.target.checked)}
                      data-ocid="search.smoking_checkbox"
                      className="rounded border-border accent-primary"
                    />
                    <span className="text-muted-foreground">
                      Smoking allowed
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterLuggage}
                      onChange={(e) => setFilterLuggage(e.target.checked)}
                      data-ocid="search.luggage_checkbox"
                      className="rounded border-border accent-primary"
                    />
                    <span className="text-muted-foreground">
                      Luggage allowed
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.form>

          {/* Login CTA — shown only when not signed in */}
          {!identity && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="mt-3"
            >
              <Button
                type="button"
                size="lg"
                onClick={() => login()}
                className="w-full gap-2 h-11 font-semibold"
                style={{
                  background: "#00AEEF",
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(0,174,239,0.3)",
                }}
                data-ocid="home.login_button"
              >
                <LogIn className="h-4 w-4" />
                Sign In to Book Rides
              </Button>
            </motion.div>
          )}

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Recent searches
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="text-xs text-primary hover:underline font-medium"
                  data-ocid="search.more_button"
                >
                  More
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s, i) => (
                  <button
                    key={`${s.origin}-${s.destination}`}
                    type="button"
                    onClick={() => applyRecentSearch(s)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00AEEF]/30 bg-card hover:border-[#00AEEF]/60 hover:bg-primary/5 text-sm transition-colors"
                    data-ocid={
                      `search.recent_search.${i + 1}` as `search.recent_search.${number}`
                    }
                  >
                    <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate max-w-[180px]">
                      {s.origin} &rarr; {s.destination}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* AdSense placeholder */}
          <div
            className="w-full rounded-lg flex items-center justify-center text-xs text-muted-foreground/50 mt-4"
            style={{ minHeight: "90px", background: "transparent" }}
            data-ad-placement="home-below-search"
            data-ocid="home.adsense_placeholder"
          >
            {import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID ? null : null}
          </div>
        </div>
      </section>

      {/* ── Search Results ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {searchEnabled && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mb-10 pt-8"
          >
            <h2 className="font-display text-xl font-black mb-4">
              {isLoading
                ? "Searching\u2026"
                : searchResults && searchResults.length > 0
                  ? `${searchResults.length} ride${searchResults.length !== 1 ? "s" : ""} found`
                  : "No exact ride found. Showing nearby matches."}
            </h2>

            {isLoading && (
              <div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                data-ocid="search.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-[#00AEEF]/20 rounded-lg p-4 space-y-3"
                  >
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && searchResults && searchResults.length === 0 && (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="search.empty_state"
              >
                <Car className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-1">
                  No exact ride found. Showing nearby matches.
                </p>
                <p className="text-sm mb-4">
                  Try different dates or locations, or{" "}
                  <a href="/post-ride" className="text-primary hover:underline">
                    post your own ride
                  </a>
                  .
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/40 text-primary hover:bg-primary/10"
                  data-ocid="search.notify.button"
                  onClick={() => {
                    import("sonner").then(({ toast }) => {
                      toast.success(
                        "We'll alert you when a ride is available on this route.",
                      );
                    });
                  }}
                >
                  🔔 Notify me when a ride is available
                </Button>
              </div>
            )}

            {!isLoading && searchResults && searchResults.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scoredRides.map(({ ride, score }, i) => (
                  <motion.div
                    key={ride.id.toString()}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <RideCard ride={ride} index={i + 1} matchScore={score} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Ad banner */}
      <div className="container mb-6 flex justify-center">
        <AdBanner
          placement="home-banner"
          size="leaderboard"
          className="hidden md:flex md:justify-center"
        />
        <AdBanner
          placement="home-banner"
          size="mobile-banner"
          className="flex md:hidden justify-center"
        />
      </div>

      {/* ── How it works (replaces sample rides) ──────────────── */}
      {!searchEnabled && (
        <section className="container mb-14">
          <h2 className="font-display text-xl font-black mb-6">
            How RYDR works
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Search a ride",
                desc: "Enter your origin, destination and date. Our smart matching engine finds drivers on your route.",
              },
              {
                step: "2",
                title: "Book your seat",
                desc: "Select a ride that suits you, pay your share, and get instant or driver-approved confirmation.",
              },
              {
                step: "3",
                title: "Travel together",
                desc: "Meet your driver, enjoy the ride, and rate each other after arrival. Safe, simple, affordable.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-[#00AEEF]/30 rounded-xl p-5"
                data-ocid={
                  `home.howit.item.${i + 1}` as `home.howit.item.${number}`
                }
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black mb-3"
                  style={{ background: "#00AEEF", color: "#fff" }}
                >
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Feature highlights ──────────────────────────────── */}
      <section className="container mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-[#00AEEF]/20 rounded-xl p-4"
            >
              <div className="text-primary mb-3">{f.icon}</div>
              <h3 className="font-display font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ───────────────────────────────────────── */}
      <section className="container mb-8">
        <div className="flex items-center justify-between p-5 md:p-8 rounded-2xl border border-[#00AEEF]/20 bg-card">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-black mb-1">
              Ready to ride smarter?
            </h2>
            <p className="text-sm text-muted-foreground">
              Post a ride or find one going your way.
            </p>
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <Button
              asChild
              size="sm"
              className="gap-1.5 hidden sm:flex"
              data-ocid="home.post_ride_button"
            >
              <a href="/post-ride">Post Ride</a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5"
              data-ocid="home.find_ride_button"
            >
              <a href="/#search">Find Ride</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
