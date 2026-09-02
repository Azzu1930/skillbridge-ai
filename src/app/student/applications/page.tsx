'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { ApplicationItem } from '@/types';
import {
  Layers,
  Calendar,
  CheckCircle2,
  Clock,
  Briefcase,
  ArrowRight,
  Sparkles,
  Building2,
  MessageSquare,
} from 'lucide-react';

export default function ApplicationsPage() {
  const { applications } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline'>('kanban');

  const stages: ApplicationItem['status'][] = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected',
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Career Application Tracking
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Application Pipeline & Timeline
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Real-time tracking of all submitted internships, jobs, and live capstones. Recruiter review statuses and scheduled interview links synchronize here directly.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kanban Board
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Timeline View
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageApps = applications.filter((a) => a.status === stage);

              return (
                <div
                  key={stage}
                  className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col min-w-[200px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">{stage}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {stageApps.length === 0 ? (
                      <p className="text-[11px] text-slate-600 text-center py-6">No records</p>
                    ) : (
                      stageApps.map((app) => (
                        <div
                          key={app.id}
                          className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 shadow-sm space-y-2 hover:border-slate-700 transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-white line-clamp-1">
                              {app.opportunityTitle}
                            </p>
                            <p className="text-[11px] text-indigo-400 font-medium">{app.company}</p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>{app.appliedDate}</span>
                            <span className="text-emerald-400 font-mono font-semibold">
                              {app.matchScore}% Match
                            </span>
                          </div>

                          {app.interviewDate && (
                            <div className="p-2 rounded bg-indigo-950/50 border border-indigo-800/40 text-[10px] text-indigo-300 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-indigo-400 shrink-0" />
                              <span className="truncate">{app.interviewDate}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              Application Milestones
            </h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{app.opportunityTitle}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {app.matchScore}% Fit
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{app.company} • Applied on {app.appliedDate}</p>
                      <p className="text-xs text-slate-300 mt-1.5">{app.notes}</p>
                      {app.interviewDate && (
                        <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Scheduled: {app.interviewDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg uppercase ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : app.status === 'Interview'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                          : app.status === 'Selected'
                          ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
