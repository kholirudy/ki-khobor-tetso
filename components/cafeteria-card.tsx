"use client";

function getQueueStatus() {
  const hour = new Date().getHours();

  if (hour >= 12 && hour <= 14) {
    return {
      level: "High",
      color: "text-red-400",
      dot: "bg-red-400",
      wait: "~20 mins",
      tip: "Try going after 2:30 PM",
    };
  } else if ((hour >= 10 && hour < 12) || (hour > 14 && hour <= 16)) {
    return {
      level: "Medium",
      color: "text-amber-400",
      dot: "bg-amber-400",
      wait: "~10 mins",
      tip: "Not too bad right now",
    };
  } else {
    return {
      level: "Low",
      color: "text-green-400",
      dot: "bg-green-400",
      wait: "~2 mins",
      tip: "Great time to go!",
    };
  }
}

export default function CafeteriaCard() {
  const status = getQueueStatus();

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-xl max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🍽️</span>
        <h3 className="font-semibold text-white">Tetso Cafeteria</h3>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
        <span className={`text-sm font-medium ${status.color}`}>
          {status.level} queue right now
        </span>
      </div>

      <div className="space-y-2 text-sm text-white/60">
        <p>⏱️ Estimated wait: <span className="text-white">{status.wait}</span></p>
        <p>💡 {status.tip}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30">
        Live estimate based on campus patterns
      </div>
    </div>
  );
}