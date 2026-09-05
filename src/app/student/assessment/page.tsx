'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface Question {
  id: number;
  category: 'Technical' | 'Problem Solving' | 'Communication';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Technical',
    question: 'In Python, what is the time complexity of looking up a key in a standard dictionary on average?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'Python dictionaries are implemented via hash tables, yielding average O(1) key lookups.',
  },
  {
    id: 2,
    category: 'Technical',
    question: 'Which HTTP status code signifies that a POST request was processed successfully and resulted in a newly created resource?',
    options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
    correctIndex: 1,
    explanation: 'HTTP 201 Created indicates the request succeeded and led to the creation of a resource.',
  },
  {
    id: 3,
    category: 'Technical',
    question: 'Which database index structure is default in PostgreSQL and optimized for range queries and equality comparisons?',
    options: ['Hash Index', 'B-Tree Index', 'GIN Index', 'BRIN Index'],
    correctIndex: 1,
    explanation: 'B-Tree is the default index in PostgreSQL, perfectly balanced for =, <, <=, >, >= comparisons.',
  },
  {
    id: 4,
    category: 'Technical',
    question: 'In modern FastAPI applications, which library is primarily leveraged for request schema definition and data validation?',
    options: ['Marshmallow', 'Pydantic', 'Cerberus', 'Django Forms'],
    correctIndex: 1,
    explanation: 'FastAPI uses Pydantic models for request validation, serialization, and OpenAPI generation.',
  },
  {
    id: 5,
    category: 'Problem Solving',
    question: 'A backend server receives 1,000 asynchronous orders per second, but the inventory database can only handle 200 writes/sec safely. What architectural pattern best prevents database collapse?',
    options: [
      'Scale up CPU on the web server',
      'Buffer requests in a persistent Redis/Kafka queue with worker pools',
      'Reject all requests above 200/sec with HTTP 500',
      'Disable database ACID transactions during peak load',
    ],
    correctIndex: 1,
    explanation: 'A message queue (Redis/Kafka) decouples high-throughput bursts and enables worker pools to drain tasks at a controlled, safe rate.',
  },
  {
    id: 6,
    category: 'Problem Solving',
    question: 'When designing idempotent REST APIs, what HTTP header or token should clients pass to safely retry failed network requests without creating duplicate charges?',
    options: ['Authorization Token', 'ETag', 'Idempotency-Key (UUID)', 'User-Agent'],
    correctIndex: 2,
    explanation: 'An Idempotency-Key ensures the server checks whether the operation was already executed before reapplying it.',
  },
  {
    id: 7,
    category: 'Communication',
    question: 'You discover that an API change you deployed breaks backwards compatibility for 10% of mobile users. What is the most professional initial response?',
    options: [
      'Silently patch the code overnight and hope nobody noticed',
      'Immediately alert the engineering channel, propose a rollback/hotfix, and publish a clear incident status update',
      'Blame the mobile team for not reading the latest documentation',
      'Wait for customer support tickets to accumulate before taking action',
    ],
    correctIndex: 1,
    explanation: 'Transparent communication, immediate stabilization (rollback/hotfix), and blameless stakeholder updates reflect engineering maturity.',
  },
  {
    id: 8,
    category: 'Communication',
    question: 'When communicating a 2-day delay on a promised project milestone to an industry mentor or engineering manager, what should your update include?',
    options: [
      'No update until the project is finally finished',
      'Root cause explanation, what was tried, revised ETA, and updated contingency plan',
      'A one-sentence message: "Delayed due to technical difficulties"',
      'A request to drop testing requirements so you can finish on time',
    ],
    correctIndex: 1,
    explanation: 'Effective engineers communicate delays proactively with context, tradeoffs, and a revised delivery roadmap.',
  },
];

export default function SkillAssessmentPage() {
  const { updateAssessmentScore } = useApp();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    totalScore: number;
    techScore: number;
    problemScore: number;
    commScore: number;
    correctCount: number;
  } | null>(null);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    let techCorrect = 0;
    let techTotal = 0;
    let probCorrect = 0;
    let probTotal = 0;
    let commCorrect = 0;
    let commTotal = 0;

    QUESTIONS.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctIndex;
      if (isCorrect) correct++;

      if (q.category === 'Technical') {
        techTotal++;
        if (isCorrect) techCorrect++;
      } else if (q.category === 'Problem Solving') {
        probTotal++;
        if (isCorrect) probCorrect++;
      } else {
        commTotal++;
        if (isCorrect) commCorrect++;
      }
    });

    const total = Math.round((correct / QUESTIONS.length) * 100);
    const tech = Math.round((techCorrect / techTotal) * 100);
    const prob = Math.round((probCorrect / probTotal) * 100);
    const comm = Math.round((commCorrect / commTotal) * 100);

    const result = {
      totalScore: total,
      techScore: tech,
      problemScore: prob,
      commScore: comm,
      correctCount: correct,
    };

    setScoreResult(result);
    setSubmitted(true);

    // Sync to AppContext Skill Twin state
    updateAssessmentScore('Problem Solving', prob);
    updateAssessmentScore('Technical', tech);
    updateAssessmentScore('Communication', comm);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScoreResult(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
              Standardized Competency Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Skill Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Take this verified assessment covering Technical Backend Standards, Algorithmic Problem Solving, and Engineering Communication. Submissions automatically recalculate your AI Skill Twin scores.
          </p>
        </div>

        {/* Results Banner if Submitted */}
        {submitted && scoreResult && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm animate-in fade-in duration-200 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Assessment Completed & Synchronized
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Overall Score: {scoreResult.totalScore}%
                </h2>
                <p className="text-xs text-slate-500">
                  {scoreResult.correctCount} of {QUESTIONS.length} answers verified correct.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Retake Test</span>
                </button>
                <Link
                  href="/student/skill-twin"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Updated Skill Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Technical Architecture</span>
                <p className="text-xl font-extrabold text-blue-700 mt-1">{scoreResult.techScore}%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">FastAPI, B-Tree, HTTP, Python</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Problem Solving</span>
                <p className="text-xl font-extrabold text-emerald-700 mt-1">{scoreResult.problemScore}%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Concurrency, Queue Sizing, Tuning</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Communication & Process</span>
                <p className="text-xl font-extrabold text-purple-700 mt-1">{scoreResult.commScore}%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">API Deprecation, Blameless Post-Mortems</p>
              </div>
            </div>
          </div>
        )}

        {/* Question List */}
        <div className="space-y-4">
          {QUESTIONS.map((q, qIndex) => {
            const selectedOpt = answers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-red-50/40 border-red-200'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Question {qIndex + 1} • {q.category}
                  </span>
                  {submitted && (
                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      {isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-1 mb-4 leading-relaxed">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let optStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80';

                    if (submitted) {
                      if (optIndex === q.correctIndex) {
                        optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (selectedOpt === optIndex) {
                        optStyle = 'bg-red-50 border-red-400 text-red-900 font-medium';
                      } else {
                        optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (selectedOpt === optIndex) {
                      optStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-bold';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelect(q.id, optIndex)}
                        disabled={submitted}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOpt === optIndex && !submitted && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submission */}
                {submitted && (
                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Explanation: </strong>
                      {q.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action Bar */}
        {!submitted && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between sticky bottom-4 z-20 shadow-xl">
            <span className="text-xs text-slate-500 font-medium">
              {Object.keys(answers).length} of {QUESTIONS.length} questions answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Submit & Update Skill Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
