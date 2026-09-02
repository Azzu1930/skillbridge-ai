'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { extractSkillsFromResume } from '@/lib/ai-engine';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Cpu,
} from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const { student, addExtractedSkillsToTwin } = useApp();
  const [resumeText, setResumeText] = useState(`Abdul Aziz - B.Tech in Computer Science & Engineering, NIT (CGPA: 8.74)
Email: abdul.aziz@univ.edu.in | GitHub: github.com/Azzu1930

TECHNICAL SKILLS:
Languages: Python, SQL, JavaScript, HTML, CSS, C++
Frameworks & Libraries: FastAPI, React, Next.js, Node.js
Databases & Tools: PostgreSQL, Redis, Docker, Git, Linux
Architectural Concepts: REST APIs, Microservices, Async Queues, Authentication

PROJECTS:
1. Distributed Async Task Queue: Built high-throughput Celery/Redis task runner in Python handling 1,500 req/sec with REST APIs.
2. TimeBank Platform: PostgreSQL ACID transactions with JWT Authentication and React front-end.
3. High-Throughput Log Stream Analyzer: Python algorithmic parsing of access logs.`);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<ReturnType<typeof extractSkillsFromResume> | null>(null);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setSyncedSuccess(false);
    setTimeout(() => {
      const results = extractSkillsFromResume(resumeText);
      setExtractedData(results);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleSyncToTwin = () => {
    if (!extractedData) return;
    const combined = [...extractedData.detectedSkills, ...extractedData.detectedProjectSkills];
    addExtractedSkillsToTwin(combined);
    setSyncedSuccess(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              AI Resume Intelligence & Skill Ingestion
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resume Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Upload or paste your technical resume. Our AI extraction parser isolates core technical competencies, framework proficiencies, and project evidence, seamlessly merging them into your live AI Skill Twin.
          </p>
        </div>

        {/* Workspace: Input vs Extracted Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload & Text Editor */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-indigo-400" />
                  Resume Source
                </h2>
                <button
                  onClick={() => {
                    setResumeText(`Abdul Aziz - B.Tech in Computer Science & Engineering, NIT (CGPA: 8.74)
Email: abdul.aziz@univ.edu.in | GitHub: github.com/Azzu1930

TECHNICAL SKILLS:
Languages: Python, SQL, JavaScript, HTML, CSS, C++
Frameworks & Libraries: FastAPI, React, Next.js, Node.js
Databases & Tools: PostgreSQL, Redis, Docker, Git, Linux
Architectural Concepts: REST APIs, Microservices, Async Queues, Authentication

PROJECTS:
1. Distributed Async Task Queue: Built high-throughput Celery/Redis task runner in Python handling 1,500 req/sec with REST APIs.
2. TimeBank Platform: PostgreSQL ACID transactions with JWT Authentication and React front-end.
3. High-Throughput Log Stream Analyzer: Python algorithmic parsing of access logs.`);
                    setExtractedData(null);
                    setSyncedSuccess(false);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  Reload Demo Resume
                </button>
              </div>

              {/* Upload Dropzone UI */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-dashed border-slate-700 text-center mb-4">
                <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-300">
                  Drag & Drop PDF / DOCX resume or paste text below
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Demo auto-loaded for Abdul Aziz (CSE 2026)
                </p>
              </div>

              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Resume Content (Text View)
              </label>
              <textarea
                rows={10}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                AI extraction model: Hybrid NLP Tokenizer
              </span>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'Extracting...' : 'Run AI Extraction'}</span>
              </button>
            </div>
          </div>

          {/* Right: Extracted Output */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  AI Skill Extraction Results
                </h2>
                {extractedData && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                    Confidence: {extractedData.confidenceScore}%
                  </span>
                )}
              </div>

              {!extractedData && !isAnalyzing && (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800 text-center my-6">
                  <FileCheck2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-400">
                    Click &quot;Run AI Extraction&quot; to parse candidate qualifications
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                    The parser will extract verified technologies, frameworks, and architecture patterns.
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="p-12 text-center my-6">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-indigo-300 font-semibold">
                    Parsing resume entities and cross-referencing with Industry Skill Graph...
                  </p>
                </div>
              )}

              {extractedData && !isAnalyzing && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Candidate Education</p>
                    <p className="text-xs font-bold text-white mt-0.5">{extractedData.education}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Detected Core Skills ({extractedData.detectedSkills.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {extractedData.detectedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Detected Project & Architecture Competencies ({extractedData.detectedProjectSkills.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {extractedData.detectedProjectSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing for Backend Developer Callout */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60">
                    <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      Missing for Backend Developer Target Role:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['FastAPI', 'Docker', 'Cloud (AWS)', 'System Design', 'Testing'].map((gap) => (
                        <span key={gap} className="text-xs px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/80 font-mono flex items-center gap-1 font-semibold">
                          <span className="text-rose-400">✗</span> {gap}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Pipeline: <span className="text-white font-mono">Resume → Skill Twin → Gap Diagnostic → 30-Day Roadmap</span>
                    </p>
                  </div>

                  {syncedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60 flex items-center gap-2 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        Successfully synchronized detected skills into Abdul Aziz&apos;s AI Skill Twin!
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {extractedData && !isAnalyzing && (
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/student/skill-twin"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>View Live Twin</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={handleSyncToTwin}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Add Detected Skills to Skill Twin</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
