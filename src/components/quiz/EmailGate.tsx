"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, Lock, User, Zap, BookOpen } from "lucide-react";
import { LearningPlan } from "@/lib/learning-plan";
import { getAvatarUrl } from "@/lib/experts";

interface Props {
  learningPlan: LearningPlan;
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
}

export function EmailGate({ learningPlan, onSubmit, isSubmitting }: Props) {
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

  const { experts, lessons, courses } = learningPlan;

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
          Your learning plan is{" "}
          <span className="text-lime">ready.</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg">
          {experts.length} experts, {lessons.length} lessons, and {courses.length} courses matched to your profile.
        </p>
      </motion.div>

      {/* Blurred preview cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
      >
        {/* Expert preview */}
        {experts[0] && (
          <div className="relative bg-navy-900 border border-navy-700 rounded-xl p-4 overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-md bg-navy-950/60 z-10 flex flex-col items-center justify-center gap-1">
              <Lock className="w-4 h-4 text-white/30" />
              <span className="text-xs text-white/30 font-medium">Locked</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-lime/40">
              <User className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider">Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy-700 overflow-hidden">
                <img src={experts[0].imgUrl} alt="" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(experts[0].name); }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{experts[0].name}</p>
                <p className="text-[10px] text-white/40 truncate">{experts[0].title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Lesson preview */}
        {lessons[0] && (
          <div className="relative bg-navy-900 border border-navy-700 rounded-xl p-4 overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-md bg-navy-950/60 z-10 flex flex-col items-center justify-center gap-1">
              <Lock className="w-4 h-4 text-white/30" />
              <span className="text-xs text-white/30 font-medium">Locked</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-brand-blue-light/40">
              <Zap className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider">Lesson</span>
            </div>
            <p className="text-sm text-white line-clamp-2">{lessons[0].title}</p>
            <p className="text-[10px] text-white/40 mt-1">{lessons[0].instructorName}</p>
          </div>
        )}

        {/* Course preview */}
        {courses[0] && (
          <div className="relative bg-navy-900 border border-navy-700 rounded-xl p-4 overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-md bg-navy-950/60 z-10 flex flex-col items-center justify-center gap-1">
              <Lock className="w-4 h-4 text-white/30" />
              <span className="text-xs text-white/30 font-medium">Locked</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-brand-blue-light/40">
              <BookOpen className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider">Course</span>
            </div>
            <p className="text-sm text-white line-clamp-2">{courses[0].name}</p>
            <p className="text-[10px] text-white/40 mt-1">{courses[0].instructorName}</p>
          </div>
        )}
      </motion.div>

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
                Building your plan...
              </>
            ) : (
              <>
                Unlock My Learning Plan
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
