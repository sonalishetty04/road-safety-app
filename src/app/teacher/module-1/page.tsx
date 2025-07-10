"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FC, ButtonHTMLAttributes } from "react";
let Button: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
try {
  Button = require("@/components/ui/button").Button;
} catch {
  Button = (props: any) => (
    <button {...props} className="rounded-full font-extrabold px-8 py-4 text-lg shadow-lg transition-all" />
  );
}

const pollSlides = [
  {
    question: "Should you cross on a red pedestrian signal?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "You should never cross on a red pedestrian signal. Wait for the green signal to ensure it is safe to cross.",
  },
  {
    question: "Is it safe to cross the road between parked cars?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Crossing between parked cars is dangerous because drivers may not see you. Always use a crosswalk or zebra crossing.",
  },
  {
    question: "Should you always look both ways before crossing, even at a green signal?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation: "Always look both ways before crossing, even if the signal is green. Sometimes vehicles may not stop in time.",
  },
];

const slides = [
  {
    type: "video",
    content: (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 drop-shadow-lg">Watch: Road Safety Signals</h2>
        <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-yellow-300 bg-yellow-100 flex items-center justify-center" style={{ minHeight: 400 }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/_NeEF1fwT4k"
            title="Road Safety Signals"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full min-h-[400px]"
          ></iframe>
        </div>
      </div>
    ),
  },
  ...pollSlides.map((poll, idx) => ({
    type: "poll",
    pollIdx: idx,
    content: null, // rendered below
  })),
  {
    type: "end",
    content: null, // rendered below
  },
];

export default function Module1Page() {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  // For each poll slide, track selected and revealed state
  const [pollState, setPollState] = useState(
    pollSlides.map(() => ({ selected: null as string | null, revealed: false }))
  );

  const allQuizzesRevealed = pollState.every((s) => s.revealed);
  // If not all quizzes are revealed, don't allow access to the end slide
  const maxAccessibleSlide = allQuizzesRevealed ? slides.length - 1 : pollSlides.length;

  const handleSelect = (pollIdx: number, option: string) => {
    setPollState((prev) =>
      prev.map((s, i) =>
        i === pollIdx ? { ...s, selected: option } : s
      )
    );
  };
  const handleReveal = (pollIdx: number) => {
    setPollState((prev) =>
      prev.map((s, i) =>
        i === pollIdx ? { ...s, revealed: true } : s
      )
    );
  };
  const handleNav = (dir: number) => {
    setSlide((s) => {
      let next = s + dir;
      if (next < 0) next = 0;
      if (next > maxAccessibleSlide) next = maxAccessibleSlide;
      return next;
    });
  };

  // Button color classes for poll options
  const pollColors = [
    "bg-yellow-300 border-yellow-400 text-yellow-900 hover:bg-yellow-400",
    "bg-pink-300 border-pink-400 text-pink-900 hover:bg-pink-400"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Home button top left */}
      <div className="w-full max-w-5xl flex justify-start mb-4">
        <Button onClick={() => router.push('/teacher/home')} className="bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-full px-6 py-3 text-lg font-bold shadow-md">
          🏠 Home
        </Button>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center">
        {/* Slider Content */}
        {slide === 0 && slides[0].content}
        {slide > 0 && slide <= pollSlides.length && (() => {
          const pollIdx = slide - 1;
          const poll = pollSlides[pollIdx];
          const { selected, revealed } = pollState[pollIdx];
          return (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3xl font-extrabold mb-6 text-pink-700 drop-shadow-lg">Live Poll</h2>
              <p className="mb-8 text-2xl font-bold text-gray-800 text-center">{poll.question}</p>
              <div className="flex gap-10 mb-8">
                {poll.options.map((option, idx) => (
                  <Button
                    key={option}
                    onClick={() => handleSelect(pollIdx, option)}
                    className={`rounded-full px-10 py-6 text-2xl font-extrabold border-4 shadow-lg transition-all duration-200 flex items-center justify-center ${pollColors[idx]} ${selected === option ? 'scale-110 ring-4 ring-pink-300 bg-green-200 border-green-400 text-green-900' : ''}`}
                    disabled={revealed}
                  >
                    {selected === option && <span className="mr-2 text-2xl">✔️</span>}
                    {option}
                  </Button>
                ))}
              </div>
              {!revealed && (
                <Button
                  onClick={() => handleReveal(pollIdx)}
                  className="mt-2 bg-green-300 border-green-400 text-green-900 hover:bg-green-400 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg"
                  disabled={selected === null}
                >
                  Reveal Answer
                </Button>
              )}
              {revealed && (
                <div className="mt-6 text-center">
                  <div className={`text-2xl font-extrabold ${selected === poll.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {selected === poll.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div className="mt-4 text-lg text-gray-700 font-bold bg-yellow-100 rounded-xl p-4 border-2 border-yellow-300">
                    {poll.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
        {slide === slides.length - 1 && allQuizzesRevealed && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow-lg">🎉 Great job! You’ve completed Module 1!</h2>
            <p className="mb-8 text-2xl font-bold text-blue-700 text-center">You’re on your way to being a Road Safety Star!</p>
            <Button
              onClick={() => router.push('/teacher/module-2')}
              className="bg-pink-300 border-pink-400 text-pink-900 hover:bg-pink-400 rounded-full px-12 py-6 text-2xl font-extrabold shadow-lg mt-4"
            >
              Next Module ➡️
            </Button>
          </div>
        )}
        {/* Navigation */}
        <div className="flex justify-between w-full mt-12">
          <Button
            onClick={() => handleNav(-1)}
            disabled={slide === 0}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-8 py-4 text-lg font-bold shadow-md"
          >
            Previous
          </Button>
          <Button
            onClick={() => handleNav(1)}
            disabled={slide === maxAccessibleSlide}
            className="bg-blue-200 text-blue-900 hover:bg-blue-300 rounded-full px-8 py-4 text-lg font-bold shadow-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 