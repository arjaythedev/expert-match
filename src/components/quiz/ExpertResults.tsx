"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { Expert, getAvatarUrl } from "@/lib/experts";

interface Props {
  experts: Expert[];
}

export function ExpertResults({ experts }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime/20 bg-lime/5 text-lime text-sm font-medium mb-6">
          <Star className="w-4 h-4" />
          <span>Your expert matches</span>
        </div>
        <h2
          className="text-[28px] sm:text-[40px] font-light font-serif text-white leading-[1.15] tracking-[-1.2px]"
          style={{ fontFeatureSettings: "'ss01' 1" }}
        >
          Meet your{" "}
          <span className="text-lime">experts</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-white/60 max-w-lg mx-auto">
          Based on your answers, these are the experts who best match your goals, learning style, and where you are in your career.
        </p>
      </motion.div>

      <div className="space-y-4">
        {experts.map((expert, i) => (
          <motion.div
            key={expert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
            className="bg-navy-900 border border-navy-700 rounded-2xl p-5 sm:p-6 hover:border-navy-500 transition-colors"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Headshot */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-navy-700 flex-shrink-0 overflow-hidden border border-navy-600">
                <img
                  src={expert.imgUrl}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAvatarUrl(expert.name);
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-[-0.36px]">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-white/50 mt-0.5">{expert.title}</p>
                  </div>
                  {i === 0 && (
                    <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-lime/10 border border-lime/20">
                      <span className="text-xs text-lime font-medium">Top Match</span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-sm text-white/60 leading-[1.6]">
                  {expert.bio}
                </p>

                {/* Topics */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {expert.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic}
                      className="px-2.5 py-0.5 text-xs rounded-full border border-white/8 bg-navy-800 text-white/40"
                    >
                      {topic.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <a
          href="https://maven.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-white text-neutral-900 font-medium text-base tracking-[-0.36px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200"
        >
          Explore all experts on Maven
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="mt-4 text-sm text-white/30">
          Browse courses, lightning lessons, and 1:1 coaching
        </p>
      </motion.div>
    </div>
  );
}
