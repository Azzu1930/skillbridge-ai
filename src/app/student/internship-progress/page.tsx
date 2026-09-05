'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { InternshipMilestoneItem, ActiveInternshipRecord } from '@/types';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Building2,
  Award,
  ArrowRight,
  ExternalLink,
  Upload,
  Sparkles,
  AlertCircle,
  Star,
  FileText,
  UserCheck,
  X,
  Send,
  ShieldCheck,
} from 'lucide-react';

export default function InternshipProgressPage() {
  const {
    internships,
    submitInternshipMilestone,
    approveInternshipMilestone,
    currentUser,
    student,
  } = useApp();

  const [selectedMilestone, setSelectedMilestone] = useState<{
    internshipId: string;
    milestone: InternshipMilestoneItem;
  } | null>(null);

  const [reviewMilestone, setReviewMilestone] = useState<{
    internshipId: string;
    milestone: InternshipMilestoneItem;
  } | null>(null);

  // Submit Modal Form State
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Review Modal Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState('');

  // Select primary active internship
  const activeInternship: ActiveInternshipRecord | undefined =
    internships.length > 0 ? internships[0] : undefined;

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilestone) return;

    if (!deliverableUrl.trim()) {
      setSubmitError('Please provide a valid deliverable URL (e.g., GitHub pull request, repository, or document link).');
      return;
    }

    submitInternshipMilestone({
      internshipId: selectedMilestone.internshipId,
      milestoneId: selectedMilestone.milestone.id,
      deliverableUrl: deliverableUrl.trim(),
      notes: submissionNotes.trim() || undefined,
    });

    setSelectedMilestone(null);
    setDeliverableUrl('');
    setSubmissionNotes('');
    setSubmitError('');
  };

  const handleApproveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewMilestone) return;

    approveInternshipMilestone({
      internshipId: reviewMilestone.internshipId,
      milestoneId: reviewMilestone.milestone.id,
      feedback: reviewFeedback.trim() || 'Deliverable satisfies all technical specifications and code quality guidelines.',
      rating: reviewRating,
      approverName: currentUser?.fullName
        ? `${currentUser.fullName} (${currentUser.role})`
        : 'Vikram Seth (Industry Supervisor)',
    });

    setReviewMilestone(null);
    setReviewFeedback('');
    setReviewRating(5);
  };

  const approvedCount = activeInternship
    ? activeInternship.milestones.filter((m) => m.status === 'Approved').length
    : 0;
  const totalCount = activeInternship ? activeInternship.milestones.length : 0;
  const progressPercent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#dce9df] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-green-50 text-green-700 border border-green-200">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-green-700 font-bold">
                  Work-Integrated Learning Workspace
                </span>
                <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  Active Internship Track
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17251b] tracking-tight">
                Internship Progress & Deliverables
              </h1>
              <p className="text-xs sm:text-sm text-[#526157] mt-1 max-w-2xl leading-relaxed">
                Track weekly production milestones, submit verified code artifacts, receive industry supervisor ratings, and earn verified skill credits toward your Digital Skill Twin.
              </p>
            </div>

            {activeInternship && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                    Milestone Completion
                  </p>
                  <p className="text-xl font-black text-green-700">
                    {approvedCount} / {totalCount} Approved ({progressPercent}%)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State if No Active Internship */}
        {!activeInternship && (
          <div className="p-10 rounded-2xl bg-white border border-[#dce9df] shadow-xs text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto">
              <Briefcase className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-[#17251b]">No Active Internship Currently Enrolled</h3>
              <p className="text-xs text-[#526157] leading-relaxed">
                When an employer accepts your application and marks you as Selected or Hired, your structured milestone workspace will appear here automatically.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/student/opportunities?type=Internship"
                className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
              >
                <span>Browse Matched Internships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/student/applications"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs shadow-xs transition-all"
              >
                <span>Track Submitted Applications</span>
              </Link>
            </div>
          </div>
        )}

        {/* Active Internship Details */}
        {activeInternship && (
          <>
            {/* Metadata Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#dce9df] shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#dce9df]/60 pb-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700 shrink-0 font-black text-base">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold text-[#17251b]">
                        {activeInternship.roleTitle}
                      </h2>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        {activeInternship.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-green-700 mt-0.5">
                      {activeInternship.company} • Stipend: <span className="font-mono text-slate-800">{activeInternship.stipend}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Industry Supervisor</span>
                    <span className="font-semibold text-slate-900">{activeInternship.supervisorName}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{activeInternship.supervisorEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Faculty Mentor</span>
                    <span className="font-semibold text-slate-900">{activeInternship.facultyMentorName || 'Dr. Ramesh Sharma'}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{activeInternship.facultyMentorEmail || 'faculty@univ.edu.in'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Duration & Period</span>
                    <span className="font-semibold text-slate-900">{activeInternship.durationWeeks} Weeks</span>
                    <span className="text-[11px] text-slate-500 block">{activeInternship.startDate} to {activeInternship.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[#17251b]">Milestone Progression Track</span>
                  <span className="font-mono font-bold text-green-700">{progressPercent}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Completion Certificate Banner if All Approved */}
              {activeInternship.status === 'Completed' && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-900">
                        Internship Successfully Completed & Verified!
                      </h4>
                      <p className="text-[11px] text-emerald-700">
                        Final Evaluation Grade: <strong className="font-black text-emerald-900">{activeInternship.finalGrade || 'A+'}</strong> • Verifiable Credential ID: <span className="font-mono">{activeInternship.completionCertificateId}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/student/portfolio"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <span>View in Digital Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Milestones List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#17251b]">Weekly Production Milestones</h3>
                  <p className="text-xs text-[#526157]">
                    Complete tasks chronologically to unlock subsequent stages and boost Skill Twin ratings.
                  </p>
                </div>
                <span className="text-xs font-mono text-green-800 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200 font-semibold">
                  6-Week Industry Standard
                </span>
              </div>

              <div className="space-y-4">
                {activeInternship.milestones.map((m) => {
                  const isApproved = m.status === 'Approved';
                  const isSubmitted = m.status === 'Submitted';
                  const isInProgress = m.status === 'In Progress';

                  return (
                    <div
                      key={m.id}
                      className={`p-6 rounded-2xl bg-white border transition-all shadow-xs ${
                        isApproved
                          ? 'border-emerald-200 bg-emerald-50/15'
                          : isSubmitted
                          ? 'border-amber-200 bg-amber-50/10'
                          : isInProgress
                          ? 'border-blue-200 shadow-sm'
                          : 'border-[#dce9df] opacity-80'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              Week {m.weekNumber}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                            <span
                              className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                                isApproved
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : isSubmitted
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : isInProgress
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>

                          {/* Skills covered */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] text-slate-500 font-semibold">Credited Skills:</span>
                            {m.skillsCovered.map((s) => (
                              <span
                                key={s}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f7fcf8] text-green-800 border border-[#dce9df]"
                              >
                                {s} {isApproved && '✓ (+15 pts)'}
                              </span>
                            ))}
                          </div>

                          {/* Deliverable requirement */}
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                              Required Deliverable
                            </span>
                            <p className="text-xs text-slate-800 font-medium">{m.deliverableRequired}</p>
                          </div>

                          {/* Submission info if exists */}
                          {m.submittedDeliverableUrl && (
                            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase font-bold text-blue-800">
                                  Submitted Artifact (On {m.submissionDate || 'Recently'})
                                </span>
                                <a
                                  href={m.submittedDeliverableUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1"
                                >
                                  <span>Open Artifact</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                              {m.submissionNotes && (
                                <p className="text-[11px] text-slate-700 italic">
                                  "{m.submissionNotes}"
                                </p>
                              )}
                            </div>
                          )}

                          {/* Supervisor Feedback & Rating if approved */}
                          {isApproved && (
                            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase font-bold text-emerald-900 flex items-center gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  Supervisor Review & Rating • Verified by {m.approvedBy}
                                </span>
                                <div className="flex items-center gap-0.5 text-amber-500">
                                  {Array.from({ length: m.mentorRating || 5 }).map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                  ))}
                                  <span className="text-[10px] font-mono font-bold text-slate-700 ml-1">
                                    {m.mentorRating || 5}/5
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-emerald-950 font-medium">
                                "{m.mentorFeedback}"
                              </p>
                              <p className="text-[10px] text-emerald-800">
                                Approved on {m.approvedDate} • +15 points successfully credited to AI Skill Twin!
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="shrink-0 flex flex-col gap-2 min-w-[170px]">
                          {!isApproved && (
                            <button
                              onClick={() => {
                                setSelectedMilestone({
                                  internshipId: activeInternship.id,
                                  milestone: m,
                                });
                                setDeliverableUrl(m.submittedDeliverableUrl || '');
                                setSubmissionNotes(m.submissionNotes || '');
                              }}
                              className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isSubmitted ? 'Update Submission' : 'Submit Deliverable'}</span>
                            </button>
                          )}

                          {/* Quick review action so users/evaluators can simulate mentor verification */}
                          {isSubmitted && !isApproved && (
                            <button
                              onClick={() => {
                                setReviewMilestone({
                                  internshipId: activeInternship.id,
                                  milestone: m,
                                });
                                setReviewFeedback(
                                  'Code structure is clean, well-documented, and conforms to industry standards. Approved for production staging.'
                                );
                              }}
                              className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Mentor Verification</span>
                            </button>
                          )}

                          {isApproved && (
                            <div className="px-3 py-2 rounded-xl bg-emerald-100/60 border border-emerald-200 text-emerald-800 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Milestone Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Submit Deliverable Modal */}
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-green-50 text-green-800 border border-green-200">
                      Week {selectedMilestone.milestone.weekNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Submit Milestone Deliverable
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedMilestone.milestone.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitDeliverable} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                    Deliverable Expected
                  </span>
                  <p className="text-xs text-slate-900 font-medium">
                    {selectedMilestone.milestone.deliverableRequired}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Deliverable URL (GitHub PR / Repository / Document Link) *
                  </label>
                  <input
                    type="url"
                    required
                    value={deliverableUrl}
                    onChange={(e) => setDeliverableUrl(e.target.value)}
                    placeholder="https://github.com/company/repo/pull/123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-500">
                    Provide a public or organization-accessible URL so mentors can evaluate your code.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Submission Notes & Technical Architecture Summary
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Describe implementation details, architecture decisions, trade-offs, and test coverage..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {submitError}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedMilestone(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for Evaluation</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mentor Review & Approval Modal */}
        {reviewMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Supervisor / Mentor Review
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Evaluate Milestone Deliverable
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Week {reviewMilestone.milestone.weekNumber}: {reviewMilestone.milestone.title}
                  </p>
                </div>
                <button
                  onClick={() => setReviewMilestone(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleApproveMilestone} className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-900">
                      Submitted Deliverable Link
                    </span>
                    {reviewMilestone.milestone.submittedDeliverableUrl && (
                      <a
                        href={reviewMilestone.milestone.submittedDeliverableUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Open URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-800 font-mono truncate">
                    {reviewMilestone.milestone.submittedDeliverableUrl || 'No URL submitted'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Performance & Competency Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= reviewRating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-slate-700 ml-2">
                      {reviewRating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Qualitative Feedback & Engineering Guidance
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on architecture, efficiency, and engineering best practices..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-green-700" />
                    Automatic Closed-Loop Skill Crediting
                  </p>
                  <p className="text-[11px] text-green-800 leading-relaxed">
                    Approving this milestone will automatically elevate the student's AI Skill Twin by +15 verified points in: {reviewMilestone.milestone.skillsCovered.join(', ')}.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setReviewMilestone(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Credit Skill Twin</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
