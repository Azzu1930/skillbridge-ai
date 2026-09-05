'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
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
  TrendingUp,
  Workflow,
  Users,
  Target,
} from 'lucide-react';

export default function InstitutionDashboardPage() {
  const { currentUser, isAuthenticated } = useApp();
  const stats = INSTITUTION_STATS;

  const institutionName =
    currentUser?.institutionName ||
    currentUser?.institution ||
    'National Institute of Technology';
  const adminName = currentUser?.administratorName || currentUser?.fullName || 'Dean of Academics';
  const institutionType = currentUser?.institutionType || 'Autonomous Technical University';

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-borderGreen shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-green-50 text-green-700 border border-green-200">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-green-700 font-bold">
                  Institutional Executive Portal
                </span>
                {isAuthenticated && currentUser?.role === 'institution' && (
                  <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                    Verified Institution
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                {institutionName}
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                Welcome, <strong>{adminName}</strong> ({institutionType}). Macro-level career readiness tracking, corporate alignment metrics, and automated curriculum-industry feedback loop.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/institution/students"
                className="px-4 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Student Directory</span>
              </Link>
              <Link
                href="/admin/intelligence"
                className="px-4 py-2.5 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Workflow className="w-4 h-4 text-green-600" />
                <span>Closed-Loop Pipeline</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 6 Top KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Total Students</span>
            <p className="text-2xl font-black text-textPrimary mt-1">{stats.totalStudents}</p>
            <p className="text-[10px] text-muted mt-0.5">Across 4 branches</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Placement Ready</span>
            <p className="text-2xl font-black text-green-700 mt-1">{stats.placementReady}</p>
            <p className="text-[10px] text-green-700 font-semibold mt-0.5">54.8% cohort</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Placed Offers</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{stats.placed}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Avg: ₹9.6 LPA</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Internships</span>
            <p className="text-2xl font-black text-textPrimary mt-1">{stats.internships}</p>
            <p className="text-[10px] text-muted mt-0.5">Active conversions</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Industry Partners</span>
            <p className="text-2xl font-black text-textPrimary mt-1">{stats.industryPartners}</p>
            <p className="text-[10px] text-muted mt-0.5">Active MoUs</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Avg Skill Match</span>
            <p className="text-2xl font-black text-green-700 mt-1">{stats.averageSkillMatch}%</p>
            <p className="text-[10px] text-green-700 font-semibold mt-0.5">AI Benchmark</p>
          </div>
        </div>

        {/* Charts: Placement Trends & Department Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Placement Rate Trend */}
          <div className="p-6 rounded-2xl bg-white border border-borderGreen shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Placement Rate & Package Trajectory
                </h2>
                <p className="text-xs text-muted">Five-year institutional placement growth</p>
              </div>
              <span className="text-xs font-mono text-green-800 bg-green-50 px-2.5 py-0.5 rounded border border-green-200 font-semibold">
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
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#dce9df', borderRadius: '8px', fontSize: '12px', color: '#17251b' }}
                    labelStyle={{ color: '#526157' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="placementPercent"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.15}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department-wise Readiness Bar Chart */}
          <div className="p-6 rounded-2xl bg-white border border-borderGreen shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-green-600" />
                  Department Readiness Benchmark (%)
                </h2>
                <p className="text-xs text-muted">Percentage of cohort meeting &gt; 70% threshold</p>
              </div>
              <span className="text-xs font-mono text-green-800 bg-green-50 px-2.5 py-0.5 rounded border border-green-200 font-semibold">
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
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#dce9df', borderRadius: '8px', fontSize: '12px', color: '#17251b' }}
                    labelStyle={{ color: '#526157' }}
                  />
                  <Bar dataKey="readinessPercent" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cohort Skill Gaps Table */}
        <div className="p-6 rounded-2xl bg-white border border-borderGreen shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                Institutional Cohort Skill Deficits
              </h2>
              <p className="text-xs text-muted">Gaps identified across university student profiles</p>
            </div>
            <Link
              href="/admin/training"
              className="text-xs font-semibold text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              <span>Generate Targeted Training Plan →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.cohortSkillGaps.map((item) => (
              <div
                key={item.skill}
                className="p-4 rounded-xl bg-[#f7fcf8] border border-borderGreen space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-textPrimary">{item.skill}</span>
                  <span className="text-xs font-mono font-bold text-amber-600">
                    {item.gapPercentage}% gap
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.gapPercentage}%` }} />
                </div>
                <p className="text-[11px] text-muted">
                  Affects {item.studentsAffected} students across engineering departments
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
