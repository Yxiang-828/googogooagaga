import { useState, useEffect } from 'react';
import { ShieldCheck, X, Activity, Cpu, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function SkillsPanelView({ onClose }: { onClose?: () => void }) {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    setTimeout(() => {
      setAgents([
        {
          id: 'claude',
          name: 'Claude 3.5 Sonnet',
          owner: '@agy',
          reportedAt: Date.now() - 120000,
          admitted: [
            { skill: 'read_files', desc: 'Read file contents from the workspace folder' },
            { skill: 'list_directory', desc: 'List files and directories' },
            { skill: 'grep_search', desc: 'Search code using grep' }
          ],
          rejected: [
            { skill: 'execute_sql', reasons: ['Plugin disabled by host'] }
          ]
        },
        {
          id: 'antigravity',
          name: 'Antigravity (local)',
          owner: '@agy',
          reportedAt: Date.now() - 45000,
          admitted: [
            { skill: 'read_files', desc: 'Read file contents from the workspace folder' },
            { skill: 'write_files', desc: 'Modify local file contents' },
            { skill: 'run_build', desc: 'Execute npm run build' }
          ],
          rejected: []
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative custom-scrollbar">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="mb-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold flex items-center mb-2">
          <Activity className="w-6 h-6 mr-3 text-[var(--online-indicator)]" />
          Agents & Skills Overview
        </h3>
        <p className="text-sm opacity-60 leading-relaxed">
          Monitor connected agents and view the skills they have been admitted to use, dictated by the workspace capabilities and host connection.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-xl"></div>
            <div className="h-24 bg-[color:rgba(var(--center-channel-color-rgb),0.05)] rounded-xl"></div>
          </div>
        ) : (
          agents.map(agent => (
            <div key={agent.id} className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-[color:rgba(var(--center-channel-color-rgb),0.1)] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[color:rgba(var(--link-color-rgb,22,109,224),0.1)] flex items-center justify-center text-[var(--link-color)] border border-[color:rgba(var(--link-color-rgb,22,109,224),0.2)]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{agent.name}</div>
                    <div className="text-xs opacity-60 mt-0.5">Reported 2 mins ago · Owner {agent.owner}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] text-[var(--online-indicator)] text-[10px] uppercase font-bold tracking-wider rounded border border-[color:rgba(var(--online-indicator-rgb,61,184,135),0.2)]">
                    {agent.admitted.length} ADMITTED
                  </span>
                  {agent.rejected.length > 0 && (
                    <span className="px-2.5 py-1 bg-[color:rgba(var(--error-text-rgb,253,89,96),0.1)] text-[var(--error-text)] text-[10px] uppercase font-bold tracking-wider rounded border border-[color:rgba(var(--error-text-rgb,253,89,96),0.2)]">
                      {agent.rejected.length} REJECTED
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {agent.admitted.map((skill: any, i: number) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[var(--online-indicator)] mr-2 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold">{skill.skill}</div>
                      <div className="text-xs opacity-60 mt-0.5">{skill.desc}</div>
                    </div>
                  </div>
                ))}
                
                {agent.rejected.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-[color:rgba(var(--center-channel-color-rgb),0.06)] space-y-3">
                    {agent.rejected.map((skill: any, i: number) => (
                      <div key={i} className="flex items-start">
                        <XCircle className="w-4 h-4 text-[var(--error-text)] mr-2 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-semibold">{skill.skill}</div>
                          <div className="text-xs text-[var(--error-text)] opacity-80 mt-0.5">{skill.reasons.join(', ')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
