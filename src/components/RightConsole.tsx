import { useState } from 'react';
import { ConsoleTab } from '../types';
import { AppWindow, Code2, FolderTree, ArrowRightLeft, GitBranch, KeySquare, BrainCircuit, ExternalLink, Settings, Download } from 'lucide-react';

const TABS: ConsoleTab[] = ['Home', 'Me', 'Connect', 'Skills', 'Codespace', 'Archive'];

export function RightConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('Codespace');

  return (
    <div className="w-[450px] lg:w-[500px] xl:w-[600px] bg-[#0A0C10] border-l border-gray-800 flex flex-col h-full flex-shrink-0">
      {/* Console Tabs */}
      <div className="h-12 flex items-end px-2 border-b border-gray-800 shrink-0 space-x-1 overflow-x-auto custom-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2
              ${activeTab === tab 
                ? 'text-gray-100 bg-[#1A1D24] mb-[-1px] border-blue-500' 
                : 'text-gray-500 hover:text-gray-300 border-transparent hover:bg-gray-900'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative custom-scrollbar">
        {activeTab === 'Home' && (
          <div className="flex-1 p-8 text-gray-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Welcome to Agora</h2>
            <p className="mb-6 text-gray-400">This is the working prototype of the Agora workspace interface.</p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-gray-400 mr-3">1</span>
                <div>Use the <strong className="text-gray-100">Left Rail</strong> to navigate channels and view the robust, live connected roster. Your BYO agents show up there.</div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-gray-400 mr-3">2</span>
                <div>The <strong className="text-gray-100">Center Feed</strong> is your command surface. Mention an agent to act, see live actions, and approve mutations.</div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-gray-400 mr-3">3</span>
                <div>The <strong className="text-gray-100">Codespace</strong> tab contains a dynamic canvas with a live preview and follow-mode. Files update live as agents write them.</div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-gray-400 mr-3">4</span>
                <div>Use the <strong className="text-gray-100">Self Panel (Me)</strong> to govern your connected agents and fine-tune permissions.</div>
              </li>
            </ul>
          </div>
        )}
        {activeTab === 'Connect' && (
          <div className="flex-1 p-8 text-gray-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-100">Connect AI</h2>
            <p className="text-sm text-gray-400 mb-8">Select your local CLI agents to connect to the workspace securely.</p>
            <div className="space-y-4">
              <label className="flex items-start space-x-3 p-4 bg-[#15171C] border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                <input type="checkbox" className="form-checkbox mt-1 w-4 h-4 text-blue-500 rounded bg-gray-900 border-gray-700" defaultChecked />
                <div>
                  <div className="font-semibold text-gray-200">agy (local-cli)</div>
                  <div className="text-xs text-gray-500 mt-1">gemini-1.5 · Active heartbeat</div>
                </div>
              </label>
              <label className="flex items-start space-x-3 p-4 bg-[#15171C] border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                <input type="checkbox" className="form-checkbox mt-1 w-4 h-4 text-blue-500 rounded bg-gray-900 border-gray-700" />
                <div>
                  <div className="font-semibold text-gray-200">claude-desktop</div>
                  <div className="text-xs text-gray-500 mt-1">Disconnected</div>
                </div>
              </label>
            </div>
            <button className="mt-8 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Connector
            </button>
          </div>
        )}
        {activeTab === 'Skills' && (
          <div className="flex-1 p-8 text-gray-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-100">Skills</h2>
            <p className="text-sm text-gray-400 mb-8">Gated skill list (skill_law verdicts) available to the room.</p>
            <div className="space-y-3">
              <div className="p-4 bg-[#15171C] border border-gray-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-200">Database Migration</div>
                  <div className="text-xs text-gray-500 mt-1">Allows agent to run drizzle-kit push</div>
                </div>
                <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Approved</span>
              </div>
              <div className="p-4 bg-[#15171C] border border-gray-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-200">Production Deploy</div>
                  <div className="text-xs text-gray-500 mt-1">Trigger CI/CD pipeline</div>
                </div>
                <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Requires Owner</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Archive' && (
          <div className="flex-1 p-8 text-gray-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-100">Archive</h2>
            <p className="text-sm text-gray-400 mb-8">Approved `/wrap` proposals and the learned context Dictionary.</p>
            <div className="p-4 border border-gray-800 bg-[#15171C] rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center text-gray-200">
                <BrainCircuit className="w-4 h-4 mr-2 text-purple-400" /> 
                System Dictionary
              </h3>
              <p className="text-sm text-gray-400">24 approved concepts, 3 architectural patterns</p>
            </div>
          </div>
        )}
        {activeTab === 'Codespace' && <CodespaceView />}
        {activeTab === 'Me' && <SelfPanelView />}
      </div>
    </div>
  );
}

