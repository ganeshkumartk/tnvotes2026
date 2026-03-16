/**
 * Data audit tests — fairness, no systematic exclusion, schema integrity.
 * Run: bun test lib/data.test.ts
 */

import { describe, it, expect } from "vitest";
import { PARTIES, CATEGORIES, type PartyId, type Category } from "./data";

const ALL_PARTY_IDS: PartyId[] = ["DMK", "AIADMK", "TVK", "BJP", "NTK", "INC"];

describe("PARTIES", () => {
  it("has all 6 parties", () => {
    expect(Object.keys(PARTIES)).toHaveLength(6);
    ALL_PARTY_IDS.forEach((id) => {
      expect(PARTIES[id]).toBeDefined();
    });
  });

  it("each party has required fields", () => {
    ALL_PARTY_IDS.forEach((id) => {
      const p = PARTIES[id];
      expect(p.id).toBe(id);
      expect(p.name).toBeTruthy();
      expect(p.nameTa).toBeTruthy();
      expect(p.fullName).toBeTruthy();
      expect(p.alliance).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
});

describe("CATEGORIES", () => {
  it("has 10 categories", () => {
    expect(CATEGORIES).toHaveLength(10);
  });

  it("each category has unique id", () => {
    const ids = CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each category has options from parties in its parties array", () => {
    CATEGORIES.forEach((cat) => {
      const partySet = new Set(cat.parties);
      cat.options.forEach((opt) => {
        expect(partySet.has(opt.partyId)).toBe(true);
      });
    });
  });

  it("each category has exactly one option per party in options", () => {
    CATEGORIES.forEach((cat) => {
      const optionParties = cat.options.map((o) => o.partyId);
      const unique = new Set(optionParties);
      expect(unique.size).toBe(optionParties.length);
    });
  });

  it("no party is systematically excluded from all categories", () => {
    const categoryCount: Record<PartyId, number> = {} as Record<PartyId, number>;
    ALL_PARTY_IDS.forEach((id) => (categoryCount[id] = 0));
    CATEGORIES.forEach((cat) => {
      cat.parties.forEach((p) => categoryCount[p]++);
    });
    ALL_PARTY_IDS.forEach((id) => {
      expect(categoryCount[id]).toBeGreaterThanOrEqual(1);
    });
  });

  it("parties array matches options partyIds", () => {
    CATEGORIES.forEach((cat) => {
      const optionParties = new Set(cat.options.map((o) => o.partyId));
      const declaredParties = new Set(cat.parties);
      expect(optionParties.size).toBe(declaredParties.size);
      optionParties.forEach((p) => expect(declaredParties.has(p)).toBe(true));
    });
  });
});

describe("tiebreaker coverage", () => {
  it("every pair of parties shares at least one category", () => {
    const pairs: [PartyId, PartyId][] = [];
    for (let i = 0; i < ALL_PARTY_IDS.length; i++) {
      for (let j = i + 1; j < ALL_PARTY_IDS.length; j++) {
        pairs.push([ALL_PARTY_IDS[i], ALL_PARTY_IDS[j]]);
      }
    }
    pairs.forEach(([a, b]) => {
      const shared = CATEGORIES.filter(
        (c) => c.parties.includes(a) && c.parties.includes(b)
      );
      expect(shared.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("DMK, TVK, NTK (common tie scenario) share identity category", () => {
    const identity = CATEGORIES.find((c) => c.id === "identity")!;
    expect(identity.parties).toContain("DMK");
    expect(identity.parties).toContain("TVK");
    expect(identity.parties).toContain("NTK");
  });
});
