import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Sparkles } from 'lucide-react';

export default function ChatTranscript({ messages = [], onRegenerate, isTyping }) {
  const bottomRef = useRef(null);

  // Auto scroll to latest message when messages array updates or assistant is typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
      
      {/* Empty State when no messages exist */}
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[var(--text-muted)] space-y-3 my-auto">
          <div className="p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg">
            <Sparkles className="h-8 w-8 text-violet-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-main)]">Ready when you are</h3>
          <p className="text-xs max-w-sm">
            Select an AI engine or type your prompt below to start a new chat thread.
          </p>
        </div>
      ) : (
        /* Rendered Message List */
        messages.map((msg, idx) => (
          <ChatMessage 
            key={msg.id || idx} 
            message={msg} 
            onRegenerate={idx === messages.length - 1 && msg.role === 'assistant' ? onRegenerate : null}
          />
        ))
      )}

      {/* Typing Indicator for Streaming Responses */}
      {isTyping && (
        <div className="flex gap-4 p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mr-auto max-w-[90%] items-center space-x-2">
          <div className="h-8 w-8 rounded-2xl bg-[var(--bg-workspace)] border border-[var(--border-subtle)] flex items-center justify-center text-violet-400">
            <Sparkles className="h-4 w-4 animate-spin" />
          </div>
          <div className="flex items-center space-x-1.5 px-2">
            <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" />
          </div>
        </div>
      )}

      {/* Invisible element to trigger auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}