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
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Cpu className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  Pillar 1: Dynamic Student Competency Engine
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                AI Student Skill Twin
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                An evolving mathematical representation of your technical and professional capabilities. Continuously updated through code artifacts, assessments, certifications, and peer review.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <Link
                href="/resume-analyzer"
                className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all flex items-center gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Sync Resume Skills</span>
              </Link>
              <Link
                href="/student/assessment"
                className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verify Skills (Take Test)</span>
              </Link>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              <strong>Measurement Methodology:</strong> Skill score is estimated from assessments, projects, certifications, and verified peer experience. Last synchronized today.
            </span>
          </div>
        </div>

        {/* Radar & Summary Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Visualization */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Multidimensional Skill Polygon
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Competency spread across technical & soft vectors</p>
            </div>

            <div className="h-64 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fill: '#475569', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 9 }} />
                  <Radar
                    name="Skill Score"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                    labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-slate-500 text-center font-medium">
              Target role: {student.targetRole} (Benchmark required: 80%+)
            </p>
          </div>

          {/* Quick Metrics & Persona Summary */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Twin Verification Index
                </h2>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  Status: High Integrity
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Tracked Skills</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{student.skills.length}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Verified Proofs</p>
                  <p className="text-xl font-bold text-emerald-700 mt-1">
                    {student.skills.reduce((acc, s) => acc + s.evidenceCount, 0)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Certifications</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">{student.certifications.length}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Target Fit</p>
                  <p className="text-xl font-bold text-blue-700 mt-1">{student.readinessScore}%</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <h3 className="text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Why Recruiters Trust the Skill Twin
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike conventional resumes where candidates inflate claims, the SkillBridge AI Twin cross-validates each proficiency score against verified GitHub repositories, timed coding challenges, and academic project reviews.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Click any skill card below to examine source evidence.</span>
              <Link href="/student/skill-gap" className="text-blue-600 hover:underline font-semibold flex items-center gap-1">
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
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Active Verified Competencies
              </h2>
              <p className="text-xs text-slate-500">Click a card to review full evidence audits</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {student.skills.filter((s) => s.verified).length} of {student.skills.length} skills verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {student.skills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </span>
                      {skill.verified && (
                        <span title="Assessment Verified">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-mono font-extrabold text-blue-700">
                      {skill.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        skill.score >= 80
                          ? 'bg-emerald-500'
                          : skill.score >= 70
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>

                  {/* Verification Status Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 font-semibold ${
                        skill.verificationStatus === 'Assessment Verified'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : skill.verificationStatus === 'Evidence Submitted'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : skill.verificationStatus === 'Certificate Added'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : skill.verificationStatus === 'Estimated from resume evidence'
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {skill.verificationStatus === 'Assessment Verified' && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                      {skill.verificationStatus === 'Evidence Submitted' && <FileCheck2 className="w-3 h-3 text-sky-600" />}
                      {skill.verificationStatus === 'Certificate Added' && <Award className="w-3 h-3 text-purple-600" />}
                      {skill.verificationStatus === 'Pending Verification' && <Clock className="w-3 h-3 text-amber-600" />}
                      <span>{skill.verificationStatus}</span>
                    </span>
                  </div>

                  {/* Evidence Items preview */}
                  <div className="space-y-1.5 my-3">
                    {skill.evidence.length > 0 ? (
                      skill.evidence.slice(0, 2).map((ev, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 truncate">
                          {ev.type === 'project' && <Code className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />}
                          {ev.type === 'assessment' && <Award className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />}
                          {ev.type === 'certification' && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />}
                          {ev.type === 'experience' && <Briefcase className="w-3 h-3 text-sky-600 shrink-0 mt-0.5" />}
                          {ev.type === 'resume' && <FileCheck2 className="w-3 h-3 text-indigo-600 shrink-0 mt-0.5" />}
                          <span className="truncate">{ev.title}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-amber-700 italic">
                        No verified project evidence • Recommended learning
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {skill.lastUpdated}
                  </span>
                  <span className="text-blue-600 font-medium group-hover:underline">
                    {skill.evidenceCount > 0 ? `${skill.evidenceCount} proofs →` : 'Add Evidence →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Full Evidence Inspection */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedSkill.name} Competency Evidence
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Current Assessed Proficiency</p>
                    <p className="text-lg font-bold text-slate-900">{selectedSkill.score} / 100</p>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {selectedSkill.verificationStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">
                    Verified Proof Records ({selectedSkill.evidence.length})
                  </h4>

                  {selectedSkill.evidence.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedSkill.evidence.map((ev, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{ev.title}</span>
                            {ev.score && (
                              <span className="font-mono text-emerald-700 font-semibold">
                                {ev.score}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Issuer: {ev.issuerOrRepo || 'Verified Submission'}</span>
                            <span>{ev.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2">
                      <p className="text-xs text-amber-800 font-semibold">
                        No Evidence Artifacts Currently Linked
                      </p>
                      <p className="text-[11px] text-amber-700">
                        Submit a code repository, pass an adaptive quiz, or upload a certification to elevate your score from {selectedSkill.score}%.
                      </p>
                      <Link
                        href="/student/roadmap"
                        onClick={() => setSelectedSkill(null)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                      >
                        <span>View Recommended Learning Path</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
