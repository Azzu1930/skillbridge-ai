'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import {
  Network,
  Share2,
  Sparkles,
  Info,
  ExternalLink,
  Briefcase,
  BookOpen,
  ArrowRight,
  Target,
  Layers,
  CheckCircle2,
  ChevronRight,
  Database,
  Cpu,
  Server,
  Cloud,
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'role' | 'skill' | 'tool' | 'project' | 'opportunity';
  demand: string;
  level: string;
  relatedRoles: string[];
  resources: string[];
  opportunities: string[];
  description: string;
}

const GRAPH_NODES: GraphNode[] = [
  {
    id: 'role_backend',
    label: 'Backend Developer',
    type: 'role',
    demand: '+38% Industry Surge',
    level: 'Advanced',
    relatedRoles: ['Full Stack Engineer', 'Cloud Architect', 'Platform Engineer'],
    resources: ['Backend Engineering Masterclass', 'High-Performance Microservices Guide'],
    opportunities: ['Razorpay Software', 'Zomato Engineering', 'TCS Digital'],
    description: 'Core architectural role responsible for data integrity, server throughput, and distributed API reliability.',
  },
  {
    id: 'skill_fastapi',
    label: 'FastAPI',
    type: 'skill',
    demand: '+42% YoY Growth',
    level: 'Intermediate - Advanced',
    relatedRoles: ['Backend Developer', 'Microservices Engineer', 'AI/ML Deployment'],
    resources: ['FastAPI Official Asynchronous Docs', 'Pydantic v2 Serialization Deep Dive'],
    opportunities: ['Zomato Engineering (3 Openings)', 'Razorpay API Platform'],
    description: 'Modern, fast (high-performance) Python web framework based on standard Python type hints and ASGI concurrency.',
  },
  {
    id: 'skill_rest',
    label: 'REST APIs & OpenAPI',
    type: 'skill',
    demand: '+24% Steady Demand',
    level: 'Intermediate',
    relatedRoles: ['Backend Developer', 'Frontend Developer', 'API Architect'],
    resources: ['RESTful API Design Standards', 'OpenAPI 3.1 Spec Best Practices'],
    opportunities: ['Razorpay Software', 'Flipkart Commerce Cloud'],
    description: 'Standard architectural contract for web services ensuring idempotency, clear status headers, and schema validation.',
  },
  {
    id: 'skill_postgres',
    label: 'PostgreSQL',
    type: 'tool',
    demand: '+26% YoY Growth',
    level: 'Intermediate - Advanced',
    relatedRoles: ['Backend Developer', 'Data Engineer', 'Database Administrator'],
    resources: ['PostgreSQL Query Tuning with EXPLAIN ANALYZE', 'ACID Isolation & B-Trees'],
    opportunities: ['TCS Digital Labs', 'Swiggy Merchant Tech'],
    description: 'Enterprise open-source relational database known for strong transactional guarantees and rich indexing capabilities.',
  },
  {
    id: 'skill_docker',
    label: 'Docker & Containers',
    type: 'tool',
    demand: '+31% YoY Growth',
    level: 'Intermediate',
    relatedRoles: ['DevOps Engineer', 'Cloud Architect', 'Backend Developer'],
    resources: ['Multi-stage Dockerfile Optimization', 'Container Security & Least Privilege'],
    opportunities: ['AWS Solutions Partner', 'Zomato Infrastructure'],
    description: 'Operating system-level virtualization enabling reproducible runtime environments across development and production.',
  },
  {
    id: 'skill_cloud',
    label: 'Cloud Infrastructure (AWS/GCP)',
    type: 'tool',
    demand: '+38% YoY Growth',
    level: 'Advanced',
    relatedRoles: ['Cloud Engineer', 'Site Reliability Engineer', 'Backend Lead'],
    resources: ['AWS Cloud Architecture Foundations', 'Serverless & VPC Security'],
    opportunities: ['AWS Solutions Partner Network', 'TCS Digital Innovation'],
    description: 'Scalable computing, object storage, and managed relational clusters that power 90%+ of modern software platforms.',
  },
];

export default function IndustrySkillGraphPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(GRAPH_NODES[0]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  <Network className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Ontological Competency Mapping
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Industry Skill Graph
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Visualizing the multi-layered topology connecting <strong className="text-white">Roles → Core Skills → Production Tools → Verified Projects → Opportunities</strong>. Click any node to inspect market analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Visual Graph & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph Network Visual Canvas */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Interactive Node Network
                </span>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Role
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Core Skill
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> System Tool
                  </span>
                </div>
              </div>

              {/* Connected Visual Topology representation */}
              <div className="space-y-4 py-4">
                {/* Central Root Node */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedNode(GRAPH_NODES[0])}
                    className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-lg ${
                      selectedNode.id === GRAPH_NODES[0].id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-600/40 scale-105'
                        : 'bg-slate-950 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <Server className="w-5 h-5 text-indigo-300" />
                    <div className="text-left">
                      <p className="text-xs font-extrabold uppercase tracking-wide">Root Role Node</p>
                      <p className="text-sm font-black">{GRAPH_NODES[0].label}</p>
                    </div>
                  </button>
                </div>

                {/* Connecting SVG Lines */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-slate-700" />
                </div>

                {/* Child Nodes Branch Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {GRAPH_NODES.slice(1).map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    const isSkill = node.type === 'skill';

                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? isSkill
                              ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg shadow-emerald-950 scale-[1.03]'
                              : 'bg-amber-950/80 border-amber-400 text-white shadow-lg shadow-amber-950 scale-[1.03]'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                              isSkill
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {node.type}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">{node.demand}</span>
                        </div>
                        <p className="text-xs font-bold text-white">{node.label}</p>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Dynamic graph ontology refreshed weekly from live job specs</span>
              <span className="text-emerald-400 font-medium">Click node to inspect intelligence →</span>
            </div>
          </div>

          {/* Right Detail Inspection Drawer */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                    {selectedNode.type} Intelligence
                  </span>
                  <h2 className="text-xl font-black text-white mt-1.5">{selectedNode.label}</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    {selectedNode.demand}
                  </span>
                  <span className="text-[10px] text-slate-400">Required: {selectedNode.level}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Industry Definition & Purpose
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{selectedNode.description}</p>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Associated High-Demand Roles
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.relatedRoles.map((role) => (
                      <span
                        key={role}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Curated Learning Resources
                  </h3>
                  <div className="space-y-1.5">
                    {selectedNode.resources.map((res) => (
                      <div
                        key={res}
                        className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px] text-slate-300"
                      >
                        <span className="truncate mr-2">{res}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Active Hiring Opportunities
                  </h3>
                  <div className="space-y-1.5">
                    {selectedNode.opportunities.map((opp) => (
                      <div
                        key={opp}
                        className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between text-[11px] text-emerald-300"
                      >
                        <span>{opp}</span>
                        <Link href="/student/opportunities" className="text-emerald-400 hover:underline">
                          View →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/student/simulator"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
              >
                <span>Simulate Learning {selectedNode.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
