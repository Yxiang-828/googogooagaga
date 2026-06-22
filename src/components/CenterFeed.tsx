import { Hash, Sparkles, Check, Play, AlignLeft, ShieldCheck, Tag, Send, GitCommit, FileCode2, Clock, XCircle } from 'lucide-react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

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
};

export function CenterFeed({ activeChannel }: { activeChannel: string }) {
  const [messagesByChannel, setMessagesByChannel] = useState<Record<string, Message[]>>({
    'project-x': [
      { id: '1', type: 'human', author: 'ana', time: '10:40 AM', content: '@claude wire up auth' },
      { 
        id: '2', 
        type: 'agent-action', 
        agent: 'claude-opus-4', 
        time: '2.1s', 
        details: 'wrote 3 files → codespace',
        fileChanges: [
          { name: 'src/auth.ts', added: 42, removed: 0, authorBadge: 'C', authorColor: 'bg-emerald-600' },
          { name: 'package.json', added: 2, removed: 1, authorBadge: 'C', authorColor: 'bg-emerald-600' },
          { name: 'src/types.ts', added: 15, removed: 0, authorBadge: 'C', authorColor: 'bg-emerald-600' }
        ]
      },
      { id: '3', type: 'delegation', from: 'claude', to: 'codex', time: '10:41 AM', content: "need the /me endpoint first, I'm blocked until the API layer provides it." },
      {
        id: '4',
        type: 'codespace-event',
        author: 'you',
        time: '10:45 AM',
        content: 'manual edit in active codespace',
        fileChanges: [
          { name: 'src/App.tsx', added: 5, removed: 2, authorBadge: 'Y', authorColor: 'bg-blue-600' }
        ]
      },
      {
        id: '5',
        type: 'approval-request',
        time: '10:47 AM',
        agent: 'claude',
        content: 'wants to push to main + plan: deploy auth branch'
      }
    ]
  });
  
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const messages = messagesByChannel[activeChannel] || [];

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg: Message = {
      id: Date.now().toString(),
      type: 'human',
      author: 'you',
      time: timeString,
      content: inputValue.trim()
    };
    
    setMessagesByChannel(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg]
    }));
    setInputValue('');

    // Simulate Agent Reply after delay
    setTimeout(() => {
      setMessagesByChannel(prev => {
        const agyReply: Message = {
          id: Date.now().toString(),
          type: 'agent-action',
          agent: 'gemini-pro-2',
          time: '1.4s',
          details: 'analyzed prompt → proposed code changes'
        };
        return {
          ...prev,
          [activeChannel]: [...(prev[activeChannel] || []), agyReply]
        };
      });
    }, 1200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertText = (text: string) => {
    setInputValue(prev => prev + (prev.endsWith(' ') || prev.length === 0 ? '' : ' ') + text + ' ');
  };

  return (
    <div className="flex-1 bg-[#15171C] flex flex-col h-full min-w-0 relative">
      {/* Header */}
      <div className="h-14 flex items-center px-5 border-b border-gray-800 shadow-sm shrink-0 bg-[#0F1115]">
        <Hash className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="font-semibold text-gray-100 mr-4 text-lg">{activeChannel}</h2>
        <span className="text-sm text-gray-500 border-l border-gray-800 pl-4 hidden sm:block">
          {messages.length > 0 ? '2' : '0'} agents observing.
        </span>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-8">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 italic mt-10">No messages in #{activeChannel} yet. Say hi!</div>
        )}
        
        {messages.map(msg => (
          <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {msg.type === 'human' && (
              <div className="flex text-sm group">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1 pt-1">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-medium text-white shadow-sm ${msg.author === 'you' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                    {msg.author?.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold text-gray-200 hover:underline cursor-pointer">{msg.author}</span>
                    <span className="text-[11px] text-gray-500 font-medium">{msg.time}</span>
                  </div>
                  <div className="text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
                    {msg.content?.split(' ').map((word, i) => word.startsWith('@') ? <span key={i} className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium mr-1">{word}</span> : word + ' ')}
                  </div>
                </div>
              </div>
            )}
            
            {msg.type === 'approval-request' && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-900/40 text-red-400 flex items-center justify-center border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    <Clock className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
                <div className="flex-1 max-w-2xl bg-[#0F1115] border border-red-500/30 rounded-xl overflow-hidden shadow-md">
                  <div className="px-4 py-2 border-b border-red-500/20 bg-red-900/10 flex items-center justify-between">
                    <div className="flex items-center text-red-400 font-semibold text-xs uppercase tracking-wider">
                      <Clock className="w-3 h-3 mr-1.5" />
                      NEEDS YOUR APPROVAL
                    </div>
                    <span className="text-xs text-red-500/70 font-mono">{msg.time}</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="text-gray-200">
                      <span className="font-bold">@{msg.agent}</span> {msg.content}
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex items-center px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded shadow transition-colors">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Approve
                      </button>
                      <button className="flex items-center px-4 py-1.5 bg-[#1A1D24] border border-gray-700 hover:bg-gray-800 text-gray-300 text-sm font-medium rounded shadow transition-colors">
                        <XCircle className="w-4 h-4 mr-2 text-gray-500" /> Deny
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {msg.type === 'agent-action' && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/40 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 max-w-2xl bg-[#0F1115] border border-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="px-4 py-2 border-b border-gray-800 bg-[#121419] flex items-center justify-between">
                    <div className="flex items-center text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                      <Play className="w-3 h-3 mr-1.5 fill-current" />
                      Action Completed
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{msg.time}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start text-gray-300">
                      <Check className="w-4 h-4 text-gray-500 mr-2 mt-0.5 shrink-0" />
                      <span>ran <span className="font-mono text-xs bg-gray-800 border border-gray-700 px-1.5 py-0.5 rounded text-gray-400 ml-1">{msg.agent}</span></span>
                    </div>
                    <div className="flex items-start text-gray-300">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: msg.details || '' }} />
                    </div>
                  </div>
                  {msg.fileChanges && (
                    <div className="bg-[#1A1D24] border-t border-gray-800 p-4 font-mono text-[11px]">
                      <div className="text-gray-500 font-semibold uppercase tracking-wider mb-2 text-[10px]">Changes Log Tree</div>
                      <div className="space-y-2">
                        {msg.fileChanges.map((change, i) => (
                           <div key={i} className="flex items-center justify-between group">
                              <div className="flex items-center">
                                <div className="flex -space-x-1 shrink-0 mr-2 opacity-80 group-hover:opacity-100">
                                   <span className={`w-4 h-4 flex items-center justify-center rounded-full border border-[#0A0C10] ${change.authorColor} text-[9px] font-bold text-white shadow-sm`}>
                                     {change.authorBadge}
                                   </span>
                                </div>
                                <FileCode2 className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                                <span className="text-gray-300 hover:text-blue-400 cursor-pointer underline decoration-gray-700 hover:decoration-blue-400 decoration-dashed transition-colors">{change.name}</span>
                              </div>
                              <div className="text-gray-500 flex items-center space-x-2 font-mono">
                                 {change.added > 0 && <span className="text-emerald-500">+{change.added}</span>}
                                 {change.removed > 0 && <span className="text-red-500">-{change.removed}</span>}
                              </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {msg.type === 'codespace-event' && (
              <div className="flex text-sm mt-5">
                <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                  <div className="w-8 h-8 rounded-full border border-blue-500/20 bg-blue-900/40 text-blue-400 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                    <GitCommit className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 max-w-2xl bg-[#0F1115] border border-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="px-4 py-2 border-b border-gray-800 bg-[#121419] flex items-center justify-between">
                    <div className="flex items-center text-blue-400 font-semibold text-xs uppercase tracking-wider">
                      <GitCommit className="w-3 h-3 mr-1.5" />
                      Codespace Tracker
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{msg.time}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start text-gray-300">
                      <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                      <span>User <span className="font-bold text-gray-200">{msg.author}</span> {msg.content}</span>
                    </div>
                  </div>
                  {msg.fileChanges && (
                    <div className="bg-[#1A1D24] border-t border-gray-800 p-4 font-mono text-[11px]">
                      <div className="text-gray-500 font-semibold uppercase tracking-wider mb-2 text-[10px]">Changes Log Tree</div>
                      <div className="space-y-2">
                        {msg.fileChanges.map((change, i) => (
                           <div key={i} className="flex items-center justify-between group">
                              <div className="flex items-center">
                                <div className="flex -space-x-1 shrink-0 mr-2 opacity-80 group-hover:opacity-100">
                                   <span className={`w-4 h-4 flex items-center justify-center rounded-full border border-[#0A0C10] ${change.authorColor} text-[9px] font-bold text-white shadow-sm`}>
                                     {change.authorBadge}
                                   </span>
                                </div>
                                <FileCode2 className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                                <span className="text-gray-300 hover:text-blue-400 cursor-pointer underline decoration-gray-700 hover:decoration-blue-400 decoration-dashed transition-colors">{change.name}</span>
                              </div>
                              <div className="text-gray-500 flex items-center space-x-2 font-mono">
                                 {change.added > 0 && <span className="text-emerald-500">+{change.added}</span>}
                                 {change.removed > 0 && <span className="text-red-500">-{change.removed}</span>}
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
                <div className="border-l-2 border-emerald-500/30 pl-4 py-1 relative">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#15171C] border border-emerald-500/50 rounded-full"></div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold text-emerald-400">{msg.from}</span>
                    <span className="text-xs text-gray-500 font-bold">→</span>
                    <span className="font-bold text-purple-400">{msg.to}</span>
                    <span className="text-[11px] text-gray-500 ml-2">{msg.time}</span>
                  </div>
                  <div className="text-gray-300 mt-1 italic leading-relaxed bg-[#1A1D24] border border-gray-800 rounded px-3 py-2 text-[13px] inline-block shadow-sm">
                    "{msg.content}"
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-gradient-to-t from-[#0A0C10] to-[#15171C] shrink-0 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto flex flex-col bg-[#1A1D24] border border-gray-700 rounded-xl overflow-hidden focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all shadow-xl">
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${activeChannel} or ask @agents...`}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 p-4 outline-none resize-none min-h-[70px] custom-scrollbar focus:ring-0"
            rows={2}
          ></textarea>
          
          <div className="flex items-center justify-between bg-[#13151A] px-3 py-2 border-t border-gray-800/80">
            <div className="flex space-x-1.5">
              <button 
                onClick={() => insertText('/wrap')} 
                title="Propose to wrap into Brain Dictionary"
                className="text-xs flex items-center px-2.5 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors"
              >
                <AlignLeft className="w-3.5 h-3.5 mr-1.5" />
                /wrap
              </button>
              <button 
                onClick={() => insertText('/claim')} 
                title="Claim task to Floor"
                className="text-xs flex items-center px-2.5 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors"
              >
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                /claim
              </button>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`ml-2 p-1.5 rounded-md transition-colors ${inputValue.trim() ? 'bg-blue-600 hover:bg-blue-500 text-white shadow' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
