import { useState } from 'react';
import { CenterFeed } from './CenterFeed';
import { CodespaceView } from './CodespaceView';
import { Hash, Code2, ShieldCheck, TerminalSquare, BookOpen, Phone } from 'lucide-react';
import { AppSurface } from '../types';

const SURFACES: { id: AppSurface; label: string; icon: React.ElementType }[] = [
  { id: 'feed', label: 'Feed', icon: Hash },
  { id: 'build', label: 'Build', icon: Code2 },
  { id: 'review', label: 'Review', icon: ShieldCheck },
  { id: 'run', label: 'Run', icon: TerminalSquare },
  { id: 'brain', label: 'Brain', icon: BookOpen },
  { id: 'call', label: 'Call', icon: Phone },
];

export function WorkspaceContextView({ channelLabel }: { channelLabel: string }) {
  const [activeSurface, setActiveSurface] = useState<AppSurface>('feed');

  const renderContent = () => {
    switch (activeSurface) {
      case 'feed': return <CenterFeed activeChannel={channelLabel} />;
      case 'build': return <CodespaceView />;
      case 'review': return (
         <div className="flex-1 p-8 text-[var(--center-channel-color)] flex flex-col h-full bg-[var(--center-channel-bg)]">
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            <div className="border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-lg p-4 bg-[color:rgba(var(--center-channel-color-rgb),0.04)]">
               <div className="flex justify-between items-start mb-2">
                 <div>
                    <div className="font-semibold text-[var(--center-channel-color)]">push to main</div>
                    <div className="text-sm text-[var(--error-text)] font-mono mt-1">Blast radius: high</div>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-[var(--button-bg)] text-[var(--button-color)] rounded">Approve</button>
                    <button className="px-3 py-1.5 text-sm border border-[color:rgba(var(--center-channel-color-rgb),0.2)] rounded hover:bg-[color:rgba(var(--center-channel-color-rgb),0.08)]">Deny</button>
                 </div>
               </div>
               <div className="text-sm opacity-80 mb-2">claude (owned by ana) is requesting to push auth updates.</div>
               <div className="bg-[#111] text-gray-300 font-mono text-xs p-3 rounded overflow-x-auto">
                 git commit -m "feat: implement auth middleware" && git push origin main
               </div>
            </div>
         </div>
      );
      case 'run': return <div className="p-8 text-[var(--center-channel-color)] bg-[var(--center-channel-bg)] h-full">Run logs & CI surface</div>;
      case 'brain': return <div className="p-8 text-[var(--center-channel-color)] bg-[var(--center-channel-bg)] h-full">Brain & Dictionary</div>;
      case 'call': return <div className="p-8 text-[var(--center-channel-color)] bg-[var(--center-channel-bg)] h-full">Screenshare & Call surface</div>;
      default: return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--center-channel-bg)] text-[var(--center-channel-color)]">
      <div className="h-12 shrink-0 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex items-center justify-between px-4 bg-[color:rgba(var(--center-channel-color-rgb),0.02)]">
        <div className="flex items-center">
            <Hash className="w-5 h-5 mr-2 opacity-70" />
            <span className="font-semibold mr-6">{channelLabel}</span>
            <div className="flex items-end h-full mt-2">
            {SURFACES.map((surface) => {
                const isActive = activeSurface === surface.id;
                const Icon = surface.icon;
                return (
                <button 
                    key={surface.id}
                    onClick={() => setActiveSurface(surface.id)}
                    className={`flex items-center px-4 py-2 border-b-2 text-sm transition-colors focus:outline-none ${
                    isActive 
                        ? 'border-[var(--link-color)] font-medium text-[var(--center-channel-color)] bg-[color:rgba(var(--center-channel-color-rgb),0.06)] rounded-t-md' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)]'
                    }`}
                >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{surface.label}</span>
                </button>
                );
            })}
            </div>
        </div>
        
        <div className="flex items-center text-xs border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded bg-[color:rgba(var(--center-channel-color-rgb),0.04)] px-2 py-1">
             Codespace bound: <span className="font-mono ml-1 opacity-80">web-app</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
         {renderContent()}
      </div>
    </div>
  );
}
