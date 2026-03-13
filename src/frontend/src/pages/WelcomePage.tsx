import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  ChevronLeft,
  Lock,
  Search,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

/* ─── Particles ────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 4,
  size: 1.5 + Math.random() * 2.5,
  opacity: 0.15 + Math.random() * 0.35,
}));

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: `oklch(0.55 0.20 240 / ${p.opacity})`,
          }}
          animate={{
            y: [0, -600],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function CitySkylne() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-48 opacity-[0.05]">
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="City skyline silhouette"
      >
        <rect x="0" y="120" width="60" height="80" fill="white" />
        <rect x="20" y="90" width="30" height="110" fill="white" />
        <rect x="70" y="130" width="50" height="70" fill="white" />
        <rect x="140" y="80" width="70" height="120" fill="white" />
        <rect x="165" y="50" width="25" height="150" fill="white" />
        <rect x="220" y="110" width="55" height="90" fill="white" />
        <rect x="290" y="70" width="80" height="130" fill="white" />
        <rect x="320" y="40" width="30" height="160" fill="white" />
        <rect x="380" y="100" width="60" height="100" fill="white" />
        <rect x="450" y="90" width="75" height="110" fill="white" />
        <rect x="540" y="120" width="50" height="80" fill="white" />
        <rect x="600" y="60" width="90" height="140" fill="white" />
        <rect x="635" y="30" width="25" height="170" fill="white" />
        <rect x="700" y="100" width="65" height="100" fill="white" />
        <rect x="780" y="80" width="80" height="120" fill="white" />
        <rect x="870" y="110" width="55" height="90" fill="white" />
        <rect x="940" y="70" width="75" height="130" fill="white" />
        <rect x="1030" y="90" width="70" height="110" fill="white" />
        <rect x="1110" y="100" width="60" height="100" fill="white" />
        <rect x="1180" y="80" width="80" height="120" fill="white" />
        <rect x="1270" y="110" width="55" height="90" fill="white" />
        <rect x="1340" y="70" width="100" height="130" fill="white" />
        <rect x="0" y="150" width="1440" height="50" fill="white" />
      </svg>
    </div>
  );
}

/* ─── Step variants ─────────────────────────────────────────── */
const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const stepTransition = {
  duration: 0.35,
  ease: [0.32, 0, 0.67, 0] as [number, number, number, number],
};

/* ─── Progress dots (4 total) ───────────────────────────────── */
function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{
            width: i === step ? 24 : 8,
            opacity: i === step ? 1 : 0.35,
          }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full bg-primary"
        />
      ))}
    </div>
  );
}

/* ─── Bullet point row ──────────────────────────────────────── */
function BulletRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "oklch(0.55 0.20 240 / 0.15)" }}
      >
        <span className="text-primary">{icon}</span>
      </div>
      <span className="text-sm font-medium text-white/80">{text}</span>
    </div>
  );
}

const HEADING_FONT = '"Plus Jakarta Sans", "Outfit", system-ui, sans-serif';

