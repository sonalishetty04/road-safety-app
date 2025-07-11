"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FC, ButtonHTMLAttributes } from "react";
// Remove require/try/catch for Button
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} className="rounded-full font-extrabold px-8 py-4 text-lg shadow-lg transition-all" />
);

// Sequence builder game data with fun icons
const sequenceGames = [
  {
    title: "Arrange: How to Cross the Road",
    cards: [
      { text: "Look both ways", icon: "👀" },
      { text: "Reach zebra crossing", icon: "🚸" },
      { text: "Cross quickly and safely", icon: "🏃‍♂️" },
      { text: "Wait for green signal", icon: "🟢" },
    ],
    correct: [
      { text: "Wait for green signal", icon: "🟢" },
      { text: "Look both ways", icon: "👀" },
      { text: "Reach zebra crossing", icon: "🚸" },
      { text: "Cross quickly and safely", icon: "🏃‍♂️" },
    ],
    explanation: "Always wait for the green signal, look both ways, reach the zebra crossing, and cross quickly and safely!",
  },
  {
    title: "Arrange: Safe Bus Boarding",
    cards: [
      { text: "Wait for bus to stop", icon: "🚌" },
      { text: "Let others get off", icon: "🚶‍♂️" },
      { text: "Board in a line", icon: "👫" },
      { text: "Hold the handrail", icon: "✋" },
    ],
    correct: [
      { text: "Wait for bus to stop", icon: "🚌" },
      { text: "Let others get off", icon: "🚶‍♂️" },
      { text: "Board in a line", icon: "👫" },
      { text: "Hold the handrail", icon: "✋" },
    ],
    explanation: "Wait for the bus to stop, let others get off, board in a line, and hold the handrail for safety!",
  },
  {
    title: "Arrange: Crossing at Night",
    cards: [
      { text: "Wear bright clothes", icon: "🦺" },
      { text: "Find a well-lit crossing", icon: "💡" },
      { text: "Look both ways", icon: "👀" },
      { text: "Cross quickly", icon: "🏃‍♂️" },
    ],
    correct: [
      { text: "Wear bright clothes", icon: "🦺" },
      { text: "Find a well-lit crossing", icon: "💡" },
      { text: "Look both ways", icon: "👀" },
      { text: "Cross quickly", icon: "🏃‍♂️" },
    ],
    explanation: "At night, wear bright clothes, find a well-lit crossing, look both ways, and cross quickly!",
  },
];

const slides = [
  {
    type: "video",
    content: (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 drop-shadow-lg">Watch: How to Cross the Road Safely</h2>
        <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-yellow-300 bg-yellow-100 flex items-center justify-center" style={{ minHeight: 400 }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/DaqR9Oyf1Zw"
            title="How to Cross the Road Safely"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full min-h-[400px]"
          ></iframe>
        </div>
      </div>
    ),
  },
  ...sequenceGames.map((game, idx) => ({
    type: "sequence",
    gameIdx: idx,
    content: null, // rendered below
  })),
  {
    type: "end",
    content: null, // rendered below
  },
];

