import React from 'react';
import { ShieldCheck, MoreVertical, Sparkles } from 'lucide-react';

export default function UserProfile({ 
  userName = "Alex Rivers", 
  userPlan = "Pro Plan",
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-2.5 rounded-2xl bg-[var(--bg-surface-hover)]/60 border border-[var(--border-subtle)] transition-all hover:bg-[var(--bg-surface-hover)] cursor-pointer group"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative shrink-0">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 p-[1.5px] shadow-sm">
            <div className="h-full w-full rounded-[10px] bg-slate-900 flex items-center justify-center font-bold text-xs text-white">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[var(--bg-surface)]"></span>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[var(--text-main)] truncate">{userName}</span>
            <ShieldCheck className="h-3 w-3 text-violet-500 shrink-0" />
          </div>
          <span className="text-[10px] text-violet-400 font-mono flex items-center gap-0.5 group-hover:text-amber-400 transition-colors">
            <Sparkles className="h-2.5 w-2.5" /> {userPlan}
          </span>
        </div>
      </div>

      <button className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
        <MoreVertical className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}