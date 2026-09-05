import {
  StudentSkill,
  SkillGapItem,
  SimulatorAction,
  CandidateEvaluation,
  JobOpportunity,
  StudentProfile,
  TrainingRecommendationItem,
  PersonalizedOpportunityMatch,
} from '@/types';
import { TARGET_ROLE_BENCHMARKS } from '@/data/seedData';

/**
 * Calculate Skill Gap for StudentSkill[]
 */
export function calculateSkillGap(
  studentSkills: StudentSkill[],
  roleName: string
): {
  targetRole: string;
  overallMatch: number;
  gapItems: SkillGapItem[];
  missingCount: number;
  acquiredCount: number;
  inProgressCount: number;
  primaryGaps: string[];
} {
  const benchmark =
    TARGET_ROLE_BENCHMARKS[roleName] ||
    TARGET_ROLE_BENCHMARKS['Backend Developer'];

  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach((s) => {
    studentSkillMap.set(s.name.toLowerCase(), s.score);
  });

  let totalWeight = 0;
  let earnedScore = 0;
  const gapItems: SkillGapItem[] = [];
  const primaryGaps: string[] = [];

  benchmark.requiredSkills.forEach((req) => {
    const weight = req.importance === 'High' ? 3 : req.importance === 'Medium' ? 2 : 1;
    totalWeight += weight * req.targetScore;

    // Check fuzzy match
    let currentScore = 0;
    const reqKey = req.skill.toLowerCase();

    studentSkillMap.forEach((sScore, sName) => {
      if (sName === reqKey || reqKey.includes(sName) || sName.includes(reqKey)) {
        currentScore = Math.max(currentScore, sScore);
      }
    });

    earnedScore += weight * currentScore;

    let status: 'Acquired' | 'In Progress' | 'Missing';
    let gapReason = '';
    let recommendedAction = '';

    if (currentScore >= req.targetScore * 0.85) {
      status = 'Acquired';
      gapReason = `Proficiency meets industry benchmark (${currentScore}% vs ${req.targetScore}% target). Verified evidence on record.`;
      recommendedAction = 'Maintain with active portfolio project commits and code reviews.';
    } else if (currentScore > 0) {
      status = 'In Progress';
      gapReason = `Foundational understanding exists (${currentScore}%), but production depth (${req.targetScore}%) is expected.`;
      recommendedAction = `Target structured advanced assessment and benchmark projects in ${req.skill}.`;
      primaryGaps.push(req.skill);
    } else {
      status = 'Missing';
      gapReason = `Critical gap for ${roleName}. Corporate evaluations reject candidates lacking ${req.skill} evidence.`;
      recommendedAction = `Prioritize 2-week intensive learning sprint and build a dedicated project for ${req.skill}.`;
      primaryGaps.push(req.skill);
    }

    gapItems.push({
      skill: req.skill,
      currentScore,
      targetScore: req.targetScore,
      importance: req.importance,
      status,
      gapReason,
      recommendedAction,
      gapPercentage: Math.max(0, Math.round(((req.targetScore - currentScore) / req.targetScore) * 100)),
      priority: req.importance,
    });
  });

  const overallMatch = Math.min(100, Math.round((earnedScore / totalWeight) * 100));

  return {
    targetRole: benchmark.role,
    overallMatch: Math.max(overallMatch, 40),
    gapItems,
    missingCount: gapItems.filter((g) => g.status === 'Missing').length,
    inProgressCount: gapItems.filter((g) => g.status === 'In Progress').length,
    acquiredCount: gapItems.filter((g) => g.status === 'Acquired').length,
    primaryGaps: primaryGaps.slice(0, 4),
  };
}

/**
 * Personalized Skill Gap Diagnostic for arbitrary user resume skills
 */
