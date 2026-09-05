'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function LearningRoadmapPage() {
  const { student, roadmap, toggleRoadmapMilestone } = useApp();

  const completedCount = roadmap.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  Personalized Growth Blueprint
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                6-Week Learning Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Structured curriculum designed around your specific deficits for <strong className="text-slate-900">{student.targetRole}</strong>. From core REST concepts to industry-mentored capstone delivery.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Sprint Progress</p>
                <p className="text-2xl font-extrabold text-emerald-700">{progressPercent}%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{completedCount}</span> of {roadmap.length} weeks done
              </div>
            </div>
          </div>

          {/* Workflow Pipeline */}
          <div className="mt-6 pt-4 border-t border-slate-100 hidden sm:flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="text-blue-600">CURRENT STATE</span>
            <span>→</span>
            <span className="text-amber-600">SKILL GAP</span>
            <span>→</span>
            <span className="text-emerald-600">LEARNING</span>
            <span>→</span>
            <span className="text-teal-600">PROJECT</span>
            <span>→</span>
            <span className="text-purple-600">INTERNSHIP</span>
            <span>→</span>
            <span className="text-slate-900">JOB READINESS</span>
          </div>
        </div>

        {/* Milestone Timeline Cards */}
        <div className="space-y-4">
          {roadmap.map((m) => (
            <div
              key={m.week}
              className={`p-6 rounded-2xl border transition-all ${
                m.completed
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRoadmapMilestone(m.week)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      m.completed
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white border-slate-300 text-transparent hover:text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        Week {m.week} • {m.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          m.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-800'
                            : m.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-purple-50 text-purple-800'
                        }`}
                      >
                        {m.difficulty}
                      </span>
                    </div>
                    <h2
                      className={`text-base font-bold mt-1 ${
                        m.completed ? 'text-emerald-800 line-through' : 'text-slate-900'
                      }`}
                    >
                      {m.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {m.effortHours} hours effort
                  </span>
                </div>
              </div>

              {/* Rationale & Deliverable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Industry Rationale
                  </p>
                  <p className="text-slate-600 leading-relaxed">{m.reason}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Target Deliverable & Verification
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">{m.deliverable}</p>
                </div>
              </div>

              {/* Skills Impacted */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[10px] text-slate-500 font-semibold self-center mr-1">Skills Impacted:</span>
                {m.skillsImpacted.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
