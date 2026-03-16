"use client";

import { motion } from "framer-motion";
import { PARTIES, type PartyId } from "@/lib/data";
import { ChennaiCollage, ChennaiIcon, LocalPhrase } from "./ChennaiMotifs";

interface LandingProps {
  onNext: () => void;
  lang: "en" | "ta";
  onLangToggle?: (lang: "en" | "ta") => void;
  expectedParty: PartyId | null;
  setExpectedParty: (id: PartyId | null) => void;
}

export function Landing({ onNext, lang, onLangToggle, expectedParty, setExpectedParty }: LandingProps) {
  const isTa = lang === "ta";
  return (
    <div className="min-h-screen flex flex-col selection:bg-text-primary selection:text-bg relative">
      <ChennaiCollage />

      {/* Top Bar — Namma Chennai */}
      <header className="flex justify-between items-center p-6 border-b-2 border-text-primary font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary">
        <div className="font-bold text-sm">{isTa ? "நம்ம வாக்கு" : "NAMMA VOTE"}</div>
        <div className="flex items-center">
          <div className="hidden sm:block">
            <span>{isTa ? "தேர்வு 2026" : "TherVu 2026"}</span>
            <span className="opacity-70 ml-4 mr-4">{isTa ? "தமிழ்நாடு" : "Tamil Nadu"}</span>
          </div>
          {onLangToggle && (
            <div className="flex gap-1 font-mono text-[10px] uppercase tracking-widest border-2 border-text-primary p-0.5 bg-bg/80 font-bold">
              <button 
                onClick={() => onLangToggle("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-text-primary text-bg" : "text-text-primary/50 hover:text-text-primary"}`}
              >
                ENG
              </button>
              <button 
                onClick={() => onLangToggle("ta")}
                className={`px-3 py-1.5 transition-colors ${lang === "ta" ? "bg-text-primary text-bg" : "text-text-primary/50 hover:text-text-primary"}`}
              >
                தமிழ்
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-6 py-12 max-w-5xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* Headline Column */}
          <div className="lg:col-span-8">
            <h1 className="text-text-primary mb-6 uppercase w-full">
              {isTa ? (
                <span className="font-sans text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.2] tracking-normal block break-words">
                  கொள்கைக்கு <br />
                  <span className="font-semibold text-[clamp(2.5rem,5.5vw,5rem)] leading-tight">வாக்களிப்போம்.</span> <br />
                  <span className="text-text-primary/30">கொடிக்கு</span> <br />
                  அல்ல.
                </span>
              ) : (
                <span className="text-[clamp(3.5rem,10vw,8rem)] font-light leading-[0.9] tracking-[-0.04em] block">
                  VOTE THE <br />
                  <span className="font-semibold italic">POLICY.</span> <br />
                  <span className="text-text-primary/30">NOT THE</span> <br />
                  FLAG.
                </span>
              )}
            </h1>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-center pb-4">
            <p className="text-text-primary/80 text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-sm">
              {isTa ? (
                <>
                  குடிமக்கள் விழிப்புணர்வு கருவி. 6 கட்சிகளின் தேர்தல் வாக்குறுதிகள் — பெயர்கள் இன்றி.
                  <br/><br/>
                  கொள்கைகளை ஒப்பிடுங்கள். உங்களுக்கு பிடித்ததை தேர்ந்தெடுங்கள். யார் சொன்னது என்று நாங்கள் கூறுகிறோம்.
                </>
              ) : (
                <>
                  A civic awareness tool. Real manifesto promises from 6 parties — anonymized.
                  <br/><br/>
                  Compare policies. Pick what resonates. We reveal who said it.
                </>
              )}
            </p>

            <div className="mb-8 p-4 border-2 border-text-primary bg-white/50 backdrop-blur-sm">
              <label className="block text-xs uppercase tracking-widest text-text-primary/50 font-mono mb-3">
                {isTa ? "நீங்கள் யாருக்கு வாக்களிக்க திட்டமிட்டுள்ளீர்கள்?" : "Who do you plan to vote for?"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(PARTIES).map((pId) => (
                  <button
                    key={pId}
                    onClick={() => setExpectedParty(expectedParty === pId ? null : (pId as PartyId))}
                    className={`py-2 text-xs font-mono tracking-widest border transition-all duration-200 ${
                      expectedParty === pId 
                        ? "bg-text-primary text-bg border-text-primary" 
                        : "border-text-primary/20 text-text-primary/70 hover:bg-text-primary/10"
                    }`}
                  >
                    {isTa ? PARTIES[pId as PartyId].nameTa : PARTIES[pId as PartyId].name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onNext}
              className="group relative inline-flex w-fit items-center justify-between gap-4 bg-text-primary text-bg px-8 py-5 text-lg font-bold border-2 border-text-primary hover:bg-text-primary/90 transition-colors duration-300"
            >
              <span>{isTa ? "கொள்கைகளை ஆராயுங்கள்" : "Explore policies"}</span>
              <span className="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>

            <div className="mt-8 font-mono text-[10px] text-text-primary/40 uppercase tracking-widest space-y-1">
              <div>{isTa ? "[ 6 கட்சிகள் ]" : "[ 6 PARTIES ]"}</div>
              <div>{isTa ? "[ 10 கொள்கை தலைப்புகள் ]" : "[ 10 POLICY TOPICS ]"}</div>
              <div>{isTa ? "[ 3 நிமிடம் — விழிப்புணர்வு ]" : "[ 3 MIN — AWARENESS ]"}</div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer — Namma Local */}
      <footer className="p-6 border-t-2 border-text-primary flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-text-primary/70">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <span>{isTa ? "© 2026 - நம்ம வாக்கு · குடிமக்கள் விழிப்புணர்வு" : "© 2026 - Namma Vote · Civic Awareness Tool"}</span>
          <a href="/legal" className="hover:text-text-primary transition-colors underline underline-offset-4">
            {isTa ? "சட்டக் கொள்கைகள்" : "Legal & Policies"}
          </a>
        </div>
        <div className="text-right hidden sm:block">{isTa ? "சரிபார்க்கப்பட்ட தரவுகள் மட்டும்" : "Verified data only"}</div>
      </footer>
    </div>
  );
}
