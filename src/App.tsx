import { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { AppTab } from './types';

const INITIAL_TABS: AppTab[] = [
  { id: 'chat-project-x', type: 'channel', label: 'project-x' },
  { id: 'codespace-web', type: 'codespace', label: 'Codespace' }
];

export default function App() {
  const [tabs, setTabs] = useState<AppTab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('chat-project-x');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectTabFromSidebar = (newTab: Partial<AppTab>) => {
    // Check if tab is already open
    const existing = tabs.find(t => t.id === newTab.id);
    if (!existing) {
      setTabs(prev => [...prev, newTab as AppTab]);
    }
    setActiveTabId(newTab.id!);
  };

  const handleCloseTab = (id: string) => {
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0C10] text-gray-100 font-sans">
      <div 
        className="h-full flex-shrink-0 transition-all duration-300 relative group"
        onMouseEnter={() => sidebarCollapsed && setSidebarCollapsed(false)}
        onMouseLeave={() => !sidebarCollapsed && setSidebarCollapsed(true)}
      >
         <LeftSidebar 
           collapsed={sidebarCollapsed} 
           activeTabId={activeTabId} 
           onSelectTab={handleSelectTabFromSidebar} 
         />
      </div>
      
      <MainWorkspace 
        tabs={tabs} 
        activeTabId={activeTabId} 
        onSelectTab={setActiveTabId} 
        onCloseTab={handleCloseTab} 
      />
    </div>
  );
}
