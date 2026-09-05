import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBridge AI — Connecting Skills, Academia and Industry',
  description:
    'SkillBridge AI connects students, faculty, institutions and industry through skill intelligence, career development, internships and placement collaboration.',
  keywords: [
    'SkillBridge AI',
    'Career Intelligence',
    'Academia Industry Collaboration',
    'Skill Mapping',
    'Skill Twin',
    'Internships',
    'Placements',
    'Readiness Simulator',
    'Resume Analyzer',
    'Skill Development',
  ],
  authors: [{ name: 'SkillBridge AI Team' }],
  openGraph: {
    title: 'SkillBridge AI — Connecting Skills, Academia and Industry',
    description:
      'SkillBridge AI connects students, faculty, institutions and industry through skill intelligence, career development, internships and placement collaboration.',
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
      <body className={`${inter.className} bg-[#f7fcf8] text-[#17251b] min-h-screen antialiased selection:bg-green-600 selection:text-white`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
