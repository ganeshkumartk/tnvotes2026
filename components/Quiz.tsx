"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PartyId } from "@/lib/data";

interface QuizOption {
  partyId: PartyId;
  text: string;
  textTa: string;
  partial?: boolean;
}

interface ShuffledCategory {
  id: string;
  name: string;
  icon: string;
  question: string;
  questionTa: string;
  shuffledOptions: QuizOption[];
}

interface QuizProps {
  queue: ShuffledCategory[];
  currentQ: number;
  progress: number;
  onPick: (partyId: PartyId, optionText: string, categoryId: string, categoryName: string) => void;
  lang: "en" | "ta";
  variant?: "normal" | "tiebreaker";
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export function Quiz({ queue, currentQ, progress, onPick, lang, variant = "normal" }: QuizProps) {
  const isTa = lang === "ta";
  const [picked, setPicked] = useState<PartyId | null>(null);
  const q = queue[currentQ];

  if (!q) return null;

  function handlePick(partyId: PartyId, optionText: string, categoryId: string, categoryName: string) {
    if (picked) return;
    setPicked(partyId);
    setTimeout(() => {
      setPicked(null);
      onPick(partyId, optionText, categoryId, categoryName);
    }, 450);
  }

  const taNames: Record<string, string> = {
    welfare: "நலத்திட்டங்கள்",
    education: "கல்வி",
    women: "பெண்கள் உரிமை",
    jobs: "வேலைவாய்ப்பு & பொருளாதாரம்",
    health: "மருத்துவம்",
    farmers: "விவசாயம்",
    governance: "நிர்வாகம்",
    identity: "தமிழ் அடையாளம்"
  };

  const displayName = isTa ? (taNames[q.id] || q.name) : q.name;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Header */}
      <header className="flex justify-between items-center p-6 border-b border-text-primary/10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/50">
          {variant === "tiebreaker"
            ? (isTa ? "இறுதி முடிவு — ஒரு கொள்கை மேலும்" : "Tie-breaker — one more policy to decide")
            : (isTa ? "கொள்கைகளை ஒப்பிடுகிறோம்" : "Comparing policies")}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary">
          {variant === "tiebreaker"
            ? (isTa ? "முடிவு தலைப்பு" : "Deciding topic")
            : (isTa ? `தலைப்பு ${currentQ + 1} / ${queue.length}` : `Topic ${currentQ + 1} of ${queue.length}`)}
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="h-1 bg-text-primary/5 w-full">
        <motion.div
          className="h-full bg-text-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <main className="flex-1 flex flex-col px-6 py-12 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {/* Meta */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-text-primary/20 text-[10px] uppercase tracking-widest font-mono text-text-primary/70 mb-6">
                <span className="text-sm">{q.icon}</span> {displayName}
              </div>
              <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-light text-text-primary leading-[1.1] tracking-[-0.02em] uppercase max-w-3xl">
                {isTa ? q.questionTa : q.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-px bg-text-primary/10 border border-text-primary/10">
              {q.shuffledOptions.map((opt, i) => {
                const isChosen = picked === opt.partyId;
                return (
                  <button
                    key={opt.partyId}
                    onClick={() => handlePick(opt.partyId, isTa ? opt.textTa : opt.text, q.id, displayName)}
                    disabled={!!picked}
                    className={`
                      group relative text-left p-6 sm:p-8 transition-all duration-300 overflow-hidden
                      ${isChosen
                        ? "bg-text-primary text-bg"
                        : picked
                        ? "bg-bg opacity-30 grayscale"
                        : "bg-bg text-text-primary hover:bg-text-primary/5 cursor-pointer"
                      }
                    `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
                      <div className={`font-mono text-[10px] uppercase tracking-widest w-24 shrink-0 ${isChosen ? "text-bg/50" : "text-text-primary/40 group-hover:text-text-primary"}`}>
                        {isTa ? "விருப்பம்" : "Option"} {OPTION_LABELS[i]}
                      </div>
                      <div className="flex-1">
                        <div className={`text-lg sm:text-xl font-light leading-relaxed ${isChosen ? "text-bg" : "text-text-primary/90"}`}>
                          {isTa ? opt.textTa : opt.text}
                        </div>
                        {opt.partial && (
                          <div className={`font-mono text-[9px] uppercase tracking-widest mt-4 flex items-center gap-2 ${isChosen ? "text-bg/50" : "text-text-primary/45"}`}>
                            <span className="w-1.5 h-1.5 bg-current rounded-full" />
                            {isTa ? "சமீபத்திய அறிவிப்பு" : "PARTIAL DATA"}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-12 flex justify-between items-end">
               <p className="font-mono text-[9px] uppercase tracking-widest text-text-primary/40 max-w-sm leading-relaxed">
                 {isTa ? "* விருப்பங்கள் சீரற்றவை. கொள்கை விழிப்புணர்வுக்காக கட்சிப் பெயர்கள் மறைக்கப்பட்டுள்ளன." : "* Options are randomized. Party names are hidden for unbiased policy awareness."}
               </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}