function CodespaceView() {
  const [activeFile, setActiveFile] = useState('auth.ts');

  return (
    <div className="flex flex-col h-full">
      {/* Top Split: Live Preview */}
      <div className="h-[40%] flex flex-col border-b border-gray-800 bg-[#15171C]">
        <div className="h-8 shrink-0 flex items-center px-3 border-b border-gray-800/50 bg-[#0F1115] justify-between">
          <div className="flex items-center">
            <AppWindow className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Live Preview</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 cursor-pointer" />
        </div>
        <div className="flex-1 flex items-center justify-center border-4 border-dashed border-gray-800/50 m-4 rounded-xl relative overflow-hidden bg-[#0A0C10]">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-gray-500 font-medium mb-2 opacity-50">App Preview Rendering</div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Split: Monaco Editor Mockup */}
      <div className="h-[60%] flex bg-[#0A0C10]">
        {/* File Tree Mock */}
        <div className="w-48 border-r border-gray-800 flex flex-col py-2 z-10">
           <div className="px-3 mb-2 flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
             <div className="flex items-center">
               <FolderTree className="w-3.5 h-3.5 mr-1.5" />
               Explorer
             </div>
             <Settings className="w-3.5 h-3.5 text-gray-600 hover:text-gray-400 cursor-pointer" />
           </div>
           <div className="px-2 space-y-0.5 font-mono text-[11px] text-gray-300 overflow-y-auto custom-scrollbar">
             <div className="px-2 py-1 text-gray-400 hover:bg-gray-800/50 rounded cursor-pointer">src/</div>
             <div 
               onClick={() => setActiveFile('App.tsx')}
               className={`group flex items-center justify-between px-2 py-1 ml-4 cursor-pointer rounded transition-colors ${activeFile === 'App.tsx' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800/50 text-gray-400'}`}
             >
               <span>App.tsx</span>
               <div className="flex -space-x-1 shrink-0" title="Edited by you">
                 <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[#0A0C10] bg-blue-600 text-[9px] font-bold text-white shadow-sm">Y</span>
               </div>
             </div>
             <div 
               onClick={() => setActiveFile('auth.ts')}
               className={`group flex items-center justify-between px-2 py-1 ml-4 cursor-pointer rounded transition-colors ${activeFile === 'auth.ts' ? 'bg-gray-800 text-emerald-400' : 'hover:bg-gray-800/50 text-gray-400'}`}
             >
               <span>auth.ts</span>
               <div className="flex -space-x-1 shrink-0" title="Edited by ana-claude">
                 <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[#0A0C10] bg-emerald-600 text-[9px] font-bold text-white shadow-sm">C</span>
               </div>
             </div>
             <div 
               onClick={() => setActiveFile('main.tsx')}
               className={`group flex items-center justify-between px-2 py-1 ml-4 cursor-pointer rounded transition-colors ${activeFile === 'main.tsx' ? 'bg-gray-800 text-purple-400' : 'hover:bg-gray-800/50 text-gray-400'}`}
             >
               <span>main.tsx</span>
             </div>
           </div>
        </div>

        {/* Editor Mock */}
        <div className="flex-1 flex flex-col min-w-0">
           <div className="h-8 shrink-0 flex items-center px-3 border-b border-gray-800 bg-[#0F1115] justify-between">
             <div className="flex items-center text-xs font-mono text-gray-400">
               <Code2 className="w-3.5 h-3.5 mr-2" />
               <span className="text-gray-300">{activeFile}</span>
             </div>
             <div className="flex items-center text-[10px] text-gray-500 font-mono space-x-3">
               <span className="flex items-center"><ArrowRightLeft className="w-3 h-3 mr-1" /> yjs</span>
               <span className="flex items-center"><GitBranch className="w-3 h-3 mr-1 text-emerald-500" /> track-c</span>
             </div>
           </div>
           <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-y-auto custom-scrollbar">
             {activeFile === 'auth.ts' && (
               <>
                 <div className="text-gray-500 mb-3">{"// Follow-mode: tracking @ana-claude edits"}</div>
                 <div className="text-purple-400">import <span className="text-gray-300">{"{ createClient }"}</span> from <span className="text-emerald-300">'@supabase/supabase-js'</span>;</div>
                 <br />
                 <div className="bg-emerald-900/10 border-l-2 border-emerald-500/50 pl-3 -ml-3 my-1 py-1 rounded-r">
                   <div className="text-blue-400">export const <span className="text-gray-300">auth</span> = <span className="text-blue-400">createClient</span>(</div>
                   <div className="text-gray-300 pl-4">process.env.SUPABASE_URL,</div>
                   <div className="text-gray-300 pl-4 border-b border-emerald-500/30 animate-pulse">process.env.SUPABASE_KEY_NEW</div>
                   <div className="text-gray-300">);</div>
                 </div>
               </>
             )}
             {activeFile === 'App.tsx' && (
               <>
                 <div className="text-purple-400">import <span className="text-gray-300">React</span> from <span className="text-emerald-300">'react'</span>;</div>
                 <br />
                 <div className="text-blue-400">export default function <span className="text-yellow-200">App</span>() {"{"}</div>
                 <div className="text-gray-300 pl-4">return (</div>
                 <div className="text-gray-300 pl-8 text-emerald-400">&lt;div className="app-container"&gt;</div>
                 <div className="text-gray-300 pl-12 text-gray-400">&lt;h1&gt;Hello Agora&lt;/h1&gt;</div>
                 <div className="text-gray-300 pl-8 text-emerald-400">&lt;/div&gt;</div>
                 <div className="text-gray-300 pl-4">);</div>
                 <div className="text-gray-300">{"}"}</div>
               </>
             )}
             {activeFile === 'main.tsx' && (
               <div className="text-gray-500 italic">{"// main entry point initializing react dom..."}</div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function SelfPanelView() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-100 flex items-center">
          <KeySquare className="w-6 h-6 mr-3 text-blue-400" />
          The Self Panel
        </h3>
        <p className="text-sm text-gray-400 mt-2 max-w-xl">
          Owner-governed access. Configure your BYO agents, access lists, and usage rules here. No one can drive your agent without your rules.
        </p>
      </div>

      <div className="space-y-6">
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
                <span className="font-medium">Ask me on mutations (Track C Codespace)</span>
                <span className="text-xs text-blue-400">Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
