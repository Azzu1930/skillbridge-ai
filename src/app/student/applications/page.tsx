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
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  Career Application Tracking
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Application Pipeline & Timeline
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Real-time tracking of all submitted internships, jobs, and live capstones. Recruiter review statuses and scheduled interview links synchronize here directly.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kanban Board
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
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
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col min-w-[200px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">{stage}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 font-bold">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {stageApps.length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-6">No records</p>
                    ) : (
                      stageApps.map((app) => (
                        <div
                          key={app.id}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 line-clamp-1">
                              {app.opportunityTitle}
                            </p>
                            <p className="text-[11px] text-blue-700 font-medium">{app.company}</p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                            <span>{app.appliedDate}</span>
                            <span className="text-emerald-700 font-mono font-bold">
                              {app.matchScore}% Match
                            </span>
                          </div>

                          {app.interviewDate && (
                            <div className="p-2 rounded bg-blue-50 border border-blue-200 text-[10px] text-blue-800 flex items-center gap-1 font-medium">
                              <Calendar className="w-3 h-3 text-blue-600 shrink-0" />
                              <span className="truncate">{app.interviewDate}</span>
                            </div>
                          )}

                          {app.status === 'Selected' && (
                            <Link
                              href="/student/internship-progress"
                              className="w-full py-1 rounded bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold text-center block transition-all shadow-2xs"
                            >
                              Open Workspace →
                            </Link>
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
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-900">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Application Milestones
            </h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0 shadow-xs">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{app.opportunityTitle}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                          {app.matchScore}% Fit
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{app.company} • Applied on {app.appliedDate}</p>
                      <p className="text-xs text-slate-600 mt-1.5">{app.notes}</p>
                      {app.interviewDate && (
                        <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Scheduled: {app.interviewDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg uppercase ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : app.status === 'Interview'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : app.status === 'Selected'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {app.status}
                    </span>

                    {app.status === 'Selected' && (
                      <Link
                        href="/student/internship-progress"
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                      >
                        <span>Internship Workspace →</span>
                      </Link>
                    )}
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
