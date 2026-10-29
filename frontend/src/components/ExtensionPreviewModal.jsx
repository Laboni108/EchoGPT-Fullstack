import React from 'react';
import { X, Cat, Sparkles, Terminal, ExternalLink, Star, Puzzle } from 'lucide-react';

export default function ExtensionPreviewModal({ open, onClose, githubUrl }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="extension-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-violet-400">
            <Puzzle className="h-4 w-4" />
            <span id="extension-modal-title" className="font-bold text-white text-sm">
              Extension Preview
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-500 flex items-center justify-center">
              <Cat className="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Echo Cat AI — Multi-Model Chat</h3>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400" />
                ))}
                <span className="text-xs text-slate-400 ml-1">4.9 · Demo build</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-xs text-slate-400 leading-relaxed">
            This extension is a redesign concept built as part of a course project. It runs locally via Chrome's{" "}
            <span className="text-slate-300 font-medium">Developer Mode → Load Unpacked</span>, and has not been submitted to the Chrome Web Store for public review.
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Terminal className="h-4 w-4" />
            View Source & Install Instructions
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
