"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const modulesRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToModules = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToRewards = () => {
    rewardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogout = () => {
    // TODO: Add your logout logic here
    alert("Logged out!");
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] flex flex-col ">
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
          className="ml-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full px-6 py-2 shadow-lg text-base md:text-lg transition-all border-2 border-pink-300"
        >
          Logout
        </button>
      </nav>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mx-auto py-16 px-20 gap-8 w-full ">
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
            Let's Get Started
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
      {/* Rewards Section */}
      <section ref={rewardsRef} className="w-full flex justify-center py-10 px-20">
        <div className="w-full max-w-6xl min-h-[220px] bg-yellow-50 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-8 px-12 py-10 mx-auto relative z-10">
          {/* Mascot on the left, even bigger */}
          <div className="flex-shrink-0 flex items-center justify-center w-[380px] h-[380px]">
            <Image src="/rewards-mascot.png" alt="Rewards Mascot" width={380} height={380} className="w-[380px] h-[380px] object-contain" />
          </div>
          {/* Rewards content centered */}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-2 md:px-0">
            <h2 className="text-5xl font-extrabold text-yellow-700 mb-8 drop-shadow-lg">Your Rewards Progress</h2>
            {/* Progress bar with 3 stops: 1, 2, 3 */}
            <div className="w-full max-w-md mb-6 relative flex flex-col items-center">
              {/* Progress bar */}
              <div className="w-full bg-yellow-100 rounded-full h-4 overflow-hidden relative mt-5">
                {/* Progress fill (0% for now) */}
                <div className="bg-yellow-400 h-4 rounded-full transition-all absolute left-0 top-0" style={{ width: '0%' }}></div>
              </div>
              {/* Stopping points: 1, 2, 3 */}
              <div className="absolute left-0 top-[calc(50%+5px)] w-full flex justify-between items-center -translate-y-1/2 z-10 px-1">
                {/* Stop 1 at 0% */}
                <div className="flex flex-col items-center" style={{ left: '-7px' }}>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center text-lg shadow">
                    <span className="text-gray-400 font-bold">1</span>
                  </div>
                </div>
                {/* Stop 2 at 50% */}
                <div className="flex flex-col items-center" style={{ left: '50%' }}>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center text-lg shadow">
                    <span className="text-gray-400 font-bold">2</span>
                  </div>
                </div>
                {/* Stop 3 at 100% */}
                <div className="flex flex-col items-center" style={{ left: '100%' }}>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center text-lg shadow">
                    <span className="text-gray-400 font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-600 mb-8 font-semibold text-center">0/3 badges earned</div>
            {/* Reward slots */}
            <div className="flex gap-24 justify-center items-center w-full mt-4">
              {/* Slot 1 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300">
                  {/* Lock SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="12" cy="16" r="2" fill="#888"/>
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-1">Locked</span>
              </div>
              {/* Slot 2 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300">
                  {/* Lock SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="12" cy="16" r="2" fill="#888"/>
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-1">Locked</span>
              </div>
              {/* Slot 3 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl shadow-inner flex items-center justify-center mb-2 border-2 border-gray-300">
                  {/* Lock SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="10" width="16" height="10" rx="3" fill="#b0b0b0"/>
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="12" cy="16" r="2" fill="#888"/>
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-1">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modules Section */}
      <section ref={modulesRef} className="w-full mx-auto py-16 px-0 relative overflow-hidden">
        {/* Accent Shapes (scattered blobs, clouds, stars, hearts) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          {/* Blue Blob - Top Left */}
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: -60, left: -80 }}>
            <path d="M120,60 Q200,10 320,60 Q240,110 200,200 Q160,210 80,150 Q40,100 120,60Z" fill="#b6d0f7" fillOpacity="0.38" />
          </svg>
          {/* Mint Blob - Bottom Left */}
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 80, left: 40 }}>
            <path d="M90,20 Q130,0 170,60 Q150,100 90,100 Q30,100 50,60 Q70,20 90,20Z" fill="#b6f7e3" fillOpacity="0.22" />
          </svg>
          {/* Peach Blob - Top Right */}
          <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 40, right: 60 }}>
            <path d="M80,20 Q120,0 150,40 Q130,80 80,80 Q30,80 50,40 Q60,20 80,20Z" fill="#ffe0b6" fillOpacity="0.18" />
          </svg>
          {/* Lavender Blob - Center Right */}
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '40%', right: 0 }}>
            <ellipse cx="60" cy="40" rx="60" ry="40" fill="#e3b6f7" fillOpacity="0.18" />
          </svg>
          {/* Pink Heart - Center Left */}
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: 40 }}>
            <path d="M18 32s-8-6.4-12-10.4C2 17.6 2 12.8 6 10.4 9.2 8.4 13.2 10.4 18 16c4.8-5.6 8.8-7.6 12-5.6 4 2.4 4 7.2 0 11.2C26 25.6 18 32 18 32z" fill="#f7b6d0" fillOpacity="0.7" />
          </svg>
          {/* Blue Star - Center, behind modules */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '55%', left: '45%' }}>
            <polygon points="16,3 18.5,11 28,11 20,17 22.5,27 16,21 9.5,27 12,17 4,11 13.5,11" fill="#b6d0f7" fillOpacity="0.7" />
          </svg>
          {/* Pink Star - Top Left, near modules */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 120, left: 120 }}>
            <polygon points="12,2 14,7 20,7 15,11 17,18 12,14 7,18 9,11 4,7 10,7" fill="#f7b6d0" fillOpacity="0.7" />
          </svg>
          {/* Cloud - Center, behind modules */}
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '60%', left: '60%' }}>
            <ellipse cx="30" cy="30" rx="30" ry="10" fill="#fff" fillOpacity="0.7" />
            <ellipse cx="70" cy="20" rx="20" ry="8" fill="#fff" fillOpacity="0.7" />
          </svg>
          {/* Cloud - Top, near center */}
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 60, left: '55%' }}>
            <ellipse cx="20" cy="16" rx="20" ry="8" fill="#fff" fillOpacity="0.7" />
            <ellipse cx="45" cy="8" rx="12" ry="5" fill="#fff" fillOpacity="0.7" />
          </svg>
        </div>
        <div className="flex flex-col flex-1 items-center py-14 w-full">
          <h2 className="text-2xl font-extrabold mb-4 text-teal-700 font-sans drop-shadow-lg">Choose a module below and start your road safety adventure!</h2>
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Shapes behind/around cards */}
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: -30, left: -40, zIndex: 0 }}>
              <ellipse cx="40" cy="30" rx="40" ry="30" fill="#b6d0f7" fillOpacity="0.18" />
            </svg>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 60, left: 120, zIndex: 0 }}>
              <ellipse cx="30" cy="20" rx="30" ry="20" fill="#b6f7e3" fillOpacity="0.18" />
            </svg>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 120, left: 0, zIndex: 0 }}>
              <polygon points="20,3 23,13 35,13 25,21 28,33 20,26 12,33 15,21 5,13 17,13" fill="#f7b6d0" fillOpacity="0.25" />
            </svg>
            <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: -20, left: 80, zIndex: 0 }}>
              <ellipse cx="25" cy="15" rx="25" ry="10" fill="#fff" fillOpacity="0.25" />
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 10, right: 40, zIndex: 0 }}>
              <path d="M18 32s-8-6.4-12-10.4C2 17.6 2 12.8 6 10.4 9.2 8.4 13.2 10.4 18 16c4.8-5.6 8.8-7.6 12-5.6 4 2.4 4 7.2 0 11.2C26 25.6 18 32 18 32z" fill="#f7b6d0" fillOpacity="0.4" />
            </svg>
            {/* End shapes behind/around cards */}
            {/* Module Cards */}
            <div onClick={() => router.push('/teacher/module-1')} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border-4 border-yellow-300 hover:scale-105 transition-transform duration-300 animate-bounce-in cursor-pointer hover:bg-yellow-100" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-bold mb-2 text-yellow-600">Module 1</h2>
              <p className="text-gray-700 font-medium">Know Your Signals</p>
              <span className="text-4xl mt-2">🚦</span>
            </div>
            <div onClick={() => router.push('/teacher/module-2')} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border-4 border-pink-300 hover:scale-105 transition-transform duration-300 animate-bounce-in cursor-pointer hover:bg-pink-100" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold mb-2 text-pink-600">Module 2</h2>
              <p className="text-gray-700 font-medium">How to Cross the Road</p>
              <span className="text-4xl mt-2">🚸</span>
            </div>
            <div onClick={() => router.push('/teacher/module-3')} className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border-4 border-blue-300 hover:scale-105 transition-transform duration-300 animate-bounce-in cursor-pointer hover:bg-blue-100" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl font-bold mb-2 text-blue-600">Module 3</h2>
              <p className="text-gray-700 font-medium">Traveling in a Vehicle</p>
              <span className="text-4xl mt-2">🚌</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 