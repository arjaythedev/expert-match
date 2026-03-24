import { Expert, EXPERTS, matchExperts, QuizAnswers, Vertical } from "./experts";
import { LightningLesson, Course, LESSONS, COURSES, VERTICAL_TO_TOPICS } from "./recommendations";

export interface LearningPlan {
  experts: Expert[];
  lessons: LightningLesson[];
  courses: Course[];
}

export function computeLearningPlan(
  vertical: Vertical,
  conceptAnswers: Record<string, "left" | "right">,
  likedExpertIds: string[],
  likedLessonIds: string[],
  likedCourseIds: string[],
): LearningPlan {
  // 1. Algorithm matched experts from concept answers
  const quizAnswers: QuizAnswers = {
    vertical,
    experience: conceptAnswers.experience || "left",
    learningStyle: conceptAnswers.learningStyle || "left",
    workStyle: conceptAnswers.workStyle || "left",
    careerGoal: conceptAnswers.careerGoal || "left",
    needType: conceptAnswers.needType || "left",
    accountability: conceptAnswers.accountability || "left",
    urgency: conceptAnswers.urgency || "left",
    commitment: conceptAnswers.commitment || "left",
    perspective: conceptAnswers.perspective || "left",
    coachingVibe: conceptAnswers.coachingVibe || "left",
    expertType: conceptAnswers.expertType || "left",
  };
  const algoExperts = matchExperts(quizAnswers);

  // 2. Merge liked experts to the top, deduped
  const likedExperts = likedExpertIds
    .map(id => {
      const idx = parseInt(id.split("-")[1]);
      return EXPERTS[idx];
    })
    .filter(Boolean);

  const seenNames = new Set<string>();
  const mergedExperts: Expert[] = [];
  for (const e of [...likedExperts, ...algoExperts]) {
    if (!seenNames.has(e.name)) {
      seenNames.add(e.name);
      mergedExperts.push(e);
    }
  }

  // 3. Collect liked lessons
  const likedLessons = LESSONS.filter(l => likedLessonIds.includes(l.id));

  // 4. Collect liked courses
  const likedCourses = COURSES.filter(c => likedCourseIds.includes(c.id));

  // 5. Fill in suggested lessons/courses if user didn't like enough
  const topics = VERTICAL_TO_TOPICS[vertical];
  const topicLessons = LESSONS.filter(l => l.topics.some(t => topics.includes(t)));
  const topicCourses = COURSES.filter(c => c.topics.some(t => topics.includes(t)));

  const allLessons = [...likedLessons];
  const lessonIds = new Set(allLessons.map(l => l.id));
  for (const l of topicLessons) {
    if (allLessons.length >= 4) break;
    if (!lessonIds.has(l.id)) {
      allLessons.push(l);
      lessonIds.add(l.id);
    }
  }

  const allCourses = [...likedCourses];
  const courseIds = new Set(allCourses.map(c => c.id));
  for (const c of topicCourses) {
    if (allCourses.length >= 3) break;
    if (!courseIds.has(c.id)) {
      allCourses.push(c);
      courseIds.add(c.id);
    }
  }

  return {
    experts: mergedExperts.slice(0, 5),
    lessons: allLessons.slice(0, 4),
    courses: allCourses.slice(0, 3),
  };
}
