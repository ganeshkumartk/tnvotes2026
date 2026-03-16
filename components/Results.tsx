"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PARTIES, type PartyId } from "@/lib/data";
import { PartyFlagImage } from "./PartyDot";
import * as htmlToImage from "html-to-image";

interface ResultEntry {
  party: (typeof PARTIES)[PartyId];
  score: number;
  pct: number;
}

interface ResultsProps {
  sortedResults: ResultEntry[];
  totalQuestions: number;
  onReset: () => void;
  lang: "en" | "ta";
  expectedParty: PartyId | null;
  history: Array<{ categoryId: string; categoryName: string; optionText: string; partyId: PartyId }>;
}

export function Results({ sortedResults, totalQuestions, onReset, lang, expectedParty, history }: ResultsProps) {
  const isTa = lang === "ta";
  const [animated, setAnimated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const winner = sortedResults[0];
  const second = sortedResults[1];

  const shareText = isTa 
    ? `தேர்வு 2026 கொள்கை விழிப்புணர்வு கருவியில் எனது கொள்கைகள் ${winner?.pct}% ${winner?.party.nameTa} உடன் ஒத்துப்போகிறது. கொள்கைக்கு வாக்களிப்போம். கொடிக்கு அல்ல. https://tnvotes2026.vercel.app`
    : `I used TherVu 2026 — a civic awareness tool. My policy alignment: ${winner?.pct}% with ${winner?.party.name}, ${second?.pct}% with ${second?.party.name}. Vote the policy. Not the flag. https://tnvotes2026.vercel.app`;

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  async function downloadStory() {
    if (!cardRef.current) return;
    try {
      setIsGeneratingImage(true);
      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        quality: 1, 
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
        }
      });
      const link = document.createElement("a");
      link.download = `thervu2026-result.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsGeneratingImage(false);
    }
  }

  const expectedPct = expectedParty 
    ? sortedResults.find((r) => r.party.id === expectedParty)?.pct || 0
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 border-b-2 border-text-primary">
        <button 
          onClick={onReset} 
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/70 hover:text-text-primary transition-colors font-bold"
        >
          ← {isTa ? "மீண்டும் ஆராயுங்கள்" : "Explore again"}
        </button>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary">
          {isTa ? "உங்கள் முடிவுகள்" : "Your Results"}
        </div>
      </header>

      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-primary/50 mb-4">
              {isTa ? "உங்கள் கொள்கை பொருத்தம்" : "Your Ideological Alignment"}
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.9] tracking-[-0.04em] text-text-primary uppercase">
              {isTa ? "முடிவுகள்" : "The Reveal"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-text-primary/10 border border-text-primary/10 mb-16">
            {/* Winner Column */}
            {winner && (
              <div className="lg:col-span-5 bg-bg relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                {/* The Shareable Story Card Container */}
                <div ref={cardRef} className="p-8 h-full flex flex-col bg-bg relative w-full">
                  <div 
                    className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
                    style={{ background: winner.party.gradient }}
                  />
                  
                  <div className="relative z-10 flex-1">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-text-primary/50 mb-6 border-b border-text-primary/10 pb-4 flex justify-between">
                      <span>{isTa ? "மிகப் பொருத்தமான கட்சி" : "Closest Match"}</span>
                      <span>THERVU 2026</span>
                    </div>
                    
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-20 h-14 border border-text-primary/20 overflow-hidden bg-text-primary/5 shrink-0">
                        {winner.party.flagUrl ? (
                          <PartyFlagImage id={winner.party.id} className="w-full h-full" />
                        ) : (
                          <div className="w-full h-full" style={{ background: winner.party.gradient }} />
                        )}
                      </div>
                      <div>
                        <div className="text-4xl font-medium text-text-primary mb-2 uppercase tracking-tight flex items-center gap-3">
                          {isTa ? winner.party.nameTa : winner.party.name}
                        </div>
                        <div className="text-sm text-text-primary/50">{isTa ? winner.party.fullNameTa : winner.party.fullName}</div>
                      </div>
                    </div>

                    {expectedParty && expectedParty !== winner.party.id && (
                      <div className="mt-8 p-4 border border-text-primary/20 bg-text-primary/5 text-text-primary/80 font-light leading-relaxed">
                        <span className="font-mono text-[10px] text-text-primary/50 block mb-2 tracking-widest uppercase">
                          {isTa ? "எதிர்பார்ப்பு vs உண்மை" : "Plot Twist"}
                        </span>
                        {isTa 
                          ? `நீங்கள் ${PARTIES[expectedParty].nameTa} கட்சிக்கு வாக்களிக்க நினைத்தீர்கள் (${expectedPct}% பொருத்தம்), ஆனால் உங்கள் கொள்கைகள் ${winner.party.nameTa} கட்சியுடன் அதிகம் (${winner.pct}%) ஒத்துப்போகின்றன.`
                          : `You thought you aligned with ${PARTIES[expectedParty].name} (${expectedPct}%), but your chosen policies actually align with ${winner.party.name} (${winner.pct}%).`}
                      </div>
                    )}
                    {expectedParty && expectedParty === winner.party.id && (
                      <div className="mt-8 p-4 border border-text-primary/20 bg-text-primary/5 text-text-primary/80 font-light leading-relaxed">
                        <span className="font-mono text-[10px] text-text-primary/50 block mb-2 tracking-widest uppercase">
                          {isTa ? "எதிர்பார்ப்பு பூர்த்தி" : "Spot On"}
                        </span>
                        {isTa 
                          ? `நீங்கள் நினைத்தபடியே உங்கள் கொள்கைகள் ${winner.party.nameTa} கட்சியுடன் சரியாக ஒத்துப்போகின்றன.`
                          : `Your instinct was right! Your chosen policies heavily align with your expected party, ${winner.party.name}.`}
                      </div>
                    )}

                  </div>

                  <div className="relative z-10 flex justify-between items-end border-t border-text-primary/10 pt-6 mt-8">
                    <div className="font-mono text-[10px] text-text-primary/40 uppercase tracking-widest">
                      {isTa ? winner.party.alliance : winner.party.alliance}
                    </div>
                    <div className="text-6xl font-light tracking-tighter">
                      {winner.pct}<span className="text-2xl text-text-primary/40">%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Column */}
            <div className="lg:col-span-7 bg-bg p-8 flex flex-col">
              <div className="font-mono text-[10px] tracking-widest uppercase text-text-primary/50 mb-8 border-b border-text-primary/10 pb-4">
                {isTa ? "முழுமையான தரவுகள்" : "Full Breakdown"}
              </div>

              <div className="flex flex-col gap-6 flex-1 justify-center">
                {sortedResults.map((r, i) => (
                  <div key={r.party.id} className="group">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-[10px] text-text-primary/30 uppercase tracking-widest w-6">
                          0{i + 1}
                        </div>
                        <div className="text-lg font-medium text-text-primary uppercase tracking-wide flex items-center gap-3">
                          {isTa ? r.party.nameTa : r.party.name}
                          {r.party.id === expectedParty && (
                            <span className="text-[9px] bg-text-primary/10 px-1.5 py-0.5 font-mono text-text-primary/70 tracking-widest">
                              {isTa ? "உங்கள் தேர்வு" : "EXPECTED"}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="font-mono text-sm">{r.pct}%</div>
                    </div>
                    <div className="h-[2px] bg-text-primary/10 w-full relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: animated ? `${r.pct}%` : 0 }}
                        transition={{
                          delay: 0.2 + i * 0.1,
                          duration: 1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ background: r.party.gradient }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Matter / Detailed Breakdown */}
          <div className="bg-bg border border-text-primary/10 p-8 mb-16">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-primary/50 mb-8 border-b border-text-primary/10 pb-4">
              {isTa ? "உங்கள் தேர்வுகள் (விவரம்)" : "The Matter (Your Selections)"}
            </div>
            <div className="flex flex-col gap-8">
              {history.map((h, i) => {
                const party = PARTIES[h.partyId];
                return (
                  <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                    <div className="md:w-1/4 shrink-0">
                      <div className="font-mono text-[10px] text-text-primary/40 uppercase tracking-widest mb-1">
                        {h.categoryName}
                      </div>
                      <div className="flex items-center gap-3">
                        <PartyFlagImage id={party.id} className="w-6 h-4 border border-text-primary/20" />
                        <span className="text-sm font-medium text-text-primary">
                          {isTa ? party.nameTa : party.name}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-text-primary/80 text-sm md:text-base font-light leading-relaxed">
                        &quot;{h.optionText}&quot;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-text-primary/10 pt-8 items-start">
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-text-primary/50 mb-4">
                {isTa ? "முடிவுகளை பகிர" : "Share Your Result"}
              </div>
              <div className="flex flex-wrap gap-4">
                {/* Download Story Button */}
                <button
                  onClick={downloadStory}
                  disabled={isGeneratingImage}
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-text-primary/20 bg-text-primary text-bg hover:bg-text-primary/80 transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  {isGeneratingImage 
                    ? (isTa ? "பதிவிறக்குகிறது..." : "Downloading...") 
                    : (isTa ? "ஸ்டோரியை பதிவிறக்கு" : "Download Story")}
                </button>
                
                {/* WhatsApp Share Button */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-bg transition-colors duration-300 flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.505-.883-.81-1.479-1.811-1.653-2.108-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {isTa ? "வாட்ஸ்அப்" : "WhatsApp"}
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopy}
                  className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-text-primary/20 hover:bg-text-primary hover:text-bg transition-colors duration-300"
                >
                  {copied ? (isTa ? "நகலெடுக்கப்பட்டது!" : "Copied!") : (isTa ? "உரையை நகலெடு" : "Copy Text")}
                </button>
              </div>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-widest text-text-primary/40 leading-relaxed max-w-md md:ml-auto">
              {isTa ? (
                <>
                  இந்த குடிமக்கள் விழிப்புணர்வு கருவி எந்த கட்சிக்கும் ஆதரவானது அல்ல. <br/>
                  தரவுகள் அதிகாரப்பூர்வ தேர்தல் அறிக்கைகளிலிருந்து பெறப்பட்டவை. <br/>
                </>
              ) : (
                <>
                  This civic awareness tool does not endorse any party. <br/>
                  Data is drawn directly from official manifestos and party statements. <br/>
                  Partial data indicates 2026 preliminary announcements.
                </>
              )}
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}