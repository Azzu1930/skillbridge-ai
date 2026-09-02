import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBridge AI — Academia × Industry Intelligence Platform',
  description:
    'AI-powered platform for skill mapping, internships, placements and academia-industry collaboration. SIH26044.',
  keywords: [
    'SkillBridge AI',
    'SIH26044',
    'Academia Industry Collaboration',
    'Skill Mapping',
    'Skill Twin',
    'Internships',
    'Placements',
    'Readiness Simulator',
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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
