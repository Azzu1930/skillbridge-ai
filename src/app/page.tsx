'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Briefcase,
  Layers,
  Target,
  Download,
  Building2,
  GraduationCap,
  Play,
  UploadCloud,
  CheckCircle2,
  Cpu,
  Sliders,
  Award,
  FileCode,
  Lock,
  GitCompare,
  Workflow,
  BookOpen,
  Landmark,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setIsDemoTourOpen, setDemoTourStep, isAuthenticated, currentUser, setSessionMode } = useApp();

  const handleLaunchRole = (role: UserRole, targetRoute: string) => {
    setRole(role);
    setSessionMode('demo');
    router.push(targetRoute);
  };

  const handleStartTour = () => {
    setDemoTourStep(0);
    setIsDemoTourOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7fcf8] text-textPrimary selection:bg-green-600 selection:text-white flex flex-col">
      {/* Top Navbar for Landing Page */}
      <header className="sticky top-0 z-40 border-b border-borderGreen bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-xs group-hover:bg-green-700 transition-colors">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base text-textPrimary tracking-tight">
                  SkillBridge<span className="text-green-600">AI</span>
                </span>
                <p className="text-[11px] text-muted hidden sm:block font-medium">
                  Connecting Skills, Academia and Industry
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted">
            <a href="#how-it-works" className="hover:text-green-700 transition-colors">
              How It Works
            </a>
            <a href="#roles" className="hover:text-green-700 transition-colors">
              Portals & Roles
            </a>
            <a href="#architecture" className="hover:text-green-700 transition-colors">
              Closed-Loop System
            </a>
            <a href="#deliverables" className="hover:text-green-700 transition-colors">
              Reports & Audits
            </a>
            <Link href="/student/opportunities" className="hover:text-green-700 transition-colors">
              Opportunities
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href={
                    currentUser?.role === 'faculty'
                      ? '/faculty/dashboard'
                      : currentUser?.role === 'industry'
                      ? '/industry/dashboard'
                      : currentUser?.role === 'institution'
                      ? '/institution/dashboard'
                      : '/student/dashboard'
                  }
                  className="px-3.5 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs"
                >
                  My Portal
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-muted hover:text-textPrimary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all"
                >
                  Register
                </Link>
                <Link
                  href="/resume-analyzer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-xs hover:shadow transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Analyze Resume</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-borderGreen bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline / Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-borderGreen text-muted text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-800 font-bold">Enterprise Platform</span>
            <span className="text-slate-300">•</span>
            <span>AI-Powered Career Intelligence & Placement Collaboration</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-textPrimary tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Connect Skills.{' '}
            <span className="text-green-600 underline decoration-green-300 underline-offset-8">
              Discover Opportunities.
            </span>{' '}
            Build Careers.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            SkillBridge AI connects students, faculty, institutions and industry through intelligent skill mapping,
            personalized development, internships and placement collaboration.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/student/opportunities"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-green-50 text-textPrimary font-bold text-sm border border-borderGreen shadow-xs transition-all"
            >
              <Briefcase className="w-4 h-4 text-green-600" />
              <span>Explore Opportunities</span>
            </Link>

            <Link
              href="/resume-analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 font-bold text-sm border border-green-200 shadow-xs transition-all"
            >
              <UploadCloud className="w-4 h-4 text-green-600" />
              <span>Analyze Resume</span>
            </Link>
          </div>

          {/* Value proposition badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Multi-Role Platform (Students, Faculty, Industry, Institutions)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Transparent AI Skill Matching
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Word (.docx) & JSON Audit Reports
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Client-Side Data Privacy
            </span>
          </div>
        </div>
      </section>

      {/* 4 ROLES REGISTRATION CALLOUT SECTION */}
      <section id="roles" className="py-16 sm:py-20 bg-white border-b border-borderGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">
              Collaborative Ecosystem
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              Designed for Every Stakeholder
            </p>
            <p className="text-sm text-muted mt-2">
              Select your role to unlock targeted career intelligence, mentorship tools, recruitment pipelines, or institutional analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Students & Job Seekers
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Extract verified skills from your resume, detect placement gaps, take verified assessments, and apply to matched internships.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>✓ AI Skill Twin & Readiness Score</p>
                  <p>✓ Personalized Learning Roadmaps</p>
                  <p>✓ Curated Internships & Placements</p>
                  <p>✓ Verified Public Portfolio</p>
                </div>
              </div>
              <Link
                href="/register?role=student"
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Register as Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Faculty Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Faculty & Mentors
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Monitor department student talent, identify cohort skill deficits, publish research opportunities, and guide student capstones.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>✓ Department Talent Analytics</p>
                  <p>✓ Real-Time Cohort Gap Analysis</p>
                  <p>✓ Post Research & FDP Postings</p>
                  <p>✓ Industry Collaboration Loop</p>
                </div>
              </div>
              <Link
                href="/register?role=faculty"
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Register as Faculty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Industry Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Industry & Employers
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Post internships and entry-level positions, discover pre-screened talent with explainable matching, and shape college curricula.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>✓ Post Verified Opportunities</p>
                  <p>✓ Transparent AI Candidate Matching</p>
                  <p>✓ Direct Applicant Management</p>
                  <p>✓ Curriculum Feedback Channel</p>
                </div>
              </div>
              <Link
                href="/register?role=industry"
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Register as Industry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Institution Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm mb-4">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Institutions & Leadership
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Track institution-wide placement readiness, benchmark departmental performance, and generate automated training plans.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>✓ Executive Placement Dashboard</p>
                  <p>✓ Centralized Student Directory</p>
                  <p>✓ Industry Demand Feedback Loop</p>
                  <p>✓ Automated Training Planner</p>
                </div>
              </div>
              <Link
                href="/register?role=institution"
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Register as Institution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8-STEP WORKFLOW PIPELINE SECTION */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-canvas border-b border-borderGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">
              Continuous Intelligence Pipeline
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              8-Step Career & Skill Intelligence Lifecycle
            </p>
            <p className="text-sm text-muted mt-2">
              How SkillBridge AI transforms static candidate profiles into verified competency outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Resume Ingestion',
                desc: 'Upload PDF, DOCX, or TXT documents parsed safely in-browser with complete privacy.',
                icon: UploadCloud,
              },
              {
                step: '02',
                title: 'Skill Extraction',
                desc: 'Extract technical tools, frameworks, and contextual evidence against a 150+ technology taxonomy.',
                icon: Cpu,
              },
              {
                step: '03',
                title: 'Role Benchmarking',
                desc: 'Cross-reference detected skills against verified industry role standards and market demands.',
                icon: Layers,
              },
              {
                step: '04',
                title: 'Skill Gap Diagnostic',
                desc: 'Isolate critical competency gaps blocking placement vs moderate enhancement areas.',
                icon: Target,
              },
              {
                step: '05',
                title: 'Readiness Model',
                desc: 'Deterministic 5-factor mathematical readiness score (0-100%) calibrated per track.',
                icon: Sliders,
              },
              {
                step: '06',
                title: 'Action Roadmap',
                desc: 'Week-by-week actionable learning roadmap with targeted engineering projects.',
                icon: Award,
              },
              {
                step: '07',
                title: 'Opportunity Matching',
                desc: 'Transparent matching algorithm pairing candidates to industry postings with 1-click apply.',
                icon: Briefcase,
              },
              {
                step: '08',
                title: 'Official Deliverables',
                desc: 'Export styled Microsoft Word (.docx) audit reports and structured JSON data.',
                icon: Download,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-borderGreen hover:border-green-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-textPrimary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSED-LOOP ACADEMIA × INDUSTRY ARCHITECTURE */}
      <section id="architecture" className="py-16 sm:py-20 bg-white border-b border-borderGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">
              System Architecture
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              Closed-Loop Academia–Industry Intelligence
            </p>
            <p className="text-sm text-muted mt-2">
              Transforming traditional education into an agile, data-driven feedback system connecting corporate demand directly to academic interventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen space-y-3">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-textPrimary">Student Skill Profiling</h4>
              <p className="text-xs text-muted leading-relaxed">
                Students upload resumes and complete verified benchmark assessments to create tamper-resistant digital Skill Twins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen space-y-3">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-textPrimary">Cohort Gap Analytics</h4>
              <p className="text-xs text-muted leading-relaxed">
                Faculty dashboards aggregate student performance to spot institutional deficits in Docker, Cloud APIs, and system design.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen space-y-3">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-textPrimary">Curriculum Adaptation</h4>
              <p className="text-xs text-muted leading-relaxed">
                Universities deploy targeted bootcamp interventions and faculty development programs aligned with hiring partner feedback.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen space-y-3">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-textPrimary">Industry Recruitment</h4>
              <p className="text-xs text-muted leading-relaxed">
                Corporate partners discover verified candidates through transparent AI fit scores, cutting hiring cycles from months to days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PERSISTENT REPORTS & DELIVERABLES SHOWCASE */}
      <section id="deliverables" className="py-16 sm:py-20 bg-canvas border-b border-borderGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white shadow-lg border border-green-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-semibold text-green-200">
                  <Download className="w-3.5 h-3.5" />
                  <span>Official Deliverables</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Publication-Grade Career Intelligence Deliverables
                </h2>
                <p className="text-sm text-green-100 leading-relaxed">
                  SkillBridge AI does not just display results on screen — it compiles complete 40-attribute
                  career intelligence deliverables ready for Microsoft Word (.docx), JSON data integration, and
                  institutional accreditation audits.
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                    <FileText className="w-4 h-4 text-green-300 shrink-0" />
                    <span>Formatted Tables & Word Styling</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                    <FileCode className="w-4 h-4 text-green-300 shrink-0" />
                    <span>Structured JSON Schema</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                    <Lock className="w-4 h-4 text-green-300 shrink-0" />
                    <span>Cryptographic User Isolation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                    <GitCompare className="w-4 h-4 text-green-300 shrink-0" />
                    <span>Multi-Version Diff Tracking</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href="/resume-analyzer"
                    className="px-5 py-2.5 bg-white hover:bg-green-50 text-green-900 rounded-xl font-bold text-xs transition-all shadow-xs"
                  >
                    Analyze Resume Now
                  </Link>
                  <Link
                    href="/reports/view"
                    className="px-5 py-2.5 bg-green-950/60 hover:bg-green-950 text-green-100 border border-white/20 rounded-xl font-medium text-xs transition-all shadow-xs"
                  >
                    Preview Sample Report
                  </Link>
                </div>
              </div>

              {/* Deliverable Mock Preview */}
              <div className="bg-white rounded-2xl p-6 text-textPrimary shadow-xl border border-borderGreen space-y-4">
                <div className="flex items-center justify-between border-b border-borderGreen pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">Deliverable Preview</span>
                    <h4 className="text-sm font-bold text-textPrimary">Career_Report_Abdul_Aziz.docx</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green-100 text-green-800">
                    v1.0 (68% Readiness)
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-canvas border border-borderGreen flex justify-between">
                    <span className="text-muted">1. Candidate Overview</span>
                    <span className="font-semibold text-textPrimary">Abdul Aziz (CSE)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas border border-borderGreen flex justify-between">
                    <span className="text-muted">2. Verified Skills Table</span>
                    <span className="font-semibold text-textPrimary">14 Technologies Extracted</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas border border-borderGreen flex justify-between">
                    <span className="text-muted">3. Critical Skill Gaps</span>
                    <span className="font-semibold text-amber-700">Redis, CI/CD Pipelines</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas border border-borderGreen flex justify-between">
                    <span className="text-muted">4. Deterministic Breakdown</span>
                    <span className="font-semibold text-green-700">5-Factor Scored (68/100)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas border border-borderGreen flex justify-between">
                    <span className="text-muted">5. Matched Opportunities</span>
                    <span className="font-semibold text-textPrimary">Nexus Cloud (89% Fit)</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-muted italic">
                    Exportable directly from browser using OpenXML specification
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE DEMO PORTALS (SANDBOX FOR EVALUATORS) */}
      <section id="demo" className="py-16 sm:py-20 bg-white border-b border-borderGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">
              Guest Sandbox Explorer
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              Explore Demo Portals Without Registering
            </p>
            <p className="text-sm text-muted mt-2">
              Test live interactive workflows across all 4 role personas with pre-populated datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student Demo Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm">
                    AA
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 uppercase">
                    Demo Student
                  </span>
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Abdul Aziz
                </h3>
                <p className="text-xs text-muted mt-0.5">B.Tech CSE • NIT</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>• Readiness Score: <strong className="text-textPrimary">68%</strong></p>
                  <p>• Target Role: <strong className="text-textPrimary">Backend Developer</strong></p>
                  <p>• Verified Skills: <strong className="text-textPrimary">14 Technologies</strong></p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchRole('student', '/student/dashboard')}
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Launch Student Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Industry Demo Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 uppercase">
                    Demo Industry
                  </span>
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  NexaTech Cloud Labs
                </h3>
                <p className="text-xs text-muted mt-0.5">Talent Acquisition</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>• Active Positions: <strong className="text-textPrimary">6 Openings</strong></p>
                  <p>• Matched Pool: <strong className="text-textPrimary">8 Candidates</strong></p>
                  <p>• AI Ranking: <strong className="text-textPrimary">Explainable Fit</strong></p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchRole('industry', '/industry/dashboard')}
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Launch Industry Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Faculty Demo Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 uppercase">
                    Demo Faculty
                  </span>
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Dr. Ramesh Kumar
                </h3>
                <p className="text-xs text-muted mt-0.5">HOD Computer Science</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>• Department Students: <strong className="text-textPrimary">142 Enrolled</strong></p>
                  <p>• Active Interventions: <strong className="text-textPrimary">4 Cohorts</strong></p>
                  <p>• Top Identified Gap: <strong className="text-textPrimary">Docker & Redis</strong></p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchRole('faculty', '/faculty/dashboard')}
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Launch Faculty Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Institution Demo Card */}
            <div className="p-6 rounded-2xl bg-canvas border border-borderGreen hover:border-green-400 transition-all shadow-xs flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 uppercase">
                    Demo Institution
                  </span>
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-green-700 transition-colors">
                  Dean of Academics
                </h3>
                <p className="text-xs text-muted mt-0.5">Institutional Analytics</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted">
                  <p>• Placement Rate: <strong className="text-textPrimary">78.4%</strong></p>
                  <p>• Industry Partners: <strong className="text-textPrimary">28 Companies</strong></p>
                  <p>• Skill Index: <strong className="text-textPrimary">72.6 / 100</strong></p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchRole('institution', '/institution/dashboard')}
                className="mt-6 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Launch Institution Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white border-t border-borderGreen text-xs text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-textPrimary">SkillBridge AI</span>
            <span className="hidden sm:inline">•</span>
            <span>Connecting Skills, Academia and Industry</span>
            <span className="hidden sm:inline">•</span>
            <span>AI-Powered Career Intelligence & Placement Collaboration</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-green-700 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-green-700 transition-colors">Register</Link>
            <Link href="/resume-analyzer" className="hover:text-green-700 transition-colors">Resume Analyzer</Link>
            <Link href="/student/opportunities" className="hover:text-green-700 transition-colors">Opportunities</Link>
            <Link href="/reports" className="hover:text-green-700 transition-colors">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
