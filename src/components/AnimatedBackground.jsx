import { useMemo } from "react";

const starPattern = Array.from({ length: 120 }, (_, index) => {
  const left = (index * 17 + 13) % 100;
  const top = (index * 29 + 37) % 100;
  const size = 1 + ((index * 7) % 22) / 10;
  const opacity = 0.28 + ((index * 11) % 60) / 100;
  const delay = -((index * 13) % 90) / 10;
  const duration = 6 + ((index * 19) % 90) / 10;

  return { left, top, size, opacity, delay, duration };
});

export function AnimatedBackground() {
  const stars = useMemo(() => starPattern, []);

  const brightStars = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        left: 35 + index * 4.5 + Math.sin(index) * 6,
        top: 36 + Math.cos(index * 0.8) * 5 + index * 0.7,
        size: 2.5 + (index % 3) * 1.3,
        opacity: 0.65 + (index % 2) * 0.2,
        hue: 190 + index * 5,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 18% 18%, rgba(110, 160, 255, 0.22), transparent 21rem)," +
          "radial-gradient(circle at 82% 24%, rgba(180, 220, 255, 0.18), transparent 18rem)," +
          "radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.14), transparent 28rem)," +
          "linear-gradient(135deg, #02050d 0%, #050b19 28%, #040615 100%)",
      }}
    >
      <style>{`
        .milkyway-core {
          animation: pulse-glow 14s ease-in-out infinite;
        }

        .milkyway-arm {
          animation: spiral-spin 38s linear infinite;
        }

        .milkyway-star {
          animation: twinkle 5.2s ease-in-out infinite;
        }

        @keyframes spiral-spin {
          from { transform: rotate(0deg) translateX(0) rotate(0deg); }
          to { transform: rotate(360deg) translateX(0) rotate(-360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.88); }
        }
      `}</style>

      <div className="absolute inset-0 opacity-80" style={{
        backgroundImage:
          "radial-gradient(circle at 24% 12%, rgba(64, 148, 255, 0.18), transparent 15rem)," +
          "radial-gradient(circle at 78% 18%, rgba(144, 204, 255, 0.12), transparent 14rem)," +
          "radial-gradient(circle at 55% 62%, rgba(88, 112, 255, 0.08), transparent 24rem)",
      }} />

      <div className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_38%)] shadow-[0_0_140px_rgba(111,174,255,0.24)] milkyway-core">
        <div className="absolute inset-24 rounded-full border border-cyan-200/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-40 rounded-full border border-sky-200/10 bg-[radial-gradient(circle_at_center,rgba(173,216,255,0.12),transparent_55%)]" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/5 milkyway-arm" style={{ boxShadow: "0 0 120px rgba(173,216,255,0.12)" }} />
      <div className="absolute left-1/2 top-1/2 h-[72rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/5 milkyway-arm" style={{ animationDuration: "52s", animationDirection: "reverse", boxShadow: "0 0 140px rgba(100, 180, 255, 0.08)" }} />

      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[55rem] -translate-x-1/2 -translate-y-[3rem] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[18rem] w-[42rem] -translate-x-1/2 translate-y-[4rem] rounded-full bg-cyan-200/10 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55)_80%)]" />

      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)] milkyway-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {brightStars.map((star, index) => (
        <span
          key={`bright-${index}`}
          className="absolute rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            filter: `drop-shadow(0 0 18px hsla(${star.hue}, 100%, 80%, 0.75))`,
          }}
        />
      ))}
    </div>
  );
}
