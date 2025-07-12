"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

const rewardBadges = [
  "/reward-1.png",
  "/reward-2.png",
  "/reward-3.png",
];

export default function HomePage() {
  const router = useRouter();
  const modulesRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [completed, setCompleted] = useState([false, false, false]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/teacher/login');
      } else {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    // Check localStorage for module completion
    const checkBadges = () => {
      const c = [
        localStorage.getItem("module-1-complete") === "true",
        localStorage.getItem("module-2-complete") === "true",
        localStorage.getItem("module-3-complete") === "true",
      ];
      setCompleted(c);
    };
    checkBadges();
    // Listen for visibility change (tab focus)
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        checkBadges();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const badgesEarned = completed.filter(Boolean).length;
  const progressPercent = (badgesEarned / 3) * 100;

  if (checkingAuth) {
    return null; // or a spinner if you want
  }

  const handleGetStarted = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToModules = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToRewards = () => {
    rewardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/teacher/login');
  };

  // Find the highest completed module index
  const highestCompletedIdx = completed.lastIndexOf(true);

  // SVG badge icon for stepper (star + ribbon)
  const BadgeSVG = (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
      <polygon points="16,8 18,14 24,14 19,17 21,23 16,19.5 11,23 13,17 8,14 14,14" fill="#fff" stroke="#B8860B" strokeWidth="1"/>
      <rect x="12" y="24" width="2.5" height="6" rx="1" fill="#B8860B"/>
      <rect x="17.5" y="24" width="2.5" height="6" rx="1" fill="#B8860B"/>
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] flex flex-col relative overflow-x-hidden">
      {/* Doodle SVG Background - only for rewards and modules sections */}
      {/* Remove from here, add after hero section */}
      {/* Top Navigation Bar */}
      <nav className="flex justify-end items-center w-full px-8 pt-6 pb-2 gap-4 z-20">
        <div className="flex gap-2 md:gap-4 items-center bg-white/80 rounded-full shadow-md px-4 py-2">
          <button
            onClick={handleScrollToModules}
            className="text-base md:text-lg font-bold text-blue-600 hover:bg-blue-100 rounded-full px-4 py-2 transition-colors"
          >
            Modules
          </button>
          <button
            onClick={handleScrollToRewards}
            className="text-base md:text-lg font-bold text-yellow-600 hover:bg-yellow-100 rounded-full px-4 py-2 transition-colors"
          >
            Rewards
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-6 py-2 shadow-lg text-base md:text-lg transition-all border-2 border-orange-300"
        >
          Logout
        </button>
      </nav>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between mx-auto py-16 px-20 gap-8 w-full ">
  
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <span className="text-lg font-semibold text-gray-500 mb-2">Hey there!</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Welcome to the Kids Road Safety App
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn road safety the fun way! Explore interactive modules, games, and quizzes designed just for you. Stay safe, earn rewards, and become a Road Safety Star!
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-xl px-8 py-4 shadow-lg transition-all"
          >
          Let&apos;s Get Started
          </button>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/illustration-home.png"
            alt="Kids Road Safety Illustration"
            width={500}
            height={500}
            className="w-full max-w-3xl h-auto"
            priority
          />
        </div>
      </section>
      {/* Enhanced big floating blobs background for rewards/modules (not hero) */}
      <div className="absolute w-full left-0 right-0 z-0 pointer-events-none" style={{top: 'calc(100vh * 0.7)', height: '180vh'}} aria-hidden="true">
        {/* Blob 1 - Top Left (moved further down) */}
        <svg width="700" height="480" viewBox="0 0 700 480" fill="none" style={{position: 'absolute', left: '-140px', top: '18vh', opacity: 0.38, zIndex: 0, animation: 'blobFloat1 18s ease-in-out infinite alternate'}}>
          <path d="M350,80 Q490,10 660,180 Q620,340 480,460 Q320,480 160,380 Q60,240 350,80Z" fill="#ffe29a" />
        </svg>
        {/* Blob 2 - Bottom Right (moved down by 300px) */}
        <svg width="540" height="400" viewBox="0 0 540 400" fill="none" style={{position: 'absolute', right: '-120px', bottom: '-300px', opacity: 0.32, zIndex: 0, animation: 'blobFloat2 22s ease-in-out infinite alternate'}}>
          <path d="M270,80 Q390,0 520,180 Q480,340 340,380 Q180,400 60,260 Q0,160 270,80Z" fill="#ffd6e0" />
        </svg>
        {/* Blob 3 - Center Left (mint) */}
        <svg width="420" height="340" viewBox="0 0 420 340" fill="none" style={{position: 'absolute', left: '12vw', top: '32vh', opacity: 0.36, zIndex: 0, animation: 'blobFloat3 20s ease-in-out infinite alternate'}}>
          <path d="M210,60 Q320,20 380,140 Q360,260 220,320 Q80,340 40,200 Q0,80 210,60Z" fill="#b6f7e3" />
        </svg>
        {/* Blob 4 - Center Right (peach) */}
        <svg width="380" height="320" viewBox="0 0 380 320" fill="none" style={{position: 'absolute', left: '54vw', top: '38vh', opacity: 0.34, zIndex: 0, animation: 'blobFloat4 24s ease-in-out infinite alternate'}}>
          <path d="M190,40 Q300,0 340,120 Q320,240 200,300 Q80,320 40,180 Q0,60 190,40Z" fill="#ffe0b6" />
        </svg>
        {/* Blob 5 - Bottom Center (lavender, moved further up and right) */}
        <svg width="420" height="320" viewBox="0 0 420 320" fill="none" style={{position: 'absolute', left: 'calc(36vw + 100px)', bottom: 'calc(8vh + 200px)', opacity: 0.45, zIndex: 0, animation: 'blobFloat5 28s ease-in-out infinite alternate'}}>
          <path d="M210,60 Q320,20 380,140 Q360,260 220,320 Q80,340 40,200 Q0,80 210,60Z" fill="#e3b6f7" />
        </svg>
        {/* Blob 6 - Right Bottom of rewards (blue, moved further down and right) */}
        <svg width="340" height="260" viewBox="0 0 340 260" fill="none" style={{position: 'absolute', right: '2vw', top: '38vh', opacity: 0.38, zIndex: 0, animation: 'blobFloat6 26s ease-in-out infinite alternate'}}>
          <path d="M170,40 Q260,0 320,100 Q300,200 180,240 Q60,260 20,140 Q0,40 170,40Z" fill="#b6d0f7" />
        </svg>
        {/* Blob 7 - Left Bottom of modules (warm brown, moved further down) */}
        <svg width="320" height="220" viewBox="0 0 320 220" fill="none" style={{position: 'absolute', left: '-7vw', bottom: 'calc(6vh - 200px)', opacity: 0.36, zIndex: 0, animation: 'blobFloat7 30s ease-in-out infinite alternate'}}>
          <path d="M160,40 Q240,0 300,80 Q280,180 160,200 Q40,220 20,120 Q0,40 160,40Z" fill="#b97a56" />
        </svg>
        <style>{`
          @keyframes blobFloat1 {
            0% { transform: translateY(0) scale(1) rotate(-2deg); }
            50% { transform: translateY(-40px) scale(1.06) rotate(2deg); }
            100% { transform: translateY(0) scale(1) rotate(-2deg); }
          }
          @keyframes blobFloat2 {
            0% { transform: translateY(0) scale(1) rotate(1deg); }
            50% { transform: translateY(-36px) scale(1.04) rotate(-2deg); }
            100% { transform: translateY(0) scale(1) rotate(1deg); }
          }
          @keyframes blobFloat3 {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-48px) scale(1.08) rotate(3deg); }
            100% { transform: translateY(0) scale(1) rotate(0deg); }
          }
          @keyframes blobFloat4 {
            0% { transform: translateY(0) scale(1) rotate(-1deg); }
            50% { transform: translateY(-32px) scale(1.05) rotate(2deg); }
            100% { transform: translateY(0) scale(1) rotate(-1deg); }
          }
          @keyframes blobFloat5 {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-60px) scale(1.09) rotate(-2deg); }
            100% { transform: translateY(0) scale(1) rotate(0deg); }
          }
          @keyframes blobFloat6 {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-28px) scale(1.07) rotate(2deg); }
            100% { transform: translateY(0) scale(1) rotate(0deg); }
          }
          @keyframes blobFloat7 {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-32px) scale(1.08) rotate(-2deg); }
            100% { transform: translateY(0) scale(1) rotate(0deg); }
          }
        `}</style>
      </div>
      <section ref={rewardsRef} className="w-full flex justify-center py-10 px-20">
        <div className="w-full max-w-6xl min-h-[220px] bg-yellow-50 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-8 px-12 py-10 mx-auto relative z-10">
          {/* Mascot on the left, even bigger */}
          <div className="flex-shrink-0 flex items-center justify-center w-[460px] h-[460px]">
            <Image src="/rewards-mascot.png" alt="Rewards Mascot" width={460} height={460} className="w-[460px] h-[460px] object-contain" />
          </div>
          {/* Rewards content centered */}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-2 md:px-0">
            <h2 className="text-5xl font-extrabold text-yellow-700 mb-8 drop-shadow-lg">Your Rewards Progress</h2>
            <div className="mb-6 w-full flex justify-center">
              <div className="bg-orange-100 text-yellow-900 font-bold rounded-xl px-6 py-3 shadow text-center text-lg max-w-md">
                Complete each module to unlock a new reward badge!
              </div>
            </div>
            {/* Progress bar with 3 stops: 1, 2, 3 */}
            <div className="w-full max-w-md mb-6 relative flex flex-col items-center">
              {/* Progress bar */}
              <div className="w-full bg-yellow-100 rounded-full h-4 overflow-hidden relative mt-5">
                {/* Progress fill */}
                <div className="bg-yellow-400 h-4 rounded-full transition-all absolute left-0 top-0" style={{ width: `${progressPercent}%` }}></div>
              </div>
              {/* Stopping points: 1, 2, 3 */}
              <div className="absolute left-0 top-[calc(50%+5px)] w-full flex justify-between items-center -translate-y-1/2 z-10 px-1">
                {/* Step 1 */}
                <div className="flex flex-col items-center" style={{ left: '-17px' }}>
                  <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-lg shadow ${highestCompletedIdx > 0 ? 'bg-yellow-300 border-yellow-400 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {highestCompletedIdx === 0 ? (
                      <img src="/badge.png" alt="Badge" className="w-8 h-8 object-contain" style={{ borderRadius: '50%' }} />
                    ) : highestCompletedIdx > 0 ? (
                      <span className="text-2xl font-bold">✓</span>
                    ) : (
                      <span className="font-bold">1</span>
                    )}
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center" style={{ left: '50%' }}>
                  <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-lg shadow ${highestCompletedIdx > 1 ? 'bg-yellow-300 border-yellow-400 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {highestCompletedIdx === 1 ? (
                      <img src="/badge.png" alt="Badge" className="w-8 h-8 object-contain" style={{ borderRadius: '50%' }} />
                    ) : highestCompletedIdx > 1 ? (
                      <span className="text-2xl font-bold">✓</span>
                    ) : (
                      <span className="font-bold">2</span>
                    )}
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center" style={{ left: '100%' }}>
                  <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-lg shadow ${highestCompletedIdx > 2 ? 'bg-yellow-300 border-yellow-400 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {highestCompletedIdx === 2 ? (
                      <img src="/badge.png" alt="Badge" className="w-8 h-8 object-contain" style={{ borderRadius: '50%' }} />
                    ) : highestCompletedIdx > 2 ? (
                      <span className="text-2xl font-bold">✓</span>
                    ) : (
                      <span className="font-bold">3</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-600 mb-8 font-semibold text-center">{badgesEarned}/3 badges earned</div>
            {/* Reward slots */}
            <div className="flex gap-24 justify-center items-center w-full mt-4">
              {/* Slot 1 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300 overflow-hidden">
                  {completed[0] ? (
                    <img src={rewardBadges[0]} alt="Reward 1" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="12" cy="16" r="2" fill="#888"/>
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-bold mt-1 ${completed[0] ? 'text-yellow-700' : 'text-gray-500'}`}>{completed[0] ? 'Unlocked!' : 'Locked'}</span>
              </div>
              {/* Slot 2 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300 overflow-hidden">
                  {completed[1] ? (
                    <img src={rewardBadges[1]} alt="Reward 2" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="12" cy="16" r="2" fill="#888"/>
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-bold mt-1 ${completed[1] ? 'text-yellow-700' : 'text-gray-500'}`}>{completed[1] ? 'Unlocked!' : 'Locked'}</span>
              </div>
              {/* Slot 3 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300 overflow-hidden">
                  {completed[2] ? (
                    <img src={rewardBadges[2]} alt="Reward 3" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="12" cy="16" r="2" fill="#888"/>
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-bold mt-1 ${completed[2] ? 'text-yellow-700' : 'text-gray-500'}`}>{completed[2] ? 'Unlocked!' : 'Locked'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modules Section */}
      <section ref={modulesRef} className="w-full mx-auto py-16 px-0 relative">
        <div className="flex flex-col flex-1 items-center py-14 w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 font-sans drop-shadow-lg mb-4">Choose Your Adventure!</h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Select a module below and start your road safety learning journey. Each module is designed to make learning fun and interactive!
            </p>
          </div>
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {/* Module Card 1 */}
            <div onClick={() => router.push('/teacher/module-1')} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-in cursor-pointer overflow-hidden border-4 border-orange-300 hover:border-orange-400" style={{animationDelay: '0.1s'}}>
              <div className="flex h-full">
                <div className="w-1/3 h-full">
                  <Image
                    src="/module-1.png"
                    alt="Module 1 - Know Your Signals"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-2 text-orange-600">Module 1</h2>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Know Your Signals</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Learn about traffic lights, road signs, and signals. Understand what each color means and how to stay safe when crossing the road.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold">
                    <span className="text-base">Start Learning</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Card 2 */}
            <div onClick={() => router.push('/teacher/module-2')} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-in cursor-pointer overflow-hidden border-4 border-amber-300 hover:border-amber-400" style={{animationDelay: '0.2s'}}>
              <div className="flex h-full">
                <div className="w-1/3 h-full">
                  <Image
                    src="/module-2.png"
                    alt="Module 2 - How to Cross the Road"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-2 text-amber-600">Module 2</h2>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">How to Cross the Road</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Master the art of safely crossing the road. Learn about zebra crossings, pedestrian signals, and the importance of looking both ways.
                  </p>
                  <div className="flex items-center text-amber-600 font-semibold">
                    <span className="text-base">Start Learning</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Card 3 */}
            <div onClick={() => router.push('/teacher/module-3')} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-in cursor-pointer overflow-hidden border-4 border-amber-700 hover:border-yellow-900" style={{animationDelay: '0.3s'}}>
              <div className="flex h-full">
                <div className="w-1/3 h-full">
                  <Image
                    src="/module-3.png"
                    alt="Module 3 - Traveling in a Vehicle"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-2 text-amber-900">Module 3</h2>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Traveling in a Vehicle</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Discover how to stay safe when traveling in cars, buses, and other vehicles. Learn about seat belts, car seats, and vehicle safety rules.
                  </p>
                  <div className="flex items-center text-amber-900 font-semibold">
                    <span className="text-base">Start Learning</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Animated Blob Background for rewards/modules */}
      {/* <BlobBackground /> (REMOVED) */}
    </div>
  );
} 