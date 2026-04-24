"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

interface NewsletterSignupProps {
  /** Render a compact version for the footer (no gradient background) */
  variant?: "default" | "footer";
}

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // ---------------------------------------------------------------
    // TODO: Connect to your email service provider.
    //
    // Option 1 — ConvertKit (Kit):
    //   const res = await fetch(
    //     "https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ api_key: "YOUR_API_KEY", email }),
    //     }
    //   );
    //
    // Option 2 — Mailchimp (via client-side jsonp or a serverless function):
    //   const res = await fetch(
    //     "https://YOUR_DC.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members",
    //     { ... }
    //   );
    //
    // For now we simulate a successful subscription after a short delay.
    // ---------------------------------------------------------------

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulate success — replace this block with real API call above
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const isFooter = variant === "footer";

  // ---- Footer variant (compact, dark background context) ----
  if (isFooter) {
    return (
      <div className="max-w-md">
        <h3 className="font-display font-bold text-sm uppercase tracking-widest text-accent mb-4">
          Newsletter
        </h3>
        <p className="text-slate-400 font-light text-sm leading-relaxed mb-5">
          Weekly air quality tips, exclusive deals, and new product alerts — straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>You&apos;re subscribed! Check your inbox to confirm.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="flex-1 min-w-0 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-accent hover:bg-accent/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ---- Default variant (full-width CTA banner for article pages) ----
  return (
    <section className="my-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-indigo-500/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Free Newsletter
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-white mb-3">
          Breathe easier with expert tips in your inbox
        </h2>
        <p className="text-slate-400 font-light text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Get weekly air quality tips, exclusive deals, and new product alerts — join 5,000+ readers who trust our recommendations.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2.5 text-emerald-400 text-lg font-medium animate-in fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>You&apos;re in! Check your inbox to confirm your subscription.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-500 rounded-full pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-accent/25 hover:shadow-accent/40 whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="flex items-center justify-center gap-1.5 text-red-400 text-sm mt-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
          </p>
        )}

        <p className="text-slate-600 text-xs mt-5">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
