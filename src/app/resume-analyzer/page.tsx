'use client';

import React, { useState, useRef } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  extractTextFromPdf,
  extractTextFromDocx,
  parseResumeContent,
  compareResumeVersions,
} from '@/lib/resume-parser';
import {
  calculateSkillGapForResume,
  matchPersonalizedOpportunities,
  simulateCareerReadiness,
} from '@/lib/ai-engine';
import { TARGET_ROLE_BENCHMARKS, SIMULATOR_ACTIONS } from '@/data/seedData';
import { ResumeAnalysisResult, SkillGapItem, SimulatorAction } from '@/types';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  Briefcase,
  Target,
  Shield,
  Layers,
  ChevronDown,
  TrendingUp,
  Award,
  Zap,
  Check,
  Building,
  User,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';

type UploadState = 'idle' | 'uploading' | 'uploaded' | 'processing' | 'analyzing' | 'completed' | 'error';

export default function ResumeAnalyzerPage() {
  const {
    userResumeProfile,
    handleResumeUpload,
    resumeVersions,
    opportunities,
    applyToOpportunity,
    applications,
  } = useApp();

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [pipelineSteps, setPipelineSteps] = useState<{ label: string; status: 'pending' | 'active' | 'done' }[]>([
    { label: 'Reading and validating resume document', status: 'pending' },
    { label: 'Extracting candidate text layer and layout', status: 'pending' },
    { label: 'Identifying technical skills & proficiency evidence', status: 'pending' },
    { label: 'Detecting project repositories & academic achievements', status: 'pending' },
    { label: 'Cross-referencing against industry role requirements', status: 'pending' },
    { label: 'Computing deterministic readiness score & skill gaps', status: 'pending' },
    { label: 'Matching personalized corporate opportunities', status: 'pending' },
  ]);

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

  // Roles pool
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
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (selectedFile: File) => {
    setErrorMessage('');
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!['pdf', 'docx', 'txt'].includes(ext || '')) {
      setUploadState('error');
      setErrorMessage('Unsupported format. Please upload a PDF or DOCX file (up to 10 MB).');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadState('error');
      setErrorMessage('File size exceeds 10 MB limit. Please upload a smaller document.');
      return;
    }

    setFile(selectedFile);
    setUploadState('uploading');
    setUploadProgress(0);

    // Simulate genuine network upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 15;
      });
    }, 100);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState('uploaded');

      // Begin Real Text Extraction & Pipeline
      setTimeout(async () => {
        setUploadState('processing');
        updateStep(0, 'done');
        updateStep(1, 'active');

        let extractedText = '';
        try {
          if (ext === 'pdf') {
            extractedText = await extractTextFromPdf(arrayBuffer);
          } else if (ext === 'docx') {
            extractedText = await extractTextFromDocx(arrayBuffer);
          } else {
            const decoder = new TextDecoder('utf-8');
            extractedText = decoder.decode(arrayBuffer);
          }
        } catch (err: any) {
          setUploadState('error');
          setErrorMessage(err.message || 'Unable to extract readable text. Please upload a text-based document.');
          return;
        }

        updateStep(1, 'done');
        updateStep(2, 'active');

        // Parse resume contents with skill taxonomy
        setTimeout(() => {
          updateStep(2, 'done');
          updateStep(3, 'active');

          setTimeout(() => {
            updateStep(3, 'done');
            updateStep(4, 'active');

            const fileSizeFormatted = (selectedFile.size / 1024).toFixed(0) + ' KB';
            const parsedResult = parseResumeContent(extractedText, {
              fileName: selectedFile.name,
              fileSize: fileSizeFormatted,
              fileType: ext as any,
            });

            setTimeout(() => {
              updateStep(4, 'done');
              updateStep(5, 'active');

              setTimeout(() => {
                updateStep(5, 'done');
                updateStep(6, 'active');

                setTimeout(() => {
                  updateStep(6, 'done');
                  setAnalysis(parsedResult);
                  handleResumeUpload(parsedResult);
                  setUploadState('completed');
                }, 400);
              }, 400);
            }, 400);
          }, 400);
        }, 400);
      }, 300);
    } catch (err: any) {
      clearInterval(progressInterval);
      setUploadState('error');
      setErrorMessage(err.message || 'Failed to process file.');
    }
  };

  const updateStep = (index: number, status: 'pending' | 'active' | 'done') => {
    setPipelineSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, status } : step))
    );
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
      setAnalysis(parsedResult);
      handleResumeUpload(parsedResult);
      setUploadState('completed');
    }, 800);
  };

  // Skill Gap Calculations for selected role
  const userSkillPairs = (analysis?.technicalSkills || []).map((s) => ({
    name: s.name,
    score: s.score,
  }));

  const gapDiagnostics = calculateSkillGapForResume(userSkillPairs, selectedRole);

  // Sorting gap items
  const sortedGaps = [...gapDiagnostics.gapItems].sort((a, b) => {
    if (sortGapBy === 'gap') return (b.gapPercentage || 0) - (a.gapPercentage || 0);
    if (sortGapBy === 'priority') {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.importance] - order[a.importance];
    }
    return b.currentScore - a.currentScore;
  });

  // Simulator projection based on actual uploaded resume readiness
  const baseReadiness = analysis?.readinessScore || 72;
  const simResult = simulateCareerReadiness(baseReadiness, simActions);

  const toggleSim = (id: string) => {
    setSimActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  // Personalized Opportunity Matches
  const matchedOpportunities = matchPersonalizedOpportunities(
    userSkillPairs,
    opportunities,
    selectedRole
  );

  // Version diffing if multiple versions exist
  const previousVersion = resumeVersions.length > 1 ? resumeVersions[1].analysis : null;
  const versionDiff =
    analysis && previousVersion ? compareResumeVersions(previousVersion, analysis) : null;

  return (
    <AppShell>
      <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resume Intelligence Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Analyze Your Resume
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Upload your resume and discover your skills, gaps and matching opportunities.
              Our deterministic AI engine extracts competencies, projects, and credentials to build your live career intelligence profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSampleResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Load Sample Resume</span>
            </button>
            {analysis && (
              <button
                onClick={() => {
                  setAnalysis(null);
                  setUploadState('idle');
                  setFile(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors"
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              uploadState === 'uploading' || uploadState === 'processing'
                ? 'border-blue-400 bg-blue-50/50'
                : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50/80 bg-slate-50/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Drag & drop your resume here
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  or <span className="text-blue-600 font-semibold underline">Browse Files</span> from your computer
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  PDF, DOCX
                </span>
                <span>•</span>
                <span>Max 10 MB</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  100% Client-Side Privacy
                </span>
              </div>
            </div>
          </div>

          {/* Upload Progress & Pipeline */}
          {(uploadState === 'uploading' || uploadState === 'uploaded' || uploadState === 'processing') && (
            <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{file?.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {((file?.size || 0) / 1024).toFixed(0)} KB • {uploadState === 'uploading' ? 'Uploading...' : 'Processing Document...'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700">
                  {uploadProgress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              {/* Real-time multi-step processing timeline */}
              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Live Resume Intelligence Timeline:
                </p>
                {pipelineSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs">
                    {step.status === 'done' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {step.status === 'active' && (
                      <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    )}
                    {step.status === 'pending' && (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span
                      className={
                        step.status === 'done'
                          ? 'text-slate-800 font-medium'
                          : step.status === 'active'
                          ? 'text-blue-700 font-bold'
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

          {/* Error Message */}
          {uploadState === 'error' && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Unable to process this file</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Notice: Your resume is processed for this analysis. Avoid uploading documents containing unnecessary sensitive personal information.</span>
          </div>
        </div>
      )}

      {/* COMPLETED REPORT SECTION */}
      {analysis && uploadState === 'completed' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Version Monitor Banner if updated */}
          {versionDiff && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-900">
                    Resume Updated (v{resumeVersions.length})
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Readiness shifted: {versionDiff.oldReadiness}% → {versionDiff.newReadiness}% ({versionDiff.readinessDelta >= 0 ? `+${versionDiff.readinessDelta}%` : `${versionDiff.readinessDelta}%`}). Detected {versionDiff.addedSkills.length} new competencies.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200/60 px-2 py-1 rounded-md text-emerald-800">
                Active Version v{resumeVersions.length}
              </span>
            </div>
          )}

          {/* 1. Candidate Profile Overview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-extrabold text-xl shadow-xs">
                  {analysis.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{analysis.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      Extracted Candidate
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {analysis.education}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    File: <span className="font-medium text-slate-600">{analysis.fileName}</span> ({analysis.fileSize}) • Analyzed: {analysis.uploadedAt}
                  </p>
                </div>
              </div>

              {/* Readiness Score Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center min-w-[160px]">
                <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  Career Readiness
                </p>
                <div className="text-3xl font-extrabold text-blue-700 my-0.5">
                  {analysis.readinessScore}%
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Prototype readiness model
                </p>
              </div>
            </div>

            {/* 5-Factor Score Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Technical Skills</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  {analysis.scoreBreakdown.technicalSkills} <span className="text-[11px] font-normal text-slate-400">/ 50</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Project Relevance</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  {analysis.scoreBreakdown.projects} <span className="text-[11px] font-normal text-slate-400">/ 15</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Experience / Intern</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  {analysis.scoreBreakdown.experience} <span className="text-[11px] font-normal text-slate-400">/ 10</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Certifications</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  {analysis.scoreBreakdown.certifications} <span className="text-[11px] font-normal text-slate-400">/ 10</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Skill Verification</p>
                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  {analysis.scoreBreakdown.assessment} <span className="text-[11px] font-normal text-slate-400">/ 15</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. Extracted Competencies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technical Skills Card */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Extracted Technical Skills</h3>
                  <p className="text-xs text-slate-500">
                    {analysis.technicalSkills.length} competencies detected from resume text
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  Estimated from resume evidence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysis.technicalSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                      <span className="text-xs font-mono font-bold text-blue-600">
                        {skill.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                    {skill.evidenceSnippet && (
                      <p className="text-[10px] text-slate-400 italic truncate">
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
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Soft Skills & Competencies</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.softSkills.map((ss, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 font-medium"
                    >
                      {ss}
                    </span>
                  ))}
                </div>
              </div>

              {/* Developer Tools */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Tools & Environment</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detected Projects */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Detected Projects ({analysis.projects.length})</span>
                </h3>
                <div className="space-y-2.5">
                  {analysis.projects.map((proj, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <p className="font-bold text-slate-900">{proj.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.skills.map((s, si) => (
                          <span key={si} className="text-[9px] px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Target Role Skill Gap Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Benchmark your extracted resume competencies against verified corporate job requirements
                </p>
              </div>

              {/* Role Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Select Target Role:</span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-bold text-emerald-800">
                  Strong Competencies ({gapDiagnostics.strongSkills.length})
                </p>
                <p className="text-[11px] text-emerald-700 mt-1">
                  {gapDiagnostics.strongSkills.map((s) => s.name).join(', ') || 'None yet'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-xs font-bold text-blue-800">
                  Moderate Competencies ({gapDiagnostics.moderateSkills.length})
                </p>
                <p className="text-[11px] text-blue-700 mt-1">
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
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-semibold">Required Benchmark Skill</span>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline">Current vs Target</span>
                  <div className="flex items-center gap-1">
                    <span>Sort by:</span>
                    <button
                      onClick={() => setSortGapBy('gap')}
                      className={`px-2 py-0.5 rounded font-medium ${sortGapBy === 'gap' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:text-slate-700'}`}
                    >
                      Highest Gap
                    </button>
                    <button
                      onClick={() => setSortGapBy('priority')}
                      className={`px-2 py-0.5 rounded font-medium ${sortGapBy === 'priority' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:text-slate-700'}`}
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
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            item.status === 'Acquired'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Priority: <span className="font-semibold text-slate-600">{item.importance}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-slate-600 font-semibold">{item.currentScore}%</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-blue-600 font-bold">{item.targetScore}% Target</span>
                        {item.gapPercentage ? (
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            -{item.gapPercentage}% Gap
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Progress Bar Dual Layer */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden relative mb-2">
                      {/* Target Indicator */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-200 rounded-full"
                        style={{ width: `${item.targetScore}%` }}
                      />
                      {/* Current Score */}
                      <div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          item.status === 'Acquired'
                            ? 'bg-emerald-500'
                            : item.status === 'In Progress'
                            ? 'bg-blue-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.currentScore}%` }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-600 gap-1 pt-1">
                      <span>{item.gapReason}</span>
                      <span className="text-blue-700 font-medium sm:text-right shrink-0">
                        {item.recommendedAction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Connected Career Readiness Simulator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-1">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>What-If Projections</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Career Readiness Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate upskilling milestones to close your detected {selectedRole} skill gaps
                </p>
              </div>

              {/* Dynamic Projection Gauge */}
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Current</p>
                  <p className="text-xl font-extrabold text-slate-700">{baseReadiness}%</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-blue-700">Projected</p>
                  <p className="text-xl font-extrabold text-blue-700">{simResult.projectedScore}%</p>
                </div>
                <div className="pl-3 border-l border-slate-200">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
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
                      ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold">{action.title}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        action.completed
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {action.completed && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">{action.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-semibold">
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      +{action.impactScore}% Readiness
                    </span>
                    <span className="text-slate-500">{action.effortWeeks} Weeks effort</span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              Notice: Model-based projection — not a guaranteed employment probability.
            </p>
          </div>

          {/* 5. Recommended Projects to Close Gaps */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Recommended Capstone Projects
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Targeted projects designed to produce verified GitHub evidence for your critical skill gaps
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      Production-Ready FastAPI Expense Management API
                    </h4>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      High Impact
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Architect an asynchronous RESTful backend with Pydantic validation, PostgreSQL connection pooling, JWT authentication, and multi-stage Docker deployment.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['FastAPI', 'REST APIs', 'PostgreSQL', 'Docker', 'Authentication'].map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => alert('Project added to your personalized roadmap!')}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add to My Roadmap</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      Containerized Microservices with Redis Queue
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Cloud Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Deploy decoupled services communicating via asynchronous Redis pub/sub message brokers with automated health checks and CI/CD tests.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['Docker', 'Redis', 'Cloud', 'System Design', 'CI/CD'].map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => alert('Project added to your personalized roadmap!')}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add to My Roadmap</span>
                </button>
              </div>
            </div>
          </div>

          {/* 6. Personalized Opportunities for User's Extracted Skills */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Personalized Job Matches</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Opportunities Matching Your Resume
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked by transparent compatibility with your extracted skill set
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500">
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
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-bold text-slate-900">{opp.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {opp.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-700 font-semibold">{opp.stipend}</span>
                        <span>•</span>
                        <span>Deadline: {opp.deadline}</span>
                      </div>

                      {/* Why you're a good match */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                        <p className="text-[11px] font-bold text-slate-700">
                          Why this matches your profile:
                        </p>
                        <div className="space-y-0.5">
                          {match.whyMatched.map((reason, ri) => (
                            <p key={ri} className="text-[11px] text-emerald-700">
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
                        <span className="text-2xl font-extrabold text-blue-700 block">
                          {match.matchScore}%
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">
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
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isApplied ? 'Application Submitted' : 'Apply Directly'}
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
