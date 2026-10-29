import React, { useState } from 'react';
import {
  Cat, Menu, X, ArrowRight, Sparkles, Star, Zap, Lock, RefreshCw,
  Workflow, Flame, Check, ChevronDown, HelpCircle, Terminal, Globe, MessageSquare,
  Puzzle, Download, ExternalLink
} from 'lucide-react';
import ExtensionPreviewModal from './ExtensionPreviewModal';

export default function LandingPage({ onLaunchApp = () => {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);

  const modelsList = [
    {
      name: "GPT-5 Cyber Engine",
      provider: "OpenAI Frontier",
      badge: "PRIMARY",
      description: "Optimized for heavy code architecture synthesis, complex reasoning, and multi-step refactoring.",
      accent: "border-amber-500/40 bg-amber-500/5 text-amber-400"
    },
    {
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      badge: "CREATIVE",
      description: "Exceptional nuance in technical documentation, architectural reviews, and human-like prose.",
      accent: "border-fuchsia-500/40 bg-fuchsia-500/5 text-fuchsia-400"
    },
    {
      name: "Gemini 1.5 Pro",
      provider: "Google DeepMind",
      badge: "1M CONTEXT",
      description: "Massive context window processing for analyzing entire codebase repositories in a single prompt.",
      accent: "border-violet-500/40 bg-violet-500/5 text-violet-400"
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Sub-50ms Latency Streaming",
      description: "Powered by edge-rendered WebSocket nodes so you receive live token responses with zero terminal jitter or delays.",
      badge: "ULTRA FAST"
    },
    {
      icon: Lock,
      title: "Zero Data Retention Privacy",
      description: "Your prompts and code snippets are never stored, logged, or used to train public language models.",
      badge: "ENCRYPTED"
    },
    {
      icon: RefreshCw,
      title: "Seamless Model Switching",
      description: "Switch between GPT-5, Claude 3.5, and Gemini instantly without losing your thread context or starting over.",
      badge: "DYNAMIC"
    },
    {
      icon: Workflow,
      title: "Native Developer Workspace",
      description: "Built-in syntax highlighting, one-click code copying, terminal output blocks, and customizable prompt presets.",
      badge: "DEV FIRST"
    }
  ];

  const pricingPlans = [
    {
      name: "Free Cyber",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever",
      description: "Ideal for casual prompts, learning React/CSS, and quick code debugging.",
      features: [
        "Standard response speeds",
        "Access to GPT-5 Cyber (Rate limited)",
        "Local browser chat history",
        "Standard code syntax highlighting"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro Cyber",
      priceMonthly: "$20",
      priceAnnual: "$16",
      period: "per month",
      description: "For professional software engineers and designers who require maximum performance.",
      features: [
        "Unlimited high-speed prompts",
        "Full access to GPT-5, Claude 3.5 & Gemini 1.5",
        "Priority GPU queuing & sub-50ms streaming",
        "Advanced context window retention",
        "Custom system prompt presets"
      ],
      popular: true,
      cta: "Upgrade to Pro Cyber"
    },
    {
      name: "Enterprise",
      priceMonthly: "$49",
      priceAnnual: "$39",
      period: "per user / month",
      description: "Custom compliance, dedicated neural nodes, and team workspaces.",
      features: [
        "Everything in Pro Cyber",
        "Zero data retention SLA & SOC2 isolation",
        "Custom LLM fine-tuning & API access",
        "Dedicated account manager & 24/7 support",
        "Unlimited seat allocation"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const testimonials = [
    {
      quote: "EchoGPT completely changed how our team refactors code. Switching between Claude 3.5 for documentation and GPT-5 for debugging saved us hours.",
      author: "Alex Rivera",
      role: "Lead Frontend Architect @ Vercel Stack",
      rating: 5
    },
    {
      quote: "The sub-50ms streaming feels instant compared to standard web chat tools. The local chat storage and code block copy buttons are super smooth.",
      author: "Sarah Chen",
      role: "Senior Fullstack Engineer",
      rating: 5
    },
    {
      quote: "Being able to test different AI models side-by-side in a dark-mode terminal layout makes it my default workspace every single day.",
      author: "Marcus Vance",
      role: "DevOps Engineer & Creator",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "Can I switch AI models mid-conversation?",
      a: "Yes! You can select a different model like GPT-5 Cyber or Claude 3.5 Sonnet at any point in your chat thread without losing context."
    },
    {
      q: "Is my code or data used to train AI models?",
      a: "No. EchoGPT enforces strict Zero Data Retention policies. Your prompts are streamed securely and never stored on public model training servers."
    },
    {
      q: "How does local chat storage work?",
      a: "Your entire transcript is automatically synced to your browser's local storage. Your history stays private to your device until you reset it."
    },
    {
      q: "Can I use EchoGPT for free?",
      a: "Absolutely. The Free Cyber tier gives you full access to the workspace layout, essential code highlighting, and basic model capabilities."
    }
  ];

  const navLinks = [
    { href: "#preview", label: "Preview" },
    { href: "#models", label: "AI Models" },
    { href: "#extension", label: "Extension" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" }
  ];

  const debounceSnippet = `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}`;

  const githubUrl = import.meta.env.VITE_EXTENSION_URL || "http://localhost:5174/"; 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-violet-500 selection:text-white">

      {/* 1. RESPONSIVE NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onLaunchApp}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-500 text-slate-950 shadow-md shadow-violet-500/20">
              <Cat className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Echo Cat AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium text-slate-400">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLaunchApp}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2"
            >
              Launch Workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-2 max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-800 flex flex-col gap-3 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onLaunchApp(); }}
              className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md"
            >
              Launch Workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Next-Gen Multi-Model AI Interface v4.0</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight max-w-3xl break-words">
          Supercharge your workflow with <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">Echo Cat</span>
        </h1>

        <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
          Switch seamlessly between cutting-edge LLMs, generate code, debug instantly, and manage structured prompts in one unified workspace.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-violet-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            Open Interactive App
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 3. PRODUCT PREVIEW MOCKUP FRAME */}
      <section id="preview" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto w-full">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="px-3 sm:px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-500 hidden sm:inline">echogpt-cyber-workspace.app</span>
            </div>
            <div className="text-[10px] sm:text-[11px] whitespace-nowrap font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              GPT-5 CYBER ONLINE
            </div>
          </div>

          <div className="p-3 sm:p-6 space-y-4 font-sans text-xs sm:text-sm">
            <div className="flex gap-3 items-start">
              <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs shrink-0 font-bold">
                U
              </div>
              <div className="min-w-0 p-3 sm:p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-slate-200 max-w-lg">
                Write a high-performance React hook for debounce state synchronization with TypeScript.
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0 shadow-md">
                <Cat className="h-4 w-4" />
              </div>
              <div className="p-3 sm:p-4 min-w-0 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 max-w-xl space-y-3 w-full">
                <p className="text-slate-300">Here is an optimized, memory-safe debounce hook implementation:</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300/90 overflow-x-auto">
                  <pre className="whitespace-pre"><code>{debounceSnippet}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI MODELS SHOWCASE SECTION */}
      <section id="models" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Frontier Intelligence at your fingertips</h2>
            <p className="text-slate-400 text-sm mt-2">Switch neural engines with a single click inside your prompt composer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {modelsList.map((model, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${model.accent}`}>
                      {model.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{model.provider}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-lg">{model.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{model.description}</p>
                </div>
                <button
                  onClick={onLaunchApp}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Test with Engine →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ECHOGPT GRID */}
      <section id="why-echogpt" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Flame className="h-3.5 w-3.5" />
              <span>UNMATCHED ADVANTAGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Why developers switch to EchoGPT</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Engineered from the ground up for speed, privacy, and continuous flow state.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {whyChooseUs.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5.5 CHROME EXTENSION SHOWCASE */}
      <section id="extension" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Mock Chrome Web Store listing card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
              <Puzzle className="h-3.5 w-3.5" />
              <span>BROWSER EXTENSION</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-500 flex items-center justify-center shadow-lg shadow-violet-600/20">
                <Cat className="h-7 w-7 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-white text-lg leading-tight">Echo Cat AI — Multi-Model Chat</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span>4.9</span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1"><Download className="h-3 w-3" /> 1,000+ users</span>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Bring EchoGPT's multi-model chat, quick actions, and conversation history right into your browser toolbar — no tab switching required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setExtensionModalOpen(true)}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 transition-all"
              >
                Preview Extension
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              Student project demo — not yet published to the Chrome Web Store.
            </p>
          </div>

          {/* Mini popup mockup */}
          <div className="flex justify-center">
            <div className="w-full max-w-[300px] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-800">
                <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
                  <Cat className="h-4 w-4" />
                </div>
                <span className="font-bold text-sm bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
                  EchoGPT
                </span>
              </div>
              <div className="px-3 py-2.5 border-b border-slate-800">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  GPT-5 Cyber
                </div>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-[11px] text-slate-500 text-center">How can EchoGPT assist you today?</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Summarize", "Explain", "Rewrite", "Brainstorm"].map((label) => (
                    <div key={label} className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 text-center">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-3 py-2.5 border-t border-slate-800">
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-500">
                  Ask EchoGPT anything...
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SHOWCASE */}
      <section id="testimonials" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Loved by developers worldwide</h2>
            <p className="text-slate-400 text-sm">Here is what software engineers say about EchoGPT.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900">
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING TIERS & BILLING TOGGLE */}
      <section id="pricing" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-sm">Choose the tier that matches your engineering ambition.</p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-semibold ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center transition-colors relative"
                aria-label="Toggle annual billing"
              >
                <div className={`h-4 w-4 rounded-full bg-gradient-to-r from-violet-500 to-amber-400 transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-semibold ${annualBilling ? 'text-white' : 'text-slate-400'} flex items-center gap-1.5`}>
                Annual
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  SAVE 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 max-w-md lg:max-w-none mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl flex flex-col justify-between space-y-6 relative transition-all ${
                  plan.popular
                    ? 'bg-slate-950 border-2 border-violet-500/80 shadow-xl shadow-violet-500/10 lg:scale-105'
                    : 'bg-slate-950 border border-slate-800/80'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-bold text-white text-xl">{plan.name}</h3>
                  <p className="text-slate-400 text-xs min-h-[36px]">{plan.description}</p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {annualBilling ? plan.priceAnnual : plan.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>

                  <div className="border-t border-slate-800/80 pt-4 space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onLaunchApp}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 shadow-lg shadow-violet-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section id="faq" className="scroll-mt-16 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Got questions? We've got answers.</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-violet-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-900">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-violet-900/60 via-fuchsia-900/40 to-slate-900 border border-violet-500/30 p-6 sm:p-12 text-center relative z-10 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/20 text-center text-violet-300 text-xs font-semibold border border-violet-400/30">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>READY TO ELEVATE YOUR DEV WORKFLOW?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Start building with <span className="bg-gradient-to-r from-violet-400 to-amber-300 bg-clip-text text-transparent">Echo Cat AI</span> today
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-normal">
            No credit card required. Experience sub-50ms neural responses and multi-model switching right now.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-105"
            >
              Launch Interactive Workspace
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Free Tier Available</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Zero Data Retention</span>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onLaunchApp}>
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-violet-600 to-amber-500 text-slate-950">
                <Cat className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">Echo Cat AI</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              The high-performance multi-model workspace for engineers, creators, and developers.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#models" className="hover:text-violet-400 transition-colors">AI Models</a></li>
              <li><a href="#why-echogpt" className="hover:text-violet-400 transition-colors">Features</a></li>
              <li><a href="#extension" className="hover:text-violet-400 transition-colors">Chrome Extension</a></li>
              <li><a href="#pricing" className="hover:text-violet-400 transition-colors">Pricing</a></li>
              <li><a href="#preview" className="hover:text-violet-400 transition-colors">Workspace Preview</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#faq" className="hover:text-violet-400 transition-colors">FAQ</a></li>
              <li><a href="#testimonials" className="hover:text-violet-400 transition-colors">Developer Reviews</a></li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex items-center gap-3 text-slate-400">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors" aria-label="GitHub">
                <Terminal className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Website">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Community">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center">© 2026 Echo Cat AI. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </footer>

      <ExtensionPreviewModal
        open={extensionModalOpen}
        onClose={() => setExtensionModalOpen(false)}
        githubUrl={githubUrl}
      />

    </div>
  );
}
