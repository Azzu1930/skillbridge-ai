import {
  hashPassword,
  validateEmail,
  validatePassword,
  getScopedStorageKey,
} from '../src/lib/auth-service';
import {
  createCareerReportFromAnalysis,
  compareCareerReports,
} from '../src/lib/report-storage';
import {
  createDocxDocument,
  generateJsonReport,
} from '../src/lib/document-generator';
import { Packer } from 'docx';
import { ResumeAnalysisResult, UserAccount, CareerReport } from '../src/types';
import { PRIMARY_STUDENT } from '../src/data/seedData';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${msg}`);
    failed++;
  }
}

async function runSuite() {
  console.log('🧪 Starting SkillBridge AI Phase 4 Verification Suite...\n');

  // 1. Password Hashing & Security Verification
  console.log('1. Verifying Salted SHA-256 Password Hashing & Auth Validations...');
  const salt1 = 'salt_abc123';
  const salt2 = 'salt_xyz789';
  const pass = 'SuperSecret123!';

  const hash1 = await hashPassword(pass, salt1);
  const hash2 = await hashPassword(pass, salt2);
  const hash1Repeat = await hashPassword(pass, salt1);

  assert(typeof hash1 === 'string' && hash1.length === 64, 'SHA-256 produces 64-character hex string');
  assert(hash1 === hash1Repeat, 'Identical password + salt generates deterministic hash');
  assert(hash1 !== hash2, 'Different salt produces completely distinct hash');
  assert(validateEmail('test@university.edu'), 'Valid university email accepted');
  assert(!validateEmail('invalid-email'), 'Malformed email rejected');
  assert(validatePassword('Secret1'), 'Valid password >= 6 characters accepted');
  assert(!validatePassword('123'), 'Short password (< 6 chars) rejected');

  // 2. Multi-Tenant Storage Isolation Key Scoping
  console.log('\n2. Verifying Multi-Tenant Data Isolation Scoping...');
  const userA_Key = getScopedStorageKey('usr_101', 'reports');
  const userB_Key = getScopedStorageKey('usr_202', 'reports');

  assert(userA_Key === 'sb_user_usr_101_reports', 'User A scoped storage key generated correctly');
  assert(userB_Key === 'sb_user_usr_202_reports', 'User B scoped storage key generated correctly');
  assert(userA_Key !== userB_Key, 'Data isolation keys are strictly partitioned per user ID');

  // Mock Multi-User Storage Isolation Test
  const mockStorage: Record<string, string> = {};
  const saveMockReport = (userId: string, rep: any) => {
    const key = getScopedStorageKey(userId, 'reports');
    mockStorage[key] = JSON.stringify([rep]);
  };
  const getMockReports = (userId: string) => {
    const key = getScopedStorageKey(userId, 'reports');
    return mockStorage[key] ? JSON.parse(mockStorage[key]) : [];
  };

  saveMockReport('usr_101', { id: 'rep_A1', title: 'User A Report' });
  saveMockReport('usr_202', { id: 'rep_B1', title: 'User B Report' });

  const userA_reports = getMockReports('usr_101');
  const userB_reports = getMockReports('usr_202');

  assert(userA_reports.length === 1 && userA_reports[0].id === 'rep_A1', 'User A accesses only User A reports');
  assert(userB_reports.length === 1 && userB_reports[0].id === 'rep_B1', 'User B accesses only User B reports');
  assert(!userA_reports.some((r: any) => r.id === 'rep_B1'), 'User A cannot access User B data (Strict Isolation)');

  // 3. Automatic Complete CareerReport Compilation (40+ attributes)
  console.log('\n3. Verifying Automatic Career Report Generation...');
  const sampleAnalysis: ResumeAnalysisResult = {
    id: 'analysis_001',
    fileName: 'Abdul_Aziz_Resume.pdf',
    fileSize: '142 KB',
    fileType: 'pdf',
    uploadedAt: new Date().toISOString(),
    rawText: 'Abdul Aziz Resume Text...',
    name: PRIMARY_STUDENT.name,
    email: PRIMARY_STUDENT.email,
    phone: PRIMARY_STUDENT.phone,
    education: `${PRIMARY_STUDENT.degree}, ${PRIMARY_STUDENT.college}`,
    degree: PRIMARY_STUDENT.degree,
    college: PRIMARY_STUDENT.college,
    experienceYears: 1,
    technicalSkills: [
      { name: 'Python', category: 'technical', score: 90, evidenceSnippet: 'Built async services in Python', label: 'Estimated from resume evidence' },
      { name: 'PostgreSQL', category: 'technical', score: 82, evidenceSnippet: 'Designed normalized schema in PostgreSQL', label: 'Estimated from resume evidence' },
      { name: 'Docker', category: 'technical', score: 40, evidenceSnippet: 'Basic container configurations', label: 'Estimated from resume evidence' },
    ],
    softSkills: ['Analytical Thinking', 'Team Leadership'],
    tools: ['Git', 'Docker', 'Linux'],
    projects: [
      { title: 'Distributed Task Queue', description: 'Async background worker service', skills: ['Python', 'Redis'] },
    ],
    certifications: ['Python DSA Specialization'],
    internships: [
      { role: 'Backend Intern', company: 'Apex Software', duration: '3 mos' },
    ],
    achievements: ['Dean Honour List 2024'],
    targetRole: 'Backend Developer',
    readinessScore: 68,
    scoreBreakdown: {
      technicalSkills: 34,
      projects: 12,
      experience: 7,
      certifications: 6,
      assessment: 9,
    },
  };

  const compiledReport = createCareerReportFromAnalysis(sampleAnalysis, 'usr_101', {
    fileName: 'Abdul_Aziz_Resume.pdf',
    fileSize: '142 KB',
    fileType: 'pdf',
    fileDataUrl: 'data:application/pdf;base64,JVBERi0xLjQK...',
  });

  assert(typeof compiledReport.id === 'string' && compiledReport.id.startsWith('rep_'), 'CareerReport generated with valid ID');
  assert(compiledReport.userId === 'usr_101', 'Report assigned to correct user account');
  assert(compiledReport.targetRole === 'Backend Developer', 'Report calibrated for target role');
  assert(compiledReport.readinessScore === 68, 'Readiness score preserved deterministically');
  assert(compiledReport.skills.length === 3, 'Extracted skills preserved in report');
  assert(compiledReport.criticalGaps.length > 0, 'Critical skill gaps identified for target role');
  assert(compiledReport.opportunities.length > 0, 'Personalized opportunities matched and explainable');
  assert(compiledReport.strengths.length > 0, 'Candidate strengths synthesized');
  assert(compiledReport.weaknesses.length > 0, 'Identified candidate weaknesses generated');
  assert(compiledReport.actionPlan.length > 0, 'Prioritized action plan generated');

  // 4. Microsoft Word (.docx) OpenXML Document Generation Verification
  console.log('\n4. Verifying Microsoft Word (.docx) OpenXML Document Generation...');
  const docxDoc = await createDocxDocument(compiledReport);
  assert(docxDoc !== null && typeof docxDoc === 'object', 'Word Document instance initialized successfully');

  const docxBuffer = await Packer.toBuffer(docxDoc);
  assert(docxBuffer instanceof Buffer, 'Packer successfully converted Document into binary Buffer');
  assert(docxBuffer.length > 1000, `Valid .docx archive generated (${docxBuffer.length} bytes)`);

  // Verify OpenXML / ZIP magic number (PK\x03\x04)
  const isZipMagic = docxBuffer[0] === 0x50 && docxBuffer[1] === 0x4b && docxBuffer[2] === 0x03 && docxBuffer[3] === 0x04;
  assert(isZipMagic, 'DOCX binary begins with valid OpenXML ZIP header (PK\x03\x04)');

  // 5. Structured JSON Data Deliverable Verification
  console.log('\n5. Verifying Structured JSON Report Export...');
  const jsonReportStr = generateJsonReport(compiledReport);
  assert(typeof jsonReportStr === 'string' && jsonReportStr.length > 500, 'JSON report string generated');

  const parsedJson = JSON.parse(jsonReportStr);
  assert(
    parsedJson.platform.includes('SkillBridge AI') && parsedJson.hackathonProblem.includes('SIH26044'),
    'JSON report contains platform accreditation header and SIH26044 tag'
  );
  assert(parsedJson.candidate.name === PRIMARY_STUDENT.name, 'JSON report contains candidate information');
  assert(parsedJson.readiness.score === 68, 'JSON report contains readiness score');
  assert(Array.isArray(parsedJson.skills) && parsedJson.skills.length === 3, 'JSON report contains skills array');
  assert(Array.isArray(parsedJson.recommendedOpportunities), 'JSON report contains opportunity matches');
  assert(Array.isArray(parsedJson.auditInsights.actionPlan), 'JSON report contains actionable next steps');

  // 6. Multi-Version Diffing Engine
  console.log('\n6. Verifying Multi-Version Report Comparison...');
  const reportV2: CareerReport = {
    ...compiledReport,
    id: 'rep_v2_102',
    version: 2,
    readinessScore: 82,
    skills: [
      ...compiledReport.skills,
      { name: 'Redis', category: 'technical', score: 85, evidenceSnippet: 'Implemented Redis caching', label: 'Estimated from resume evidence' },
      { name: 'CI/CD', category: 'technical', score: 78, evidenceSnippet: 'Created GitHub Actions pipeline', label: 'Estimated from resume evidence' },
    ],
    criticalGaps: [], // Closed all critical gaps!
  };

  const diff = compareCareerReports(compiledReport, reportV2);
  assert(diff.readinessDelta === 14, `Readiness delta accurately computed: +${diff.readinessDelta}% (+14 expected)`);
  assert(diff.newSkills.includes('Redis'), 'Detected newly acquired skill: Redis');
  assert(diff.newSkills.includes('CI/CD'), 'Detected newly acquired skill: CI/CD');
  assert(diff.resolvedGaps.length > 0, `Resolved gaps recognized: ${diff.resolvedGaps.join(', ')}`);

  // Final Summary
  console.log('\n=========================================');
  console.log(`Phase 4 Test Suite Results: ${passed} Passed, ${failed} Failed`);
  console.log('=========================================\n');

  if (failed === 0) {
    console.log('🎉 ALL PHASE 4 VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  } else {
    console.error(`💥 ${failed} test(s) failed!`);
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
