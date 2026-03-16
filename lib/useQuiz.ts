"use client";

import { useState, useCallback } from "react";
import { CATEGORIES, PARTIES, type PartyId, type Category } from "./data";
import {
  shuffle,
  getTiedParties,
  findTiebreakerCategory,
  applyPick,
  computePct,
  computeTotalQuestions,
  filterOptionsByParties,
} from "./quizLogic";

export type Screen = "landing" | "parties" | "categories" | "quiz" | "tiebreaker" | "results";
export type Language = "en" | "ta";

interface ShuffledCategory extends Category {
  shuffledOptions: Array<{ partyId: PartyId; text: string; textTa: string; partial?: boolean }>;
}

export type Scores = Record<PartyId, number>;

export interface QuizHistoryItem {
  categoryId: string;
  categoryName: string;
  optionText: string;
  partyId: PartyId;
}

export function useQuiz() {
  const [lang, setLang] = useState<Language>("en");
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [queue, setQueue] = useState<ShuffledCategory[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({
    DMK: 0, AIADMK: 0, TVK: 0, BJP: 0, NTK: 0, INC: 0,
  });
  const [expectedParty, setExpectedParty] = useState<PartyId | null>(null);
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [tiebreakerQuestion, setTiebreakerQuestion] = useState<ShuffledCategory | null>(null);
  const [usedTiebreaker, setUsedTiebreaker] = useState(false);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleCat = useCallback((id: string) => {
    setSelectedCats((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }, []);

  const startQuiz = useCallback(() => {
    const q = selectedCats
      .map((id) => CATEGORIES.find((c) => c.id === id)!)
      .map((cat) => ({ ...cat, shuffledOptions: shuffle(cat.options) }));
    setQueue(q);
    setCurrentQ(0);
    setScores({ DMK: 0, AIADMK: 0, TVK: 0, BJP: 0, NTK: 0, INC: 0 });
    setHistory([]);
    goTo("quiz");
  }, [selectedCats, goTo]);

  const pickOption = useCallback(
    (partyId: PartyId, optionText: string, categoryId: string, categoryName: string) => {
      const newScores = applyPick(partyId, scores);
      setScores(newScores);
      setHistory((prev) => [...prev, { categoryId, categoryName, optionText, partyId }]);
      setTimeout(() => {
        if (currentQ + 1 >= queue.length) {
          const tiedParties = getTiedParties(newScores);
          const tbCat = findTiebreakerCategory(tiedParties, selectedCats, CATEGORIES);
          if (tbCat) {
            const tiedOptions = filterOptionsByParties(tbCat.options, tiedParties);
            setTiebreakerQuestion({
              ...tbCat,
              shuffledOptions: shuffle(tiedOptions),
            });
            goTo("tiebreaker");
            return;
          }
          goTo("results");
        } else {
          setCurrentQ((q) => q + 1);
        }
      }, 350);
    },
    [currentQ, queue.length, selectedCats, scores, goTo]
  );

  const pickTiebreaker = useCallback(
    (partyId: PartyId, optionText: string, categoryId: string, categoryName: string) => {
      setScores((prev) => ({ ...prev, [partyId]: prev[partyId] + 1 }));
      setHistory((prev) => [...prev, { categoryId, categoryName, optionText, partyId }]);
      setUsedTiebreaker(true);
      setTiebreakerQuestion(null);
      setTimeout(() => goTo("results"), 350);
    },
    [goTo]
  );

  const reset = useCallback(() => {
    setSelectedCats([]);
    setScores({ DMK: 0, AIADMK: 0, TVK: 0, BJP: 0, NTK: 0, INC: 0 });
    setHistory([]);
    setCurrentQ(0);
    setQueue([]);
    setExpectedParty(null);
    setTiebreakerQuestion(null);
    setUsedTiebreaker(false);
    goTo("landing");
  }, [goTo]);

  const totalQuestions = computeTotalQuestions(queue.length, usedTiebreaker);
  const sortedResults = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([id, score]) => ({
      party: PARTIES[id as PartyId],
      score,
      pct: computePct(score, totalQuestions),
    }));

  const progress =
    screen === "quiz" && queue.length > 0
      ? Math.round((currentQ / queue.length) * 100)
      : screen === "tiebreaker"
      ? 100
      : screen === "results"
      ? 100
      : 0;

  return {
    lang,
    setLang,
    screen,
    goTo,
    selectedCats,
    toggleCat,
    startQuiz,
    queue,
    currentQ,
    pickOption,
    pickTiebreaker,
    tiebreakerQuestion,
    scores,
    history,
    sortedResults,
    totalQuestions,
    expectedParty,
    setExpectedParty,
    progress,
    reset,
  };
}
