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
  HelpCircle,
  Sparkles,
  ChevronRight,
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
    question: 'A background worker queue receives 2,000 tasks/sec, but each worker handles 50 tasks/sec. How many concurrent worker processes are required at minimum to prevent queue backlog?',
    options: ['20 workers', '40 workers', '50 workers', '100 workers'],
    correctIndex: 1,
    explanation: '2,000 tasks/sec / 50 tasks/sec/worker = 40 workers required to maintain throughput parity.',
  },
  {
    id: 6,
    category: 'Problem Solving',
    question: 'You observe an API endpoint latency spiking from 45ms to 1200ms when querying users by email. What is the most probable database fix?',
    options: ['Increase server RAM', 'Create an index on users(email)', 'Switch to NoSQL', 'Add multithreading in backend'],
    correctIndex: 1,
    explanation: 'A sudden latency spike on table scans without an index requires a B-Tree index on the search column.',
  },
  {
    id: 7,
    category: 'Problem Solving',
    question: 'If two concurrent microservices attempt to debit the same wallet balance, which database mechanism prevents the double-spending race condition?',
    options: ['SELECT FOR UPDATE (Pessimistic lock)', 'READ UNCOMMITTED', 'In-memory caching', 'DNS Load balancing'],
    correctIndex: 0,
    explanation: 'Pessimistic row-locking (`SELECT FOR UPDATE`) or serializable transactions guarantee isolation.',
  },
  {
    id: 8,
    category: 'Communication',
    question: 'When submitting an architectural Pull Request that introduces a breaking API change to teammates, what is the best practice?',
    options: [
      'Merge silently and fix complaints in Slack',
      'Provide a deprecation notice, migration guide, and backward-compatible v1 endpoint',
      'Delete the old endpoint immediately to enforce upgrades',
      'Wait for the product manager to write the release notes',
    ],
    correctIndex: 1,
    explanation: 'Enterprise teams maintain API contracts through deprecation windows and explicit migration guides.',
  },
  {
    id: 9,
    category: 'Communication',
    question: 'During a production incident retrospective (post-mortem), the primary objective is to:',
    options: [
      'Identify and discipline the engineer who pushed the faulty commit',
      'Establish a blameless analysis of system vulnerabilities and implement automated safeguards',
      'Explain away the downtime as an unavoidable cloud outage',
      'Delete the incident logs to prevent negative client PR',
    ],
    correctIndex: 1,
    explanation: 'Effective engineering cultures conduct blameless post-mortems focused on systemic prevention.',
  },
];

export default function SkillAssessmentPage() {
  const { updateAssessmentScore } = useApp();
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              Standardized Competency Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive Skill Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Take this verified assessment covering Technical Backend Standards, Algorithmic Problem Solving, and Engineering Communication. Submissions automatically recalculate your AI Skill Twin scores.
          </p>
        </div>

        {/* Results Banner if Submitted */}
        {submitted && scoreResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-700/60 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Assessment Completed & Synchronized
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Overall Score: {scoreResult.totalScore}%
                </h2>
                <p className="text-xs text-slate-300">
                  {scoreResult.correctCount} of {QUESTIONS.length} answers verified correct.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
                <Link
                  href="/student/skill-twin"
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <span>View Updated Skill Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Technical Architecture</span>
                <p className="text-xl font-bold text-indigo-400 mt-1">{scoreResult.techScore}%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">FastAPI, B-Tree, HTTP, Python</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Problem Solving</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">{scoreResult.problemScore}%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Concurrency, Queue Sizing, Tuning</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Communication & Process</span>
                <p className="text-xl font-bold text-amber-400 mt-1">{scoreResult.commScore}%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">API Deprecation, Blameless Post-Mortems</p>
              </div>
            </div>
          </div>
        )}

        {/* Question List */}
        <div className="space-y-4">
          {QUESTIONS.map((q, qIndex) => {
            const selectedOpt = answers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-950/15 border-emerald-800/50'
                      : 'bg-red-950/15 border-red-800/50'
                    : 'bg-slate-900/70 border-slate-800 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                    Question {qIndex + 1} • {q.category}
                  </span>
                  {submitted && (
                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-white mt-1 mb-4 leading-relaxed">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    let optStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (submitted) {
                      if (optIndex === q.correctIndex) {
                        optStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold';
                      } else if (selectedOpt === optIndex) {
                        optStyle = 'bg-red-950/80 border-red-600 text-red-200';
                      } else {
                        optStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                      }
                    } else if (selectedOpt === optIndex) {
                      optStyle = 'bg-indigo-950/80 border-indigo-500 text-white font-semibold';
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
                          <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submission */}
                {submitted && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Explanation: </strong>
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
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between sticky bottom-4 z-20 shadow-2xl">
            <span className="text-xs text-slate-400">
              {Object.keys(answers).length} of {QUESTIONS.length} questions answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
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
