import { Mic, MicOff, MonitorUp, PhoneOff, Layers } from 'lucide-react';
import { useState } from 'react';

export function HuddleBar({ onClose }: { onClose?: () => void }) {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 rounded-full border border-gray-700 bg-[#1A1D24] p-1.5 flex items-center space-x-2">
      
      {/* Active Call Indicator */}
      <div className="px-4 py-1.5 flex items-center border-r border-gray-700 cursor-pointer hover:bg-gray-800 rounded-full transition-colors group">
        <div className="flex -space-x-2 mr-3">
           <div className="w-6 h-6 rounded-full border-2 border-[#1A1D24] bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white z-20">a</div>
           <div className="w-6 h-6 rounded-full border-2 border-[#1A1D24] bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white z-10">c</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-emerald-400 flex items-center tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
            UI-Pairing
          </span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">2 in call</span>
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={() => setIsMicOn(!isMicOn)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMicOn ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
      >
        {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </button>

      <button 
        onClick={() => setIsSharing(!isSharing)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSharing ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        title="Share context to active agents"
      >
        {isSharing ? <Layers className="w-4 h-4" /> : <MonitorUp className="w-4 h-4" />}
      </button>

      <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm ml-2">
        <PhoneOff className="w-4 h-4" />
      </button>

    </div>
  );
}
