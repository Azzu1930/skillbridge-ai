'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { CANDIDATE_EVALUATIONS } from '@/data/seedData';
import { CandidateEvaluation } from '@/types';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Award,
  Code,
  Briefcase,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function CandidateMatchingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateEvaluation | null>(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('Backend Developer Intern');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-amber-950 text-amber-400 border border-amber-800/60">
                  <Users className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Explainable AI Candidate Ranking
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Candidate Matching
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Evaluating candidate fit against: <strong className="text-amber-300">{selectedRoleFilter}</strong>. Transparent multi-vector scoring breaks down why each applicant was shortlisted.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-xl">
                4 Top Shortlisted Candidates
              </span>
            </div>
          </div>
        </div>

        {/* Candidate Cards List */}
        <div className="space-y-4">
          {CANDIDATE_EVALUATIONS.map((cand, index) => (
            <div
              key={cand.candidateId}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 transition-all shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Candidate Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="relative">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                  />
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-black text-amber-400 flex items-center justify-center shadow">
                    #{index + 1}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-base font-bold text-white">{cand.name}</h2>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                      {cand.matchScore}% Overall Fit
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Twin Readiness: <strong className="text-white">{cand.readinessScore}%</strong>
                    </span>
                  </div>

                  <p className="text-xs text-indigo-300 font-medium">{cand.role}</p>

                  {/* Skills tags */}
                  <div className="space-y-1 pt-1">
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                      <span className="text-[10px] text-emerald-400 font-semibold">Matched:</span>
                      {cand.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                      <span className="text-[10px] text-amber-400 font-semibold">Deficits:</span>
                      {cand.missingSkills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40"
                        >
                          ⚠ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Snippets */}
              <div className="flex items-center gap-6 text-xs text-slate-300 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Projects</span>
                  <p className="font-bold text-white mt-0.5">{cand.projectsCount} verified</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Assessment</span>
                  <p className="font-bold text-emerald-400 mt-0.5">{cand.assessmentScore}% score</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Experience</span>
                  <p className="font-bold text-white mt-0.5">{cand.experienceYears} yrs</p>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCandidate(cand)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why this candidate?</span>
                </button>
                <Link
                  href="/portfolio/demo-student"
                  target="_blank"
                  className="px-4 py-1.5 text-center text-xs text-slate-400 hover:text-white"
                >
                  Inspect Portfolio →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explainable AI Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedCandidate.name}</h3>
                    <p className="text-xs text-amber-400 font-mono">
                      {selectedCandidate.matchScore}% Match for {selectedRoleFilter}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    1. Skill Competency Evidence
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedCandidate.explanation.skillMatchRatio}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    2. Code & Project Artifact Verification
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedCandidate.explanation.projectEvidence}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    3. Standardized Assessment Proof
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedCandidate.explanation.assessmentProof}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-1">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hiring Recommendation & Onboarding Velocity
                  </p>
                  <p className="text-emerald-200 font-medium leading-relaxed">
                    {selectedCandidate.explanation.fitRecommendation}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <Link
                  href="/industry/feedback"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Schedule Technical Interview
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
