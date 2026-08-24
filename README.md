# Nirman AI ⚡ — Agentic Full-Stack Web Application Builder

![Nirman AI Preview](https://yzjpnbrvjaderqflznkb.supabase.co/storage/v1/object/public/workspace%20images/landing%20page.png)

> **Forge your dream project from a single prompt.**  
> Nirman AI is an AI-powered web application platform that enables developers, designers, and creators to transform text prompts and UI wireframe screenshots into live, production-ready React applications in seconds.

[🚀 **Try Nirman AI Live**](https://nirman-ai.vercel.app)

---

## ✨ Highlights & Key Features

### 🚀 1. Prompt-to-App Instant Synthesis
Describe what you want to build in plain English (or paste design prompts), and Nirman AI automatically:
- Generates clean, functional React components using modern hooks and state management.
- Applies dark-mode styling with Tailwind CSS.
- Automatically selects and injects required npm packages (e.g. `lucide-react`, `recharts`, `framer-motion`, `date-fns`, `zod`).
- Validates packages against the official `registry.npmjs.org` API in real time to purge hallucinated dependencies.

---

### 🤖 2. Nirman Pro Agent ("Improve with AI")
For Pro plan users, Nirman AI features an autonomous **Agentic Reasoning Loop** driven by the `@cline/sdk`:
- **Surgical File Updates**: Operates a `update_file` tool to rewrite specific component files without discarding your existing logic.
- **Self-Healing Error Fixer**: Listens to live Sandpack compile and runtime errors. Clicking **"Fix with AI"** feeds stack traces to the agent to output an instant automated patch.
- **Live Streamed Reasoning**: Displays real-time agent "thinking" steps directly in your chat panel as it works.

---

### 🛝 3. Sandboxed Live Preview & Code Panel
- **Instant Hot-Reloading**: Uses `@codesandbox/sandpack-react` with a Dracula theme to compile and render your application inside a secure browser sandbox.
- **Dual View Modes**: Switch seamlessly between **Preview Mode** (live interactive app) and **Code Mode** (file tree and code viewer).
- **Interactive Component Tree**: Inspect files, styles, and logic directly inside your browser.

---

### 📸 4. Visual Wireframe & Reference Image Ingestion
- Upload wireframes, mockups, or design screenshots via the built-in image attachment tool.
- Uploaded assets are stored in a public Supabase Storage bucket (`workspace-images`).
- Nirman AI analyzes the visual template URL and constructs matching layout structures, Tailwind color palettes, and component styles.

---

### 📦 5. One-Click Source Code Export
- Click **Export to ZIP** to instantly download your entire project source directory.
- Bundled with `JSZip`, including:
  - Ready-to-run `package.json` with all resolved dependencies.
  - HTML index file pre-configured with Tailwind CSS scripts.
  - Getting started `README.md` with `npm install` & `npm start` commands.

---

### 🛡️ 6. Enterprise-Grade Security & Protection
Nirman AI is protected by an **Arcjet Security Firewall**:
- **Prompt Injection Defense**: Blocks jailbreak attempts and malicious prompt manipulations before LLM processing.
- **Sensitive Info Leak Prevention**: Blocks accidental leaks of API keys, credit card numbers, or database credentials.
- **Bot Shield & Scraper Defense**: Protects endpoints against automated scrapers, DDoS attacks, and unauthorized bots.
- **Per-User Rate Limiting**: Token-bucket algorithm ensuring fair credit allocation and system availability.

---

### 💳 7. Transparent Credits & Tiered Subscription Plans
Powered by **Clerk Billing**:
- **Free Tier**: 10 generations per month, live preview, and ZIP export.
- **Starter Tier ($9/mo)**: 50 generations per month, design image uploads, live preview, and ZIP export.
- **Pro Tier ($29/mo)**: 150 generations per month, priority AI streaming, image uploads, ZIP export, and full access to the **Nirman Pro Agent**.

---

### 📂 8. Project History & Workspace Dashboard
- Automatically saves all your generated applications, message transcripts, and file trees to a cloud database (Supabase PostgreSQL via Prisma).
- Access all your builds anytime from your personal **Projects Dashboard**.
- Easily resume, modify, or delete existing workspaces.

---

## 🛠️ Built With

Nirman AI is engineered with a modern web stack:

- **Frontend & App Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/), [Lucide Icons](https://lucide.dev/)
- **AI Core & Streaming**: [Google Gemini 3.5 Flash](https://ai.google.dev/) (`@google/genai`)
- **Autonomous Agent**: [Cline Agent SDK](https://github.com/cline/cline) (`@cline/sdk`)
- **Authentication & Billing**: [Clerk Next.js](https://clerk.com/) & Clerk Billing (`<PricingTable />`)
- **Database & ORM**: [Supabase PostgreSQL](https://supabase.com/) & [Prisma ORM](https://www.prisma.io/)
- **Live Preview Sandbox**: [Sandpack React](https://sandpack.codesandbox.io/)
- **Security Firewall**: [Arcjet](https://arcjet.com/) (`@arcjet/next`)

---

## 🌐 Live Access

Experience Nirman AI directly on the web:  
👉 **[Launch Nirman AI Web App](https://nirman-ai.vercel.app)**

---

## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author & Credits

Designed and Developed by **Naman Sharma** — *Computer Science Engineer*
