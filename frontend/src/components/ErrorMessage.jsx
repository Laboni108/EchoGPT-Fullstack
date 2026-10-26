import React from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorMessage({ errorText, onRetry }) {
  return (
    <div className="flex gap-2.5 my-3 justify-start animate-fade-in">
      <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-3 max-w-md">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">Generation Failed</p>
          <p className="text-[11px] opacity-80">{errorText || 'Unable to connect to the model service. Please check your network or try again.'}</p>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition-colors flex items-center gap-1 font-semibold text-[11px]"
          >
            <RotateCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}