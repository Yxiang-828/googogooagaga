import { useState, useRef, useEffect } from 'react';
import { Network, X, RefreshCw, Copy, Download, CheckCircle2, DownloadCloud } from 'lucide-react';

const AGENTS = [
    {id: 'claude', name: 'Claude', desc: 'Anthropic Claude Code', need: 'install the `claude` CLI, then `claude auth login`'},
    {id: 'codex', name: 'Codex', desc: 'OpenAI Codex', need: 'install the `codex` CLI, then `codex login`'},
    {id: 'antigravity', name: 'Antigravity', desc: 'Google Antigravity (agy)', need: 'install Antigravity, then run `agy` once to log in'},
    {id: 'gemini', name: 'Gemini', desc: 'Google Gemini', need: 'install the `gemini` CLI, then run `gemini` once to log in'},
];

export function ConnectPanelView({ onClose }: { onClose?: () => void }) {
  const [picked, setPicked] = useState<Record<string, boolean>>({claude: true, codex: true, antigravity: true});
  const [workdirs, setWorkdirs] = useState<Record<string, string>>({});
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const sel = AGENTS.filter(a => picked[a.id]).map(a => a.id);
  const allSel = sel.length === AGENTS.length;
  
  const args: string[] = [];
  if (!allSel) args.push(`--agents ${sel.join(',')}`);
  AGENTS.forEach((a) => {
      const wd = (workdirs[a.id] || '').trim();
      if (picked[a.id] && wd) {
          args.push(`--workdir "${a.id}=${wd}"`);
      }
  });
  
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const cmd = code ? `python connector/pair.py ${code} ${origin} ${args.join(' ')}`.trim() : '';

  const handleGenerate = () => {
    setBusy(true);
    // Mock generating pairing code
    setTimeout(() => {
      setCode(Array.from({length: 8}, () => Math.random().toString(36)[2]).join('').toUpperCase());
      setBusy(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (!cmd) return;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative custom-scrollbar">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="mb-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold flex items-center mb-2">
          <Network className="w-6 h-6 mr-3 text-[var(--link-color)]" />
          Connect your AI
        </h3>
        <p className="text-sm opacity-60 leading-relaxed">
          Your AI runs on YOUR machine, on YOUR subscription. The room never sees its login — it just relays messages. Each AI you pick joins as its own bot.
        </p>
        
        <div className="mt-4 p-4 rounded-xl border border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[color:rgba(var(--center-channel-color-rgb),0.02)]">
          <p className="text-xs font-semibold mb-2 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--online-indicator)]" /> Before you connect</p>
          <ul className="text-xs opacity-70 list-disc pl-5 space-y-1.5">
             <li>Install the CLI for each AI you'll use — and log in. A CLI that isn't logged in will not connect.</li>
             <li>Only tick AIs you actually have installed. Others will be automatically skipped.</li>
             <li>Your machine needs Python 3 and Node.js.</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Step 1 */}
        <section>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center opacity-70">
            <span className="w-5 h-5 rounded bg-[var(--link-color)] text-black flex items-center justify-center text-[10px] mr-2">1</span>
            Pick which AI(s) to bring in
          </h4>
          <div className="space-y-3">
            {AGENTS.map(a => (
               <div key={a.id} className={`p-4 rounded-xl border transition-colors ${picked[a.id] ? 'bg-[color:rgba(var(--center-channel-color-rgb),0.04)] border-[color:rgba(var(--center-channel-color-rgb),0.2)]' : 'bg-transparent border-[color:rgba(var(--center-channel-color-rgb),0.08)]'}`}>
                 <label className="flex items-start cursor-pointer">
                   <div className="mt-0.5 mr-3">
                     <input 
                       type="checkbox" 
                       checked={!!picked[a.id]}
                       onChange={(e) => setPicked({...picked, [a.id]: e.target.checked})}
                       className="rounded text-[var(--link-color)] focus:ring-[var(--link-color)] bg-transparent w-4 h-4 border-gray-600" 
                     />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center">
                       <span className="font-semibold text-sm">{a.name}</span>
                       <span className="opacity-50 text-xs ml-2">— {a.desc}</span>
                     </div>
                     <div className="text-xs opacity-50 font-mono mt-1">needs: {a.need}</div>
                   </div>
                 </label>
                 
                 {picked[a.id] && (
                   <div className="mt-4 pl-7">
                     <input 
                       type="text" 
                       placeholder="Workspace folder (optional) — e.g. /home/me/project"
                       value={workdirs[a.id] || ''}
                       onChange={e => setWorkdirs({...workdirs, [a.id]: e.target.value})}
                       className="w-full bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.2)] rounded p-2 text-xs font-mono placeholder:opacity-40 focus:border-[var(--link-color)] outline-none"
                     />
                     <p className="text-[10px] opacity-50 mt-1">Runs the agent in this folder so it picks up its config. Blank = clean folder.</p>
                   </div>
                 )}
               </div>
            ))}
          </div>
        </section>
        
        {/* Step 2 */}
        <section>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center opacity-70">
            <span className="w-5 h-5 rounded bg-[var(--link-color)] text-black flex items-center justify-center text-[10px] mr-2">2</span>
            Generate Pairing Code
          </h4>
          <div className="flex items-center gap-4">
             <button 
               onClick={handleGenerate}
               disabled={busy || sel.length === 0}
               className="bg-[var(--button-bg)] text-[var(--button-color)] px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
             >
               {busy ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
               {busy ? 'Generating...' : code ? 'New Code' : 'Generate Code'}
             </button>
             {sel.length === 0 && <span className="text-xs text-[var(--error-text)] opacity-80">Pick at least one AI above</span>}
          </div>
        </section>
        
        {/* Step 3 */}
        {code && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-500">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center opacity-70">
              <span className="w-5 h-5 rounded bg-[var(--link-color)] text-black flex items-center justify-center text-[10px] mr-2">3</span>
              Get your connector & run it
            </h4>
            
            <div className="bg-[color:rgba(var(--center-channel-color-rgb),0.03)] border border-[color:rgba(var(--link-color-rgb,22,109,224),0.3)] rounded-xl p-5 shadow-sm">
              <button className="w-full bg-[color:rgba(var(--center-channel-color-rgb),0.06)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.1)] border border-[color:rgba(var(--center-channel-color-rgb),0.1)] rounded-lg py-3 flex items-center justify-center text-sm font-semibold transition-colors mb-4">
                <DownloadCloud className="w-4 h-4 mr-2" />
                Download Connector (.zip)
              </button>
              <p className="text-xs opacity-60 leading-relaxed text-center mb-6 max-w-xl mx-auto">
                Unzip it, then double-click the launcher for your OS (start-windows.bat / start-macos.command). Your picked AIs will join as bots here.
              </p>
              
              <div className="border-t border-[color:rgba(var(--center-channel-color-rgb),0.1)] pt-5">
                <p className="text-xs font-semibold opacity-70 mb-2">Prefer the command line instead?</p>
                <div className="flex items-center gap-2 bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.2)] rounded-lg p-2 overflow-x-auto">
                  <div className="flex-1 font-mono text-xs whitespace-nowrap overflow-x-auto pl-2 py-1 text-[var(--link-color)]">{cmd}</div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex-shrink-0 bg-[color:rgba(var(--center-channel-color-rgb),0.05)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.1)] p-1.5 rounded transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-[var(--online-indicator)]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center p-3 rounded-lg bg-[color:rgba(var(--center-channel-color-rgb),0.03)] border border-[color:rgba(var(--center-channel-color-rgb),0.06)]">
                 <RefreshCw className="w-4 h-4 mr-2 text-[var(--link-color)] animate-spin" />
                 <span className="text-sm">Waiting for your machine to pair...</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
