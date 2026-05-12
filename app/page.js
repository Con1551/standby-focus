"use client";
import React, { useState, useEffect } from 'react';

// Using a simple style object so Tailwind doesn't break on the network
const themes = {
  marshmallow: { bg: "#FDF6F0", accent: "#FFB7B2", text: "#6D5D6E" },
  matcha: { bg: "#F0F4EF", accent: "#B5EAD7", text: "#4A5D4E" },
  berry: { bg: "#F9F1F6", accent: "#C7CEEA", text: "#5D5D81" },
  honey: { bg: "#FFF9E5", accent: "#FFDAC1", text: "#855D44" }
};

export default function PomoNook() {
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTheme, setActiveTheme] = useState('marshmallow');
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
  if (!mounted) return <div style={{ backgroundColor: '#FDF6F0', height: '100vh' }} />;

  const theme = themes[activeTheme];
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: theme.bg, color: theme.text,
      fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      {/* 1. TOP NAV */}
      <nav style={{ padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', margin: 0 }}>🍅 pomo.nook</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.keys(themes).map(t => (
            <button key={t} onClick={() => setActiveTheme(t)} style={{
              width: '30px', height: '30px', borderRadius: '50%', border: '2px solid white',
              backgroundColor: themes[t].accent, cursor: 'pointer'
            }} />
          ))}
        </div>
      </nav>

      {/* 2. CENTER CLOCK (MASSIVE) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '80px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '10rem', fontWeight: '900', marginBottom: '30px', fontFamily: 'monospace' }}>
            {mins}:{secs}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => setIsRunning(!isRunning)}
              style={{ backgroundColor: theme.accent, color: 'white', border: 'none', padding: '25px 60px', borderRadius: '50px', fontSize: '1.8rem', fontWeight: '900', cursor: 'pointer' }}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={() => setSeconds(25 * 60)}
              style={{ background: '#eee', border: 'none', padding: '25px 30px', borderRadius: '50px', fontSize: '1.8rem', cursor: 'pointer' }}
            >
              ↺
            </button>
          </div>
        </div>
      </div>

      {/* 3. NOTES SIDEBAR */}
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: '300px',
        backgroundColor: 'white', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: '0.4s ease', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)', padding: '40px'
      }}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ position: 'absolute', left: '-50px', top: '50%', height: '100px', width: '50px', background: 'white', border: 'none', borderRadius: '20px 0 0 20px' }}>
          {isSidebarOpen ? '→' : '←'}
        </button>
        <h2 style={{ fontWeight: '900' }}>Notes</h2>
        <button onClick={() => setNotes([...notes, { id: Date.now() }])} style={{ width: '100%', padding: '10px', background: theme.accent, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>+ New Note</button>
        {notes.map(n => <div key={n.id} style={{ background: '#FFF9E5', padding: '10px', marginTop: '10px', minHeight: '100px', borderRadius: '5px' }} />)}
      </div>
    </div>
  );
}