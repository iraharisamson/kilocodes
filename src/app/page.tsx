"use client";

import { useState } from "react";

interface Chapter {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const chapters: Chapter[] = [
  { id: "intro", title: "Introduction to Pharmacognosy", desc: "Learn the fundamentals", icon: "📚" },
  { id: "primary", title: "Primary Plant Metabolites", desc: "Essential compounds", icon: "🌿" },
  { id: "secondary", title: "Secondary Plant Metabolites", desc: "Bioactive compounds", icon: "🔬" },
  { id: "natural-drugs", title: "Drugs from Natural Sources", desc: "Medicinal plants", icon: "💊" },
  { id: "techniques", title: "Phytochemistry Techniques", desc: "Methods for studying", icon: "⚗️" },
  { id: "quality", title: "Quality Control of Herbal Drugs", desc: "Ensuring drug quality", icon: "✓" },
];

const quizzes: Record<string, Question[]> = {
  intro: [
    { id: 1, question: "What is Pharmacognosy?", options: ["Study of drugs from natural sources", "Study of chemicals", "Study of pharmacy practice", "Study of medicine"], correct: 0 },
    { id: 2, question: "Which of these is a natural drug source?", options: ["Plants", "Minerals", "Animals", "All of the above"], correct: 3 },
    { id: 3, question: "Pharmacognosy is a branch of:", options: ["Chemistry", "Pharmacy", "Biology", "Medicine"], correct: 1 },
  ],
  primary: [
    { id: 1, question: "What are primary plant metabolites?", options: ["Compounds for plant growth", "Bioactive compounds", "Toxic compounds", "Pigments only"], correct: 0 },
    { id: 2, question: "Which is a primary metabolite?", options: ["Alkaloids", "Carbohydrates", "Terpenes", "Phenolics"], correct: 1 },
  ],
  secondary: [
    { id: 1, question: "Secondary plant metabolites are:", options: ["Essential for survival", "Have ecological functions", "Found in all plants", "Always toxic"], correct: 1 },
    { id: 2, question: "Which is a secondary metabolite?", options: ["Glucose", "Sucrose", "Alkaloids", "Starch"], correct: 2 },
  ],
  "natural-drugs": [
    { id: 1, question: "Morphine is derived from:", options: ["Cinchona", "Opium poppy", "Willow bark", "Foxglove"], correct: 1 },
    { id: 2, question: "Quinine comes from:", options: ["Poppy", "Cinchona bark", "Mint", "Ginseng"], correct: 1 },
  ],
  techniques: [
    { id: 1, question: "Which technique is used to extract plant compounds?", options: ["Chromatography", "Extraction", "Both", "None"], correct: 2 },
    { id: 2, question: "TLC stands for:", options: ["Thin Layer Chromatography", "Total Liquid Chromatography", "Therapeutic Liquid Crystal", "Top Layer Compound"], correct: 0 },
  ],
  quality: [
    { id: 1, question: "Quality control ensures:", options: ["Drug purity", "Drug potency", "Drug safety", "All of the above"], correct: 3 },
    { id: 2, question: "Ash value test measures:", options: ["Organic content", "Inorganic residue", "Water content", "Alcohol content"], correct: 1 },
  ],
};

type AppState = "chapters" | "quiz" | "complete";

export default function Home() {
  const [state, setState] = useState<AppState>("chapters");
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  const questions = currentChapter ? quizzes[currentChapter.id] || [] : [];
  const question = questions[currentQuestion];

  const handleChapterClick = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setState("quiz");
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correct) {
      setXp((x) => x + 10);
      setStreak((s) => s + 1);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      if (currentChapter && !completedChapters.includes(currentChapter.id)) {
        setCompletedChapters((c) => [...c, currentChapter.id]);
      }
      setState("complete");
    }
  };

  const handleBackToChapters = () => {
    setState("chapters");
    setCurrentChapter(null);
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index ? "border-[#58CC02] bg-[#D7F5D7]" : "border-[#E5E5E5] hover:border-[#58CC02]";
    }
    if (index === question.correct) return "border-[#58CC02] bg-[#D7F5D7]";
    if (index === selectedAnswer && index !== question.correct) return "border-[#FF4B4B] bg-[#FFD6D6]";
    return "border-[#E5E5E5] opacity-50";
  };

  if (state === "complete") {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold">← Back</button>
          <div className="flex gap-3.75">
            <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-[32px] text-[#3C3C3C] mb-2">Chapter Complete!</h1>
          <p className="text-[#777] mb-6">You earned 30 XP</p>
          <button
            onClick={handleBackToChapters}
            className="bg-[#58CC02] text-white font-bold py-3 px-8 rounded-xl border-b-4 border-[#46A302] hover:bg-[#65Df0A] transition-colors"
          >
            Continue
          </button>
        </main>
      </>
    );
  }

  if (state === "quiz" && currentChapter && question) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold">← Quit</button>
          <div className="flex-1 mx-4 bg-[#E5E5E5] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#58CC02] h-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-3.75">
            <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-24 px-5 max-w-[600px] mx-auto pb-8">
          <div className="mb-6">
            <span className="text-[#777] text-sm">{currentChapter.title}</span>
            <h2 className="text-2xl text-[#3C3C3C] font-bold mt-1">{question.question}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`border-2 border-[#E5E5E5] rounded-xl p-4 text-left transition-colors ${getOptionStyle(index)}`}
              >
                <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-6">
              <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === question.correct ? "bg-[#D7F5D7] text-[#3C3C3C]" : "bg-[#FFD6D6] text-[#FF4B4B]"}`}>
                <h3 className="font-bold text-lg">
                  {selectedAnswer === question.correct ? "✅ Correct!" : "❌ Not quite!"}
                </h3>
                <p className="text-sm mt-1">
                  {selectedAnswer === question.correct
                    ? "Great job! Keep going!"
                    : `The correct answer is ${String.fromCharCode(65 + question.correct)}.`}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-[#58CC02] text-white font-bold py-3 rounded-xl border-b-4 border-[#46A302] hover:bg-[#65Df0A] transition-colors"
              >
                {currentQuestion < questions.length - 1 ? "Continue" : "Finish"}
              </button>
            </div>
          )}
        </main>
      </>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-xl">PharmaQuest</span>
        </div>
        <div className="flex gap-3.75">
          <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
          <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
          <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
        </div>
      </header>
      <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8">
        <h1 className="text-[32px] text-[#3C3C3C] text-center mb-2.5">Learn Pharmacognosy</h1>
        <p className="text-center text-[#777] mb-7.5">Master the science of natural drugs</p>
        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => handleChapterClick(chapter)}
              className="border-2 border-[#E5E5E5] rounded-2xl p-4 flex items-center gap-4 bg-white cursor-pointer transition-colors hover:border-[#58CC02]"
            >
              <div className="w-[60px] h-[60px] rounded-xl bg-[#D7F5D7] flex items-center justify-center text-[28px]">
                {completedChapters.includes(chapter.id) ? "✅" : chapter.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base text-[#3C3C3C] font-semibold mb-1">{chapter.title}</h3>
                <p className="text-sm text-[#777]">{chapter.desc}</p>
              </div>
              <div className="text-[#58CC02] font-bold">→</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
