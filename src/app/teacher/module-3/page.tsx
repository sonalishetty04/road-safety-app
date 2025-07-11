"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FC, ButtonHTMLAttributes } from "react";
let Button: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
try {
  Button = require("@/components/ui/button").Button;
} catch {
  Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} className="rounded-full font-extrabold px-8 py-4 text-lg shadow-lg transition-all" />
  );
}

const slides = [
  {
    type: "video",
    content: (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 drop-shadow-lg">Watch: Traveling Safely in Vehicles</h2>
        <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-yellow-300 bg-yellow-100 flex items-center justify-center" style={{ minHeight: 400 }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/4SrLBcM991E"
            title="Traveling Safely in Vehicles"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full min-h-[400px]"
          ></iframe>
        </div>
      </div>
    ),
  },
  {
    type: "spot-danger",
    content: null, // will be rendered below
  },
  {
    type: "end",
    content: null, // will be rendered below
  },
];

export default function Module3Page() {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  const [dangerFound, setDangerFound] = useState(false);
  const [found, setFound] = useState({ helmet: false, kid: false, signal: false, crosswalk: false });
  const [reveal, setReveal] = useState(false);

  // Only allow end slide if spot danger activity is completed
  const maxAccessibleSlide = dangerFound ? slides.length - 1 : 1;

  // Redirect to last accessible slide if user tries to access end slide early
  useEffect(() => {
    if (slide === slides.length - 1 && !dangerFound) {
      setSlide(maxAccessibleSlide);
    }
  }, [slide, dangerFound, maxAccessibleSlide]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Home button top left */}
      <div className="w-full max-w-6xl flex justify-start mb-4">
        <Button onClick={() => router.push('/teacher/home')} className="bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-full px-6 py-3 text-lg font-bold shadow-md">
          🏠 Home
        </Button>
      </div>
      <div className="w-full max-w-4xl min-h-[600px] bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center">
        {/* Slider Content */}
        {slide === 0 && slides[0].content}
        {slide === 1 && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-extrabold mb-6 text-pink-700 drop-shadow-lg">Spot the Danger!</h2>
            <p className="mb-8 text-2xl font-bold text-gray-800 text-center">Can you spot what&apos;s wrong in this picture?</p>
            <div className="w-full max-w-4xl bg-gray-200 rounded-3xl p-8 mb-8 flex items-center justify-center relative" style={{ minHeight: 400, minWidth: 400 }}>
              <img src="/busy-street.png" alt="Busy street scene" className="rounded-2xl" style={{ width: 400, height: 'auto' }} />
              {/* Helmetless rider hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: '47.5%', top: '41%', width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, helmet: true }))}
                tabIndex={0}
                aria-label="Helmetless rider"
              />
              {/* Debug: visible circle for helmetless rider hotspot */}
              {(found.helmet || reveal) && (
                <div
                  className="absolute"
                  style={{ left: '47.5%', top: '41%', width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.helmet || reveal) && (
                <div className="absolute left-[47.5%] top-[34%] bg-white border-2 border-yellow-400 rounded-xl px-4 py-2 shadow-lg text-yellow-900 font-bold animate-bounce z-20" style={{ minWidth: 180 }}>
                  He should wear a helmet.
                </div>
              )}
              {/* Kid running hotspot (pixel-based) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 290, top: 370, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, kid: true }))}
                tabIndex={0}
                aria-label="Kid running"
              />
              {/* Debug: visible circle for kid running hotspot */}
              {(found.kid || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 290, top: 370, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.kid || reveal) && (
                <div className="absolute" style={{ left: 290, top: 330, minWidth: 220 }}>
                  <div className="bg-white border-2 border-pink-400 rounded-xl px-4 py-2 shadow-lg text-pink-900 font-bold animate-bounce z-20">
                    He should walk, not run, and use the crosswalk safely.
                  </div>
                </div>
              )}
              {/* Red signal hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 270, top: 125, width: 50, height: 50, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, signal: true }))}
                tabIndex={0}
                aria-label="Red signal"
              />
              {/* Debug: visible circle for red signal hotspot */}
              {(found.signal || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 270, top: 125, width: 50, height: 50, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.signal || reveal) && (
                <div className="absolute" style={{ left: 270, top: 75, minWidth: 200 }}>
                  <div className="bg-white border-2 border-red-400 rounded-xl px-4 py-2 shadow-lg text-red-700 font-bold animate-bounce z-20">
                    You should not cross or drive when the signal is red.
                  </div>
                </div>
              )}
              {/* Pedestrian not using crosswalk hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 555, top: 415, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, crosswalk: true }))}
                tabIndex={0}
                aria-label="Pedestrian not using crosswalk"
              />
              {/* Debug: visible circle for pedestrian not using crosswalk hotspot */}
              {(found.crosswalk || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 555, top: 415, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.crosswalk || reveal) && (
                <div className="absolute" style={{ left: 555, top: 495, minWidth: 200 }}>
                  <div className="bg-white border-2 border-blue-400 rounded-xl px-4 py-2 shadow-lg text-blue-900 font-bold animate-bounce z-20">
                    He should use the crosswalk to cross safely.
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-6 mt-4">
              <Button
                onClick={() => setReveal(true)}
                className="bg-yellow-300 border-yellow-400 text-yellow-900 hover:bg-yellow-400 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg"
                disabled={reveal}
              >
                Reveal Answers
              </Button>
              <Button
                onClick={() => {
                  setFound({ helmet: false, kid: false, signal: false, crosswalk: false });
                  setReveal(false);
                }}
                className="bg-pink-200 border-pink-300 text-pink-900 hover:bg-pink-300 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg"
              >
                Reset
              </Button>
            </div>
            {/* Mark activity complete if all found or revealed */}
            {Object.values(found).every(Boolean) || reveal ? (
              <Button
                onClick={() => setDangerFound(true)}
                className="bg-green-300 border-green-400 text-green-900 hover:bg-green-400 rounded-full px-10 py-4 text-xl font-extrabold shadow-lg mt-6"
              >
                Complete Activity
              </Button>
            ) : null}
          </div>
        )}
        {slide === slides.length - 1 && dangerFound && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow-lg">🎉 Great job! You&apos;ve completed Module 3!</h2>
            <p className="mb-8 text-2xl font-bold text-blue-700 text-center">You&apos;re on your way to being a Road Safety Star!</p>
            <Button
              onClick={() => router.push('/teacher/home')}
              className="bg-pink-300 border-pink-400 text-pink-900 hover:bg-pink-400 rounded-full px-12 py-6 text-2xl font-extrabold shadow-lg mt-4"
            >
              Back to Home 🏠
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