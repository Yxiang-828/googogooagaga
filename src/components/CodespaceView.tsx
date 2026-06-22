import { useState } from 'react';
import { AppWindow, Code2, FolderTree, ArrowRightLeft, GitBranch, Settings, ExternalLink } from 'lucide-react';

export function CodespaceView() {
  const [activeFile, setActiveFile] = useState('auth.ts');

  return (
    <div className="flex flex-col h-full bg-[#0A0C10]">
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
        <div className="w-48 border-r border-gray-800 flex flex-col py-2 z-10 shrink-0">
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
               <div className="flex -space-x-1 shrink-0" title="Edited by claude">
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
               <span className="flex items-center"><GitBranch className="w-3 h-3 mr-1 text-emerald-500" /> web-app</span>
             </div>
           </div>
           <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-y-auto custom-scrollbar">
             {activeFile === 'auth.ts' && (
               <>
                 <div className="text-gray-500 mb-3">{"// Follow-mode: tracking @claude edits"}</div>
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
