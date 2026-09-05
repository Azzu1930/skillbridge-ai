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
  MapPin,
} from 'lucide-react';

export default function SkillGapPage() {
  const { student } = useApp();
  const [selectedRole, setSelectedRole] = useState(student.targetRole || 'Backend Developer');

  const gapAnalysis = calculateSkillGap(student.skills, selectedRole);
  const benchmark = TARGET_ROLE_BENCHMARKS[selectedRole] || TARGET_ROLE_BENCHMARKS['Backend Developer'];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Target className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  Pillar 2: AI Skill Gap Diagnostic
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                AI Skill Gap Analysis
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Evaluates candidate competencies against current market specifications. Identifies exact technology deficits and provides root-cause explanations for employer expectations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/simulator"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open in Simulator</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Object.values(TARGET_ROLE_BENCHMARKS).map((bm) => (
            <button
              key={bm.role}
              onClick={() => setSelectedRole(bm.role)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRole === bm.role
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {bm.role}
            </button>
          ))}
        </div>

        {/* Role Match Overview Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Target Role Benchmark
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{benchmark.role}</h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{benchmark.description}</p>
              <p className="text-xs font-mono text-emerald-700 mt-1 font-semibold">
                Typical Starting Package: {benchmark.averageStartingSalary}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Current Match</p>
                <p className="text-3xl font-extrabold text-blue-700 mt-0.5">{gapAnalysis.overallMatch}%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="text-[11px] space-y-1">
                <p className="text-emerald-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {gapAnalysis.acquiredCount} Acquired
                </p>
                <p className="text-amber-700 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> {gapAnalysis.inProgressCount} In Progress
                </p>
                <p className="text-red-700 flex items-center gap-1 font-semibold">
                  <XCircle className="w-3.5 h-3.5 text-red-600" /> {gapAnalysis.missingCount} Missing
                </p>
              </div>
            </div>
          </div>

          {/* Current vs Target Skills Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Current Student Skills (Matches)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {student.skills.map((s) => (
                  <span
                    key={s.id}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-1"
                  >
                    ✓ {s.name} ({s.score}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                Target Role Requirements Delta
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {gapAnalysis.gapItems.map((g) => (
                  <span
                    key={g.skill}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 ${
                      g.status === 'Acquired'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : g.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-red-50 text-red-800 border-red-200'
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
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Skill Gap Breakdown & Explanation
              </h2>
              <p className="text-xs text-slate-500">
                Detailed diagnosis explaining WHY industry recruiters require these competencies
              </p>
            </div>
            <Link
              href="/student/roadmap"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
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
                    ? 'bg-white border-red-200 shadow-xs'
                    : item.status === 'In Progress'
                    ? 'bg-white border-amber-200 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-1.5 rounded-lg ${
                        item.status === 'Acquired'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {item.status === 'Acquired' && <CheckCircle2 className="w-4 h-4" />}
                      {item.status === 'In Progress' && <AlertTriangle className="w-4 h-4" />}
                      {item.status === 'Missing' && <XCircle className="w-4 h-4" />}
                    </span>
                    <div>
                      <span className="font-bold text-sm text-slate-900">{item.skill}</span>
                      <span className="text-[10px] ml-2 font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        Importance: {item.importance}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-500">
                      Current: <strong className="text-slate-900">{item.currentScore}%</strong>
                    </span>
                    <span className="text-slate-500">
                      Target: <strong className="text-blue-700">{item.targetScore}%</strong>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'Acquired'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Qualitative Reason */}
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Why this gap matters: </strong>
                    {item.gapReason}
                  </p>
                  <p className="text-blue-700 flex items-center gap-1 text-[11px] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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
