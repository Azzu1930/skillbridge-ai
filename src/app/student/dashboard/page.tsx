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
  FileText,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { student, opportunities, applications, internships, currentUser } = useApp();

  const topOpportunities = opportunities.slice(0, 3);
  const activeApplications = applications.slice(0, 3);
  const activeInternship = internships.length > 0 ? internships[0] : null;
  const isNewStudent = student.skills.length === 0;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Student Intelligence Dashboard
              </span>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono font-semibold">
                {student.department || 'Computer Science & Engineering'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {(currentUser?.fullName || student?.name || 'Candidate').split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Your career readiness is improving. Target role:{' '}
              <span className="text-blue-700 font-bold">{student.targetRole}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/resume-analyzer"
              className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analyze Resume</span>
            </Link>
            <Link
              href="/student/simulator"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulator</span>
            </Link>
          </div>
        </div>

        {/* Guided Onboarding Banner for Brand-New Students */}
        {isNewStudent && (
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-900 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wide">
                Welcome to SkillBridge AI — Quick Onboarding Setup
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              You have created a brand new student account! Complete these 3 quick steps to calculate your initial career readiness score, generate your AI Skill Twin, and unlock matched jobs and internships:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/resume-analyzer"
                className="p-4 rounded-xl bg-white border border-blue-200 hover:border-blue-400 transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">1</span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Upload Your Resume</span>
                </div>
                <p className="text-[11px] text-slate-500">Extract verified competencies and auto-generate DOCX/JSON reports.</p>
              </Link>
              <Link
                href="/student/assessment"
                className="p-4 rounded-xl bg-white border border-blue-200 hover:border-blue-400 transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">2</span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Take Skill Quizzes</span>
                </div>
                <p className="text-[11px] text-slate-500">Prove technical skills to earn verified badges on your Skill Twin.</p>
              </Link>
              <Link
                href="/student/opportunities"
                className="p-4 rounded-xl bg-white border border-blue-200 hover:border-blue-400 transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">3</span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Explore Openings</span>
                </div>
                <p className="text-[11px] text-slate-500">Apply to matching corporate internships with 1-click submission.</p>
              </Link>
            </div>
          </div>
        )}

        {/* Active Internship Track Banner */}
        {activeInternship && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active Internship Track
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {activeInternship.roleTitle} at {activeInternship.company}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Supervisor: <strong className="text-slate-800">{activeInternship.supervisorName}</strong> • {activeInternship.milestones.filter(m => m.status === 'Approved').length} of {activeInternship.milestones.length} milestones verified
                </p>
              </div>
            </div>

            <Link
              href="/student/internship-progress"
              className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Open Internship Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Top 4 KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Readiness */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Overall Readiness</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" /> +14%
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{student.readinessScore}%</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${student.readinessScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Model-based readiness for {student.targetRole}
            </p>
          </div>

          {/* Skill Match */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Role Skill Match</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                Target Role
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">72%</span>
                <span className="text-xs text-slate-400">matched</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 text-amber-600" /> 3 critical skills to close
              </p>
            </div>
            <Link
              href="/student/skill-gap"
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View Gap Breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Applications */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Applications</span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                Tracker
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{applications.length}</span>
                <span className="text-xs text-slate-400">submitted</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active in pipeline
              </p>
            </div>
            <Link
              href="/student/applications"
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Recommended Opportunities */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Opportunities</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{opportunities.length}</span>
                <span className="text-xs text-slate-400">openings</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Top match: Razorpay (91%)
              </p>
            </div>
            <Link
              href="/student/opportunities"
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Explore Matches</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Competency Breakdown & Readiness Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Competency Dimensions */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
            <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              Readiness Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Multi-vector competency evaluation</p>

            <div className="space-y-4 mt-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Technical Skills</span>
                  <span className="text-slate-900 font-bold">{student.technicalScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${student.technicalScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Soft Skills & Review</span>
                  <span className="text-slate-900 font-bold">{student.softSkillScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${student.softSkillScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Project Evidence</span>
                  <span className="text-slate-900 font-bold">{student.projectScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${student.projectScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Interview Readiness</span>
                  <span className="text-slate-900 font-bold">{student.interviewScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${student.interviewScore}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/student/assessment"
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Take Live Skill Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Readiness Trend Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Readiness Growth Curve
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Historical progression across verified submissions</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                +20 pts since baseline
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={student.readinessTrend} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                    labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <span>Model calibrated against 42 hiring partner profiles</span>
              <Link href="/student/simulator" className="text-blue-600 hover:underline font-semibold">
                Simulate next 3 months →
              </Link>
            </div>
          </div>
        </div>

        {/* Opportunities & Applications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Opportunities */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Recommended Opportunities
                </h2>
              </div>
              <Link href="/student/opportunities" className="text-xs font-semibold text-blue-600 hover:underline">
                Browse All ({opportunities.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-bold text-slate-900 truncate">{opp.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {opp.company} • {opp.stipend}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {opp.requiredSkills.slice(0, 3).map((s) => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                      {opp.minReadiness}% Match
                    </span>
                    <Link
                      href="/student/opportunities"
                      className="block mt-2 text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Recent Applications
                </h2>
              </div>
              <Link href="/student/applications" className="text-xs font-semibold text-blue-600 hover:underline">
                View Tracker ({applications.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {activeApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-bold text-slate-900 truncate">{app.opportunityTitle}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{app.company}</p>
                    <p className="text-[10px] text-slate-400 mt-1 truncate">{app.notes}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : app.status === 'Interview'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : app.status === 'Selected'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {app.status}
                    </span>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">
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
