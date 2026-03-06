import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Car,
  MapPin,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RideCard } from "../components/RideCard";
import { TrustSeal } from "../components/TrustSeal";
import { useSearchRides } from "../hooks/useQueries";

const SAMPLE_RIDES = [
  {
    origin: "Mumbai Central",
    destination: "Pune Station",
    date: "2026-03-10",
    time: "08:00",
    price: 450,
    seats: 3,
    driver: "Rajesh Kumar",
    rating: 4.8,
    trips: 127,
  },
  {
    origin: "Delhi Connaught Place",
    destination: "Agra Taj Mahal",
    date: "2026-03-11",
    time: "06:30",
    price: 350,
    seats: 2,
    driver: "Priya Sharma",
    rating: 4.9,
    trips: 203,
  },
  {
    origin: "Bangalore MG Road",
    destination: "Mysore Palace",
    date: "2026-03-12",
    time: "07:00",
    price: 280,
    seats: 4,
    driver: "Arjun Patel",
    rating: 4.7,
    trips: 89,
  },
];

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
    title: "Secure & Blockchain",
    desc: "Your data is secured on the Internet Computer blockchain.",
  },
];

export function HomePage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const { data: searchResults, isLoading } = useSearchRides(
    searchParams.origin,
    searchParams.destination,
    searchParams.date,
    searchEnabled,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    setSearchParams({ origin, destination, date });
    setSearchEnabled(true);
  };

  return (
    <main>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/rydr-hero-banner.dim_1920x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "65vh",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Yellow tint at bottom for transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.08 0 0))",
          }}
        />

        <div className="relative container py-20 md:py-28 flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img
              src="/assets/uploads/file_00000000650c720883073dd037e87b31-1.png"
              alt="RYDR"
              className="h-24 w-auto mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight mb-4 text-white">
              Every seat <span className="text-gradient">matters.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-xl mx-auto">
              Post your ride or find one — RYDR connects drivers and riders
              going the same way across India.
            </p>
          </motion.div>

          {/* Trust Seal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-10"
          >
            <TrustSeal />
          </motion.div>

          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl"
          >
            <form
              onSubmit={handleSearch}
              className="bg-card border border-primary/20 rounded-xl p-4 md:p-6 shadow-glow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="origin"
                    className="text-xs text-muted-foreground uppercase tracking-wider"
                  >
                    From
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="origin"
                      placeholder="City or address"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="pl-9"
                      data-ocid="search.origin_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="destination"
                    className="text-xs text-muted-foreground uppercase tracking-wider"
                  >
                    To
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input
                      id="destination"
                      placeholder="City or address"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-9"
                      data-ocid="search.destination_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="date"
                    className="text-xs text-muted-foreground uppercase tracking-wider"
                  >
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    data-ocid="search.date_input"
                    className="[color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  type="submit"
                  className="gap-2 px-8"
                  disabled={!origin.trim() || !destination.trim()}
                  data-ocid="search.submit_button"
                >
                  <Search className="h-4 w-4" />
                  Search Rides
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      <AnimatePresence mode="wait">
        {searchEnabled && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mb-16 pt-8"
          >
            <h2 className="font-display text-2xl font-black mb-6">
              {isLoading
                ? "Searching..."
                : searchResults && searchResults.length > 0
                  ? `${searchResults.length} ride${searchResults.length !== 1 ? "s" : ""} found`
                  : "No rides found"}
            </h2>

            {isLoading && (
              <div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                data-ocid="search.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg p-4 space-y-3"
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
                className="text-center py-16 text-muted-foreground"
                data-ocid="search.empty_state"
              >
                <Car className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-1">No rides found</p>
                <p className="text-sm">
                  Try different dates or locations, or{" "}
                  <a href="/post-ride" className="text-primary hover:underline">
                    post your own ride
                  </a>
                  .
                </p>
              </div>
            )}

            {!isLoading && searchResults && searchResults.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((ride, i) => (
                  <motion.div
                    key={ride.id.toString()}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <RideCard ride={ride} index={i + 1} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Featured rides (sample content) */}
      {!searchEnabled && (
        <section className="container mb-16 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black">Popular routes</h2>
            <span className="text-sm text-muted-foreground">Sample rides</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_RIDES.map((r, i) => (
              <motion.div
                key={r.origin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-4 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="w-px h-8 bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      From
                    </p>
                    <p className="font-semibold truncate">{r.origin}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">
                      To
                    </p>
                    <p className="font-semibold truncate">{r.destination}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-display font-black text-primary">
                      ₹{r.price}
                    </p>
                    <p className="text-xs text-muted-foreground">per seat</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {r.date} · {r.time} · {r.seats} seats
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.driver}</p>
                    <p className="text-xs text-muted-foreground">
                      ⭐ {r.rating} · {r.trips} trips
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="container mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="text-primary mb-3">{f.icon}</div>
              <h3 className="font-display font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mb-8">
        <div
          className="relative overflow-hidden rounded-2xl border border-primary/30 p-8 md:p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.04 85), oklch(0.1 0 0))",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, oklch(0.85 0.18 85 / 0.08) 0%, transparent 70%)",
            }}
          />
          <h2 className="font-display text-3xl md:text-4xl font-black mb-3 relative">
            Ready to ride smarter?
          </h2>
          <p className="text-muted-foreground mb-6 relative">
            Post your first ride or search for one going your way.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap relative">
            <Button
              asChild
              size="lg"
              className="gap-2"
              data-ocid="home.post_ride_button"
            >
              <a href="/post-ride">
                Post a Ride
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2"
              data-ocid="home.find_ride_button"
            >
              <a href="/#search">
                Find a Ride
                <Search className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
