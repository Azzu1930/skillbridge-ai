'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Briefcase,
  Layers,
  FileCode,
  Paperclip,
  ExternalLink,
  ShieldCheck,
  Award,
  RefreshCw,
} from 'lucide-react';
import {
  downloadDocxReport,
  downloadJsonReport,
  downloadOriginalResumeFile,
} from '@/lib/document-generator';
import { getUserResumeRecord } from '@/lib/report-storage';

export default function UserDashboardPage() {
  const {
    currentUser,
    isAuthenticated,
    student,
    userReports,
    lastGeneratedReport,
    userResumeProfile,
    opportunities,
    applyToOpportunity,
  } = useApp();

  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  // Active report resolution: prioritize userReports[0] if authenticated; only fallback to lastGeneratedReport if NOT authenticated (guest mode)
  const activeReport = currentUser
    ? (userReports.length > 0 ? userReports[0] : null)
    : (lastGeneratedReport || null);

  const isNewUser = !!currentUser && userReports.length === 0;
  const candidateName = currentUser?.fullName || student.name;
  const targetRole = activeReport?.targetRole || currentUser?.targetRole || (currentUser ? 'Role Pending Analysis' : student.targetRole);
  const readinessScore = activeReport?.readinessScore ?? (currentUser ? 0 : student.readinessScore);
  const skillCount = activeReport?.skills.length ?? (currentUser ? 0 : student.skills.length);
  const criticalGapsCount = activeReport?.criticalGaps.length ?? (currentUser ? 0 : 2);
  const matchedOpportunities = activeReport?.opportunities || [];

  const handleDownloadDocx = async () => {
    if (!activeReport) return;
    try {
      setDownloadingDocx(true);
      await downloadDocxReport(activeReport);
    } catch (err) {
      console.error('Failed to download DOCX', err);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadJson = () => {
    if (!activeReport) return;
    downloadJsonReport(activeReport);
  };

  const handleDownloadResume = () => {
    if (!activeReport) return;
    const userId = currentUser?.id || 'demo_user';
    const resumeId = activeReport.resumeId || activeReport.resumeRecordId || 'demo_resume';
    const resumeRecord = getUserResumeRecord(userId, resumeId);
    if (resumeRecord) {
      downloadOriginalResumeFile(resumeRecord);
    } else {
      // Fallback record from metadata
      downloadOriginalResumeFile({
        id: resumeId,
        userId,
        fileName: activeReport.resumeMeta.fileName || 'Resume_Document.pdf',
        fileSize: activeReport.resumeMeta.fileSize || '142 KB',
        fileType: activeReport.resumeMeta.fileType || 'pdf',
        uploadedAt: activeReport.resumeMeta.uploadedAt,
        rawText: `Resume of ${candidateName}\nTarget Role: ${targetRole}\nSkills: ${activeReport.skills.map(s => s.name).join(', ')}`,
      });
    }
  };

  const handleApply = (oppId: string) => {
    applyToOpportunity(oppId);
    setAppliedIds((prev) => ({ ...prev, [oppId]: true }));
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-borderGreen shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  User Command Center
                </span>
                <span className="text-[11px] bg-green-50 border border-green-200 text-green-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  {isAuthenticated ? `AUTHENTICATED: ${currentUser?.email}` : 'DEMO MODE'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                Welcome{currentUser ? `, ${candidateName.split(' ')[0]}` : ' to SkillBridge AI'} 👋
              </h1>
              <p className="text-sm text-muted mt-1">
                {isNewUser
                  ? 'Your candidate profile is clean. Upload your resume to begin your AI Career Twin benchmark.'
                  : `Your career twin is benchmarked against industry standards. Target Role: ${targetRole}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/resume-analyzer"
                className="px-4 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Upload Resume</span>
              </Link>
              <Link
                href="/reports"
                className="px-4 py-2.5 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-green-600" />
                <span>My Reports ({userReports.length})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Clean New User Notification Banner */}
        {isNewUser && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-dashed border-borderGreen shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-textPrimary">Your Career Intelligence Profile is Ready</h3>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto">
              Welcome, {candidateName}! You currently have 0 resumes, 0 reports, and 0 job applications.
              Upload your resume in PDF, DOC, or DOCX format to compute your personalized 5-factor career readiness score, identify competency gaps, and unlock instant deliverables.
            </p>
            <div className="pt-2">
              <Link
                href="/resume-analyzer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upload Your First Resume</span>
              </Link>
            </div>
          </div>
        )}

        {/* PROMINENT REPORT DOWNLOAD CENTER CARD */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white shadow-md border border-green-700 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-medium text-green-200">
                  <Sparkles className="w-3.5 h-3.5 text-green-300" />
                  <span>Resume Intelligence Report Center</span>
                  {activeReport && (
                    <span className="bg-green-500/30 px-1.5 py-0.2 rounded text-[10px] font-mono text-white">
                      v{activeReport.version}.0
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activeReport ? 'Download Official Career Intelligence Deliverables' : 'Career Intelligence Deliverables'}
                </h2>
                <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
                  {activeReport
                    ? 'Export complete candidate intelligence reports including evidence-based skill audits, 5-factor readiness breakdown, critical gap benchmarks, and tailored career roadmaps. Compatible with Microsoft Word, Google Docs, and enterprise applicant tracking systems.'
                    : 'Upload your resume to generate your official 40-attribute career intelligence report, complete with 5-factor readiness calculations, verified skill evidence, and publication-ready Word (.docx) downloads.'}
                </p>
                {activeReport && (
                  <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-green-200">
                    <span>📄 Source: <strong className="text-white">{activeReport.resumeMeta.fileName}</strong></span>
                    <span>•</span>
                    <span>Generated: <strong className="text-white">{new Date(activeReport.generatedAt).toLocaleDateString()}</strong></span>
                    <span>•</span>
                    <span>Readiness: <strong className="text-white">{activeReport.readinessScore}%</strong></span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:w-96 shrink-0">
                {activeReport ? (
                  <>
                    <Link
                      href={`/reports/view?id=${activeReport.id}`}
                      className="px-4 py-3 bg-white hover:bg-green-50 text-green-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <ExternalLink className="w-4 h-4 text-green-700" />
                      <span>View Full Web Report</span>
                    </Link>

                    <button
                      onClick={handleDownloadDocx}
                      disabled={downloadingDocx}
                      className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{downloadingDocx ? 'Compiling Word...' : 'Download .DOCX'}</span>
                    </button>

                    <button
                      onClick={handleDownloadJson}
                      className="px-4 py-3 bg-green-950/60 hover:bg-green-950 text-green-100 border border-white/20 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <FileCode className="w-4 h-4 text-green-400" />
                      <span>Download .JSON Data</span>
                    </button>

                    <button
                      onClick={handleDownloadResume}
                      className="px-4 py-3 bg-green-950/60 hover:bg-green-950 text-green-100 border border-white/20 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Paperclip className="w-4 h-4 text-green-400" />
                      <span>Original Resume</span>
                    </button>
                  </>
                ) : (
                  <div className="col-span-2 space-y-2">
                    <Link
                      href="/resume-analyzer"
                      className="w-full px-4 py-3 bg-white hover:bg-green-50 text-green-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-green-700" />
                      <span>Upload Resume to Unlock Downloads</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Readiness Score */}
          <div className="p-5 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Career Readiness</span>
              <span className="text-[10px] font-bold text-green-800 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" /> Benchmark
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-textPrimary">{readinessScore}%</span>
                <span className="text-xs text-muted">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-muted">
              Deterministic 5-factor model for {targetRole}
            </p>
          </div>

          {/* Detected Skills */}
          <div className="p-5 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Detected Skills</span>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-textPrimary">{skillCount}</span>
                <span className="text-xs text-green-700 font-semibold">Verified</span>
              </div>
              <p className="text-xs text-muted mt-2">
                Across programming, frameworks, databases, and DevOps tools.
              </p>
            </div>
            <Link
              href="/student/skill-twin"
              className="text-xs font-semibold text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              <span>Explore Skill Twin</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Critical Gaps */}
          <div className="p-5 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Critical Gaps</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-600">{criticalGapsCount}</span>
                <span className="text-xs text-muted">Gaps Identified</span>
              </div>
              <p className="text-xs text-muted mt-2">
                Competency areas required for industry placement qualification.
              </p>
            </div>
            <Link
              href="/student/skill-gap"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>View Gap Roadmap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Matched Opportunities */}
          <div className="p-5 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Matched Roles</span>
              <Briefcase className="w-4 h-4 text-green-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-textPrimary">{opportunities.length}</span>
                <span className="text-xs text-muted">Active Postings</span>
              </div>
              <p className="text-xs text-muted mt-2">
                Curated internships and roles mapped to your skill profile.
              </p>
            </div>
            <Link
              href="/student/opportunities"
              className="text-xs font-semibold text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              <span>Browse All Positions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Two Column Layout: Readiness Breakdown & Recommended Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: 5-Factor Score Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-borderGreen shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-textPrimary">Deterministic Readiness Breakdown</h3>
                <p className="text-xs text-muted">
                  Weighted multi-factor benchmark scoring calibrated for {targetRole}
                </p>
              </div>
              <Link
                href="/student/simulator"
                className="text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-all"
              >
                Open Simulator
              </Link>
            </div>

            {activeReport?.scoreBreakdown ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-canvas border border-borderGreen space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-textPrimary">Technical Skills (50 pts)</span>
                    <span className="font-mono font-bold text-green-700">{activeReport.scoreBreakdown.technicalSkills} / 50</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (activeReport.scoreBreakdown.technicalSkills / 50) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">Core programming, algorithms, and system fundamentals.</p>
                </div>

                <div className="p-4 rounded-xl bg-canvas border border-borderGreen space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-textPrimary">Practical Projects (15 pts)</span>
                    <span className="font-mono font-bold text-green-700">{activeReport.scoreBreakdown.projects} / 15</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (activeReport.scoreBreakdown.projects / 15) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">Production engineering projects and real-world implementations.</p>
                </div>

                <div className="p-4 rounded-xl bg-canvas border border-borderGreen space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-textPrimary">Workplace Experience (10 pts)</span>
                    <span className="font-mono font-bold text-green-700">{activeReport.scoreBreakdown.experience} / 10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (activeReport.scoreBreakdown.experience / 10) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">Internships, industry projects, and workplace collaboration.</p>
                </div>

                <div className="p-4 rounded-xl bg-canvas border border-borderGreen space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-textPrimary">Certifications (10 pts)</span>
                    <span className="font-mono font-bold text-green-700">{activeReport.scoreBreakdown.certifications} / 10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (activeReport.scoreBreakdown.certifications / 10) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">Certifications, course credentials, and verified achievements.</p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-canvas border border-borderGreen space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-textPrimary">Verification Proof (15 pts)</span>
                    <span className="font-mono font-bold text-green-700">{activeReport.scoreBreakdown.assessment} / 15</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (activeReport.scoreBreakdown.assessment / 15) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">Verified skill assessment scores and standardized benchmark testing.</p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-canvas border border-dashed border-borderGreen space-y-2">
                <Sparkles className="w-6 h-6 text-green-600 mx-auto" />
                <p className="text-xs font-bold text-textPrimary">Readiness Breakdown Pending</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Upload your resume to calculate your deterministic 5-factor readiness score (Technical Skills, Projects, Experience, Certifications, Assessments).
                </p>
                <div className="pt-1">
                  <Link href="/resume-analyzer" className="text-xs text-green-700 font-bold hover:underline">
                    Analyze resume now →
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="pt-4 border-t border-borderGreen flex flex-wrap gap-3">
              <Link
                href="/student/skill-twin"
                className="px-3.5 py-2 text-xs font-semibold text-textPrimary bg-canvas hover:bg-green-50 border border-borderGreen rounded-xl transition-all flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-green-600" />
                <span>Explore Skill Twin</span>
              </Link>
              <Link
                href="/student/roadmap"
                className="px-3.5 py-2 text-xs font-semibold text-textPrimary bg-canvas hover:bg-green-50 border border-borderGreen rounded-xl transition-all flex items-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-green-600" />
                <span>Learning Roadmap</span>
              </Link>
              <Link
                href="/student/applications"
                className="px-3.5 py-2 text-xs font-semibold text-textPrimary bg-canvas hover:bg-green-50 border border-borderGreen rounded-xl transition-all flex items-center gap-2"
              >
                <Briefcase className="w-3.5 h-3.5 text-green-600" />
                <span>Track Applications</span>
              </Link>
            </div>
          </div>

          {/* Right Col: Top Matched Opportunities */}
          <div className="p-6 rounded-2xl bg-white border border-borderGreen shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-textPrimary">Top Matched Roles</h3>
                <p className="text-xs text-muted">Based on your extracted skills</p>
              </div>
              <Link
                href="/student/opportunities"
                className="text-xs font-semibold text-green-700 hover:text-green-800"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {matchedOpportunities.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-canvas border border-dashed border-borderGreen space-y-2">
                  <Briefcase className="w-6 h-6 text-green-600 mx-auto" />
                  <p className="text-xs font-bold text-textPrimary">No Matched Roles Yet</p>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Upload your resume to extract verified competencies and receive transparent, explainable job matches.
                  </p>
                  <div className="pt-1">
                    <Link href="/resume-analyzer" className="text-xs text-green-700 font-bold hover:underline">
                      Upload resume now →
                    </Link>
                  </div>
                </div>
              ) : (
                matchedOpportunities.slice(0, 3).map((match, idx) => {
                  const opp = match.opportunity;
                  const isApplied = appliedIds[opp.id];
                  return (
                    <div
                      key={opp.id || idx}
                      className="p-4 rounded-xl border border-borderGreen bg-canvas hover:border-green-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-textPrimary">{opp.title}</h4>
                          <p className="text-[11px] text-muted">{opp.company} • {opp.location}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-green-100 text-green-800 border border-green-200">
                          {match.matchScore}% Match
                        </span>
                      </div>

                    <div className="flex flex-wrap gap-1">
                      {match.matchedSkills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-green-50 text-green-700 border border-green-200"
                        >
                          ✓ {sk}
                        </span>
                      ))}
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-muted font-mono">{opp.type}</span>
                      <button
                        onClick={() => handleApply(opp.id)}
                        disabled={isApplied}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          isApplied
                            ? 'bg-slate-100 text-slate-500 cursor-default'
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-xs'
                        }`}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>
        </div>

        {/* User Reports History Preview */}
        {userReports.length > 0 && (
          <div className="p-6 rounded-2xl bg-white border border-borderGreen shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-textPrimary">Your Saved Career Reports</h3>
                <p className="text-xs text-muted">
                  Multi-version intelligence tracking scoped strictly to your account
                </p>
              </div>
              <Link
                href="/reports"
                className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
              >
                <span>Manage All Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userReports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl border border-borderGreen bg-canvas space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-textPrimary">
                      Version {report.version}.0
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-mono font-bold">
                      {report.readinessScore}% Readiness
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    Target: <strong className="text-textPrimary">{report.targetRole}</strong>
                  </p>
                  <p className="text-[11px] text-muted">
                    File: {report.resumeMeta.fileName} • {new Date(report.generatedAt).toLocaleDateString()}
                  </p>
                  <div className="pt-2 border-t border-borderGreen flex items-center justify-between gap-2">
                    <Link
                      href={`/reports/view?id=${report.id}`}
                      className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View</span>
                    </Link>
                    <button
                      onClick={() => downloadDocxReport(report)}
                      className="text-xs font-semibold text-muted hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>DOCX</span>
                    </button>
                    <button
                      onClick={() => downloadJsonReport(report)}
                      className="text-xs font-semibold text-muted hover:text-green-700 flex items-center gap-1"
                    >
                      <FileCode className="w-3 h-3" />
                      <span>JSON</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
