import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Zap, 
  Brain, 
  Code, 
  Sparkles, 
  Check, 
  Globe, 
  Gauge 
} from 'lucide-react';

export default function ModelSelectorModal({ isOpen, onClose, selectedModel, onSelectModel }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ["All", "Popular", "Reasoning", "Coding", "Fast"];

  const models = [
    {
      id: "gpt-5-cyber",
      name: "GPT-5 Cyber",
      provider: "OpenAI",
      category: "Popular",
      description: "Next-gen flagship model for complex multimodal reasoning.",
      speed: "Fast",
      context: "128k",
      icon: Sparkles,
      accent: "from-violet-500 to-fuchsia-500"
    },
    {
      id: "deepseek-r1",
      name: "DeepSeek R1",
      provider: "DeepSeek",
      category: "Reasoning",
      description: "Advanced chain-of-thought model for deep mathematical proofs.",
      speed: "Balanced",
      context: "64k",
      icon: Brain,
      accent: "from-cyan-500 to-blue-600"
    },
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      category: "Coding",
      description: "Premier intelligence for autonomous software engineering.",
      speed: "Fast",
      context: "200k",
      icon: Code,
      accent: "from-amber-500 to-orange-600"
    },
    {
      id: "gemini-1-5-flash",
      name: "Gemini 1.5 Flash",
      provider: "Google",
      category: "Fast",
      description: "Ultra-lightweight model built for sub-second responses.",
      speed: "Ultra Fast",
      context: "1M",
      icon: Zap,
      accent: "from-emerald-400 to-teal-600"
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      provider: "OpenAI",
      category: "Fast",
      description: "Cost-effective, versatile model for everyday tasks.",
      speed: "Ultra Fast",
      context: "128k",
      icon: Globe,
      accent: "from-indigo-400 to-violet-600"
    }
  ];

  const filteredModels = models.filter(m => {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-200">
      
      {/* Fixed Dimension Modal Box */}
      <div 
        className="w-full max-w-xl h-[580px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold tracking-tight text-[var(--text-main)]">
              Select AI Engine
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Choose the right model for your workspace.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-[var(--border-subtle)] space-y-3 bg-[var(--bg-workspace)]/40 shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-violet-500 outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-sm font-semibold'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fixed Height Scrollable Area */}
        <div className="flex-1 h-[360px] overflow-y-auto p-4 space-y-2">
          {filteredModels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-muted)] text-xs">
              <span>No models found matching "{searchQuery}"</span>
            </div>
          ) : (
            filteredModels.map((m) => {
              const IconComponent = m.icon;
              const isSelected = selectedModel === m.name;

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectModel(m.name);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-colors flex items-center justify-between gap-3 group ${
                    isSelected
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-violet-500/30 hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-tr ${m.accent} text-white shadow-sm`}>
                      <IconComponent className="h-4 w-4" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[var(--text-main)]">{m.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--bg-workspace)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                          {m.provider}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-[var(--text-muted)] font-medium flex items-center gap-1">
                      <Gauge className="h-3 w-3 text-amber-500" /> {m.speed}
                    </span>
                    {isSelected && (
                      <div className="h-5 w-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-workspace)]/50 text-center text-[10px] text-[var(--text-muted)] shrink-0">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono">ESC</kbd> to exit
        </div>

      </div>
    </div>
  );
}