"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton, PricingTable } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { ArrowRight, Zap, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { Badge } from "@/components/ui/badge";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";
import { PRICING_PLANS } from "@/lib/constants";
import {
  BlueTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusables";

export default function LandingPage() {
  const { isSignedIn, has } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)" // blur
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />

        <Badge variant="outline" className="gap-2 p-4 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powered by Agentic AI
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl z-10">
          <GrayTitle>Build your dream project</GrayTitle>
          <br />
          <BlueTitle>from a single prompt.</BlueTitle>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/40 z-10">
          Describe what you want to build. AI writes the code, picks the
          packages, and renders a live preview all inside your browser.
        </p>

        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/8"
                : "border-white/8"
            )}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
            />

            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span className="text-xs text-white/20">
                Press ⏎ to generate · Shift+⏎ for new line
              </span>

              {isSignedIn ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-8 rounded-full px-5 font-semibold"
                  variant={prompt.trim() ? "default" : "secondary"}
                >
                  Generate
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-8 rounded-full bg-white px-5 font-semibold">
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-white/20">
          No credit card required · 10 free generations on sign up
        </p>
      </section>

      {/* BROWSER MOCKUP */}
      <section className="px-4 pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 border-b border-white/8 bg-[#0c0c0c] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/8 bg-[#101010] px-4 py-2 text-xs text-white/35">
                <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-white/45">
                  Workspace
                </span>
                <span className="truncate">https://nirman.ai/workspace/creative-build</span>
              </div>
            </div>

            <div className="grid gap-0 border-t border-white/8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col border-b border-white/8 bg-[#0b0b0b] lg:border-b-0 lg:border-r lg:border-white/8">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">Chat</p>
                </div>

                <div className="flex min-h-[33rem] flex-1 flex-col px-4 py-5">
                  <div className="flex-1 space-y-3">
                    <div className="ml-auto max-w-[82%] rounded-[1.4rem] rounded-tr-md border border-cyan-400/15 bg-cyan-400/12 px-4 py-3 text-sm leading-relaxed text-cyan-50">
                      Build me a workspace that feels like a command center with a live preview and a dark editorial style.
                    </div>

                    <div className="max-w-[86%] rounded-[1.4rem] rounded-tl-md border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/72">
                      I’m shaping the layout around a browser shell, a split workspace, and a high-contrast data view.
                    </div>

                    <div className="max-w-[86%] rounded-[1.4rem] rounded-tl-md border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/72">
                      <div className="mb-3 flex gap-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white/40" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white/30 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white/20 [animation-delay:300ms]" />
                      </div>
                      Refining the preview so the board, chrome, and chat all read as one cohesive product mockup.
                    </div>
                  </div>

                  <div className="mt-4 shrink-0 border-t border-white/8 pt-4">
                    <div className="rounded-[1.4rem] border border-white/8 bg-[#121212] px-4 py-3 text-sm text-white/28">
                      Ask anything about the workspace...
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#090909]">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-white/30">
                    <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-white/55">Design</span>
                    <span className="rounded-full border border-white/8 px-3 py-1">Preview</span>
                    <span className="rounded-full border border-white/8 px-3 py-1">Specs</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(52,211,153,0.6)]" />
                </div>

                <div className="grid gap-4 p-4 md:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-white/8 bg-[#0f0f0f] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.25em] text-white/28">Todo</span>
                      <span className="text-[11px] text-white/18">03</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-24 rounded-2xl border border-white/8 bg-white/5 p-3">
                        <div className="h-3 w-20 rounded-full bg-white/12" />
                        <div className="mt-3 h-3 w-11/12 rounded-full bg-white/8" />
                        <div className="mt-2 h-3 w-3/4 rounded-full bg-white/8" />
                      </div>
                      <div className="h-20 rounded-2xl border border-white/8 bg-white/5 p-3">
                        <div className="h-3 w-24 rounded-full bg-white/12" />
                        <div className="mt-3 h-3 w-2/3 rounded-full bg-white/8" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-cyan-400/10 bg-[#0f1213] p-4 shadow-[inset_0_1px_0_rgba(103,232,249,0.04)]">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.25em] text-cyan-100/35">In Progress</span>
                      <span className="text-[11px] text-cyan-100/20">02</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-28 rounded-2xl border border-cyan-400/10 bg-cyan-400/8 p-3">
                        <div className="h-3 w-28 rounded-full bg-cyan-100/16" />
                        <div className="mt-3 h-3 w-11/12 rounded-full bg-cyan-100/8" />
                        <div className="mt-2 h-3 w-4/5 rounded-full bg-cyan-100/8" />
                        <div className="mt-4 h-2.5 w-2/3 rounded-full bg-cyan-300/20" />
                      </div>
                      <div className="h-18 rounded-2xl border border-cyan-400/10 bg-[#111415] p-3">
                        <div className="h-3 w-24 rounded-full bg-cyan-100/16" />
                        <div className="mt-3 h-3 w-5/6 rounded-full bg-cyan-100/8" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-emerald-400/10 bg-[#0d110f] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.25em] text-emerald-100/35">Done</span>
                      <span className="text-[11px] text-emerald-100/20">04</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-18 rounded-2xl border border-emerald-400/10 bg-emerald-400/8 p-3">
                        <div className="h-3 w-24 rounded-full bg-emerald-100/16" />
                        <div className="mt-3 h-3 w-4/5 rounded-full bg-emerald-100/8" />
                      </div>
                      <div className="h-24 rounded-2xl border border-emerald-400/10 bg-[#111510] p-3">
                        <div className="h-3 w-32 rounded-full bg-emerald-100/16" />
                        <div className="mt-3 h-3 w-11/12 rounded-full bg-emerald-100/8" />
                        <div className="mt-2 h-3 w-2/3 rounded-full bg-emerald-100/8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From prompt" blue="to production." />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 group-hover:border-white/15 group-hover:bg-white/8">
                <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70" />
              </div>
              <p className="mb-2 text-sm font-semibold">{label}</p>
              <p className="text-sm leading-relaxed text-white/40">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app." />
        </div>

        <div className="mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
                  <span className="font-mono text-xs font-semibold text-white/50">
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-white/6" />
                )}
              </div>

              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">
                  {step.label}
                </p>

                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Simple pricing</SectionLabel>
          <SectionHeading gray="Start free," blue="scale when ready." />

          <p className="mx-auto mt-4 max-w-sm text-sm text-white/35">
            No credit card required. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 2000,
                  }
                }
              }
            }}
          />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-white/8 px-10 py-24 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)" // blur
          numberOfLines={36}
          numberOfDiscs={36}
          particleRGBColor={[147, 197, 253]}
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        <SectionHeading gray="Start building," blue="for free." />

        <p className="mb-8 text-sm leading-relaxed text-white/40">
          Get 10 free generations on sign up. No credit card required.
          <br />
          Upgrade when you&apos;re ready.
        </p>

        <SignInButton mode="modal">
          <Button
            size="lg"
            className="relative h-11 rounded-full bg-white px-8"
          >
            Get started free
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SignInButton>
      </section>

      <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">
        Made by Naman Sharma - A Computer Science Engineer
      </footer>
    </main>
  );
}
