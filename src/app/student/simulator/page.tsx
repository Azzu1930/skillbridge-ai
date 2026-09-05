'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { simulateCareerReadiness } from '@/lib/ai-engine';
import {
  Sliders,
  CheckCircle2,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight,
  AlertCircle,
  Briefcase,
  Compass,
} from 'lucide-react';

export default function CareerReadinessSimulatorPage() {
  const { student, simulatorActions, toggleSimulatorAction } = useApp();

  const simulation = simulateCareerReadiness(student.readinessScore || 68, simulatorActions);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Sliders className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  SIH26044 What-If Simulator
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Career Readiness Simulator
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Test interactive &quot;what-if&quot; growth scenarios. Select actions below to project how verified interventions in FastAPI, Docker, and capstone projects improve your placement readiness index.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/roadmap"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Open 6-Week Roadmap</span>
              </Link>
            </div>
          </div>

          {/* Explicit Model Disclaimer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Notice:</strong> This simulation represents a{' '}
              <span className="underline font-semibold">Model-based readiness projection</span> based on employer skill-weights and historical hiring thresholds, and <span className="underline font-semibold">NOT a guaranteed employment probability</span>.
            </span>
          </div>
        </div>

        {/* Live Projection Scoreboard */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Target Role Track: <strong className="text-slate-900">{student.targetRole}</strong>
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-blue-700">
                  {simulation.projectedScore}%
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    +{simulation.delta}% Projected Gain
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Baseline: {simulation.currentScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-mono">
                <span>Baseline: {simulation.currentScore}%</span>
                <span className="text-blue-700 font-bold">Simulated: {simulation.projectedScore}%</span>
                <span>Max: 96%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full border border-slate-200 overflow-hidden relative">
                {/* Baseline marker */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-slate-300"
                  style={{ width: `${simulation.currentScore}%` }}
                />
                {/* Projected Boost */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-blue-600 transition-all duration-300"
                  style={{ width: `${simulation.projectedScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                <span>Internship Ready Threshold: 70%</span>
                <span className="text-emerald-700 font-bold">Enterprise Ready: 85%+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Columns: Action Toggles vs Fastest Path Optimizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Actions Checkbox List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Simulate Skill & Project Milestones
                </h2>
                <p className="text-xs text-slate-500">
                  Toggle actions to simulate their direct impact on your candidate evaluation
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                {simulatorActions.filter((a) => a.completed).length} of {simulatorActions.length} actions selected
              </span>
            </div>

            <div className="space-y-3">
              {simulatorActions.map((action) => (
                <div
                  key={action.id}
                  onClick={() => toggleSimulatorAction(action.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    action.completed
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`mt-0.5 p-1 rounded-md border shrink-0 transition-colors ${
                        action.completed
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold transition-colors ${
                            action.completed ? 'text-blue-900' : 'text-slate-900'
                          }`}
                        >
                          {action.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {action.skill}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-blue-700 block">
                      +{action.impactScore}% pts
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {action.effortWeeks} wks
                    </span>
                    <span
                      className={`inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        action.priority === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {action.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recommended Fastest Path Algorithm */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Recommended Fastest Path
              </h2>
              <p className="text-xs text-slate-500">
                Sorted by highest readiness gain per week of effort
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              {simulation.fastestPath.map((item, index) => {
                const efficiencyRatio = (item.impactScore / item.effortWeeks).toFixed(1);

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {item.skill}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 ml-5 mt-0.5">
                        {item.effortWeeks} wks • +{item.impactScore}% boost
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        {efficiencyRatio}x ROI
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/student/opportunities"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Check Matched Opportunities</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
