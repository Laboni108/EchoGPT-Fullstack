import React, { useState, useEffect } from 'react';
import SettingsModal from './SettingsModal';
import UserProfile from './UserProfile';
import PlanModal from './PlanModal';
import ModelSelectorModal from './ModelSelectorModal';
import {
  PanelLeftClose,
  PanelLeft,
  SquarePlus,
  Search,
  MessageSquare,
  Settings,
  Sun,
  Moon,
  Cpu,
  X,
  ChevronDown,
  Cat,
  Menu,
  Trash2
} from 'lucide-react';

// Turns a timestamp into "Just now", "5m ago", "2h ago", "Yesterday", "3d ago"
const formatSessionTime = (timestamp) => {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
};

export default function AppLayout({
  children,
  activeModel,
  onSelectModel,
  sessions = [],
  activeSessionId = null,
  onNewSession,
  onSelectSession,
  onDeleteSession
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNewSessionClick = () => {
    setIsMobileOpen(false);
    if (onNewSession) onNewSession();
  };

  const handleSelectSessionClick = (id) => {
    setIsMobileOpen(false);
    if (onSelectSession) onSelectSession(id);
  };

  // Real conversations, newest first, filtered by the search box
  const filteredHistory = [...sessions]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-workspace)] text-[var(--text-main)]">

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 flex flex-col
          bg-[var(--bg-surface)] border-r border-[var(--border-subtle)]
          transition-all duration-300 ease-in-out shrink-0
          ${isSidebarOpen ? 'w-72' : 'w-0 md:w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        aria-label="Main Navigation"
      >
        {/* Header with High-Contrast Echo Cat Badge */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 overflow-hidden">

            {/* High-Contrast Cat Logo Badge */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 dark:bg-[#111726] text-amber-400 border border-slate-700 dark:border-slate-800 shadow-md">
              <Cat className="h-6 w-6 stroke-[2.2]" />
            </div>

            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
                  EchoGPT
                </span>
                <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase -mt-1">
                  Cyber Suite
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)]"
            aria-label="Close navigation sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-3">
          <button
            onClick={handleNewSessionClick}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="New Session"
            aria-label="New Session"
          >
            <SquarePlus className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span>New Session</span>}
          </button>
        </div>

        {/* Search */}
        {isSidebarOpen && (
          <div className="px-3 py-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search history..."
                aria-label="Search history"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--bg-workspace)] border border-[var(--border-subtle)] focus:border-violet-500 outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-all"
              />
            </div>
          </div>
        )}

        {/* History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {isSidebarOpen && (
            <div className="px-2 py-1.5 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Recent Threads
            </div>
          )}

          {isSidebarOpen && filteredHistory.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-[var(--text-muted)] leading-relaxed">
              {sessions.length === 0
                ? "No conversations yet. Send a message to start one."
                : "No matches found."}
            </p>
          )}

          {filteredHistory.map((item) => {
            const isActive = item.id === activeSessionId;
            return (
              <div key={item.id} className="group relative flex items-center">
                <button
                  onClick={() => handleSelectSessionClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  title={item.title}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    isSidebarOpen ? 'pr-10' : ''
                  } ${
                    isActive
                      ? 'bg-[var(--bg-surface-hover)] text-[var(--text-main)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-amber-500' : 'group-hover:text-amber-500'
                    }`}
                  />
                  {isSidebarOpen && (
                    <span className="flex-1 min-w-0">
                      <span className="block truncate">{item.title}</span>
                      <span className="block text-[10px] font-normal text-[var(--text-muted)]">
                        {formatSessionTime(item.updatedAt)}
                      </span>
                    </span>
                  )}
                </button>

                {isSidebarOpen && (
                  <button
                    onClick={() => onDeleteSession && onDeleteSession(item.id)}
                    aria-label={`Delete conversation: ${item.title}`}
                    className="absolute right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] space-y-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-violet-600" />}
            {isSidebarOpen && <span>{isDarkMode ? 'Light Aesthetic' : 'Dark Cyber'}</span>}
          </button>

          {/* Preferences Button linked to SettingsModal */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            <Settings className="h-4 w-4" />
            {isSidebarOpen && <span>Preferences</span>}
          </button>

          {/* User Profile Card */}
          {isSidebarOpen && <UserProfile onClick={() => setIsPlanModalOpen(true)} />}
        </div>
      </aside>

      {/* WORKSPACE MAIN CONTAINER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header Bar */}
        <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-md flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">

            {/* Mobile Drawer Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Expand Toggle (Visible only when sidebar is collapsed on desktop) */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:flex p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            )}

            {/* Model Selector Button */}
            <button
              onClick={() => setIsModelModalOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-workspace)] hover:border-violet-500/40 transition-all text-xs font-semibold shadow-sm"
            >
              <Cpu className="h-4 w-4 text-amber-500" />
              <span>{activeModel || "GPT-5 Cyber"}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold shadow-sm">
                CYBER
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="hidden sm:inline">NEURAL ONLINE</span>
            </span>
          </div>
        </header>

        {/* Content Render Canvas */}
        <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        selectedModel={activeModel || "GPT-5 Cyber"}
        onSelectModel={onSelectModel}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Plan Modal */}
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
}
