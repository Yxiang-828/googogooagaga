import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  User, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Globe, 
  Users, 
  FileCode2, 
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'intro-guide' | 'rules-auth'>('intro-guide');
  const [selectedGuides, setSelectedGuides] = useState<number[]>([0]);
  const [agreedRules, setAgreedRules] = useState({
    authHeader: true,
    localModel: true,
    governanceGate: true,
  });

  const guides = [
    {
      title: "BYO AI Agent Connector",
      desc: "Every humam brings their own local AI model or credentials via standard API connections. Agents are fully secure, sandboxed, and owned by individuals."
    },
    {
      title: "Tabbed Workspace Channels",
      desc: "Switch workspaces using top tabs, and use contextual surface tabs (Feed, Build, Review, Run, Brain, Call) inside each channel."
    },
    {
      title: "Shared Codespace IDE",
      desc: "Interact with real-time files, preview running sites, and observe edits by collaborators and active agents in follow-mode."
    },
    {
      title: "Owner-Governed Action Cards",
      desc: "All state modifications, git pushes, or external library installations are triggered as requests that require permission and manual verification."
    }
  ];

  const toggleGuide = (index: number) => {
    if (selectedGuides.includes(index)) {
      if (selectedGuides.length > 1) {
        setSelectedGuides(selectedGuides.filter(i => i !== index));
      }
    } else {
      setSelectedGuides([...selectedGuides, index]);
    }
  };

  const handleNext = () => {
    if (step === 'intro-guide') {
      setStep('rules-auth');
    } else {
      onComplete();
    }
  };

  // Profile Stamp context info
  const profileStamp = {
    agentName: "Agent Studio",
    rank: "Antigravity Coding Assistant",
    profilePic: "🤖",
    timestamp: "2026-06-22 03:25:14 UTC",
    version: "v3.5-flash-pro-stable"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center bg-[#090a10] text-[#dddddd] font-sans overflow-y-auto p-4 md:p-8">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,109,224,0.15),transparent_60%)] pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none fixed" />

      <div className="w-full max-w-4xl bg-[#12141a] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-0 sm:min-h-[580px] z-10 animate-in fade-in zoom-in-95 duration-500 my-auto">
        
        {/* Step Indicator Panel - Left Side (Discord style card column) */}
        <div className="w-full md:w-80 bg-[#0b0c10] border-b md:border-b-0 md:border-r border-[color:rgba(var(--center-channel-color-rgb),0.12)] p-6 flex flex-col justify-between shrink-0 relative">
          <div>
            <div className="flex items-center space-x-2 text-[var(--link-color)] mb-8">
              <span className="w-8 h-8 rounded-lg bg-[color:rgba(var(--link-color-rgb,22,109,224),0.15)] flex items-center justify-center border border-[color:rgba(var(--link-color-rgb,22,109,224),0.3)]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-bold tracking-wider font-mono text-sm">AGORA ONBOARDING</span>
            </div>

            <div className="space-y-4">
              <div 
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  step === 'intro-guide'

                    ? 'bg-[color:rgba(var(--link-color-rgb,22,109,224),0.1)] border-[var(--link-color)] text-[var(--center-channel-color)]' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                onClick={() => setStep('intro-guide')}
              >
                <div className="text-xs uppercase tracking-wider font-mono font-bold opacity-60 mb-0.5">STEP 1</div>
                <div className="font-semibold text-sm">Interactive Room Guide</div>
              </div>

              <div 
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  step === 'rules-auth'
                    ? 'bg-[color:rgba(var(--link-color-rgb,22,109,224),0.1)] border-[var(--link-color)] text-[var(--center-channel-color)]' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                onClick={() => setStep('intro-guide')} // Can toggle back
              >
                <div className="text-xs uppercase tracking-wider font-mono font-bold opacity-60 mb-0.5">STEP 2</div>
                <div className="font-semibold text-sm">Rules & Access List</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[color:rgba(var(--center-channel-color-rgb),0.06)] text-xs opacity-50 font-mono flex items-center justify-between">
            <span>Server status: OK</span>
            <span className="flex items-center text-[var(--online-indicator)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--online-indicator)] mr-1.5 animate-pulse"></span>
              9 online
            </span>
          </div>
        </div>

        {/* Content Area - Right Side */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-8 min-w-0">
          
          {step === 'intro-guide' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Discord-style banner representation of your workspace */}
                <div className="relative bg-gradient-to-r from-blue-700 to-indigo-900 rounded-xl p-5 mb-6 overflow-hidden border border-indigo-500/30 text-white shadow-lg animate-in slide-in-from-top-4 duration-500">
                  <div className="absolute right-4 bottom-[-10px] text-8xl opacity-10 select-none font-extrabold font-mono pointer-events-none">#</div>
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                     <div className="w-24 h-24 rounded-full border border-white/20"></div>
                  </div>
                  <span className="bg-yellow-400 text-black font-extrabold uppercase text-[10px] px-2 py-0.5 rounded-full tracking-wider shadow">ONBOARDING ACTIVE</span>
                  <h2 className="text-2xl font-black mt-2 tracking-tight">WELCOME TO AGORA TEAM ROOM</h2>
                  <p className="text-xs text-blue-100 mt-1 max-w-lg leading-relaxed">
                    A self-hosted, sovereign development terminal built for real-time human and AI agent synthesis.
                  </p>
                </div>

                <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[var(--link-color)] mb-3">Interactive Workspace Tour</h3>
                <p className="text-xs opacity-75 mb-4 leading-relaxed">
                  Select key nodes below to preview their mechanics and functionality in full workspace mode:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guides.map((g, idx) => {
                    const isSelected = selectedGuides.includes(idx);
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleGuide(idx)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all select-none ${
                          isSelected 
                            ? 'bg-[color:rgba(var(--center-channel-color-rgb),0.06)] border-[var(--link-color)] text-[var(--center-channel-color)]' 
                            : 'bg-transparent border-[color:rgba(var(--center-channel-color-rgb),0.08)] hover:border-[color:rgba(var(--center-channel-color-rgb),0.2)] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[var(--link-color)] bg-[var(--link-color)] text-black' : 'border-gray-600'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                          </div>
                          <span className="font-semibold text-xs font-mono">{g.title}</span>
                        </div>
                        {isSelected && <p className="text-[11px] opacity-80 mt-1.5 leading-normal pl-6">{g.desc}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Stamp section */}
              <div className="bg-[#0b0c10] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-lg p-4 flex items-start space-x-3 mt-6 animate-in fade-in duration-700 relative overflow-hidden">
                <div className="absolute right-4 top-2 text-3xl select-none opacity-10 pointer-events-none">✅</div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg shadow-inner border border-gray-600 shrink-0">
                  {profileStamp.profilePic}
                </div>
                <div className="text-xs flex-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-[color:rgba(var(--center-channel-color-rgb),1)]">{profileStamp.agentName}</span>
                    <span className="text-[10px] bg-[var(--mention-bg)] text-[var(--mention-color)] px-1.5 py-0.5 rounded font-mono font-semibold">{profileStamp.rank}</span>
                  </div>
                  <div className="opacity-60 mt-1 font-mono leading-relaxed">
                     Assigned assistant ID: <span className="text-[var(--link-color)]">{profileStamp.version}</span> initialized on <strong className="text-gray-300">{profileStamp.timestamp}</strong>. Guide verified.
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'rules-auth' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="bg-emerald-950/40 text-[var(--online-indicator)] border border-[color:rgba(var(--online-indicator-rgb,61,184,135),0.3)] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full tracking-wider uppercase">GOVERNANCE PROTOCOLS</span>
                  <h2 className="text-xl font-black mt-2 tracking-tight">RULES & AUTHORIZED ACCESS LIST</h2>
                  <p className="text-xs opacity-70 mt-1 leading-relaxed">
                    Agora operates entirely under active tenant security. Verify and select permissions before launching your team's codespace instance.
                  </p>
                </div>

                <div className="space-y-3">
                  <div 
                    onClick={() => setAgreedRules(prev => ({ ...prev, governanceGate: !prev.governanceGate }))}
                    className="p-3 bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded-lg flex items-start space-x-3 cursor-pointer transition-colors"
                  >
                     <div className="p-1 mt-0.5 shrink-0">
                        <input 
                          type="checkbox" 
                          checked={agreedRules.governanceGate} 
                          onChange={() => {}}
                          className="rounded text-[var(--button-bg)] focus:ring-[var(--button-bg)] bg-transparent w-4 h-4 border-gray-600" 
                        />
                     </div>
                     <div>
                        <div className="text-xs font-mono font-bold flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-[var(--online-indicator)] mr-1.5" />
                          Authority Protection Gate
                        </div>
                        <p className="text-[11px] opacity-70 mt-0.5 leading-relaxed">
                          Require owners' direct authorization before executing dangerous CLI tasks, pushing to main branches, or making live deployments.
                        </p>
                     </div>
                  </div>

                  <div 
                    onClick={() => setAgreedRules(prev => ({ ...prev, localModel: !prev.localModel }))}
                    className="p-3 bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded-lg flex items-start space-x-3 cursor-pointer transition-colors"
                  >
                     <div className="p-1 mt-0.5 shrink-0">
                        <input 
                          type="checkbox" 
                          checked={agreedRules.localModel} 
                          onChange={() => {}}
                          className="rounded text-[var(--button-bg)] focus:ring-[var(--button-bg)] bg-transparent w-4 h-4 border-gray-600" 
                        />
                     </div>
                     <div>
                        <div className="text-xs font-mono font-bold flex items-center">
                          <Terminal className="w-3.5 h-3.5 text-[var(--link-color)] mr-1.5" />
                          BYO Agent Isolated Connections
                        </div>
                        <p className="text-[11px] opacity-70 mt-0.5 leading-relaxed">
                          Agy, Claude-opus-4, and Codex run as private user-owned instances. Private system files and workspace environments will never be exposed globally.
                        </p>
                     </div>
                  </div>

                  <div 
                    onClick={() => setAgreedRules(prev => ({ ...prev, authHeader: !prev.authHeader }))}
                    className="p-3 bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded-lg flex items-start space-x-3 cursor-pointer transition-colors"
                  >
                     <div className="p-1 mt-0.5 shrink-0">
                        <input 
                          type="checkbox" 
                          checked={agreedRules.authHeader} 
                          onChange={() => {}}
                          className="rounded text-[var(--button-bg)] focus:ring-[var(--button-bg)] bg-transparent w-4 h-4 border-gray-600" 
                        />
                     </div>
                     <div>
                        <div className="text-xs font-mono font-bold flex items-center">
                          <Lock className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                          Granular Key Access Controls
                        </div>
                        <p className="text-[11px] opacity-70 mt-0.5 leading-relaxed">
                          Tokens are exclusively verified on safe localhost loopbacks. Shared workspaces will maintain active logging in the workspace run ledger.
                        </p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Small Warning / Disclaimer */}
              <div className="text-[10px] opacity-50 italic">
                By enabling governance access, we establish clear accountability markers, allowing you to reject, approve, or discuss any remote mutations before sync execution.
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 sm:gap-0">
            {step === 'rules-auth' ? (
              <button 
                onClick={() => setStep('intro-guide')}
                className="text-xs font-semibold opacity-70 hover:opacity-100 hover:underline transition-all w-full sm:w-auto text-center sm:text-left"
              >
                ← Back to Intro
              </button>
            ) : (
              <div className="text-xs opacity-50 flex items-center font-mono w-full sm:w-auto justify-center sm:justify-start">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                Step 1 of 2 Complete
              </div>
            )}

            <button
              onClick={handleNext}
              className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-[var(--button-bg)] text-[var(--button-color)] font-bold text-sm rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>{step === 'intro-guide' ? 'Continue to Security & Rules' : 'Accept & Launch Workspace'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
