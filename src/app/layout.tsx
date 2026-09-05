import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBridge AI — Resume Intelligence & Academia × Industry Platform',
  description:
    'Upload your resume, discover skill gaps, measure career readiness and find relevant opportunities with SkillBridge AI.',
  keywords: [
    'SkillBridge AI',
    'SIH26044',
    'Resume Intelligence',
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
    title: 'SkillBridge AI — Resume Intelligence & Academia × Industry Platform',
    description:
      'Upload your resume, discover skill gaps, measure career readiness and find relevant opportunities with SkillBridge AI.',
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
