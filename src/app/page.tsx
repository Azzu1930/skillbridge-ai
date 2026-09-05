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
  FileText,
  UploadCloud,
  Check,
  Zap,
} from 'lucide-react';
import { INSTITUTION_STATS } from '@/data/seedData';

export default function LandingPage() {
  const { setRole, setIsDemoTourOpen, setDemoTourStep, setSessionMode } = useApp();
  const router = useRouter();

  const handleLaunchRole = (selectedRole: UserRole, targetRoute: string) => {
    setRole(selectedRole);
    setSessionMode('demo');
    router.push(targetRoute);
  };

  const handleStartTour = () => {
    setDemoTourStep(0);
    setRole('student');
    setSessionMode('demo');
    setIsDemoTourOpen(true);
    router.push('/student/skill-twin');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar for Landing Page */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-slate-900 tracking-tight">
                    SkillBridge<span className="text-blue-600">AI</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-semibold">
                    SIH26044
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                  Academia × Industry Intelligence Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">
              Platform
            </a>
            <a href="#personas" className="hover:text-blue-600 transition-colors">
              Personas
            </a>
            <Link href="/student/opportunities" className="hover:text-blue-600 transition-colors">
              Opportunities
            </Link>
            <button onClick={handleStartTour} className="hover:text-blue-600 transition-colors">
              Demo Tour
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>5-Min Tour</span>
            </button>

            <Link
              href="/resume-analyzer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analyze My Resume</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Government / SIH Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Smart India Hackathon 2026 Prototype</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-600 font-bold">Ministry of Ayush / AIIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Turn Your Resume Into Your{' '}
            <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">
              Career Intelligence
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload your resume, discover your real skill profile, identify gaps for your target role,
            and find opportunities that match your capabilities with verified evidence.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/resume-analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Analyze My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleStartTour}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all"
            >
              <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Launch 5-Minute Tour</span>
            </button>
          </div>

          {/* Value proposition badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Real PDF & DOCX Parsing
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              10 Industry Role Benchmarks
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              What-If Career Simulator
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Closed-Loop Academic Feedback
            </span>
          </div>
        </div>
      </section>

      {/* VISUAL WORKFLOW PIPELINE SECTION */}
      <section id="workflow" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Continuous Intelligence Pipeline
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              From Resume Document to Transparent Career Placement
            </p>
            <p className="text-sm text-slate-600 mt-2">
              How SkillBridge AI bridges the gap between academic education and corporate industry expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              {
                step: '01',
                title: 'Resume Upload',
                desc: 'Client-side PDF & DOCX extraction with complete user privacy.',
                icon: UploadCloud,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                step: '02',
                title: 'Skill Extraction',
                desc: '150+ technology taxonomy mapping with evidence snippets.',
                icon: Cpu,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
              },
              {
                step: '03',
                title: 'Skill Gap Analysis',
                desc: 'Benchmark diagnostics against corporate role expectations.',
                icon: Target,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
              },
              {
                step: '04',
                title: 'Readiness Model',
                desc: 'Deterministic 5-factor mathematical readiness score (XX/100).',
                icon: Sliders,
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
              {
                step: '05',
                title: 'Learning Path',
                desc: 'Personalized project recommendations and weekly roadmaps.',
                icon: Zap,
                color: 'text-teal-600',
                bg: 'bg-teal-50',
              },
              {
                step: '06',
                title: 'Opportunity Match',
                desc: 'Transparent compatibility breakdown with 1-click apply.',
                icon: Briefcase,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 DEMO PERSONAS SECTION */}
      <section id="personas" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Evaluator Demo Launchpad
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Test All 4 Perspectives of the Ecosystem
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Click any persona card below to instantly launch their dedicated portal and pre-populated SIH demonstration dataset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                    Student
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Abdul Aziz</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">
                  Backend Developer Track (68% Ready)
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Dynamic AI Skill Twin, verified code commit evidence, role benchmark analyzer, and interactive what-if simulator.
                </p>
              </div>

              <button
                onClick={() => handleLaunchRole('student', '/student/skill-twin')}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Launch Student Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Industry Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                    Industry
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Razorpay Software</h3>
                <p className="text-xs font-semibold text-amber-700 mt-0.5">
                  Tech Talent Acquisition Lead
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  5-factor candidate ranker (Abdul Aziz #1 @ 91%), skill graph visualization, and post-interview academic feedback.
                </p>
              </div>

              <button
                onClick={() => handleLaunchRole('industry', '/industry/candidates')}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Launch Recruiter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Faculty Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    Faculty
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Dr. Ramesh Sharma</h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Head of Computer Science & Eng.
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Cohort deficit analytics (Docker 42%, Cloud 37%), curriculum alignments, and industry FDP collaboration proposals.
                </p>
              </div>

              <button
                onClick={() => handleLaunchRole('faculty', '/faculty/dashboard')}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Launch Faculty Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Admin Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                    Institution
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Dean of Placements</h3>
                <p className="text-xs font-semibold text-purple-700 mt-0.5">
                  Academic Council & Training
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Closed-loop intelligence: deploys "Docker Bootcamp" for 124 students, yielding a projected +12% cohort readiness gain.
                </p>
              </div>

              <button
                onClick={() => handleLaunchRole('admin', '/admin/intelligence')}
                className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Launch Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CENTRAL PRODUCT STATEMENT & INNOVATION PILLARS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Central Statement */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm text-center max-w-4xl mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
              Core Product Mission
            </h3>
            <blockquote className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              "SkillBridge AI is an AI-powered, evidence-based Academia–Industry Skill Intelligence Ecosystem that continuously maps student competencies against industry requirements, identifies skill gaps, recommends personalized upskilling, connects students with relevant internships and jobs, and converts industry outcomes into actionable academic intelligence."
            </blockquote>
          </div>

          {/* 4 Innovation Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 w-fit mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Dynamic AI Skill Twin
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continually evolves through verified assessment tests, project commits, and course completions rather than static resumes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                What-If Career Simulator
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Allows students to forecast placement probabilities and prioritize learning sprints by Return on Effort (Impact per week).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-3 rounded-xl bg-purple-50 text-purple-600 w-fit mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                5-Factor Explainable Match
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminates opaque black-box candidate ranking with transparent weighted scores across skills, tests, projects, and evidence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600 w-fit mb-4">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Closed-Loop Intelligence
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corporate post-interview feedback feeds directly into faculty analytics to trigger automated institutional bootcamps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOTYPE METRICS SECTION */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
              Demo Metrics & Prototype Dataset
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">1,248</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">Students Modeled</p>
              <p className="text-[10px] text-slate-400">Prototype Dataset</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">42</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">Industry Partners</p>
              <p className="text-[10px] text-slate-400">Simulated Network</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-700">684</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">Active Opportunities</p>
              <p className="text-[10px] text-slate-400">Marketplace Demo</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">76%</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">Avg. Skill Match</p>
              <p className="text-[10px] text-slate-400">Cohort Benchmark</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">
                  SkillBridge<span className="text-blue-500">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-semibold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Smart India Hackathon 2026 Prototype • Ministry of Ayush / All India Institute of Ayurveda
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <Link href="/resume-analyzer" className="hover:text-white transition-colors">
                Analyze Resume
              </Link>
              <Link href="/student/skill-twin" className="hover:text-white transition-colors">
                Skill Twin
              </Link>
              <Link href="/student/simulator" className="hover:text-white transition-colors">
                Simulator
              </Link>
              <Link href="/industry/candidates" className="hover:text-white transition-colors">
                Recruiter Portal
              </Link>
              <Link href="/admin/intelligence" className="hover:text-white transition-colors">
                Academic Loop
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 SkillBridge AI • Developed for Smart India Hackathon 2026.</p>
            <p>Built with Next.js, TypeScript, Tailwind CSS, Lucide & Recharts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
