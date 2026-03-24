"use client";

import { motion } from "framer-motion";
import { Star, Zap, BookOpen, ExternalLink, User } from "lucide-react";
import { LearningPlan } from "@/lib/learning-plan";
import { getAvatarUrl } from "@/lib/experts";

interface Props {
  learningPlan: LearningPlan;
}

export function LearningPlanResults({ learningPlan }: Props) {
  const { experts, lessons, courses } = learningPlan;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime/20 bg-lime/5 text-lime text-sm font-medium mb-6">
          <Star className="w-4 h-4" />
          <span>Your matches</span>
        </div>
        <h2
          className="text-[28px] sm:text-[40px] font-light font-serif text-white leading-[1.15] tracking-[-1.2px]"
          style={{ fontFeatureSettings: "'ss01' 1" }}
        >
          Here are{" "}
          <span className="text-lime">your matches</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-white/60 max-w-lg mx-auto">
          Based on your answers and the experts and lessons you liked, here&apos;s everything you need to level up.
        </p>
      </motion.div>

      {/* Lightning Lessons Section */}
      {lessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-brand-blue-light/60" />
            <h3 className="text-sm uppercase tracking-[0.15em] text-brand-blue-light/60 font-medium">Lightning Lessons</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessons.map((lesson, i) => (
              <motion.a
                key={lesson.id}
                href={`https://maven.com/p/${lesson.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                className="bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-brand-blue/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  {lesson.isUpcoming && (
                    <div className="px-2 py-0.5 rounded-full bg-lime/10 border border-lime/20">
                      <span className="text-[10px] text-lime font-medium">Upcoming</span>
                    </div>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-blue-light transition-colors flex-shrink-0" />
                </div>
                <h4 className="text-sm font-medium text-white leading-snug mb-2 line-clamp-2">{lesson.title}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-navy-700 flex-shrink-0">
                    <img
                      src={lesson.instructorImg}
                      alt={lesson.instructorName}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(lesson.instructorName); }}
                    />
                  </div>
                  <span className="text-xs text-white/40 truncate">{lesson.instructorName}</span>
                </div>
                {lesson.startDate && (
                  <p className="text-[10px] text-white/25 mt-2">
                    {new Date(lesson.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Experts Section */}
      {experts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-lime/60" />
            <h3 className="text-sm uppercase tracking-[0.15em] text-lime/60 font-medium">Your Experts</h3>
          </div>
          <div className="space-y-3">
            {experts.map((expert, i) => (
              <motion.div
                key={expert.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                className="bg-navy-900 border border-navy-700 rounded-xl p-4 sm:p-5 hover:border-navy-500 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-navy-700 flex-shrink-0 overflow-hidden border border-navy-600">
                    <img
                      src={expert.imgUrl}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = getAvatarUrl(expert.name); }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-medium text-white">{expert.name}</h4>
                        <p className="text-sm text-white/50">{expert.title}</p>
                      </div>
                      {i === 0 && (
                        <div className="flex-shrink-0 px-2 py-0.5 rounded-full bg-lime/10 border border-lime/20">
                          <span className="text-[10px] text-lime font-medium">Top Match</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-2">{expert.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Courses Section */}
      {courses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-brand-blue-light/60" />
            <h3 className="text-sm uppercase tracking-[0.15em] text-brand-blue-light/60 font-medium">Courses</h3>
          </div>
          <div className="space-y-3">
            {courses.map((course, i) => (
              <motion.a
                key={course.id}
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
                className="flex items-start justify-between gap-3 bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-brand-blue/30 transition-colors group"
              >
                <div>
                  <h4 className="text-sm font-medium text-white leading-snug">{course.name}</h4>
                  <p className="text-xs text-white/40 mt-1">by {course.instructorName}</p>
                  {course.cohortDate && (
                    <p className="text-[10px] text-white/25 mt-1.5">
                      Next cohort: {new Date(course.cohortDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-brand-blue-light transition-colors flex-shrink-0 mt-1" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center pt-4 pb-8"
      >
        <a
          href="https://maven.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-white text-neutral-900 font-medium text-base tracking-[-0.36px] border border-neutral-300 shadow-sm hover:bg-neutral-100 transition-all duration-200"
        >
          Explore more on Maven
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="mt-4 text-sm text-white/30">
          Browse all experts, courses, and lightning lessons
        </p>
      </motion.div>
    </div>
  );
}
