import {
  simulateCareerReadiness,
  calculateSkillGap,
  extractSkillsFromResume,
} from '../src/lib/ai-engine';
import {
  PRIMARY_STUDENT,
  SIMULATOR_ACTIONS,
  TARGET_ROLE_BENCHMARKS,
  CANDIDATE_EVALUATIONS,
} from '../src/data/seedData';

console.log('🧪 Starting SkillBridge AI Phase 2 Verification Suite...\n');

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

// 1. Verify Student Profile
console.log('1. Verifying Student Profile (Abdul Aziz)...');
assert(PRIMARY_STUDENT.name === 'Abdul Aziz', 'Student name is Abdul Aziz');
assert(PRIMARY_STUDENT.readinessScore === 68, 'Baseline readiness is exactly 68%');
assert(PRIMARY_STUDENT.targetRole === 'Backend Developer', 'Target role is Backend Developer');

const pythonSkill = PRIMARY_STUDENT.skills.find((s) => s.name === 'Python');
assert(pythonSkill !== undefined && pythonSkill.score === 90, 'Python score is 90%');
assert(pythonSkill !== undefined && pythonSkill.verificationStatus === 'Assessment Verified', 'Python is Assessment Verified');

const sqlSkill = PRIMARY_STUDENT.skills.find((s) => s.name === 'SQL');
assert(sqlSkill !== undefined && sqlSkill.score === 82, 'SQL score is 82%');

const dockerSkill = PRIMARY_STUDENT.skills.find((s) => s.name === 'Docker');
assert(dockerSkill !== undefined && dockerSkill.score === 30, 'Docker score is 30%');
assert(dockerSkill !== undefined && dockerSkill.verificationStatus === 'Pending Verification', 'Docker is Pending Verification');

// 2. Verify Simulator Projections
console.log('\n2. Verifying Career Readiness Simulator Deterministic Projections...');
const sim0 = simulateCareerReadiness(68, []);
assert(sim0.projectedScore === 68, 'No actions: projected score remains 68%');

const makeCompleted = (ids: string[]) =>
  SIMULATOR_ACTIONS.map((a) => ({ ...a, completed: ids.includes(a.id) }));

const sim1 = simulateCareerReadiness(68, makeCompleted(['sim_fastapi']));
assert(sim1.projectedScore === 74, `68% + FastAPI (+6%) = 74% (Calculated: ${sim1.projectedScore}%)`);

const sim2 = simulateCareerReadiness(68, makeCompleted(['sim_fastapi', 'sim_rest_proj']));
assert(sim2.projectedScore === 80, `68% + FastAPI (+6%) + REST Project (+6%) = 80% (Calculated: ${sim2.projectedScore}%)`);

const sim3 = simulateCareerReadiness(68, makeCompleted(['sim_fastapi', 'sim_rest_proj', 'sim_docker']));
assert(sim3.projectedScore === 84, `80% + Docker (+4%) = 84% (Calculated: ${sim3.projectedScore}%)`);

const sim4 = simulateCareerReadiness(68, makeCompleted(['sim_fastapi', 'sim_rest_proj', 'sim_docker', 'sim_cloud']));
assert(sim4.projectedScore === 87, `84% + Cloud (+3%) = 87% (Calculated: ${sim4.projectedScore}%)`);

const sim5 = simulateCareerReadiness(68, makeCompleted(['sim_fastapi', 'sim_rest_proj', 'sim_docker', 'sim_cloud', 'sim_internship']));
assert(sim5.projectedScore === 91, `87% + Internship (+4%) = 91% (Calculated: ${sim5.projectedScore}%)`);

// 3. Verify Candidate Match Score Formula
console.log('\n3. Verifying Candidate Match Formula (5-Factor Model)...');
const abdulEvaluation = CANDIDATE_EVALUATIONS.find((c) => c.candidateId === 'std_demo_abdul');
assert(abdulEvaluation !== undefined && abdulEvaluation.matchScore === 91, 'Abdul Aziz has 91% match score');
if (abdulEvaluation) {
  assert(abdulEvaluation.scoreBreakdown.skillCompatibility === 46, 'Skill compatibility is 46/50');
  assert(abdulEvaluation.scoreBreakdown.assessmentPerformance === 14, 'Assessment score is 14/15');
  assert(abdulEvaluation.scoreBreakdown.projectRelevance === 14, 'Project relevance is 14/15');
  assert(abdulEvaluation.scoreBreakdown.experience === 8, 'Experience is 8/10');
  assert(abdulEvaluation.scoreBreakdown.evidenceStrength === 9, 'Evidence strength is 9/10');
  assert(
    abdulEvaluation.scoreBreakdown.skillCompatibility +
      abdulEvaluation.scoreBreakdown.assessmentPerformance +
      abdulEvaluation.scoreBreakdown.projectRelevance +
      abdulEvaluation.scoreBreakdown.experience +
      abdulEvaluation.scoreBreakdown.evidenceStrength ===
      91,
    '5-factor breakdown sum exactly equals 91'
  );
}

// 4. Verify Resume Extraction
console.log('\n4. Verifying Resume Extraction & Missing Skills...');
const sampleResume = 'Proficient in Python, SQL, Git, and HTML. Developed REST APIs.';
const extracted = extractSkillsFromResume(sampleResume);
assert(extracted.detectedSkills.includes('Python'), 'Detected Python from resume');
assert(extracted.detectedSkills.includes('SQL'), 'Detected SQL from resume');

// 5. Verify Skill Gap Diagnostic
console.log('\n5. Verifying Skill Gap Diagnostic for Backend Developer...');
const gaps = calculateSkillGap(PRIMARY_STUDENT.skills, 'Backend Developer');
assert(gaps.targetRole === 'Backend Developer', 'Target role is Backend Developer');
assert(gaps.gapItems.length > 0, 'Identified gap items');
assert(gaps.primaryGaps.some((g) => g.toLowerCase().includes('docker')), 'Docker is in primary gaps');

console.log(`\n========================================`);
console.log(`Test Results: ${passCount} Passed, ${failCount} Failed.`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All automated unit verifications passed successfully!');
}
