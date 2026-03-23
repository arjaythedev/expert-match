"use client";

import { useReducer, useCallback } from "react";
import { BackgroundGrid } from "@/components/landing/BackgroundGrid";
import { VerticalSelect } from "./VerticalSelect";
import { SwipeCard } from "./SwipeCard";
import { EmailGate } from "./EmailGate";
import { ExpertResults } from "./ExpertResults";
import { Vertical, Expert, matchExperts, QuizAnswers } from "@/lib/experts";
import { QUESTIONS } from "@/lib/questions";

type Step = "vertical" | "questions" | "email" | "results";

interface QuizState {
  step: Step;
  vertical: Vertical | null;
  currentQuestionIndex: number;
  answers: Record<string, "left" | "right">;
  email: string;
  experts: Expert[];
}

type QuizAction =
  | { type: "SELECT_VERTICAL"; payload: Vertical }
  | { type: "ANSWER_QUESTION"; payload: { questionId: string; answer: "left" | "right" } }
  | { type: "PREV_QUESTION" }
  | { type: "SUBMIT_EMAIL"; payload: string }
  | { type: "SET_SUBMITTING"; payload: boolean };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_VERTICAL":
      return { ...state, vertical: action.payload, step: "questions", currentQuestionIndex: 0 };

    case "ANSWER_QUESTION": {
      const newAnswers = { ...state.answers, [action.payload.questionId]: action.payload.answer };
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex >= QUESTIONS.length) {
        // All questions answered, compute experts
        const quizAnswers: QuizAnswers = {
          vertical: state.vertical!,
          experience: newAnswers.experience || "left",
          learningStyle: newAnswers.learningStyle || "left",
          workStyle: newAnswers.workStyle || "left",
          careerGoal: newAnswers.careerGoal || "left",
          needType: newAnswers.needType || "left",
          accountability: newAnswers.accountability || "left",
          urgency: newAnswers.urgency || "left",
          commitment: newAnswers.commitment || "left",
          perspective: newAnswers.perspective || "left",
          coachingVibe: newAnswers.coachingVibe || "left",
          expertType: newAnswers.expertType || "left",
        };
        const experts = matchExperts(quizAnswers);
        return { ...state, answers: newAnswers, experts, step: "email" };
      }

      return { ...state, answers: newAnswers, currentQuestionIndex: nextIndex };
    }

    case "PREV_QUESTION": {
      if (state.currentQuestionIndex <= 0) {
        return { ...state, step: "vertical" };
      }
      return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
    }

    case "SUBMIT_EMAIL":
      return { ...state, email: action.payload, step: "results" };

    default:
      return state;
  }
}

const initialState: QuizState = {
  step: "vertical",
  vertical: null,
  currentQuestionIndex: 0,
  answers: {},
  email: "",
  experts: [],
};

export function QuizShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEmailSubmit = useCallback((email: string) => {
    // Simulate a brief loading state then reveal
    dispatch({ type: "SUBMIT_EMAIL", payload: email });
  }, []);

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundGrid />

      {/* Fixed top navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-navy-950 border-b border-navy-700 shadow-[0px_5px_14px_0px_rgba(0,0,0,0.05),0px_2px_6px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
          <a href="/">
            <img src="/maven-logo.svg" alt="Maven" width={147} height={32} className="h-8 w-auto" />
          </a>
        </div>
      </nav>

      {/* Center bordered column */}
      <div className="relative z-10 flex-1 flex items-center justify-center border-l border-r border-navy-700 max-w-[1100px] mx-auto w-full mt-[72px] bg-navy-950">
        <div className="w-full px-4 sm:px-12 py-12">
          {state.step === "vertical" && (
            <VerticalSelect onSelect={(v) => dispatch({ type: "SELECT_VERTICAL", payload: v })} />
          )}

          {state.step === "questions" && currentQuestion && (
            <SwipeCard
              question={currentQuestion}
              questionIndex={state.currentQuestionIndex}
              totalQuestions={QUESTIONS.length}
              onAnswer={(answer) =>
                dispatch({ type: "ANSWER_QUESTION", payload: { questionId: currentQuestion.id, answer } })
              }
              onBack={() => dispatch({ type: "PREV_QUESTION" })}
              canGoBack={true}
            />
          )}

          {state.step === "email" && (
            <EmailGate
              experts={state.experts}
              onSubmit={handleEmailSubmit}
              isSubmitting={false}
            />
          )}

          {state.step === "results" && (
            <ExpertResults experts={state.experts} />
          )}
        </div>
      </div>
    </div>
  );
}
