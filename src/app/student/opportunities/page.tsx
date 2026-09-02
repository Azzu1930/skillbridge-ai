'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { JobOpportunity } from '@/types';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  ExternalLink,
  X,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function OpportunitiesPage() {
  const { opportunities, applications, applyToOpportunity, student } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<JobOpportunity | null>(null);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);

  const appliedIds = new Set(applications.map((a) => a.opportunityId));

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = filterType === 'All' || opp.type === filterType;
    const matchesRemote = !remoteOnly || opp.isRemote;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesRemote && matchesSearch;
  });

  const handleApply = (oppId: string) => {
    const success = applyToOpportunity(oppId);
    if (success) {
      setApplyMessage('Application successfully submitted with AI Skill Twin verification!');
      setTimeout(() => setApplyMessage(null), 3500);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Pillar 3: AI-Driven Opportunity Matching
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Opportunity Matching Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Direct partnerships with verified industry recruiters. Transparent match scores break down exactly which of your verified competencies matched and which skills require upskilling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/applications"
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Application Pipeline ({applications.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Success Feedback Banner */}
        {applyMessage && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs font-semibold text-emerald-300 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{applyMessage}</span>
            </div>
            <Link href="/student/applications" className="underline hover:text-white">
              View in Applications Tracker →
            </Link>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, company, or skill (e.g. 'FastAPI', 'Razorpay')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {['All', 'Internship', 'Full-time', 'Live Project', 'Mentorship'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {type}
              </button>
            ))}

            <label className="flex items-center gap-1.5 text-xs text-slate-300 ml-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-0 bg-slate-950"
              />
              <span>Remote Only</span>
            </label>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpportunities.map((opp) => {
            const isApplied = appliedIds.has(opp.id);

            // Calculate matching vs missing
            const studentSkillNames = new Set(student.skills.map((s) => s.name.toLowerCase()));
            const matchedSkills = opp.requiredSkills.filter((s) =>
              studentSkillNames.has(s.toLowerCase())
            );
            const missingSkills = opp.requiredSkills.filter(
              (s) => !studentSkillNames.has(s.toLowerCase())
            );

            // Compute tailored match score
            const matchScore = Math.min(
              95,
              Math.max(65, Math.round((matchedSkills.length / opp.requiredSkills.length) * 100))
            );

            return (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold uppercase">
                        {opp.type}
                      </span>
                      <h2 className="text-base font-bold text-white mt-1.5">{opp.title}</h2>
                      <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-300">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                        {matchScore}% Match
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">Readiness fit</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Stipend & Duration */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                    <span className="font-medium text-emerald-300">{opp.stipend}</span>
                    <span>•</span>
                    <span>{opp.duration}</span>
                    <span>•</span>
                    <span>{opp.openings} Openings</span>
                  </div>

                  {/* Matched vs Missing Tags */}
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-emerald-400 font-semibold">Matched:</span>
                      {matchedSkills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                    {missingSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] text-amber-400 font-semibold">Missing:</span>
                        {missingSkills.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                            ⚠ {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    View Details
                  </button>

                  {isApplied ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(opp.id)}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Opportunity Details */}
        {selectedOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold uppercase">
                    {selectedOpp.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedOpp.title}</h3>
                  <p className="text-xs text-slate-400">{selectedOpp.company} • {selectedOpp.location}</p>
                </div>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">
                    Role Description
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{selectedOpp.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Compensation / Stipend</span>
                    <p className="font-bold text-emerald-400 mt-0.5">{selectedOpp.stipend}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Duration</span>
                    <p className="font-bold text-white mt-0.5">{selectedOpp.duration}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Open Positions</span>
                    <p className="font-bold text-white mt-0.5">{selectedOpp.openings} candidates</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Application Deadline</span>
                    <p className="font-bold text-amber-400 mt-0.5">{selectedOpp.deadline}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1.5">
                    Required Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.requiredSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApply(selectedOpp.id);
                    setSelectedOpp(null);
                  }}
                  disabled={appliedIds.has(selectedOpp.id)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all"
                >
                  {appliedIds.has(selectedOpp.id) ? 'Already Applied' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
