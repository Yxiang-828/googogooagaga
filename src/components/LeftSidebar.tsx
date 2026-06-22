import React from 'react';
import { 
  Hash, 
  Map, 
  Cpu, 
  BrainCircuit, 
  Activity, 
  ChevronRight, 
  CircleDot,
  Circle,
  Settings,
  KeySquare,
  Database,
  FolderArchive,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { AppTab, RosterMember } from '../types';

const ROSTER: RosterMember[] = [
  { id: 'u1', name: 'ana', type: 'human', status: 'online' },
  { id: 'a1', name: 'claude', type: 'agent', owner: 'ana', status: 'online', roleBadge: 'cld' },
  { id: 'u2', name: 'ben', type: 'human', status: 'busy' },
  { id: 'a2', name: 'codex', type: 'agent', owner: 'ben', status: 'online', roleBadge: 'cdx' },
  { id: 'u3', name: 'you', type: 'human', status: 'online' },
  { id: 'a3', name: 'agy', type: 'agent', owner: 'you', status: 'online', roleBadge: 'agy', isMine: true },
];

export function LeftSidebar({ 
  collapsed, 
  activeTabId, 
  onSelectTab 
}: { 
  collapsed: boolean;
  activeTabId: string;
  onSelectTab: (tab: Partial<AppTab>) => void;
}) {
  
  const NavItem = ({ icon: Icon, label, type, id, indicatorCode }: { icon: React.ElementType, label: string, type: AppTab['type'], id: string, indicatorCode?: string }) => {
    const isActive = activeTabId === id;
    
    if (collapsed) {
      return (
        <button 
          onClick={() => onSelectTab({ id, type, label })}
          title={label}
          className={`relative w-10 h-10 mb-2 flex items-center justify-center rounded-xl mx-auto transition-colors ${
            isActive 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
          }`}>
          <Icon className="w-5 h-5 opacity-80" />
          {indicatorCode === 'working' && <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>}
          {indicatorCode === 'approval' && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">1</span>}
        </button>
      );
    }
    
    return (
      <button 
        onClick={() => onSelectTab({ id, type, label })}
        className={`w-[calc(100%-1rem)] flex items-center px-3 py-1.5 text-sm rounded mx-2 transition-colors mb-0.5 ${
          isActive 
            ? 'bg-gray-800 text-gray-100 border-l-4 border-blue-500 pl-2' 
            : 'border-l-4 border-transparent pl-2 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
        }`}>
        <Icon className="w-4 h-4 mr-2.5 opacity-70 shrink-0" />
        <span className="truncate text-left flex-1">{label}</span>
        {indicatorCode === 'working' && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)] mr-1"></span>}
        {indicatorCode === 'approval' && <span className="px-1.5 py-0.5 bg-red-500 rounded text-[10px] font-bold text-white">1</span>}
      </button>
    );
  };

  const NavGroup = ({ title, children }: { title: string, children: React.ReactNode }) => {
    if (collapsed) return <div className="mb-4">{children}</div>;
    return (
      <div className="mb-6">
        <h3 className="px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
          <ChevronDown className="w-3 h-3 mr-1" />
          {title}
        </h3>
        {children}
      </div>
    );
  };

  // Group Roster by Humans
  const humans = ROSTER.filter(r => r.type === 'human');
  const getAgentsForOwner = (ownerName: string) => ROSTER.filter(r => r.type === 'agent' && r.owner === ownerName);

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-[#0F1115] border-r border-gray-800 flex flex-col h-full flex-shrink-0 select-none transition-all duration-300 z-20`}>
      {/* Workspace Header */}
      <div className={`h-14 flex items-center ${collapsed ? 'justify-center border-b border-gray-800/50' : 'px-5'} shrink-0 mb-4`}>
        {collapsed ? (
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-900/50">A</div>
        ) : (
          <>
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-600 mr-3 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-900/50">A</div>
            <h1 className="font-bold text-gray-100 tracking-tight text-lg">Agora</h1>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <NavGroup title="Main">
          <NavItem id="self-panel" icon={KeySquare} label="Me (Self Panel)" type="self" />
          <NavItem id="connect-panel" icon={LayoutDashboard} label="Connect AI" type="connect" />
        </NavGroup>

        <NavGroup title="Channels">
          <NavItem id="chat-project-x" icon={Hash} label="project-x" type="channel" indicatorCode="working" />
          <NavItem id="chat-debug" icon={Cpu} label="debug" type="channel" indicatorCode="approval" />
          <NavItem id="chat-web" icon={Hash} label="web" type="channel" />
        </NavGroup>

        {!collapsed && (
          <div className="mt-6 border-t border-gray-800/50 pt-4">
            <div className="px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
              <ChevronDown className="w-3 h-3 mr-1" />
              Connected Roster
            </div>
            <div className="space-y-2 mt-2">
              {humans.map(human => {
                const myAgents = getAgentsForOwner(human.name);
                return (
                  <div key={human.id} className="pl-2 pr-4">
                    {/* Human Row */}
                    <div className="flex items-center py-1 group">
                      <div className="relative flex items-center justify-center w-4 h-4 mr-2">
                        {human.status === 'online' ? (
                          <CircleDot className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Circle className="w-3 h-3 text-red-500 fill-red-500/20" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300 font-medium tracking-tight">
                        {human.name}
                      </span>
                    </div>
                    {/* Nested Agents */}
                    <div className="ml-5 border-l border-gray-800 pl-3 space-y-1 my-1">
                      {myAgents.map(agent => (
                        <div key={agent.id} className="flex items-center py-1 group">
                           <div className="w-4 h-4 text-gray-600 flex items-center justify-center font-mono text-[9px] font-bold mr-2 uppercase">
                             {agent.roleBadge?.[0]}
                           </div>
                           <span className="text-xs text-gray-400 group-hover:text-gray-300">{agent.name}</span>
                           {agent.isMine && <span className="ml-2 text-[9px] text-blue-500 bg-blue-500/10 px-1 py-0.5 rounded border border-blue-500/20">ME</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Settings / Toggle Footer */}
      <div className={`p-3 border-t border-gray-800 mt-auto flex ${collapsed ? 'justify-center' : 'justify-end'}`}>
        <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
