import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import ChatTranscript from './components/ChatTranscript';
import PromptComposer from './components/PromptComposer';
import TypingIndicator from './components/TypingIndicator';
import ErrorMessage from './components/ErrorMessage';
import LandingPage from './components/LandingPage';
import { Cat, ArrowRight, Zap, Code2, Sparkles, Terminal, ArrowLeft } from 'lucide-react';

// --- Storage keys -----------------------------------------------------------
const SESSIONS_KEY = 'echogpt_sessions';
const ACTIVE_KEY = 'echogpt_active_session';
const LEGACY_KEY = 'echogpt_chat_history'; // old single-chat format

// Small helper so ids/timestamps are created in one place
const now = () => Date.now();

// Turns the first message into a short sidebar title
const makeTitle = (text) => {
  const clean = text.trim().replace(/\s+/g, ' ');
  return clean.length > 36 ? clean.slice(0, 36) + '…' : clean;
};

// Loads saved sessions. If the user only has the OLD single chat saved,
// it is converted into one session so nothing is lost.
const loadSessions = () => {
  try {
    const saved = localStorage.getItem(SESSIONS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '[]');
    if (Array.isArray(legacy) && legacy.length > 0) {
      const firstUser = legacy.find((m) => m.role === 'user');
      return [
        {
          id: now(),
          title: makeTitle(firstUser ? firstUser.content : 'Previous chat'),
          modelName: 'GPT-5 Cyber',
          updatedAt: now(),
          messages: legacy,
        },
      ];
    }
  } catch {
    // corrupted or unavailable storage: fall through to empty list
  }
  return [];
};

