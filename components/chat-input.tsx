"use client";

const suggestions: Record<string, string[]> = {
  senior: [
    "How do I survive first semester?",
    "Best study spots on campus?",
    "How to deal with exam stress?",
  ],
  professional: [
    "Who teaches Data Structures?",
    "When is the next exam?",
    "Show me today's timetable.",
  ],
  friendly: [
    "Hype me up!",
    "Give me a fun fact.",
    "I'm bored, what do I do?",
  ],
};

type Props = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  currentMode: string;
};

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  currentMode,
}: Props) {
  const chips = suggestions[currentMode] ?? suggestions["senior"];

  return (
    <div className="flex flex-col gap-3">
      {/* Suggestion Chips */}
      <div className="flex gap-2 flex-wrap">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setInput(chip)}
            className="text-xs px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask Ki-Khobor anything..."
          className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-white/30"
        />
        <button
          onClick={sendMessage}
          className="bg-white text-black px-6 rounded-2xl font-semibold hover:bg-white/90 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}