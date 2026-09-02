'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { INSTITUTION_STATS, TRAINING_RECOMMENDATIONS } from '@/data/seedData';
import {
  Layers,
  GraduationCap,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Award,
  Users,
} from 'lucide-react';

export default function FacultyDashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <GraduationCap className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Faculty & Academic Department Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Curriculum & Department Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Faculty Persona: <strong className="text-emerald-300">Dr. Ramesh Sharma (Head of Computer Science & Engineering)</strong>. Real-time department competency distributions, student cohort deficits, and industry tie-up requests.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/faculty/collaborations"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Workflow className="w-4 h-4" />
              <span>Industry Tie-ups</span>
            </Link>
            <Link
              href="/admin/training"
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-purple-400" />
              <span>Training Engine</span>
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Department Students</span>
            <p className="text-3xl font-black text-white mt-2">420</p>
            <p className="text-[11px] text-slate-500 mt-1">Computer Science & Eng</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Placement Ready</span>
            <p className="text-3xl font-black text-emerald-400 mt-2">310 (74%)</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Exceeds 70% threshold
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Identified Critical Gaps</span>
            <p className="text-3xl font-black text-amber-400 mt-2">4 Stacks</p>
            <p className="text-[11px] text-amber-400 mt-1">Cloud, Docker, FastAPI, DSA</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400">Active Collaborations</span>
            <p className="text-3xl font-black text-purple-400 mt-2">12</p>
            <p className="text-[11px] text-slate-400 mt-1">FDP, Guest Lectures, Projects</p>
          </div>
        </div>

        {/* Top Skill Gaps Across Students Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cohort Skill Gaps */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-400" />
                  Top Skill Gaps Across Students
                </h2>
                <p className="text-xs text-slate-400">
                  Aggregated from student assessments and employer interview feedback
                </p>
              </div>
              <span className="text-xs font-mono text-red-400 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              {INSTITUTION_STATS.cohortSkillGaps.map((item) => (
                <div
                  key={item.skill}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.skill}</span>
                    <span className="text-xs font-mono font-bold text-red-400">
                      {item.gapPercentage}% deficit
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full"
                      style={{ width: `${item.gapPercentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Impacts {item.studentsAffected} students in 3rd & 4th year
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/admin/training"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
              >
                <span>Trigger Remedial Bootcamp →</span>
              </Link>
            </div>
          </div>

          {/* Active Training Recommendations */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Proposed Academic Interventions
                </h2>
                <Link href="/admin/training" className="text-xs text-purple-400 hover:underline">
                  Manage Engine →
                </Link>
              </div>

              <div className="space-y-3">
                {TRAINING_RECOMMENDATIONS.slice(0, 3).map((tr) => (
                  <div
                    key={tr.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{tr.skill}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          tr.priority === 'HIGH'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {tr.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">{tr.recommendedAction}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>{tr.targetCohorts.join(', ')}</span>
                      <span className="text-emerald-400 font-bold">
                        +{tr.projectedReadinessBoost} pts readiness
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/faculty/collaborations"
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Browse Industry Training & FDP Proposals →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
