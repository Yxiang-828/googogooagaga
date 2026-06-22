import { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { AppTab, OverlayType } from './types';
import { SelfPanelView } from './components/SelfPanelView';
import { OnboardingFlow } from './components/OnboardingFlow';
import { ConnectPanelView } from './components/ConnectPanelView';
import { SkillsPanelView } from './components/SkillsPanelView';
import { DictionaryPanelView } from './components/DictionaryPanelView';
import { HomePanelView } from './components/HomePanelView';
import { ThreadPanelView } from './components/ThreadPanelView';

export default function App() {
  const [tabs, setTabs] = useState<AppTab[]>([
    { id: 'chat-project-x', type: 'channel', label: 'project-x' },
    { id: 'codespace-web', type: 'codespace', label: 'Codespace' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('chat-project-x');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('agora-onboarded') === 'true';
  });

  const handleSelectTab = (newTab: Partial<AppTab>) => {
    const existing = tabs.find(t => t.id === newTab.id);
    if (!existing) {
      setTabs(prev => [...prev, newTab as AppTab]);
    }
    setActiveTabId(newTab.id!);
    setActiveOverlay(null);
    setMobileMenuOpen(false); // Close mobile menu on select
  };

  const handleCloseTab = (id: string) => {
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('agora-onboarded', 'true');
    setOnboarded(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] font-sans relative">
      {!onboarded && (
        <OnboardingFlow onComplete={handleCompleteOnboarding} />
      )}

      {/* Mobile sidebar backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <div 
        className={`h-full flex-shrink-0 transition-transform duration-300 absolute md:relative z-40 md:z-30 w-64 md:w-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
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
        onMenuToggle={() => setMobileMenuOpen(true)}
        onOpenThread={setActiveThreadId}
      />

      {activeThreadId && (
        <div className="w-[400px] border-l border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[var(--center-channel-bg)] z-10 hidden lg:flex flex-col">
          <ThreadPanelView threadId={activeThreadId} onClose={() => setActiveThreadId(null)} />
        </div>
      )}

      {/* Right Drawer Overlays */}
      {activeOverlay && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setActiveOverlay(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[800px] max-w-[90vw] bg-[var(--center-channel-bg)] border-l border-[color:rgba(var(--center-channel-color-rgb),0.12)] shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
            {activeOverlay === 'self' && <SelfPanelView onClose={() => setActiveOverlay(null)} />}
            {activeOverlay === 'connect' && <ConnectPanelView onClose={() => setActiveOverlay(null)} />}
            {activeOverlay === 'skills' && <SkillsPanelView onClose={() => setActiveOverlay(null)} />}
            {activeOverlay === 'archive' && <DictionaryPanelView onClose={() => setActiveOverlay(null)} />}
            {activeOverlay === 'home' && <HomePanelView onClose={() => setActiveOverlay(null)} />}
          </div>
        </>
      )}
    </div>
  );
}
