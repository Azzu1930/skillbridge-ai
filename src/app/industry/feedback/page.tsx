'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  MessageSquarePlus,
  Star,
  CheckCircle2,
  Building2,
  Workflow,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export default function CompanyFeedbackPage() {
  const { student, companyFeedbacks, submitIndustryFeedback } = useApp();

  const [formData, setFormData] = useState({
    company: 'Razorpay Software',
    studentName: 'Abdul Aziz',
    role: 'Backend Intern',
    restApiRating: 3,
    codingRating: 4,
    communicationRating: 3,
    problemSolvingRating: 4,
    dockerRating: 2,
    qualitativeComments:
      'Solid algorithmic foundation in Python and query optimization. Needs more hands-on deployment experience with Docker containerization and CI/CD pipelines.',
    detectedGaps: ['Docker', 'Cloud Deployment'],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIndustryFeedback({
      company: formData.company,
      studentName: formData.studentName,
      role: formData.role,
      restApiRating: formData.restApiRating,
      codingRating: formData.codingRating,
      communicationRating: formData.communicationRating,
      problemSolvingRating: formData.problemSolvingRating,
      dockerRating: formData.dockerRating,
      qualitativeComments: formData.qualitativeComments,
      detectedGaps: formData.detectedGaps,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-amber-950 text-amber-400 border border-amber-800/60">
                  <MessageSquarePlus className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Pillar 4: Closed-Loop Evaluator
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Corporate Evaluation & Feedback
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Post-interview and internship evaluations submitted here feed directly into institutional analytics, updating student cohort skill gaps and triggering academic training recommendations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/intelligence"
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-purple-400 hover:bg-purple-300 rounded-xl transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>View Closed-Loop Pipeline</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Form and Feedback Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submission Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                Post-Interview Evaluation Form
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Verified Recruiter • Razorpay
              </span>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-700 text-xs font-bold text-emerald-200 flex items-center gap-2.5 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Feedback successfully added to Academia Intelligence!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Candidate Evaluated</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Role Evaluated</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Granular 1-5 Ratings */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Technical Competency Ratings (1 to 5 Stars)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* REST API */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-300">REST API knowledge</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, restApiRating: star })}
                        className={`text-sm ${star <= formData.restApiRating ? 'text-amber-400' : 'text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">{formData.restApiRating}/5</span>
                  </div>
                </div>

                {/* Coding */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-300">Coding / Python</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, codingRating: star })}
                        className={`text-sm ${star <= formData.codingRating ? 'text-amber-400' : 'text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">{formData.codingRating}/5</span>
                  </div>
                </div>

                {/* Communication */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-300">Communication</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, communicationRating: star })}
                        className={`text-sm ${star <= formData.communicationRating ? 'text-amber-400' : 'text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">{formData.communicationRating}/5</span>
                  </div>
                </div>

                {/* Problem Solving */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-300">Problem Solving</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, problemSolvingRating: star })}
                        className={`text-sm ${star <= formData.problemSolvingRating ? 'text-amber-400' : 'text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">{formData.problemSolvingRating}/5</span>
                  </div>
                </div>

                {/* Docker */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 sm:col-span-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-300 font-medium">Docker / Containers</span>
                    <span className="text-[10px] text-rose-400 bg-rose-950 px-1.5 py-0.2 rounded font-mono">Flagged Deficit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, dockerRating: star })}
                        className={`text-sm ${star <= formData.dockerRating ? 'text-amber-400' : 'text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-rose-400 font-bold">{formData.dockerRating}/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Additional Qualitative Feedback
              </label>
              <textarea
                rows={3}
                value={formData.qualitativeComments}
                onChange={(e) => setFormData({ ...formData, qualitativeComments: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Feedback to Academia Intelligence</span>
            </button>
          </form>

          {/* Right: Live Aggregated Feedback Stream */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  Recent Corporate Evaluations (42 Total)
                </h2>
                <span className="text-xs font-mono text-purple-400">Live Stream</span>
              </div>

              <div className="space-y-3 mt-4">
                {companyFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-xs text-white block">{fb.studentName}</span>
                        <span className="text-[11px] text-amber-400">{fb.company} • {fb.role}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{fb.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        REST APIs: <strong className="text-white">{fb.restApiRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        Coding: <strong className="text-white">{fb.codingRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        Communication: <strong className="text-white">{fb.communicationRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        Docker: <strong className="text-rose-400">{fb.dockerRating}/5</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                      &quot;{fb.qualitativeComments}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Action:</span>
              <Link
                href="/admin/training"
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Inspect AI Training Planner →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
