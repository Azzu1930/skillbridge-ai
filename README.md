# SkillBridge AI — Academia × Industry Intelligence Platform

> **Smart India Hackathon Prototype** | **Problem Statement: SIH26044**  
> *Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement*

🌐 **Live Production Website:** [https://azzu1930.github.io/skillbridge-ai/](https://azzu1930.github.io/skillbridge-ai/)  
📂 **GitHub Repository:** [https://github.com/Azzu1930/skillbridge-ai](https://github.com/Azzu1930/skillbridge-ai)

---

## 1. Executive Summary

Traditional job boards merely connect static candidate resumes with generic job descriptions. **SkillBridge AI** transforms this paradigm by establishing a **continuous closed-loop skill intelligence ecosystem**:

$$\text{Industry Demand} \longrightarrow \text{AI Skill Twin} \longrightarrow \text{Skill Gap Diagnostic} \longrightarrow \text{Readiness Simulator} \longrightarrow \text{Targeted Matching} \longrightarrow \text{Feedback} \longrightarrow \text{Curriculum Reform}$$

### Core Innovation Pillars
1. **AI Student Skill Twin (`/student/skill-twin`)**: A dynamic, multi-vector mathematical profile estimating competency from verified code repos, timed challenges, and certifications (not self-reported bullet points).
2. **AI Skill Gap Diagnostics (`/student/skill-gap`)**: Automated gap analysis matching student capabilities against real industry benchmarks, explaining *why* missing skills matter to employers.
3. **Career Readiness Simulator (`/student/simulator`)**: An interactive "what-if" projection tool demonstrating how completing specific learning sprints (e.g. FastAPI, Docker, Capstone) increases placement probability from 68% to 91%.
4. **Explainable Candidate Matching (`/industry/candidates`)**: Transparent recruiter evaluation featuring the "Why this candidate?" natural language explainability breakdown.
5. **Closed-Loop Academia Intelligence (`/admin/intelligence`)**: Feedback from corporate post-interview evaluations automatically triggers remedial academic bootcamps and faculty development programs.

---

## 2. Four Core Personas & One-Click Demo Access

The platform provides dedicated role-based portals with instant one-click demo switching (no signup required):

| Persona | Demo Profile | Primary Route | Key Demonstrated Capabilities |
|---|---|---|---|
| **Student** | Abdul Aziz (Backend Track, 68% Ready) | `/student/dashboard` | Skill Twin, Resume Parser, Assessment, Gap Analysis, Simulator, Roadmap, 1-Click Apply |
| **Industry** | Razorpay / TechCorp Talent Acquisition | `/industry/dashboard` | Skill Graph, Candidate Matcher with "Why this candidate?", Post Opportunity, Feedback |
| **Faculty** | Dr. Ramesh Sharma (CSE Dept Head) | `/faculty/dashboard` | Department skill spread, Student cohort deficits, FDP & Research collaborations |
| **Institution Admin** | Dean of Placement & Academic Council | `/admin/dashboard` | Macro placement analytics, Closed-Loop Intelligence pipeline, Training Engine |

*Public Student Portfolio (no login required):* `/portfolio/demo-student`

---

## 3. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.5+ (Strict Type Checking)
- **Styling & UI System**: Tailwind CSS, Lucide Icons, Glassmorphic / Deep-Tech Slate Palette
- **Visualization**: Recharts (Radar charts, Growth Area charts, Readiness Lines, Bar charts)
- **State Management**: Reactive Local Context with LocalStorage persistence
- **AI / Diagnostic Engine**: Deterministic multi-vector heuristic & pattern-matching scoring engine with LLM abstraction fallback
- **Hosting & CDN**: GitHub Pages Global Edge Network with SSL & HTTPS

---

## 4. Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Azzu1930/skillbridge-ai.git
cd skillbridge-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:3000
```

### Production Build & Static Export
```bash
# Generate production bundle
npm run build

# Type check
npm run typecheck
```

---

## 5. Seed Dataset Highlights

- **50+ Students Modeled** across CSE, IT, AI/DS, and ECE branches.
- **Primary Demo Persona**: Abdul Aziz (B.Tech CSE 3rd Year, NIT, CGPA 8.74, Target: Backend Developer).
- **10+ Corporate Partners**: Razorpay, TCS Digital, Zomato, Microsoft India, AWS Solutions, Swiggy, Flipkart, Infosys.
- **30+ Opportunities**: Full-time roles, 6-month internships, funded live capstones, and executive mentorships.
- **30+ Tracked Competencies**: Python, FastAPI, SQL, PostgreSQL, Docker, Kubernetes, AWS, REST APIs, Redis, DSA, Communication.

---

## 6. License
Created for Smart India Hackathon (SIH26044). Distributed under the MIT License.
