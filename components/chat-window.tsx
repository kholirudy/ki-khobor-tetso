"use client";

import CafeteriaCard from "../components/cafeteria-card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

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
              <p className="leading-relaxed">{message.content}</p>
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