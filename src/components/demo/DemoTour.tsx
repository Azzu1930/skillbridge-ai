'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Target,
  Sliders,
  Briefcase,
  Users,
  Workflow,
} from 'lucide-react';

export function DemoTour() {
  const { isDemoTourOpen, setIsDemoTourOpen, setRole } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  if (!isDemoTourOpen) return null;

  const tourSteps = [
    {
      title: '1. AI Student Skill Twin',
      route: '/student/skill-twin',
      targetRole: 'student' as const,
      icon: Cpu,
      tagline: 'Moving beyond static resume bullet points',
      description:
        'Instead of arbitrary self-reported skills, the Skill Twin continuously computes competence from verified GitHub code commits, assessment tests, and course certifications.',
      keyTakeaway: 'Notice Abdul Aziz has 87% Python & 78% SQL with verifiable evidence records.',
    },
    {
      title: '2. AI Skill Gap Analysis',
      route: '/student/skill-gap',
      targetRole: 'student' as const,
      icon: Target,
      tagline: 'Pinpointing what industry expects vs what student has',
      description:
        'Benchmarks Abdul against real Backend Developer industry standards. Shows exactly why the 68% score exists and flags FastAPI, REST APIs, Docker, and AWS as critical missing components.',
      keyTakeaway: 'Translates cold job requirements into explicit, prioritized gap reasons.',
    },
    {
      title: '3. Career Readiness Simulator',
      route: '/student/simulator',
      targetRole: 'student' as const,
      icon: Sliders,
      tagline: 'The Killer Demo: Model-based interactive projections',
      description:
        'Students test real "what-if" scenarios. Check off "Learn REST APIs" and "Master FastAPI" to watch live readiness project upwards from 68% to 77%, and up to 91% with an industry capstone.',
      keyTakeaway: 'Provides the "Recommended Fastest Path" based on highest impact per effort hour.',
    },
    {
      title: '4. Opportunity Matching & 1-Click Apply',
      route: '/student/opportunities',
      targetRole: 'student' as const,
      icon: Briefcase,
      tagline: 'Multi-vector match percentage with clear missing skill alerts',
      description:
        'Opportunities show why a student matched (e.g. Razorpay 92% Match) and highlights missing skills so there are no black-box rejections. Applying updates the live application tracker.',
      keyTakeaway: 'Click "Apply" on Razorpay and check the Applications tracker live.',
    },
    {
      title: '5. Industry AI Candidate Matcher',
      route: '/industry/candidates',
      targetRole: 'industry' as const,
      icon: Users,
      tagline: 'Transparent explainable AI: "Why this candidate?"',
      description:
        'Switching into the Industry persona reveals the recruiter side. Candidates are ranked objectively with verifiable evidence. Click "Why this candidate?" to see the natural language reasoning.',
      keyTakeaway: 'Recruiters save 80% screening time without relying on biased keyword filters.',
    },
    {
      title: '6. Closed-Loop Academia Intelligence',
      route: '/admin/intelligence',
      targetRole: 'admin' as const,
      icon: Workflow,
      tagline: 'Closing the loop: From hiring feedback to institutional reform',
      description:
        'Companies submit post-interview evaluations. The system aggregates cohort gaps (e.g. 61% Cloud gap) and prompts Institutional Admins to generate targeted bootcamp interventions.',
      keyTakeaway: 'Transforms universities from reactive degree mills into proactive talent incubators.',
    },
  ];

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = tourSteps[currentStep + 1];
      setCurrentStep(currentStep + 1);
      setRole(nextStep.targetRole);
      router.push(nextStep.route);
    } else {
      setIsDemoTourOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = tourSteps[currentStep - 1];
      setCurrentStep(currentStep - 1);
      setRole(prevStep.targetRole);
      router.push(prevStep.route);
    }
  };

  const handleJumpToStep = (index: number) => {
    const target = tourSteps[index];
    setCurrentStep(index);
    setRole(target.targetRole);
    router.push(target.route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700/50">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-wide uppercase">
                SIH26044 Prototype Walkthrough
              </span>
              <p className="text-[11px] text-slate-400">Step {currentStep + 1} of {tourSteps.length}</p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoTourOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress indicators */}
        <div className="flex px-6 pt-4 gap-1.5">
          {tourSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => handleJumpToStep(i)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i === currentStep
                  ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                  : i < currentStep
                  ? 'bg-indigo-600'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-700/60 shrink-0">
              <StepIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs font-medium text-emerald-400 mt-0.5">
                {step.tagline}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {step.description}
          </p>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-300">
              <strong className="text-white">Judge Tip: </strong>
              {step.keyTakeaway}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDemoTourOpen(false);
                setCurrentStep(0);
              }}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-md shadow-emerald-500/20"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
