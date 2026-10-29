import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCw, 
  ThumbsUp, 
  ThumbsDown, 
  Code
} from 'lucide-react';

export default function ChatMessage({ message, onRegenerate }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedFullMessage, setCopiedFullMessage] = useState(false);
  const isUser = message.role === 'user';

  // 1. Copy ONLY the code snippet
  const handleCopyCodeOnly = (e) => {
    e.stopPropagation();
    if (message.codeSnippet) {
      navigator.clipboard.writeText(message.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // 2. Copy the full response message text
  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopiedFullMessage(true);
    setTimeout(() => setCopiedFullMessage(false), 2000);
  };

  return (
    <div className={`flex gap-2.5 my-2.5 items-end ${isUser ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
      
      {/* Compact Avatar */}
      <div className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-xs ${
        isUser 
          ? 'bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white' 
          : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-violet-400'
      }`}>
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>

      {/* Dynamic Inline Bubble Container */}
      <div className={`group flex flex-col max-w-[75%] md:max-w-[65%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* User / Model Name Tag */}
        <span className="text-[10px] font-medium text-[var(--text-muted)] mb-1 px-1">
          {isUser ? 'You' : message.modelName || 'Echo Cat'} • {message.timestamp || 'Just now'}
        </span>

        {/* Short Text Bubble */}
        <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-normal leading-relaxed w-fit break-words shadow-sm ${
          isUser 
            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-xs' 
            : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-main)] rounded-bl-xs'
        }`}>
          {message.content}
        </div>

        {/* Code Snippet Box (If present) */}
        {message.codeSnippet && (
          <div className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-workspace)] overflow-hidden shadow-sm">
            <div className="px-3 py-1.5 border-b border-[var(--border-subtle)] bg-slate-200 dark:bg-slate-900 flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-violet-300">
                <Code className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                {message.codeLanguage || 'javascript'}
              </span>
              <button 
                onClick={handleCopyCodeOnly}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                title="Copy code snippet only"
              >
                {copiedCode ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span className={copiedCode ? 'text-emerald-500 font-semibold' : ''}>
                  {copiedCode ? 'Copied Code!' : 'Copy Code'}
                </span>
              </button>
            </div>
            <pre className="p-3 text-xs font-mono overflow-x-auto bg-slate-100 dark:bg-[#080C14] text-slate-800 dark:text-violet-200">
              <code>{message.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Hover Action Buttons (Assistant Messages Only) */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] px-1">
            <button 
              onClick={handleCopyFullMessage}
              className="p-1 rounded-md hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              title="Copy full response text"
            >
              {copiedFullMessage ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            </button>

            {onRegenerate && (
              <button 
                onClick={onRegenerate}
                className="p-1 rounded-md hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                title="Regenerate answer"
              >
                <RotateCw className="h-3 w-3" />
              </button>
            )}

            <button 
              className="p-1 rounded-md hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              title="Good response"
            >
              <ThumbsUp className="h-3 w-3" />
            </button>
            <button 
              className="p-1 rounded-md hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              title="Bad response"
            >
              <ThumbsDown className="h-3 w-3" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}