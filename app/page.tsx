"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuiz } from "@/lib/useQuiz";
import { Landing } from "@/components/Landing";
import { Parties } from "@/components/Parties";
import { Categories } from "@/components/Categories";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";

export default function Home() {
  const quiz = useQuiz();

  return (
    <main className="min-h-screen bg-bg text-text-primary selection:bg-text-primary selection:text-bg">
      {/* Global Lang Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 font-mono text-[10px] uppercase tracking-widest border border-text-primary/20 p-1 bg-bg/50 backdrop-blur-md">
        <button 
          onClick={() => quiz.setLang("en")}
          className={`px-3 py-1.5 transition-colors ${quiz.lang === "en" ? "bg-text-primary text-bg" : "text-text-primary/50 hover:text-text-primary"}`}
        >
          ENG
        </button>
        <button 
          onClick={() => quiz.setLang("ta")}
          className={`px-3 py-1.5 transition-colors ${quiz.lang === "ta" ? "bg-text-primary text-bg" : "text-text-primary/50 hover:text-text-primary"}`}
        >
          தமிழ்
        </button>
      </div>

      <AnimatePresence mode="wait">
        {quiz.screen === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Landing 
              onNext={() => quiz.goTo("parties")} 
              lang={quiz.lang} 
              expectedParty={quiz.expectedParty}
              setExpectedParty={quiz.setExpectedParty}
            />
          </motion.div>
        )}
        {quiz.screen === "parties" && (
          <motion.div key="parties" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Parties
              onNext={() => quiz.goTo("categories")}
              onBack={() => quiz.goTo("landing")}
              lang={quiz.lang}
            />
          </motion.div>
        )}
        {quiz.screen === "categories" && (
          <motion.div key="categories" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Categories
              selectedCats={quiz.selectedCats}
              onToggle={quiz.toggleCat}
              onStart={quiz.startQuiz}
              onBack={() => quiz.goTo("parties")}
              lang={quiz.lang}
            />
          </motion.div>
        )}
        {quiz.screen === "quiz" && (
          <motion.div key="quiz" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Quiz
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              queue={quiz.queue as any}
              currentQ={quiz.currentQ}
              progress={quiz.progress}
              onPick={quiz.pickOption}
              lang={quiz.lang}
            />
          </motion.div>
        )}
        {quiz.screen === "tiebreaker" && quiz.tiebreakerQuestion && (
          <motion.div key="tiebreaker" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Quiz
              queue={[quiz.tiebreakerQuestion]}
              currentQ={0}
              progress={100}
              onPick={quiz.pickTiebreaker}
              lang={quiz.lang}
              variant="tiebreaker"
            />
          </motion.div>
        )}
        {quiz.screen === "results" && (
          <motion.div key="results" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Results
              sortedResults={quiz.sortedResults}
              totalQuestions={quiz.totalQuestions}
              onReset={quiz.reset}
              lang={quiz.lang}
              expectedParty={quiz.expectedParty}
              history={quiz.history}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
