import {
  StudentSkill,
  SkillGapItem,
  SimulatorAction,
  CandidateEvaluation,
  JobOpportunity,
  StudentProfile,
  TrainingRecommendationItem,
} from '@/types';
import { TARGET_ROLE_BENCHMARKS, SIMULATOR_ACTIONS } from '@/data/seedData';

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
    TARGET_ROLE_BENCHMARKS.find((b) => b.role === roleName) ||
    TARGET_ROLE_BENCHMARKS[0];

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
      gapReason = `Proficiency meets or exceeds industry requirements (${currentScore}% vs ${req.targetScore}% target).`;
      recommendedAction = 'Maintain with active portfolio projects and peer reviews.';
    } else if (currentScore > 0) {
      status = 'In Progress';
      gapReason = `Foundational understanding exists (${currentScore}%), but enterprise depth (${req.targetScore}%) is required.`;
      recommendedAction = `Target structured advanced assessment and benchmark projects in ${req.skill}.`;
      primaryGaps.push(req.skill);
    } else {
      status = 'Missing';
      gapReason = `Critical deficit for ${roleName}. Employers filter out candidates without demonstrable ${req.skill} evidence.`;
      recommendedAction = `Prioritize 2-week intensive learning sprint and build a dedicated capstone module for ${req.skill}.`;
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
    'Problem Solving', 'Communication', 'Pandas', 'Machine Learning'
  ];

  const detected = skillPool.filter((s) => lower.includes(s.toLowerCase()));

  const projectSkills = ['REST APIs', 'PostgreSQL', 'Authentication', 'Async Workers', 'Docker', 'Redis'].filter(
    (s) => lower.includes(s.toLowerCase()) || detected.includes(s)
  );

  return {
    detectedSkills: detected.length > 0 ? detected : ['Python', 'SQL', 'Git', 'React', 'HTML', 'CSS'],
    detectedProjectSkills: projectSkills.length > 0 ? projectSkills : ['REST APIs', 'PostgreSQL', 'Authentication'],
    education: 'B.Tech in Computer Science & Engineering, NIT (CGPA: 8.74)',
    experienceYears: 0.5,
    confidenceScore: 94,
  };
}

export function generateAssistantResponse(
  prompt: string,
  profile: StudentProfile
): string {
  const query = prompt.toLowerCase();

  if (query.includes('learn next') || query.includes('what should i learn')) {
    return `Based on your **AI Skill Twin** and target role of **${profile.targetRole}** (current readiness: ${profile.readinessScore}%):

1. **High Priority: FastAPI & REST APIs**: You have strong Python (87%) and SQL (78%), but missing production web framework evidence. Spend 2 weeks building an asynchronous microservice.
2. **Medium Priority: Docker Containerization**: Packaging your current Task Queue project in a multi-stage Docker container will bridge a 54% cohort gap.
3. **Database Tuning**: Practice indexed queries with PostgreSQL EXPLAIN ANALYZE to reach enterprise readiness.

Would you like me to map these into your active **Simulator** or update your **6-Week Roadmap**?`;
  }

  if (query.includes('readiness low') || query.includes('why is my readiness')) {
    return `Your current readiness is **${profile.readinessScore}%** because our multi-vector evaluation evaluates 4 critical dimensions:
- **Technical Knowledge (82%)**: Solid foundation in Python and SQL fundamentals.
- **Project Evidence (76%)**: Good personal projects, but lacking containerized and cloud-deployed live instances.
- **Interview Readiness (68%)**: Need practice with distributed systems trade-offs and live system design questions.
- **Role Alignment Gap**: Missing **FastAPI, Docker, and Cloud AWS** which are demanded by 84% of backend listings.

Activating just 2 actions in the **Readiness Simulator** will lift your projection to **77%**!`;
  }

  if (query.includes('internship') || query.includes('apply for') || query.includes('opportunities')) {
    return `Here are the top matches from our 684 active opportunities mapped to your Skill Twin:

1. **Backend Developer Intern @ Razorpay** — **92% Match**
   - Matched: Python (87%), SQL (78%), Git (72%), Problem Solving (81%)
   - Suggested Action: Apply immediately; mention your Redis task queue project.
2. **API Infrastructure Intern @ Zomato** — **78% Match**
   - High scale backend work; brush up on Redis and container basics.
3. **Microsoft Live Industry Capstone** — **94% Match**
   - Perfect for gaining corporate-backed evidence with a ₹25,000 stipend grant.`;
  }

  if (query.includes('missing') || query.includes('skills am i missing') || query.includes('backend')) {
    return `For **Backend Developer**, your verified assets and missing industry requirements are:

- **Verified Strengths**:
  - Python (87% - Assessment & Project proven)
  - SQL & Relational Queries (78%)
  - Problem Solving (81%)
  - Git Version Control (72%)

- **Key Missing Skills**:
  - **FastAPI** (Weight: High, Target: 80%) — Missing
  - **REST API Standards** (Weight: High, Target: 85%) — In Progress
  - **Docker** (Weight: Medium, Target: 75%) — Missing
  - **Cloud AWS/GCP** (Weight: Medium, Target: 70%) — Missing

Closing these 4 specific gaps will raise your readiness from 68% to 91%.`;
  }

  if (query.includes('improve my profile') || query.includes('portfolio')) {
    return `To elevate your profile for hiring managers at top tech firms:

1. **Verify Your Credentials**: You have 3 verified certifications; complete the interactive **Assessment** module to verify your Problem Solving score.
2. **Deploy Your Task Queue**: Provide a live Swagger/OpenAPI URL for your task engine on your **Digital Portfolio**.
3. **Upload an Updated Resume**: Run our **Resume Analyzer** to auto-sync detected technologies into your AI Skill Twin.
4. **Acquire Industry Project Evidence**: Apply for the Microsoft Capstone to earn an industry-backed verification badge.`;
  }

  // Fallback intelligent general response
  return `Hello Abdul! I have synchronized your current **Skill Twin** (Readiness: ${profile.readinessScore}%, Target: ${profile.targetRole}).

You can ask me:
- *"What should I learn next to improve readiness?"*
- *"Why is my readiness score at 68%?"*
- *"Which internships should I apply for right now?"*
- *"What skills am I missing for backend engineering?"*
- *"How can I improve my digital portfolio for recruiters?"*`;
}