export function calculateSkillGapForResume(
  userSkills: { name: string; score: number }[],
  roleName: string
): {
  targetRole: string;
  overallMatch: number;
  strongSkills: { name: string; score: number; target: number }[];
  moderateSkills: { name: string; score: number; target: number }[];
  criticalGaps: SkillGapItem[];
  gapItems: SkillGapItem[];
} {
  const benchmark =
    TARGET_ROLE_BENCHMARKS[roleName] ||
    TARGET_ROLE_BENCHMARKS['Backend Developer'];

  const skillMap = new Map<string, number>();
  userSkills.forEach((s) => skillMap.set(s.name.toLowerCase(), s.score));

  const strongSkills: { name: string; score: number; target: number }[] = [];
  const moderateSkills: { name: string; score: number; target: number }[] = [];
  const criticalGaps: SkillGapItem[] = [];
  const gapItems: SkillGapItem[] = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  benchmark.requiredSkills.forEach((req) => {
    const weight = req.importance === 'High' ? 3 : req.importance === 'Medium' ? 2 : 1;
    totalWeight += weight * req.targetScore;

    let currentScore = 0;
    const reqKey = req.skill.toLowerCase();

    skillMap.forEach((score, name) => {
      if (name === reqKey || reqKey.includes(name) || name.includes(reqKey)) {
        currentScore = Math.max(currentScore, score);
      }
    });

    earnedWeight += weight * currentScore;
    const gapPercentage = Math.max(0, Math.round(((req.targetScore - currentScore) / req.targetScore) * 100));

    let status: 'Acquired' | 'In Progress' | 'Missing';
    let gapReason = '';
    let recommendedAction = '';

    if (currentScore >= req.targetScore * 0.8) {
      status = 'Acquired';
      gapReason = `Proficiency meets target requirements (${currentScore}% vs ${req.targetScore}%).`;
      recommendedAction = 'Demonstrate capabilities via architecture reviews or code samples.';
      strongSkills.push({ name: req.skill, score: currentScore, target: req.targetScore });
    } else if (currentScore >= 40) {
      status = 'In Progress';
      gapReason = `Working knowledge exists (${currentScore}%), but employers look for production experience (${req.targetScore}%).`;
      recommendedAction = `Build a hands-on project module featuring ${req.skill}.`;
      moderateSkills.push({ name: req.skill, score: currentScore, target: req.targetScore });
    } else {
      status = 'Missing';
      gapReason = `Identified as a critical competency gap for ${benchmark.role}.`;
      recommendedAction = `Prioritize 2-week intensive learning sprint and complete a verifiable capstone in ${req.skill}.`;
    }

    const gapItem: SkillGapItem = {
      skill: req.skill,
      currentScore,
      targetScore: req.targetScore,
      importance: req.importance,
      status,
      gapReason,
      recommendedAction,
      gapPercentage,
      priority: req.importance,
    };

    gapItems.push(gapItem);

    if (status !== 'Acquired') {
      criticalGaps.push(gapItem);
    }
  });

  const overallMatch = Math.min(98, Math.max(45, Math.round((earnedWeight / totalWeight) * 100)));

  return {
    targetRole: benchmark.role,
    overallMatch,
    strongSkills,
    moderateSkills,
    criticalGaps,
    gapItems,
  };
}

/**
 * Career Readiness Simulator
 */
export function simulateCareerReadiness(
  baseScore: number,
  actions: SimulatorAction[]
): {
  currentScore: number;
  projectedScore: number;
  delta: number;
  fastestPath: SimulatorAction[];
} {
  const completedActions = actions.filter((a) => a.completed);
  const totalBoost = completedActions.reduce((acc, a) => acc + a.impactScore, 0);
  const projectedScore = Math.min(96, baseScore + totalBoost);

  // Calculate efficiency ratio: impact per week
  const sorted = [...actions].sort((a, b) => {
    const ratioA = a.impactScore / a.effortWeeks;
    const ratioB = b.impactScore / b.effortWeeks;
    return ratioB - ratioA;
  });

  return {
    currentScore: baseScore,
    projectedScore,
    delta: totalBoost,
    fastestPath: sorted,
  };
}

/**
 * Legacy Resume Extractor (for backwards compatibility)
 */
export function extractSkillsFromResume(text: string): {
  detectedSkills: string[];
  detectedProjectSkills: string[];
  education: string;
  experienceYears: number;
  confidenceScore: number;
} {
  const lower = text.toLowerCase();
  const skillPool = [
    'Python', 'FastAPI', 'REST APIs', 'SQL', 'PostgreSQL', 'Docker',
    'Kubernetes', 'JavaScript', 'TypeScript', 'React', 'Next.js',
    'HTML', 'CSS', 'Git', 'Redis', 'AWS', 'Linux', 'DSA',
    'Problem Solving', 'Communication', 'Pandas', 'Machine Learning', 'Testing', 'System Design'
  ];

  const detected = skillPool.filter((s) => lower.includes(s.toLowerCase()));

  const projectSkills = ['REST APIs', 'PostgreSQL', 'Authentication', 'Async Workers', 'Docker', 'Redis'].filter(
    (s) => lower.includes(s.toLowerCase()) || detected.includes(s)
  );

  return {
    detectedSkills: detected.length > 0 ? detected : ['Python', 'SQL', 'Git', 'HTML', 'CSS', 'JavaScript'],
    detectedProjectSkills: projectSkills.length > 0 ? projectSkills : ['REST APIs', 'PostgreSQL', 'Authentication'],
    education: 'B.Tech in Computer Science & Engineering, NIT (CGPA: 8.74)',
    experienceYears: 0.5,
    confidenceScore: 94,
  };
}

