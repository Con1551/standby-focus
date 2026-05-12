"use client";
import React, { useState, useEffect } from 'react';

const themes = {
  nightCity: { bg: "#0D0221", accent: "#FF007F", text: "#00F0FF", noteBg: "#1C053A" },
  cyberGrid: { bg: "#000000", accent: "#00FFCC", text: "#FF0055", noteBg: "#0A1A1F" },
  synthwave: { bg: "#2A004F", accent: "#FF9900", text: "#FF00CC", noteBg: "#3D0075" },
  matrix: { bg: "#001100", accent: "#00FF41", text: "#008F11", noteBg: "#002200" }
};

export default function PomoNook() {
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTheme, setActiveTheme] = useState('nightCity');
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
  if (!mounted) return <div style={{ backgroundColor: '#0D0221', height: '100vh', width: '100vw' }} />;

  const theme = themes[activeTheme];
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <div
      className="fixed inset-0 font-sans flex flex-col overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* 1. TOP NAV */}
      <nav className="p-6 md:p-10 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-black m-0" style={{ textShadow: `0 0 10px ${theme.text}` }}>🍅 pomo.nook</h1>
        <div className="flex gap-2 md:gap-3">
          {Object.keys(themes).map(t => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 cursor-pointer transition-transform ${activeTheme === t ? 'scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: themes[t].accent, borderColor: activeTheme === t ? theme.text : 'transparent', boxShadow: `0 0 10px ${themes[t].accent}` }}
            />
          ))}
        </div>
      </nav>

      {/* 2. CENTER CLOCK */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div
          className="p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] text-center w-full max-w-2xl border-2"
          style={{ backgroundColor: theme.noteBg, borderColor: theme.accent, boxShadow: `0 0 30px ${theme.accent}40` }}
        >
          <div className="text-6xl sm:text-7xl md:text-[10rem] font-black mb-8 font-mono leading-none tracking-tighter" style={{ textShadow: `0 0 15px ${theme.text}` }}>
            {mins}:{secs}
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className="border-none py-4 px-8 md:py-6 md:px-16 rounded-full text-lg md:text-3xl font-black cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: `0 0 20px ${theme.accent}` }}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={() => {
                setSeconds(25 * 60);
                setIsRunning(false);
              }}
              className="border-none py-4 px-6 md:py-6 md:px-8 rounded-full text-lg md:text-3xl cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: theme.text, color: theme.bg, boxShadow: `0 0 15px ${theme.text}` }}
            >
              ↺
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY BACKDROP FOR MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 3. NOTES SIDEBAR */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[85vw] sm:w-[350px] z-50 transform transition-transform duration-300 ease-in-out p-6 md:p-10 flex flex-col border-l-2 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: theme.bg, borderColor: theme.accent, boxShadow: `-10px 0 30px ${theme.accent}40` }}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 h-24 w-12 border-y-2 border-l-2 rounded-l-2xl flex items-center justify-center cursor-pointer text-xl"
          style={{ backgroundColor: theme.bg, borderColor: theme.accent, color: theme.text, boxShadow: `-5px 0 15px ${theme.accent}40` }}
        >
          {isSidebarOpen ? '→' : '←'}
        </button>
        <h2 className="font-black text-2xl mb-6" style={{ textShadow: `0 0 10px ${theme.text}` }}>Notes</h2>
        <button
          onClick={() => setNotes([...notes, { id: Date.now() }])}
          className="w-full p-3 border-none rounded-xl font-bold cursor-pointer mb-4 transition-transform hover:scale-105"
          style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: `0 0 15px ${theme.accent}` }}
        >
          + New Note
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {notes.map(n => (
            <div key={n.id} className="p-4 mt-4 min-h-[100px] rounded-lg border" style={{ backgroundColor: theme.noteBg, borderColor: theme.accent, boxShadow: `0 0 10px ${theme.accent}20` }} />
          ))}
        </div>
      </div>
    </div>
  );
}