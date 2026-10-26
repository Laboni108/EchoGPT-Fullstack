# EchoGPT — Web App & Landing Page

A redesigned, single-page marketing site and interactive AI chat workspace for EchoGPT ("Echo Cat AI"). Visitors land on a modern, dark-themed marketing page and can seamlessly "launch" into a fully functional multi-model chat interface — all within one React application.

This project is a **frontend UI/UX redesign assignment**, covering two combined deliverables: a redesign of the EchoGPT web app interface, and a new single-page marketing website. It focuses on interface design, interaction patterns, component architecture, responsiveness, and accessibility — not on live backend or AI API integration.

**Live demo:** https://echo-gpt.vercel.app/

---

## Project Overview

The application has two main experiences, toggled within a single React app (no page reload, no routing library):

**1. Landing Page** — a full marketing site including:
- Responsive navbar with mobile menu
- Hero section with call-to-action
- Live product preview mockup (styled chat transcript)
- AI Models showcase (GPT-5 Cyber, Claude 3.5 Sonnet, Gemini 1.5 Pro)
- "Why Choose EchoGPT" feature grid
- **Chrome Extension showcase** — a mock Chrome Web Store–style listing card with a preview modal, linking to the companion browser extension project
- Testimonials
- Pricing tiers with monthly/annual billing toggle
- FAQ accordion
- Call-to-action banner
- Footer with site links

**2. Chat Workspace** — the redesigned core app, reached via any "Launch Workspace" button:
- Collapsible sidebar with searchable conversation history
- Model selector modal (GPT-5 Cyber, Claude 3.5 Sonnet, Gemini 1.5 Pro)
- Full chat transcript with Markdown + syntax-highlighted code rendering
- Copy-to-clipboard on AI responses
- Typing indicator during (mocked) response generation
- Settings modal (theme, preferences)
- Plan/upgrade modal
- User profile display
- Persisted chat history via browser `localStorage`

---

## Setup Instructions

**Prerequisites:** Node.js and npm installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```
   Opens the app locally with hot-reload enabled.

3. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs a static, optimized build to the `dist/` folder.

4. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

5. **Lint the code:**
   ```bash
   npm run lint
   ```

**Deploying (e.g. to Vercel):**
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

No environment variables or API keys are required — the entire app runs client-side with mock data.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI |
| **Vite** | Build tooling and dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **lucide-react** | Icon set throughout the app and landing page |
| **react-markdown** + **remark-gfm** | Renders AI chat responses with full Markdown/GFM support |
| **react-syntax-highlighter** | Syntax-highlighted code blocks inside chat responses |
| **clsx** + **tailwind-merge** | Conditional and conflict-free Tailwind class composition |
| **Browser `localStorage`** | Persists chat history and preferences client-side |

---

## Assumptions

- **No backend or real AI integration.** All AI responses, model behavior, and "streaming" are simulated in the frontend. The interface is built so a real API integration could later replace the mock response logic without restructuring the UI.
- **No authentication.** User profile and account elements are placeholder/demo UI only; there is no real login, session, or account system.
- **Combined web app + landing page in a single deployment.** The real-world EchoGPT product hosts its marketing site (`echogpt.live`) and chat app separately. This redesign intentionally combines both into one React project under a single live URL, since the assignment specifies two deliverables (an app redesign and a landing page) rather than a specific hosting architecture. A brief in-app toggle (`onLaunchApp`) switches between the two views.
- **Chrome Extension section is a mock/demo, not a live install.** The landing page includes a section styled like a Chrome Web Store listing, but this project is a student build that has not been published to the Chrome Web Store (which requires a paid developer registration and a review process). Clicking "Preview Extension" opens a modal that honestly discloses this and links to the extension's source code on GitHub instead of a real install button.
- **Local, per-browser persistence only.** Chat history and settings are saved via `localStorage`, meaning they persist across sessions on the same browser/device but are not synced across devices, since no backend/account system exists to do so.
- **Pricing, testimonials, and usage stats are illustrative.** Figures such as user counts, ratings, and plan pricing are placeholder content for demonstration purposes, not real business data.

---

## Additional Features Implemented

Beyond the core assignment checklist, the following were added to improve usability and demonstrate more complete product thinking:

- **Chrome Extension cross-promotion section** — a dedicated landing page section bridges this web app to the companion Chrome extension redesign project, styled as a mock store listing with a preview modal and a real link to the extension's source code — closing the loop between the two related assignment deliverables.
- **Markdown & syntax-highlighted chat rendering** — AI responses support full Markdown formatting (lists, headings, bold/italic) and render code blocks with language-aware syntax highlighting, rather than plain text.
- **Persisted conversation history** — chats survive page reloads via `localStorage`, rather than resetting on every visit.
- **Searchable sidebar history** — past conversations can be filtered in real time from the sidebar.
- **Typing indicator** — a visual cue appears while a (mocked) AI response is being generated, avoiding a silent delay.
- **Monthly/annual pricing toggle** — an interactive billing switch updates displayed prices live, with an annual savings badge.
- **FAQ accordion** — expandable question/answer pairs instead of a static wall of text.
- **Fully responsive design** — dedicated mobile navigation, adaptive grid layouts, and touch-friendly spacing across all sections, from mobile through desktop breakpoints.

---

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx           # Full marketing site (hero, features, pricing, FAQ, etc.)
│   ├── ExtensionPreviewModal.jsx # Mock Chrome Web Store preview modal
│   ├── AppLayout.jsx             # Chat workspace shell (sidebar, header, layout)
│   ├── ChatTranscript.jsx        # Scrollable message history container
│   ├── ChatMessage.jsx           # Individual message bubble (user/AI, markdown rendering)
│   ├── PromptComposer.jsx        # Message input, attachments, send controls
│   ├── ModelSelectorModal.jsx    # AI model picker dialog
│   ├── SettingsModal.jsx         # Theme & preference controls
│   ├── PlanModal.jsx             # Upgrade/plan selection dialog
│   ├── UserProfile.jsx           # User account display
│   ├── TypingIndicator.jsx       # Animated "AI is responding" indicator
│   └── ErrorMessage.jsx          # Inline error state display
├── App.jsx                       # Root component — toggles landing page vs. chat workspace
├── index.css                     # Tailwind import + global styles
└── main.jsx                      # React entry point
```
