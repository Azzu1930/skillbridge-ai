# SkillBridge AI — Academia × Industry Intelligence Platform

> **Smart India Hackathon 2026 Prototype** | **Problem Statement: SIH26044**  
> *Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement*  
> **Organization:** Ministry of Ayush | **Department:** All India Institute of Ayurveda | **Theme:** Miscellaneous

🌐 **Live Production Deployment:** [https://azzu1930.github.io/skillbridge-ai/](https://azzu1930.github.io/skillbridge-ai/)  
📂 **Source Code Repository:** [https://github.com/Azzu1930/skillbridge-ai](https://github.com/Azzu1930/skillbridge-ai)

---

## 1. Central Product Statement

> *"SkillBridge AI is an AI-powered, evidence-based Academia–Industry Skill Intelligence Ecosystem that continuously maps student competencies against industry requirements, identifies skill gaps, recommends personalized upskilling, connects students with relevant internships and jobs, and converts industry outcomes into actionable academic intelligence."*

$$\text{Industry Demand} \longrightarrow \text{Student Skill Twin} \longrightarrow \text{Skill Gap Diagnostic} \longrightarrow \text{Readiness Simulator} \longrightarrow \text{Transparent Match} \longrightarrow \text{Recruiter Feedback} \longrightarrow \text{Institutional Training Plan} \longrightarrow \text{Better Talent Pipeline}$$

---

## 2. Core SIH Innovation Pillars

1. **AI Student Skill Twin (`/student/skill-twin`)**: A dynamic, multi-vector competency profile grounded in verified GitHub repositories, timed coding challenges, and verified course certifications. Features transparent audit drawers and honest verification tags (`Assessment Verified`, `Evidence Submitted`, `Certificate Added`, `Pending Verification`).
2. **AI Skill Gap Diagnostics (`/student/skill-gap`)**: Automated gap analysis benchmarking student capabilities against live industry targets for Backend Developer, Full Stack Engineer, Cloud Architect, Data Engineer, and DevOps Engineer.
3. **Career Readiness Simulator (`/student/simulator`)**: An interactive "what-if" model-based projection tool calculating how learning FastAPI (+6%), building a REST API project (+6%), containerizing with Docker (+4%), mastering Cloud (+3%), and completing a backend internship (+4%) climbs readiness from **68% to 91%**.
4. **Explainable Candidate Matching (`/industry/candidates`)**: Transparent recruiter screening ranking candidates with a mathematical 5-factor scoring model (Skill 50%, Assessment 15%, Projects 15%, Experience 10%, Evidence 10%) featuring the "Why this candidate?" explainability breakdown and live "Shortlist" action.
5. **Closed-Loop Academia Intelligence (`/admin/intelligence` & `/admin/training`)**: Post-interview evaluations (e.g. Docker 2/5) feed into university analytics, aggregating cohort deficits (Docker 42% gap across 710 students) and synthesizing actionable bootcamps ("Docker & Containerization Bootcamp" for 124 students).

---

## 3. The 10-Step Interactive Judge Demo Tour

Click **"5-Minute Demo Tour"** in the top navigation bar or launch manually:

| Step | Persona | Route | Demonstrated Core Innovation |
|---|---|---|---|
| **01** | Student | `/student/skill-twin` | Dynamic evidence-based Skill Twin: Python (90%), SQL (82%), Docker (30% Pending Verification) |
| **02** | Student | `/student/skill-gap` | Industry benchmark comparison isolating missing backend competencies and employer rationale |
| **03** | Student | `/student/simulator` | Model-based what-if simulator climbing projected readiness from 68% to 91% with ROI optimizer |
| **04** | Student | `/student/roadmap` | Week-by-week actionable sprint; completing milestones updates the live Skill Twin |
| **05** | Student | `/student/opportunities` | Marketplace with Razorpay 91% match, transparent matched vs missing tags, and 1-click apply |
| **06** | Industry | `/industry/candidates` | Candidate ranking with 5-factor breakdown (46/50, 14/15, 14/15, 8/10, 9/10 = 91/100) and Shortlist button |
| **07** | Industry | `/industry/feedback` | Post-interview evaluation (Docker 2/5) submitting directly to academic analytics |
| **08** | Admin | `/admin/intelligence` | Closed-loop pipeline aggregating employer evaluations and cohort deficits |
| **09** | Admin | `/admin/training` | AI Training Planner recommending "Docker Bootcamp" for 124 students with 1-click deploy |
| **10** | All | `/` | Complete closed-loop ecosystem overview |

---

## 4. Four Core Demo Personas (No Login Required)

| Persona | Demo Profile | Primary Route | Description |
|---|---|---|---|
| **Student** | Abdul Aziz (Backend Track, 68% Ready) | `/student/dashboard` | Skill Twin, Gap Analysis, Simulator, Resume Parser, Assessment, Applications |
| **Industry** | Razorpay / Tech Talent Lead | `/industry/dashboard` | Candidate Matcher, Explainable AI, Post Opportunity, Evaluation Feedback |
| **Faculty** | Dr. Ramesh (Head of CSE Dept) | `/faculty/dashboard` | Department skill spread, Student cohort deficits, FDP tie-ups |
| **Institution Admin** | Dean of Placement & Academics | `/admin/dashboard` | Macro placement analytics, Closed-Loop Intelligence pipeline, Training Engine |

*Public Student Portfolio (Shareable Link):* `/portfolio/demo-student`

---

## 5. Technology Stack & Architecture

- **Frontend & App Framework**: Next.js 14 (React 18, Static HTML Export)
- **Language**: TypeScript 5.5 (Strict Mode, 100% Type-safe)
- **Styling**: Tailwind CSS, Glassmorphic Deep-Tech Design System, Lucide React Icons
- **Visualizations**: Recharts (Radar charts, Area charts, Bar charts, Responsive containers)
- **State Architecture**: Reactive Context API with LocalStorage state persistence and cross-role notification dispatch
- **AI Intelligence**: Deterministic multi-vector heuristic algorithms, pattern-matching keyword parsers, and grounded LLM career copilot
- **Production Edge Hosting**: GitHub Pages Global CDN with automated asset resolution and `.nojekyll` routing

---

## 6. Local Development & Testing

```bash
# 1. Clone repository
git clone https://github.com/Azzu1930/skillbridge-ai.git
cd skillbridge-ai

# 2. Install dependencies
npm install

# 3. Run typecheck
npm run typecheck

# 4. Run automated Phase 2 test suite
npx tsx scripts/verify-phase2.ts

# 5. Launch local development server
npm run dev
# Open http://localhost:3000

# 6. Run automated test suites
npx tsx scripts/verify-phase2.ts # Phase 2 verification suite (26 tests)
npx tsx scripts/verify-phase3.ts # Phase 3 verification suite (58 tests)
```

---

## 7. Phase 3 Upgrades: Resume Intelligence & Light Enterprise UI

1. **Light Professional Theme**: Clean, accessible SaaS enterprise styling (#F8FAFC canvas, crisp #FFFFFF surface cards, #0F172A slate headings, #475569 readable body, #2563EB primary indigo-blue accent, #E2E8F0 borders). Zero neon glows or dark overlays.
2. **Real-World Resume Parser Engine (`src/lib/resume-parser.ts`)**:
   - Client-side in-browser PDF extraction using `pdfjs-dist` with raw stream fallback.
   - Client-side DOCX extraction using `mammoth`.
   - 150+ technology taxonomy across languages, frameworks, cloud, databases, ML/AI, and tooling.
   - Deterministic 5-factor career readiness model explicitly labeled `"Estimated from resume evidence"`.
3. **Personalized 10-Role Skill Gap Diagnostics**:
   - Evaluates parsed profile against 10 target industry roles with categorized gap breakdowns (Strong, Moderate, Critical).
4. **Explainable Opportunity Matching**:
   - Ranks active job and internship postings with transparent `"Why you matched"` justifications, missing skills, and recommended upskilling actions.
5. **Resume Intelligence Monitor**:
   - Tracks resume iterations over time, computing competence score deltas, newly acquired skills, and projected readiness improvements.

---

## 8. Production Build & Deployment

```bash
# Static export build for GitHub Pages
GITHUB_PAGES=true npm run build
touch out/.nojekyll

# Verify static build
ls -la out/
```

---

## 9. Hackathon Evaluation Checklist (SIH26044)

- [x] Light, modern, accessible SaaS enterprise visual design system across all 28 routes.
- [x] Real resume upload (PDF/DOCX up to 10MB) with in-browser client-side parsing and instant sample loader.
- [x] 150+ taxonomy-based skill extraction with context snippet extraction and honest evidence labeling.
- [x] Deterministic 5-factor career readiness model (Skills 50%, Assessment 15%, Projects 15%, Experience 10%, Certifications 10%).
- [x] 10 target role benchmarks for gap analysis with strong/moderate/critical categorization.
- [x] Explainable opportunity matching with transparent "Why you matched" criteria and working 1-click apply.
- [x] Resume Intelligence Monitor comparing resume versions and tracking competency deltas.
- [x] Preserved complete primary student persona (Abdul Aziz) and 10-step Judge Demo Tour.
- [x] Automated test suites: Phase 2 (26/26 tests passed) & Phase 3 (58/58 tests passed).
- [x] Zero dead buttons, zero 404 errors, responsive layout across desktop and mobile.
- [x] Fully deployed and verified on GitHub Pages edge network.
