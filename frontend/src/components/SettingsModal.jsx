import React from 'react';
import { X, Sliders, Key, ShieldCheck, Cpu, Moon } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-main)]">
            <Sliders className="h-4 w-4 text-violet-500" />
            <span>Preferences & Settings</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[var(--bg-workspace)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body Options */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Section 1: API Configuration */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
              <Key className="h-3.5 w-3.5 text-violet-500" />
              <span>OpenAI / Cyber Engine API Key</span>
            </label>
            <input 
              type="password" 
              placeholder="sk-..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-workspace)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none focus:border-violet-500 transition-colors"
            />
            <p className="text-[11px] text-[var(--text-muted)]">Your key is encrypted and stored locally in your browser session.</p>
          </div>

          {/* Section 2: Model Temperature / Creativity */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-fuchsia-500" /> Temperature (Creativity)
              </span>
              <span className="font-mono text-[var(--text-muted)]">0.7</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              defaultValue="0.7"
              className="w-full accent-violet-600 cursor-pointer"
            />
          </div>

          {/* Section 3: System Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--text-main)] flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" /> System Instructions
            </label>
            <textarea 
              rows={3}
              defaultValue="You are Echo Cat, a precise software architect and coding assistant."
              className="w-full p-3 rounded-xl bg-[var(--bg-workspace)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)] focus:outline-none focus:border-violet-500 resize-none transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-workspace)]/50 flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20 transition-all"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}