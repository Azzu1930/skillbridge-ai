'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRIMARY_STUDENT } from '@/data/seedData';
import {
  Sparkles,
  Share2,
  ExternalLink,
  Github,
  Linkedin,
  ShieldCheck,
  CheckCircle2,
  Award,
  Briefcase,
  Code,
  Copy,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export default function PublicStudentPortfolioPage() {
  const student = PRIMARY_STUDENT;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-600 selection:text-white pb-20">
      {/* Top Banner linking back to SkillBridge AI */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 text-center text-xs text-blue-800 flex items-center justify-center gap-3">
        <span>Verified Public Candidate Portfolio • Powered by SkillBridge AI Platform</span>
        <Link
          href="/"
          className="font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1"
        >
          <span>Open SkillBridge AI</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Profile Card */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-2xl border-2 border-blue-600 object-cover shadow-sm"
              />
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{student.name}</h1>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
                    {student.readinessScore}% Placement Ready
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium mt-1">{student.tagline}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {student.degree} • {student.college} • Roll: {student.rollNumber} • CGPA: {student.cgpa}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-300 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
              <a
                href={student.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {student.bio}
          </div>
        </div>

        {/* AI-Verified Skills Grid */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                AI-Verified Competency Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Cross-validated by automated test suites and GitHub project commits
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
              Verified By SkillBridge AI
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {student.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${skill.score}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> {skill.evidenceCount} verified proofs
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Technical Projects */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Verified Technical Capstones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.projects.map((proj, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span>Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-slate-200/80">
                  {proj.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">Certifications</h2>
            <div className="space-y-2">
              {student.certifications.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-900">{c.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.issuer} • {c.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">Key Achievements</h2>
            <div className="space-y-2">
              {student.achievements.map((ach, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