export default function App() {
  // State to control Landing Page vs Chat Workspace view
  const [showLandingPage, setShowLandingPage] = useState(true);

  // All saved conversations. Each one: { id, title, modelName, updatedAt, messages: [] }
  const [sessions, setSessions] = useState(loadSessions);

  // Which conversation is open. null = a fresh, empty chat (not saved until you send a message)
  const [activeSessionId, setActiveSessionId] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(ACTIVE_KEY));
      return sessions.some((s) => s.id === saved) ? saved : null;
    } catch {
      return null;
    }
  });

  const [activeModel, setActiveModel] = useState('GPT-5 Cyber');
  const [generatingId, setGeneratingId] = useState(null); // session id currently waiting for a reply
  const [errorMessage, setErrorMessage] = useState(null);

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch {
      // storage full or unavailable
    }
  }, [sessions]);

  // Persist which session is open
  useEffect(() => {
    try {
      if (activeSessionId === null) localStorage.removeItem(ACTIVE_KEY);
      else localStorage.setItem(ACTIVE_KEY, String(activeSessionId));
    } catch {
      // storage unavailable
    }
  }, [activeSessionId]);

  // Messages of the open conversation (empty for a fresh chat)
  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;
  const messages = activeSession ? activeSession.messages : [];

  // Typing indicator only shows in the conversation that is actually waiting
  const isGenerating = generatingId !== null && generatingId === activeSessionId;

  const suggestions = [
    { icon: Code2, title: "Debug React Hooks", desc: "Analyze state sync issues & memory leaks.", tag: "React", prompt: "Help me debug asynchronous React hook re-renders." },
    { icon: Terminal, title: "Tailwind v4 Config", desc: "Explore CSS variables & native @theme directives.", tag: "CSS", prompt: "Explain how to set up theme variables in Tailwind CSS v4." },
    { icon: Sparkles, title: "System Architecture", desc: "Design resilient frontend component boundaries.", tag: "Design", prompt: "What are the best practices for scalable frontend component architecture?" },
    { icon: Zap, title: "Optimize Performance", desc: "Reduce bundle sizes & dynamic re-renders.", tag: "Speed", prompt: "Give me 5 actionable tips to improve Vite + React web application performance." }
  ];

  const handleSendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setErrorMessage(null);

    const userMsg = {
      id: now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let targetId = activeSessionId;

    if (targetId === null) {
      // First message of a fresh chat -> create a new saved session
      targetId = now();
      const newSession = {
        id: targetId,
        title: makeTitle(trimmed),
        modelName: activeModel,
        updatedAt: now(),
        messages: [userMsg],
      };
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(targetId);
    } else {
      // Continue the open session
      setSessions((prev) =>
        prev.map((s) =>
          s.id === targetId
            ? { ...s, modelName: activeModel, messages: [...s.messages, userMsg], updatedAt: now() }
            : s
        )
      );
    }

    setGeneratingId(targetId);

    // Simulated AI response
    setTimeout(() => {
      const simulateError = false;

      if (simulateError) {
        setGeneratingId((prev) => (prev === targetId ? null : prev));
        setErrorMessage("Model server timed out while attempting to stream the token response.");
        return;
      }

      const aiMsg = {
        id: now() + 1,
        role: 'assistant',
        modelName: activeModel,
        content: `I received your request: "${trimmed}". Here is a clean, structured response generated by ${activeModel}.`,
        codeLanguage: 'javascript',
        codeSnippet: `// Processed output\nconst result = await processTask("${trimmed}");`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // The reply goes into the session it was asked in, even if you switched chats meanwhile
      setSessions((prev) =>
        prev.map((s) =>
          s.id === targetId
            ? { ...s, messages: [...s.messages, aiMsg], updatedAt: now() }
            : s
        )
      );
      setGeneratingId((prev) => (prev === targetId ? null : prev));
    }, 1200);
  };

  // New Session: keeps the old chat in history and opens a blank one
  const handleNewSession = () => {
    setActiveSessionId(null);
    setErrorMessage(null);
  };

  // Open a conversation from the sidebar
  const handleSelectSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;
    setActiveSessionId(id);
    setErrorMessage(null);
    if (session.modelName) setActiveModel(session.modelName);
  };

  // Delete a conversation from history
  const handleDeleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (id === activeSessionId) {
      setActiveSessionId(null);
      setErrorMessage(null);
    }
  };

  // 1. RENDER LANDING PAGE IF ACTIVE
  if (showLandingPage) {
    return <LandingPage onLaunchApp={() => setShowLandingPage(false)} />;
  }

  // 2. RENDER CHAT WORKSPACE IF ACTIVE
  return (
    <AppLayout
      activeModel={activeModel}
      onSelectModel={setActiveModel}
      sessions={sessions}
      activeSessionId={activeSessionId}
      onNewSession={handleNewSession}
      onSelectSession={handleSelectSession}
      onDeleteSession={handleDeleteSession}
    >
      <div className="h-full flex flex-col justify-between max-w-3xl mx-auto w-full">

        {/* Navigation bar button to return to Landing Page */}
        <div className="flex justify-between items-center pb-2 mb-2 border-b border-[var(--border-subtle)]">
          <button
            onClick={() => setShowLandingPage(true)}
            className="text-xs font-semibold text-violet-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-[var(--bg-surface-hover)]"
          >
            ← Back to Landing Page
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 opacity-40 dark:opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
              <div className="relative p-3.5 rounded-2xl bg-slate-900 dark:bg-[#111726] text-amber-400 border border-slate-700 dark:border-slate-800 flex items-center justify-center shadow-lg">
                <Cat className="h-7 w-7 stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-2 flex flex-col items-center text-center w-full max-w-lg mx-auto">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-center leading-snug">
                How can <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent font-extrabold">Echo Cat</span> assist you today?
              </h1>
              <p className="text-[var(--text-muted)] text-xs md:text-sm font-normal text-center leading-relaxed max-w-md">
                Select an AI engine above or click a prompt card below to start.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-1">
              {suggestions.map((card, i) => {
                const Icon = card.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(card.prompt)}
                    className="p-4 rounded-2xl glass-panel hover:border-violet-500/50 hover:scale-[1.01] transition-all text-left group flex flex-col justify-between h-28"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-workspace)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        {card.tag}
                      </span>
                    </div>

                    <div>
                      <div className="font-semibold text-xs group-hover:text-violet-500 flex items-center justify-between transition-colors">
                        {card.title}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{card.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-2">
              <button
                onClick={handleNewSession}
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-3 py-1.5 rounded-xl hover:bg-[var(--bg-surface-hover)]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>New Chat</span>
              </button>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Model: <span className="text-violet-400 font-semibold">{activeModel}</span>
              </span>
            </div>

            <ChatTranscript
              messages={messages}
              activeModel={activeModel}
            />

            {/* Typing Animation State */}
            {isGenerating && <TypingIndicator modelName={activeModel} />}

            {/* Error Banner State */}
            {errorMessage && (
              <ErrorMessage
                errorText={errorMessage}
                onRetry={() => handleSendMessage("Retry last prompt")}
              />
            )}
          </div>
        )}

        <PromptComposer
          onSend={handleSendMessage}
          activeModel={activeModel}
          disabled={isGenerating}
        />

      </div>
    </AppLayout>
  );
}
