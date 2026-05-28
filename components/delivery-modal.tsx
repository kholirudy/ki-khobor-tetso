"use client";

import { useState, useEffect } from "react";

const cadets = [
  { name: "Rahul", year: "3rd year", dept: "CS" },
  { name: "Priya", year: "2nd year", dept: "BCA" },
  { name: "Anand", year: "4th year", dept: "BBA" },
];

type Props = {
  onClose: () => void;
};

export default function DeliveryModal({ onClose }: Props) {
  const [step, setStep] = useState<"confirm" | "tracking">("confirm");
  const cadet = cadets[Math.floor(Math.random() * cadets.length)];

  useEffect(() => {
    if (step === "tracking") {
      const timer = setTimeout(() => {}, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        {step === "confirm" ? (
          <>
            <div className="text-4xl mb-4">🛵</div>
            <h2 className="text-xl font-bold text-white mb-2">
              Order Confirmation
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Your order will be delivered by a Tetso Cadet.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Item</span>
                <span className="text-white">Samosa x1</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Price</span>
                <span className="text-white">₹15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep("tracking")}
                className="flex-1 py-3 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
              >
                Order Now
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4 animate-bounce">🛵</div>
            <h2 className="text-xl font-bold text-white mb-2">
              On the way!
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Your delivery cadet is heading to you.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <p className="text-white font-medium">{cadet.name}</p>
                  <p className="text-white/40 text-xs">
                    {cadet.year} · {cadet.dept}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Fake progress bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
              <div className="bg-amber-400 h-1.5 rounded-full w-1/3 animate-pulse" />
            </div>

            <p className="text-white/30 text-xs text-center mb-4">
              Estimated arrival: ~5 mins
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-all"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}