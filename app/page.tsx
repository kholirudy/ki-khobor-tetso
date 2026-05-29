"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const modes = [
  {
    id: "senior",
    title: "Senior Mode",
    desc: "Street-smart advice from a senior who's seen it all.",
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "hover:border-amber-400/50",
    accent: "text-amber-400",
    dot: "bg-amber-400",
    emoji: "🎓",
  },
  {
    id: "professional",
    title: "Professional Mode",
    desc: "Official college assistant. Crisp, accurate, structured.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    border: "hover:border-blue-400/50",
    accent: "text-blue-400",
    dot: "bg-blue-400",
    emoji: "🏛️",
  },
  {
    id: "friendly",
    title: "Friendly Mode",
    desc: "Your hyper, fun friend who's always got your back.",
    gradient: "from-pink-500/20 to-purple-500/10",
    border: "hover:border-pink-400/50",
    accent: "text-pink-400",
    dot: "bg-pink-400",
    emoji: "🎉",
  },
];

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let animFrame: number;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.5;

      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        const twinkle = Math.sin(tick * star.twinkleSpeed * 10 + star.twinkleOffset);
        const opacity = star.opacity + twinkle * 0.15;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">

      {/* Stars */}
      <StarCanvas />

      {/* Purple glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Bottom subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-white/40 text-xs tracking-widest uppercase">
          Tetso College · Campus AI
        </p>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-6xl md:text-7xl font-bold mb-4 text-center bg-gradient-to-b from-white via-white/90 to-white/20 bg-clip-text text-transparent leading-tight">
        Ki-Khobor Tetso
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-white/35 text-base max-w-xs text-center mb-12 leading-relaxed">
        Your campus, now talks back. Three voices, one assistant.
      </p>

      {/* Mode Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => router.push("/chat")}
            className={`group text-left bg-gradient-to-br ${mode.gradient} border border-white/8 ${mode.border} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{mode.emoji}</span>
              <div className={`w-2 h-2 rounded-full ${mode.dot} opacity-50 group-hover:opacity-100 transition-opacity`} />
            </div>
            <h2 className={`text-sm font-semibold mb-1 ${mode.accent}`}>
              {mode.title}
            </h2>
            <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/55 transition-colors">
              {mode.desc}
            </p>
            <div className={`mt-4 text-xs ${mode.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Start chatting →
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-14 text-white/15 text-xs tracking-wide">
        Built by The A-Team · Tetso College Vibe Coding 2026
      </p>
    </main>
  );
}