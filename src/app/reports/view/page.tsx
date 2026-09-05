'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { CareerReport, ResumeAnalysisResult } from '@/types';
import {
  FileText,
  Download,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Award,
  Briefcase,
  Layers,
  Paperclip,
  FileCode,
  Printer,
  TrendingUp,
  Target,
  User,
} from 'lucide-react';
import {
  downloadDocxReport,
  downloadJsonReport,
  downloadOriginalResumeFile,
} from '@/lib/document-generator';
import { getUserResumeRecord, getUserReportById, createCareerReportFromAnalysis } from '@/lib/report-storage';

function ReportViewContent() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('id');

  const {
    currentUser,
    userReports,
    lastGeneratedReport,
    student,
  } = useApp();

  const [downloadingDocx, setDownloadingDocx] = useState(false);

  // Authorization and Report Resolution:
  let resolvedReport: CareerReport | null = null;
  let isUnauthorized = false;
  let isNotFound = false;

  if (reportId) {
    if (currentUser) {
      resolvedReport = userReports.find((r) => r.id === reportId) || getUserReportById(currentUser.id, reportId);
      if (!resolvedReport) {
        // Check if this report belongs to another user
        let existsElsewhere = false;
        if (typeof window !== 'undefined') {
          try {
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && key.startsWith('sb_user_') && key.endsWith('_reports')) {
                const raw = localStorage.getItem(key);
                if (raw) {
                  const reps: CareerReport[] = JSON.parse(raw);
                  if (reps.some((r) => r.id === reportId)) {
                    existsElsewhere = true;
                    break;
                  }
                }
              }
            }
          } catch {
            // ignore
          }
        }
        if (existsElsewhere) {
          isUnauthorized = true;
        } else {
          isNotFound = true;
        }
      }
    } else {
      // Guest / Demo session
      if (lastGeneratedReport && lastGeneratedReport.id === reportId) {
        resolvedReport = lastGeneratedReport;
      } else {
        isNotFound = true;
      }
    }
  } else {
    // No reportId specified in query
    if (currentUser) {
      resolvedReport = userReports[0] || null;
    } else {
      resolvedReport = lastGeneratedReport || null;
    }
  }

  // Fallback demo report synthesis ONLY in explicit guest / demo mode (NEVER for authenticated users)
  if (!resolvedReport && !currentUser && !isUnauthorized && !isNotFound) {
    const demoAnalysis: ResumeAnalysisResult = {
      id: 'demo_analysis_primary',
      fileName: 'Abdul_Aziz_Resume.pdf',
      fileSize: '142 KB',
      fileType: 'pdf',
      uploadedAt: new Date().toISOString(),
      rawText: 'Abdul Aziz Resume...',
      name: student.name,
      email: student.email,
      phone: student.phone,
      education: `${student.degree}, ${student.college}`,
      degree: student.degree,
      college: student.college,
      experienceYears: 1,
      technicalSkills: student.skills.map((s) => ({
        name: s.name,
        category: 'technical' as const,
        score: s.score,
        evidenceSnippet: `Demonstrated proficiency in ${s.name} across engineering projects and coursework.`,
        label: 'Estimated from resume evidence' as const,
      })),
      softSkills: ['Analytical Thinking', 'System Architecture', 'Technical Communication', 'Agile Collaboration'],
      tools: ['Git', 'Docker', 'Postman', 'Linux', 'Redis'],
      projects: student.projects.map((p) => ({
        title: p.title,
        description: p.description,
        skills: p.skills,
      })),
      certifications: student.certifications.map((c) => c.title),
      internships: student.internships.map((i) => ({
        role: i.role,
        company: i.company,
        duration: i.duration,
      })),
      achievements: student.achievements,
      targetRole: student.targetRole,
      readinessScore: student.readinessScore,
      scoreBreakdown: {
        technicalSkills: 34,
        projects: 12,
        experience: 7,
        certifications: 6,
        assessment: 9,
      },
    };

    resolvedReport = createCareerReportFromAnalysis(demoAnalysis, 'demo_user', {
      fileName: 'Abdul_Aziz_Resume.pdf',
      fileSize: '142 KB',
      fileType: 'pdf',
    });
  }

  // 403 Forbidden State
  if (isUnauthorized) {
    return (
      <div className="p-10 text-center rounded-2xl bg-white border border-red-200 shadow-xs space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-100 text-red-800 border border-red-200 inline-block">
          403 FORBIDDEN • ACCESS DENIED
        </span>
        <h2 className="text-xl font-bold text-textPrimary">Unauthorized Report Access</h2>
        <p className="text-xs sm:text-sm text-muted">
          You do not have authorization to view this Career Intelligence Report. This report belongs to another candidate account.
        </p>
        <div className="pt-2">
          <Link
            href="/reports"
            className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs inline-block"
          >
            Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  // 404 Not Found State
  if (isNotFound) {
    return (
      <div className="p-10 text-center rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <FileText className="w-8 h-8 text-slate-500" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-block">
          404 NOT FOUND
        </span>
        <h2 className="text-xl font-bold text-textPrimary">Report Not Found</h2>
        <p className="text-xs sm:text-sm text-muted">
          No Career Intelligence Report exists with ID "{reportId}".
        </p>
        <div className="pt-2">
          <Link
            href="/reports"
            className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs inline-block"
          >
            Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated User Empty State (0 reports)
  if (!resolvedReport) {
    return (
      <div className="p-10 text-center rounded-2xl bg-white border border-dashed border-borderGreen shadow-xs space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-textPrimary">No Reports Generated Yet</h2>
        <p className="text-xs sm:text-sm text-muted">
          Upload your resume to generate your first personalized Career Intelligence Report.
        </p>
        <div className="pt-2">
          <Link
            href="/resume-analyzer"
            className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs inline-block"
          >
            Upload Resume Now
          </Link>
        </div>
      </div>
    );
  }

  const report = resolvedReport;

  const handleDownloadDocx = async () => {
    try {
      setDownloadingDocx(true);
      await downloadDocxReport(report);
    } catch (err) {
      console.error('Failed to download DOCX', err);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadJson = () => {
    downloadJsonReport(report);
  };

  const handleDownloadResume = () => {
    const userId = currentUser?.id || 'demo_user';
    const resumeId = report.resumeId || report.resumeRecordId || 'demo_resume';
    const resumeRecord = getUserResumeRecord(userId, resumeId);
    if (resumeRecord) {
      downloadOriginalResumeFile(resumeRecord);
    } else {
      downloadOriginalResumeFile({
        id: resumeId,
        userId,
        fileName: report.resumeMeta.fileName || 'Resume.pdf',
        fileSize: report.resumeMeta.fileSize || '142 KB',
        fileType: report.resumeMeta.fileType || 'pdf',
        uploadedAt: report.resumeMeta.uploadedAt,
        rawText: `Resume of ${report.candidateInfo.name}\nTarget Role: ${report.targetRole}\nSkills: ${report.skills.map((s) => s.name).join(', ')}`,
      });
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Sticky Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-4 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/reports"
            className="p-2 rounded-xl border border-borderGreen hover:bg-green-50 text-muted hover:text-textPrimary transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Reports</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-textPrimary">
                Career Intelligence Report v{report.version}.0
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green-100 text-green-800 border border-green-200">
                {report.readinessScore}% Readiness
              </span>
            </div>
            <p className="text-[11px] text-muted">
              {report.candidateInfo.name} • {report.targetRole} • {new Date(report.generatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Deliverable Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadDocx}
            disabled={downloadingDocx}
            className="px-3.5 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            title="Download formatted Word Document (.docx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingDocx ? 'Compiling...' : 'Download .DOCX'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3.5 py-2 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            title="Download structured JSON report data"
          >
            <FileCode className="w-3.5 h-3.5 text-green-600" />
            <span>Download .JSON</span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="px-3.5 py-2 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            title="Download original uploaded resume document"
          >
            <Paperclip className="w-3.5 h-3.5 text-blue-600" />
            <span>Original Resume</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-muted hover:text-textPrimary transition-all hidden sm:flex items-center"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="bg-white border border-borderGreen rounded-3xl p-6 sm:p-10 shadow-xs space-y-10 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-borderGreen pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  SkillBridge AI • Official Career Intelligence Deliverable
                </span>
                <span className="text-[10px] bg-green-50 border border-green-200 text-green-800 px-2 py-0.5 rounded-full font-mono font-semibold">
                  Report v{report.version}.0
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                Candidate Career Intelligence Audit
              </h1>
              <p className="text-sm text-muted mt-1">
                Deterministic 5-factor competency audit, evidence-based skill twin, and industry placement roadmap.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs text-muted">Career Readiness</div>
              <div className="text-4xl font-extrabold text-green-700 font-mono">
                {report.readinessScore}%
              </div>
              <div className="text-[11px] text-muted">Benchmark Qualified</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Profile Summary & Candidate Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <User className="w-4 h-4 text-green-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              1. Candidate Profile & Target Role
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-canvas border border-borderGreen">
              <span className="text-muted block text-[10px] uppercase font-semibold">Candidate Name</span>
              <span className="font-bold text-textPrimary text-sm mt-0.5 block">{report.candidateInfo.name}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-borderGreen">
              <span className="text-muted block text-[10px] uppercase font-semibold">Email & Phone</span>
              <span className="font-medium text-textPrimary mt-0.5 block">{report.candidateInfo.email || 'N/A'} • {report.candidateInfo.phone || 'N/A'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-borderGreen">
              <span className="text-muted block text-[10px] uppercase font-semibold">Target Industry Role</span>
              <span className="font-bold text-green-700 text-sm mt-0.5 block">{report.targetRole}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-borderGreen sm:col-span-2">
              <span className="text-muted block text-[10px] uppercase font-semibold">Education & Institution</span>
              <span className="font-medium text-textPrimary mt-0.5 block">{report.candidateInfo.education}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-canvas border border-borderGreen">
              <span className="text-muted block text-[10px] uppercase font-semibold">Resume Source</span>
              <span className="font-medium text-textPrimary mt-0.5 block">{report.resumeMeta.fileName} ({report.resumeMeta.fileSize})</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Skill Profile & Evidence Snippets */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <Layers className="w-4 h-4 text-green-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              2. Verified Skill Profile & Evidence Snippets
            </h2>
          </div>

          <div className="border border-borderGreen rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-green-50/80 text-green-900 border-b border-borderGreen">
                <tr>
                  <th className="p-3 font-bold">Skill Name</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Score</th>
                  <th className="p-3 font-bold">Extracted Resume Evidence Snippet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderGreen">
                {report.skills.map((skill, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-canvas' : 'bg-white'}>
                    <td className="p-3 font-bold text-textPrimary">{skill.name}</td>
                    <td className="p-3 text-muted">{skill.category}</td>
                    <td className="p-3">
                      <span className="font-mono font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded text-[11px]">
                        {skill.score}%
                      </span>
                    </td>
                    <td className="p-3 text-muted text-[11px] leading-relaxed">
                      {skill.evidenceSnippet || 'Extracted from resume text'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: Skill Gap Analysis & Target Role Benchmark */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              3. Skill Gap Analysis & Industry Benchmark
            </h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Critical Competency Gaps (Required for Placement)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.criticalGaps.map((gap, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">⚠ {gap.skill}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                      {gap.importance}
                    </span>
                  </div>
                  <p className="text-amber-800 text-[11px]">
                    <strong>Industry Gap:</strong> {gap.gapReason}
                  </p>
                  <p className="text-textPrimary text-[11px] pt-1 border-t border-amber-200/60">
                    <strong>Recommended Action:</strong> {gap.recommendedAction}
                  </p>
                </div>
              ))}
            </div>

            {report.moderateGaps.length > 0 && (
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Moderate Enhancement Opportunities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {report.moderateGaps.map((gap, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-borderGreen bg-canvas space-y-1.5 text-xs">
                      <div className="font-bold text-textPrimary">{gap.skill}</div>
                      <p className="text-muted text-[11px]">{gap.gapReason}</p>
                      <p className="text-green-700 text-[11px]">Action: {gap.recommendedAction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: Deterministic 5-Factor Readiness Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              4. Deterministic 5-Factor Readiness Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-xl bg-canvas border border-borderGreen text-center space-y-1">
              <span className="text-muted block text-[10px] uppercase font-semibold">Technical Skills</span>
              <div className="text-xl font-extrabold text-green-700 font-mono">
                {report.scoreBreakdown.technicalSkills} <span className="text-xs text-muted font-normal">/ 50</span>
              </div>
              <p className="text-[10px] text-muted">Core programming & systems</p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-borderGreen text-center space-y-1">
              <span className="text-muted block text-[10px] uppercase font-semibold">Project Relevance</span>
              <div className="text-xl font-extrabold text-green-700 font-mono">
                {report.scoreBreakdown.projects} <span className="text-xs text-muted font-normal">/ 15</span>
              </div>
              <p className="text-[10px] text-muted">Practical code applications</p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-borderGreen text-center space-y-1">
              <span className="text-muted block text-[10px] uppercase font-semibold">Experience & Intern</span>
              <div className="text-xl font-extrabold text-green-700 font-mono">
                {report.scoreBreakdown.experience} <span className="text-xs text-muted font-normal">/ 10</span>
              </div>
              <p className="text-[10px] text-muted">Internships & workplace proof</p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-borderGreen text-center space-y-1">
              <span className="text-muted block text-[10px] uppercase font-semibold">Certifications</span>
              <div className="text-xl font-extrabold text-green-700 font-mono">
                {report.scoreBreakdown.certifications} <span className="text-xs text-muted font-normal">/ 10</span>
              </div>
              <p className="text-[10px] text-muted">Verified credentials</p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-borderGreen text-center space-y-1">
              <span className="text-muted block text-[10px] uppercase font-semibold">Verification Proof</span>
              <div className="text-xl font-extrabold text-green-700 font-mono">
                {report.scoreBreakdown.assessment} <span className="text-xs text-muted font-normal">/ 15</span>
              </div>
              <p className="text-[10px] text-muted">Standardized assessment</p>
            </div>
          </div>
        </div>

        {/* SECTION 5: Personalized Learning Roadmap */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <Award className="w-4 h-4 text-green-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              5. Strategic Learning Roadmap & Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.roadmap.slice(0, 4).map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-borderGreen bg-canvas space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-700 uppercase font-mono">Week {m.week}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-800 border border-green-200">
                    {m.category}
                  </span>
                </div>
                <h4 className="font-bold text-textPrimary text-sm">{m.title}</h4>
                <p className="text-muted text-[11px]">Deliverable: {m.deliverable}</p>
                <div className="pt-2 border-t border-borderGreen space-y-1">
                  <div className="text-[11px] text-textPrimary flex items-center gap-1.5">
                    <span className="text-green-600 font-bold">→</span>
                    <span>{m.reason}</span>
                  </div>
                  <div className="text-[10px] text-muted flex flex-wrap gap-1 mt-1">
                    {m.skillsImpacted.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-white text-green-700 border border-borderGreen">
                        +{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Explainable Opportunity Matching Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-borderGreen pb-2">
            <Briefcase className="w-4 h-4 text-green-600" />
            <h2 className="text-base font-bold text-textPrimary uppercase tracking-wide">
              6. Explainable Industry Opportunity Matching
            </h2>
          </div>

          <div className="border border-borderGreen rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-green-50/80 text-green-900 border-b border-borderGreen">
                <tr>
                  <th className="p-3 font-bold">Opportunity & Company</th>
                  <th className="p-3 font-bold">Match Score</th>
                  <th className="p-3 font-bold">Matched Skills</th>
                  <th className="p-3 font-bold">Missing Skills</th>
                  <th className="p-3 font-bold">Matching Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderGreen">
                {report.opportunities.map((match, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-canvas' : 'bg-white'}>
                    <td className="p-3">
                      <div className="font-bold text-textPrimary">{match.opportunity.title}</div>
                      <div className="text-[11px] text-muted">{match.opportunity.company} • {match.opportunity.location}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-green-100 text-green-800 border border-green-200">
                        {match.matchScore}%
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {match.matchedSkills.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-green-50 text-green-700 border border-green-200">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {match.missingSkills.length > 0 ? (
                          match.missingSkills.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200">
                              ! {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-muted">None</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-[11px] text-muted leading-relaxed">
                      {Array.isArray(match.whyMatched) ? match.whyMatched.join('. ') : match.whyMatched}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 7 & 8: Strengths, Weaknesses, and Action Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths & Weaknesses */}
          <div className="p-5 rounded-2xl bg-canvas border border-borderGreen space-y-4 text-xs">
            <h3 className="font-bold text-textPrimary uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Audit Strengths & Weaknesses
            </h3>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-green-800 uppercase">Demonstrated Strengths</div>
              <ul className="space-y-1 text-muted text-[11px]">
                {report.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-borderGreen">
              <div className="text-[11px] font-bold text-amber-800 uppercase">Identified Weaknesses</div>
              <ul className="space-y-1 text-muted text-[11px]">
                {report.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">!</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Plan */}
          <div className="p-5 rounded-2xl bg-canvas border border-borderGreen space-y-4 text-xs">
            <h3 className="font-bold text-textPrimary uppercase tracking-wide flex items-center gap-1.5">
              <Target className="w-4 h-4 text-green-600" />
              Prioritized Action Plan
            </h3>

            <ol className="space-y-2.5 text-[11px]">
              {report.actionPlan.map((step, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-white border border-borderGreen flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-textPrimary leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Report Footer */}
        <div className="border-t border-borderGreen pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted">
          <div>
            <span>Generated by <strong>SkillBridge AI Platform</strong></span>
            <span className="mx-2">•</span>
            <span>Deterministic 5-factor scoring engine</span>
          </div>
          <div className="font-mono text-[11px]">
            Report ID: {report.id}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportViewPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-12 text-center text-muted">Loading Career Intelligence Report...</div>}>
        <ReportViewContent />
      </Suspense>
    </AppShell>
  );
}
