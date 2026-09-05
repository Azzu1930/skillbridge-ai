import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBridge AI — Academia × Industry Intelligence Platform',
  description:
    'AI-powered platform for skill mapping, internships, placements and academia-industry collaboration. SIH 2026 Prototype • SIH26044.',
  keywords: [
    'SkillBridge AI',
    'SIH26044',
    'Academia Industry Collaboration',
    'Skill Mapping',
    'Skill Twin',
    'Internships',
    'Placements',
    'Readiness Simulator',
    'Resume Analyzer',
  ],
  authors: [{ name: 'SkillBridge AI Team' }],
  openGraph: {
    title: 'SkillBridge AI — Academia × Industry Intelligence Platform',
    description:
      'AI-powered platform for skill mapping, internships, placements and academia-industry collaboration.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-[#f8fafc] text-slate-900 min-h-screen antialiased selection:bg-blue-600 selection:text-white`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
