import { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export type SubAction = { id?: string; label: string; tool?: string; status?: string; result?: string; duration_ms?: number };
export type ActionData = { title?: string; status?: string; summary?: string; subactions?: SubAction[]; agentName?: string };

export function AgoraActionCard({ action }: { action: ActionData }) {
  const [open, setOpen] = useState(false);
  const running = action.status === 'running';

  const StatusIcon = ({ s }: { s?: string }) => {
    if (s === 'running') return <Loader2 className="w-3.5 h-3.5 text-[var(--button-bg)] animate-spin" />;
    if (s === 'done') return <CheckCircle2 className="w-3.5 h-3.5 text-[var(--online-indicator)]" />;
    if (s === 'error') return <XCircle className="w-3.5 h-3.5 text-[var(--error-text)]" />;
    return <div className="w-2.5 h-2.5 rounded-full bg-[color:rgba(var(--center-channel-color-rgb),0.56)] mx-0.5" />;
  };

  const subs = action.subactions || [];

  return (
    <div className="border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-lg p-3 my-1 max-w-[680px] bg-[var(--center-channel-bg)] shadow-sm">
      <div className="flex items-center gap-2">
        <StatusIcon s={action.status} />
        <span className="font-semibold flex-1">{action.title || (running ? 'Working…' : 'Action')}</span>
      </div>
      
      {action.summary && (
        <div className="whitespace-pre-wrap mt-1.5 ml-6 opacity-90 text-[var(--center-channel-color)] leading-relaxed text-[13px]">
          {action.summary}
        </div>
      )}

      {subs.length > 0 && (
        <div className="mt-2 ml-6">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center text-xs opacity-60 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.06)] px-1.5 py-1 rounded transition-colors"
          >
            {open ? <ChevronDown className="w-3.5 h-3.5 mr-1" /> : <ChevronRight className="w-3.5 h-3.5 mr-1" />}
            {subs.length} step{subs.length === 1 ? '' : 's'}
          </button>
          
          <div className={`grid transition-all duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${open ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden min-h-0 space-y-2">
              {subs.map((s, i) => (
                <div key={s.id || i} className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-baseline gap-2 text-[13px]">
                    <div className="translate-y-0.5"><StatusIcon s={s.status} /></div>
                    <span className="flex-1 font-medium">{s.label}</span>
                    {s.tool && <span className="text-[11px] opacity-60 font-mono border border-[color:rgba(var(--center-channel-color-rgb),0.16)] px-1 rounded bg-[color:rgba(var(--center-channel-color-rgb),0.02)]">{s.tool}</span>}
                    {typeof s.duration_ms === 'number' && <span className="text-[11px] opacity-50">{s.duration_ms} ms</span>}
                  </div>
                  {s.result && (
                    <div className="text-xs opacity-60 whitespace-pre-wrap ml-6 mt-0.5 bg-[color:rgba(var(--center-channel-color-rgb),0.03)] p-1.5 rounded">{s.result}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
