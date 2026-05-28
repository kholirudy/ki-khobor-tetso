"use client";

export type Mode = "senior" | "professional" | "friendly";

const modes = [
  { id: "senior" as Mode, label: "Senior", emoji: "🎓", color: "hover:text-amber-400", activeColor: "bg-amber-400/20 text-amber-400 border-amber-400/40" },
  { id: "professional" as Mode, label: "Pro", emoji: "🏛️", color: "hover:text-blue-400", activeColor: "bg-blue-400/20 text-blue-400 border-blue-400/40" },
  { id: "friendly" as Mode, label: "Buddy", emoji: "🎉", color: "hover:text-pink-400", activeColor: "bg-pink-400/20 text-pink-400 border-pink-400/40" },
];

type Props = {
  current: string;
  onChange: (mode: Mode) => void;
};

export default function ModeSwitcher({ current, onChange }: Props) {
  return (
    <div className="flex gap-2 bg-white/5 p-1.5 rounded-full backdrop-blur border border-white/10">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
            current === mode.id
              ? mode.activeColor
              : `border-transparent text-white/40 ${mode.color}`
          }`}
        >
          {mode.emoji} {mode.label}
        </button>
      ))}
    </div>
  );
}