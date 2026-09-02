'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { calculateSkillGap } from '@/lib/ai-engine';
import { TARGET_ROLE_BENCHMARKS } from '@/data/seedData';
import {
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Sparkles,
  Info,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export default function SkillGapPage() {
  const { student } = useApp();
  const [selectedRole, setSelectedRole] = useState(student.targetRole || 'Backend Developer');

  const gapAnalysis = calculateSkillGap(student.skills, selectedRole);
  const benchmark = TARGET_ROLE_BENCHMARKS.find((b) => b.role === selectedRole) || TARGET_ROLE_BENCHMARKS[0];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Target className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Pillar 2: AI Skill Gap Diagnostic
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Skill Gap Analysis
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Evaluates candidate competencies against current market specifications. Identifies exact technology deficits and provides root-cause explanations for employer expectations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/simulator"
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open in Simulator</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {TARGET_ROLE_BENCHMARKS.map((bm) => (
            <button
              key={bm.role}
              onClick={() => setSelectedRole(bm.role)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRole === bm.role
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {bm.role}
            </button>
          ))}
        </div>

        {/* Role Match Overview Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Target Role Benchmark
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{benchmark.role}</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{benchmark.description}</p>
              <p className="text-xs font-mono text-emerald-400 mt-1">
                Typical Starting Package: {benchmark.averageStartingSalary}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Current Match</p>
                <p className="text-3xl font-black text-white mt-0.5">{gapAnalysis.overallMatch}%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-800" />
              <div className="text-[11px] space-y-1">
                <p className="text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> {gapAnalysis.acquiredCount} Acquired
                </p>
                <p className="text-amber-400 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3 h-3" /> {gapAnalysis.inProgressCount} In Progress
                </p>
                <p className="text-red-400 flex items-center gap-1 font-medium">
                  <XCircle className="w-3 h-3" /> {gapAnalysis.missingCount} Missing
                </p>
              </div>
            </div>
          </div>

          {/* Current vs Target Skills Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Current Student Skills (Matches)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {student.skills.map((s) => (
                  <span
                    key={s.id}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 flex items-center gap-1"
                  >
                    ✓ {s.name} ({s.score}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Target Role Requirements Delta
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {gapAnalysis.gapItems.map((g) => (
                  <span
                    key={g.skill}
                    className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                      g.status === 'Acquired'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                        : g.status === 'In Progress'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        : 'bg-red-950/60 text-red-300 border-red-800/60'
                    }`}
                  >
                    {g.status === 'Acquired' ? '✓' : g.status === 'In Progress' ? '△' : '✗'} {g.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Gap Breakdown with Qualitative Reasons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Skill Gap Breakdown & Explanation
              </h2>
              <p className="text-xs text-slate-400">
                Detailed diagnosis explaining WHY industry recruiters require these competencies
              </p>
            </div>
            <Link
              href="/student/roadmap"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Learning Roadmap →</span>
            </Link>
          </div>

          <div className="space-y-3">
            {gapAnalysis.gapItems.map((item) => (
              <div
                key={item.skill}
                className={`p-5 rounded-2xl border transition-all ${
                  item.status === 'Missing'
                    ? 'bg-slate-900/90 border-red-900/40'
                    : item.status === 'In Progress'
                    ? 'bg-slate-900/80 border-amber-900/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-1.5 rounded-lg ${
                        item.status === 'Acquired'
                          ? 'bg-emerald-950 text-emerald-400'
                          : item.status === 'In Progress'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {item.status === 'Acquired' && <CheckCircle2 className="w-4 h-4" />}
                      {item.status === 'In Progress' && <AlertTriangle className="w-4 h-4" />}
                      {item.status === 'Missing' && <XCircle className="w-4 h-4" />}
                    </span>
                    <div>
                      <span className="font-bold text-sm text-white">{item.skill}</span>
                      <span className="text-[10px] ml-2 font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        Importance: {item.importance}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-400">
                      Current: <strong className="text-white">{item.currentScore}%</strong>
                    </span>
                    <span className="text-slate-400">
                      Target: <strong className="text-indigo-300">{item.targetScore}%</strong>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'Acquired'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : item.status === 'In Progress'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-red-950 text-red-300 border border-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Qualitative Reason */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-slate-100">Why this gap matters: </strong>
                    {item.gapReason}
                  </p>
                  <p className="text-indigo-300 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <strong>Recommended Next Step: </strong>
                    {item.recommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
