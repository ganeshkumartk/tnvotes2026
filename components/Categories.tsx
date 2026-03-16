"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";

interface CategoriesProps {
  selectedCats: string[];
  onToggle: (id: string) => void;
  onStart: () => void;
  onBack: () => void;
  lang: "en" | "ta";
}

export function Categories({ selectedCats, onToggle, onStart, onBack, lang }: CategoriesProps) {
  const isTa = lang === "ta";
  const canStart = selectedCats.length >= 3;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-text-primary/10">
        <button 
          onClick={onBack} 
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/50 hover:text-text-primary transition-colors"
        >
          ← {isTa ? "பின்செல்" : "Back"}
        </button>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/50">
          {isTa ? "படி 02 · தலைப்புகளை தேர்ந்தெடு" : "Step 02 · Choose topics"}
        </div>
      </header>

      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.9] tracking-[-0.04em] text-text-primary uppercase mb-4">
                {isTa ? "எந்த தலைப்பு உங்களுக்கு முக்கியம்?" : "What matters to you?"}
              </h2>
              <p className="text-text-primary/50 text-lg font-light max-w-md">
                {isTa ? "3 முதல் 5 கொள்கை தலைப்புகளை தேர்ந்தெடுத்து ஒப்பிடுங்கள்." : "Select 3 to 5 policy topics to compare across parties."}
              </p>
            </div>

            <div className="font-mono text-[11px] uppercase tracking-widest text-text-primary/60 p-4 border border-text-primary/10 bg-text-primary/5">
              {selectedCats.length === 0
                ? (isTa ? "0 தேர்ந்தெடுக்கப்பட்டது / 3 தேர்ந்தெடுக்கவும்" : "0 selected / pick 3 to start")
                : selectedCats.length < 3
                ? (isTa ? `${selectedCats.length} தேர்ந்தெடுக்கப்பட்டது / இன்னும் ${3 - selectedCats.length} தேவை` : `${selectedCats.length} selected / pick ${3 - selectedCats.length} more`)
                : (isTa ? `${selectedCats.length} தேர்ந்தெடுக்கப்பட்டது / அதிகபட்சம் 5` : `${selectedCats.length} selected / ${selectedCats.length < 5 ? "max 5 allowed" : "max reached"}`)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-text-primary/10 border border-text-primary/10 mb-16">
            {CATEGORIES.map((cat, i) => {
              const selected = selectedCats.includes(cat.id);
              const disabled = !selected && selectedCats.length >= 5;
              
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
              
              const displayName = isTa ? (taNames[cat.id] || cat.name) : cat.name;

              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  onClick={() => !disabled && onToggle(cat.id)}
                  disabled={disabled}
                  className={`
                    relative text-left p-6 h-48 flex flex-col justify-between transition-all duration-300
                    ${selected
                      ? "bg-text-primary text-bg"
                      : "bg-bg text-text-primary hover:bg-text-primary/5"
                    }
                    ${disabled ? "opacity-20 cursor-not-allowed grayscale" : "cursor-pointer"}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl opacity-80">{cat.icon}</span>
                    <div className={`w-4 h-4 border transition-colors ${selected ? "border-bg bg-bg" : "border-text-primary/30"}`}>
                      {selected && (
                        <svg viewBox="0 0 16 16" className="w-full h-full text-text-primary p-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 8l2.5 2.5 5-5" strokeLinecap="square" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`text-lg font-medium uppercase tracking-tight ${selected ? "text-bg" : "text-text-primary"}`}>
                      {displayName}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-end border-t border-text-primary/10 pt-8">
            <button
              onClick={onStart}
              disabled={!canStart}
              className={`
                shrink-0 group relative inline-flex items-center justify-between gap-6 px-10 py-5 text-sm font-medium transition-all duration-300 uppercase tracking-widest
                ${canStart
                  ? "bg-text-primary text-bg hover:bg-text-primary/90"
                  : "bg-text-primary/5 text-text-primary/30 border border-text-primary/10 cursor-not-allowed"
                }
              `}
            >
              <span>{isTa ? "கொள்கைகளை ஒப்பிடு" : "Compare policies"}</span>
              {canStart && (
                <span className="font-mono text-xs group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
