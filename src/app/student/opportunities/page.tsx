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
  Sparkles,
  Send,
  Calendar,
  FileText,
} from 'lucide-react';

export default function OpportunitiesPage() {
  const { opportunities, applications, submitApplication, applyToOpportunity, student } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<JobOpportunity | null>(null);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);

  // Application Modal Form State
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedStartDate, setExpectedStartDate] = useState('Immediate');

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

  const handleOpenModal = (opp: JobOpportunity) => {
    setSelectedOpp(opp);
    setCoverLetter(`Hello ${opp.company} team, I am eager to apply for the ${opp.title} position. My verified Skill Twin demonstrates proficiency in ${opp.requiredSkills.slice(0, 3).join(', ')}.`);
    setExpectedStartDate('Immediate');
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    if (submitApplication) {
      submitApplication({
        opportunityId: selectedOpp.id,
        coverLetter,
        expectedStartDate,
        availability: 'Full-time / Immediate',
      });
    } else {
      applyToOpportunity(selectedOpp.id);
    }

    setApplyMessage(`Application submitted to ${selectedOpp.company} with AI Skill Twin verification!`);
    setSelectedOpp(null);
    setTimeout(() => setApplyMessage(null), 4000);
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-borderGreen shadow-xs text-textPrimary">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-green-50 text-green-700 border border-green-200">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-green-700 font-bold">
                  AI-Driven Opportunity Matching
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
                Curated Opportunities & Placement Matching
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                Direct partnerships with verified industry recruiters. Transparent AI match scores break down exactly which of your verified competencies matched and which skills require upskilling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/applications"
                className="px-4 py-2.5 text-xs font-semibold text-textPrimary bg-white hover:bg-green-50 border border-borderGreen rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Applications Tracker ({applications.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Success Feedback Banner */}
        {applyMessage && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-800 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{applyMessage}</span>
            </div>
            <Link href="/student/applications" className="underline hover:text-green-950 font-bold">
              View in Applications Tracker →
            </Link>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-borderGreen shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, company, or skill (e.g. 'FastAPI', 'Cloud')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#f7fcf8] border border-borderGreen rounded-xl text-xs text-textPrimary placeholder-slate-400 focus:outline-hidden focus:border-green-600"
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
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-[#f7fcf8] text-muted hover:text-textPrimary border border-borderGreen hover:bg-green-50'
                }`}
              >
                {type}
              </button>
            ))}

            <label className="flex items-center gap-1.5 text-xs text-muted ml-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-borderGreen text-green-600 focus:ring-0"
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
                className="p-5 rounded-2xl bg-white border border-borderGreen hover:border-green-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 font-bold uppercase">
                        {opp.type}
                      </span>
                      <h2 className="text-base font-bold text-textPrimary mt-1.5">{opp.title}</h2>
                      <p className="text-xs text-muted flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-textPrimary">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-extrabold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg">
                        {matchScore}% Match
                      </span>
                      <p className="text-[10px] text-muted mt-1 font-medium">Readiness fit</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted line-clamp-2 mt-2 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Stipend & Duration */}
                  <div className="flex items-center gap-4 text-xs text-muted mt-3 pt-3 border-t border-borderGreen font-medium">
                    <span className="font-semibold text-green-700">{opp.stipend}</span>
                    <span>•</span>
                    <span>{opp.duration}</span>
                    <span>•</span>
                    <span>{opp.openings} Openings</span>
                  </div>

                  {/* Matched vs Missing Tags */}
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-green-800 font-bold">Matched:</span>
                      {matchedSkills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-800 border border-green-200 font-medium">
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
                <div className="mt-5 pt-3 border-t border-borderGreen flex items-center justify-between">
                  <button
                    onClick={() => handleOpenModal(opp)}
                    className="text-xs font-semibold text-muted hover:text-textPrimary"
                  >
                    View Details & Apply
                  </button>

                  {isApplied ? (
                    <span className="px-4 py-2 rounded-xl bg-green-50 text-green-800 border border-green-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(opp)}
                      className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
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

        {/* Modal: Interactive Opportunity Details & Application Submission */}
        {selectedOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-xl bg-white border border-borderGreen rounded-2xl shadow-2xl p-6 space-y-4 text-textPrimary max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-borderGreen pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 font-bold uppercase">
                    {selectedOpp.type}
                  </span>
                  <h3 className="text-lg font-bold text-textPrimary mt-1">{selectedOpp.title}</h3>
                  <p className="text-xs text-muted">{selectedOpp.company} • {selectedOpp.location}</p>
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
                  <h4 className="font-bold text-textPrimary uppercase text-[10px] tracking-wider mb-1">
                    Role Description
                  </h4>
                  <p className="text-muted leading-relaxed">{selectedOpp.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#f7fcf8] border border-borderGreen">
                  <div>
                    <span className="text-[10px] text-muted uppercase font-semibold">Compensation / Stipend</span>
                    <p className="font-bold text-green-700 mt-0.5">{selectedOpp.stipend}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-semibold">Duration</span>
                    <p className="font-bold text-textPrimary mt-0.5">{selectedOpp.duration}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-semibold">Open Positions</span>
                    <p className="font-bold text-textPrimary mt-0.5">{selectedOpp.openings} candidates</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-semibold">Application Deadline</span>
                    <p className="font-bold text-amber-700 mt-0.5">{selectedOpp.deadline}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-textPrimary uppercase text-[10px] tracking-wider mb-1.5">
                    Required Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.requiredSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-green-50 text-green-800 border border-green-200 text-xs font-medium"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Application Form Inputs */}
                <form onSubmit={handleModalSubmit} className="space-y-3 pt-2 border-t border-borderGreen">
                  <div className="flex items-center gap-2 text-xs font-bold text-green-800">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span>Apply with Verified AI Skill Twin</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textPrimary mb-1">
                      Cover Note / Pitch to Recruiter
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Brief note highlighting your relevant project experience..."
                      className="w-full p-2.5 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:outline-hidden text-textPrimary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textPrimary mb-1">
                      Earliest Availability / Start Date
                    </label>
                    <input
                      type="text"
                      value={expectedStartDate}
                      onChange={(e) => setExpectedStartDate(e.target.value)}
                      placeholder="Immediate / Within 2 weeks"
                      className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:outline-hidden text-textPrimary"
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-green-50 border border-green-200 text-[11px] text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Your latest verified Skill Twin and resume audit will be automatically shared with {selectedOpp.company}.</span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedOpp(null)}
                      className="px-4 py-2 text-xs font-semibold text-muted hover:text-textPrimary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={appliedIds.has(selectedOpp.id)}
                      className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{appliedIds.has(selectedOpp.id) ? 'Already Applied' : 'Submit Application'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
