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
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Institutional Executive Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              University Placement & Skill Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Dean & Academic Council Portal. Macro-level tracking of 1,248 students across 4 engineering departments, placement readiness benchmarks, and closed-loop corporate feedback.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/intelligence"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Workflow className="w-4 h-4" />
              <span>Closed-Loop Pipeline</span>
            </Link>
            <Link
              href="/admin/training"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Generate Training</span>
            </Link>
          </div>
        </div>

        {/* 6 Top KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Students</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalStudents}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Across 4 branches</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Placement Ready</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{stats.placementReady}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">54.8% cohort</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Placed Offers</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{stats.placed}</p>
            <p className="text-[10px] text-blue-600 mt-0.5">Avg: ₹9.6 LPA</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Internships</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.internships}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">6-month conversions</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Industry Partners</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.industryPartners}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">MoUs signed</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Avg. Skill Match</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{stats.averageSkillMatch}%</p>
            <p className="text-[10px] text-slate-500 mt-0.5">AI benchmark</p>
          </div>
        </div>

        {/* Charts: Placement Trends & Department Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Placement Rate Trend */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Placement Rate & Package Trajectory
                </h2>
                <p className="text-xs text-slate-500">Five-year institutional placement growth</p>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                +23% over 4 yrs
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.placementTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                    labelStyle={{ color: '#475569' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="placementPercent"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.15}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department-wise Readiness Bar Chart */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Department Readiness Benchmark (%)
                </h2>
                <p className="text-xs text-slate-500">Percentage of cohort meeting &gt; 70% threshold</p>
              </div>
              <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-semibold">
                CSE Leads at 74%
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.departmentReadiness} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="department" stroke="#94a3b8" fontSize={10} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                    labelStyle={{ color: '#475569' }}
                  />
                  <Bar dataKey="readinessPercent" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cohort Skill Gaps Table */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                Institutional Cohort Skill Deficits
              </h2>
              <p className="text-xs text-slate-500">Gaps identified across university student profiles</p>
            </div>
            <Link
              href="/admin/intelligence"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Closed-Loop Diagnostics →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.cohortSkillGaps.map((item) => (
              <div
                key={item.skill}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                  <span className="text-xs font-mono font-bold text-red-600">
                    {item.gapPercentage}% gap
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
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
