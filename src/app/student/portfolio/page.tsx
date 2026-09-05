'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
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
} from 'lucide-react';

export default function StudentPortfolioManagementPage() {
  const { student } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/portfolio/demo-student`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Share2 className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Verified Digital Talent Portfolio
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Digital Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Your public, tamper-resistant skill portfolio. Shareable with employers, recruiters, and academic reviewers to verify your competence without login credentials.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
              </button>
              <Link
                href="/portfolio/demo-student"
                target="_blank"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Live Preview Embed of the Portfolio */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          {/* Profile Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-2xl border-2 border-blue-600 object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  {student.readinessScore}% Placement Ready
                </span>
              </div>
              <p className="text-xs text-blue-600 font-medium mt-0.5">{student.tagline}</p>
              <p className="text-xs text-slate-500 mt-1">
                {student.degree} • {student.college} (CGPA: {student.cgpa})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={student.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Candidate Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{student.bio}</p>
          </div>

          {/* Verified Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              AI-Verified Skills ({student.skills.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {student.skills.map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">{s.name}</span>
                    <span className="text-xs font-mono font-bold text-emerald-600">{s.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.score}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> {s.evidenceCount} verified proofs
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Verified Technical Projects
            </h3>
            <div className="space-y-3">
              {student.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-blue-600" />
                      {proj.title}
                    </h4>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.skills.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Internships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Verified Certifications
              </h3>
              <div className="space-y-2">
                {student.certifications.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <p className="text-xs font-semibold text-slate-900">{c.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.issuer} • {c.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Practical Experience & Capstones
              </h3>
              <div className="space-y-2">
                {student.internships.map((int, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <p className="text-xs font-semibold text-slate-900">{int.role}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{int.company} • {int.duration}</p>
                    <p className="text-xs text-slate-600 mt-1">{int.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
