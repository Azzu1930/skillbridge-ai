'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { TrainingRecommendationItem } from '@/types';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Clock,
  Users,
  Target,
  ArrowRight,
  X,
  Workflow,
} from 'lucide-react';

export default function TrainingEnginePage() {
  const { trainingRecommendations, generateNewTrainingPlan } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Cloud Computing (AWS/GCP)');
  const [selectedCohort, setSelectedCohort] = useState('CSE & IT 3rd Year');
  const [successBanner, setSuccessBanner] = useState(false);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    generateNewTrainingPlan(selectedSkill, selectedCohort);
    setIsModalOpen(false);
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 3500);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-purple-950 text-purple-400 border border-purple-800/60">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                Automated Curriculum Intervention
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Training Recommendation Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              When market skill deficits cross critical thresholds, the engine synthesizes structured institutional training programs with quantified projected readiness boosts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Generate Training Plan</span>
            </button>
          </div>
        </div>

        {successBanner && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              New training plan successfully generated and scheduled into department academic calendar!
            </span>
          </div>
        )}

        {/* Training Recommendations List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight">
              Institutional Training Programs ({trainingRecommendations.length})
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Model-based readiness impact active
            </span>
          </div>

          <div className="space-y-4">
            {trainingRecommendations.map((tr) => (
              <div
                key={tr.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        tr.priority === 'HIGH'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : tr.priority === 'MEDIUM'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tr.priority} PRIORITY
                    </span>
                    <h3 className="text-base font-bold text-white">{tr.skill}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-1 rounded">
                      +{tr.projectedReadinessBoost} pts readiness
                    </span>
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-2 py-1 rounded border border-indigo-800/60">
                      {tr.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      Diagnostic Reason
                    </p>
                    <p className="text-slate-300 leading-relaxed">{tr.reason}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <p className="text-[10px] text-emerald-400 uppercase font-semibold">
                      Recommended Action
                    </p>
                    <p className="text-emerald-200 font-medium leading-relaxed">
                      {tr.recommendedAction}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      Target: <strong className="text-white">{tr.targetCohorts.join(', ')}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Duration: {tr.durationWeeks} Weeks
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    Curriculum impact calibrated against NIRF & AICTE metrics
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal to Generate New Training Plan */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Generate Training Plan</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Target Skill Deficit to Bridge
                  </label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Cloud Computing (AWS/GCP)">Cloud Computing (AWS/GCP) - 61% deficit</option>
                    <option value="Docker & Container Security">Docker & Container Security - 54% deficit</option>
                    <option value="Production FastAPI Framework">Production FastAPI Framework - 45% deficit</option>
                    <option value="Advanced System Design & DSA">Advanced System Design & DSA - 48% deficit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Target Student Cohorts
                  </label>
                  <select
                    value={selectedCohort}
                    onChange={(e) => setSelectedCohort(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="CSE & IT 3rd Year">CSE & IT 3rd Year (730 students)</option>
                    <option value="All 3rd Year Engineering">All 3rd Year Engineering (1,248 students)</option>
                    <option value="Final Year Placement Pool">Final Year Placement Pool (420 students)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                  <p className="font-semibold text-emerald-300">Projected Cohort Impact:</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">
                    Model projects an estimated <strong>+12 readiness points</strong> and a 16% reduction in employer retraining lag upon completion.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  >
                    Confirm & Publish Plan
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
