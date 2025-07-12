"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className={
      [
        "rounded-xl font-extrabold px-5 py-2 text-base shadow-lg transition-all border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50",
        props.className || ""
      ].join(" ")
    }
  />
);

const slides = [
  {
    type: "video",
    content: (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-amber-700 drop-shadow-lg">Watch: Traveling Safely in Vehicles</h2>
        <div className="w-full aspect-video max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-8 border-amber-700 bg-amber-100 flex items-center justify-center" style={{ minHeight: 400 }}>
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
    type: "spot-danger-2",
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
  // For new game
  const [found2, setFound2] = useState({ ball: false, cyclist: false, bus: false, jaywalk: false });
  const [reveal2, setReveal2] = useState(false);
  const [dangerFound2, setDangerFound2] = useState(false);

  // Only allow navigation up to the correct slide based on progress
  let maxAccessibleSlide = 1;
  if (dangerFound && !dangerFound2) maxAccessibleSlide = 2;
  if (dangerFound && dangerFound2) maxAccessibleSlide = slides.length - 1;

  // Redirect to last accessible slide if user tries to access end slide early
  useEffect(() => {
    if (slide === slides.length - 1 && !(dangerFound && dangerFound2)) {
      setSlide(maxAccessibleSlide);
    }
  }, [slide, dangerFound, dangerFound2, maxAccessibleSlide]);

  useEffect(() => {
    if (slide === slides.length - 1 && dangerFound) {
      localStorage.setItem('module-3-complete', 'true');
    }
  }, [slide, dangerFound]);

  useEffect(() => {
    if (Object.values(found2).every(Boolean) || reveal2) {
      setDangerFound2(true);
    }
  }, [found2, reveal2]);

  useEffect(() => {
    if (slide === 1 && (Object.values(found).every(Boolean) || reveal)) {
      setDangerFound(true);
    }
  }, [found, reveal, slide]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Home button top left */}
      <div className="w-full max-w-6xl flex justify-start mb-4">
        <Button onClick={() => router.push('/teacher/home')} className="rounded-xl px-5 py-2 text-base font-extrabold border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50 shadow-lg">
          Home
        </Button>
      </div>
      <div className="w-full max-w-4xl min-h-[600px] bg-amber-50 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center">
        {/* Slider Content */}
        {slide === 0 && slides[0].content}
        {slide === 1 && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-extrabold mb-6 text-amber-700 drop-shadow-lg">Spot the Danger!</h2>
            <p className="mb-8 text-2xl font-bold text-amber-800 text-center">Can you spot what&apos;s wrong in this picture?</p>
            <div className="w-full max-w-3xl bg-gray-200 rounded-3xl p-8 mb-8 flex items-center justify-center relative" style={{ minHeight: 400, minWidth: 400 }}>
              <img src="/busy-street.png" alt="Busy street scene" className="rounded-2xl" style={{ width: 400, height: 550 }} />
              {/* Helmetless rider hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: '47.5%', top: '39%', width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, helmet: true }))}
                tabIndex={0}
                aria-label="Helmetless rider"
              />
              {/* Debug: visible circle for helmetless rider hotspot */}
              {(found.helmet || reveal) && (
                <div
                  className="absolute"
                  style={{ left: '47.5%', top: '39%', width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.helmet || reveal) && (
                <div className="absolute left-[47.5%] top-[32%] bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce z-20" style={{ minWidth: 180 }}>
                  He should wear a helmet.
                </div>
              )}
              {/* Kid running hotspot (pixel-based) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 220, top: 340, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, kid: true }))}
                tabIndex={0}
                aria-label="Kid running"
              />
              {/* Debug: visible circle for kid running hotspot */}
              {(found.kid || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 220, top: 340, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.kid || reveal) && (
                <div className="absolute" style={{ left: 220, top: 300, minWidth: 220 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce z-20">
                    He should walk, not run, and use the crosswalk safely.
                  </div>
                </div>
              )}
              {/* Red signal hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 210, top: 110, width: 50, height: 50, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, signal: true }))}
                tabIndex={0}
                aria-label="Red signal"
              />
              {/* Debug: visible circle for red signal hotspot */}
              {(found.signal || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 210, top: 110, width: 50, height: 50, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.signal || reveal) && (
                <div className="absolute" style={{ left: 210, top: 60, minWidth: 200 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce z-20">
                    You should not cross or drive when the signal is red.
                  </div>
                </div>
              )}
              {/* Pedestrian not using crosswalk hotspot (pixel-based, debug circle) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 495, top: 380, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound(f => ({ ...f, crosswalk: true }))}
                tabIndex={0}
                aria-label="Pedestrian not using crosswalk"
              />
              {/* Debug: visible circle for pedestrian not using crosswalk hotspot */}
              {(found.crosswalk || reveal) && (
                <div
                  className="absolute"
                  style={{ left: 495, top: 380, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found.crosswalk || reveal) && (
                <div className="absolute" style={{ left: 495, top: 460, minWidth: 200 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce z-20">
                    He should use the crosswalk to cross safely.
                  </div> 
                </div>
              )}
            </div>
            <div className="flex gap-6 mt-4">
              <Button
                onClick={() => setReveal(true)}
                className="border-amber-700 text-amber-700 bg-white hover:bg-amber-50 rounded-xl px-5 py-2 text-base font-extrabold shadow-lg"
                disabled={reveal}
              >
                Reveal Answers
              </Button>
              <Button
                onClick={() => {
                  setFound({ helmet: false, kid: false, signal: false, crosswalk: false });
                  setReveal(false);
                }}
                className="border-amber-700 text-amber-700 bg-white hover:bg-amber-50 rounded-xl px-5 py-2 text-base font-extrabold shadow-lg"
              >
                Reset
              </Button>
            </div>
          </div>
        )}
        {slide === 2 && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-extrabold mb-6 text-amber-700 drop-shadow-lg">Spot the Danger! (Part 2)</h2>
            <p className="mb-8 text-2xl font-bold text-amber-800 text-center">Can you spot what&apos;s wrong in this picture?</p>
            <div className="w-full max-w-3xl bg-gray-200 rounded-3xl p-8 mb-8 flex items-center justify-center relative" style={{ minHeight: 400, minWidth: 400 }}>
              <img src="/busy-street-2.png" alt="Busy street scene 2" className="rounded-2xl" style={{ width: '100%', height: 'auto' }} />
              {/* Child chasing ball hotspot (placeholder coords) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 110, top: 250, width: 150, height: 90, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound2(f => ({ ...f, ball: true }))}
                tabIndex={0}
                aria-label="Child chasing ball"
              />
              {/* Debug: visible circle for child chasing ball hotspot */}
              {(found2.ball || reveal2) && (
                <div
                  className="absolute"
                  style={{ left: 110, top: 250, width: 150, height: 90, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found2.ball || reveal2) && (
                <div className="absolute z-30" style={{ left: 40, top: 320, maxWidth: 180 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce whitespace-normal break-words">
                    Never chase a ball onto the road! Always stop and look for traffic.
                  </div>
                </div>
              )}
              {/* Cyclist with headphones hotspot (placeholder coords) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 515, top: 277, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound2(f => ({ ...f, cyclist: true }))}
                tabIndex={0}
                aria-label="Cyclist with headphones"
              />
              {/* Debug: visible circle for cyclist with headphones hotspot */}
              {(found2.cyclist || reveal2) && (
                <div
                  className="absolute"
                  style={{ left: 515, top: 277, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found2.cyclist || reveal2) && (
                <div className="absolute z-30" style={{ left: 570, top: 247, minWidth: 200 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce">
                    Cyclists should never wear headphones—they need to hear traffic around them!
                  </div>
                </div>
              )}
              {/* Child leaning out of bus hotspot (placeholder coords) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 620, top: 120, width: 60, height: 60, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound2(f => ({ ...f, bus: true }))}
                tabIndex={0}
                aria-label="Child leaning out of bus"
              />
              {/* Debug: visible circle for child leaning out of bus hotspot */}
              {(found2.bus || reveal2) && (
                <div
                  className="absolute"
                  style={{ left: 620, top: 120, width: 60, height: 60, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found2.bus || reveal2) && (
                <div className="absolute z-30" style={{ left: 620, top: 60, minWidth: 200 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce">
                    Never lean out of a moving bus window—it&apos;s very dangerous!
                  </div>
                </div>
              )}
              {/* Jaywalking pedestrian hotspot (placeholder coords) */}
              <button
                className="absolute cursor-pointer"
                style={{ left: 355, top: 85, width: 90, height: 180, background: 'transparent', zIndex: 10 }}
                onClick={() => setFound2(f => ({ ...f, jaywalk: true }))}
                tabIndex={0}
                aria-label="Jaywalking pedestrian"
              />
              {/* Debug: visible circle for jaywalking pedestrian hotspot */}
              {(found2.jaywalk || reveal2) && (
                <div
                  className="absolute"
                  style={{ left: 355, top: 85, width: 90, height: 180, background: 'rgba(255,0,0,0.3)', borderRadius: '50%', zIndex: 9, pointerEvents: 'none' }}
                />
              )}
              {(found2.jaywalk || reveal2) && (
                <div className="absolute z-30" style={{ left: 165, top: 55, maxWidth: 180 }}>
                  <div className="bg-white border-2 border-amber-700 rounded-xl px-4 py-2 shadow-lg text-amber-700 font-bold animate-bounce whitespace-normal break-words">
                    Always use the zebra crossing! Jaywalking is unsafe and illegal.
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-6 mt-4">
              <Button
                onClick={() => setReveal2(true)}
                className="border-amber-700 text-amber-700 bg-white hover:bg-amber-50 rounded-xl px-5 py-2 text-base font-extrabold shadow-lg"
                disabled={reveal2}
              >
                Reveal Answers
              </Button>
              <Button
                onClick={() => {
                  setFound2({ ball: false, cyclist: false, bus: false, jaywalk: false });
                  setReveal2(false);
                }}
                className="border-amber-700 text-amber-700 bg-white hover:bg-amber-50 rounded-xl px-5 py-2 text-base font-extrabold shadow-lg"
              >
                Reset
              </Button>
            </div>
            {/* Mark activity complete if all found or revealed */}
          </div>
        )}
        {slide === 3 && dangerFound && dangerFound2 && (
          <div className="flex flex-col items-center w-full justify-center text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-amber-700 drop-shadow-lg text-center">Congratulations! You&apos;ve Completed All Modules!</h2>
            <p className="mb-8 text-2xl font-bold text-amber-800 text-center">You are now a Road Safety Expert!</p>
            <div className="mb-8 flex justify-center">
              <img src="/complete-module.png" alt="Module completion celebration" className="w-64 h-64 object-contain mx-auto" />
            </div>
            <div className="flex justify-between w-full mt-8">
              <Button
                onClick={() => setSlide(s => Math.max(0, s - 1))}
                className="rounded-xl px-5 py-2 text-base font-extrabold border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50 shadow-lg"
              >
                Previous
              </Button>
              <div />
            </div>
          </div>
        )}
        {/* Navigation */}
        {slide === 3 ? null : (
          slide === 0 ? (
            <div className="flex justify-end w-full mt-12">
              <Button
                onClick={() => setSlide(s => Math.min(maxAccessibleSlide, s + 1))}
                disabled={slide === maxAccessibleSlide}
                className="rounded-xl px-5 py-2 text-base font-extrabold border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50 shadow-lg"
              >
                Next
              </Button>
            </div>
          ) : (
            <div className="flex justify-between w-full mt-12">
              <Button
                onClick={() => setSlide(s => Math.max(0, s - 1))}
                disabled={slide === 0}
                className="rounded-xl px-5 py-2 text-base font-extrabold border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50 shadow-lg"
              >
                Previous
              </Button>
              <Button
                onClick={() => setSlide(s => Math.min(maxAccessibleSlide, s + 1))}
                disabled={slide === maxAccessibleSlide}
                className="rounded-xl px-5 py-2 text-base font-extrabold border-2 border-amber-700 text-amber-700 bg-white hover:bg-amber-50 shadow-lg"
              >
                Next
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
} 