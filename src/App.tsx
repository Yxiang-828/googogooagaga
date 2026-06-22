import { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { AppSurface, OverlayType } from './types';
import { SelfPanelView } from './components/SelfPanelView';

export default function App() {
  const [tabs, setTabs] = useState<AppTab[]>([
    { id: 'chat-project-x', type: 'channel', label: 'project-x' },
    { id: 'codespace-web', type: 'codespace', label: 'Codespace' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('chat-project-x');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);

  const handleSelectTab = (newTab: Partial<AppTab>) => {
    const existing = tabs.find(t => t.id === newTab.id);
    if (!existing) {
      setTabs(prev => [...prev, newTab as AppTab]);
    }
    setActiveTabId(newTab.id!);
    setActiveOverlay(null);
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
        className="h-full flex-shrink-0 transition-all duration-300 relative group z-30"
        onMouseEnter={() => sidebarCollapsed && setSidebarCollapsed(false)}
        onMouseLeave={() => !sidebarCollapsed && setSidebarCollapsed(true)}
      >
         <LeftSidebar 
           collapsed={sidebarCollapsed} 
           activeTabId={activeTabId} 
           onSelectTab={handleSelectTab} 
           onOpenOverlay={setActiveOverlay}
         />
      </div>
      
      <MainWorkspace 
        tabs={tabs} 
        activeTabId={activeTabId} 
        onSelectTab={setActiveTabId} 
        onCloseTab={handleCloseTab} 
      />

      {/* Right Drawer Overlays */}
      {activeOverlay && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setActiveOverlay(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[800px] max-w-[90vw] bg-[#0A0C10] border-l border-gray-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
            {activeOverlay === 'self' && <SelfPanelView onClose={() => setActiveOverlay(null)} />}
            {activeOverlay === 'connect' && <div className="p-8"><h2 className="text-xl">Connect AI (Coming Soon)</h2></div>}
          </div>
        </>
      )}
    </div>
  );
}
