import { Hash, Sparkles, Check, Play, ShieldCheck, Send, GitCommit, FileCode2, Clock, XCircle, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { AgoraActionCard, ActionData } from './AgoraActionCard';

type Message = {
  id: string;
  type: 'human' | 'agent-action' | 'delegation' | 'codespace-event' | 'approval-request';
  author?: string;
  content?: string;
  time: string;
  agent?: string;
  details?: string;
  from?: string;
  to?: string;
  fileChanges?: { name: string; added: number; removed: number; authorBadge: string; authorColor: string; }[];
  actionData?: ActionData;
};

export function CenterFeed({ activeChannel, onOpenThread }: { activeChannel: string, onOpenThread?: (threadId: string) => void }) {
  const [messagesByChannel, setMessagesByChannel] = useState<Record<string, Message[]>>({
    'project-x': [
      { id: '1', type: 'human', author: 'ana', time: '10:40 AM', content: '@claude wire up auth' },
      { 
        id: '2', 
        type: 'agent-action', 
        agent: 'claude', 
        time: '10:41 AM', 
        actionData: {
          title: 'Wired up authentication',
          status: 'done',
          summary: 'Installed dependencies and configured Supabase client using environment variables.',
          subactions: [
            { label: 'npm install @supabase/supabase-js', tool: 'shell', status: 'done', duration_ms: 1250 },
            { label: 'Create src/lib/supabase.ts', tool: 'edit_file', status: 'done', result: 'Successfully wrote file.', duration_ms: 45 },
            { label: 'npm run check', tool: 'shell', status: 'done', result: 'All checks passed', duration_ms: 800 }
          ]
        }
      },
      { id: '3', type: 'delegation', from: 'claude', to: 'codex', time: '10:41 AM', content: "need the /me endpoint first, I'm blocked until the API layer provides it." },
      {
        id: '4',
        type: 'codespace-event',
        author: 'you',
        time: '10:45 AM',
        content: 'manual edit in active codespace',
        fileChanges: [
          { name: 'src/App.tsx', added: 5, removed: 2, authorBadge: 'Y', authorColor: 'bg-[var(--button-bg)] text-[var(--button-color)]' }
        ]
      },
      {
        id: '5',
        type: 'approval-request',
        time: '10:47 AM',
        agent: 'claude',
        content: 'wants to push to main + plan: deploy auth branch'
      }
    ],
    'ci-cd-pipeline': [
      { id: 'c1', type: 'human', author: 'system', time: '11:02 AM', content: 'Commit `feat: user profile` by @ana pushed to `main`' },
      { 
        id: 'c2', 
        type: 'agent-action', 
        agent: 'ci-bot', 
        time: '11:03 AM', 
        actionData: {
          title: 'Running test suite on main',
          status: 'error',
          summary: '2 tests failed in /src/components/Profile.test.tsx',
          subactions: [
            { label: 'npm install', tool: 'shell', status: 'done', duration_ms: 14500 },
            { label: 'npm run lint', tool: 'shell', status: 'done', duration_ms: 1200 },
            { label: 'npm run test', tool: 'shell', status: 'error', result: 'FAIL src/components/Profile.test.tsx\n  ✕ renders user data (12 ms)\n  ✕ handles null avatar (8 ms)\n\nError: render is not a function', duration_ms: 3400 }
          ]
        }
      },
      { id: 'c3', type: 'human', author: 'ci-bot', time: '11:04 AM', content: '🚨 @ana Build failed on your recent commit. Tests are failing because `render` is being called incorrectly in the testing suite. I can write a fix and propose it to the workspace if you like.' },
      { id: 'c4', type: 'human', author: 'ana', time: '11:15 AM', content: 'Yes please @ci-bot, go ahead and fix the test suite.' },
      { 
        id: 'c5', 
        type: 'agent-action', 
        agent: 'ci-bot', 
        time: '11:16 AM', 
        actionData: {
          title: 'Fixing test suite',
          status: 'done',
          summary: 'Fixed testing imports in Profile.test.tsx and re-ran test suite.',
          subactions: [
            { label: 'Edit src/components/Profile.test.tsx', tool: 'edit_file', status: 'done', result: 'Fixed missing imports from @testing-library/react', duration_ms: 800 },
            { label: 'npm run test', tool: 'shell', status: 'done', result: 'PASS src/components/Profile.test.tsx\nTest Suites: 1 passed, 1 total', duration_ms: 2100 }
          ]
        }
      },
      {
        id: 'c6',
        type: 'approval-request',
        time: '11:17 AM',
        agent: 'ci-bot',
        content: 'wants to commit fix "test: fix missing bounding in Profile tests" to `main`'
      }
    ]
  });
  
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const messages = messagesByChannel[activeChannel] || [];

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, activeChannel]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      type: 'human',
      author: 'you',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      content: inputValue
    };
    
    setMessagesByChannel(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg]
    }));
    
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] flex flex-col h-full min-w-0 relative">
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-8">
        {messages.length === 0 && (
          <div className="text-center opacity-50 italic mt-10">No messages in #{activeChannel} yet. Say hi!</div>
        )}
        
        {messages.map(msg => (
          <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative group pr-12">
            {msg.type === 'human' && (
              <div className="flex text-sm">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1 pt-1">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-medium shadow-sm ring-1 ring-black/10 ${msg.author === 'you' ? 'bg-[var(--button-bg)] text-[var(--button-color)]' : 'bg-[color:rgba(var(--center-channel-color-rgb),0.1)]'}`}>
                    {msg.author?.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold hover:underline cursor-pointer">{msg.author}</span>
                    <span className="text-[11px] opacity-60 font-medium">{msg.time}</span>
                  </div>
                  <div className="opacity-90 mt-1 whitespace-pre-wrap leading-relaxed">
                    {msg.content?.split(' ').map((word, i) => word.startsWith('@') ? <span key={i} className="bg-[var(--mention-bg)] text-[var(--mention-color)] px-1.5 py-0.5 rounded font-medium mr-1">{word}</span> : word + ' ')}
                  </div>
                  {msg.id === '1' && (
                    <div className="mt-2 flex items-center">
                      <button 
                         onClick={() => onOpenThread && onOpenThread(msg.id)} 
                         className="flex items-center text-[11px] font-semibold text-[color:var(--link-color)] hover:underline opacity-90 transition-all bg-[color:rgba(var(--link-color-rgb,22,109,224),0.05)] px-2 py-1 rounded"
                      >
                         <MessageSquare className="w-3 h-3 mr-1.5" />
                         2 replies
                      </button>
                      <span className="text-[10px] opacity-50 ml-2">Last reply just now</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {msg.type === 'approval-request' && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded-full bg-[color:rgba(var(--error-text-rgb,253,89,96),0.1)] text-[var(--error-text)] flex items-center justify-center border border-[color:rgba(var(--error-text-rgb,253,89,96),0.2)]">
                    <Clock className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
                <div className="flex-1 max-w-2xl bg-[var(--center-channel-bg)] border border-[color:rgba(var(--error-text-rgb,253,89,96),0.4)] rounded-xl overflow-hidden shadow-sm">
                  <div className="px-4 py-2 border-b border-[color:rgba(var(--error-text-rgb,253,89,96),0.2)] bg-[color:rgba(var(--error-text-rgb,253,89,96),0.05)] flex items-center justify-between">
                    <div className="flex items-center text-[var(--error-text)] font-semibold text-xs uppercase tracking-wider">
                      <Clock className="w-3 h-3 mr-1.5" />
                      NEEDS YOUR APPROVAL
                    </div>
                    <span className="text-xs text-[var(--error-text)] opacity-70 font-mono">{msg.time}</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <span className="font-bold">@{msg.agent}</span> {msg.content}
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex items-center px-4 py-1.5 bg-[var(--button-bg)] text-[var(--button-color)] text-sm font-medium rounded shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Approve
                      </button>
                      <button className="flex items-center px-4 py-1.5 bg-[color:rgba(var(--center-channel-color-rgb),0.05)] border border-[color:rgba(var(--center-channel-color-rgb),0.2)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.1)] text-[var(--center-channel-color)] text-sm font-medium rounded shadow-sm transition-colors">
                        <XCircle className="w-4 h-4 mr-2 opacity-70" /> Deny
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {msg.type === 'agent-action' && msg.actionData && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded shrink-0 bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] text-[var(--online-indicator)] flex items-center justify-center font-medium shadow-sm">
                    {msg.agent?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 pr-12">
                   <div className="flex items-baseline space-x-2 mb-1">
                       <span className="font-bold cursor-pointer text-[var(--online-indicator)] hover:underline">{msg.agent}</span>
                       <span className="text-[11px] opacity-60 font-medium">{msg.time}</span>
                   </div>
                   <AgoraActionCard action={msg.actionData} />
                </div>
              </div>
            )}

            {msg.type === 'codespace-event' && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded-full border border-[color:rgba(var(--link-color-rgb,22,109,224),0.2)] bg-[color:rgba(var(--link-color-rgb,22,109,224),0.1)] text-[var(--link-color)] flex items-center justify-center">
                    <GitCommit className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 max-w-2xl bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] rounded-xl overflow-hidden shadow-md">
                  <div className="px-4 py-2 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] bg-[color:rgba(var(--center-channel-color-rgb),0.02)] flex items-center justify-between">
                    <div className="flex items-center text-[var(--link-color)] font-semibold text-xs uppercase tracking-wider">
                      <GitCommit className="w-3 h-3 mr-1.5" />
                      Codespace Tracker
                    </div>
                    <span className="text-xs opacity-50 font-mono">{msg.time}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start">
                      <Check className="w-4 h-4 text-[var(--link-color)] mr-2 mt-0.5 shrink-0" />
                      <span>User <span className="font-bold">{msg.author}</span> {msg.content}</span>
                    </div>
                  </div>
                  {msg.fileChanges && (
                    <div className="bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border-t border-[color:rgba(var(--center-channel-color-rgb),0.12)] p-4 font-mono text-[11px]">
                      <div className="opacity-60 font-semibold uppercase tracking-wider mb-2 text-[10px]">Changes Log Tree</div>
                      <div className="space-y-2">
                        {msg.fileChanges.map((change, i) => (
                           <div key={i} className="flex items-center justify-between group">
                              <div className="flex items-center">
                                <div className="flex -space-x-1 shrink-0 mr-2 opacity-80 group-hover:opacity-100">
                                   <span className={`w-4 h-4 flex items-center justify-center rounded-full border border-[var(--center-channel-bg)] ${change.authorColor} text-[9px] font-bold shadow-sm`}>
                                     {change.authorBadge}
                                   </span>
                                </div>
                                <FileCode2 className="w-3.5 h-3.5 opacity-50 mr-1.5" />
                                <span className="hover:text-[var(--link-color)] cursor-pointer underline decoration-dashed opacity-80 transition-colors hover:opacity-100">{change.name}</span>
                              </div>
                              <div className="flex items-center space-x-2 font-mono">
                                 {change.added > 0 && <span className="text-[var(--online-indicator)]">+{change.added}</span>}
                                 {change.removed > 0 && <span className="text-[var(--error-text)]">-{change.removed}</span>}
                              </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {msg.type === 'delegation' && (
              <div className="flex text-sm pl-10 mt-5">
                <div className="border-l-2 border-[color:rgba(var(--online-indicator-rgb,61,184,135),0.3)] pl-4 py-1 relative">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[var(--center-channel-bg)] border border-[var(--online-indicator)] rounded-full"></div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold text-[var(--online-indicator)]">{msg.from}</span>
                    <span className="text-xs opacity-50 font-bold">→</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{msg.to}</span>
                    <span className="text-[11px] opacity-50 ml-2">{msg.time}</span>
                  </div>
                  <div className="mt-1 italic leading-relaxed bg-[color:rgba(var(--center-channel-color-rgb),0.04)] border border-[color:rgba(var(--center-channel-color-rgb),0.1)] rounded px-3 py-2 text-[13px] inline-block shadow-sm">
                    "{msg.content}"
                  </div>
                </div>
              </div>
            )}

            {/* Universal Reply Button */}
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onOpenThread && onOpenThread(msg.id)} 
                  className="p-1.5 rounded bg-[var(--center-channel-bg)] border border-[color:rgba(var(--center-channel-color-rgb),0.12)] shadow-sm hover:text-[var(--link-color)]"
                  title="Reply to thread"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} className="h-4" />
      </div>

      <div className="p-4 bg-[var(--center-channel-bg)] border-t border-[color:rgba(var(--center-channel-color-rgb),0.12)]">
        <div className="max-w-4xl mx-auto relative bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.2)] rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--button-bg)] focus-within:border-transparent transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Delegate to your agent, wrap knowledge, or claim a task..."
            className="w-full bg-transparent p-4 min-h-[60px] max-h-[200px] resize-none outline-none custom-scrollbar"
            rows={1}
          />
          <div className="px-4 pb-3 flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              <button className="px-2.5 py-1 rounded bg-[color:rgba(var(--center-channel-color-rgb),0.06)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.12)] text-xs font-medium transition-colors shadow-sm border border-[color:rgba(var(--center-channel-color-rgb),0.06)]">/wrap</button>
              <button className="px-2.5 py-1 rounded bg-[color:rgba(var(--center-channel-color-rgb),0.06)] hover:bg-[color:rgba(var(--center-channel-color-rgb),0.12)] text-xs font-medium transition-colors shadow-sm border border-[color:rgba(var(--center-channel-color-rgb),0.06)]">/claim</button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-1.5 rounded-md bg-[var(--button-bg)] text-[var(--button-color)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] opacity-40">Pro-tip: Shift + Enter for new line. /wrap to update Brain.</span>
        </div>
      </div>
    </div>
  );
}
