'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { JobOpportunity } from '@/types';
import {
  Briefcase,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
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
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  Pillar 3: AI-Driven Opportunity Matching
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Opportunity Matching Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Direct partnerships with verified industry recruiters. Transparent match scores break down exactly which of your verified competencies matched and which skills require upskilling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/applications"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Application Pipeline ({applications.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Success Feedback Banner */}
        {applyMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{applyMessage}</span>
            </div>
            <Link href="/student/applications" className="underline hover:text-emerald-950 font-bold">
              View in Applications Tracker →
            </Link>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, company, or skill (e.g. 'FastAPI', 'Razorpay')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {['All', 'Internship', 'Full-time', 'Live Project', 'Mentorship'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === type
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}

            <label className="flex items-center gap-1.5 text-xs text-slate-600 ml-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
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
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase">
                        {opp.type}
                      </span>
                      <h2 className="text-base font-bold text-slate-900 mt-1.5">{opp.title}</h2>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-700">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                        {matchScore}% Match
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">Readiness fit</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Stipend & Duration */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 font-medium">
                    <span className="font-semibold text-emerald-700">{opp.stipend}</span>
                    <span>•</span>
                    <span>{opp.duration}</span>
                    <span>•</span>
                    <span>{opp.openings} Openings</span>
                  </div>

                  {/* Matched vs Missing Tags */}
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-emerald-800 font-bold">Matched:</span>
                      {matchedSkills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                    {missingSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] text-amber-800 font-bold">Missing:</span>
                        {missingSkills.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                            ⚠ {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    View Details
                  </button>

                  {isApplied ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(opp.id)}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 text-slate-900">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase">
                    {selectedOpp.type}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedOpp.title}</h3>
                  <p className="text-xs text-slate-500">{selectedOpp.company} • {selectedOpp.location}</p>
                </div>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
                    Role Description
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{selectedOpp.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Compensation / Stipend</span>
                    <p className="font-bold text-emerald-700 mt-0.5">{selectedOpp.stipend}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Duration</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedOpp.duration}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Open Positions</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedOpp.openings} candidates</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Application Deadline</span>
                    <p className="font-bold text-amber-700 mt-0.5">{selectedOpp.deadline}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1.5">
                    Required Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.requiredSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApply(selectedOpp.id);
                    setSelectedOpp(null);
                  }}
                  disabled={appliedIds.has(selectedOpp.id)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs"
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
