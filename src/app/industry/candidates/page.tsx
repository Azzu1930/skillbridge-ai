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
  ShieldCheck,
  Award,
  Code,
  Briefcase,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

export default function CandidateMatchingPage() {
  const { applications, updateApplicationStatus } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateEvaluation | null>(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('Backend Developer');
  const [shortlistedMap, setShortlistedMap] = useState<Record<string, boolean>>({
    std_demo_abdul: true,
  });

  const handleShortlist = (candId: string) => {
    setShortlistedMap((prev) => ({ ...prev, [candId]: true }));
    // Find matching application if any
    const targetApp = applications.find((a) => a.opportunityId === 'opp_1');
    if (targetApp) {
      updateApplicationStatus(targetApp.id, 'Shortlisted');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Users className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Explainable AI Candidate Ranking Engine
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                AI Candidate Matching
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Role: <strong className="text-slate-900">{selectedRoleFilter}</strong> • Required Competencies: <span className="font-mono text-blue-600 font-semibold">Python, FastAPI, REST APIs, SQL, Docker</span>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl font-bold">
                5 Top Ranked Candidates
              </span>
            </div>
          </div>

          {/* Formula Transparency Callout */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-900">Deterministic 5-Factor Scoring Model:</span>
              <span className="text-slate-500 font-mono text-[11px]">
                Skill Compatibility (50%) + Assessment (15%) + Projects (15%) + Experience (10%) + Evidence Strength (10%)
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-mono font-medium">
              Transparent Model • Zero Black-Box Screening
            </span>
          </div>
        </div>

        {/* Candidate Cards List */}
        <div className="space-y-4">
          {CANDIDATE_EVALUATIONS.map((cand, index) => {
            const isShortlisted = shortlistedMap[cand.candidateId];

            return (
              <div
                key={cand.candidateId}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 transition-all shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
                    />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-black text-slate-700 flex items-center justify-center shadow-sm">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-base font-bold text-slate-900">{cand.name}</h2>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                        {cand.matchScore}% Overall Fit
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Twin Readiness: <strong className="text-slate-900">{cand.readinessScore}%</strong>
                      </span>
                      {isShortlisted && (
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Shortlisted
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-blue-600 font-medium">{cand.role}</p>

                    {/* Skills tags */}
                    <div className="space-y-1 pt-1">
                      <div className="flex flex-wrap items-center gap-1 text-xs">
                        <span className="text-[10px] text-emerald-700 font-semibold">Matched:</span>
                        {cand.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-1 text-xs">
                        <span className="text-[10px] text-amber-700 font-semibold">Deficits:</span>
                        {cand.missingSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-mono"
                          >
                            ⚠ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5-Factor Metrics Snippets */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-slate-600 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Skill Match</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">
                      {cand.scoreBreakdown.skillCompatibility}/50
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Assessment</span>
                    <p className="font-mono font-bold text-emerald-600 mt-0.5">
                      {cand.scoreBreakdown.assessmentPerformance}/15
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Projects</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">
                      {cand.scoreBreakdown.projectRelevance}/15
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Experience</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">
                      {cand.scoreBreakdown.experience}/10
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Evidence</span>
                    <p className="font-mono font-bold text-blue-600 mt-0.5">
                      {cand.scoreBreakdown.evidenceStrength}/10
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCandidate(cand)}
                    className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why this candidate?</span>
                  </button>

                  <button
                    onClick={() => handleShortlist(cand.candidateId)}
                    disabled={isShortlisted}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isShortlisted
                        ? 'bg-slate-100 text-slate-400 cursor-default border border-slate-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                  </button>

                  {cand.candidateId === 'std_demo_abdul' && (
                    <Link
                      href="/portfolio/demo-student"
                      target="_blank"
                      className="px-4 py-1 text-center text-[11px] text-blue-600 hover:underline flex items-center justify-center gap-1"
                    >
                      <span>Inspect Portfolio</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explainable AI Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-blue-600 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h3>
                    <p className="text-xs text-blue-600 font-mono font-medium">
                      {selectedCandidate.matchScore}% Match for {selectedRoleFilter}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 5-Factor Score Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-2">
                  5-Factor Mathematical Score Breakdown (Total: {selectedCandidate.matchScore}/100)
                </span>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block">Skills</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCandidate.scoreBreakdown.skillCompatibility}/50</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block">Test</span>
                    <span className="font-mono font-bold text-emerald-600">{selectedCandidate.scoreBreakdown.assessmentPerformance}/15</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block">Projects</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCandidate.scoreBreakdown.projectRelevance}/15</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block">Experience</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCandidate.scoreBreakdown.experience}/10</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block">Evidence</span>
                    <span className="font-mono font-bold text-blue-600">{selectedCandidate.scoreBreakdown.evidenceStrength}/10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    1. Skill Competency Evidence
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedCandidate.explanation.skillMatchRatio}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    2. Code & Project Artifact Verification
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedCandidate.explanation.projectEvidence}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    3. Standardized Assessment Proof
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedCandidate.explanation.assessmentProof}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hiring Recommendation & Onboarding Velocity
                  </p>
                  <p className="text-emerald-900 font-medium leading-relaxed">
                    {selectedCandidate.explanation.fitRecommendation}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/industry/feedback"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Submit Interview Feedback →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
