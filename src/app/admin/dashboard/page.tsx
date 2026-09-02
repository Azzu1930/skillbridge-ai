'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { INSTITUTION_STATS } from '@/data/seedData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ShieldCheck,
  GraduationCap,
  Building2,
  Briefcase,
  TrendingUp,
  Workflow,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = INSTITUTION_STATS;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-purple-950 text-purple-400 border border-purple-800/60">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                Institutional Executive Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              University Placement & Skill Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Dean & Academic Council Portal. Macro-level tracking of 1,248 students across 4 engineering departments, placement readiness benchmarks, and closed-loop corporate feedback.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/intelligence"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-purple-400 hover:bg-purple-300 rounded-xl transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Workflow className="w-4 h-4" />
              <span>Closed-Loop Pipeline</span>
            </Link>
            <Link
              href="/admin/training"
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Generate Training</span>
            </Link>
          </div>
        </div>

        {/* 6 Top KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Students</span>
            <p className="text-2xl font-black text-white mt-1">{stats.totalStudents}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Across 4 branches</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Placement Ready</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{stats.placementReady}</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">54.8% cohort</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Placed Offers</span>
            <p className="text-2xl font-black text-indigo-400 mt-1">{stats.placed}</p>
            <p className="text-[10px] text-indigo-400 mt-0.5">Avg: ₹9.6 LPA</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Internships</span>
            <p className="text-2xl font-black text-sky-400 mt-1">{stats.internships}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">6-month conversions</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Industry Partners</span>
            <p className="text-2xl font-black text-amber-400 mt-1">{stats.industryPartners}</p>
            <p className="text-[10px] text-amber-400 mt-0.5">MoUs signed</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 shadow-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg. Skill Match</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{stats.averageSkillMatch}%</p>
            <p className="text-[10px] text-slate-500 mt-0.5">AI benchmark</p>
          </div>
        </div>

        {/* Charts: Placement Trends & Department Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Placement Rate Trend */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Placement Rate & Package Trajectory
                </h2>
                <p className="text-xs text-slate-400">Five-year institutional placement growth</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                +23% over 4 yrs
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.placementTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="placementPercent"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.25}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department-wise Readiness Bar Chart */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  Department Readiness Benchmark (%)
                </h2>
                <p className="text-xs text-slate-400">Percentage of cohort meeting &gt; 70% threshold</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                CSE Leads at 74%
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.departmentReadiness} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="department" stroke="#64748b" fontSize={10} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="readinessPercent" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cohort Skill Gaps Table */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                Institutional Cohort Skill Deficits
              </h2>
              <p className="text-xs text-slate-400">Gaps identified across university student profiles</p>
            </div>
            <Link
              href="/admin/intelligence"
              className="text-xs font-semibold text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Closed-Loop Diagnostics →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.cohortSkillGaps.map((item) => (
              <div
                key={item.skill}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.skill}</span>
                  <span className="text-xs font-mono font-bold text-red-400">
                    {item.gapPercentage}% gap
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${item.gapPercentage}%` }} />
                </div>
                <p className="text-[10px] text-slate-500">
                  Affects {item.studentsAffected} students across departments
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
