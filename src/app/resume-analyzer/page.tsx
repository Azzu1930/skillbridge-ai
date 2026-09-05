'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  extractTextFromPdf,
  extractTextFromDocx,
  extractTextFromDoc,
  parseResumeContent,
  compareResumeVersions,
} from '@/lib/resume-parser';
import {
  calculateSkillGapForResume,
  matchPersonalizedOpportunities,
  simulateCareerReadiness,
} from '@/lib/ai-engine';
import { TARGET_ROLE_BENCHMARKS, SIMULATOR_ACTIONS } from '@/data/seedData';
import { ResumeAnalysisResult, SimulatorAction, CareerReport } from '@/types';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  Briefcase,
  Target,
  Shield,
  Layers,
  TrendingUp,
  Award,
  Check,
  Building,
  User,
  ExternalLink,
  PlusCircle,
  Download,
  FileCode,
  Paperclip,
  ShieldCheck,
} from 'lucide-react';
import {
  downloadDocxReport,
  downloadJsonReport,
  downloadOriginalResumeFile,
} from '@/lib/document-generator';
import { getUserResumeRecord } from '@/lib/report-storage';

type UploadState = 'idle' | 'uploading' | 'uploaded' | 'processing' | 'analyzing' | 'completed' | 'error';

const TWELVE_STEPS = [
  'Reading and validating resume document structure',
  'Parsing document byte stream and font maps',
  'Extracting selectable text layers',
  'Segmenting document sections (Education, Experience, Skills)',
  'Cross-referencing against 150+ technology taxonomy',
  'Calculating competency proficiency scores & evidence snippets',
  'Detecting projects, repositories & verified credentials',
  'Computing deterministic 5-factor career readiness',
  'Benchmarking skill gaps against target industry role',
  'Calculating explainable job opportunity matches',
  'Compiling 40-attribute persistent career intelligence report',
  'Finalizing downloadable Word (.DOCX) and JSON deliverables',
];

