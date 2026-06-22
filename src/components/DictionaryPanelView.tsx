import { useState, useEffect } from 'react';
import { BookOpen, X, Check, Search, History, BookMarked } from 'lucide-react';

type Proposal = {id: string; agentName: string; issue: string; rootCause?: string; fix: string; createdAt: number};
type Entry = Proposal & {approvedBy: string; approvedAt: number};

export function DictionaryPanelView({ onClose }: { onClose?: () => void }) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [dict, setDict] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setProposals([
        {
          id: 'p1',
          agentName: '@agy',
          issue: 'CORS header missing on staging /api/v1/health',
          rootCause: 'Nginx config was overriding Express headers due to proxy_pass ordering',
          fix: 'Moved add_header Access-Control-Allow-Origin to the location block after proxy_pass',
          createdAt: Date.now() - 3600000
        }
      ]);
      setDict([
        {
          id: 'd1',
          agentName: 'claude',
          issue: 'Mobile safari 100vh scrolling bug',
          fix: 'Used -webkit-fill-available in root CSS variables instead of 100vh',
          createdAt: Date.now() - 86400000 * 3,
          approvedBy: 'xiangyao',
          approvedAt: Date.now() - 86400000 * 2
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const approve = (id: string) => {
    const p = proposals.find(p => p.id === id);
    if (p) {
      setProposals(prev => prev.filter(x => x.id !== id));
      setDict(prev => [{...p, approvedBy: 'me', approvedAt: Date.now()}, ...prev]);
    }
  };

  const reject = (id: string) => {
    setProposals(prev => prev.filter(x => x.id !== id));
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
          <BookMarked className="w-6 h-6 mr-3 text-amber-500" />
          Archive & Dictionary
        </h3>
        <p className="text-sm opacity-60 leading-relaxed">
          Review pending proposals and browse the approved Dictionary. Type <code>wrap</code> when @mentioning an agent in a thread to propose a Dictionary entry.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-xl"></div>
          </div>
        ) : (
          <>
            <section>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center opacity-70 border-b border-[color:rgba(var(--center-channel-color-rgb),0.1)] pb-2">
                <History className="w-4 h-4 mr-2" />
                Pending Review ({proposals.length})
              </h4>
              
              {proposals.length === 0 ? (
                <div className="text-sm opacity-50 italic px-2">Nothing pending.</div>
              ) : (
                <div className="space-y-4">
                  {proposals.map(p => (
                    <div key={p.id} className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-amber-500/30 rounded-xl p-5 shadow-sm">
                      <div className="font-semibold mb-3">{p.issue}</div>
                      {p.rootCause && (
                        <div className="text-sm mb-2"><span className="opacity-60 font-semibold uppercase text-[10px] tracking-wider mr-2">Root Cause</span> {p.rootCause}</div>
                      )}
                      <div className="text-sm mb-4"><span className="opacity-60 font-semibold uppercase text-[10px] tracking-wider mr-2">Fix</span> {p.fix}</div>
                      <div className="text-xs opacity-50 font-mono mb-4">from {p.agentName} · 1 hr ago</div>
                      
                      <div className="flex gap-2">
                        <button onClick={() => approve(p.id)} className="px-4 py-1.5 bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] hover:bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.2)] text-[var(--online-indicator)] border border-[color:rgba(var(--online-indicator-rgb,61,184,135),0.3)] rounded font-semibold text-xs transition-colors">
                          Approve
                        </button>
                        <button onClick={() => reject(p.id)} className="px-4 py-1.5 border border-[color:rgba(var(--error-text-rgb,253,89,96),0.3)] text-[var(--error-text)] hover:bg-[color:rgba(var(--error-text-rgb,253,89,96),0.1)] rounded font-semibold text-xs transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center opacity-70 border-b border-[color:rgba(var(--center-channel-color-rgb),0.1)] pb-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Dictionary ({dict.length})
              </h4>
              
              {dict.length === 0 ? (
                <div className="text-sm opacity-50 italic px-2">No approved entries yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dict.map(e => (
                    <div key={e.id} className="bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-lg p-4 shadow-sm hover:border-[color:rgba(var(--center-channel-color-rgb),0.3)] transition-colors">
                      <div className="font-semibold text-sm mb-3">{e.issue}</div>
                      <div className="text-xs leading-relaxed opacity-80 mb-4">{e.fix}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-40">
                        {e.approvedBy} · 2 days ago
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
