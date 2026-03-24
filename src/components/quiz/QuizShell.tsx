"use client";

import { useReducer } from "react";
import { BackgroundGrid } from "@/components/landing/BackgroundGrid";
import { VerticalSelect } from "./VerticalSelect";
import { SwipeCard } from "./SwipeCard";
import { LearningPlanResults } from "./LearningPlanResults";
import { Vertical } from "@/lib/experts";
import { DeckCard, buildDeck } from "@/lib/card-deck";
import { LearningPlan, computeLearningPlan } from "@/lib/learning-plan";

type Step = "vertical" | "swiping" | "results";

interface QuizState {
  step: Step;
  vertical: Vertical | null;
  deck: DeckCard[];
  currentCardIndex: number;
  conceptAnswers: Record<string, "left" | "right">;
  likedExperts: string[];
  likedLessons: string[];
  likedCourses: string[];
  email: string;
  learningPlan: LearningPlan | null;
}

type QuizAction =
  | { type: "SELECT_VERTICAL"; payload: Vertical }
  | { type: "SWIPE_CARD"; payload: { direction: "left" | "right" } }
  | { type: "PREV_CARD" };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_VERTICAL": {
      const deck = buildDeck(action.payload);
      return {
        ...state,
        vertical: action.payload,
        deck,
        currentCardIndex: 0,
        step: "swiping",
      };
    }

    case "SWIPE_CARD": {
      const card = state.deck[state.currentCardIndex];
      if (!card) return state;

      const dir = action.payload.direction;
      let conceptAnswers = state.conceptAnswers;
      let likedExperts = state.likedExperts;
      let likedLessons = state.likedLessons;
      let likedCourses = state.likedCourses;

      switch (card.cardType) {
        case "concept":
          conceptAnswers = { ...conceptAnswers, [card.questionId]: dir };
          break;
        case "expert":
          if (dir === "right") likedExperts = [...likedExperts, `${card.expertIndex}-${card.name}`];
          break;
        case "lesson":
          if (dir === "right") likedLessons = [...likedLessons, card.lessonId];
          break;
        case "course":
          if (dir === "right") likedCourses = [...likedCourses, card.courseId];
          break;
      }

      const nextIndex = state.currentCardIndex + 1;
      if (nextIndex >= state.deck.length) {
        const plan = computeLearningPlan(
          state.vertical!,
          conceptAnswers,
          likedExperts,
          likedLessons,
          likedCourses,
        );
        // Email is always captured on the landing page
        const storedEmail = typeof window !== "undefined"
          ? sessionStorage.getItem("expert-match-email") || ""
          : "";
        return {
          ...state,
          conceptAnswers,
          likedExperts,
          likedLessons,
          likedCourses,
          learningPlan: plan,
          email: storedEmail,
          step: "results",
        };
      }

      return {
        ...state,
        conceptAnswers,
        likedExperts,
        likedLessons,
        likedCourses,
        currentCardIndex: nextIndex,
      };
    }

    case "PREV_CARD": {
      if (state.currentCardIndex <= 0) {
        return { ...state, step: "vertical" };
      }
      // Remove last answer for the card we're going back from
      const prevIndex = state.currentCardIndex - 1;
      const prevCard = state.deck[prevIndex];
      let conceptAnswers = { ...state.conceptAnswers };
      let likedExperts = [...state.likedExperts];
      let likedLessons = [...state.likedLessons];
      let likedCourses = [...state.likedCourses];

      if (prevCard.cardType === "concept") {
        delete conceptAnswers[prevCard.questionId];
      } else if (prevCard.cardType === "expert") {
        const key = `${prevCard.expertIndex}-${prevCard.name}`;
        likedExperts = likedExperts.filter(id => id !== key);
      } else if (prevCard.cardType === "lesson") {
        likedLessons = likedLessons.filter(id => id !== prevCard.lessonId);
      } else if (prevCard.cardType === "course") {
        likedCourses = likedCourses.filter(id => id !== prevCard.courseId);
      }

      return {
        ...state,
        conceptAnswers,
        likedExperts,
        likedLessons,
        likedCourses,
        currentCardIndex: prevIndex,
      };
    }

    default:
      return state;
  }
}

const initialState: QuizState = {
  step: "vertical",
  vertical: null,
  deck: [],
  currentCardIndex: 0,
  conceptAnswers: {},
  likedExperts: [],
  likedLessons: [],
  likedCourses: [],
  email: "",
  learningPlan: null,
};

export function QuizShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentCard = state.deck[state.currentCardIndex];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundGrid />

      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-navy-950 border-b border-navy-700 shadow-[0px_5px_14px_0px_rgba(0,0,0,0.05),0px_2px_6px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
          <a href="/">
            <img src="/maven-logo.svg" alt="Maven" width={147} height={32} className="h-8 w-auto" />
          </a>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center border-l border-r border-navy-700 max-w-[1100px] mx-auto w-full mt-[72px] bg-navy-950">
        <div className="w-full px-4 sm:px-12 py-12">
          {state.step === "vertical" && (
            <VerticalSelect onSelect={(v) => dispatch({ type: "SELECT_VERTICAL", payload: v })} />
          )}

          {state.step === "swiping" && currentCard && (
            <SwipeCard
              card={currentCard}
              cardIndex={state.currentCardIndex}
              totalCards={state.deck.length}
              onSwipe={(direction) => dispatch({ type: "SWIPE_CARD", payload: { direction } })}
              onBack={() => dispatch({ type: "PREV_CARD" })}
              canGoBack={true}
            />
          )}

          {state.step === "results" && state.learningPlan && (
            <LearningPlanResults learningPlan={state.learningPlan} />
          )}
        </div>
      </div>
    </div>
  );
}