function shuffle<T>(arr: T[]): T[] {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export default function Module2Page() {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  // For each game, track the current card order, feedback, and if checked
  const [gameState, setGameState] = useState(
    sequenceGames.map(g => ({
      order: shuffle(g.cards),
      checked: false,
      correct: false,
    }))
  );

  // Drag-and-drop logic
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (gameIdx: number, idx: number) => {
    if (draggedIdx === null) return;
    setGameState(prev => prev.map((g, i) => {
      if (i !== gameIdx) return g;
      const newOrder = g.order.slice();
      const [removed] = newOrder.splice(draggedIdx, 1);
      newOrder.splice(idx, 0, removed);
      return { ...g, order: newOrder, checked: false };
    }));
    setDraggedIdx(null);
  };

  const handleCheck = (gameIdx: number) => {
    setGameState(prev => prev.map((g, i) => {
      if (i !== gameIdx) return g;
      const isCorrect = JSON.stringify(g.order) === JSON.stringify(sequenceGames[gameIdx].correct);
      return { ...g, checked: true, correct: isCorrect };
    }));
  };

  const handleReset = (gameIdx: number) => {
    setGameState(prev => prev.map((g, i) => {
      if (i !== gameIdx) return g;
      return { ...g, order: shuffle(sequenceGames[gameIdx].cards), checked: false, correct: false };
    }));
  };

  // Only allow end slide if all games are checked and correct
  const allGamesCorrect = gameState.every(g => g.checked && g.correct);
  const maxAccessibleSlide = allGamesCorrect ? slides.length - 1 : sequenceGames.length;

  // Redirect to last accessible slide if user tries to access end slide early
  useEffect(() => {
    if (slide === slides.length - 1 && !allGamesCorrect) {
      setSlide(maxAccessibleSlide);
    }
  }, [slide, allGamesCorrect, maxAccessibleSlide]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Home button top left */}
      <div className="w-full max-w-5xl flex justify-start mb-4">
        <Button onClick={() => router.push('/teacher/home')} className="bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-full px-6 py-3 text-lg font-bold shadow-md">
          🏠 Home
        </Button>
      </div>
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center">
        {/* Slider Content */}
        {slide === 0 && slides[0].content}
        {slide > 0 && slide <= sequenceGames.length && (() => {
          const gameIdx = slide - 1;
          const game = sequenceGames[gameIdx];
          const { order, checked, correct } = gameState[gameIdx];
          return (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3xl font-extrabold mb-6 text-pink-700 drop-shadow-lg">{game.title}</h2>
              <p className="mb-8 text-2xl font-bold text-gray-800 text-center">Drag and arrange the steps in the correct order!</p>
              <div className="flex flex-row items-center justify-center gap-6 mb-8 w-full">
                {order.map((card, idx) => (
                  <div
                    key={card.text}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(gameIdx, idx)}
                    className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 border-4 border-yellow-400 rounded-full px-12 py-16 text-2xl font-extrabold text-yellow-900 shadow-xl cursor-move select-none transition-all hover:scale-105 w-[280px] h-[160px] flex flex-col items-center justify-center gap-2 relative"
                    style={{ opacity: draggedIdx === idx ? 0.5 : 1 }}
                  >
                    <span className="text-4xl mb-1">{card.icon}</span>
                    <span className="text-lg text-center font-bold text-blue-900 break-words">{card.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mb-4">
                <Button
                  onClick={() => handleCheck(gameIdx)}
                  className="bg-green-300 border-green-400 text-green-900 hover:bg-green-400 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg"
                  disabled={checked}
                >
                  Check Answer
                </Button>
                <Button
                  onClick={() => handleReset(gameIdx)}
                  className="bg-pink-200 border-pink-300 text-pink-900 hover:bg-pink-300 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg"
                >
                  Reset
                </Button>
              </div>
              {checked && (
                <div className="mt-4 text-center">
                  <div className={`text-2xl font-extrabold ${correct ? 'text-green-600' : 'text-red-600'}`}>
                    {correct ? '✅ Correct!' : '❌ Try again!'}
                  </div>
                  <div className="mt-4 text-lg text-gray-700 font-bold bg-yellow-100 rounded-xl p-4 border-2 border-yellow-300">
                    {game.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
        {slide === slides.length - 1 && allGamesCorrect && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow-lg">🎉 Great job! You’ve completed Module 2!</h2>
            <p className="mb-8 text-2xl font-bold text-blue-700 text-center">You’re on your way to being a Road Safety Star!</p>
            <Button
              onClick={() => router.push('/teacher/module-3')}
              className="bg-pink-300 border-pink-400 text-pink-900 hover:bg-pink-400 rounded-full px-12 py-6 text-2xl font-extrabold shadow-lg mt-4"
            >
              Next Module ➡️
            </Button>
          </div>
        )}
        {/* Navigation */}
        <div className="flex justify-between w-full mt-12">
          <Button
            onClick={() => setSlide(s => Math.max(0, s - 1))}
            disabled={slide === 0}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-8 py-4 text-lg font-bold shadow-md"
          >
            Previous
          </Button>
          <Button
            onClick={() => setSlide(s => Math.min(maxAccessibleSlide, s + 1))}
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