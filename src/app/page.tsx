"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Sparkles, Search } from "lucide-react";
import { BackgroundGrid } from "@/components/landing/BackgroundGrid";

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
        <section className="min-h-[calc(100vh-72px)] flex items-center justify-center py-24">
          <div className="max-w-[760px] mx-auto text-center px-6">
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
              <span className="text-lime">Find your expert.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/70 leading-[1.6] max-w-[580px] mx-auto"
            >
              Swipe through a few quick questions and we&apos;ll match you with the perfect experts for your goals, your style, and your career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-5 rounded-[10px] bg-white text-neutral-900 font-medium text-lg tracking-[-0.36px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200"
                style={{ fontFeatureSettings: "'ss01' 1" }}
              >
                Find your expert
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Swipe left or right &middot; Takes 2 minutes</span>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-20"
            >
              <div className="flex flex-col items-center gap-2 text-white/20">
                <span className="text-xs uppercase tracking-[0.15em]">Learn more</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 7L10 13L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="border-t border-navy-700" />

        {/* How it works */}
        <section className="py-32 px-6">
          <div className="max-w-[880px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-lime/60 mb-6">How it works</p>
              <h2 className="text-[40px] font-light font-serif text-white leading-[48px] tracking-[-1.2px]" style={{ fontFeatureSettings: "'ss01' 1" }}>
                Your perfect match in 3 steps
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy-700 rounded-2xl overflow-hidden">
              {[
                {
                  icon: <Search className="w-5 h-5" />,
                  title: "Pick your field",
                  description: "Tell us what you do — product, engineering, design, marketing, and more.",
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Swipe to match",
                  description: "Quick left or right swipes tell us your goals, style, and what you need in an expert.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Meet your experts",
                  description: "Get matched with handpicked experts who fit your exact situation and learning style.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-navy-900 p-8 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-lime/80 mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-[-0.36px]">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/50 leading-[1.6]">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-navy-700" />

        {/* The premise */}
        <section className="py-32 px-6">
          <div className="max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-lime/60 mb-8">The human edge</p>
              <h2 className="text-[40px] font-light font-serif text-white leading-[48px] tracking-[-1.2px]" style={{ fontFeatureSettings: "'ss01' 1" }}>
                AI can teach you facts.{" "}
                <span className="text-lime">Humans teach you judgment.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <p className="mt-8 text-lg text-white/60 leading-[1.7]">
                The best learning happens with someone who&apos;s been where you are — someone who can see around corners, challenge your thinking, and hold you accountable.
              </p>
              <p className="mt-4 text-lg text-white/60 leading-[1.7]">
                We&apos;ll match you with that person.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="border-t border-navy-700" />

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-[640px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[48px] font-light font-serif text-white leading-[56px] tracking-[-1.92px]" style={{ fontFeatureSettings: "'ss01' 1" }}>
                Ready to find{" "}
                <span className="text-lime">your expert?</span>
              </h2>
              <p className="mt-6 text-lg text-white/50 leading-[1.6]">
                A few swipes. Instant expert matches. No guesswork.
              </p>
              <div className="mt-10">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-[10px] bg-white text-neutral-900 font-medium text-lg tracking-[-0.36px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200"
                  style={{ fontFeatureSettings: "'ss01' 1" }}
                >
                  Find your expert
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40">
                <Zap className="w-3.5 h-3.5" />
                <span>Swipe left or right &middot; Takes 2 minutes</span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
