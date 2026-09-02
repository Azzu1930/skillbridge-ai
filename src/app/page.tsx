'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Sparkles,
  ArrowRight,
  Target,
  Sliders,
  Cpu,
  Workflow,
  GraduationCap,
  Building2,
  Users,
  Layers,
  CheckCircle2,
  TrendingUp,
  Award,
  Play,
  FileCheck2,
  Compass,
  Briefcase,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setIsDemoTourOpen } = useApp();

  const handleLaunchRole = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
  };

  const handleStartTour = () => {
    setRole('student');
    setIsDemoTourOpen(true);
    router.push('/student/skill-twin');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
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
              <span>5-Min Demo Tour</span>
            </button>
            <button
              onClick={() => handleLaunchRole('student', '/student/dashboard')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-all shadow-md shadow-indigo-500/20"
            >
              <span>Launch Demo</span>
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
              Smart India Hackathon 2024–26 Prototype • Problem SIH26044
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Bridging the Gap Between{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Academia and Industry
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An AI-powered skill intelligence platform that maps student capabilities to evolving industry requirements, identifies skill gaps, recommends personalized growth paths, and connects talent with meaningful opportunities.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLaunchRole('student', '/student/dashboard')}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleStartTour}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-700/60 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>See How It Works (5-Min Tour)</span>
            </button>
          </div>

          {/* Quick Demo Persona Switcher Banner */}
          <div className="mt-14 max-w-4xl mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur text-left">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Select Instant Demo Persona (No Login Required)
              </span>
              <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Demo Mode — Sample Data
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Student Card */}
              <button
                onClick={() => handleLaunchRole('student', '/student/dashboard')}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/80 text-left transition-all group hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">68% Ready</span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Student Demo
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Abdul Aziz • Backend Track
                </p>
              </button>

              {/* Industry Card */}
              <button
                onClick={() => handleLaunchRole('industry', '/industry/dashboard')}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/80 text-left transition-all group hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded">Partner</span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-amber-300">
                  Industry Demo
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Razorpay • Candidate Matcher
                </p>
              </button>

              {/* Faculty Card */}
              <button
                onClick={() => handleLaunchRole('faculty', '/faculty/dashboard')}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/80 text-left transition-all group hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">Dept Head</span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-300">
                  Faculty Demo
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dr. Ramesh • CSE Gaps & FDP
                </p>
              </button>

              {/* Admin Card */}
              <button
                onClick={() => handleLaunchRole('admin', '/admin/dashboard')}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/80 text-left transition-all group hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800/60">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded">Closed-Loop</span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-purple-300">
                  Admin Demo
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Institutional Dean • Training
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full">
              The Critical Disconnect
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Traditional Job Boards & Campus Placements Fail
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Students don’t just need job links. They need precise diagnostic intelligence on what skills they have, what industry demands, and actionable steps to bridge the deficit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/40 w-fit mb-3">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Student Skill Gap</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Students memorize academic curricula without knowing if their practical programming stack aligns with modern cloud and API architecture expectations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/40 w-fit mb-3">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Industry Talent Gap</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Enterprises receive thousands of keyword-stuffed resumes but spend 3–6 months retraining newly hired graduates before they are deployable to production.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-800/40 w-fit mb-3">
                <GraduationCap className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Academia Disconnect</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Syllabi change slowly every 3–5 years, while technologies (FastAPI, Docker, Generative AI) evolve within quarters, leaving universities unaware of cohort deficits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 w-fit mb-3">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Fragmented Data</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Placement offices track offers on disconnected spreadsheets with zero post-interview feedback flowing back into academic faculty training plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Flow Section */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
              The Closed-Loop Solution
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A Continuous Skill Intelligence Ecosystem
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              MAP → ANALYZE → UPSKILL → MATCH → PLACE → IMPROVE
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'MAP', desc: 'AI Student Skill Twin with verified evidence', color: 'border-indigo-500/40' },
              { step: '02', title: 'ANALYZE', desc: 'Pinpoint role deficits vs live market benchmarks', color: 'border-sky-500/40' },
              { step: '03', title: 'UPSKILL', desc: 'Simulator & personalized milestone roadmap', color: 'border-emerald-500/40' },
              { step: '04', title: 'MATCH', desc: 'Multi-vector candidate fit with transparent scoring', color: 'border-amber-500/40' },
              { step: '05', title: 'PLACE', desc: 'Direct internship & career conversion pipeline', color: 'border-purple-500/40' },
              { step: '06', title: 'IMPROVE', desc: 'Company feedback auto-triggers faculty training', color: 'border-pink-500/40' },
            ].map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-xl bg-slate-900/80 border ${s.color} flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">{s.step}</span>
                  <h3 className="text-sm font-bold text-white mt-1">{s.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Innovation Pillars Section */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-950/60 border border-indigo-800/40 px-3 py-1 rounded-full">
              Core Innovations
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered to Solve SIH26044
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">1. AI Student Skill Twin</h3>
                    <p className="text-xs text-indigo-400 font-medium">Dynamic, Evidence-Grounded Competency Profile</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of static resume keywords, each skill score (e.g. Python 87%, SQL 78%) is derived from code repos, technical assessments, peer reviews, and verified certifications.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Tested on Abdul Aziz</span>
                <Link href="/student/skill-twin" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>Explore Skill Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">2. Career Readiness Simulator</h3>
                    <p className="text-xs text-emerald-400 font-medium">Model-Based Interactive What-If Projections</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The killer demonstration feature: students check off upcoming learning sprints (FastAPI, Docker, Capstone) and dynamically observe readiness climb from 68% to 91%.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Fastest Path Algorithm</span>
                <Link href="/student/simulator" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800/60 text-amber-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">3. Industry Skill Graph & Candidate Matcher</h3>
                    <p className="text-xs text-amber-400 font-medium">Explainable Multi-Vector Candidate Ranking</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recruiters visualize the interconnected web of roles, skills, and tools. Ranked candidate lists feature transparent &quot;Why this candidate?&quot; breakdowns eliminating hiring bias.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Interactive Visual Graph</span>
                <Link href="/industry/skill-graph" className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  <span>View Skill Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-400">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">4. Closed-Loop Academia Intelligence</h3>
                    <p className="text-xs text-purple-400 font-medium">Industry Feedback → Automated Faculty Interventions</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Completes the circuit: company feedback identifying weaknesses (e.g. Docker / REST idempotency) directly generates institutional bootcamps to elevate student cohorts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Automated Training Generator</span>
                <Link href="/admin/intelligence" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <span>View Closed Loop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Prototype Metrics */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-emerald-400 mb-6">
            Verified Prototype & Benchmark Statistics
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">1,248</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Students Modeled</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">42</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Industry Partners</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">684</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Active Opportunities</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">76%</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Average Skill Match</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SkillBridge AI</span>
            <span>• Smart India Hackathon Prototype (SIH26044)</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portfolio/demo-student" className="hover:text-indigo-300">
              Public Student Portfolio
            </Link>
            <Link href="/assistant" className="hover:text-indigo-300">
              AI Career Assistant
            </Link>
            <button onClick={handleStartTour} className="hover:text-emerald-300">
              Demo Tour
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
