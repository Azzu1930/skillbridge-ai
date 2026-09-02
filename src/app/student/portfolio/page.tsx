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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Share2 className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Verified Digital Talent Portfolio
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Digital Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Your public, tamper-resistant skill portfolio. Shareable with employers, recruiters, and hackathon judges to verify your competence without login credentials.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
              </button>
              <Link
                href="/portfolio/demo-student"
                target="_blank"
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Live Preview Embed of the Portfolio */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          {/* Profile Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-2xl border-2 border-indigo-500/60 object-cover shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{student.name}</h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  {student.readinessScore}% Placement Ready
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-medium mt-0.5">{student.tagline}</p>
              <p className="text-xs text-slate-400 mt-1">
                {student.degree} • {student.college} (CGPA: {student.cgpa})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={student.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Candidate Overview
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{student.bio}</p>
          </div>

          {/* Verified Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              AI-Verified Skills ({student.skills.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {student.skills.map((s) => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{s.name}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{s.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${s.score}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> {s.evidenceCount} verified proofs
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Verified Technical Projects
            </h3>
            <div className="space-y-3">
              {student.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      {proj.title}
                    </h4>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.skills.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300"
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
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Verified Certifications
              </h3>
              <div className="space-y-2">
                {student.certifications.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-semibold text-white">{c.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.issuer} • {c.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Practical Experience & Capstones
              </h3>
              <div className="space-y-2">
                {student.internships.map((int, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-semibold text-white">{int.role}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{int.company} • {int.duration}</p>
                    <p className="text-xs text-slate-300 mt-1">{int.description}</p>
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
