'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { CANDIDATE_EVALUATIONS, INSTITUTION_STATS } from '@/data/seedData';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Download,
  ExternalLink,
} from 'lucide-react';

export default function InstitutionStudentsPage() {
  const { currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [readinessFilter, setReadinessFilter] = useState('All');

  const institutionName =
    currentUser?.institutionName || currentUser?.institution || 'National Institute of Technology';

  const students = CANDIDATE_EVALUATIONS;

  const filteredStudents = students.filter((std) => {
    const matchesSearch =
      std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.matchedSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept =
      departmentFilter === 'All' ||
      (departmentFilter === 'CSE' && std.name.includes('Abdul')) ||
      true;

    const matchesReadiness =
      readinessFilter === 'All'
        ? true
        : readinessFilter === '80+'
        ? std.readinessScore >= 80
        : readinessFilter === '70+'
        ? std.readinessScore >= 70
        : std.readinessScore < 70;

    return matchesSearch && matchesDept && matchesReadiness;
  });

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-borderGreen shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-green-50 text-green-700 border border-green-200">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-green-700 font-bold">
                  Student Talent Directory
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                {institutionName} • Student Cohort
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                Centralized registry of verified student Skill Twins, readiness indices, industry assessments, and active placement qualifications.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/institution/dashboard"
                className="px-4 py-2.5 text-xs font-bold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs"
              >
                Executive Dashboard
              </Link>
              <Link
                href="/admin/training"
                className="px-4 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs"
              >
                Plan Interventions
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Tracked Cohort</span>
            <p className="text-2xl font-black text-textPrimary mt-1">{INSTITUTION_STATS.totalStudents}</p>
            <p className="text-[10px] text-muted">Across departments</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Placement Qualified</span>
            <p className="text-2xl font-black text-green-700 mt-1">{INSTITUTION_STATS.placementReady}</p>
            <p className="text-[10px] text-green-700 font-semibold">Readiness &gt; 70%</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Avg Readiness</span>
            <p className="text-2xl font-black text-textPrimary mt-1">74.2%</p>
            <p className="text-[10px] text-muted">AI 5-factor model</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-borderGreen shadow-xs">
            <span className="text-[10px] text-muted uppercase font-semibold">Active Offers</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{INSTITUTION_STATS.placed}</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Avg ₹9.6 LPA</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name or verified skill (e.g. Python, Docker, React)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Readiness:</span>
            </div>
            <select
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl px-2.5 py-2 text-textPrimary focus:border-green-600 focus:outline-hidden"
            >
              <option value="All">All Scores</option>
              <option value="80+">Top Tier (&gt; 80%)</option>
              <option value="70+">Qualified (&gt; 70%)</option>
              <option value="below70">Needs Intervention (&lt; 70%)</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl border border-borderGreen shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-borderGreen flex items-center justify-between">
            <h2 className="text-sm font-bold text-textPrimary">
              Student Directory ({filteredStudents.length} Students)
            </h2>
            <span className="text-xs text-muted">
              Updated from latest skill assessments and resume analyses
            </span>
          </div>

          <div className="divide-y divide-borderGreen">
            {filteredStudents.map((std) => (
              <div
                key={std.candidateId}
                className="p-5 hover:bg-[#f7fcf8] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">
                      {std.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-textPrimary">{std.name}</h3>
                        <span className="text-[10px] bg-green-50 border border-green-200 text-green-800 px-2 py-0.5 rounded-full font-semibold">
                          B.Tech CSE • 2026 Batch
                        </span>
                      </div>
                      <p className="text-xs text-muted">
                        Target Role: <strong className="text-textPrimary">Backend Developer</strong> • GPA: 8.7 / 10.0
                      </p>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] font-semibold text-muted">Verified Skills:</span>
                    {std.matchedSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-green-50 text-green-800 border border-green-200"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                    {std.missingSkills.slice(0, 2).map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200"
                      >
                        Gap: {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score & Action */}
                <div className="flex items-center gap-6 self-end lg:self-center">
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                      Readiness Score
                    </span>
                    <div className="flex items-baseline justify-end gap-1">
                      <span
                        className={`text-2xl font-black ${
                          std.readinessScore >= 80
                            ? 'text-green-700'
                            : std.readinessScore >= 70
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {std.readinessScore}%
                      </span>
                    </div>
                    <span className="text-[10px] text-muted">Match: {std.matchScore}%</span>
                  </div>

                  <Link
                    href={`/portfolio/demo-student`}
                    className="px-3.5 py-2 text-xs font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
