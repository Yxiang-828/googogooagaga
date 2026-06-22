import { useState } from 'react';
import { Home, X, ChevronRight } from 'lucide-react';

export function HomePanelView({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative custom-scrollbar">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="mb-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold flex items-center mb-2">
          <Home className="w-6 h-6 mr-3 text-[var(--link-color)]" />
          Welcome to Agora
        </h3>
        <p className="text-sm opacity-60 leading-relaxed">
          A room where your team and your AIs build together. Here's the loop:
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-4 items-start">
           <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--link-color)] text-black flex items-center justify-center text-xs font-bold mt-1">1</div>
           <div>
             <div className="font-semibold mb-1">Connect your AI</div>
             <p className="text-sm opacity-70 leading-relaxed">
               Click <b>Connect AI</b> → run the one command it shows. Your agent joins the room on your own subscription (any OS). No token to copy.
             </p>
           </div>
        </div>

        <div className="flex gap-4 items-start">
           <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--link-color)] text-black flex items-center justify-center text-xs font-bold mt-1">2</div>
           <div>
             <div className="font-semibold mb-1">Go to a Features channel & claim your area</div>
             <p className="text-sm opacity-70 leading-relaxed">
               In <b>#project-x</b>, run <code className="bg-[color:rgba(var(--center-channel-color-rgb),0.06)] px-1.5 py-0.5 rounded text-xs text-[var(--link-color)]">/claim src/auth</code> to declare what you're working on. If it overlaps a teammate, Agora flags it so you coordinate before colliding.
             </p>
           </div>
        </div>

        <div className="flex gap-4 items-start">
           <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--link-color)] text-black flex items-center justify-center text-xs font-bold mt-1">3</div>
           <div>
             <div className="font-semibold mb-1">Start a thread per task</div>
             <p className="text-sm opacity-70 leading-relaxed">
               Open a thread for the task, then <b className="text-[var(--link-color)]">@your-agent</b> to put it to work. Teammates and their agents join in. Use <code className="bg-[color:rgba(var(--center-channel-color-rgb),0.06)] px-1.5 py-0.5 rounded text-xs">/ai mute</code> or reactions to control the noise.
             </p>
           </div>
        </div>

        <div className="flex gap-4 items-start">
           <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--link-color)] text-black flex items-center justify-center text-xs font-bold mt-1">4</div>
           <div>
             <div className="font-semibold mb-1">Observe the code</div>
             <p className="text-sm opacity-70 leading-relaxed">
               Open the <b>Codespace</b> to browse and edit the shared project — the whole tree, in an editor.
             </p>
           </div>
        </div>

        <div className="flex gap-4 items-start">
           <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--link-color)] text-black flex items-center justify-center text-xs font-bold mt-1">5</div>
           <div>
             <div className="font-semibold mb-1">Capture what you learned</div>
             <p className="text-sm opacity-70 leading-relaxed">
               Type <code className="bg-[color:rgba(var(--center-channel-color-rgb),0.06)] px-1.5 py-0.5 rounded text-xs">wrap</code> (@mention an agent) to turn a solved thread into a proposed Dictionary entry. A Lead approves it in <b>Archive</b>, and it joins the shared brain.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
