import { KeySquare, X, Shield, Lock, Globe, Power, UserCheck } from 'lucide-react';

export function SelfPanelView({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative custom-scrollbar">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}
      <div className="mb-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold flex items-center">
          <KeySquare className="w-6 h-6 mr-3 text-[var(--link-color)]" />
          Me (Self Panel)
        </h3>
        <p className="text-sm opacity-60 mt-2 max-w-xl leading-relaxed">
          Owner-governed access. Configure your BYO agents, access lists, and usage rules here. No one can drive your agent without your rules.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Main Agent Card */}
        <div className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--link-color)]"></div>
          <div className="flex items-center justify-between mb-4 border-b border-[color:rgba(var(--center-channel-color-rgb),0.1)] pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[color:rgba(var(--link-color-rgb,22,109,224),0.1)] flex items-center justify-center text-[var(--link-color)] font-bold text-lg border border-[color:rgba(var(--link-color-rgb,22,109,224),0.2)] shadow-sm">
                A
              </div>
              <div>
                <div className="font-semibold text-lg flex items-center">@agy <span className="opacity-50 text-sm font-normal ml-2 bg-[color:rgba(var(--center-channel-color-rgb),0.04)] px-1.5 py-0.5 rounded">Primary Agent</span></div>
                <div className="text-xs font-mono text-[var(--link-color)] mt-0.5 tracking-wide bg-[color:rgba(var(--link-color-rgb,22,109,224),0.05)] inline-block px-1 rounded">local-cli · gemini-3.1-pro</div>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] text-[var(--online-indicator)] text-xs rounded border border-[color:rgba(var(--online-indicator-rgb,61,184,135),0.2)] font-medium flex items-center">
                 <span className="w-1.5 h-1.5 bg-[var(--online-indicator)] rounded-full mr-2 animate-pulse"></span>
                 Online
               </span>
               <button className="px-3 py-1 bg-[color:rgba(var(--error-text-rgb,253,89,96),0.1)] hover:bg-[color:rgba(var(--error-text-rgb,253,89,96),0.2)] text-[var(--error-text)] text-xs rounded border border-[color:rgba(var(--error-text-rgb,253,89,96),0.2)] font-medium flex items-center transition-colors">
                 <Power className="w-3 h-3 mr-1" /> Kill
               </button>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="text-xs opacity-50 font-semibold uppercase tracking-wider mb-2 flex items-center"><Lock className="w-3 h-3 mr-1" /> Access List</div>
              <div className="text-sm bg-[var(--center-channel-bg)] px-4 py-3 rounded-lg border border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex items-center justify-between hover:border-[color:rgba(var(--center-channel-color-rgb),0.3)] transition-colors cursor-pointer">
                <span className="font-medium">Only me (Private)</span>
                <span className="text-xs text-[var(--link-color)]">Change</span>
              </div>
            </div>
            <div>
              <div className="text-xs opacity-50 font-semibold uppercase tracking-wider mb-2 flex items-center"><Shield className="w-3 h-3 mr-1" /> Usage Rules</div>
              <div className="text-sm bg-[var(--center-channel-bg)] px-4 py-3 rounded-lg border border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex items-center justify-between hover:border-[color:rgba(var(--center-channel-color-rgb),0.3)] transition-colors cursor-pointer">
                <span className="font-medium">Ask me on mutations (web-app Codespace)</span>
                <span className="text-xs text-[var(--link-color)]">Edit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2 opacity-50" />
              Cross-Owner Grants
            </h4>
            <div className="space-y-3">
               <div className="bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded p-3 text-sm">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-medium">To: ana</span>
                   <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] text-[var(--online-indicator)]">Active</span>
                 </div>
                 <div className="opacity-60 text-xs">Granted: "allowed to invoke @agy for read-only dictionary searches"</div>
                 <button className="text-xs text-[var(--error-text)] mt-2 hover:underline">Revoke early</button>
               </div>
            </div>
          </div>
          
          <div className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold mb-4 flex items-center">
              <UserCheck className="w-4 h-4 mr-2 opacity-50" />
              Pending Approvals I Owe
            </h4>
            <div className="space-y-3">
               <div className="bg-[var(--center-channel-bg)] border border-[color:rgba(var(--error-text-rgb,253,89,96),0.3)] rounded p-3 text-sm shadow-sm">
                 <div className="flex items-center mb-1 text-[var(--error-text)] font-semibold">
                   1 pending in #project-x
                 </div>
                 <div className="opacity-60 text-xs text-[var(--center-channel-color)]">claude requests push to main.</div>
                 <button className="mt-3 px-3 py-1.5 w-full bg-[color:rgba(var(--button-bg-rgb,22,109,224),0.1)] text-[var(--link-color)] text-xs font-medium rounded border border-[color:rgba(var(--button-bg-rgb,22,109,224),0.2)] transition-colors hover:bg-[color:rgba(var(--button-bg-rgb,22,109,224),0.2)]">Jump to Review queue</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
