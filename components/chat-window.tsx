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

function FoodCard({ content }: { content: string }) {
  try {
    const extract = (key: string) =>
      content.match(new RegExp(`${key}:\\s*([^|]+)`))?.[1]?.trim();

    const name = extract("name");
    const vendor = extract("vendor");
    const location = extract("location");
    const price = extract("price");
    const isVeg = extract("is_veg");
    const mealType = extract("meal_type");

    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-white text-lg">{name}</p>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            isVeg === "true"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}>
            {isVeg === "true" ? "🟢 Veg" : "🔴 Non-Veg"}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-white/60">
          <p>🏪 {vendor}</p>
          <p>📍 {location}</p>
          <p>🍽️ {mealType}</p>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-white font-bold text-xl">₹{price}</p>
        </div>
      </div>
    );
  } catch {
    return <p className="leading-relaxed">{content}</p>;
  }
}

function AssignmentCard({ content }: { content: string }) {
  try {
    const extract = (key: string) =>
      content.match(new RegExp(`${key}:\\s*([^|]+)`))?.[1]?.trim();

    const subject = extract("subject");
    const title = extract("title");
    const dueDate = extract("due_date");
    const faculty = extract("faculty");
    const status = extract("status");

    const isSubmitted = status === "submitted";

    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/50 uppercase tracking-wider">{subject}</p>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            isSubmitted
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          }`}>
            {isSubmitted ? "✅ Submitted" : "⏳ Pending"}
          </span>
        </div>
        <p className="font-bold text-white text-lg mb-3">{title}</p>
        <div className="flex flex-col gap-1 text-sm text-white/60">
          <p>👨‍🏫 {faculty}</p>
          <p>📅 Due: {dueDate}</p>
        </div>
      </div>
    );
  } catch {
    return <p className="leading-relaxed">{content}</p>;
  }
}

function ClubCard({ content }: { content: string }) {
  try {
    const extract = (key: string) =>
      content.match(new RegExp(`${key}:\\s*([^|]+)`))?.[1]?.trim();

    const name = extract("name");
    const description = extract("description");
    const meetingDay = extract("meeting_day");
    const venue = extract("venue");
    const contact = extract("contact");
    const howToJoin = extract("how_to_join");

    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="mb-3">
          <p className="font-bold text-white text-lg">{name}</p>
          <p className="text-sm text-white/50 mt-1">{description}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-white/60 mb-3">
          <p>📅 {meetingDay}</p>
          <p>📍 {venue}</p>
          <p>✉️ {contact}</p>
        </div>
        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">How to Join</p>
          <p className="text-sm text-white/70">{howToJoin}</p>
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

  const looksLikeFood =
    content.includes("name:") &&
    content.includes("vendor:") &&
    content.includes("price:");

  const looksLikeAssignment =
    content.includes("subject:") &&
    content.includes("due_date:") &&
    content.includes("faculty:");

  const looksLikeClub =
    content.includes("meeting_day:") &&
    content.includes("venue:") &&
    content.includes("how_to_join:");

  if (looksLikeTimetable) return <TimetableCard content={content} />;
  if (looksLikeFood) return <FoodCard content={content} />;
  if (looksLikeAssignment) return <AssignmentCard content={content} />;
  if (looksLikeClub) return <ClubCard content={content} />;

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