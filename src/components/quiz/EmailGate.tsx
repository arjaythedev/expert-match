"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, Lock } from "lucide-react";
import { Expert, getAvatarUrl } from "@/lib/experts";

interface Props {
  experts: Expert[];
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
}

export function EmailGate({ experts, onSubmit, isSubmitting }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError("Please enter a valid email"); return; }
    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2
          className="text-[28px] sm:text-[36px] font-light font-serif text-white leading-[1.2] tracking-[-1.2px] mb-3"
          style={{ fontFeatureSettings: "'ss01' 1" }}
        >
          Your experts are{" "}
          <span className="text-lime">ready.</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg">
          We found {experts.length} expert{experts.length !== 1 ? "s" : ""} matched to your profile. Enter your email to reveal them.
        </p>
      </motion.div>

      {/* Blurred expert cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8"
      >
        {experts.slice(0, 3).map((expert, i) => (
          <motion.div
            key={expert.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className="relative bg-navy-900 border border-navy-700 rounded-xl p-5 overflow-hidden"
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-navy-950/60 z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white/40">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Locked</span>
              </div>
            </div>

            {/* Blurred content */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-700 flex-shrink-0 overflow-hidden">
                <img
                  src={expert.imgUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAvatarUrl(expert.name);
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{expert.name}</p>
                <p className="text-xs text-white/50 truncate">{expert.title}</p>
                <p className="mt-2 text-xs text-white/40 line-clamp-2">{expert.bio}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Remaining count indicator */}
      {experts.length > 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-white/30 mb-6"
        >
          + {experts.length - 3} more expert{experts.length - 3 !== 1 ? "s" : ""} waiting
        </motion.p>
      )}

      {/* Email form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-brand-blue" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@company.com"
              className="w-full px-5 py-3.5 rounded-[10px] border border-white/10 bg-navy-900 text-white placeholder-white/30 text-base focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light/20 transition-all"
              disabled={isSubmitting}
            />
            {error && <p className="text-sm text-red-400 mt-2 text-left">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-[10px] bg-white text-neutral-900 font-medium text-base tracking-[-0.28px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Unlocking your experts...
              </>
            ) : (
              <>
                Unlock My Experts
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-white/40 mt-4 text-center">
          By providing your email, you consent to receiving marketing communications from Maven. You can unsubscribe at any time.
        </p>
      </motion.div>
    </div>
  );
}
