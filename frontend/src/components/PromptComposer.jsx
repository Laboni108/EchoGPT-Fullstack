import React, { useState, useRef } from 'react';
import { ArrowUp, Paperclip, Sparkles, Image as ImageIcon, CornerDownLeft } from 'lucide-react';

export default function PromptComposer({ onSend, activeModel }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="w-full pt-2 pb-4 bg-[var(--bg-workspace)]">
      <div className="relative rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl p-3 focus-within:border-violet-500/50 transition-all">
        
        {/* Main Inputs Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={`Ask ${activeModel || 'Echo Cat'} anything... (Press Enter to send)`}
          rows={1}
          className="w-full bg-transparent px-3 py-1.5 text-xs md:text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] resize-none focus:outline-none max-h-40 overflow-y-auto"
        />

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]/40 px-1">
          
          {/* Quick Upload Buttons */}
          <div className="flex items-center gap-1">
            <button 
              type="button"
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-violet-500 hover:bg-[var(--bg-workspace)] transition-colors"
              title="Attach File"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button 
              type="button"
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-violet-500 hover:bg-[var(--bg-workspace)] transition-colors"
              title="Upload Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-[var(--text-muted)] font-mono ml-2 hidden sm:inline-block">
              Shift + Enter for new line
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className={`p-2 rounded-2xl flex items-center justify-center transition-all ${
              input.trim()
                ? 'bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/20 hover:scale-105 active:scale-95'
                : 'bg-[var(--bg-workspace)] text-[var(--text-muted)] opacity-50 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="h-4 w-4 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}