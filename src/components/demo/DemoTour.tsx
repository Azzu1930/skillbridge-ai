'use client';

import React from 'react';
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
  MapPin,
  Briefcase,
  Users,
  MessageSquarePlus,
  Workflow,
  Award,
  RefreshCw,
} from 'lucide-react';

interface TourStep {
  stepNumber: number;
  title: string;
  route: string;
  targetRole: 'student' | 'industry' | 'faculty' | 'admin';
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  judgeAction: string;
}

export function DemoTour() {
  const { isDemoTourOpen, setIsDemoTourOpen, setRole, demoTourStep, setDemoTourStep } = useApp();
  const router = useRouter();

  if (!isDemoTourOpen) return null;

  const tourSteps: TourStep[] = [
    {
      stepNumber: 1,
      title: 'AI Student Skill Twin',
      route: '/student/skill-twin',
      targetRole: 'student',
      icon: Cpu,
      tagline: 'Step 1 of 10: Dynamic, Evidence-Grounded Competency Profile',
      description:
        'Instead of arbitrary self-reported resume bullet points, SkillBridge AI computes continuous competency from verified GitHub code commits, assessment tests, and course certifications.',
      judgeAction:
        'Notice Abdul Aziz has Python (90%) and SQL (82%) marked as "Assessment Verified", while FastAPI (40%) and Docker (30%) are "Pending Verification". Click any skill card to view verified proofs.',
    },
    {
      stepNumber: 2,
      title: 'Skill Gap Analysis',
      route: '/student/skill-gap',
      targetRole: 'student',
      icon: Target,
      tagline: 'Step 2 of 10: Benchmarking Against Real Industry Requirements',
      description:
        'Benchmarks Abdul against real Backend Developer industry standards. Shows exactly why his current 68% readiness exists and isolates critical missing skills (FastAPI, Docker, Cloud).',
      judgeAction:
        'Review the qualitative "Why this gap matters" explanations. Employers filter out candidates lacking container and production API evidence.',
    },
    {
      stepNumber: 3,
      title: 'Career Readiness Simulator',
      route: '/student/simulator',
      targetRole: 'student',
      icon: Sliders,
      tagline: 'Step 3 of 10: The Killer Demo — Model-Based What-If Projections',
      description:
        'Empowers students to simulate the exact impact of learning sprints. Scores are calculated by a deterministic model rather than random shifts.',
      judgeAction:
        'Toggle "Learn FastAPI" (+6%) and "Build REST API Project" (+6%) to watch projected readiness climb from 68% to 80%, and up to 91% with Docker and Internship! Note the Fastest Path ROI optimizer.',
    },
    {
      stepNumber: 4,
      title: 'Personalized Learning Roadmap',
      route: '/student/roadmap',
      targetRole: 'student',
      icon: MapPin,
      tagline: 'Step 4 of 10: 30-Day Milestone Execution Blueprint',
      description:
        'Translates identified deficits into a week-by-week structured curriculum sprint with estimated hours, key deliverables, and direct tie-in to the Skill Twin.',
      judgeAction:
        'Click "Mark Complete" on Week 1 (REST APIs) or Week 2 (FastAPI). Notice the completion immediately updates the live Skill Twin and readiness score!',
    },
    {
      stepNumber: 5,
      title: 'Opportunity Matching & 1-Click Apply',
      route: '/student/opportunities',
      targetRole: 'student',
      icon: Briefcase,
      tagline: 'Step 5 of 10: Transparent Match Percentages & Gap Alerts',
      description:
        'Matches students with verified internship openings. Unlike opaque job boards, SkillBridge AI shows both matched competencies and missing skills with 100% transparency.',
      judgeAction:
        'Locate the "Backend Engineering Intern @ Razorpay" (91% Match). Click "Apply Now" to submit an application with verified Skill Twin proof.',
    },
    {
      stepNumber: 6,
      title: 'Industry Candidate Matcher',
      route: '/industry/candidates',
      targetRole: 'industry',
      icon: Users,
      tagline: 'Step 6 of 10: Explainable AI: "Why This Candidate?"',
      description:
        'Switching into Industry persona reveals the recruiter side. Candidates are ranked using a transparent 5-factor scoring formula: Skill Compatibility (50%), Assessment (15%), Projects (15%), Experience (10%), Evidence (10%).',
      judgeAction:
        'Abdul Aziz is ranked #1 at 91% fit! Click "Why this candidate?" to inspect the transparent explainability breakdown, then click "Shortlist Candidate" to advance him.',
    },
    {
      stepNumber: 7,
      title: 'Company Post-Interview Feedback',
      route: '/industry/feedback',
      targetRole: 'industry',
      icon: MessageSquarePlus,
      tagline: 'Step 7 of 10: Structured Evaluation Feeding Academia',
      description:
        'Recruiters provide granular ratings (REST APIs, Coding, Docker, Communication) after evaluations. Rather than vanishing into an HR database, this feedback feeds directly into academic intelligence.',
      judgeAction:
        'Notice Razorpay\'s evaluation for Abdul Aziz: Docker rated 2/5 with note "Needs more hands-on deployment experience." Click "Submit Feedback" to feed into institutional analytics.',
    },
    {
      stepNumber: 8,
      title: 'Institution Skill Intelligence',
      route: '/admin/intelligence',
      targetRole: 'admin',
      icon: Workflow,
      tagline: 'Step 8 of 10: Closed-Loop Institutional Intelligence',
      description:
        'Aggregates recruiter evaluations across 42 corporate partners. Automatically detects cohort deficits (e.g. Docker 42% gap across 710 CSE students) and maps them to institutional reform.',
      judgeAction:
        'Observe how Docker and Cloud emerge as top institutional deficits. This completes the loop from hiring outcomes back into academia!',
    },
    {
      stepNumber: 9,
      title: 'AI Training Recommendation Engine',
      route: '/admin/training',
      targetRole: 'admin',
      icon: Award,
      tagline: 'Step 9 of 10: Automated Curriculum Interventions',
      description:
        'Synthesizes actionable training programs to bridge detected deficits. Inputs cohort size, industry demand, and partner mentors to produce ready-to-deploy bootcamps.',
      judgeAction:
        'See the top recommended intervention: "Docker & Containerization Bootcamp" for 124 students. Click "Deploy Intervention" to approve it and boost projected cohort readiness by +12%!',
    },
    {
      stepNumber: 10,
      title: 'Closed-Loop Ecosystem Summary',
      route: '/',
      targetRole: 'student',
      icon: RefreshCw,
      tagline: 'Step 10 of 10: Continuous Academia–Industry Loop',
      description:
        'Industry Demand → Skill Intelligence → Student Skill Twin → Skill Gap → Upskilling → Matching → Feedback → Institutional Training → Better Industry Talent.',
      judgeAction:
        'You have experienced the complete closed-loop cycle. Feel free to explore any dashboard or test the AI Career Copilot at your own pace!',
    },
  ];

  const currentTourStep = tourSteps[demoTourStep] || tourSteps[0];
  const StepIcon = currentTourStep.icon;

  const navigateToStep = (index: number) => {
    if (index >= 0 && index < tourSteps.length) {
      const targetStep = tourSteps[index];
      setDemoTourStep(index);
      setRole(targetStep.targetRole);
      router.push(targetStep.route);
    }
  };

  const handleNext = () => {
    if (demoTourStep < tourSteps.length - 1) {
      navigateToStep(demoTourStep + 1);
    } else {
      setIsDemoTourOpen(false);
    }
  };

  const handlePrevious = () => {
    if (demoTourStep > 0) {
      navigateToStep(demoTourStep - 1);
    }
  };

  const handleSkip = () => {
    setIsDemoTourOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all animate-fadeIn">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-900 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">
                  Platform Feature Tour
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Step {demoTourStep + 1} of {tourSteps.length}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {currentTourStep.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((demoTourStep + 1) / tourSteps.length) * 100}%` }}
          />
        </div>

        {/* Tagline */}
        <p className="text-xs font-bold text-blue-600 mb-2">
          {currentTourStep.tagline}
        </p>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentTourStep.description}
          </p>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-800 uppercase tracking-wide block text-[10px] mb-0.5">
                Recommended Action for Evaluators:
              </span>
              <span>{currentTourStep.judgeAction}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
          <button
            onClick={handleSkip}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2.5">
            {demoTourStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>{demoTourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
