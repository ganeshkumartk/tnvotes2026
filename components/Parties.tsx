"use client";

import { motion } from "framer-motion";
import { PARTIES, type PartyId } from "@/lib/data";
import { PartyFlagImage } from "./PartyDot";
import { ChennaiIcon } from "./ChennaiMotifs";

const INDIA_ALLIANCE: PartyId[] = ["DMK", "INC"];
const NDA_ALLIANCE: PartyId[] = ["AIADMK", "BJP"];
const INDEPENDENT: PartyId[] = ["TVK", "NTK"];

function AlliancePartyRow({ id, lang }: { id: PartyId, lang: "en" | "ta" }) {
  const p = PARTIES[id];
  const isTa = lang === "ta";
  return (
    <div className="group flex items-center justify-between py-4 border-b border-text-primary/10 last:border-0 hover:bg-text-primary/5 transition-colors">
      <div className="flex items-center gap-4 px-2">
        <div className="w-10 h-6 border border-text-primary/20 overflow-hidden bg-text-primary/5 relative">
          {p.flagUrl ? (
            <PartyFlagImage id={id} className="w-full h-full" />
          ) : (
            <div className="w-full h-full" style={{ background: p.gradient }} />
          )}
        </div>
        <div className="min-w-0">
          <div className="text-lg font-medium text-text-primary flex items-center gap-2">
            {isTa ? p.nameTa : p.name}
            {p.partial && (
              <span className="text-[10px] bg-text-primary/10 px-1.5 py-0.5 font-mono text-text-primary/70">26'</span>
            )}
          </div>
          <div className="text-[11px] text-text-primary/50 tracking-wide mt-0.5 hidden sm:block">{isTa ? p.fullNameTa : p.fullName}</div>
        </div>
      </div>
    </div>
  );
}

interface PartiesProps {
  onNext: () => void;
  onBack: () => void;
  lang: "en" | "ta";
}