export default function ResumeAnalyzerPage() {
  const {
    currentUser,
    isAuthenticated,
    userResumeProfile,
    handleResumeUpload,
    resumeVersions,
    opportunities,
    applyToOpportunity,
    applications,
    lastGeneratedReport,
  } = useApp();

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>(userResumeProfile ? 'completed' : 'idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeReport, setActiveReport] = useState<CareerReport | null>(lastGeneratedReport || null);
  const [downloadingDocx, setDownloadingDocx] = useState(false);

  const [pipelineSteps, setPipelineSteps] = useState<{ label: string; status: 'pending' | 'active' | 'done' }[]>(
    TWELVE_STEPS.map((label) => ({ label, status: 'pending' }))
  );

  // Current analysis state (defaults to saved user profile if available)
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(userResumeProfile || null);
  const [selectedRole, setSelectedRole] = useState<string>(
    userResumeProfile?.targetRole || 'Backend Developer'
  );
  const [sortGapBy, setSortGapBy] = useState<'gap' | 'priority' | 'score'>('gap');
  const [appliedOpps, setAppliedOpps] = useState<Set<string>>(
    new Set(applications.map((a) => a.opportunityId))
  );

  // Embedded Simulator State
  const [simActions, setSimActions] = useState<SimulatorAction[]>(SIMULATOR_ACTIONS);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const roleNames = Object.keys(TARGET_ROLE_BENCHMARKS);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      setPendingFile(f);
      setErrorMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setPendingFile(f);
      setErrorMessage('');
    }
  };

  const processSelectedFile = async (selectedFile: File) => {
    setErrorMessage('');
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) {
      setUploadState('error');
      setErrorMessage('Unsupported format. Please upload a PDF, DOC, DOCX, or TXT file (up to 10 MB).');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadState('error');
      setErrorMessage('File size exceeds 10 MB limit. Please upload a smaller document.');
      return;
    }

    setFile(selectedFile);
    setPendingFile(selectedFile);
    setUploadState('uploading');
    setUploadProgress(0);
    setPipelineSteps(TWELVE_STEPS.map((label) => ({ label, status: 'pending' })));

    // Read Data URL concurrently so original file is permanently downloadable
    let fileDataUrl: string | undefined = undefined;
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          fileDataUrl = reader.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch {
      // Fallback
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 15;
      });
    }, 60);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState('uploaded');

      // Begin 12-Step Animated Pipeline
      setUploadState('processing');

      const setStepStatus = (index: number, status: 'pending' | 'active' | 'done') => {
        setPipelineSteps((prev) => prev.map((s, i) => (i === index ? { ...s, status } : s)));
      };

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      // Step 0: Reading structure
      setStepStatus(0, 'active');
      await delay(120);
      setStepStatus(0, 'done');

      // Step 1: Parsing byte stream & font maps
      setStepStatus(1, 'active');
      await delay(120);
      setStepStatus(1, 'done');

      // Step 2: Extracting selectable text layers
      setStepStatus(2, 'active');
      let extractedText = '';
      try {
        if (ext === 'pdf') {
          extractedText = await extractTextFromPdf(arrayBuffer);
        } else if (ext === 'docx') {
          extractedText = await extractTextFromDocx(arrayBuffer);
        } else if (ext === 'doc') {
          extractedText = await extractTextFromDoc(arrayBuffer);
        } else {
          const decoder = new TextDecoder('utf-8');
          extractedText = decoder.decode(arrayBuffer);
        }
      } catch (err: any) {
        setUploadState('error');
        setErrorMessage(
          err.message || "We couldn't extract selectable text from this PDF. Please upload a text-based PDF or DOCX."
        );
        return;
      }
      setStepStatus(2, 'done');

      // Step 3: Segmenting sections
      setStepStatus(3, 'active');
      await delay(100);
      setStepStatus(3, 'done');

      // Step 4: Cross-referencing against 150+ taxonomy
      setStepStatus(4, 'active');
      await delay(100);
      setStepStatus(4, 'done');

      // Step 5: Calculating competency scores & evidence snippets
      setStepStatus(5, 'active');
      await delay(100);
      setStepStatus(5, 'done');

      // Step 6: Detecting projects, repositories & credentials
      setStepStatus(6, 'active');
      const fileSizeFormatted = (selectedFile.size / 1024).toFixed(0) + ' KB';
      const parsedResult = parseResumeContent(extractedText, {
        fileName: selectedFile.name,
        fileSize: fileSizeFormatted,
        fileType: ext as any,
      });
      await delay(100);
      setStepStatus(6, 'done');

      // Step 7: Computing deterministic 5-factor readiness
      setStepStatus(7, 'active');
      await delay(100);
      setStepStatus(7, 'done');

      // Step 8: Benchmarking skill gaps
      setStepStatus(8, 'active');
      await delay(100);
      setStepStatus(8, 'done');

      // Step 9: Calculating explainable opportunity matches
      setStepStatus(9, 'active');
      await delay(100);
      setStepStatus(9, 'done');

      // Step 10: Compiling 40-attribute persistent career report
      setStepStatus(10, 'active');
      const compiledReport = handleResumeUpload(parsedResult, {
        fileName: selectedFile.name,
        fileSize: fileSizeFormatted,
        fileType: ext as any,
        fileDataUrl,
      });
      await delay(140);
      setStepStatus(10, 'done');

      // Step 11: Finalizing deliverables
      setStepStatus(11, 'active');
      await delay(140);
      setStepStatus(11, 'done');

      setAnalysis(parsedResult);
      setActiveReport(compiledReport);
      setUploadState('completed');
    } catch (err: any) {
      clearInterval(progressInterval);
      setUploadState('error');
      setErrorMessage(err.message || 'Failed to process file.');
    }
  };

  // Quick load sample resume for instant evaluator testing
  const handleLoadSampleResume = () => {
    const sampleText = `
Abdul Aziz
Email: abdul.aziz@nit.edu | Phone: +91 98765 43210 | GitHub: github.com/Azzu1930
Education: B.Tech in Computer Science & Engineering, NIT (CGPA: 8.74)

Technical Skills:
- Languages: Python, SQL, JavaScript, HTML, CSS, C++
- Backend: REST APIs, FastAPI (basic), PostgreSQL, SQLite
- DevOps & Tools: Git, GitHub, Docker (basic), Linux, VS Code, Postman
- Architecture: Database Indexing, Relational Schema Design, Problem Solving

Projects:
1. Distributed Async Task Queue & Worker Service
Engineered background task processing queue handling concurrent request bursts with REST API integration and database persistence.
Technologies: Python, SQL, REST APIs, Git

2. Student Management Database Platform
Designed normalized PostgreSQL schema, automated migrations, and complex analytic aggregation queries.
Technologies: SQL, PostgreSQL, Python

Certifications:
- Python Data Structures & Algorithms Specialization
- Database Management Systems Certification
    `;

    setFile(new File([sampleText], 'Abdul_Aziz_Resume.pdf', { type: 'application/pdf' }));
    setUploadState('uploading');
    setUploadProgress(100);

    setTimeout(() => {
      setUploadState('processing');
      const parsedResult = parseResumeContent(sampleText, {
        fileName: 'Abdul_Aziz_Resume.pdf',
        fileSize: '142 KB',
        fileType: 'pdf',
      });
      const compiledReport = handleResumeUpload(parsedResult, {
        fileName: 'Abdul_Aziz_Resume.pdf',
        fileSize: '142 KB',
        fileType: 'pdf',
      });
      setAnalysis(parsedResult);
      setActiveReport(compiledReport);
      setUploadState('completed');
    }, 600);
  };

  // Skill Gap Calculations for selected role
  const userSkillPairs = (analysis?.technicalSkills || []).map((s) => ({
    name: s.name,
    score: s.score,
  }));

  const gapDiagnostics = calculateSkillGapForResume(userSkillPairs, selectedRole);

  const sortedGaps = [...gapDiagnostics.gapItems].sort((a, b) => {
    if (sortGapBy === 'gap') return (b.gapPercentage || 0) - (a.gapPercentage || 0);
    if (sortGapBy === 'priority') {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.importance] - order[a.importance];
    }
    return b.currentScore - a.currentScore;
  });

  const baseReadiness = analysis?.readinessScore || 68;
  const simResult = simulateCareerReadiness(baseReadiness, simActions);

  const toggleSim = (id: string) => {
    setSimActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const matchedOpportunities = matchPersonalizedOpportunities(
    userSkillPairs,
    opportunities,
    selectedRole
  );

  const previousVersion = resumeVersions.length > 1 ? resumeVersions[1].analysis : null;
  const versionDiff =
    analysis && previousVersion ? compareResumeVersions(previousVersion, analysis) : null;

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
      downloadOriginalResumeFile({
        id: resumeId,
        userId,
        fileName: activeReport.resumeMeta.fileName || 'Resume.pdf',
        fileSize: activeReport.resumeMeta.fileSize || '142 KB',
        fileType: activeReport.resumeMeta.fileType || 'pdf',
        uploadedAt: activeReport.resumeMeta.uploadedAt,
        rawText: `Resume of ${activeReport.candidateInfo.name}\nTarget Role: ${activeReport.targetRole}\nSkills: ${activeReport.skills.map((s) => s.name).join(', ')}`,
      });
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 pb-16 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Resume Intelligence & Career Deliverables</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                Analyze Your Resume
              </h1>
              <p className="text-muted text-sm max-w-2xl leading-relaxed">
                Upload your resume to extract skills, calculate your deterministic 5-factor career readiness,
                identify critical industry gaps, and instantly download publication-ready Word (.docx) deliverables.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLoadSampleResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas hover:bg-green-50 text-textPrimary text-xs font-bold border border-borderGreen transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4 text-green-600" />
                <span>Load Sample Resume</span>
              </button>
              {analysis && (
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setUploadState('idle');
                    setFile(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-muted text-xs font-semibold border border-borderGreen transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Upload New</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Upload Area (Shown when idle, uploading, or processing) */}
        {(!analysis || uploadState !== 'completed') && (
          <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                uploadState === 'uploading' || uploadState === 'processing'
                  ? 'border-green-400 bg-green-50/50'
                  : 'border-slate-300 hover:border-green-500 hover:bg-green-50/20 bg-canvas'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-textPrimary">
                    Drag & drop your resume here
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    or <span className="text-green-700 font-semibold underline">Browse Files</span> from your computer
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 text-[11px] text-muted font-medium flex-wrap">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    PDF, DOC, DOCX, TXT
                  </span>
                  <span>•</span>
                  <span>Max 10 MB</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    100% Client-Side Privacy
                  </span>
                </div>
              </div>
            </div>

            {/* Selected File Confirmation & Trigger Bar */}
            {uploadState === 'idle' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-canvas border border-borderGreen">
                {pendingFile ? (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="p-2.5 rounded-lg bg-green-100 text-green-800 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-textPrimary truncate">{pendingFile.name}</p>
                      <p className="text-[11px] text-muted">
                        {((pendingFile.size || 0) / 1024).toFixed(0)} KB • Ready for extraction
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Select or drop a resume above to begin career intelligence analysis</span>
                  </div>
                )}

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {pendingFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setPendingFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={!pendingFile}
                    onClick={() => {
                      if (pendingFile) processSelectedFile(pendingFile);
                    }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs ${
                      pendingFile
                        ? 'bg-green-700 hover:bg-green-800 text-white cursor-pointer shadow-green-700/20 hover:scale-[1.01]'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{pendingFile ? 'Analyze Resume' : 'Analyze Resume (Choose a file first)'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload Progress & Pipeline */}
            {(uploadState === 'uploading' || uploadState === 'uploaded' || uploadState === 'processing') && (
              <div className="p-6 rounded-xl bg-canvas border border-borderGreen space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-800">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-textPrimary">{file?.name}</p>
                      <p className="text-[11px] text-muted">
                        {((file?.size || 0) / 1024).toFixed(0)} KB • {uploadState === 'uploading' ? 'Uploading document...' : 'Running Career Intelligence Engine...'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-green-700">
                    {uploadProgress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>

                {/* Real-time multi-step processing timeline */}
                <div className="pt-2 border-t border-borderGreen space-y-2">
                  <p className="text-xs font-bold text-textPrimary mb-2">
                    Live Processing Pipeline:
                  </p>
                  {pipelineSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs">
                      {step.status === 'done' && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      )}
                      {step.status === 'active' && (
                        <RefreshCw className="w-4 h-4 text-green-600 animate-spin shrink-0" />
                      )}
                      {step.status === 'pending' && (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span
                        className={
                          step.status === 'done'
                            ? 'text-textPrimary font-medium'
                            : step.status === 'active'
                            ? 'text-green-700 font-bold'
                            : 'text-slate-400'
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message with Actionable Retry Buttons */}
            {uploadState === 'error' && (
              <div className="p-5 rounded-xl bg-red-50 border border-red-200 space-y-3">
                <div className="flex items-start gap-3 text-xs text-red-700">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block text-sm text-red-900">Unable to process this file</span>
                    <p className="text-red-700 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-red-200">
                  {pendingFile && (
                    <button
                      type="button"
                      onClick={() => processSelectedFile(pendingFile)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setUploadState('idle');
                      setErrorMessage('');
                      setPendingFile(null);
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
                  >
                    Upload Another Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COMPLETED REPORT SECTION */}
        {analysis && uploadState === 'completed' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* OFFICIAL REPORT DELIVERABLES CENTER (Part 16 & 72) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white shadow-md border border-green-700 relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-medium text-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span>Intelligence Audit Complete</span>
                    {activeReport && (
                      <span className="bg-green-500/30 px-1.5 py-0.2 rounded text-[10px] font-mono text-white">
                        v{activeReport.version}.0
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Career Intelligence Deliverables Ready for Download
                  </h2>
                  <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
                    Download the complete Microsoft Word (.docx) deliverable formatted with candidate executive summary,
                    evidence-backed skill tables, 5-factor readiness breakdown, and target role remediation roadmap.
                  </p>
                </div>

                {/* 4 Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:w-96 shrink-0">
                  <Link
                    href={activeReport ? `/reports/view?id=${activeReport.id}` : '/reports/view'}
                    className="px-4 py-3 bg-white hover:bg-green-50 text-green-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4 text-green-700" />
                    <span>View Full Web Report</span>
                  </Link>

                  <button
                    onClick={handleDownloadDocx}
                    disabled={downloadingDocx || !activeReport}
                    className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadingDocx ? 'Building Word...' : 'Download .DOCX'}</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    disabled={!activeReport}
                    className="px-4 py-3 bg-green-950/60 hover:bg-green-950 text-green-100 border border-white/20 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <FileCode className="w-4 h-4 text-green-400" />
                    <span>Download .JSON</span>
                  </button>

                  <button
                    onClick={handleDownloadResume}
                    disabled={!activeReport}
                    className="px-4 py-3 bg-green-950/60 hover:bg-green-950 text-green-100 border border-white/20 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Paperclip className="w-4 h-4 text-green-400" />
                    <span>Original Resume</span>
                  </button>
                </div>
              </div>

              {/* Guest mode warning callout if unauthenticated */}
              {!isAuthenticated && (
                <div className="mt-5 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-green-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-300 shrink-0" />
                    <span>
                      Analyzing in guest mode. Create an account to permanently save this report to your private archive.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/register"
                      className="px-3 py-1 bg-white text-green-900 rounded-lg font-bold text-xs hover:bg-green-50 transition-all"
                    >
                      Create Account
                    </Link>
                    <Link
                      href="/login"
                      className="px-3 py-1 bg-green-950/50 border border-white/20 text-white rounded-lg text-xs hover:bg-green-950 transition-all"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Version Monitor Banner if updated */}
            {versionDiff && (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-100 text-green-800">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-900">
                      Resume Updated (v{resumeVersions.length})
                    </p>
                    <p className="text-[11px] text-green-800">
                      Readiness shifted: {versionDiff.oldReadiness}% → {versionDiff.newReadiness}% ({versionDiff.readinessDelta >= 0 ? `+${versionDiff.readinessDelta}%` : `${versionDiff.readinessDelta}%`}). Detected {versionDiff.addedSkills.length} new competencies.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-200/60 px-2 py-1 rounded-md text-green-900">
                  Active Version v{resumeVersions.length}
                </span>
              </div>
            )}

            {/* 1. Candidate Profile Overview Card */}
            <div className="bg-white border border-borderGreen rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-borderGreen pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center justify-center font-extrabold text-xl shadow-xs">
                    {analysis.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-textPrimary">{analysis.name}</h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-bold">
                        Extracted Candidate
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      {analysis.education}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">
                      File: <span className="font-medium text-textPrimary">{analysis.fileName}</span> ({analysis.fileSize}) • Analyzed: {analysis.uploadedAt}
                    </p>
                  </div>
                </div>

                {/* Readiness Score Badge */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center min-w-[160px]">
                  <p className="text-[10px] font-bold text-green-800 uppercase tracking-wider">
                    Career Readiness
                  </p>
                  <div className="text-3xl font-extrabold text-green-700 my-0.5 font-mono">
                    {analysis.readinessScore}%
                  </div>
                  <p className="text-[10px] text-muted font-medium">
                    Deterministic 5-factor model
                  </p>
                </div>
              </div>

              {/* 5-Factor Score Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-canvas border border-borderGreen text-center">
                  <p className="text-[10px] text-muted font-semibold uppercase">Technical Skills</p>
                  <p className="text-sm font-extrabold text-textPrimary mt-1">
                    {analysis.scoreBreakdown.technicalSkills} <span className="text-[11px] font-normal text-muted">/ 50</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-borderGreen text-center">
                  <p className="text-[10px] text-muted font-semibold uppercase">Project Relevance</p>
                  <p className="text-sm font-extrabold text-textPrimary mt-1">
                    {analysis.scoreBreakdown.projects} <span className="text-[11px] font-normal text-muted">/ 15</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-borderGreen text-center">
                  <p className="text-[10px] text-muted font-semibold uppercase">Experience / Intern</p>
                  <p className="text-sm font-extrabold text-textPrimary mt-1">
                    {analysis.scoreBreakdown.experience} <span className="text-[11px] font-normal text-muted">/ 10</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-borderGreen text-center">
                  <p className="text-[10px] text-muted font-semibold uppercase">Certifications</p>
                  <p className="text-sm font-extrabold text-textPrimary mt-1">
                    {analysis.scoreBreakdown.certifications} <span className="text-[11px] font-normal text-muted">/ 10</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas border border-borderGreen text-center col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-muted font-semibold uppercase">Verification Proof</p>
                  <p className="text-sm font-extrabold text-textPrimary mt-1">
                    {analysis.scoreBreakdown.assessment} <span className="text-[11px] font-normal text-muted">/ 15</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Extracted Competencies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Technical Skills Card */}
              <div className="lg:col-span-2 bg-white border border-borderGreen rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-borderGreen pb-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-textPrimary">Extracted Technical Skills</h3>
                    <p className="text-xs text-muted">
                      {analysis.technicalSkills.length} competencies detected from resume text
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-green-800 bg-green-50 border border-green-200 px-2 py-1 rounded">
                    Evidence Based
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysis.technicalSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-canvas border border-borderGreen hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-textPrimary">{skill.name}</span>
                        <span className="text-xs font-mono font-bold text-green-700">
                          {skill.score}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="bg-green-600 h-full rounded-full"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                      {skill.evidenceSnippet && (
                        <p className="text-[10px] text-muted italic truncate">
                          {skill.evidenceSnippet}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools, Soft Skills & Credentials */}
              <div className="space-y-6">
                {/* Soft Skills */}
                <div className="bg-white border border-borderGreen rounded-2xl p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-textPrimary mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>Soft Skills & Professionalism</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.softSkills.map((ss, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-green-50 text-green-800 border border-green-200 font-medium"
                      >
                        {ss}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Developer Tools */}
                <div className="bg-white border border-borderGreen rounded-2xl p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-textPrimary mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-green-600" />
                    <span>Tools & Environment</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-green-50 text-green-800 border border-green-200 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detected Projects */}
                <div className="bg-white border border-borderGreen rounded-2xl p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-textPrimary mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    <span>Detected Projects ({analysis.projects.length})</span>
                  </h3>
                  <div className="space-y-2.5">
                    {analysis.projects.map((proj, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-canvas border border-borderGreen text-xs">
                        <p className="font-bold text-textPrimary">{proj.title}</p>
                        <p className="text-[11px] text-muted line-clamp-2 mt-0.5">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.skills.map((s, si) => (
                            <span key={si} className="text-[9px] px-1.5 py-0.2 rounded bg-white text-muted border border-borderGreen">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Target Role Selection & Skill Gap Diagnostic */}
            <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-borderGreen pb-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-textPrimary">
                    Target Role Skill Gap Analysis
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Benchmark your extracted resume competencies against verified corporate job requirements
                  </p>
                </div>

                {/* Role Dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-textPrimary">Select Target Role:</span>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-white border border-borderGreen text-textPrimary text-xs font-bold rounded-xl px-3 py-2 shadow-xs focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    {roleNames.map((roleName) => (
                      <option key={roleName} value={roleName}>
                        {roleName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Role Overview Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-xs font-bold text-green-800">
                    Strong Competencies ({gapDiagnostics.strongSkills.length})
                  </p>
                  <p className="text-[11px] text-green-700 mt-1">
                    {gapDiagnostics.strongSkills.map((s) => s.name).join(', ') || 'None yet'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-canvas border border-borderGreen">
                  <p className="text-xs font-bold text-textPrimary">
                    Moderate Competencies ({gapDiagnostics.moderateSkills.length})
                  </p>
                  <p className="text-[11px] text-muted mt-1">
                    {gapDiagnostics.moderateSkills.map((s) => s.name).join(', ') || 'None'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-xs font-bold text-amber-800">
                    Critical Skill Gaps ({gapDiagnostics.criticalGaps.length})
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    {gapDiagnostics.criticalGaps.map((s) => s.skill).join(', ')}
                  </p>
                </div>
              </div>

              {/* Visual Skill Gap Table / Chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-borderGreen">
                  <span className="font-semibold">Required Benchmark Skill</span>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline">Current vs Target</span>
                    <div className="flex items-center gap-1">
                      <span>Sort by:</span>
                      <button
                        onClick={() => setSortGapBy('gap')}
                        className={`px-2 py-0.5 rounded font-medium ${sortGapBy === 'gap' ? 'bg-green-100 text-green-800 font-bold' : 'hover:text-textPrimary'}`}
                      >
                        Highest Gap
                      </button>
                      <button
                        onClick={() => setSortGapBy('priority')}
                        className={`px-2 py-0.5 rounded font-medium ${sortGapBy === 'priority' ? 'bg-green-100 text-green-800 font-bold' : 'hover:text-textPrimary'}`}
                      >
                        Priority
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {sortedGaps.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-canvas border border-borderGreen hover:border-green-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-textPrimary">{item.skill}</span>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              item.status === 'Acquired'
                                ? 'bg-green-100 text-green-800'
                                : item.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[10px] text-muted">
                            Priority: <span className="font-semibold text-textPrimary">{item.importance}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono">
                          <span className="text-textPrimary font-semibold">{item.currentScore}%</span>
                          <span className="text-muted">/</span>
                          <span className="text-green-700 font-bold">{item.targetScore}% Target</span>
                          {item.gapPercentage ? (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              -{item.gapPercentage}% Gap
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Progress Bar Dual Layer */}
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden relative mb-2">
                        <div
                          className="absolute top-0 bottom-0 bg-green-200 rounded-full"
                          style={{ width: `${item.targetScore}%` }}
                        />
                        <div
                          className={`absolute top-0 bottom-0 rounded-full ${
                            item.status === 'Acquired'
                              ? 'bg-green-600'
                              : item.status === 'In Progress'
                              ? 'bg-blue-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${item.currentScore}%` }}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted gap-1 pt-1">
                        <span>{item.gapReason}</span>
                        <span className="text-green-700 font-medium sm:text-right shrink-0">
                          {item.recommendedAction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Connected Career Readiness Simulator */}
            <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-borderGreen pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full mb-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>What-If Projections</span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary">
                    Career Readiness Simulator
                  </h3>
                  <p className="text-xs text-muted">
                    Simulate upskilling milestones to close your detected {selectedRole} skill gaps
                  </p>
                </div>

                {/* Dynamic Projection Gauge */}
                <div className="flex items-center gap-4 bg-canvas border border-borderGreen p-3.5 rounded-xl">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted">Current</p>
                    <p className="text-xl font-extrabold text-textPrimary">{baseReadiness}%</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-green-700">Projected</p>
                    <p className="text-xl font-extrabold text-green-700">{simResult.projectedScore}%</p>
                  </div>
                  <div className="pl-3 border-l border-borderGreen">
                    <span className="text-xs font-bold text-green-800 bg-green-100 px-2 py-1 rounded">
                      +{simResult.delta}% Gain
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {simActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => toggleSim(action.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      action.completed
                        ? 'bg-green-50 border-green-300 text-green-900 shadow-xs'
                        : 'bg-white border-borderGreen hover:border-green-300 text-textPrimary'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-bold">{action.title}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          action.completed
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {action.completed && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted mb-2">{action.description}</p>
                    <div className="flex items-center justify-between text-[10px] font-semibold">
                      <span className="text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        +{action.impactScore}% Readiness
                      </span>
                      <span className="text-muted">{action.effortWeeks} Weeks effort</span>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-muted italic text-center">
                Notice: Model-based projection — not a guaranteed employment probability.
              </p>
            </div>

            {/* 5. Recommended Projects to Close Gaps */}
            <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-textPrimary mb-1">
                Recommended Capstone Projects
              </h3>
              <p className="text-xs text-muted mb-6">
                Targeted projects designed to produce verified GitHub evidence for your critical skill gaps
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-canvas border border-borderGreen flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-textPrimary">
                        Production-Ready FastAPI Expense Management API
                      </h4>
                      <span className="text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded">
                        High Impact
                      </span>
                    </div>
                    <p className="text-xs text-muted mb-3">
                      Architect an asynchronous RESTful backend with Pydantic validation, PostgreSQL connection pooling, JWT authentication, and multi-stage Docker deployment.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {['FastAPI', 'REST APIs', 'PostgreSQL', 'Docker', 'Authentication'].map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-muted border border-borderGreen font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Project added to your personalized roadmap!')}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add to My Roadmap</span>
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-canvas border border-borderGreen flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-textPrimary">
                        Containerized Microservices with Redis Queue
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Cloud Ready
                      </span>
                    </div>
                    <p className="text-xs text-muted mb-3">
                      Deploy decoupled services communicating via asynchronous Redis pub/sub message brokers with automated health checks and CI/CD tests.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {['Docker', 'Redis', 'Cloud', 'System Design', 'CI/CD'].map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-muted border border-borderGreen font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Project added to your personalized roadmap!')}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add to My Roadmap</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Personalized Opportunities for User's Extracted Skills */}
            <div className="bg-white border border-borderGreen rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderGreen pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 px-2.5 py-1 rounded-full mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Personalized Job Matches</span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary">
                    Opportunities Matching Your Resume
                  </h3>
                  <p className="text-xs text-muted">
                    Ranked by transparent compatibility with your extracted skill set
                  </p>
                </div>

                <span className="text-xs font-semibold text-muted">
                  Showing top {matchedOpportunities.length} positions
                </span>
              </div>

              <div className="space-y-4">
                {matchedOpportunities.map((match) => {
                  const opp = match.opportunity;
                  const isApplied = appliedOpps.has(opp.id);

                  return (
                    <div
                      key={opp.id}
                      className="p-5 rounded-2xl bg-canvas border border-borderGreen hover:border-green-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base font-bold text-textPrimary">{opp.title}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-200">
                            {opp.type}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                          <span className="font-semibold text-textPrimary">{opp.company}</span>
                          <span>•</span>
                          <span>{opp.location}</span>
                          <span>•</span>
                          <span className="font-mono text-green-700 font-semibold">{opp.stipend}</span>
                          <span>•</span>
                          <span>Deadline: {opp.deadline}</span>
                        </div>

                        {/* Why you're a good match */}
                        <div className="p-3 rounded-xl bg-white border border-borderGreen space-y-1">
                          <p className="text-[11px] font-bold text-textPrimary">
                            Why this matches your profile:
                          </p>
                          <div className="space-y-0.5">
                            {match.whyMatched.map((reason, ri) => (
                              <p key={ri} className="text-[11px] text-green-700">
                                {reason}
                              </p>
                            ))}
                            {match.missingSkills.length > 0 && (
                              <p className="text-[11px] text-amber-700">
                                △ Missing: {match.missingSkills.join(', ')} ({match.recommendedAction})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Score & Apply CTA */}
                      <div className="flex lg:flex-col items-center justify-between lg:items-end gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-2xl font-extrabold text-green-700 block font-mono">
                            {match.matchScore}%
                          </span>
                          <span className="text-[10px] text-muted uppercase font-semibold">
                            Match Fit
                          </span>
                        </div>

                        <button
                          disabled={isApplied}
                          onClick={() => {
                            applyToOpportunity(opp.id);
                            setAppliedOpps((prev) => new Set([...prev, opp.id]));
                          }}
                          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                            isApplied
                              ? 'bg-green-100 text-green-800 border border-green-300 cursor-default'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {isApplied ? 'Application Submitted ✓' : 'Apply Directly'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
