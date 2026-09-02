'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Target,
  Briefcase,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { student, opportunities, applications } = useApp();

  const topOpportunities = opportunities.slice(0, 3);
  const activeApplications = applications.slice(0, 3);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Student Intelligence Dashboard
              </span>
              <span className="text-[10px] bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                CSE 3rd Year
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {student.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Your career readiness is improving. Target role:{' '}
              <span className="text-indigo-300 font-semibold">{student.targetRole}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/student/simulator"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Readiness Simulator</span>
            </Link>
            <Link
              href="/student/skill-twin"
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Skill Twin</span>
            </Link>
          </div>
        </div>

        {/* Top 4 KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Readiness */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Overall Readiness</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14% vs Oct
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{student.readinessScore}%</span>
                <span className="text-xs text-slate-400">/ 100 benchmark</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${student.readinessScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Model-based readiness for {student.targetRole}
            </p>
          </div>

          {/* Skill Match */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Core Skill Match</span>
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.5 rounded">
                Target Role
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">68%</span>
                <span className="text-xs text-slate-400">matched</span>
              </div>
              <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> 4 critical skills missing
              </p>
            </div>
            <Link
              href="/student/skill-gap"
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View Gap Breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Applications */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Applications</span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                Tracker
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{applications.length}</span>
                <span className="text-xs text-slate-400">submitted</span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 1 Shortlisted, 1 Interview
              </p>
            </div>
            <Link
              href="/student/applications"
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Recommended Opportunities */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Recommended Jobs</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{opportunities.length}</span>
                <span className="text-xs text-slate-400">opportunities</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Top match: Razorpay (92%)
              </p>
            </div>
            <Link
              href="/student/opportunities"
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore Matches</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Competency Breakdown & Readiness Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Competency Dimensions */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Readiness Breakdown
            </h2>
            <p className="text-xs text-slate-400 mt-1">Multi-vector competency evaluation</p>

            <div className="space-y-4 mt-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Technical Skills</span>
                  <span className="text-white font-bold">{student.technicalScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${student.technicalScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Soft Skills & Review</span>
                  <span className="text-white font-bold">{student.softSkillScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${student.softSkillScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Project Evidence</span>
                  <span className="text-white font-bold">{student.projectScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${student.projectScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Interview Readiness</span>
                  <span className="text-white font-bold">{student.interviewScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${student.interviewScore}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href="/student/assessment"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <span>Take Live Skill Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Readiness Trend Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Readiness Growth Curve
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Historical progression across verified submissions</p>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
                +20 pts since Oct
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={student.readinessTrend} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
              <span>Model calibrated against 42 hiring partner profiles</span>
              <Link href="/student/simulator" className="text-emerald-400 hover:underline font-medium">
                Simulate next 3 months →
              </Link>
            </div>
          </div>
        </div>

        {/* Skill Twin Snippet & Critical Skill Gap Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Twin Preview */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                  My Skill Twin Highlights
                </h2>
              </div>
              <Link href="/student/skill-twin" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                View Full Twin →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {student.skills.slice(0, 6).map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{skill.name}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${skill.score}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> {skill.evidenceCount} verified evidence
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap & Simulator Action */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                    Identified Role Skill Gaps
                  </h2>
                </div>
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                  High Priority
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                To reach 85%+ readiness for <strong className="text-white">Backend Developer</strong>, prioritize these missing technologies:
              </p>

              <div className="space-y-2.5">
                {[
                  { name: 'FastAPI Microservices', impact: '+5% readiness', effort: '2 weeks', status: 'Missing' },
                  { name: 'REST API Architectural Patterns', impact: '+4% readiness', effort: '1.5 weeks', status: 'In Progress' },
                  { name: 'Docker Containerization', impact: '+3% readiness', effort: '1 week', status: 'Missing' },
                ].map((g) => (
                  <div
                    key={g.name}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{g.name}</p>
                      <p className="text-[10px] text-slate-400">{g.effort} estimated effort</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">{g.impact}</span>
                      <p className="text-[10px] text-amber-400 font-medium">{g.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/student/simulator"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate closing these gaps →</span>
              </Link>
              <Link href="/student/roadmap" className="text-xs text-indigo-400 hover:underline">
                View 6-Week Roadmap
              </Link>
            </div>
          </div>
        </div>

        {/* Opportunities & Applications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Opportunities */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                  Recommended Opportunities
                </h2>
              </div>
              <Link href="/student/opportunities" className="text-xs font-semibold text-emerald-400 hover:underline">
                Browse All ({opportunities.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-bold text-white truncate">{opp.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {opp.company} • {opp.stipend}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {opp.requiredSkills.slice(0, 3).map((s) => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-1 rounded">
                      {opp.minReadiness}% Match
                    </span>
                    <Link
                      href="/student/opportunities"
                      className="block mt-2 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                  Recent Applications
                </h2>
              </div>
              <Link href="/student/applications" className="text-xs font-semibold text-indigo-400 hover:underline">
                View Tracker ({applications.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {activeApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-bold text-white truncate">{app.opportunityTitle}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{app.company}</p>
                    <p className="text-[10px] text-slate-500 mt-1 truncate">{app.notes}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : app.status === 'Interview'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                          : app.status === 'Selected'
                          ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {app.status}
                    </span>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Match: {app.matchScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
