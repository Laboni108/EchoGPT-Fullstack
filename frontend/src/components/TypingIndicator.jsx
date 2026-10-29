import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator({ modelName }) {
  return (
    <div className="flex gap-2.5 my-2.5 items-end justify-start animate-fade-in">
      {/* Bot Avatar */}
      <div className="h-7 w-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-violet-400">
        <Bot className="h-3.5 w-3.5" />
      </div>

      <div className="flex flex-col max-w-[75%] items-start">
        <span className="text-[10px] font-medium text-[var(--text-muted)] mb-1 px-1">
          {modelName || 'Echo Cat'} is thinking...
        </span>

        {/* Animated Dots Bubble */}
        <div className="px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-main)] rounded-bl-xs shadow-sm flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}