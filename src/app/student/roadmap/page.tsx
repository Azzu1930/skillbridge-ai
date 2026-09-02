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
  BookOpen,
  Code,
  Layers,
  Award,
  Sliders,
} from 'lucide-react';

export default function LearningRoadmapPage() {
  const { student, roadmap, toggleRoadmapMilestone } = useApp();

  const completedCount = roadmap.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Personalized Growth Blueprint
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                6-Week Learning Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Structured curriculum designed around your specific deficits for <strong className="text-white">{student.targetRole}</strong>. From core REST concepts to industry-mentored capstone delivery.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Sprint Progress</p>
                <p className="text-2xl font-black text-emerald-400">{progressPercent}%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-800" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white">{completedCount}</span> of {roadmap.length} weeks done
              </div>
            </div>
          </div>

          {/* Workflow Pipeline */}
          <div className="mt-6 pt-4 border-t border-slate-800 hidden sm:flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="text-indigo-400">CURRENT STATE</span>
            <span>→</span>
            <span className="text-amber-400">SKILL GAP</span>
            <span>→</span>
            <span className="text-emerald-400">LEARNING</span>
            <span>→</span>
            <span className="text-sky-400">PROJECT</span>
            <span>→</span>
            <span className="text-purple-400">INTERNSHIP</span>
            <span>→</span>
            <span className="text-white">JOB READINESS</span>
          </div>
        </div>

        {/* Milestone Timeline Cards */}
        <div className="space-y-4">
          {roadmap.map((m) => (
            <div
              key={m.week}
              className={`p-6 rounded-2xl border transition-all ${
                m.completed
                  ? 'bg-emerald-950/20 border-emerald-800/60 shadow-md'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRoadmapMilestone(m.week)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      m.completed
                        ? 'bg-emerald-400 text-slate-950 border-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-transparent hover:text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-2 py-0.5 rounded">
                        Week {m.week} • {m.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          m.difficulty === 'Beginner'
                            ? 'bg-emerald-950 text-emerald-300'
                            : m.difficulty === 'Intermediate'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-purple-950 text-purple-300'
                        }`}
                      >
                        {m.difficulty}
                      </span>
                    </div>
                    <h2
                      className={`text-base font-bold mt-1 ${
                        m.completed ? 'text-emerald-300 line-through' : 'text-white'
                      }`}
                    >
                      {m.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {m.effortHours} hours effort
                  </span>
                </div>
              </div>

              {/* Rationale & Deliverable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Industry Rationale
                  </p>
                  <p className="text-slate-300 leading-relaxed">{m.reason}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Target Deliverable & Verification
                  </p>
                  <p className="text-emerald-300 font-medium leading-relaxed">{m.deliverable}</p>
                </div>
              </div>

              {/* Skills Impacted */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[10px] text-slate-500 font-semibold self-center mr-1">Skills Impacted:</span>
                {m.skillsImpacted.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
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
