export interface SwipeQuestion {
  id: string;
  category: string;
  leftLabel: string;
  rightLabel: string;
  phase: "identity" | "preference";
}

export const QUESTIONS: SwipeQuestion[] = [
  // Identity / Where they are (shown first, before mixed cards)
  {
    id: "experience",
    category: "About You",
    leftLabel: "I'm new to my field",
    rightLabel: "I've been doing this for years",
    phase: "identity",
  },
  {
    id: "learningStyle",
    category: "About You",
    leftLabel: "I learn best by watching",
    rightLabel: "I learn best by doing",
    phase: "identity",
  },
  {
    id: "workStyle",
    category: "About You",
    leftLabel: "I work at a company",
    rightLabel: "I'm building something on my own",
    phase: "identity",
  },
  // Preference questions (interleaved with expert/lesson cards)
  {
    id: "careerGoal",
    category: "Your Goals",
    leftLabel: "I want to switch careers",
    rightLabel: "I want to go deeper in my current one",
    phase: "preference",
  },
  {
    id: "needType",
    category: "Your Goals",
    leftLabel: "I need to build a skill",
    rightLabel: "I need a strategy or direction",
    phase: "preference",
  },
  {
    id: "accountability",
    category: "Your Goals",
    leftLabel: "I want accountability",
    rightLabel: "I just want the knowledge",
    phase: "preference",
  },
  {
    id: "urgency",
    category: "Your Pace",
    leftLabel: "I need help right now",
    rightLabel: "I'm planning ahead",
    phase: "preference",
  },
  {
    id: "commitment",
    category: "Your Pace",
    leftLabel: "I can commit 5+ hours a week",
    rightLabel: "I need something flexible",
    phase: "preference",
  },
  {
    id: "perspective",
    category: "Expert Fit",
    leftLabel: "I want someone who's been in my exact shoes",
    rightLabel: "I want someone with a bird's eye view",
    phase: "preference",
  },
  {
    id: "coachingVibe",
    category: "Expert Fit",
    leftLabel: "I want tough love and direct feedback",
    rightLabel: "I want a supportive, collaborative vibe",
    phase: "preference",
  },
  {
    id: "expertType",
    category: "Expert Fit",
    leftLabel: "I want a big name / proven track record",
    rightLabel: "I want an underrated gem who's hands on",
    phase: "preference",
  },
];

export const IDENTITY_QUESTIONS = QUESTIONS.filter(q => q.phase === "identity");
export const PREFERENCE_QUESTIONS = QUESTIONS.filter(q => q.phase === "preference");
