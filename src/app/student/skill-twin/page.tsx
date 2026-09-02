'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { StudentSkill, SkillEvidenceItem } from '@/types';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  Cpu,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck2,
  Award,
  Code,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

export default function StudentSkillTwinPage() {
  const { student } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<StudentSkill | null>(null);

  // Radar chart data
  const radarData = student.skills.map((s) => ({
    subject: s.name,
    score: s.score,
    fullMark: 100,
  }));

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header with Explanation Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Cpu className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Pillar 1: Dynamic Student Competency Engine
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Student Skill Twin
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                An evolving mathematical representation of your technical and professional capabilities. Continuously updated through code artifacts, assessments, certifications, and peer review.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <Link
                href="/student/resume-analyzer"
                className="px-3.5 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900/60 border border-indigo-700/60 rounded-xl transition-all flex items-center gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Sync Resume Skills</span>
              </Link>
              <Link
                href="/student/assessment"
                className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verify Skills (Take Test)</span>
              </Link>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>
              <strong>Measurement Methodology:</strong> Skill score is estimated from assessments, projects, certifications, and verified peer experience. Last synchronized 2 days ago.
            </span>
          </div>
        </div>

        {/* Radar & Summary Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Visualization */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Multidimensional Skill Polygon
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Competency spread across technical & soft vectors</p>
            </div>

            <div className="h-64 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9 }} />
                  <Radar
                    name="Skill Score"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Target role: {student.targetRole} (Benchmark required: 80%+)
            </p>
          </div>

          {/* Quick Metrics & Persona Summary */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Twin Verification Index
                </h2>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Status: High Integrity
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Tracked Skills</p>
                  <p className="text-xl font-bold text-white mt-1">{student.skills.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Verified Proofs</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">
                    {student.skills.reduce((acc, s) => acc + s.evidenceCount, 0)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Certifications</p>
                  <p className="text-xl font-bold text-indigo-400 mt-1">{student.certifications.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Target Fit</p>
                  <p className="text-xl font-bold text-amber-400 mt-1">{student.readinessScore}%</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40">
                <h3 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Why Recruiters Trust the Skill Twin
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike conventional resumes where candidates inflate claims, the SkillBridge AI Twin cross-validates each proficiency score against verified GitHub repositories, timed coding challenges, and academic project reviews.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Click any skill card below to examine source evidence.</span>
              <Link href="/student/skill-gap" className="text-indigo-400 hover:underline font-semibold flex items-center gap-1">
                <span>Run Gap Benchmark</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Skill Cards with Evidence Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Active Verified Competencies
              </h2>
              <p className="text-xs text-slate-400">Click a card to review full evidence audits</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {student.skills.filter((s) => s.verified).length} of {student.skills.length} skills verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {student.skills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/80 hover:bg-slate-900 cursor-pointer transition-all shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {skill.name}
                      </span>
                      {skill.verified && (
                        <span title="Faculty/Assessment Verified">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-mono font-black text-emerald-400">
                      {skill.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        skill.score >= 80
                          ? 'bg-emerald-400'
                          : skill.score >= 70
                          ? 'bg-indigo-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>

                  {/* Evidence Items preview */}
                  <div className="space-y-1.5 my-3">
                    {skill.evidence.slice(0, 2).map((ev, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300 truncate">
                        {ev.type === 'project' && <Code className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />}
                        {ev.type === 'assessment' && <Award className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />}
                        {ev.type === 'certification' && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />}
                        {ev.type === 'experience' && <Briefcase className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />}
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {skill.lastUpdated}
                  </span>
                  <span className="text-indigo-400 font-medium group-hover:underline">
                    {skill.evidenceCount} proofs →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Full Evidence Inspection */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    {selectedSkill.name} Competency Evidence
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="text-xs text-slate-400">Current Computed Proficiency</p>
                  <p className="text-2xl font-black text-emerald-400 mt-0.5">
                    {selectedSkill.score}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    Category: {selectedSkill.category}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Updated {selectedSkill.lastUpdated}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Verifiable Evidence Audit ({selectedSkill.evidence.length})
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {selectedSkill.evidence.map((ev, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{ev.title}</span>
                        {ev.score && (
                          <span className="text-[11px] font-mono font-bold text-emerald-400">
                            Score: {ev.score}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                        <span className="capitalize">{ev.type} proof • {ev.date}</span>
                        {ev.verified ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-amber-400">Pending Review</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
                >
                  Close Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