/* ─── Main WelcomePage ──────────────────────────────────────── */
export function WelcomePage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isAuthenticated } = useGoogleAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  // Steps: 0 = Feature slide 1, 1 = Feature slide 2, 2 = Feature slide 3, 3 = Login
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  }, []);

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleEnterApp = () => {
    localStorage.setItem("rydr_welcomed", "1");
    navigate({ to: "/" });
  };

  // After login succeeds while on step 3, go to app
  useEffect(() => {
    if (isAuthenticated && step === 3) {
      localStorage.setItem("rydr_welcomed", "1");
      navigate({ to: "/" });
    }
  }, [isAuthenticated, step, navigate]);

  /* Animated road/lane canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const horizon = canvas.height * 0.55;
      const numLanes = 5;

      ctx.strokeStyle = "rgba(31, 122, 224, 0.06)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([30, 20]);
      ctx.lineDashOffset = -offset;

      for (let i = -numLanes; i <= numLanes; i++) {
        if (i === 0) continue;
        const bottomX = centerX + i * (canvas.width / (numLanes * 1.5));
        ctx.beginPath();
        ctx.moveTo(centerX, horizon);
        ctx.lineTo(bottomX, canvas.height + 40);
        ctx.stroke();
      }

      offset = (offset + 1.2) % 50;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const ctaStyle = {
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    background:
      "linear-gradient(135deg, oklch(0.55 0.20 240), oklch(0.65 0.18 210), oklch(0.72 0.15 195))",
    boxShadow:
      "0 0 25px oklch(0.55 0.20 240 / 0.5), 0 4px 16px rgba(0,0,0,0.3)",
  };

  const featureIconBox = {
    background:
      "linear-gradient(135deg, oklch(0.55 0.20 240 / 0.2), oklch(0.72 0.15 195 / 0.1))",
    border: "1px solid oklch(0.55 0.20 240 / 0.3)",
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.15 0.08 240) 0%, oklch(0.08 0.04 240) 45%, oklch(0.05 0.02 240) 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ touchAction: "none" }}
      />
      <ParticleField />
      <CitySkylne />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.20 240 / 0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Step content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="flex flex-col items-center text-center w-full"
            >
              {/* ── Step 0: Find Rides ───────────────────────── */}
              {step === 0 && (
                <div className="flex flex-col items-center w-full py-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={featureIconBox}
                  >
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <h2
                    className="text-2xl font-black text-white mb-2"
                    style={{ fontFamily: HEADING_FONT, fontWeight: 800 }}
                  >
                    Find rides, save money
                  </h2>
                  <p className="text-sm text-white/50 mb-8">
                    Smart carpooling across India
                  </p>
                  <div className="flex flex-col gap-4 w-full text-left">
                    <BulletRow
                      icon={<Search className="h-4 w-4" />}
                      text="Search rides between cities in seconds"
                    />
                    <BulletRow
                      icon={<Users className="h-4 w-4" />}
                      text="Split costs with verified travellers"
                    />
                    <BulletRow
                      icon={<Zap className="h-4 w-4" />}
                      text="Smart matching by route & preferences"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={goNext}
                    data-ocid="welcome.step0_next_button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-10 py-4 rounded-full text-sm font-bold text-white"
                    style={ctaStyle}
                  >
                    Next
                  </motion.button>
                </div>
              )}

              {/* ── Step 1: Post a Ride ──────────────────────── */}
              {step === 1 && (
                <div className="flex flex-col items-center w-full py-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={featureIconBox}
                  >
                    <Car className="h-10 w-10 text-primary" />
                  </div>
                  <h2
                    className="text-2xl font-black text-white mb-2"
                    style={{ fontFamily: HEADING_FONT, fontWeight: 800 }}
                  >
                    Post a ride, fill empty seats
                  </h2>
                  <p className="text-sm text-white/50 mb-8">
                    Earn by sharing your journey
                  </p>
                  <div className="flex flex-col gap-4 w-full text-left">
                    <BulletRow
                      icon={<Car className="h-4 w-4" />}
                      text="Publish your route in under 2 minutes"
                    />
                    <BulletRow
                      icon={<Users className="h-4 w-4" />}
                      text="Choose how many passengers to accept"
                    />
                    <BulletRow
                      icon={<Zap className="h-4 w-4" />}
                      text="Set your own price per seat"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={goNext}
                    data-ocid="welcome.step1_next_button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-10 py-4 rounded-full text-sm font-bold text-white"
                    style={ctaStyle}
                  >
                    Next
                  </motion.button>
                </div>
              )}

              {/* ── Step 2: Verified & Trusted ───────────────── */}
              {step === 2 && (
                <div className="flex flex-col items-center w-full py-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={featureIconBox}
                  >
                    <ShieldCheck className="h-10 w-10 text-primary" />
                  </div>
                  <h2
                    className="text-2xl font-black text-white mb-2"
                    style={{ fontFamily: HEADING_FONT, fontWeight: 800 }}
                  >
                    Verified, safe &amp; trusted
                  </h2>
                  <p className="text-sm text-white/50 mb-8">
                    Your safety is our top priority
                  </p>
                  <div className="flex flex-col gap-4 w-full text-left">
                    <BulletRow
                      icon={<UserCheck className="h-4 w-4" />}
                      text="Social-verified driver profiles"
                    />
                    <BulletRow
                      icon={<Lock className="h-4 w-4" />}
                      text="Ratings & reliability scores for all users"
                    />
                    <BulletRow
                      icon={<Star className="h-4 w-4" />}
                      text="Chat unlocks only after ride confirmation"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={goNext}
                    data-ocid="welcome.step2_next_button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-10 py-4 rounded-full text-sm font-bold text-white"
                    style={ctaStyle}
                  >
                    Get Started
                  </motion.button>
                </div>
              )}

              {/* ── Step 3: Login screen ─────────────────────── */}
              {step === 3 && (
                <div className="flex flex-col items-center w-full py-4">
                  {/* Logo */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={
                        reduceMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }
                      }
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <img
                        src="/assets/uploads/file_00000000650c720883073dd037e87b31-1.png"
                        alt="RYDR"
                        className="w-44 sm:w-52 h-auto mx-auto"
                        loading="eager"
                        decoding="async"
                      />
                    </motion.div>
                  </div>

                  <h1
                    className="text-3xl font-black text-white mb-2"
                    style={{ fontFamily: HEADING_FONT, fontWeight: 800 }}
                  >
                    Welcome to RYDR
                  </h1>
                  <p
                    className="text-sm text-white/60 mb-10 tracking-widest uppercase"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    Your City, Your Ride
                  </p>

                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    {isAuthenticated ? (
                      <motion.button
                        type="button"
                        onClick={handleEnterApp}
                        data-ocid="welcome.enter_app_button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-full text-sm font-bold text-white"
                        style={ctaStyle}
                      >
                        Enter App
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={() => login()}
                        disabled={isLoggingIn}
                        data-ocid="welcome.google_login_button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-full text-sm font-bold text-white flex items-center justify-center gap-3"
                        style={ctaStyle}
                      >
                        {isLoggingIn ? (
                          "Signing in…"
                        ) : (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fill="#fff"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="rgba(255,255,255,0.8)"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="rgba(255,255,255,0.6)"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                              />
                              <path
                                fill="rgba(255,255,255,0.4)"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Sign in with Google
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>

                  <p className="mt-6 text-xs text-white/30 text-center max-w-xs">
                    By signing in, you agree to our terms and community
                    guidelines.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button + progress dots */}
        <div className="flex items-center justify-between w-full mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              data-ocid="welcome.back_button"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          <ProgressDots step={step} />
          <div className="w-12" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.05 0.02 240) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
