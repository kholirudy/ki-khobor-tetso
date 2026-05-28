"use client";

import { useState } from "react";
import ChatWindow from "@/components/chat-window";
import ChatInput from "@/components/chat-input";
import ModeSwitcher from "@/components/mode-switcher";
import Sidebar from "@/components/sidebar";
import { themes } from "@/lib/themes";
import DeliveryModal from "@/components/delivery-modal";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const greetings = {
  senior: "Hey! I'm your senior here at Tetso. Ask me anything — academics, life, stress, all of it. 😊",
  professional: "Good day. I'm the official Tetso College assistant. How may I help you?",
  friendly: "HEYYYY!! What's up? What's on your mind today? 🎉✨",
};

export default function ChatPage() {
  const [currentMode, setCurrentMode] = useState("senior");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Ki-Khobor Tetso 🚀 Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const theme = themes[currentMode as keyof typeof themes];

  const handleModeChange = (newMode: string) => {
    setCurrentMode(newMode);
    document.documentElement.setAttribute("data-mode", newMode);
    setMessages([
      {
        role: "assistant",
        content: greetings[newMode as keyof typeof greetings],
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const savedInput = input;

    const userMessage: Message = {
      role: "user",
      content: savedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const lowerInput = savedInput.toLowerCase();

const isDeliveryQuery =
  lowerInput.includes("deliver") ||
  lowerInput.includes("samosa") ||
  lowerInput.includes("get me") ||
  lowerInput.includes("bring me") ||
  lowerInput.includes("order");

if (isDeliveryQuery) {
  setShowDelivery(true);
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: "Sure! Let me set that up for you. 🛵",
    },
  ]);
  setIsTyping(false);
  return;
}

try {
  const response = await fetch("https://ki-khobor-tetso.vercel.app/api/chat",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: savedInput,
      mode: currentMode,
    }),
  });

  const data = await response.json();

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: data.reply,
    },
  ]);
} catch (error) {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: "Sorry, something went wrong. Please try again. 😅",
    },
  ]);
}

setIsTyping(false);
  };

  return (
    <main
      className="min-h-screen transition-all duration-500 flex"
      style={{
        background: theme.background,
        color: "white",
      }}
    >
      <Sidebar currentMode={currentMode} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center gap-4">
          <h1 className="text-lg font-bold whitespace-nowrap">Ki-Khobor Tetso</h1>
          <ModeSwitcher current={currentMode} onChange={handleModeChange} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <>
            <ChatWindow messages={messages} />

            {isTyping && (
              <div className="mt-6 flex justify-start">
                <div className="bg-white/10 border border-white/10 px-5 py-4 rounded-3xl backdrop-blur-xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            currentMode={currentMode}
          />
        </div>
      </div>

      {showDelivery && (
        <DeliveryModal onClose={() => setShowDelivery(false)} />
      )}
    </main>
  );
}