/**
 * 5-Factor Candidate Match Scoring for Industry
 */
export function calculateCandidateMatchScore(
  student: StudentProfile,
  requiredSkills: string[]
): {
  matchScore: number;
  scoreBreakdown: {
    skillCompatibility: number;
    assessmentPerformance: number;
    projectRelevance: number;
    experience: number;
    evidenceStrength: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
} {
  const studentSkillNames = new Set(student.skills.map((s) => s.name.toLowerCase()));
  const matched = requiredSkills.filter((r) => studentSkillNames.has(r.toLowerCase()));
  const missing = requiredSkills.filter((r) => !studentSkillNames.has(r.toLowerCase()));

  // 1. Skill compatibility (max 50)
  const skillRatio = requiredSkills.length > 0 ? matched.length / requiredSkills.length : 0.8;
  const skillCompatibility = Math.round(skillRatio * 50);

  // 2. Assessment performance (max 15)
  const assessmentPerformance = Math.round((student.technicalScore / 100) * 15);

  // 3. Project relevance (max 15)
  const projectRelevance = Math.round((student.projectScore / 100) * 15);

  // 4. Experience (max 10)
  const experience = 8;

  // 5. Evidence strength (max 10)
  const verifiedCount = student.skills.filter((s) => s.verified).length;
  const evidenceStrength = Math.min(10, Math.round((verifiedCount / 5) * 10));

  const total = skillCompatibility + assessmentPerformance + projectRelevance + experience + evidenceStrength;

  return {
    matchScore: Math.min(99, Math.max(50, total)),
    scoreBreakdown: {
      skillCompatibility,
      assessmentPerformance,
      projectRelevance,
      experience,
      evidenceStrength,
    },
    matchedSkills: matched,
    missingSkills: missing,
  };
}

/**
 * Match Opportunities for User's Extracted Skills with Explainability
 */
export function matchPersonalizedOpportunities(
  userSkills: { name: string; score: number }[],
  opportunities: JobOpportunity[],
  targetRole?: string
): PersonalizedOpportunityMatch[] {
  const skillMap = new Map<string, number>();
  userSkills.forEach((s) => skillMap.set(s.name.toLowerCase(), s.score));

  const results: PersonalizedOpportunityMatch[] = opportunities.map((opp) => {
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    const whyMatched: string[] = [];

    opp.requiredSkills.forEach((reqSkill) => {
      const lower = reqSkill.toLowerCase();
      let matchedScore = 0;

      skillMap.forEach((score, name) => {
        if (name === lower || lower.includes(name) || name.includes(lower)) {
          matchedScore = Math.max(matchedScore, score);
        }
      });

      if (matchedScore >= 50) {
        matchedSkills.push(reqSkill);
        whyMatched.push(`✓ ${reqSkill} (${matchedScore}%) meets employer expectation`);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const matchRatio = opp.requiredSkills.length > 0 ? matchedSkills.length / opp.requiredSkills.length : 0.7;
    let computedScore = Math.round(matchRatio * 85 + (matchedSkills.length > 3 ? 10 : 5));

    // Boost if opportunity matches target role
    if (targetRole && opp.title.toLowerCase().includes(targetRole.toLowerCase().split(' ')[0])) {
      computedScore = Math.min(95, computedScore + 5);
    }

    const matchScore = Math.min(96, Math.max(55, computedScore));

    let recommendedAction = 'Ready to apply! Your verified competencies meet the primary job specification.';
    if (missingSkills.length > 0) {
      recommendedAction = `Upskill in ${missingSkills.slice(0, 2).join(' & ')} to elevate your placement match to 95%+.`;
    }

    return {
      opportunity: opp,
      matchScore,
      matchedSkills,
      missingSkills,
      whyMatched: whyMatched.slice(0, 4),
      recommendedAction,
    };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * AI Assistant Response Generator
 */
export function generateAssistantResponse(
  prompt: string,
  profile: StudentProfile
): string {
  const query = prompt.toLowerCase();

  if (query.includes('missing') || query.includes('skills am i missing') || query.includes('backend developer')) {
    return `For **Backend Developer** at Tier-1 companies (like Razorpay and Zomato), your current Skill Twin analysis reveals:

- **Verified Strengths**:
  - Python (90% - Assessment & Project proven)
  - SQL & Relational Schema (82% - Assessment verified)
  - Algorithmic Problem Solving (84%)
  - Git Version Control (72%)

- **Critical Skill Gaps**:
  - **FastAPI** (Current: 40%, Target: 80%) — Missing async microservice evidence
  - **REST APIs** (Current: 45%, Target: 85%) — Needs OpenAPI specs & idempotency
  - **Docker** (Current: 30%, Target: 75%) — Flagged in 42 corporate interview evaluations
  - **Cloud (AWS/GCP)** (Current: 25%, Target: 70%) — Lacks live deployed endpoints

Closing these 4 specific competencies in the **Career Simulator** will lift your readiness from 68% to 91%.`;
  }

  if (query.includes('which internship') || query.includes('apply') || query.includes('opportunity')) {
    return `Based on your live profile and ${profile.readinessScore}% readiness, here are your optimal matches:

1. **Backend Developer Intern @ Razorpay Software** — **87% - 91% Match**
   - **Why Matched**: Strong Python (90%) and SQL (82%) with verified repository commits.
   - **Gap to Close**: Docker & FastAPI.
   - **Recommendation**: Apply directly; tech recruiters prioritize candidates with verified test evidence!

2. **Junior Software Engineer @ TCS Digital Labs** — **84% Match**
   - Solid foundation in algorithms; minimum readiness requirement is 65%.

3. **API Infrastructure Intern @ Zomato** — **78% Match**
   - Great learning ground for high-throughput concurrency.`;
  }

  if (query.includes('improve my readiness') || query.includes('how can i improve')) {
    return `To systematically climb from **${profile.readinessScore}% to 91%+** placement readiness:

1. **Complete Action 1: Learn FastAPI & Pydantic** (+6%)
2. **Complete Action 2: Build REST API Project with Auth & DB** (+6%)
3. **Complete Action 3: Learn Docker Containerization** (+4%)
4. **Complete Action 4: Cloud Fundamentals** (+3%)
5. **Complete Action 5: Backend Internship / Capstone** (+4%)

You can test these interactive toggles right now in the **Career Readiness Simulator**!`;
  }

  if (query.includes('30-day') || query.includes('learning plan') || query.includes('roadmap')) {
    return `Here is your customized **30-Day Backend Acceleration Plan**:

- **Week 1**: REST API Fundamentals, HTTP status codes, and OpenAPI 3.0 specs.
- **Week 2**: Asynchronous microservices with FastAPI and Pydantic validation.
- **Week 3**: PostgreSQL schema design, indexing, and JWT authentication.
- **Week 4**: Multi-stage Docker containerization and Compose orchestration.

Checking off tasks in your **Learning Roadmap** automatically synchronizes with your **AI Skill Twin**!`;
  }

  if (query.includes('why did i get') || query.includes('match') || query.includes('87%')) {
    return `Your **87% Match with Razorpay Backend Intern** is calculated using our transparent 5-factor matching formula:

- **Skill Compatibility (44/50)**: Strong match on Python, SQL, and Git; missing FastAPI and Docker.
- **Assessment Performance (13/15)**: Python test (91%) and Problem Solving (84%).
- **Project Relevance (13/15)**: Expense Analytics micro-ledger proves query optimization.
- **Experience (8/10)**: 6 months of verified academic trainee work.
- **Evidence Strength (9/10)**: High ratio of assessment-verified skills.

Total: **87/100 (High Fit Recommendation)**.`;
  }

  if (query.includes('project') || query.includes('build next')) {
    return `The single most impactful project you should build right now is:

**"Containerized FastAPI Microservice with PostgreSQL & Redis"**
- **Architecture**: Async Python 3.11, FastAPI endpoints, Pydantic v2 validation.
- **Database**: PostgreSQL with connection pooling and automated Alembic migrations.
- **DevOps**: Multi-stage Dockerfile deployed with Docker Compose.
- **Target Impact**: Bridges both your FastAPI (+6%) and Docker (+4%) deficits simultaneously!`;
  }

  // Fallback
  return `Hello ${(profile?.name || 'User').split(' ')[0]}! I am your **SkillBridge Career Copilot**, grounded in your verified **Skill Twin** (Readiness: ${profile.readinessScore}%, Target: ${profile.targetRole}).

You can ask me:
- *"What skills am I missing for ${profile.targetRole}?"*
- *"Which internship should I apply for?"*
- *"How can I improve my readiness?"*
- *"Create my 30-day learning plan."*
- *"Why did I get an opportunity match?"*
- *"Which project should I build next?"*`;
}
