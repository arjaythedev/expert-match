export interface SwipeQuestion {
  id: string;
  category: string;
  leftLabel: string;
  rightLabel: string;
}

export const QUESTIONS: SwipeQuestion[] = [
  // Identity / Where they are
  {
    id: "experience",
    category: "Identity",
    leftLabel: "I'm new to my field",
    rightLabel: "I've been doing this for years",
  },
  {
    id: "learningStyle",
    category: "Identity",
    leftLabel: "I learn best by watching",
    rightLabel: "I learn best by doing",
  },
  {
    id: "workStyle",
    category: "Identity",
    leftLabel: "I work at a company",
    rightLabel: "I'm building something on my own",
  },
  // Goal
  {
    id: "careerGoal",
    category: "Goal",
    leftLabel: "I want to switch careers",
    rightLabel: "I want to go deeper in my current one",
  },
  {
    id: "needType",
    category: "Goal",
    leftLabel: "I need to build a skill",
    rightLabel: "I need a strategy or direction",
  },
  {
    id: "accountability",
    category: "Goal",
    leftLabel: "I want accountability",
    rightLabel: "I just want the knowledge",
  },
  // Urgency / Commitment
  {
    id: "urgency",
    category: "Urgency",
    leftLabel: "I need help right now",
    rightLabel: "I'm planning ahead",
  },
  {
    id: "commitment",
    category: "Urgency",
    leftLabel: "I can commit 5+ hours a week",
    rightLabel: "I need something flexible",
  },
  // Expert fit
  {
    id: "perspective",
    category: "Expert Fit",
    leftLabel: "I want someone who's been in my exact shoes",
    rightLabel: "I want someone with a bird's eye view",
  },
  {
    id: "coachingVibe",
    category: "Expert Fit",
    leftLabel: "I want tough love and direct feedback",
    rightLabel: "I want a supportive, collaborative vibe",
  },
  {
    id: "expertType",
    category: "Expert Fit",
    leftLabel: "I want a big name / proven track record",
    rightLabel: "I want an underrated gem who's hands on",
  },
];
