import { Vertical, EXPERTS, Expert } from "./experts";
import { IDENTITY_QUESTIONS, PREFERENCE_QUESTIONS } from "./questions";
import { getForVertical, LightningLesson, Course } from "./recommendations";

export type CardType = "concept" | "expert" | "lesson" | "course";

interface BaseCard {
  id: string;
  cardType: CardType;
}

export interface ConceptCard extends BaseCard {
  cardType: "concept";
  questionId: string;
  category: string;
  leftLabel: string;
  rightLabel: string;
}

export interface ExpertCard extends BaseCard {
  cardType: "expert";
  expertIndex: number;
  name: string;
  title: string;
  imgUrl: string;
  bio: string;
  topics: string[];
}

export interface LessonCard extends BaseCard {
  cardType: "lesson";
  lessonId: string;
  title: string;
  instructorName: string;
  instructorImg: string;
  instructorTitle: string;
  isUpcoming: boolean;
  startDate: string | null;
}

export interface CourseCard extends BaseCard {
  cardType: "course";
  courseId: string;
  name: string;
  instructorName: string;
  url: string;
  cohortDate: string | null;
}

export type DeckCard = ConceptCard | ExpertCard | LessonCard | CourseCard;

function shuffleSeeded<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildDeck(vertical: Vertical): DeckCard[] {
  const deck: DeckCard[] = [];

  // Phase 1: Identity questions (first 3)
  for (const q of IDENTITY_QUESTIONS) {
    deck.push({
      id: `concept-${q.id}`,
      cardType: "concept",
      questionId: q.id,
      category: q.category,
      leftLabel: q.leftLabel,
      rightLabel: q.rightLabel,
    });
  }

  // Get content for this vertical
  const verticalExperts = EXPERTS.filter(e => e.verticals.includes(vertical));
  const { lessons, courses } = getForVertical(vertical);

  // Pick 5 experts, 4 lessons, 3 courses to mix in
  const seed = vertical.charCodeAt(0);
  const selectedExperts = shuffleSeeded(verticalExperts, seed).slice(0, 5);
  const selectedLessons = lessons.slice(0, 4);
  const selectedCourses = courses.slice(0, 3);

  // Build expert cards
  const expertCards: ExpertCard[] = selectedExperts.map((e, i) => ({
    id: `expert-${i}-${e.name.replace(/\s/g, "-")}`,
    cardType: "expert" as const,
    expertIndex: EXPERTS.indexOf(e),
    name: e.name,
    title: e.title,
    imgUrl: e.imgUrl,
    bio: e.bio,
    topics: e.topics,
  }));

  // Build lesson cards
  const lessonCards: LessonCard[] = selectedLessons.map(l => ({
    id: l.id,
    cardType: "lesson" as const,
    lessonId: l.id,
    title: l.title,
    instructorName: l.instructorName,
    instructorImg: l.instructorImg,
    instructorTitle: l.instructorTitle,
    isUpcoming: l.isUpcoming,
    startDate: l.startDate,
  }));

  // Build course cards
  const courseCards: CourseCard[] = selectedCourses.map(c => ({
    id: c.id,
    cardType: "course" as const,
    courseId: c.id,
    name: c.name,
    instructorName: c.instructorName,
    url: c.url,
    cohortDate: c.cohortDate,
  }));

  // Phase 2: Interleave preference questions with content cards
  // Pattern: question, content, question, content, question, content...
  const prefQuestions: ConceptCard[] = PREFERENCE_QUESTIONS.map(q => ({
    id: `concept-${q.id}`,
    cardType: "concept" as const,
    questionId: q.id,
    category: q.category,
    leftLabel: q.leftLabel,
    rightLabel: q.rightLabel,
  }));

  const contentCards: DeckCard[] = [
    ...expertCards,
    ...lessonCards,
    ...courseCards,
  ];
  const shuffledContent = shuffleSeeded(contentCards, seed + 1);

  // Interleave: after every 1 question, insert 1 content card
  let qi = 0;
  let ci = 0;
  while (qi < prefQuestions.length || ci < shuffledContent.length) {
    if (qi < prefQuestions.length) {
      deck.push(prefQuestions[qi]);
      qi++;
    }
    if (ci < shuffledContent.length) {
      deck.push(shuffledContent[ci]);
      ci++;
    }
  }

  return deck;
}
