'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Sparkles,
  ArrowRight,
  Target,
  Sliders,
  Users,
  Workflow,
  Cpu,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  GraduationCap,
  Layers,
  ChevronRight,
  Play,
  Share2,
  Briefcase,
  Award,
  BarChart3,
  Search,
  ExternalLink,
} from 'lucide-react';
import { INSTITUTION_STATS } from '@/data/seedData';

export default function LandingPage() {
  const { setRole, setIsDemoTourOpen, setDemoTourStep } = useApp();
  const router = useRouter();

  const handleLaunchRole = (selectedRole: UserRole, targetRoute: string) => {
    setRole(selectedRole);
    router.push(targetRoute);
  };

  const handleStartTour = () => {
    setDemoTourStep(0);
    setRole('student');
    setIsDemoTourOpen(true);
    router.push('/student/skill-twin');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar for Landing Page */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-primary-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white tracking-tight">
                  SkillBridge<span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-indigo-950/90 text-indigo-300 border border-indigo-700/60 px-1.5 py-0.5 rounded font-semibold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Academia × Industry Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartTour}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-700/60 rounded-lg hover:bg-emerald-900/50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>5-Minute Demo Tour</span>
            </button>
            <button
              onClick={() => handleLaunchRole('student', '/student/dashboard')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-all shadow-md shadow-indigo-500/20"
            >
              <span>Launch Interactive Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              Smart India Hackathon 2026 Prototype • SIH26044 • Ministry of Ayush / AIIA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Bridging the Gap Between{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Academia and Industry
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An AI-powered, evidence-based Academia–Industry Skill Intelligence Ecosystem that continuously maps student competencies against industry requirements, identifies skill gaps, recommends personalized upskilling, connects students with relevant internships and jobs, and converts industry outcomes into actionable academic intelligence.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLaunchRole('student', '/student/dashboard')}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Launch Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleStartTour}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-700/60 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>5-Minute Demo Tour</span>
            </button>
          </div>

          {/* 4 Prominent Demo Personas */}
          <div className="mt-14 max-w-5xl mx-auto p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur text-left">
            <div className="flex items-center justify-between mb-4 px-2">
              <div>
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Select Instant Demo Persona (No Authentication Required)
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Click any role to test the live prototype immediately with realistic Indian corporate & student seed data.
                </p>
              </div>
              <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40 hidden sm:inline">
                Prototype Dataset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Student Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/80 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                      68% Ready
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300">
                    Abdul Aziz
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">Backend Developer Track</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Python (90%), SQL (82%). Gaps: FastAPI, REST APIs, Docker, Cloud.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchRole('student', '/student/dashboard')}
                  className="mt-4 w-full py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-bold border border-indigo-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Enter Student Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Industry Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/80 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/60">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded font-bold">
                      Corporate
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300">
                    Razorpay Software
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">Talent Acquisition Lead</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Rank candidates with 5-factor transparent AI and submit post-interview feedback.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchRole('industry', '/industry/dashboard')}
                  className="mt-4 w-full py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white text-xs font-bold border border-amber-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Enter Industry Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Faculty Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/80 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                      Academic
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300">
                    Dr. Ramesh
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">CSE Department Head</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Inspect cohort gaps (Docker 42%, Cloud 37%) and review industry FDP tie-ups.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchRole('faculty', '/faculty/dashboard')}
                  className="mt-4 w-full py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs font-bold border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Enter Faculty Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Admin Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-purple-500/80 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/60">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded font-bold">
                      Leadership
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300">
                    Institution Dean
                  </h3>
                  <p className="text-xs text-purple-400 font-medium">Placements & Council</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Macro analytics, closed-loop pipeline, and AI Training Planner for bootcamps.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchRole('admin', '/admin/dashboard')}
                  className="mt-4 w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold border border-purple-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Enter Institution Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Innovation Pillars Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full font-bold">
              Core SIH Innovation Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
              Moving Beyond Static Job Boards
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Traditional portals match resumes against keywords. SkillBridge AI constructs a continuous mathematical intelligence feedback loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-indigo-500/40 block mb-2">01</span>
                <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 w-fit mb-4 border border-indigo-800/60">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">AI Student Skill Twin</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Dynamic, multi-vector competency profile ground in verified GitHub code commits, assessment tests, and course certifications—not self-reported claims.
                </p>
              </div>
              <Link
                href="/student/skill-twin"
                className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Inspect Skill Twin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-emerald-500/40 block mb-2">02</span>
                <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 w-fit mb-4 border border-emerald-800/60">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Career Readiness Simulator</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Interactive what-if career readiness projections. Toggle learning actions to watch projected placement readiness climb from 68% up to 91%.
                </p>
              </div>
              <Link
                href="/student/simulator"
                className="mt-6 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Launch Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-amber-500/40 block mb-2">03</span>
                <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 w-fit mb-4 border border-amber-800/60">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Explainable Candidate Matcher</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  5-factor transparent scoring (Skill 50%, Assessment 15%, Projects 15%, Experience 10%, Evidence 10%) featuring the "Why this candidate?" explainability breakdown.
                </p>
              </div>
              <Link
                href="/industry/candidates"
                className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>View Candidate Matcher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-purple-500/40 block mb-2">04</span>
                <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 w-fit mb-4 border border-purple-800/60">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Closed-Loop Academia Intelligence</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Post-interview corporate feedback automatically aggregates cohort deficits (e.g. Docker 42%) and synthesizes institutional bootcamp interventions.
                </p>
              </div>
              <Link
                href="/admin/intelligence"
                className="mt-6 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Explore Closed-Loop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Full-Stack Architecture Section */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase bg-indigo-950 text-indigo-400 border border-indigo-800/60 px-2.5 py-1 rounded-full font-bold">
              System Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
              How SkillBridge AI Operates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              End-to-end data pipeline linking students, enterprise employers, and academic leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                step: 'MAP',
                title: 'Student Layer',
                desc: 'Verified GitHub repos, assessments, and NLP resume parsing generate the AI Skill Twin.',
                color: 'text-indigo-400',
                border: 'border-indigo-800/40',
              },
              {
                step: 'ANALYZE',
                title: 'Skill Intelligence',
                desc: 'Benchmarks profile against target role benchmarks to pinpoint exact competency deficits.',
                color: 'text-sky-400',
                border: 'border-sky-800/40',
              },
              {
                step: 'UPSKILL',
                title: 'Readiness Simulator',
                desc: 'Model-based what-if simulator projects readiness climb and outputs a 30-day roadmap.',
                color: 'text-emerald-400',
                border: 'border-emerald-800/40',
              },
              {
                step: 'MATCH',
                title: 'Opportunity Layer',
                desc: 'Multi-vector match engine pairs candidates with internships using transparent 5-factor scoring.',
                color: 'text-amber-400',
                border: 'border-amber-800/40',
              },
              {
                step: 'EVALUATE',
                title: 'Industry Feedback',
                desc: 'Recruiters evaluate interview performance; ratings feed directly into university analytics.',
                color: 'text-rose-400',
                border: 'border-rose-800/40',
              },
              {
                step: 'IMPROVE',
                title: 'Academic Intelligence',
                desc: 'Aggregated feedback triggers automated bootcamps, upskilling the next student cohort.',
                color: 'text-purple-400',
                border: 'border-purple-800/40',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-slate-950/80 border ${item.border} flex flex-col justify-between`}
              >
                <div>
                  <span className={`text-[11px] font-mono font-black ${item.color} uppercase tracking-wider`}>
                    Stage {idx + 1}: {item.step}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Impact Statistics */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">
                {INSTITUTION_STATS.totalStudents}
              </p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Students Analyzed
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {INSTITUTION_STATS.industryPartners}
              </p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Corporate Partners
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                {INSTITUTION_STATS.activeOpportunities}
              </p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Active Opportunities
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
                {INSTITUTION_STATS.averageSkillMatch}%
              </p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Average Match Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">
                  SkillBridge<span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-2 py-0.5 rounded font-bold">
                  SIH26044
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Smart India Hackathon 2026 Prototype • Ministry of Ayush • All India Institute of Ayurveda
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Theme: Miscellaneous • AI-Powered Academia–Industry Skill Intelligence Ecosystem
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/student/dashboard" className="hover:text-white transition-colors">Student Demo</Link>
              <Link href="/industry/dashboard" className="hover:text-white transition-colors">Industry Demo</Link>
              <Link href="/faculty/dashboard" className="hover:text-white transition-colors">Faculty Demo</Link>
              <Link href="/admin/dashboard" className="hover:text-white transition-colors">Institution Demo</Link>
              <Link href="/portfolio/demo-student" className="hover:text-white transition-colors">Public Portfolio</Link>
              <a
                href="https://github.com/Azzu1930/skillbridge-ai"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© 2026 SkillBridge AI • Developed for Smart India Hackathon (SIH26044).</p>
            <p className="italic">
              Simulated prototype dataset & deterministic modeling used for demonstration purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
