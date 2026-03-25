"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdmkPromise {
  id: number;
  tamil: string;
  english: string;
}

interface AdmkSection {
  section_number?: number;
  section_heading: string;
  section_heading_tamil?: string;
  section_heading_english?: string;
  promises: AdmkPromise[];
}

interface AdmkManifesto {
  party: string;
  manifesto_year: number;
  manifesto_data: AdmkSection[];
}

interface TopicPolicy {
  source_confidence: string;
  headline: string;
  promises: string[];
  source_gap?: boolean;
}

interface PartyManifestoEntry {
  name: string;
  full_name: string;
  manifesto_year: number;
  manifesto_status: string;
  source: string;
  color: string;
  election_role: string;
  policies: Record<string, TopicPolicy>;
}

interface ManifestoData {
  meta: {
    categories: string[];
    last_updated: string;
  };
  parties: Record<string, PartyManifestoEntry>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: Record<string, { en: string; ta: string }> = {
  welfare_freebies:    { en: "Welfare & Schemes",         ta: "நலத் திட்டங்கள்" },
  education:           { en: "Education",                  ta: "கல்வி" },
  employment_economy:  { en: "Employment & Economy",       ta: "வேலை & பொருளாதாரம்" },
  women:               { en: "Women's Welfare",            ta: "மகளிர் நலன்" },
  agriculture_farmers: { en: "Agriculture",                ta: "விவசாயம்" },
  health:              { en: "Health",                     ta: "சுகாதாரம்" },
  law_order:           { en: "Law & Order",                ta: "சட்டம் & ஒழுங்கு" },
  environment:         { en: "Environment",                ta: "சுற்றுச்சூழல்" },
  governance:          { en: "Governance",                 ta: "நிர்வாகம்" },
  federal_identity:    { en: "Federal & Tamil Identity",   ta: "கூட்டாட்சி & அடையாளம்" },
};

const PARTY_ORDER = ["DMK", "AIADMK", "TVK", "BJP", "INC", "NTK"];

const PARTY_META: Record<string, {
  fullName: string;
  tamilName: string;
  accentColor: string;
  alliance: string;
}> = {
  DMK: {
    fullName: "Dravida Munnetra Kazhagam",
    tamilName: "திராவிட முன்னேற்றக் கழகம்",
    accentColor: "#CC1A1A",
    alliance: "INDIA Alliance",
  },
  AIADMK: {
    fullName: "All India Anna Dravida Munnetra Kazhagam",
    tamilName: "அகில இந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்",
    accentColor: "#111111",
    alliance: "NDA",
  },
  TVK: {
    fullName: "Tamilaga Vettri Kazhagam",
    tamilName: "தமிழக வெற்றிக் கழகம்",
    accentColor: "#8B1010",
    alliance: "Independent",
  },
  BJP: {
    fullName: "Bharatiya Janata Party",
    tamilName: "பாரதீய ஜனதா கட்சி",
    accentColor: "#FF6000",
    alliance: "NDA",
  },
  INC: {
    fullName: "Indian National Congress",
    tamilName: "இந்திய தேசிய காங்கிரஸ்",
    accentColor: "#138808",
    alliance: "INDIA Alliance",
  },
  NTK: {
    fullName: "Nam Tamilar Katchi",
    tamilName: "நாம் தமிழர் கட்சி",
    accentColor: "#CC0000",
    alliance: "Independent",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSectionTitle(s: AdmkSection, lang: "en" | "ta"): string {
  if (lang === "ta") return s.section_heading_tamil ?? s.section_heading;
  return s.section_heading_english ?? s.section_heading;
}

function getSectionCode(s: AdmkSection): string {
  return s.section_number !== undefined ? `§${s.section_number}` : "KEY";
}

// ─── Confidence Badge ─────────────────────────────────────────────────────────

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const level = confidence.startsWith("HIGH")
    ? "HIGH"
    : confidence.startsWith("MED")
    ? "MED"
    : "LOW";
  return (
    <span
      className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 ${
        level === "HIGH"
          ? "bg-text-primary text-bg"
          : level === "MED"
          ? "border border-text-primary/40 text-text-secondary"
          : "border border-red-800/40 text-red-800"
      }`}
    >
      {level} conf.
    </span>
  );
}

// ─── Party Selector Tabs ──────────────────────────────────────────────────────

function PartySelector({
  selected,
  onChange,
  parties,
}: {
  selected: string;
  onChange: (p: string) => void;
  parties: Record<string, PartyManifestoEntry>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PARTY_ORDER.map((p) => {
        const meta = PARTY_META[p];
        const year = parties[p]?.manifesto_year;
        const isNew = year === 2026;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`relative font-mono text-xs uppercase tracking-widest px-4 py-2.5 border-2 transition-all ${
              selected === p
                ? "bg-text-primary text-bg border-text-primary"
                : "bg-bg border-text-primary/30 text-text-primary hover:border-text-primary"
            }`}
          >
            {p}
            {isNew && (
              <span
                className={`ml-1.5 text-[9px] font-mono ${
                  selected === p ? "text-bg/60" : "text-text-muted"
                }`}
              >
                2026
              </span>
            )}
            {meta && selected === p && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: meta.accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── AIADMK Section-by-Section View ──────────────────────────────────────────

function AiadmkView({
  manifesto,
  sectionIdx,
  lang,
  onSectionChange,
}: {
  manifesto: AdmkManifesto;
  sectionIdx: number;
  lang: "en" | "ta";
  onSectionChange: (i: number) => void;
}) {
  const [search, setSearch] = useState("");
  const sections = manifesto.manifesto_data;
  const active = sections[sectionIdx];

  const filteredPromises = useMemo(() => {
    if (!search.trim()) return active.promises;
    const q = search.toLowerCase();
    return active.promises.filter(
      (p) => p.english.toLowerCase().includes(q) || p.tamil.includes(search)
    );
  }, [active.promises, search]);

  const totalPromises = useMemo(
    () => sections.reduce((sum, s) => sum + s.promises.length, 0),
    [sections]
  );

  return (
    <div className="flex flex-col lg:flex-row border-2 border-text-primary">
      {/* Sidebar: section navigator */}
      <aside className="lg:w-72 xl:w-80 shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-text-primary flex flex-col">
        {/* Sidebar header */}
        <div className="bg-text-primary px-4 py-3 shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-bg">
            AIADMK · 2026 · {sections.length} Sections
          </p>
          <p className="font-mono text-[10px] text-bg/60 mt-0.5">
            {totalPromises} total promises
          </p>
        </div>

        {/* Section list — scrollable, max height so it stays viewport-contained */}
        <div className="overflow-y-auto max-h-60 lg:max-h-[calc(100vh-280px)] divide-y divide-text-primary/10">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => onSectionChange(i)}
              className={`w-full text-left px-4 py-3 transition-colors group ${
                i === sectionIdx
                  ? "bg-text-primary text-bg"
                  : "hover:bg-text-primary/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span
                  className={`font-mono text-[9px] uppercase tracking-widest ${
                    i === sectionIdx ? "text-bg/50" : "text-text-muted"
                  }`}
                >
                  {getSectionCode(s)}
                </span>
                <span
                  className={`font-mono text-[9px] px-1.5 py-0.5 tabular-nums ${
                    i === sectionIdx
                      ? "bg-bg/20 text-bg"
                      : "bg-text-primary/8 text-text-muted"
                  }`}
                >
                  {s.promises.length}
                </span>
              </div>
              <p
                className={`text-[13px] font-medium leading-snug ${
                  lang === "ta" ? "leading-relaxed tracking-normal" : ""
                } ${i === sectionIdx ? "text-bg" : "text-text-primary"}`}
              >
                {getSectionTitle(s, lang)}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main: section content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Section header */}
        <div className="border-b-2 border-text-primary px-6 py-5 shrink-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {active.section_number !== undefined
                ? `Section ${active.section_number} of ${sections.length - 1}`
                : "Key Promises"}
            </span>
            <span className="font-mono text-[10px] bg-text-primary text-bg px-2 py-0.5">
              {active.promises.length} promises
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-bold leading-tight ${
              lang === "ta" ? "leading-relaxed tracking-normal" : ""
            }`}
          >
            {getSectionTitle(active, lang)}
          </h2>
          {lang === "ta" && active.section_heading_english && (
            <p className="text-text-muted text-sm mt-1.5">
              {active.section_heading_english}
            </p>
          )}
        </div>

        {/* Search bar */}
        <div className="border-b border-border px-6 py-3 shrink-0">
          <input
            type="text"
            placeholder={
              lang === "ta"
                ? "இந்த பகுதியில் தேடுங்கள்…"
                : "Search promises in this section…"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent font-mono text-sm placeholder:text-text-muted outline-none"
          />
        </div>

        {/* Promises */}
        <div className="overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-340px)]">
          {filteredPromises.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-mono text-sm text-text-muted">
                No matching promises
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredPromises.map((p) => (
                <div
                  key={p.id}
                  className="px-6 py-5 hover:bg-text-primary/3 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-text-muted pt-0.5 tabular-nums min-w-10 shrink-0">
                      #{p.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      {/* Manifesto items: always show Tamil when available (toggle affects headings only). */}
                      {p.tamil && (
                        <p className="text-sm leading-relaxed tracking-normal text-text-primary">
                          {p.tamil}
                        </p>
                      )}
                      {p.english && (
                        <p
                          className={`text-xs text-text-muted mt-2 leading-relaxed ${
                            p.tamil ? "" : "mt-0"
                          }`}
                        >
                          {p.english}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Other Party (Topic Accordion) View ──────────────────────────────────────

function OtherPartyView({
  partyId,
  partyData,
  lang,
}: {
  partyId: string;
  partyData: PartyManifestoEntry;
  lang: "en" | "ta";
}) {
  const [expanded, setExpanded] = useState<string | null>("welfare_freebies");
  const meta = PARTY_META[partyId];

  return (
    <div>
      {/* Party info strip */}
      <div
        className="border-2 border-text-primary p-5 mb-5"
        style={{ borderLeftWidth: "5px", borderLeftColor: meta?.accentColor }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {partyData.election_role} · {meta?.alliance}
            </p>
            <h2 className="text-xl font-bold mt-1">
              {lang === "ta" ? meta?.tamilName : partyData.full_name}
            </h2>
            {lang === "ta" && (
              <p className="text-sm text-text-muted mt-0.5">
                {partyData.full_name}
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Manifesto {partyData.manifesto_year}
            </p>
            <p className="font-mono text-[10px] text-text-muted mt-0.5 max-w-48 text-right">
              {partyData.manifesto_status}
            </p>
          </div>
        </div>
      </div>

      {/* Topic accordion */}
      <div className="border-2 border-text-primary divide-y divide-text-primary/20">
        {Object.entries(CATEGORIES).map(([catId, catLabel]) => {
          const policy = partyData.policies[catId];
          const hasData = policy && !policy.source_gap;
          const isOpen = expanded === catId;

          return (
            <div key={catId}>
              <button
                onClick={() => setExpanded(isOpen ? null : catId)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-text-primary/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted hidden sm:block">
                    {catId.replace(/_/g, " ")}
                  </span>
                  <span className="font-semibold text-sm">
                    {lang === "ta" ? catLabel.ta : catLabel.en}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {hasData ? (
                    <ConfidenceBadge confidence={policy.source_confidence} />
                  ) : (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      No data
                    </span>
                  )}
                  <span className="font-mono text-base text-text-muted ml-1">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-border bg-text-primary/3">
                      {hasData ? (
                        <>
                          <p className="text-sm font-semibold leading-relaxed mb-3 mt-2">
                            {policy.headline}
                          </p>
                          <ul className="space-y-2">
                            {policy.promises.map((promise, i) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="font-mono text-[10px] text-text-muted pt-0.5 tabular-nums min-w-6 shrink-0">
                                  {i + 1}.
                                </span>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                  {promise}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <p className="font-mono text-[9px] text-text-muted mt-4 pt-3 border-t border-border">
                            Source: {partyData.source}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-text-muted italic mt-2">
                          No verified data available for{" "}
                          {partyData.name} on this topic.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Compare View ─────────────────────────────────────────────────────────────

function CompareView({
  data,
  topic,
  onTopicChange,
  lang,
}: {
  data: ManifestoData;
  topic: string;
  onTopicChange: (t: string) => void;
  lang: "en" | "ta";
}) {
  return (
    <div>
      {/* Topic pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {Object.entries(CATEGORIES).map(([catId, catLabel]) => (
          <button
            key={catId}
            onClick={() => onTopicChange(catId)}
            className={`font-mono text-xs uppercase tracking-widest px-3 py-2 border-2 transition-all ${
              topic === catId
                ? "bg-text-primary text-bg border-text-primary"
                : "bg-bg border-text-primary/30 text-text-primary hover:border-text-primary"
            } ${lang === "ta" ? "tracking-normal" : ""}`}
          >
            {lang === "ta" ? catLabel.ta : catLabel.en}
          </button>
        ))}
      </div>

      {/* Topic header */}
      <div className="border-2 border-text-primary px-5 py-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
            Comparing all parties on
          </p>
          <h2 className={`text-2xl font-bold ${lang === "ta" ? "leading-relaxed tracking-normal" : ""}`}>
            {lang === "ta" ? CATEGORIES[topic]?.ta : CATEGORIES[topic]?.en}
          </h2>
        </div>
        <p className="font-mono text-[10px] text-text-muted">
          Data: {data.meta.last_updated}
        </p>
      </div>

      {/* Party grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PARTY_ORDER.map((partyId) => {
          const partyData = data.parties[partyId];
          if (!partyData) return null;
          const policy = partyData.policies[topic];
          const hasData = policy && !policy.source_gap;
          const meta = PARTY_META[partyId];

          return (
            <div
              key={partyId}
              className="border-2 border-text-primary flex flex-col"
              style={{ borderTopWidth: "4px", borderTopColor: meta?.accentColor }}
            >
              {/* Card header */}
              <div className="px-4 py-3 border-b-2 border-text-primary/20 bg-text-primary/5 flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                    {partyData.election_role}
                  </p>
                  <p className="font-bold text-sm mt-0.5">{partyId}</p>
                  <p className="text-[11px] text-text-muted leading-snug">
                    {partyData.full_name}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-text-muted shrink-0 pt-0.5">
                  {partyData.manifesto_year}
                </span>
              </div>

              {/* Policy body */}
              <div className="px-4 py-4 flex-1">
                {!hasData ? (
                  <p className="text-sm text-text-muted italic">
                    No verified data available for this topic.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <ConfidenceBadge confidence={policy.source_confidence} />
                    </div>
                    <p className="text-sm font-semibold leading-relaxed mb-3">
                      {policy.headline}
                    </p>
                    <ul className="space-y-2">
                      {policy.promises.map((promise, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="font-mono text-text-muted text-[10px] pt-0.5 shrink-0">
                            ·
                          </span>
                          <span className="text-xs text-text-secondary leading-relaxed">
                            {promise}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Source footer */}
              {hasData && (
                <div className="px-4 pb-3 shrink-0">
                  <p className="font-mono text-[8px] text-text-muted border-t border-border pt-2 leading-relaxed">
                    {partyData.source}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManifestoPage() {
  const [admk, setAdmk] = useState<AdmkManifesto | null>(null);
  const [data, setData] = useState<ManifestoData | null>(null);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState<"party" | "compare">("party");
  const [selectedParty, setSelectedParty] = useState("AIADMK");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [topic, setTopic] = useState("welfare_freebies");
  const [lang, setLang] = useState<"en" | "ta">("en");

  useEffect(() => {
    Promise.all([
      fetch("/admk_manifesto_2026.json").then((r) => r.json()),
      fetch("/tn_manifesto_verified.json").then((r) => r.json()),
    ]).then(([admkData, tnData]: [AdmkManifesto, ManifestoData]) => {
      setAdmk(admkData);
      setData(tnData);
      setLoading(false);
    });
  }, []);

  const handlePartyChange = (p: string) => {
    setSelectedParty(p);
    setSectionIdx(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted animate-pulse">
            Loading manifesto data…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Sticky top bar */}
      <div className="border-b-2 border-text-primary px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 bg-bg/95 backdrop-blur-sm z-40">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
        >
          ← தேர்வு 2026
        </Link>
        {/* Language toggle */}
        <div className="flex gap-0 font-mono text-[10px] uppercase tracking-widest border-2 border-text-primary p-0.5">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 transition-colors ${
              lang === "en"
                ? "bg-text-primary text-bg"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => setLang("ta")}
            className={`px-3 py-1.5 transition-colors ${
              lang === "ta"
                ? "bg-text-primary text-bg"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Page hero */}
      <div className="border-b-2 border-text-primary px-4 md:px-8 py-10 md:py-14">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">
          Tamil Nadu Assembly Elections 2026
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-3">
          {lang === "ta" ? (
            <>
              தேர்தல்
              <br />
              <span className="text-text-secondary">அறிக்கைகள்</span>
            </>
          ) : (
            <>
              Manifesto
              <br />
              <span className="text-text-secondary">Explorer</span>
            </>
          )}
        </h1>
        <p className="text-text-secondary text-sm md:text-base max-w-lg leading-relaxed">
          {lang === "ta"
            ? "கட்சிகளின் வாக்குறுதிகளை பகுதி வாரியாக படிக்கவும் — அல்லது ஒரே தலைப்பில் அனைத்து கட்சிகளையும் ஒப்பிடவும்."
            : "Read party manifestos section by section — or compare all parties side by side on the same topic."}
        </p>
      </div>

      {/* Mode tabs */}
      <div className="border-b-2 border-text-primary flex">
        {(["party", "compare"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`font-mono text-[11px] uppercase tracking-widest px-6 py-4 border-r border-border transition-colors ${
              mode === m
                ? "bg-text-primary text-bg"
                : "text-text-muted hover:text-text-primary hover:bg-text-primary/5"
            }`}
          >
            {m === "party"
              ? lang === "ta"
                ? "கட்சி வாரியாக"
                : "Browse by Party"
              : lang === "ta"
              ? "தலைப்பு வாரியாக ஒப்பிடு"
              : "Compare by Topic"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {mode === "party" ? (
            <motion.div
              key="party"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {/* Party selector */}
              <div className="mb-6">
                <PartySelector
                  selected={selectedParty}
                  onChange={handlePartyChange}
                  parties={data?.parties ?? {}}
                />
              </div>

              {/* Party info note */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {selectedParty === "AIADMK" ? (
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Full 2026 manifesto — 33 sections, section-by-section
                  </p>
                ) : (
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    Policy positions from verified sources · 10 topics
                  </p>
                )}
              </div>

              {/* View */}
              {selectedParty === "AIADMK" && admk ? (
                <AiadmkView
                  manifesto={admk}
                  sectionIdx={sectionIdx}
                  lang={lang}
                  onSectionChange={setSectionIdx}
                />
              ) : data?.parties[selectedParty] ? (
                <OtherPartyView
                  partyId={selectedParty}
                  partyData={data.parties[selectedParty]}
                  lang={lang}
                />
              ) : (
                <div className="border-2 border-text-primary px-6 py-12 text-center">
                  <p className="font-mono text-sm text-text-muted">
                    No data available for this party
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {data && (
                <CompareView
                  data={data}
                  topic={topic}
                  onTopicChange={setTopic}
                  lang={lang}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-text-primary px-4 md:px-6 py-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            Data last updated: {data?.meta.last_updated ?? "—"}
          </p>
          <p className="font-mono text-[10px] text-text-muted max-w-lg leading-relaxed">
            All promises are sourced from official manifesto documents or
            verified reporting. No AI-generated content.
          </p>
          <Link
            href="/legal"
            className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
          >
            Legal & Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
}
