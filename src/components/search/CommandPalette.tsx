'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  X,
  Briefcase,
  GraduationCap,
  Sparkles,
  Sliders,
  Target,
  ArrowRight,
  Building2,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { opportunities, student } = useApp();

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered outside
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPages = [
    { title: 'AI Student Skill Twin', desc: 'View multidimensional skills & evidence', route: '/student/skill-twin', icon: Sparkles },
    { title: 'Career Readiness Simulator', desc: 'Simulate learning impact and fastest path (68% → 91%)', route: '/student/simulator', icon: Sliders },
    { title: 'AI Skill Gap Analysis', desc: 'Benchmark vs Backend / Cloud roles', route: '/student/skill-gap', icon: Target },
    { title: 'Industry Skill Graph', desc: 'Visual network of skills & tools', route: '/industry/skill-graph', icon: Building2 },
    { title: 'Opportunities Marketplace', desc: 'Browse internships and jobs', route: '/student/opportunities', icon: Briefcase },
    { title: 'Closed-Loop Intelligence', desc: 'Industry demand to curriculum improvement', route: '/admin/intelligence', icon: GraduationCap },
  ];

  const filteredPages = quickPages.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredOpps = opportunities
    .filter((o) =>
      o.title.toLowerCase().includes(query.toLowerCase()) ||
      o.company.toLowerCase().includes(query.toLowerCase()) ||
      o.requiredSkills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 4);

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, jobs, pages, companies (e.g. 'FastAPI', 'Simulator', 'Razorpay')..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Pages */}
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
              Core Modules
            </p>
            <div className="space-y-1">
              {filteredPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.route}
                    onClick={() => handleNavigate(page.route)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 group-hover:border-blue-300">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">
                          {page.title}
                        </p>
                        <p className="text-[11px] text-slate-500">{page.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opportunities Section */}
          {filteredOpps.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
                Matched Opportunities ({filteredOpps.length})
              </p>
              <div className="space-y-1">
                {filteredOpps.map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => handleNavigate('/student/opportunities')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                          {opp.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {opp.company} • {opp.stipend}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {opp.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1 py-0.5 bg-white text-slate-600 border border-slate-200 rounded text-[10px] shadow-xs">↑↓</kbd>
            <kbd className="px-1 py-0.5 bg-white text-slate-600 border border-slate-200 rounded text-[10px] shadow-xs">Enter</kbd>
          </div>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
