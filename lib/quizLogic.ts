/**
 * Pure quiz logic — auditable, bias-free, testable.
 * No React, no side effects. Used by useQuiz hook.
 */

import type { PartyId } from "./data";
import type { Category, PolicyOption } from "./data";

/** Fisher-Yates shuffle. Uniform distribution. Optional random for deterministic tests. */
export function shuffle<T>(
  arr: T[],
  random: () => number = Math.random
): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Returns party IDs that share the highest score. Empty if no scores. */
export function getTiedParties(scores: Record<PartyId, number>): PartyId[] {
  const entries = Object.entries(scores) as [PartyId, number][];
  if (entries.length === 0) return [];
  const maxScore = Math.max(...entries.map(([, s]) => s));
  if (maxScore <= 0) return [];
  return entries.filter(([, s]) => s === maxScore).map(([id]) => id);
}

/** Finds a category for tiebreaker: unused by user, has options from 2+ tied parties. */
export function findTiebreakerCategory(
  tiedParties: PartyId[],
  selectedCatIds: string[],
  categories: Category[],
  shuffleFn: <T>(arr: T[], random?: () => number) => T[] = shuffle
): Category | null {
  if (tiedParties.length < 2) return null;
  const unused = categories.filter((c) => !selectedCatIds.includes(c.id));
  const shuffled = shuffleFn(unused);
  for (const cat of shuffled) {
    const tiedOptions = cat.options.filter((o) => tiedParties.includes(o.partyId));
    const uniqueParties = new Set(tiedOptions.map((o) => o.partyId));
    if (uniqueParties.size >= 2) return cat;
  }
  return null;
}

/** Apply a pick: returns new scores with +1 for the chosen party. */
export function applyPick(
  partyId: PartyId,
  scores: Record<PartyId, number>
): Record<PartyId, number> {
  return { ...scores, [partyId]: scores[partyId] + 1 };
}

/** Compute percentage (0–100, rounded). */
export function computePct(score: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}

/** Total questions = main queue + 1 if tiebreaker was used. */
export function computeTotalQuestions(
  queueLength: number,
  usedTiebreaker: boolean
): number {
  return queueLength + (usedTiebreaker ? 1 : 0);
}

/** Filter options to only those from given parties. Preserves order. */
export function filterOptionsByParties(
  options: PolicyOption[],
  partyIds: PartyId[]
): PolicyOption[] {
  const set = new Set(partyIds);
  return options.filter((o) => set.has(o.partyId));
}
