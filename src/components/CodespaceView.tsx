import { useState } from 'react';
import { AppWindow, Code2, FolderTree, GitBranch, Settings, ExternalLink, TerminalSquare } from 'lucide-react';

export function CodespaceView() {
  const [activeFile, setActiveFile] = useState('auth.ts');

  return (
    <div className="flex flex-col h-full bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative">
      {/* Optional Read-Only Banner */}
      <div className="h-6 bg-[color:rgba(var(--error-text-rgb,253,89,96),0.1)] border-b border-[color:rgba(var(--error-text-rgb,253,89,96),0.2)] text-[var(--error-text)] text-[10px] uppercase font-bold flex items-center justify-center tracking-widest shrink-0">
        Read-Only Mode: Host rules deny manual edits to this project branch
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree */}
        <div className="w-60 border-r border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex flex-col pt-3 pb-2 z-10 shrink-0 bg-[color:rgba(var(--center-channel-color-rgb),0.02)]">
           <div className="px-4 mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider opacity-60">
             <div className="flex items-center">
               <FolderTree className="w-3.5 h-3.5 mr-1.5" />
               Explorer
             </div>
             <Settings className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer" />
           </div>
           <div className="px-2 space-y-0.5 font-mono text-sm overflow-y-auto custom-scrollbar">
             <div className="px-2 py-1 opacity-70 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded cursor-pointer">src/</div>
             <div 
               onClick={() => setActiveFile('App.tsx')}
               className={`group flex items-center justify-between px-2 py-1.5 ml-4 cursor-pointer rounded transition-colors ${activeFile === 'App.tsx' ? 'bg-[color:rgba(var(--center-channel-color-rgb),0.08)] text-[var(--link-color)]' : 'hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] opacity-80'}`}
             >
               <span>App.tsx</span>
               <div className="flex -space-x-1 shrink-0">
                 <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[var(--center-channel-bg)] bg-[var(--button-bg)] text-[9px] font-bold text-white shadow-sm ring-1 ring-white/10" title="Edited by you">Y</span>
               </div>
             </div>
             <div 
               onClick={() => setActiveFile('auth.ts')}
               className={`group flex items-center justify-between px-2 py-1.5 ml-4 cursor-pointer rounded transition-colors ${activeFile === 'auth.ts' ? 'bg-[color:rgba(var(--center-channel-color-rgb),0.08)] text-[var(--online-indicator)]' : 'hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] opacity-80'}`}
             >
               <span>auth.ts</span>
               <div className="flex -space-x-1 shrink-0">
                 <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[var(--center-channel-bg)] bg-emerald-600 text-[9px] font-bold text-white shadow-sm ring-1 ring-white/10" title="Edited by claude">C</span>
               </div>
             </div>
             <div 
               onClick={() => setActiveFile('package.json')}
               className={`group flex items-center justify-between px-2 py-1.5 cursor-pointer rounded transition-colors ${activeFile === 'package.json' ? 'bg-[color:rgba(var(--center-channel-color-rgb),0.08)] font-medium' : 'hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] opacity-80'}`}
             >
               <span>package.json</span>
               <div className="flex -space-x-1 shrink-0">
                 <span className="w-4 h-4 flex items-center justify-center rounded-full border border-[var(--center-channel-bg)] bg-emerald-600 text-[9px] font-bold text-white shadow-sm ring-1 ring-white/10" title="Edited by claude">C</span>
               </div>
             </div>
             <div className="px-2 py-1 opacity-70 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded cursor-pointer">public/</div>
           </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col border-r border-[color:rgba(var(--center-channel-color-rgb),0.12)] min-w-0">
          <div className="h-10 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[color:rgba(var(--center-channel-color-rgb),0.02)] flex items-center px-4 overflow-x-auto no-scrollbar-y shrink-0">
            <div className="flex items-center text-sm font-mono px-3 py-1 bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded-t border-b-2 border-b-[var(--link-color)]">
              <Code2 className="w-4 h-4 mr-2 opacity-50" />
              {activeFile}
              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="claude is typing"></span>
            </div>
            <div className="flex items-center text-sm font-mono px-3 py-1 opacity-60 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)] rounded-t cursor-pointer border-b-2 border-transparent">
              <Code2 className="w-4 h-4 mr-2" />
              App.tsx
            </div>
          </div>
          
          <div className="flex-1 relative font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar p-0 bg-[var(--center-channel-bg)]">
            <div className="absolute top-2 right-4 flex space-x-2">
              <div className="px-2 py-1 text-xs bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 rounded flex items-center shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                claude editing
              </div>
            </div>

            <div className="h-full flex" style={{ tabSize: 2 }}>
              {/* Line numbers mock */}
              <div className="w-12 flex-shrink-0 text-right pr-4 py-4 opacity-30 select-none bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border-r border-[color:rgba(var(--center-channel-color-rgb),0.08)] text-xs h-[200%]">
                {Array.from({length: 40}).map((_, i) => <div key={i}>{i+1}</div>)}
              </div>
              <div className="p-4 flex-1 whitespace-pre syntax-highlight">
{`import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from './db';

// Ana's agent (claude) writing auth middleware here
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
`}
                <span className="bg-emerald-900/40 border-l-2 border-emerald-500 block -mx-4 px-4 py-0.5 relative text-emerald-300">
{`  if (!authHeader?.startsWith('Bearer ')) {`}
                   <div className="absolute right-2 top-0 mt-0.5 text-[10px] bg-emerald-800 text-white px-1.5 rounded opacity-80 shadow-md">claude</div>
                </span>
                <span className="bg-emerald-900/40 border-l-2 border-emerald-500 block -mx-4 px-4 py-0.5 text-emerald-300">
{`    return res.status(401).json({ error: 'Unauthorized' });`}
                </span>
                <span className="bg-emerald-900/40 border-l-2 border-emerald-500 block -mx-4 px-4 py-0.5 text-emerald-300">
{`  }`}
                </span>
{`

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await db.user.findUnique({ where: { id: decoded.sub } });
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}`}
              </div>
            </div>
          </div>
          <div className="h-44 border-t border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex flex-col bg-[#0A0C10]">
             <div className="h-8 flex items-center px-4 shrink-0 bg-[color:rgba(var(--center-channel-color-rgb),0.04)] border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)]">
                <TerminalSquare className="w-3.5 h-3.5 mr-2 opacity-60" />
                <span className="text-xs font-mono opacity-80">Terminal - node (Running)</span>
             </div>
             <div className="flex-1 p-3 font-mono text-[11px] overflow-y-auto text-gray-400">
                <div className="text-emerald-400">[HMR] connected</div>
                <div>[build] compiled successfully in 234ms</div>
                <div className="opacity-50 mt-1">Listening on http://localhost:3000</div>
                <div className="mt-2 flex items-center"><span className="text-green-400 mr-2">➜</span><span className="animate-pulse block w-2 h-4 bg-gray-500"></span></div>
             </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="hidden lg:flex w-[400px] xl:w-[500px] flex-col bg-[color:rgba(var(--center-channel-color-rgb),0.04)]">
          <div className="h-10 shrink-0 flex items-center px-3 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[color:rgba(var(--center-channel-color-rgb),0.02)] justify-between">
            <div className="flex items-center">
              <AppWindow className="w-4 h-4 mr-2 opacity-60" />
              <span className="text-sm font-semibold opacity-80 text-[var(--center-channel-color)]">Preview</span>
            </div>
            <div className="flex space-x-2">
                <div className="px-2 py-0.5 rounded bg-[color:rgba(var(--center-channel-color-rgb),0.08)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] text-[10px] font-mono opacity-80 cursor-pointer hover:bg-[color:rgba(var(--center-channel-color-rgb),0.12)]">localhost:3000</div>
                <ExternalLink className="w-4 h-4 opacity-50 hover:opacity-100 cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 p-4">
             <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col relative text-black isolate">
               {/* Browser toolbar mock */}
               <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
                   <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                   <div className="ml-4 bg-white border border-gray-200 rounded px-2 text-[10px] font-mono text-gray-500 flex-1 text-center">app.localhost</div>
               </div>
               <div className="flex-1 flex items-center justify-center bg-gray-50 text-center px-6">
                 <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Welcome to Web App</h2>
                    <p className="text-gray-500 text-sm">Please log in to continue accessing your dashboard.</p>
                    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded font-medium shadow-sm hover:bg-blue-700 transition">Sign in with Email</button>
                    {/* Mock reload indicator */}
                    <div className="absolute bottom-4 right-4 text-[10px] text-gray-400 font-mono flex items-center shadow-sm bg-white/80 backdrop-blur px-2 py-1 rounded border border-gray-100">
                        HMR active
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="h-6 bg-[var(--online-indicator)] text-[#0F1115] flex items-center px-4 font-mono text-[10px] font-bold">
        <GitBranch className="w-3 h-3 mr-1" />
        main*
        <span className="mx-3 opacity-30">|</span>
        Active Context: [project-x]
        <span className="mx-3 opacity-30">|</span>
        TypeScript React
      </div>
    </div>
  );
}
