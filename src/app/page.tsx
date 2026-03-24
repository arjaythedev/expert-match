"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackgroundGrid } from "@/components/landing/BackgroundGrid";
import { InstructorCarousel } from "@/components/landing/InstructorCarousel";

function HeroEmailCapture() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    sessionStorage.setItem("expert-match-email", email.trim());
    router.push("/quiz");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 px-4 py-3.5 rounded-[10px] border border-white/15 bg-navy-800/80 text-white placeholder-white/30 text-base focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light/20 transition-all"
      />
      <button
        type="submit"
        disabled={!isValid}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-white text-neutral-900 font-medium text-base tracking-[-0.28px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Match me
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundGrid />

      {/* Fixed top navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-navy-950 border-b border-navy-700 shadow-[0px_5px_14px_0px_rgba(0,0,0,0.05),0px_2px_6px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
          <img src="/maven-logo.svg" alt="Maven" width={147} height={32} className="h-8 w-auto" />
        </div>
      </nav>

      {/* Main column */}
      <div className="relative z-10 flex-none border-l border-r border-navy-700 max-w-[1100px] mx-auto w-full mt-[72px] bg-navy-950">

        {/* Hero */}
        <section className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center py-24 overflow-hidden">
          {/* Carousel behind the hero text */}
          <div className="absolute inset-0 z-0">
            <InstructorCarousel />
          </div>

          {/* Dark overlay so text is legible */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/80" />

          <div className="relative z-[2] max-w-[600px] mx-auto text-center px-6 sm:px-10 py-12 rounded-3xl bg-navy-950/75 backdrop-blur-md border border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime/20 bg-lime/5 text-lime text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>2 minute expert matching quiz</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-10 text-[48px] sm:text-[72px] font-light font-serif text-white leading-[1.1] tracking-[-2.88px]"
              style={{ fontFeatureSettings: "'ss01' 1" }}
            >
              Learn from humans.{" "}
              <span className="text-lime">Find the right experts.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/80 leading-[1.6] max-w-[580px] mx-auto"
            >
              Answer a few quick questions, swipe through real experts and lessons, and walk away with a personalized learning plan built just for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <HeroEmailCapture />
            </motion.div>

          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
