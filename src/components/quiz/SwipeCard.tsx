"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SwipeQuestion } from "@/lib/questions";

interface Props {
  question: SwipeQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: "left" | "right") => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function SwipeCard({ question, questionIndex, totalQuestions, onAnswer, onBack, canGoBack }: Props) {
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 340;

  const rotate = useTransform(x, [-cardWidth, 0, cardWidth], [-8, 0, 8]);

  const handleSwipe = useCallback((direction: "left" | "right") => {
    if (exiting) return;
    setExiting(direction);
    const target = direction === "left" ? -cardWidth * 1.2 : cardWidth * 1.2;
    animate(x, target, {
      type: "tween",
      duration: 0.18,
      ease: "easeOut",
      onComplete: () => {
        x.set(0);
        onAnswer(direction);
        setExiting(null);
      },
    });
  }, [exiting, onAnswer, x]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSwipe]);

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      {/* Progress bar */}
      <div className="mb-3 flex items-center justify-between text-xs text-white/40">
        <span className="uppercase tracking-wider">{question.category}</span>
        <span>{questionIndex + 1} / {totalQuestions}</span>
      </div>
      <div className="w-full h-1 bg-navy-800 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-lime rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Swipe card area */}
      <div ref={containerRef} className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 340 }}>
        {/* The card */}
        <motion.div
          key={question.id}
          className="w-[280px] sm:w-[340px] cursor-grab active:cursor-grabbing select-none touch-none"
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.9}
          onDragEnd={(_, info) => {
            const threshold = 80;
            if (info.offset.x < -threshold) {
              handleSwipe("left");
            } else if (info.offset.x > threshold) {
              handleSwipe("right");
            } else {
              animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
            }
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Card content */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-brand-blue-light">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Swipe left</span>
                </div>
                <div className="flex items-center gap-2 text-lime">
                  <span className="text-xs font-medium uppercase tracking-wider">Swipe right</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="border-t border-navy-700 pt-6 pb-4">
                <div className="flex gap-4 items-stretch min-h-[120px]">
                  {/* Left option */}
                  <button
                    onClick={() => handleSwipe("left")}
                    className="flex-1 flex items-center justify-center p-4 rounded-xl border border-white/10 bg-navy-800/50 hover:bg-brand-blue/10 hover:border-brand-blue/30 transition-all cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base text-white/70 group-hover:text-brand-blue-light leading-snug transition-colors">
                      {question.leftLabel}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-px h-full bg-navy-700" />
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">or</span>
                    <div className="w-px h-full bg-navy-700" />
                  </div>

                  {/* Right option */}
                  <button
                    onClick={() => handleSwipe("right")}
                    className="flex-1 flex items-center justify-center p-4 rounded-xl border border-white/10 bg-navy-800/50 hover:bg-lime/5 hover:border-lime/20 transition-all cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base text-white/70 group-hover:text-lime leading-snug transition-colors">
                      {question.rightLabel}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {canGoBack && (
          <button
            onClick={onBack}
            className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          >
            &larr; Back
          </button>
        )}
        <p className="text-xs text-white/25">
          Swipe, tap, or use arrow keys
        </p>
      </div>
    </div>
  );
}
