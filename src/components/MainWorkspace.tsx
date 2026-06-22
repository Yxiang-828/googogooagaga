import { useState } from 'react';
import { AppTab } from '../types';
import { CenterFeed } from './CenterFeed';
import { CodespaceView } from './CodespaceView';
import { Hash, Code2, MessageSquare, X, Columns } from 'lucide-react';

export function MainWorkspace({ 
  tabs, 
  activeTabId, 
  onSelectTab, 
  onCloseTab 
}: { 
  tabs: AppTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}) {
  const [splitMode, setSplitMode] = useState(false);
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const getIcon = (type: AppTab['type']) => {
    switch (type) {
      case 'channel': return <Hash className="w-4 h-4 mr-2 text-gray-500" />;
      case 'codespace': return <Code2 className="w-4 h-4 mr-2 text-gray-500" />;
      default: return <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />;
    }
  };

  const renderContent = (tab: AppTab) => {
    switch (tab.type) {
      case 'channel': return <CenterFeed activeChannel={tab.label} />;
      case 'codespace': return <CodespaceView />;
      default: return <div className="p-8 text-gray-500">[{tab.label} session]</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0A0C10] overflow-hidden">
      {/* Top Tab Bar focusing on Workspaces & Modes */}
       <div className="h-10 shrink-0 bg-[#0F1115] border-b border-gray-800 flex items-center justify-between pr-2">
        <div className="flex items-end h-full overflow-x-auto custom-scrollbar no-scrollbar-y">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div 
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group flex items-center px-4 h-full min-w-[140px] max-w-[200px] border-r border-gray-800 cursor-pointer select-none border-t-2 transition-colors ${
                  isActive 
                    ? 'bg-[#15171C] border-t-blue-500 text-gray-200' 
                    : 'bg-transparent border-t-transparent text-gray-500 hover:bg-[#15171C]/50 hover:text-gray-300'
                }`}
              >
                {getIcon(tab.type)}
                <span className="truncate flex-1 text-sm">{tab.label}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
                  className={`ml-2 p-0.5 rounded hover:bg-gray-700 ${isActive ? 'text-gray-400' : 'text-transparent group-hover:text-gray-500'}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex space-x-2 px-2 shrink-0">
          <button 
            onClick={() => setSplitMode(!splitMode)}
            title="Toggle Split View"
            className={`p-1.5 rounded-md transition-colors ${splitMode ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
          >
             <Columns className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {splitMode ? (
          <>
            <div className="w-1/2 flex flex-col border-r border-gray-800 shadow-xl z-10 transition-all">
               {activeTab && renderContent(activeTab)}
            </div>
            <div className="w-1/2 flex flex-col bg-[#0A0C10] shadow-xl transition-all">
              <CodespaceView />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            {activeTab && renderContent(activeTab)}
          </div>
        )}
      </div>
    </div>
  );
}
