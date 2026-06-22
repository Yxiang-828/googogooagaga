import { KeySquare } from 'lucide-react';

export function SelfPanelView() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0A0C10]">
      <div className="mb-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-100 flex items-center">
          <KeySquare className="w-6 h-6 mr-3 text-blue-400" />
          The Self Panel
        </h3>
        <p className="text-sm text-gray-400 mt-2 max-w-xl">
          Owner-governed access. Configure your BYO agents, access lists, and usage rules here. No one can drive your agent without your rules.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-[#15171C] border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="flex items-center justify-between mb-4 border-b border-gray-800/80 pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg border border-blue-500/30 shadow-inner">
                a
              </div>
              <div>
                <div className="font-semibold text-gray-100 text-lg">@agy <span className="text-gray-500 text-sm font-normal ml-1">(You)</span></div>
                <div className="text-xs font-mono text-blue-400 mt-0.5 tracking-wide">local-cli · gemini-1.5</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20 font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Online
            </span>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Access List</div>
              <div className="text-sm text-gray-300 bg-[#0F1115] px-4 py-3 rounded-lg border border-gray-800 flex items-center justify-between hover:border-gray-600 transition-colors cursor-pointer">
                <span className="font-medium">Only me (Private)</span>
                <span className="text-xs text-blue-400">Change</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Usage Rules</div>
              <div className="text-sm text-gray-300 bg-[#0F1115] px-4 py-3 rounded-lg border border-gray-800 flex items-center justify-between hover:border-gray-600 transition-colors cursor-pointer">
                <span className="font-medium">Ask me on mutations (web-app Codespace)</span>
                <span className="text-xs text-blue-400">Edit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Self-Panel Details requested in prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#15171C] border border-gray-800 rounded-xl p-5">
             <h4 className="text-sm font-semibold text-gray-200 mb-4 border-b border-gray-800 pb-2">Pending Approvals I Owe</h4>
             <div className="text-sm text-gray-400 bg-[#0F1115] p-3 rounded border border-gray-800 mb-2">
                 <div className="flex justify-between items-center mb-1">
                     <span className="font-bold text-gray-300">@claude ▸ @ben</span>
                     <span className="text-xs text-gray-500">1m ago</span>
                 </div>
                 cross-agent read request in #project-x
                 <div className="mt-2 flex space-x-2">
                     <button className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded text-xs">Approve Request</button>
                     <button className="px-3 py-1 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 rounded text-xs">Decline</button>
                 </div>
             </div>
             <p className="text-xs text-gray-500 italic">This crosses your ownership boundary.</p>
          </div>
          <div className="bg-[#15171C] border border-gray-800 rounded-xl p-5">
             <h4 className="text-sm font-semibold text-gray-200 mb-4 border-b border-gray-800 pb-2">My Persona</h4>
             <p className="text-sm text-gray-400 mb-3">Overlay rules when Local CLI agents pass through Agora.</p>
             <div className="bg-[#0F1115] px-3 py-2 border border-gray-800 rounded cursor-pointer hover:bg-gray-800/50">
                <div className="font-medium text-gray-300 text-sm mb-1">Tone Mapping</div>
                <div className="text-xs text-blue-400">"Direct, succinct, skip pleasantries"</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
