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
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <GraduationCap className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Faculty & Academic Department Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curriculum & Department Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Faculty Persona: <strong className="text-slate-900 font-semibold">Dr. Ramesh Sharma (Head of Computer Science & Engineering)</strong>. Real-time department competency distributions, student cohort deficits, and industry tie-up requests.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/faculty/collaborations"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Workflow className="w-4 h-4" />
              <span>Industry Tie-ups</span>
            </Link>
            <Link
              href="/admin/training"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span>Training Engine</span>
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Department Students</span>
            <p className="text-3xl font-black text-slate-900 mt-2">420</p>
            <p className="text-[11px] text-slate-500 mt-1">Computer Science & Eng</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Placement Ready</span>
            <p className="text-3xl font-black text-emerald-600 mt-2">310 (74%)</p>
            <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Exceeds 70% threshold
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Identified Critical Gaps</span>
            <p className="text-3xl font-black text-amber-600 mt-2">4 Stacks</p>
            <p className="text-[11px] text-amber-600 mt-1">Cloud, Docker, FastAPI, DSA</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Active Collaborations</span>
            <p className="text-3xl font-black text-blue-600 mt-2">12</p>
            <p className="text-[11px] text-slate-500 mt-1">FDP, Guest Lectures, Projects</p>
          </div>
        </div>

        {/* Top Skill Gaps Across Students Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cohort Skill Gaps */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-500" />
                  Top Skill Gaps Across Students
                </h2>
                <p className="text-xs text-slate-500">
                  Aggregated from student assessments and employer interview feedback
                </p>
              </div>
              <span className="text-xs font-mono text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded font-semibold">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              {INSTITUTION_STATS.cohortSkillGaps.map((item) => (
                <div
                  key={item.skill}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                    <span className="text-xs font-mono font-bold text-red-600">
                      {item.gapPercentage}% deficit
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
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
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Trigger Remedial Bootcamp →</span>
              </Link>
            </div>
          </div>

          {/* Active Training Recommendations */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Proposed Academic Interventions
                </h2>
                <Link href="/admin/training" className="text-xs text-blue-600 hover:underline font-semibold">
                  Manage Engine →
                </Link>
              </div>

              <div className="space-y-3">
                {TRAINING_RECOMMENDATIONS.slice(0, 3).map((tr) => (
                  <div
                    key={tr.id}
                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{tr.skill}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          tr.priority === 'HIGH'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {tr.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{tr.recommendedAction}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>{tr.targetCohorts.join(', ')}</span>
                      <span className="text-emerald-600 font-bold">
                        +{tr.projectedReadinessBoost} pts readiness
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/faculty/collaborations"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
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
