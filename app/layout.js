import { Gochi_Hand, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const hand = Gochi_Hand({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-hand' 
});

// This object controls what you see in the Browser Tab
export const metadata = {
  title: '🍅 Pomo.nook | Cozy Focus',
  description: 'A cute and cozy pomodoro timer for gentle productivity',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hand.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}