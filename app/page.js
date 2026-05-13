"use client";
import React, { useState, useEffect } from 'react';

const themes = {
  matchaCafe: {
    bg: "#F4F1DE",
    accent: "#81B29A",
    text: "#3D405B",
    noteBg: "#E8E4D9"
  },
  midnightRain: {
    bg: "#2B2D42",
    accent: "#8D99AE",
    text: "#EDF2F4",
    noteBg: "#363952"
  },
  autumnSunset: {
    bg: "#FAE1DF",
    accent: "#E29578",
    text: "#4A3728",
    noteBg: "#FCD5CE"
  },
  vintageCassette: {
    bg: "#CAC4CE",
    accent: "#F4D06F",
    text: "#4B3F72",
    noteBg: "#D5D0D8"
  }
};

const themeLabels = {
  matchaCafe: 'Matcha Cafe',
  midnightRain: 'Midnight Rain',
  autumnSunset: 'Autumn Sunset',
  vintageCassette: 'Vintage Cassette'
};

const softTextShadow = '0 1px 2px rgba(0, 0, 0, 0.14)';
const softButtonShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';

export default function PomoNook() {
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTheme, setActiveTheme] = useState('matchaCafe');
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
  if (!mounted) return <div style={{ backgroundColor: '#F4F1DE', height: '100vh', width: '100vw' }} />;

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
        <h1 className="text-2xl md:text-3xl font-black m-0" style={{ textShadow: softTextShadow }}>🍅 pomo.nook</h1>
        <div className="flex flex-wrap justify-end gap-2 md:gap-3 max-w-[18rem] md:max-w-none">
          {Object.keys(themes).map(t => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              title={themeLabels[t]}
              aria-label={`Switch to ${themeLabels[t]}`}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-full border-2 cursor-pointer transition-transform text-xs md:text-sm font-bold tracking-wide ${activeTheme === t ? 'scale-105' : 'hover:scale-105'}`}
              style={{ backgroundColor: themes[t].accent, borderColor: activeTheme === t ? theme.text : 'transparent', color: themes[t].bg, boxShadow: softButtonShadow }}
            >
              {themeLabels[t]}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. CENTER CLOCK */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div
          className="p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] text-center w-full max-w-2xl border-2"
          style={{ backgroundColor: theme.noteBg, borderColor: theme.accent, boxShadow: softButtonShadow }}
        >
          <div className="text-6xl sm:text-7xl md:text-[10rem] font-black mb-8 font-mono leading-none tracking-tighter" style={{ textShadow: softTextShadow }}>
            {mins}:{secs}
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className="border-none py-4 px-8 md:py-6 md:px-16 rounded-full text-lg md:text-3xl font-black cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: softButtonShadow }}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={() => {
                setSeconds(25 * 60);
                setIsRunning(false);
              }}
              className="border-none py-4 px-6 md:py-6 md:px-8 rounded-full text-lg md:text-3xl cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: theme.text, color: theme.bg, boxShadow: softButtonShadow }}
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
        style={{ backgroundColor: theme.bg, borderColor: theme.accent, boxShadow: softButtonShadow }}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 h-24 w-12 border-y-2 border-l-2 rounded-l-2xl flex items-center justify-center cursor-pointer text-xl"
          style={{ backgroundColor: theme.bg, borderColor: theme.accent, color: theme.text, boxShadow: softButtonShadow }}
        >
          {isSidebarOpen ? '→' : '←'}
        </button>
        <h2 className="font-black text-2xl mb-6" style={{ textShadow: softTextShadow }}>Notes</h2>
        <button
          onClick={() => setNotes([...notes, { id: Date.now() }])}
          className="w-full p-3 border-none rounded-xl font-bold cursor-pointer mb-4 transition-transform hover:scale-105"
          style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: softButtonShadow }}
        >
          + New Note
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {notes.map(n => (
            <div key={n.id} className="p-4 mt-4 min-h-[100px] rounded-lg border" style={{ backgroundColor: theme.noteBg, borderColor: theme.accent, boxShadow: softButtonShadow }} />
          ))}
        </div>
      </div>
    </div>
  );
}