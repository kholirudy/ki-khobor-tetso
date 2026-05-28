"use client";

import CafeteriaCard from "../components/cafeteria-card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

function TimetableCard({ content }: { content: string }) {
  try {
    const arrayMatch = content.match(/\[[\s\S]*\]/);
    if (!arrayMatch) return <p className="leading-relaxed">{content}</p>;

    const periods = JSON.parse(arrayMatch[0]);

    const program = content.match(/program:\s*([^|]+)/)?.[1]?.trim();
    const semester = content.match(/semester:\s*([^|]+)/)?.[1]?.trim();
    const section = content.match(/section:\s*([^|]+)/)?.[1]?.trim();
    const day = content.match(/day:\s*([^|]+)/)?.[1]?.trim();

    return (
      <div className="w-full">
        <p className="text-sm text-white/60 mb-3">
          {program} · Semester {semester} · Section {section} · {day}
        </p>
        <div className="flex flex-col gap-2">
          {periods.map((period: any, i: number) => (
            <div key={i} className="flex gap-4 items-start bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <div className="text-xs text-white/50 w-24 shrink-0 pt-0.5">
                {period.start} – {period.end}
              </div>
              <div>
                <p className="font-semibold text-white">{period.subject}</p>
                <p className="text-xs text-white/50">{period.faculty} · {period.room}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch {
    return <p className="leading-relaxed">{content}</p>;
  }
}

function renderMessageContent(content: string) {
  const looksLikeTimetable =
    content.includes('"subject"') &&
    content.includes('"faculty"') &&
    content.includes('"start"');

  if (looksLikeTimetable) {
    return <TimetableCard content={content} />;
  }

  return <p className="leading-relaxed">{content}</p>;
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.content === "CAFETERIA_CARD" ? (
            <CafeteriaCard />
          ) : (
            <div
              className={`max-w-[75%] px-6 py-4 rounded-3xl backdrop-blur-xl border transition-all duration-300 shadow-xl ${
                message.role === "user"
                  ? "bg-white text-black border-white/30"
                  : "bg-white/10 text-white border-white/10"
              }`}
            >
              {message.role === "assistant"
                ? renderMessageContent(message.content)
                : <p className="leading-relaxed">{message.content}</p>
              }
              <div
                className={`text-xs mt-3 ${
                  message.role === "user" ? "text-black/50" : "text-white/40"
                }`}
              >
                Just now
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}