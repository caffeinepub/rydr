import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Shield } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Particle configuration — 20 particles (optimized from 28)
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
            background: `oklch(0.72 0.22 145 / ${p.opacity})`,
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
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-48 opacity-[0.06]">
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="City skyline silhouette"
      >
        {/* Buildings silhouette */}
        <rect x="0" y="120" width="60" height="80" fill="white" />
        <rect x="20" y="90" width="30" height="110" fill="white" />
        <rect x="70" y="130" width="50" height="70" fill="white" />
        <rect x="80" y="100" width="20" height="100" fill="white" />
        <rect x="140" y="80" width="70" height="120" fill="white" />
        <rect x="165" y="50" width="25" height="150" fill="white" />
        <rect x="220" y="110" width="55" height="90" fill="white" />
        <rect x="290" y="70" width="80" height="130" fill="white" />
        <rect x="320" y="40" width="30" height="160" fill="white" />
        <rect x="380" y="100" width="60" height="100" fill="white" />
        <rect x="390" y="80" width="15" height="120" fill="white" />
        <rect x="450" y="90" width="75" height="110" fill="white" />
        <rect x="470" y="60" width="30" height="140" fill="white" />
        <rect x="540" y="120" width="50" height="80" fill="white" />
        <rect x="600" y="60" width="90" height="140" fill="white" />
        <rect x="635" y="30" width="25" height="170" fill="white" />
        <rect x="700" y="100" width="65" height="100" fill="white" />
        <rect x="780" y="80" width="80" height="120" fill="white" />
        <rect x="810" y="50" width="25" height="150" fill="white" />
        <rect x="870" y="110" width="55" height="90" fill="white" />
        <rect x="940" y="70" width="75" height="130" fill="white" />
        <rect x="970" y="40" width="20" height="160" fill="white" />
        <rect x="1030" y="90" width="70" height="110" fill="white" />
        <rect x="1060" y="60" width="25" height="140" fill="white" />
        <rect x="1110" y="100" width="60" height="100" fill="white" />
        <rect x="1120" y="80" width="15" height="120" fill="white" />
        <rect x="1180" y="80" width="80" height="120" fill="white" />
        <rect x="1200" y="50" width="30" height="150" fill="white" />
        <rect x="1270" y="110" width="55" height="90" fill="white" />
        <rect x="1340" y="70" width="100" height="130" fill="white" />
        <rect x="1380" y="40" width="30" height="160" fill="white" />
        <rect x="0" y="150" width="1440" height="50" fill="white" />
      </svg>
    </div>
  );
}

export function WelcomePage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  const handleProceed = () => {
    localStorage.setItem("rydr_welcomed", "1");
    navigate({ to: "/" });
  };

  // Subtle road/lane lines animation on canvas
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

      // Road lanes — subtle dashed lines converging to center (perspective)
      const centerX = canvas.width / 2;
      const horizon = canvas.height * 0.55;
      const numLanes = 5;

      ctx.strokeStyle = "rgba(114, 198, 145, 0.07)";
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

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        // Step 1-2: Richer multi-stop gradient — deep navy to green glow
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.15 0.08 240) 0%, oklch(0.09 0.04 240) 45%, oklch(0.06 0.03 145) 100%)",
      }}
    >
      {/* Animated road canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ touchAction: "none" }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* City skyline at bottom */}
      <CitySkylne />

      {/* Ambient glow orbs — Step 6: reduced brightness (0.06→0.04, 0.05→0.03) */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 145 / 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.15 195 / 0.03) 0%, transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "1.5s",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Logo — hero banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2 relative"
        >
          {/* Step 3: Radial glow behind logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              width: "320px",
              height: "320px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, oklch(0.72 0.22 145 / 0.40) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: 0.4,
              borderRadius: "50%",
            }}
            aria-hidden="true"
          />
          {/* Step 5: Bloom ring behind logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              width: "200px",
              height: "200px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              boxShadow: "0 0 60px 20px oklch(0.72 0.22 145 / 0.15)",
              opacity: 0.7,
            }}
            aria-hidden="true"
          />
          {/* Step 4: Floating animation wrapper — scale pulse via motion */}
          <div className="animate-float" style={{ willChange: "transform" }}>
            <motion.div
              animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.05, 1] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {/* Step 5: Enhanced drop-shadow bloom + elevation */}
              <img
                src="/assets/uploads/file_00000000650c720883073dd037e87b31-1.png"
                alt="RYDR — Your City, Your Ride"
                className="w-56 sm:w-72 md:w-88 lg:w-96 h-auto mx-auto"
                loading="eager"
                decoding="async"
                style={{
                  filter:
                    "drop-shadow(0 0 40px oklch(0.72 0.22 145 / 0.45)) drop-shadow(0 0 80px oklch(0.72 0.15 195 / 0.25)) drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Step 7: Tagline — text-white/70 + text-shadow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-white/70 font-normal tracking-widest uppercase mb-10"
          style={{
            fontFamily: '"Figtree", system-ui, sans-serif',
            fontWeight: 400,
            letterSpacing: "0.2em",
            textShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          Smart carpooling across India
        </motion.p>

        {/* Step 8: Enhanced Proceed button — capsule, gradient glow, pulsing ring */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pulsing ring wrapper */}
          <motion.div
            className="relative"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0 0 oklch(0.72 0.22 145 / 0.4)",
                      "0 0 0 12px oklch(0.72 0.22 145 / 0)",
                    ],
                  }
            }
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
            style={{ borderRadius: "9999px" }}
          >
            <motion.button
              type="button"
              onClick={handleProceed}
              data-ocid="welcome.proceed_button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-8 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg font-bold text-black overflow-hidden group"
              style={{
                fontFamily: '"Cabinet Grotesk", system-ui, sans-serif',
                fontWeight: 800,
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 145), oklch(0.65 0.20 165), oklch(0.72 0.15 195))",
                boxShadow:
                  "0 0 25px oklch(0.72 0.22 145 / 0.6), 0 0 50px oklch(0.72 0.22 145 / 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px oklch(0.72 0.22 145 / 0.8), 0 0 80px oklch(0.72 0.22 145 / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 25px oklch(0.72 0.22 145 / 0.6), 0 0 50px oklch(0.72 0.22 145 / 0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
              }}
            >
              {/* Shimmer effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              <span className="relative z-10">Proceed</span>
              <ArrowRight className="relative z-10 h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Trust seal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-white/40 font-normal"
          style={{
            border: "1px solid oklch(0.72 0.22 145 / 0.15)",
            background: "oklch(0.72 0.22 145 / 0.04)",
          }}
        >
          <Shield className="h-3.5 w-3.5 text-white/30 shrink-0" />
          <span>Your data is secured on the Internet Computer blockchain</span>
        </motion.div>
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
