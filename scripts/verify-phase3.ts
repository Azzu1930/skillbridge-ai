import {
  parseResumeContent,
  compareResumeVersions,
} from '../src/lib/resume-parser';
import {
  calculateSkillGapForResume,
  matchPersonalizedOpportunities,
  simulateCareerReadiness,
} from '../src/lib/ai-engine';
import {
  TARGET_ROLE_BENCHMARKS,
  INITIAL_OPPORTUNITIES,
  SIMULATOR_ACTIONS,
} from '../src/data/seedData';

console.log('🧪 Starting SkillBridge AI Phase 3 Verification Suite...\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// Test 1: Real-World Resume Parsing from Text
// -------------------------------------------------------------
console.log('1. Verifying Resume Text Parsing & Taxonomy Extraction...');

const SAMPLE_RESUME_TEXT = `
Rahul Sharma
Email: rahul.sharma@example.com | Phone: +91 9876543210 | Location: Bengaluru, India
GitHub: github.com/rahulsharma | LinkedIn: linkedin.com/in/rahulsharma

EDUCATION
Bachelor of Technology in Computer Science & Engineering (2021 - 2025)
National Institute of Technology Karnataka, Surathkal | CGPA: 8.7/10

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, C++, Java
Backend & Web: Node.js, Express, FastAPI, Django, REST APIs, GraphQL, React, Next.js, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS (EC2, S3), Git, CI/CD
Concepts: Data Structures, Algorithms, Microservices, System Design, Object-Oriented Programming

PROJECTS
• Distributed Task Queue Service | Python, Redis, FastAPI, Docker
  - Engineered an asynchronous distributed job execution system processing 5,000+ jobs/min with Redis broker.
  - Implemented exponential backoff retries and dead-letter queues, improving reliability by 35%.
• E-Commerce Microservices Platform | Node.js, TypeScript, PostgreSQL, Docker
  - Built scalable REST and GraphQL APIs with JWT authentication and Stripe webhook integration.
  - Designed relational schema in PostgreSQL and containerized services using Docker Compose.

EXPERIENCE
Software Engineering Intern | TechCorp Solutions (Jan 2024 - Jun 2024)
- Developed backend microservices using Python and FastAPI, reducing API latency by 28%.
- Wrote unit and integration tests with pytest, raising test coverage from 62% to 88%.

CERTIFICATIONS
- AWS Certified Cloud Practitioner
- Meta Backend Developer Professional Certificate
`;

const parsed = parseResumeContent(SAMPLE_RESUME_TEXT, {
  fileName: 'Rahul_Sharma_Resume.pdf',
  fileSize: '150 KB',
  fileType: 'pdf',
});

assert(parsed.name === 'Rahul Sharma', `Candidate name parsed: "${parsed.name}"`);
assert(parsed.email === 'rahul.sharma@example.com', `Email parsed: "${parsed.email}"`);
assert(parsed.phone === '+91 9876543210', `Phone parsed: "${parsed.phone}"`);
assert(parsed.technicalSkills.length >= 8, `Extracted ${parsed.technicalSkills.length} technical skills (>= 8 expected)`);

const skillNames = parsed.technicalSkills.map(s => s.name);
assert(skillNames.includes('Python'), 'Extracted skill: Python');
assert(skillNames.includes('TypeScript'), 'Extracted skill: TypeScript');
assert(skillNames.includes('FastAPI'), 'Extracted skill: FastAPI');
assert(skillNames.includes('Docker'), 'Extracted skill: Docker');
assert(skillNames.includes('PostgreSQL'), 'Extracted skill: PostgreSQL');
assert(skillNames.includes('AWS'), 'Extracted skill: AWS');
assert(skillNames.includes('Redis'), 'Extracted skill: Redis');
assert(skillNames.includes('React'), 'Extracted skill: React');

assert(parsed.projects.length >= 2, `Parsed ${parsed.projects.length} projects (>= 2 expected)`);
assert(parsed.certifications.length >= 1, `Parsed ${parsed.certifications.length} certifications (>= 1 expected)`);

// -------------------------------------------------------------
// Test 2: Deterministic 5-Factor Career Readiness Breakdown
// -------------------------------------------------------------
console.log('\n2. Verifying Deterministic 5-Factor Career Readiness Breakdown...');

const { readinessScore, scoreBreakdown } = parsed;

console.log(`  Readiness Score: ${readinessScore}%`);
console.log(`  Breakdown: Skill=${scoreBreakdown.technicalSkills}/50, Assessment=${scoreBreakdown.assessment}/15, Projects=${scoreBreakdown.projects}/15, Experience=${scoreBreakdown.experience}/10, Certifications=${scoreBreakdown.certifications}/10`);

const breakdownSum =
  scoreBreakdown.technicalSkills +
  scoreBreakdown.assessment +
  scoreBreakdown.projects +
  scoreBreakdown.experience +
  scoreBreakdown.certifications;

assert(readinessScore === breakdownSum, `readinessScore (${readinessScore}%) equals sum of 5 factors (${breakdownSum})`);
assert(readinessScore >= 50 && readinessScore <= 100, `Readiness score is in valid range (50-100%): ${readinessScore}%`);
assert(scoreBreakdown.technicalSkills <= 50, 'Technical Skills factor <= 50');
assert(scoreBreakdown.assessment <= 15, 'Assessment factor <= 15');
assert(scoreBreakdown.projects <= 15, 'Project factor <= 15');
assert(scoreBreakdown.experience <= 10, 'Experience factor <= 10');
assert(scoreBreakdown.certifications <= 10, 'Certifications factor <= 10');

// -------------------------------------------------------------
// Test 3: Skill Gap Analysis Across Target Roles
// -------------------------------------------------------------
console.log('\n3. Verifying Skill Gap Analysis across Target Roles...');

const allRoles = Object.values(TARGET_ROLE_BENCHMARKS).map(b => b.role);
assert(allRoles.length >= 10, `Found ${allRoles.length} target roles in benchmarks (>= 10 expected)`);

for (const role of allRoles) {
  const gapResult = calculateSkillGapForResume(parsed.technicalSkills, role);
  assert(
    gapResult.targetRole === role,
    `Gap analysis computed for role: "${role}" (Gap items: ${gapResult.gapItems.length})`
  );
  assert(
    typeof gapResult.overallMatch === 'number' && gapResult.overallMatch >= 0,
    `Role "${role}" overall match: ${gapResult.overallMatch}%`
  );
}

// Deep check for Backend Developer role
const backendGaps = calculateSkillGapForResume(parsed.technicalSkills, 'Backend Developer');
assert(backendGaps.strongSkills.length > 0, `Identified ${backendGaps.strongSkills.length} strong skills for Backend Developer (e.g., ${backendGaps.strongSkills[0]?.name})`);
assert(backendGaps.criticalGaps.length >= 0, `Identified ${backendGaps.criticalGaps.length} critical gaps for Backend Developer`);

// -------------------------------------------------------------
// Test 4: Personalized Opportunity Matching & Explainability
// -------------------------------------------------------------
console.log('\n4. Verifying Personalized Opportunity Matching & Explainability...');

const matches = matchPersonalizedOpportunities(
  parsed.technicalSkills,
  INITIAL_OPPORTUNITIES,
  parsed.targetRole
);

assert(matches.length > 0, `Matched ${matches.length} personalized opportunities`);
// Verify sorting by matchScore descending
let isSorted = true;
for (let i = 0; i < matches.length - 1; i++) {
  if (matches[i].matchScore < matches[i + 1].matchScore) {
    isSorted = false;
    break;
  }
}
assert(isSorted, 'Matches are correctly sorted in descending order of matchScore');

// Verify explainability fields
const topMatch = matches[0];
assert(typeof topMatch.opportunity.title === 'string', `Top match title: "${topMatch.opportunity.title}" at ${topMatch.opportunity.company}`);
assert(topMatch.matchScore >= 50, `Top match score is strong: ${topMatch.matchScore}%`);
assert(topMatch.whyMatched.length > 0, `Top match has explainability reasons: "${topMatch.whyMatched[0]}"`);
assert(topMatch.recommendedAction.length > 0, `Top match has recommended action: "${topMatch.recommendedAction}"`);
assert(topMatch.matchedSkills.length > 0, `Top match has matched skills: ${topMatch.matchedSkills.join(', ')}`);

// -------------------------------------------------------------
// Test 5: Multi-Version Comparison & Resume Diffing
// -------------------------------------------------------------
console.log('\n5. Verifying Multi-Version Comparison & Progress Tracking...');

const v2Text = SAMPLE_RESUME_TEXT + `
• Added Kubernetes cluster deployment with Helm charts.
• Completed Advanced Cloud Architecture certification with Terraform and Kubernetes.
`;

const parsedV2 = parseResumeContent(v2Text, {
  fileName: 'Rahul_Sharma_Resume_v2.pdf',
  fileSize: '160 KB',
  fileType: 'pdf',
});
const diff = compareResumeVersions(parsed, parsedV2);

assert(typeof diff.readinessDelta === 'number', `Readiness delta computed: ${diff.readinessDelta >= 0 ? '+' : ''}${diff.readinessDelta}%`);
assert(Array.isArray(diff.addedSkills), 'Computed list of newly acquired skills (addedSkills)');
assert(Array.isArray(diff.improvedSkills), 'Computed list of improved competencies (improvedSkills)');

// -------------------------------------------------------------
// Test 6: Simulator Projections from Parsed Readiness
// -------------------------------------------------------------
console.log('\n6. Verifying Simulator Integration with Parsed Resume Score...');

const simInitial = simulateCareerReadiness(parsed.readinessScore, []);
assert(simInitial.projectedScore === parsed.readinessScore, `Initial simulator score equals parsed readiness (${parsed.readinessScore}%)`);

const completedAction = [{ ...SIMULATOR_ACTIONS[0], completed: true }];
const simUpgraded = simulateCareerReadiness(parsed.readinessScore, completedAction);
assert(
  simUpgraded.projectedScore === parsed.readinessScore + SIMULATOR_ACTIONS[0].impactScore,
  `Simulated upskilling: ${parsed.readinessScore}% + ${SIMULATOR_ACTIONS[0].impactScore}% = ${simUpgraded.projectedScore}%`
);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n=========================================');
console.log(`Phase 3 Test Suite Results: ${passCount} Passed, ${failCount} Failed`);
console.log('=========================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 3 VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
