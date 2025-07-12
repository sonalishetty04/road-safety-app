"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className={
      [
        "rounded-xl font-extrabold px-5 py-2 text-base shadow-lg transition-all border-2 border-orange-300 text-orange-700 bg-white hover:bg-orange-50",
        props.className || ""
      ].join(" ")
    }
  />
);

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
  // New poll question 1
  {
    question: "Is it safe to use your phone while walking across the street?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "You should never use your phone while crossing the street. Always pay attention to your surroundings.",
  },
  // New poll question 2
  {
    question: "What should you do if you see a school bus stopped with its stop sign out?",
    options: ["Keep walking", "Wait until the bus moves"],
    correct: "Wait until the bus moves",
    explanation: "Always wait until the school bus moves and it is safe before crossing. Children may be getting on or off the bus.",
  },
];

const slides = [
  {
    type: "video",
    content: (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-orange-700 drop-shadow-lg">Watch: Road Safety Signals</h2>
        <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-orange-300 bg-orange-100 flex items-center justify-center" style={{ minHeight: 400 }}>
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
  // Track if answer slide is being shown for each poll
  const [answerSlides, setAnswerSlides] = useState(
    pollSlides.map(() => false)
  );

  useEffect(() => {
    if (slide > 0 && slide <= pollSlides.length) {
      const pollIdx = slide - 1;
      const question = pollSlides[pollIdx].question;
      // setTypedQuestion(""); // Removed typing animation
      let i = 0;
      const interval = setInterval(() => {
        // setTypedQuestion((prev) => prev + question[i]); // Removed typing animation
        i++;
        if (i >= question.length) clearInterval(interval);
      }, 24);
      return () => clearInterval(interval);
    }
  }, [slide]);

  const allQuizzesRevealed = pollState.every((s) => s.revealed);
  // If not all quizzes are revealed, don't allow access to the end slide
  const maxAccessibleSlide = allQuizzesRevealed ? slides.length - 1 : pollSlides.length;

  useEffect(() => {
    if (slide === slides.length - 1 && allQuizzesRevealed) {
      localStorage.setItem('module-1-complete', 'true');
    }
  }, [slide, allQuizzesRevealed]);

  const handleSelect = (pollIdx: number, option: string) => {
    setPollState((prev) =>
      prev.map((s, i) =>
        i === pollIdx ? { ...s, selected: option } : s
      )
    );
  };

  // When Next is clicked on a poll, show answer slide if not already shown
  const handleNext = () => {
    if (slide > 0 && slide <= pollSlides.length) {
      const pollIdx = slide - 1;
      if (!answerSlides[pollIdx]) {
        // Show answer slide
        setAnswerSlides((prev) => prev.map((a, i) => (i === pollIdx ? true : a)));
        setPollState((prev) => prev.map((s, i) => (i === pollIdx ? { ...s, revealed: true } : s)));
      } else {
        // Go to next poll
        setSlide((s) => s + 1);
      }
    } else {
      setSlide((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (slide > 0) {
      setSlide((s) => s - 1);
    }
  };

  // Button color classes for poll options
  const pollColors = [
    "bg-orange-300 border-orange-400 text-orange-900 hover:bg-orange-400",
    "bg-orange-200 border-orange-300 text-orange-900 hover:bg-orange-300"
  ];

  // Animation CSS
  const pollAnimation =
    "animate-slide-in";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Home button top left */}
      <div className="w-full max-w-5xl flex justify-start mb-4">
        <Button onClick={() => router.push('/teacher/home')}>
   Home
        </Button>
      </div>
      <div className="w-full max-w-5xl bg-orange-100 rounded-3xl shadow-2xl p-12 flex flex-col items-center">
        {/* Slider Content */}
        {slide === 0 && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-extrabold mb-6 text-orange-700 drop-shadow-lg">Watch: Road Safety Signals</h2>
            <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-orange-300 bg-orange-100 flex items-center justify-center" style={{ minHeight: 400 }}>
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
        )}
        {slide > 0 && slide <= pollSlides.length && (() => {
          const pollIdx = slide - 1;
          const poll = pollSlides[pollIdx];
          const { selected, revealed } = pollState[pollIdx];
          const showAnswer = answerSlides[pollIdx];
          // Alternate mascot side
          const mascotLeft = pollIdx % 2 === 0;
          // Is the answer correct?
          const isCorrect = selected === poll.correct;
          if (!showAnswer) {
            // Poll question/options
            return (
              <div key={`poll-${slide}`} className="flex flex-col md:flex-row items-center w-full gap-8 animate-slide-in">
                {mascotLeft && (
                  <div className="flex-1 flex justify-center items-center">
                    <img src="/mascot-left.png" alt="Mascot" className="w-94 h-94 object-contain drop-shadow-xl" />
                  </div>
                )}
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-extrabold mb-6 text-orange-700 drop-shadow-lg">Live Poll</h2>
                  <p className="mb-8 text-2xl font-bold text-gray-800 text-center md:text-left">{poll.question}</p>
                  <div className="flex flex-col gap-6 mb-8 w-full">
                    {poll.options.map((option) => (
                      <Button
                        key={option}
                        onClick={() => handleSelect(pollIdx, option)}
                        className={`rounded-xl px-8 py-3 text-lg font-extrabold border-2 border-orange-300 text-orange-700 bg-white hover:bg-orange-50 shadow-lg transition-all duration-200 flex items-center justify-center w-full ${selected === option ? (option === poll.correct ? 'scale-105 ring-4 ring-orange-200 bg-orange-100 border-orange-400 text-orange-900' : 'scale-105 ring-4 ring-orange-200 bg-orange-50 border-orange-400 text-orange-900') : ''}`}
                        disabled={selected !== null}
                      >
                        {selected === option && (option === poll.correct ? <span className="mr-2 text-2xl">✔️</span> : <span className="mr-2 text-2xl">❌</span>)}
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                {!mascotLeft && (
                  <div className="flex-1 flex justify-center items-center">
                    <img src="/mascot-right.png" alt="Mascot" className="w-94 h-94 object-contain drop-shadow-xl" />
                  </div>
                )}
              </div>
            );
          } else {
            // Answer slide
            return (
              <div key={`answer-${slide}`} className="flex flex-col md:flex-row items-center w-full gap-8 animate-slide-in">
                <div className="flex-1 flex justify-center items-center">
                  <img
                    src={isCorrect ? "/celebrate.png" : "/better_luck.png"}
                    alt={isCorrect ? "Celebrate Mascot" : "Better Luck Mascot"}
                    className="w-94 h-94 object-contain drop-shadow-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <h2 className={`text-3xl font-extrabold mb-6 ${isCorrect ? "text-green-700" : "text-orange-700"} drop-shadow-lg`}>{isCorrect ? "Great Job!" : "Better Luck Next Time!"}</h2>
                  <div className="mb-4 text-2xl font-bold text-gray-800 text-center md:text-left">
                    {isCorrect ? (
                      <>You got it right!<br />{poll.explanation}</>
                    ) : (
                      <>
                        The correct answer was: <span className="font-extrabold text-orange-700">{poll.correct}</span>
                        <br />{poll.explanation}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })()}
        {slide === slides.length - 1 && allQuizzesRevealed && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-extrabold mb-6 text-orange-700 drop-shadow-lg">Hurray! You've completed Module 1!</h2>
            <img src="/complete-module.png" alt="Modules Complete Mascot" className="w-72 h-72 object-contain mb-6 " />
            <p className="mb-8 text-2xl font-bold text-orange-700 text-center">You're on your way to being a Road Safety Star!</p>
        
          </div>
        )}
        {/* Navigation */}
        {slide === 0 ? (
          <div className="flex justify-end w-full mt-12">
            <Button
              onClick={() => setSlide((s) => s + 1)}
              disabled={slide === maxAccessibleSlide}
              className="rounded-xl"
            >
              Next
            </Button>
          </div>
        ) : slide > 0 && slide <= pollSlides.length ? (
          <div className="flex justify-between w-full mt-12">
            <Button
              onClick={handlePrev}
              disabled={slide === 0}
              className="rounded-xl"
            >
              Previous
            </Button>
            {slide === slides.length - 1 && allQuizzesRevealed ? (
              <Button
                onClick={() => router.push('/teacher/module-2')}
                className="rounded-xl"
              >
                Next Module
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={(() => {
                  const pollIdx = slide - 1;
                  const { selected } = pollState[pollIdx];
                  // Only allow Next if an option is selected
                  if (!answerSlides[pollIdx]) return selected === null;
                  return false;
                })()}
                className="rounded-xl"
              >
                Next
              </Button>
            )}
          </div>
        ) : (
          <div className="flex justify-between w-full mt-12">
            <Button
              onClick={handlePrev}
              disabled={slide === 0}
              className="rounded-xl"
            >
              Previous
            </Button>
            {slide === slides.length - 1 && allQuizzesRevealed ? (
              <Button
                onClick={() => router.push('/teacher/module-2')}
                className="rounded-xl"
              >
                Next Module
              </Button>
            ) : (
              <Button
                onClick={() => setSlide((s) => s + 1)}
                disabled={slide === maxAccessibleSlide}
                className="rounded-xl"
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-in {
          animation: slide-in 0.7s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
} 