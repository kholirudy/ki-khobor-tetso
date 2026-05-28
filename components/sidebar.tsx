type Props = {
  currentMode: string;
};

export default function Sidebar({ currentMode }: Props) {
  return (
    <aside className="w-44 border-r border-white/10 bg-black/20 backdrop-blur-xl p-4 hidden md:flex flex-col">
      <h2 className="text-lg font-bold mb-6">Ki-Khobor</h2>

      <div className="space-y-3">
        <div className="bg-white/10 border border-white/10 rounded-xl p-3">
          <p className="text-xs text-white/50 mb-1">Active Mode</p>
          <h3 className="text-sm font-semibold capitalize">{currentMode}</h3>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-xl p-3">
          <p className="text-xs text-white/50">Campus AI Assistant</p>
          <p className="mt-1 text-white/70 text-xs leading-relaxed">
            Smart guidance for Tetso students.
          </p>
        </div>
      </div>
    </aside>
  );
}