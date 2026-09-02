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
  Sparkles,
  AlertCircle,
  HelpCircle,
  Briefcase,
  Compass,
} from 'lucide-react';

export default function CareerReadinessSimulatorPage() {
  const { student, simulatorActions, toggleSimulatorAction } = useApp();

  const simulation = simulateCareerReadiness(68, simulatorActions);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  <Sliders className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  SIH26044 Killer Demo Feature
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Career Readiness Simulator
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Test interactive &quot;what-if&quot; growth scenarios. Select actions below to project how verified interventions in FastAPI, Docker, and capstone projects improve your placement readiness index.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/roadmap"
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Open 6-Week Roadmap</span>
              </Link>
            </div>
          </div>

          {/* Explicit Model Disclaimer required by prompt */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-amber-300/90">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Notice:</strong> This simulation represents a{' '}
              <span className="underline font-semibold">Model-based readiness projection</span> based on employer skill-weights and historical hiring thresholds, and <span className="underline font-semibold">NOT a guaranteed employment probability</span>.
            </span>
          </div>
        </div>

        {/* Live Projection Scoreboard */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Target Role Track: <strong className="text-white">{student.targetRole}</strong>
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {simulation.projectedScore}%
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{simulation.delta}% Projected Gain
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Baseline: {simulation.currentScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-mono">
                <span>Baseline: 68%</span>
                <span className="text-emerald-400 font-bold">Simulated: {simulation.projectedScore}%</span>
                <span>Max Target: 96%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden relative">
                {/* Baseline marker */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-slate-700"
                  style={{ width: `${simulation.currentScore}%` }}
                />
                {/* Projected Boost */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500 via-emerald-400 to-emerald-300 transition-all duration-300"
                  style={{ width: `${simulation.projectedScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                <span>Internship Ready Threshold: 70%</span>
                <span className="text-emerald-400">Enterprise Ready: 85%+</span>
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
                <h2 className="text-base font-bold text-white tracking-tight">
                  Simulate Skill & Project Milestones
                </h2>
                <p className="text-xs text-slate-400">
                  Toggle actions to simulate their direct impact on your candidate evaluation
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400">
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
                      ? 'bg-emerald-950/30 border-emerald-600/80 shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`mt-0.5 p-1 rounded-md border shrink-0 transition-colors ${
                        action.completed
                          ? 'bg-emerald-400 text-slate-950 border-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold transition-colors ${
                            action.completed ? 'text-emerald-300' : 'text-white'
                          }`}
                        >
                          {action.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {action.skill}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-400 block">
                      +{action.impactScore}% pts
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {action.effortWeeks} wks
                    </span>
                    <span
                      className={`inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        action.priority === 'High'
                          ? 'bg-red-950 text-red-300 border border-red-800/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/60'
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
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Recommended Fastest Path
              </h2>
              <p className="text-xs text-slate-400">
                Sorted by highest readiness gain per week of effort
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
              {simulation.fastestPath.map((item, index) => {
                const efficiencyRatio = (item.impactScore / item.effortWeeks).toFixed(1);

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-white truncate">
                          {item.skill}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 ml-5 mt-0.5">
                        {item.effortWeeks} wks • +{item.impactScore}% boost
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-1.5 py-0.5 rounded">
                        {efficiencyRatio}x ROI
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href="/student/opportunities"
                  className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
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
