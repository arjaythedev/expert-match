"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, BookOpen, User } from "lucide-react";
import { DeckCard } from "@/lib/card-deck";
import { getAvatarUrl } from "@/lib/experts";

interface Props {
  card: DeckCard;
  cardIndex: number;
  totalCards: number;
  onSwipe: (direction: "left" | "right") => void;
  onBack: () => void;
  canGoBack: boolean;
}

function CardCategory({ card }: { card: DeckCard }) {
  switch (card.cardType) {
    case "concept": return <span>{card.category}</span>;
    case "expert": return <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Expert</span>;
    case "lesson": return <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Lightning Lesson</span>;
    case "course": return <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Course</span>;
  }
}

function ConceptBody({ card }: { card: DeckCard & { cardType: "concept" } }) {
  return (
    <div className="flex gap-4 items-stretch min-h-[120px]">
      <div className="flex-1 flex items-center justify-center p-4 rounded-xl border border-white/10 bg-navy-800/50">
        <span className="text-sm sm:text-base text-white/70 leading-snug text-center">{card.leftLabel}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-px h-full bg-navy-700" />
        <span className="text-[10px] text-white/20 uppercase tracking-widest">or</span>
        <div className="w-px h-full bg-navy-700" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 rounded-xl border border-white/10 bg-navy-800/50">
        <span className="text-sm sm:text-base text-white/70 leading-snug text-center">{card.rightLabel}</span>
      </div>
    </div>
  );
}

function ExpertBody({ card }: { card: DeckCard & { cardType: "expert" } }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-navy-600 bg-navy-700">
        <img
          src={card.imgUrl}
          alt={card.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(card.name); }}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">{card.name}</h3>
        <p className="text-sm text-white/50 mt-0.5">{card.title}</p>
      </div>
      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{card.bio}</p>
      <div className="flex flex-wrap justify-center gap-1.5 mt-1">
        {card.topics.slice(0, 3).map(t => (
          <span key={t} className="px-2.5 py-0.5 text-xs rounded-full border border-white/8 bg-navy-800 text-white/40">
            {t.replace(/-/g, " ")}
          </span>
        ))}
      </div>
    </div>
  );
}

function LessonBody({ card }: { card: DeckCard & { cardType: "lesson" } }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      {card.isUpcoming && (
        <div className="px-2.5 py-1 rounded-full bg-lime/10 border border-lime/20">
          <span className="text-xs text-lime font-medium">Upcoming</span>
        </div>
      )}
      <h3 className="text-base font-medium text-white leading-snug">{card.title}</h3>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-navy-700">
          <img
            src={card.instructorImg}
            alt={card.instructorName}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(card.instructorName); }}
          />
        </div>
        <div className="text-left">
          <p className="text-sm text-white/70">{card.instructorName}</p>
          <p className="text-xs text-white/30 line-clamp-1">{card.instructorTitle}</p>
        </div>
      </div>
      {card.startDate && (
        <p className="text-xs text-white/30">
          {new Date(card.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      )}
    </div>
  );
}

function CourseBody({ card }: { card: DeckCard & { cardType: "course" } }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="px-2.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20">
        <span className="text-xs text-brand-blue-light font-medium">Course</span>
      </div>
      <h3 className="text-base font-medium text-white leading-snug">{card.name}</h3>
      <p className="text-sm text-white/50">by {card.instructorName}</p>
      {card.cohortDate && (
        <p className="text-xs text-white/30">
          Next cohort: {new Date(card.cohortDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      )}
    </div>
  );
}

function SwipeLabels({ card }: { card: DeckCard }) {
  if (card.cardType === "concept") {
    return (
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 text-brand-blue-light">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Left</span>
        </div>
        <div className="flex items-center gap-1.5 text-lime">
          <span className="text-[10px] font-medium uppercase tracking-wider">Right</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-1.5 text-white/30">
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Pass</span>
      </div>
      <div className="flex items-center gap-1.5 text-lime">
        <span className="text-[10px] font-medium uppercase tracking-wider">Interested</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

export function SwipeCard({ card, cardIndex, totalCards, onSwipe, onBack, canGoBack }: Props) {
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);
  const x = useMotionValue(0);
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
        onSwipe(direction);
        setExiting(null);
      },
    });
  }, [exiting, onSwipe, x]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSwipe]);

  const progress = ((cardIndex + 1) / totalCards) * 100;

  // Card accent color based on type
  const borderAccent = card.cardType === "expert"
    ? "border-lime/20"
    : card.cardType === "lesson"
    ? "border-brand-blue/20"
    : card.cardType === "course"
    ? "border-brand-blue/20"
    : "border-navy-700";

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      {/* Progress */}
      <div className="mb-3 flex items-center justify-between text-xs text-white/40">
        <CardCategory card={card} />
        <span>{cardIndex + 1} / {totalCards}</span>
      </div>
      <div className="w-full h-1 bg-navy-800 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-lime rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Swipe area */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 340 }}>
        <motion.div
          key={card.id}
          className="w-[280px] sm:w-[340px] cursor-grab active:cursor-grabbing select-none touch-none"
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.9}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) handleSwipe("left");
            else if (info.offset.x > 80) handleSwipe("right");
            else animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`relative bg-navy-900 border ${borderAccent} rounded-2xl p-6 sm:p-8 shadow-2xl`}>
            <SwipeLabels card={card} />
            <div className="border-t border-navy-700/50 pt-5">
              {card.cardType === "concept" && <ConceptBody card={card} />}
              {card.cardType === "expert" && <ExpertBody card={card} />}
              {card.cardType === "lesson" && <LessonBody card={card} />}
              {card.cardType === "course" && <CourseBody card={card} />}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {canGoBack && (
          <button onClick={onBack} className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
            &larr; Back
          </button>
        )}
        {card.cardType === "concept" ? (
          <div className="flex gap-3">
            <button onClick={() => handleSwipe("left")} className="px-4 py-2 rounded-lg border border-white/10 text-xs text-white/50 hover:bg-navy-800 transition-colors cursor-pointer">
              {card.leftLabel.length > 25 ? "Left" : card.leftLabel}
            </button>
            <button onClick={() => handleSwipe("right")} className="px-4 py-2 rounded-lg border border-lime/20 text-xs text-lime/70 hover:bg-lime/5 transition-colors cursor-pointer">
              {card.rightLabel.length > 25 ? "Right" : card.rightLabel}
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => handleSwipe("left")} className="px-5 py-2 rounded-lg border border-white/10 text-xs text-white/50 hover:bg-navy-800 transition-colors cursor-pointer">
              Pass
            </button>
            <button onClick={() => handleSwipe("right")} className="px-5 py-2 rounded-lg border border-lime/20 text-xs text-lime/70 hover:bg-lime/5 transition-colors cursor-pointer">
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
