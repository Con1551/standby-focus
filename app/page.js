"use client";
import React, { useState, useEffect } from 'react';

export default function PomoNook() {
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // CRITICAL: This stops the blank screen on phones
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  // If the phone isn't ready, show a loading color instead of a blank white screen
  if (!mounted) return <div className="bg-[#f4f1ea] h-screen w-screen" />;

  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 bg-[#f4f1ea] text-[#3a3532] font-sans flex flex-col overflow-hidden">
      {/* 1. TOP NAV */}
      <nav className="p-6 md:p-10 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-black m-0">🍅 pomo.nook</h1>
      </nav>

      {/* 2. CENTER CLOCK */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-2xl">
          <div className="text-6xl sm:text-7xl md:text-[10rem] font-black mb-8 font-mono leading-none tracking-tighter">
            {mins}:{secs}
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className="bg-[#8c7b6d] text-white border-none py-4 px-8 md:py-6 md:px-16 rounded-full text-lg md:text-3xl font-black cursor-pointer hover:bg-[#7a6b5e] transition-colors"
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={() => {
                setSeconds(25 * 60);
                setIsRunning(false);
              }}
              className="bg-gray-200 border-none py-4 px-6 md:py-6 md:px-8 rounded-full text-lg md:text-3xl cursor-pointer hover:bg-gray-300 transition-colors"
            >
              ↺
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY BACKDROP FOR MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 3. NOTES SIDEBAR */}
      <div className={`fixed right-0 top-0 bottom-0 w-[85vw] sm:w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-[-10px_0_30px_rgba(0,0,0,0.05)] p-6 md:p-10 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 h-24 w-12 bg-white border-none rounded-l-2xl shadow-[-5px_0_10px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-pointer text-xl"
        >
          {isSidebarOpen ? '→' : '←'}
        </button>
        <h2 className="font-black text-2xl mb-6">Notes</h2>
        <button
          onClick={() => setNotes([...notes, { id: Date.now() }])}
          className="w-full p-3 bg-[#8c7b6d] text-white border-none rounded-xl font-bold cursor-pointer mb-4 hover:bg-[#7a6b5e] transition-colors"
        >
          + New Note
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {notes.map(n => (
            <div key={n.id} className="bg-[#f4f1ea] p-4 mt-4 min-h-[100px] rounded-lg shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}