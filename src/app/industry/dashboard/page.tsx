'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { CANDIDATE_EVALUATIONS, INDUSTRY_SKILL_DEMANDS } from '@/data/seedData';
import {
  Building2,
  Users,
  Briefcase,
  Layers,
  TrendingUp,
  PlusCircle,
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function IndustryDashboardPage() {
  const { opportunities } = useApp();

  const activeJobs = opportunities.filter((o) => o.type === 'Full-time').length;
  const activeInternships = opportunities.filter((o) => o.type === 'Internship').length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-amber-950 text-amber-400 border border-amber-800/60">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Industry Talent & Hiring Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Talent Acquisition Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Active partner account: <strong className="text-amber-300 font-semibold">Razorpay Software / TechCorp Labs</strong>. Access AI-matched student candidates, inspect market skill graphs, and calibrate hiring requirements.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/industry/post-opportunity"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Role</span>
            </Link>
            <Link
              href="/industry/skill-graph"
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Network className="w-4 h-4 text-emerald-400" />
              <span>Skill Graph</span>
            </Link>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Active Jobs</span>
            <p className="text-3xl font-black text-white mt-2">{activeJobs + 4}</p>
            <p className="text-[11px] text-slate-500 mt-1">Across Backend & Cloud units</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Active Internships</span>
            <p className="text-3xl font-black text-white mt-2">{activeInternships + 8}</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 18 candidates matched
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Total Applications</span>
            <p className="text-3xl font-black text-white mt-2">142</p>
            <p className="text-[11px] text-slate-500 mt-1">Filtered via AI Skill Twin</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Shortlisted Candidates</span>
            <p className="text-3xl font-black text-amber-400 mt-2">24</p>
            <p className="text-[11px] text-slate-400 mt-1">Readiness score &gt; 75%</p>
          </div>
        </div>

        {/* Candidate Matches & Demand Snippet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Candidate Matches */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  Top Matched Student Candidates
                </h2>
                <p className="text-xs text-slate-400">Ranked for Backend Developer Intern opening</p>
              </div>
              <Link
                href="/industry/candidates"
                className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View All Ranked ({CANDIDATE_EVALUATIONS.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {CANDIDATE_EVALUATIONS.slice(0, 3).map((cand) => (
                <div
                  key={cand.candidateId}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{cand.name}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                          {cand.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{cand.role}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {cand.matchedSkills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Link
                      href="/industry/candidates"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                    >
                      Why this candidate? →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Demand Snippet */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Top Skill Trends
                </h2>
                <Link href="/industry/demand" className="text-xs text-emerald-400 hover:underline">
                  Full Analytics →
                </Link>
              </div>

              <div className="space-y-2.5">
                {INDUSTRY_SKILL_DEMANDS.slice(0, 5).map((d) => (
                  <div
                    key={d.skill}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{d.skill}</p>
                      <p className="text-[10px] text-slate-400">{d.demandCount} job postings</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-0.5">
                      ↑ {d.growth}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link
                href="/industry/feedback"
                className="w-full py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-800/60 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Submit Post-Interview Feedback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
