/**
 * Audit tests for quiz logic — fairness, bias-free, no loopholes.
 * Run: bun test lib/quizLogic.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  shuffle,
  getTiedParties,
  findTiebreakerCategory,
  applyPick,
  computePct,
  computeTotalQuestions,
  filterOptionsByParties,
} from "./quizLogic";
import { CATEGORIES, type PartyId } from "./data";

describe("shuffle", () => {
  it("preserves all elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  it("preserves length", () => {
    const arr = ["a", "b", "c"];
    expect(shuffle(arr)).toHaveLength(3);
  });

  it("does not mutate original", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("produces different order with deterministic random (not always same)", () => {
    let i = 0;
    const deterministic = () => (i++ % 10) / 10;
    const a = shuffle([1, 2, 3, 4, 5], deterministic);
    const b = shuffle([1, 2, 3, 4, 5], () => 0.5);
    expect(a).not.toEqual([1, 2, 3, 4, 5]);
    expect(b).not.toEqual([1, 2, 3, 4, 5]);
  });

  it("with custom random produces deterministic result", () => {
    const alwaysFirst = () => 0;
    const result = shuffle([1, 2, 3], alwaysFirst);
    expect(result).toEqual([2, 3, 1]);
  });
});

describe("getTiedParties", () => {
  const emptyScores = { DMK: 0, AIADMK: 0, TVK: 0, BJP: 0, NTK: 0, INC: 0 };

  it("returns empty when all scores are 0", () => {
    expect(getTiedParties(emptyScores)).toEqual([]);
  });

  it("returns single party when one has max score", () => {
    expect(getTiedParties({ ...emptyScores, DMK: 2, TVK: 1 })).toEqual(["DMK"]);
  });

  it("returns all tied parties when multiple share max", () => {
    const scores = { ...emptyScores, DMK: 1, TVK: 1, NTK: 1 };
    const tied = getTiedParties(scores);
    expect(tied).toHaveLength(3);
    expect(tied).toContain("DMK");
    expect(tied).toContain("TVK");
    expect(tied).toContain("NTK");
  });

  it("excludes parties with lower scores", () => {
    const scores = { ...emptyScores, DMK: 2, TVK: 2, AIADMK: 1 };
    const tied = getTiedParties(scores);
    expect(tied).toHaveLength(2);
    expect(tied).not.toContain("AIADMK");
  });
});

describe("findTiebreakerCategory", () => {
  it("returns null when fewer than 2 tied parties", () => {
    expect(findTiebreakerCategory(["DMK"], ["welfare"], CATEGORIES)).toBeNull();
  });

  it("returns a category not in selectedCats", () => {
    const cat = findTiebreakerCategory(
      ["DMK", "TVK", "NTK"],
      ["identity", "governance"],
      CATEGORIES
    );
    expect(cat).not.toBeNull();
    expect(["identity", "governance"]).not.toContain(cat!.id);
  });

  it("returns category with options from at least 2 tied parties", () => {
    const cat = findTiebreakerCategory(
      ["DMK", "TVK"],
      ["identity"],
      CATEGORIES
    );
    expect(cat).not.toBeNull();
    const partyIds = new Set(cat!.options.map((o) => o.partyId));
    expect(partyIds.size).toBeGreaterThanOrEqual(2);
    expect(partyIds.has("DMK") || partyIds.has("TVK")).toBe(true);
  });

  it("returns null when no unused category has 2+ tied parties", () => {
    const tied: PartyId[] = ["AIADMK", "NTK"];
    const selectedAllExceptOne = ["welfare", "education", "women", "jobs", "health", "farmers", "governance", "identity", "law_order"];
    const cat = findTiebreakerCategory(tied, selectedAllExceptOne, CATEGORIES);
    expect(cat).toBeNull();
  });
});

describe("applyPick", () => {
  const emptyScores = { DMK: 0, AIADMK: 0, TVK: 0, BJP: 0, NTK: 0, INC: 0 };

  it("increments chosen party by 1", () => {
    const result = applyPick("DMK", emptyScores);
    expect(result.DMK).toBe(1);
    expect(result.AIADMK).toBe(0);
  });

  it("does not mutate original", () => {
    const original = { ...emptyScores, TVK: 2 };
    applyPick("TVK", original);
    expect(original.TVK).toBe(2);
  });

  it("accumulates correctly", () => {
    let scores = { ...emptyScores };
    scores = applyPick("DMK", scores);
    scores = applyPick("DMK", scores);
    scores = applyPick("TVK", scores);
    expect(scores.DMK).toBe(2);
    expect(scores.TVK).toBe(1);
  });
});

describe("computePct", () => {
  it("returns 0 when totalQuestions is 0", () => {
    expect(computePct(5, 0)).toBe(0);
  });

  it("returns 100 when score equals total", () => {
    expect(computePct(3, 3)).toBe(100);
  });

  it("returns 0 when score is 0", () => {
    expect(computePct(0, 5)).toBe(0);
  });

  it("rounds correctly", () => {
    expect(computePct(1, 3)).toBe(33);
    expect(computePct(2, 3)).toBe(67);
  });
});

describe("computeTotalQuestions", () => {
  it("returns queueLength when no tiebreaker", () => {
    expect(computeTotalQuestions(5, false)).toBe(5);
  });

  it("returns queueLength + 1 when tiebreaker used", () => {
    expect(computeTotalQuestions(3, true)).toBe(4);
  });
});

describe("filterOptionsByParties", () => {
  const options = [
    { partyId: "DMK" as PartyId, text: "a", textTa: "அ" },
    { partyId: "TVK" as PartyId, text: "b", textTa: "ஆ" },
    { partyId: "BJP" as PartyId, text: "c", textTa: "இ" },
  ];

  it("returns only options from given parties", () => {
    const result = filterOptionsByParties(options, ["DMK", "TVK"]);
    expect(result).toHaveLength(2);
    expect(result.map((o) => o.partyId)).toEqual(["DMK", "TVK"]);
  });

  it("returns empty when no match", () => {
    expect(filterOptionsByParties(options, ["NTK"])).toEqual([]);
  });

  it("preserves order", () => {
    const result = filterOptionsByParties(options, ["BJP", "DMK"]);
    expect(result[0].partyId).toBe("DMK");
    expect(result[1].partyId).toBe("BJP");
  });
});
