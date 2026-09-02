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
} from 'lucide-react';

export default function CompanyFeedbackPage() {
  const { student, companyFeedbacks, addCompanyFeedback } = useApp();

  const [formData, setFormData] = useState({
    company: 'Razorpay Software',
    studentName: student.name,
    role: 'Backend Developer Track',
    technicalRating: 4.5,
    communicationRating: 4.0,
    problemSolvingRating: 4.5,
    domainKnowledgeRating: 4.0,
    interviewPerformance: 4.5,
    projectReadiness: 4.2,
    qualitativeComments:
      'Candidate has exceptional grasp of asynchronous concurrency in Python and task queue workers. Needs 2 weeks of hands-on exposure to production FastAPI schemas and Docker container orchestration before production deployment.',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCompanyFeedback(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
                Post-interview and internship evaluations submitted here feed directly into institutional analytics, triggering curriculum adjustments and university training bootcamps.
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
                Candidate Evaluation Form
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Verified Recruiter
              </span>
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Feedback submitted! Closed-loop institutional curriculum recommendations updated.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Candidate</label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Rating Sliders */}
            <div className="space-y-3 pt-2">
              {[
                { label: 'Technical Core Skills', key: 'technicalRating' },
                { label: 'Communication & Review', key: 'communicationRating' },
                { label: 'Algorithmic Problem Solving', key: 'problemSolvingRating' },
                { label: 'Domain & Architecture Knowledge', key: 'domainKnowledgeRating' },
                { label: 'Interview Coding Performance', key: 'interviewPerformance' },
                { label: 'Production Project Readiness', key: 'projectReadiness' },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className="text-amber-400 font-mono font-bold">
                      {(formData as any)[item.key]} / 5.0
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={(formData as any)[item.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.key]: parseFloat(e.target.value) })
                    }
                    className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Qualitative Feedback for Academia & Candidate
              </label>
              <textarea
                rows={3}
                required
                value={formData.qualitativeComments}
                onChange={(e) => setFormData({ ...formData, qualitativeComments: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Feeds /admin/intelligence model</span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
              >
                <span>Submit Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Historical Feedback Records Log */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Partner Evaluations ({companyFeedbacks.length})
            </h2>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {companyFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{fb.company}</span>
                      <p className="text-[11px] text-indigo-400">{fb.studentName} • {fb.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                        Avg: {((fb.technicalRating + fb.problemSolvingRating + fb.interviewPerformance) / 3).toFixed(1)} / 5
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">{fb.date}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                    &quot;{fb.qualitativeComments}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
