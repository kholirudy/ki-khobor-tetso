"use client";
import CafeteriaCard from "@/components/cafeteria_card";
import { useRouter } from "next/navigation";

const modes = [
  {
    id: "senior",
  
    title: "Senior Mode",
    desc: "Street-smart advice from a senior who's seen it all.",
    color: "hover:border-amber-400/60 hover:bg-amber-400/10",
    accent: "text-amber-400",
  },
  {
    id: "professional",
    title: "Professional Mode",
    desc: "Official campus info — faculty, timetables, notices.",
    color: "hover:border-blue-400/60 hover:bg-blue-400/10",
    accent: "text-blue-400",
  },
  {
    id: "friendly",
    title: "Buddy Mode",
    desc: "Your hyper, meme-y friend who's always got your back.",
    color: "hover:border-pink-400/60 hover:bg-pink-400/10",
    accent: "text-pink-400",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Hero */}
      <div className="relative text-center mb-16">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
          Tetso College · Campus AI
        </p>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
          Ki-Khobor Tetso
        </h1>
        <p className="text-white/50 text-lg max-w-md mx-auto">
          Your campus, now talks back. Ask anything — in three different voices.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => router.push("/chat")}
            className={`group text-left bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 ${mode.color} hover:scale-105 hover:shadow-2xl`}
          >
            <div className="text-4xl mb-4">{mode.emoji}</div>
            <h2 className={`text-xl font-bold mb-2 ${mode.accent}`}>
              {mode.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{mode.desc}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="relative mt-16 text-white/20 text-xs">
        Built by The A-Team · Tetso College Vibe Coding 2026
      </p>
    </main>
  );
}