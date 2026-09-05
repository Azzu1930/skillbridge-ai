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
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <MessageSquarePlus className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Pillar 4: Closed-Loop Evaluator
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Corporate Evaluation & Feedback
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Post-interview and internship evaluations submitted here feed directly into institutional analytics, updating student cohort skill gaps and triggering academic training recommendations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/intelligence"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
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
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Post-Interview Evaluation Form
              </h2>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Verified Recruiter • Razorpay
              </span>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Feedback successfully added to Academia Intelligence!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Candidate Evaluated</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Role Evaluated</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
              />
            </div>

            {/* Granular 1-5 Ratings */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Technical Competency Ratings (1 to 5 Stars)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* REST API */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-700">REST API knowledge</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, restApiRating: star })}
                        className={`text-sm ${star <= formData.restApiRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-600 font-bold">{formData.restApiRating}/5</span>
                  </div>
                </div>

                {/* Coding */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-700">Coding / Python</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, codingRating: star })}
                        className={`text-sm ${star <= formData.codingRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-600 font-bold">{formData.codingRating}/5</span>
                  </div>
                </div>

                {/* Communication */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-700">Communication</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, communicationRating: star })}
                        className={`text-sm ${star <= formData.communicationRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-600 font-bold">{formData.communicationRating}/5</span>
                  </div>
                </div>

                {/* Problem Solving */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-700">Problem Solving</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, problemSolvingRating: star })}
                        className={`text-sm ${star <= formData.problemSolvingRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-amber-600 font-bold">{formData.problemSolvingRating}/5</span>
                  </div>
                </div>

                {/* Docker */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm sm:col-span-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-700 font-medium">Docker / Containers</span>
                    <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-mono">Flagged Deficit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, dockerRating: star })}
                        className={`text-sm ${star <= formData.dockerRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-1 text-[11px] font-mono text-rose-600 font-bold">{formData.dockerRating}/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Additional Qualitative Feedback
              </label>
              <textarea
                rows={3}
                value={formData.qualitativeComments}
                onChange={(e) => setFormData({ ...formData, qualitativeComments: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 font-sans shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Feedback to Academia Intelligence</span>
            </button>
          </form>

          {/* Right: Live Aggregated Feedback Stream */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-blue-600" />
                  Recent Corporate Evaluations (42 Total)
                </h2>
                <span className="text-xs font-mono text-blue-600 font-semibold">Live Stream</span>
              </div>

              <div className="space-y-3 mt-4">
                {companyFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{fb.studentName}</span>
                        <span className="text-[11px] text-blue-600 font-medium">{fb.company} • {fb.role}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{fb.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                        REST APIs: <strong className="text-slate-900">{fb.restApiRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                        Coding: <strong className="text-slate-900">{fb.codingRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                        Communication: <strong className="text-slate-900">{fb.communicationRating}/5</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                        Docker: <strong className="text-rose-600">{fb.dockerRating}/5</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                      &quot;{fb.qualitativeComments}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Next Action:</span>
              <Link
                href="/admin/training"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
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
