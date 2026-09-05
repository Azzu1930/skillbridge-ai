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
  const { trainingRecommendations, generateNewTrainingPlan, deployTrainingIntervention } = useApp();
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
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Automated Curriculum Intervention
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Training Recommendation Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              When market skill deficits cross critical thresholds, the engine synthesizes structured institutional training programs with quantified projected readiness boosts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Generate Training Plan</span>
            </button>
          </div>
        </div>

        {successBanner && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              New training plan successfully generated and scheduled into department academic calendar!
            </span>
          </div>
        )}

        {/* Training Recommendations List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Institutional Training Programs ({trainingRecommendations.length})
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Model-based readiness impact active
            </span>
          </div>

          <div className="space-y-4">
            {trainingRecommendations.map((tr) => (
              <div
                key={tr.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        tr.priority === 'HIGH'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : tr.priority === 'MEDIUM'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {tr.priority} PRIORITY
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{tr.skill}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                      +{tr.projectedReadinessBoost} pts readiness
                    </span>
                    <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                      {tr.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">
                      Diagnostic Reason
                    </p>
                    <p className="text-slate-600 leading-relaxed">{tr.reason}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                    <p className="text-[10px] text-emerald-700 uppercase font-semibold">
                      Recommended Action & Format
                    </p>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {tr.recommendedAction}
                    </p>
                    <div className="pt-2 mt-2 border-t border-slate-200 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                      <span>Format: <strong className="text-slate-900">{tr.suggestedFormat || 'Hands-on intensive lab'}</strong></span>
                      <span>Mentor: <strong className="text-blue-700">{tr.industryMentor || 'Corporate Engineering Team'}</strong></span>
                      <span>Target Students: <strong className="text-slate-900">{tr.enrolledCount || 124}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Target Cohorts: <strong className="text-slate-900">{tr.targetCohorts.join(', ')}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Duration: {tr.durationWeeks} {tr.durationWeeks === 1 ? 'Week (5 Days)' : 'Weeks'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      Curriculum impact calibrated against NIRF & AICTE metrics
                    </span>
                    {tr.status === 'Proposed' ? (
                      <button
                        onClick={() => deployTrainingIntervention(tr.id)}
                        className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Deploy Intervention</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Intervention (+{tr.projectedReadinessBoost}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal to Generate New Training Plan */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Generate Training Plan</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Target Skill Deficit to Bridge
                  </label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none shadow-sm"
                  >
                    <option value="Cloud Computing (AWS/GCP)">Cloud Computing (AWS/GCP) - 61% deficit</option>
                    <option value="Docker & Container Security">Docker & Container Security - 54% deficit</option>
                    <option value="Production FastAPI Framework">Production FastAPI Framework - 45% deficit</option>
                    <option value="Advanced System Design & DSA">Advanced System Design & DSA - 48% deficit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Target Student Cohorts
                  </label>
                  <select
                    value={selectedCohort}
                    onChange={(e) => setSelectedCohort(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none shadow-sm"
                  >
                    <option value="CSE & IT 3rd Year">CSE & IT 3rd Year (730 students)</option>
                    <option value="All 3rd Year Engineering">All 3rd Year Engineering (1,248 students)</option>
                    <option value="Final Year Placement Pool">Final Year Placement Pool (420 students)</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="font-semibold text-emerald-900">Projected Cohort Impact:</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Model projects an estimated <strong>+12 readiness points</strong> and a 16% reduction in employer retraining lag upon completion.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all"
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
