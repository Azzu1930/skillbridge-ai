'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { INSTITUTION_STATS, TRAINING_RECOMMENDATIONS } from '@/data/seedData';
import { InternshipMilestoneItem } from '@/types';
import {
  Layers,
  GraduationCap,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Award,
  Users,
  Briefcase,
  ExternalLink,
  Star,
  UserCheck,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export default function FacultyDashboardPage() {
  const { currentUser, internships, approveInternshipMilestone } = useApp();

  const [reviewMilestone, setReviewMilestone] = useState<{
    internshipId: string;
    studentName: string;
    milestone: InternshipMilestoneItem;
  } | null>(null);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState(
    'Meets department curriculum standards. Well-documented architecture with good test coverage.'
  );

  const facultyName = currentUser?.fullName || 'Dr. Ramesh Sharma';
  const designation = currentUser?.designation || 'Head of Department';
  const department = currentUser?.department || 'Computer Science & Engineering';

  const handleApproveByFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewMilestone) return;

    approveInternshipMilestone({
      internshipId: reviewMilestone.internshipId,
      milestoneId: reviewMilestone.milestone.id,
      feedback: reviewFeedback,
      rating: reviewRating,
      approverName: `${facultyName} (${designation})`,
    });

    setReviewMilestone(null);
  };
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <GraduationCap className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Faculty & Academic Department Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curriculum & Department Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Faculty Persona: <strong className="text-slate-900 font-semibold">{facultyName} ({designation}, {department})</strong>. Real-time department competency distributions, student cohort deficits, and student internship supervision.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/faculty/collaborations"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Workflow className="w-4 h-4" />
              <span>Industry Tie-ups</span>
            </Link>
            <Link
              href="/admin/training"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span>Training Engine</span>
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Department Students</span>
            <p className="text-3xl font-black text-slate-900 mt-2">420</p>
            <p className="text-[11px] text-slate-500 mt-1">{department}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Placement Ready</span>
            <p className="text-3xl font-black text-emerald-600 mt-2">310 (74%)</p>
            <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Exceeds 70% threshold
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Identified Critical Gaps</span>
            <p className="text-3xl font-black text-amber-600 mt-2">4 Stacks</p>
            <p className="text-[11px] text-amber-600 mt-1">Cloud, Docker, FastAPI, DSA</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Active Collaborations</span>
            <p className="text-3xl font-black text-blue-600 mt-2">12</p>
            <p className="text-[11px] text-slate-500 mt-1">FDP, Guest Lectures, Projects</p>
          </div>
        </div>

        {/* Mentored Students & Active Internships Section */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Mentored Student Internships & Deliverable Approvals
              </h2>
              <p className="text-xs text-slate-500">
                Supervise student industry deliverables, assess academic rigor, and verify milestone completions
              </p>
            </div>
            <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded font-semibold self-start sm:self-auto">
              {internships.length} Active Industry Track(s)
            </span>
          </div>

          {internships.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No students currently on active internship tracks.</p>
          ) : (
            <div className="space-y-3">
              {internships.map((internship) => {
                const pendingMilestones = internship.milestones.filter(
                  (m) => m.status === 'Submitted'
                );

                return (
                  <div
                    key={internship.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{internship.studentName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                            {internship.roleTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Company: <strong className="text-slate-800">{internship.company}</strong> • Supervisor: {internship.supervisorName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          {internship.milestones.filter((m) => m.status === 'Approved').length} / {internship.milestones.length} Milestones Approved
                        </span>
                      </div>
                    </div>

                    {/* Pending Deliverables Submissions List */}
                    {pendingMilestones.length > 0 ? (
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                          Pending Faculty & Supervisor Review ({pendingMilestones.length}):
                        </span>
                        {pendingMilestones.map((pm) => (
                          <div
                            key={pm.id}
                            className="p-3 rounded-lg bg-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1">
                              <span className="font-bold text-slate-900">
                                Week {pm.weekNumber}: {pm.title}
                              </span>
                              <p className="text-[11px] text-slate-600 truncate max-w-md">
                                {pm.submissionNotes || pm.deliverableRequired}
                              </p>
                              {pm.submittedDeliverableUrl && (
                                <a
                                  href={pm.submittedDeliverableUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <span>Inspect Submitted Code / PR</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                setReviewMilestone({
                                  internshipId: internship.id,
                                  studentName: internship.studentName,
                                  milestone: pm,
                                })
                              }
                              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1 shrink-0"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Review & Approve</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic">
                        All currently submitted weekly deliverables have been reviewed and approved.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Skill Gaps Across Students Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cohort Skill Gaps */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-500" />
                  Top Skill Gaps Across Students
                </h2>
                <p className="text-xs text-slate-500">
                  Aggregated from student assessments and employer interview feedback
                </p>
              </div>
              <span className="text-xs font-mono text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded font-semibold">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              {INSTITUTION_STATS.cohortSkillGaps.map((item) => (
                <div
                  key={item.skill}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                    <span className="text-xs font-mono font-bold text-red-600">
                      {item.gapPercentage}% deficit
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full"
                      style={{ width: `${item.gapPercentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Impacts {item.studentsAffected} students in 3rd & 4th year
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/admin/training"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Trigger Remedial Bootcamp →</span>
              </Link>
            </div>
          </div>

          {/* Active Training Recommendations */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Proposed Academic Interventions
                </h2>
                <Link href="/admin/training" className="text-xs text-blue-600 hover:underline font-semibold">
                  Manage Engine →
                </Link>
              </div>

              <div className="space-y-3">
                {TRAINING_RECOMMENDATIONS.slice(0, 3).map((tr) => (
                  <div
                    key={tr.id}
                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{tr.skill}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          tr.priority === 'HIGH'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {tr.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{tr.recommendedAction}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>{tr.targetCohorts.join(', ')}</span>
                      <span className="text-emerald-600 font-bold">
                        +{tr.projectedReadinessBoost} pts readiness
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/faculty/collaborations"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Browse Industry Training & FDP Proposals →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty Review Modal */}
        {reviewMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      Faculty Academic Supervision
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Review & Validate Deliverable
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Student: <strong className="text-slate-900">{reviewMilestone.studentName}</strong> • Week {reviewMilestone.milestone.weekNumber}: {reviewMilestone.milestone.title}
                  </p>
                </div>
                <button
                  onClick={() => setReviewMilestone(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleApproveByFaculty} className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-900">
                      Submitted Code / Artifact Link
                    </span>
                    {reviewMilestone.milestone.submittedDeliverableUrl && (
                      <a
                        href={reviewMilestone.milestone.submittedDeliverableUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Open Artifact</span>
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
                    Academic & Technical Rating (1 to 5 Stars)
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
                    Faculty Assessment & Mentorship Remarks
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on academic alignment, code quality, and engineering principles..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    Automatic Closed-Loop Skill Crediting
                  </p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Faculty approval validates this milestone deliverable and credits +15 verified skill points to {reviewMilestone.studentName}'s Digital Skill Twin.
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
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify Deliverable</span>
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
