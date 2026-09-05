'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { CareerReport, ReportComparisonResult, ResumeAnalysisResult } from '@/types';
import {
  FileText,
  Download,
  Trash2,
  GitCompare,
  ExternalLink,
  Plus,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileCode,
  Calendar,
  Layers,
  X,
  Sparkles,
} from 'lucide-react';
import {
  downloadDocxReport,
  downloadJsonReport,
  downloadOriginalResumeFile,
} from '@/lib/document-generator';
import {
  getUserResumeRecord,
  compareCareerReports,
  createCareerReportFromAnalysis,
} from '@/lib/report-storage';
import { PRIMARY_STUDENT } from '@/data/seedData';

export default function ReportsListingPage() {
  const {
    currentUser,
    userReports,
    lastGeneratedReport,
    deleteReport,
    handleResumeUpload,
    refreshUserReports,
  } = useApp();

  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [comparing, setComparing] = useState<ReportComparisonResult | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Combine user reports or fallback to last generated report
  const displayReports = userReports.length > 0 ? userReports : lastGeneratedReport ? [lastGeneratedReport] : [];

  const handleDownloadDocx = async (report: CareerReport) => {
    try {
      setDownloadingId(report.id);
      await downloadDocxReport(report);
    } catch (err) {
      console.error('Failed to download DOCX', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadResume = (report: CareerReport) => {
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
        fileSize: report.resumeMeta.fileSize || '140 KB',
        fileType: report.resumeMeta.fileType || 'pdf',
        uploadedAt: report.resumeMeta.uploadedAt,
        rawText: `Resume of ${report.candidateInfo.name}\nTarget Role: ${report.targetRole}\nSkills: ${report.skills.map(s => s.name).join(', ')}`,
      });
    }
  };

  const handleDelete = (reportId: string) => {
    deleteReport(reportId);
    setDeleteConfirmId(null);
  };

  const handleLoadDemoReport = () => {
    // Generate a full report from primary student demo data
    const demoAnalysis: ResumeAnalysisResult = {
      id: 'demo_analysis_abdul',
      fileName: 'Abdul_Aziz_Resume_v1.pdf',
      fileSize: '142 KB',
      fileType: 'pdf',
      uploadedAt: new Date().toISOString(),
      rawText: 'Abdul Aziz Resume...',
      name: PRIMARY_STUDENT.name,
      email: PRIMARY_STUDENT.email,
      phone: PRIMARY_STUDENT.phone,
      education: `${PRIMARY_STUDENT.degree}, ${PRIMARY_STUDENT.college}`,
      degree: PRIMARY_STUDENT.degree,
      college: PRIMARY_STUDENT.college,
      experienceYears: 1,
      technicalSkills: PRIMARY_STUDENT.skills.map((s) => ({
        name: s.name,
        category: 'technical',
        score: s.score,
        evidenceSnippet: 'Extracted from student profile engineering projects.',
        label: 'Estimated from resume evidence',
      })),
      softSkills: ['Analytical Thinking', 'System Architecture', 'Technical Communication', 'Agile Collaboration'],
      tools: ['Git', 'Docker', 'Postman', 'Linux', 'Redis'],
      projects: PRIMARY_STUDENT.projects.map((p) => ({
        title: p.title,
        description: p.description,
        skills: p.skills,
      })),
      certifications: PRIMARY_STUDENT.certifications.map((c) => c.title),
      internships: PRIMARY_STUDENT.internships.map((i) => ({
        role: i.role,
        company: i.company,
        duration: i.duration,
      })),
      achievements: PRIMARY_STUDENT.achievements,
      targetRole: PRIMARY_STUDENT.targetRole,
      readinessScore: PRIMARY_STUDENT.readinessScore,
      scoreBreakdown: {
        technicalSkills: 34,
        projects: 12,
        experience: 7,
        certifications: 6,
        assessment: 9,
      },
    };

    handleResumeUpload(demoAnalysis, {
      fileName: 'Abdul_Aziz_Resume_v1.pdf',
      fileSize: '142 KB',
      fileType: 'pdf',
    });
    refreshUserReports();
  };

  const handleCompareToggle = (reportId: string) => {
    if (selectedForCompare.includes(reportId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== reportId));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], reportId]);
      } else {
        setSelectedForCompare([...selectedForCompare, reportId]);
      }
    }
  };

  const executeComparison = () => {
    if (selectedForCompare.length !== 2) return;
    const r1 = displayReports.find(r => r.id === selectedForCompare[0]);
    const r2 = displayReports.find(r => r.id === selectedForCompare[1]);
    if (!r1 || !r2) return;
    // Order chronologically
    const [oldR, newR] = r1.version <= r2.version ? [r1, r2] : [r2, r1];
    const diff = compareCareerReports(oldR, newR);
    setComparing(diff);
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-borderGreen shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Document Deliverables & Intelligence Archive
                </span>
                <span className="text-[11px] bg-green-50 border border-green-200 text-green-800 px-2 py-0.5 rounded-full font-semibold">
                  Multi-Version Tracking
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                My Resume Intelligence Reports
              </h1>
              <p className="text-sm text-muted mt-1 max-w-2xl">
                Every uploaded resume produces a persistent, 40-attribute career intelligence report.
                Track version diffs, download publication-grade Word documents, and inspect structured JSON data.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/resume-analyzer"
                className="px-4 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload & Generate New Report</span>
              </Link>
            </div>
          </div>

          {/* Comparison Action Bar */}
          {displayReports.length >= 2 && (
            <div className="mt-6 pt-5 border-t border-borderGreen flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-muted">
                Select any two reports to execute a multi-version progress comparison:
                <span className="font-semibold text-textPrimary ml-1.5">
                  ({selectedForCompare.length}/2 selected)
                </span>
              </div>
              <button
                onClick={executeComparison}
                disabled={selectedForCompare.length !== 2}
                className="px-4 py-2 text-xs font-bold text-white bg-green-700 hover:bg-green-800 disabled:bg-slate-200 disabled:text-slate-400 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Compare Selected Versions</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {displayReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-borderGreen shadow-xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-textPrimary">No Career Reports Found</h3>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
              Upload your resume in PDF, DOCX, or TXT format to automatically generate your first comprehensive
              career readiness audit and download deliverables.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/resume-analyzer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs"
              >
                Upload Resume Now
              </Link>
              <button
                onClick={handleLoadDemoReport}
                className="px-5 py-2.5 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs"
              >
                Load Judge Demo Report
              </button>
            </div>
          </div>
        ) : (
          /* Reports Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReports.map((report) => {
              const isSelected = selectedForCompare.includes(report.id);
              const isDownloading = downloadingId === report.id;

              return (
                <div
                  key={report.id}
                  className={`p-6 rounded-2xl bg-white border transition-all shadow-xs flex flex-col justify-between ${
                    isSelected ? 'border-green-600 ring-2 ring-green-600/20' : 'border-borderGreen hover:border-green-300'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Version & Checkbox for compare */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-green-100 text-green-800 border border-green-200">
                          v{report.version}.0
                        </span>
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {displayReports.length >= 2 && (
                        <button
                          onClick={() => handleCompareToggle(report.id)}
                          className={`text-xs px-2 py-1 rounded border transition-all ${
                            isSelected
                              ? 'bg-green-600 text-white border-green-600 font-bold'
                              : 'bg-white text-muted border-slate-200 hover:border-green-500'
                          }`}
                        >
                          {isSelected ? 'Selected ✓' : 'Select'}
                        </button>
                      )}
                    </div>

                    {/* Candidate & Target Role */}
                    <div>
                      <h3 className="text-base font-bold text-textPrimary leading-snug">
                        {report.candidateInfo.name || 'Candidate Intelligence Report'}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">
                        Target Role: <strong className="text-green-700">{report.targetRole}</strong>
                      </p>
                    </div>

                    {/* Readiness Progress Bar */}
                    <div className="p-3 rounded-xl bg-canvas border border-borderGreen space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-textPrimary">Readiness Score</span>
                        <span className="font-mono font-bold text-green-700">{report.readinessScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-600 h-full rounded-full transition-all"
                          style={{ width: `${report.readinessScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Attributes Tags */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-canvas border border-borderGreen">
                        <div className="font-bold text-textPrimary">{report.skills.length}</div>
                        <div className="text-[10px] text-muted">Skills</div>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas border border-borderGreen">
                        <div className="font-bold text-amber-600">{report.criticalGaps.length}</div>
                        <div className="text-[10px] text-muted">Gaps</div>
                      </div>
                      <div className="p-2 rounded-lg bg-canvas border border-borderGreen">
                        <div className="font-bold text-green-700">{report.opportunities.length}</div>
                        <div className="text-[10px] text-muted">Roles</div>
                      </div>
                    </div>

                    {/* Source File Meta */}
                    <div className="text-[11px] text-muted flex items-center gap-1.5 truncate">
                      <Paperclip className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{report.resumeMeta.fileName}</span>
                      <span>({report.resumeMeta.fileSize})</span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="pt-5 mt-5 border-t border-borderGreen space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/reports/view?id=${report.id}`}
                        className="px-3 py-2 text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-green-600" />
                        <span>View Report</span>
                      </Link>

                      <button
                        onClick={() => handleDownloadDocx(report)}
                        disabled={isDownloading}
                        className="px-3 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isDownloading ? 'Building...' : '.DOCX'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <button
                        onClick={() => downloadJsonReport(report)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-muted hover:text-textPrimary transition-all flex items-center justify-center gap-1"
                        title="Download structured JSON report"
                      >
                        <FileCode className="w-3 h-3 text-green-600" />
                        <span className="text-[11px]">JSON</span>
                      </button>

                      <button
                        onClick={() => handleDownloadResume(report)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-muted hover:text-textPrimary transition-all flex items-center justify-center gap-1"
                        title="Download original uploaded resume"
                      >
                        <Paperclip className="w-3 h-3 text-blue-600" />
                        <span className="text-[11px]">Resume</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(report.id)}
                        className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500 hover:text-red-700 transition-all flex items-center justify-center gap-1"
                        title="Delete this report"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span className="text-[11px]">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* COMPARISON MODAL */}
        {comparing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-borderGreen max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-borderGreen pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <GitCompare className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-bold text-textPrimary">Report Version Comparison</h3>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    Comparing v{comparing.reportA.version}.0 against v{comparing.reportB.version}.0
                  </p>
                </div>
                <button
                  onClick={() => setComparing(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-muted hover:text-textPrimary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-level Readiness Delta */}
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-green-800 font-semibold uppercase tracking-wide">Readiness Score Delta</span>
                  <div className="text-2xl font-extrabold text-green-900 mt-0.5">
                    {comparing.reportA.readinessScore}% → {comparing.reportB.readinessScore}%
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      comparing.readinessDelta >= 0
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    {comparing.readinessDelta >= 0 ? `+${comparing.readinessDelta}%` : `${comparing.readinessDelta}%`}
                  </span>
                </div>
              </div>

              {/* Detailed Diff Sections */}
              <div className="space-y-4 text-xs">
                {/* Newly Acquired Skills */}
                <div className="space-y-2">
                  <h4 className="font-bold text-textPrimary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Newly Acquired Skills ({comparing.newSkills.length})
                  </h4>
                  {comparing.newSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {comparing.newSkills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-200 font-medium">
                          + {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No newly added skills detected in this revision.</p>
                  )}
                </div>

                {/* Resolved Critical Gaps */}
                <div className="space-y-2">
                  <h4 className="font-bold text-textPrimary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Resolved Critical Gaps ({comparing.resolvedGaps.length})
                  </h4>
                  {comparing.resolvedGaps.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {comparing.resolvedGaps.map((g) => (
                        <span key={g} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium line-through">
                          ✓ {g}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No critical gaps were closed between these two versions.</p>
                  )}
                </div>

                {/* Newly Emerged Gaps */}
                {comparing.newGaps.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      New Critical Gaps ({comparing.newGaps.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {comparing.newGaps.map((g) => (
                        <span key={g} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                          ! {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-borderGreen flex justify-end">
                <button
                  onClick={() => setComparing(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Close Comparison
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-borderGreen max-w-md w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-textPrimary">Delete Career Report?</h3>
                  <p className="text-xs text-muted">
                    This will permanently delete this versioned report from your private archive.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
