import { X, Send, User } from 'lucide-react';
import { useState } from 'react';
import { AgoraActionCard, ActionData } from './AgoraActionCard';

export function ThreadPanelView({ threadId, onClose }: { threadId: string, onClose: () => void }) {
  const [inputValue, setInputValue] = useState('');

  const mockAction: ActionData = {
    title: 'Wired up authentication',
    status: 'done',
    summary: 'Installed dependencies and configured Supabase client using environment variables.',
    subactions: [
      { label: 'npm install @supabase/supabase-js', tool: 'shell', status: 'done', duration_ms: 1250 },
      { label: 'Create src/lib/supabase.ts', tool: 'edit_file', status: 'done', result: 'Successfully wrote file.', duration_ms: 45 },
      { label: 'npm run check', tool: 'shell', status: 'done', result: 'All checks passed', duration_ms: 800 }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-[var(--center-channel-bg)] text-[var(--center-channel-color)] relative">
        {/* Thread Header */}
        <div className="h-12 shrink-0 border-b border-[color:rgba(var(--center-channel-color-rgb),0.12)] flex items-center justify-between px-4 bg-[color:rgba(var(--center-channel-color-rgb),0.02)]">
            <div className="font-bold text-sm">Thread</div>
            <button onClick={onClose} className="p-1 hover:bg-[color:rgba(var(--center-channel-color-rgb),0.08)] rounded opacity-70 hover:opacity-100 transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Thread Messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-5">
            {/* Parent Message (mock) */}
            <div className="flex text-sm">
                <div className="w-8 h-8 rounded shrink-0 bg-[color:rgba(var(--center-channel-color-rgb),0.1)] flex items-center justify-center font-medium mr-3">
                    AN
                </div>
                <div>
                   <div className="flex items-baseline space-x-2">
                       <span className="font-bold">ana</span>
                       <span className="text-[10px] opacity-60">10:40 AM</span>
                   </div>
                   <div className="opacity-90 mt-1">@claude wire up auth</div>
                </div>
            </div>

            <div className="border-t border-[color:rgba(var(--center-channel-color-rgb),0.06)] relative text-center my-4">
                <span className="bg-[var(--center-channel-bg)] px-2 text-[10px] font-bold uppercase tracking-wider opacity-40 relative -top-[9px]">Replies</span>
            </div>

            {/* Replies */}
            <div className="flex text-sm">
                <div className="w-8 h-8 rounded shrink-0 bg-[color:rgba(var(--online-indicator-rgb,61,184,135),0.1)] flex items-center justify-center font-medium mr-3 text-[var(--online-indicator)]">
                    C
                </div>
                <div>
                   <div className="flex items-baseline space-x-2 mb-1">
                       <span className="font-bold text-[var(--online-indicator)]">claude</span>
                       <span className="text-[10px] opacity-60">10:41 AM</span>
                   </div>
                   <AgoraActionCard action={mockAction} />
                </div>
            </div>
            
            <div className="flex text-sm">
                <div className="w-8 h-8 rounded shrink-0 bg-[color:rgba(var(--button-bg-rgb,22,109,224),0.1)] text-[var(--button-bg)] flex items-center justify-center font-medium mr-3">
                    <User className="w-4 h-4" />
                </div>
                <div>
                   <div className="flex items-baseline space-x-2">
                       <span className="font-bold">you</span>
                       <span className="text-[10px] opacity-60">10:45 AM</span>
                   </div>
                   <div className="opacity-90 mt-1 leading-relaxed">
                       Looks, good! @agy please review the changes just in case
                   </div>
                </div>
            </div>
        </div>

        {/* Thread Input */}
        <div className="p-3 bg-[var(--center-channel-bg)] border-t border-[color:rgba(var(--center-channel-color-rgb),0.12)]">
            <div className="relative bg-[color:rgba(var(--center-channel-color-rgb),0.02)] border border-[color:rgba(var(--center-channel-color-rgb),0.2)] rounded-lg focus-within:ring-1 focus-within:ring-[var(--button-bg)] focus-within:border-[var(--button-bg)] transition-all">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Reply..."
                  className="w-full bg-transparent p-3 min-h-[40px] max-h-[150px] resize-none outline-none custom-scrollbar text-sm"
                  rows={1}
                />
                <div className="px-2 pb-2 flex justify-end">
                    <button 
                      disabled={!inputValue.trim()}
                      className="p-1.5 rounded-md bg-[var(--button-bg)] text-[var(--button-color)] disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-sm"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
