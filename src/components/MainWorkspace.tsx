import { useState } from 'react';
import { AppTab } from '../types';
import { CodespaceView } from './CodespaceView';
import { WorkspaceContextView } from './WorkspaceContextView';
import { Menu, Hash, Code2, MessageSquare, X } from 'lucide-react';

export function MainWorkspace({ 
  tabs, 
  activeTabId, 
  onSelectTab, 
  onCloseTab,
  onMenuToggle,
  onOpenThread
}: { 
  tabs: AppTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onMenuToggle?: () => void;
  onOpenThread?: (threadId: string) => void;
}) {
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const getIcon = (type: AppTab['type']) => {
    switch (type) {
      case 'channel': return <Hash className="w-4 h-4 mr-2 opacity-70" />;
      case 'codespace': return <Code2 className="w-4 h-4 mr-2 opacity-70" />;
      default: return <MessageSquare className="w-4 h-4 mr-2 opacity-70" />;
    }
  };

  const renderContent = (tab: AppTab) => {
    switch (tab.type) {
      case 'channel': return <WorkspaceContextView channelLabel={tab.label} onMenuToggle={onMenuToggle} onOpenThread={onOpenThread} />;
      case 'codespace': return <CodespaceView onMenuToggle={onMenuToggle} />;
      default: return <div className="p-8 text-[var(--center-channel-color)]">[{tab.label} session]</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--center-channel-bg)] overflow-hidden">
      {/* Top Tab Bar focusing on Workspaces & Modes */}
       <div className="h-10 shrink-0 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[color:rgba(var(--center-channel-color-rgb),0.02)] flex items-center justify-between pr-2">
        <div className="flex items-end h-full overflow-x-auto custom-scrollbar no-scrollbar-y">
          <button 
            onClick={onMenuToggle} 
            className="md:hidden flex items-center justify-center p-2 mb-1 mr-1 ml-2 rounded hover:bg-[color:rgba(var(--center-channel-color-rgb),0.1)] transition-colors opacity-70 hover:opacity-100"
          >
            <Menu className="w-4 h-4" />
          </button>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div 
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group flex items-center px-4 h-full min-w-[140px] max-w-[200px] border-r border-[color:rgba(var(--center-channel-color-rgb),0.12)] cursor-pointer select-none border-t-2 transition-colors ${
                  isActive 
                    ? 'bg-[var(--center-channel-bg)] border-t-[var(--link-color)] text-[var(--center-channel-color)]' 
                    : 'bg-transparent border-t-transparent text-[var(--center-channel-color)] opacity-70 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] hover:opacity-100'
                }`}
              >
                {getIcon(tab.type)}
                <span className="truncate flex-1 text-sm font-medium">{tab.label}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
                  className={`ml-2 p-0.5 rounded hover:bg-[color:rgba(var(--center-channel-color-rgb),0.1)] ${isActive ? 'text-[var(--center-channel-color)] opacity-50' : 'opacity-0 group-hover:opacity-50'}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeTab && renderContent(activeTab)}
      </div>
    </div>
  );
}
