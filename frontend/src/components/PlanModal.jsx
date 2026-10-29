import React from 'react';
import { X, Check, Sparkles, Zap, Shield } from 'lucide-react';

export default function PlanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Subscription Plan</h2>
              <p className="text-xs text-[var(--text-muted)]">Your current active subscription status</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Plan Details Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600/10 via-fuchsia-500/10 to-amber-500/10 border border-violet-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Active Status</span>
              <h3 className="text-lg font-extrabold bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                Echo Cyber Pro Tier
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              $20 / Month
            </span>
          </div>

          <ul className="space-y-2 text-xs text-[var(--text-main)]">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Unlimited access to GPT-5 Cyber & Claude models</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Priority neural network streaming latency</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Advanced context window & file processing</li>
          </ul>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]"
          >
            Close
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Manage Subscription
          </button>
        </div>

      </div>
    </div>
  );
}