export function Parties({ onNext, onBack, lang }: PartiesProps) {
  const isTa = lang === "ta";
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 border-b-2 border-text-primary">
        <button 
          onClick={onBack} 
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/70 hover:text-text-primary transition-colors font-bold"
        >
          ← {isTa ? "பின்செல்" : "Back"}
        </button>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary">
          <ChennaiIcon name="mtcBus" size={20} />
          {isTa ? "படி 01 · கட்சிகளை ஆராயுங்கள்" : "Step 01 · Explore parties"}
        </div>
      </header>

      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.9] tracking-[-0.04em] text-text-primary uppercase mb-4">
              {isTa ? "2026 தேர்தல் களம்" : "THE 2026 FIELD"}
            </h2>
            <p className="text-text-primary/50 text-lg font-light max-w-xl">
              {isTa 
                ? "இரண்டு கூட்டணிகள் மற்றும் தனித்து போட்டியிடுபவர்கள். வெவ்வேறு பார்வைகள். அதிகாரப்பூர்வ தரவுகள்." 
                : "Two alliances and two independent factions. Different visions. Data audited from public manifestos."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-text-primary/10 border border-text-primary/10 mb-12">
            {/* INDIA Alliance */}
            <div className="bg-bg p-8">
              <div className="flex items-baseline justify-between border-b border-text-primary/10 pb-4 mb-4">
                <div className="text-2xl font-medium uppercase tracking-tight">{isTa ? "இந்தியா கூட்டணி" : "INDIA Alliance"}</div>
                <div className="font-mono text-[10px] text-text-primary/40 uppercase tracking-widest">01</div>
              </div>
              <div className="font-mono text-[10px] text-text-primary/50 mb-6 uppercase tracking-widest">{isTa ? "மதச்சார்பற்ற முற்போக்கு கூட்டணி" : "Secular Progressive Alliance"}</div>
              <div className="flex flex-col">
                {INDIA_ALLIANCE.map((id) => <AlliancePartyRow key={id} id={id} lang={lang} />)}
              </div>
              <p className="font-mono text-[9px] text-text-primary/30 mt-6 uppercase tracking-widest border-t border-text-primary/5 pt-4">+ {isTa ? "காங்கிரஸ், கம்யூனிஸ்ட், விசிக" : "Congress, CPI, CPI(M), VCK"}</p>
            </div>

            {/* NDA Alliance */}
            <div className="bg-bg p-8">
              <div className="flex items-baseline justify-between border-b border-text-primary/10 pb-4 mb-4">
                <div className="text-2xl font-medium uppercase tracking-tight">{isTa ? "தேசிய ஜனநாயக கூட்டணி" : "NDA Alliance"}</div>
                <div className="font-mono text-[10px] text-text-primary/40 uppercase tracking-widest">02</div>
              </div>
              <div className="font-mono text-[10px] text-text-primary/50 mb-6 uppercase tracking-widest">{isTa ? "தேசிய ஜனநாயக கூட்டணி" : "National Democratic Alliance"}</div>
              <div className="flex flex-col">
                {NDA_ALLIANCE.map((id) => <AlliancePartyRow key={id} id={id} lang={lang} />)}
              </div>
              <p className="font-mono text-[9px] text-text-primary/30 mt-6 uppercase tracking-widest border-t border-text-primary/5 pt-4">+ {isTa ? "பாமக, தமாகா, அமமுக" : "PMK, TMC, AMMK"}</p>
            </div>

            {/* Independents */}
            <div className="bg-bg p-8 lg:col-span-2">
              <div className="flex items-baseline justify-between border-b border-text-primary/10 pb-4 mb-4">
                <div className="text-2xl font-medium uppercase tracking-tight">{isTa ? "தனித்து போட்டியிடுபவர்கள்" : "Independents"}</div>
                <div className="font-mono text-[10px] text-text-primary/40 uppercase tracking-widest">03</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                {INDEPENDENT.map((id) => {
                  const p = PARTIES[id];
                  return (
                    <div key={id} className="flex gap-5 group">
                      <div className="w-16 h-10 border border-text-primary/20 overflow-hidden bg-text-primary/5 shrink-0">
                        {p.flagUrl ? (
                          <PartyFlagImage id={id} className="w-full h-full object-cover transition-all duration-500" />
                        ) : (
                          <div className="w-full h-full" style={{ background: p.gradient }} />
                        )}
                      </div>
                      <div>
                        <div className="text-xl font-medium text-text-primary mb-1 flex items-center gap-2">
                          {isTa ? p.nameTa : p.name}
                          {p.partial && <span className="text-[10px] bg-text-primary/10 px-1.5 py-0.5 font-mono text-text-primary/70 mt-1">26'</span>}
                        </div>
                        <div className="text-[11px] text-text-primary/50 leading-snug">{isTa ? p.fullNameTa : p.fullName}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-t border-text-primary/10 pt-8 mt-16 mb-8">
            <div className="font-mono text-[10px] text-text-primary/50 uppercase tracking-wider max-w-xl leading-relaxed">
              <span className="text-text-primary">{isTa ? "குறிப்பு //" : "Note //"}</span> {isTa ? "தரவுகள் அதிகாரப்பூர்வ தேர்தல் அறிக்கைகள் மற்றும் கட்சி அறிவிப்புகளில் இருந்து பெறப்பட்டவை. '26' என்பது சமீபத்திய அறிவிப்புகளை குறிக்கிறது." : "Data sourced from official manifestos and party statements. Partial data indicates recent 2026 announcements."}
            </div>

            <button
              onClick={onNext}
              className="shrink-0 group relative inline-flex items-center justify-between gap-6 bg-text-primary text-bg px-8 py-4 text-sm font-medium hover:bg-text-primary/90 transition-colors duration-300 uppercase tracking-widest"
            >
              <span>{isTa ? "தலைப்புகளை தேர்ந்தெடு" : "Pick Topics"}</span>
              <span className="font-mono text-xs group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
