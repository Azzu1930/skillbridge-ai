import {
  CareerReport,
  ResumeAnalysisResult,
  ResumeRecord,
  ReportComparisonResult,
  SkillGapItem,
  PersonalizedOpportunityMatch,
} from '@/types';
import { getScopedStorageKey } from './auth-service';
import { calculateSkillGapForResume, matchPersonalizedOpportunities } from './ai-engine';
import { INITIAL_OPPORTUNITIES, ROADMAP_MILESTONES } from '@/data/seedData';

/**
 * Automatically compile a complete 40-attribute CareerReport from a ResumeAnalysisResult
 */
export function createCareerReportFromAnalysis(
  analysis: ResumeAnalysisResult,
  userId: string,
  originalFile?: {
    fileName: string;
    fileSize: string;
    fileType: 'pdf' | 'docx' | 'txt';
    fileDataUrl?: string;
  }
): CareerReport {
  const existingReports = getUserReports(userId);
  const version = existingReports.length + 1;

  // 1. Calculate Skill Gaps for the target role
  const targetRole = analysis.targetRole || 'Backend Developer';
  const gapResult = calculateSkillGapForResume(analysis.technicalSkills, targetRole);

  // 2. Calculate Personalized Opportunities
  const opportunityMatches = matchPersonalizedOpportunities(
    analysis.technicalSkills,
    INITIAL_OPPORTUNITIES,
    targetRole
  );

  // 3. Synthesize strengths, weaknesses, and concrete action plan
  const strengths: string[] = [];
  if (gapResult.strongSkills.length > 0) {
    strengths.push(
      `Strong mastery demonstrated in core technologies: ${gapResult.strongSkills.slice(0, 3).map((s) => s.name).join(', ')}.`
    );
  }
  if (analysis.projects.length >= 2) {
    strengths.push(`Proven practical application through ${analysis.projects.length} documented development projects.`);
  }
  if (analysis.certifications.length > 0) {
    strengths.push(`Verified commitment to ongoing professional development (${analysis.certifications.length} certifications).`);
  }
  if (strengths.length === 0) {
    strengths.push('Solid baseline engineering education and fundamental programming acumen.');
  }

  const weaknesses: string[] = [];
  if (gapResult.criticalGaps.length > 0) {
    weaknesses.push(
      `Critical industry competency gaps detected in: ${gapResult.criticalGaps.slice(0, 3).map((g) => g.skill).join(', ')}.`
    );
  }
  if (analysis.experienceYears === 0) {
    weaknesses.push('Limited commercial production experience or verified industry internship tenure.');
  }
  if (analysis.scoreBreakdown.assessment < 12) {
    weaknesses.push('Independent coding challenge assessments pending formal proctored verification.');
  }

  const actionPlan: string[] = [
    `Complete targeted technical modules in ${gapResult.criticalGaps[0]?.skill || 'Docker and Microservices'} to eliminate critical recruiter drop-off.`,
    'Deploy at least one full-stack production project featuring end-to-end CI/CD and container orchestration.',
    `Target high-probability internship opportunities (e.g. ${opportunityMatches[0]?.opportunity.company || 'TechCorp'} at ${opportunityMatches[0]?.matchScore || 90}% match).`,
    'Schedule proctored skill assessments on the SkillBridge platform to convert estimated ratings into verified badges.',
  ];

  const reportId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const resumeId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Save the original resume record if provided
  if (originalFile && typeof window !== 'undefined') {
    const resumeRecord: ResumeRecord = {
      id: resumeId,
      userId,
      fileName: originalFile.fileName,
      fileSize: originalFile.fileSize,
      fileType: originalFile.fileType,
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rawText: analysis.rawText || '',
      fileDataUrl: originalFile.fileDataUrl,
    };
    saveUserResumeRecord(userId, resumeRecord);
  }

  const report: CareerReport = {
    id: reportId,
    userId,
    resumeId,
    analysisId: analysis.id,
    version,
    generatedAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    targetRole,
    readinessScore: analysis.readinessScore,
    scoreBreakdown: analysis.scoreBreakdown,
    candidateInfo: {
      name: analysis.name || 'Candidate',
      email: analysis.email,
      phone: analysis.phone,
      education: analysis.education,
      degree: analysis.degree,
      college: analysis.college,
      experienceYears: analysis.experienceYears,
    },
    resumeMeta: {
      fileName: originalFile?.fileName || analysis.fileName,
      fileSize: originalFile?.fileSize || analysis.fileSize,
      fileType: originalFile?.fileType || analysis.fileType,
      uploadedAt: analysis.uploadedAt,
    },
    skills: analysis.technicalSkills,
    softSkills: analysis.softSkills,
    tools: analysis.tools,
    projects: analysis.projects,
    certifications: analysis.certifications,
    internships: analysis.internships,
    achievements: analysis.achievements,
    skillGaps: gapResult.gapItems,
    criticalGaps: gapResult.criticalGaps,
    moderateGaps: gapResult.moderateSkills.map((m) => ({
      skill: m.name,
      currentScore: m.score,
      targetScore: m.target,
      status: 'In Progress',
      importance: 'Medium',
      gapReason: `Working knowledge exists (${m.score}%), but production experience expected (${m.target}%).`,
      recommendedAction: `Complete practical project featuring ${m.name}.`,
    })),
    strongSkills: gapResult.strongSkills,
    roadmap: ROADMAP_MILESTONES,
    opportunities: opportunityMatches,
    strengths,
    weaknesses,
    recommendations: [
      `Prioritize ${gapResult.criticalGaps[0]?.skill || 'Containerization'} in your learning sprints to unlock 3+ additional job matches.`,
      'Submit GitHub repository link for automated static code analysis to upgrade verification score.',
      'Refine resume bullet points with quantified metrics (e.g., latency reduction, throughput).',
    ],
    actionPlan,
    status: 'completed',
  };

  return report;
}

/**
 * Save a report to the user's private isolated storage
 */
export function saveUserReport(userId: string, report: CareerReport): void {
  if (typeof window === 'undefined') return;
  try {
    const key = getScopedStorageKey(userId, 'reports');
    const existing = getUserReports(userId);
    // Replace if id matches, otherwise prepend
    const index = existing.findIndex((r) => r.id === report.id);
    if (index >= 0) {
      existing[index] = report;
    } else {
      existing.unshift(report);
    }
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save user report', err);
  }
}

/**
 * Fetch all reports belonging strictly to userId
 */
export function getUserReports(userId: string): CareerReport[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const key = getScopedStorageKey(userId, 'reports');
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const reports: CareerReport[] = JSON.parse(raw);
    return reports.filter((r) => r.userId === userId);
  } catch {
    return [];
  }
}

/**
 * Fetch a single report by ID ensuring user isolation
 */
export function getUserReportById(userId: string, reportId: string): CareerReport | null {
  const reports = getUserReports(userId);
  const found = reports.find((r) => r.id === reportId);
  return found || null;
}

/**
 * Delete a specific report
 */
export function deleteUserReport(userId: string, reportId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const key = getScopedStorageKey(userId, 'reports');
    const reports = getUserReports(userId);
    const filtered = reports.filter((r) => r.id !== reportId);
    localStorage.setItem(key, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

/**
 * Save Original Resume Record (with Data URL for re-download)
 */
export function saveUserResumeRecord(userId: string, record: ResumeRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const key = getScopedStorageKey(userId, 'resumes');
    const raw = localStorage.getItem(key);
    const resumes: ResumeRecord[] = raw ? JSON.parse(raw) : [];
    resumes.unshift(record);
    localStorage.setItem(key, JSON.stringify(resumes.slice(0, 10)));
  } catch (err) {
    console.error('Failed to save resume record', err);
  }
}

/**
 * Retrieve user's resume record for original download
 */
export function getUserResumeRecord(userId: string, resumeId: string): ResumeRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = getScopedStorageKey(userId, 'resumes');
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const resumes: ResumeRecord[] = JSON.parse(raw);
    return resumes.find((r) => r.id === resumeId || r.userId === userId) || null;
  } catch {
    return null;
  }
}

/**
 * Compare two reports for progress tracking & version diffing
 */
export function compareCareerReports(
  reportOld: CareerReport,
  reportNew: CareerReport
): ReportComparisonResult {
  const oldSkillMap = new Map<string, number>();
  reportOld.skills.forEach((s) => oldSkillMap.set(s.name.toLowerCase(), s.score));

  const newSkillMap = new Map<string, number>();
  reportNew.skills.forEach((s) => newSkillMap.set(s.name.toLowerCase(), s.score));

  const newSkills: string[] = [];
  const improvedSkills: { name: string; oldScore: number; newScore: number }[] = [];
  const removedSkills: string[] = [];

  reportNew.skills.forEach((ns) => {
    const oldScore = oldSkillMap.get(ns.name.toLowerCase());
    if (oldScore === undefined) {
      newSkills.push(ns.name);
    } else if (ns.score > oldScore) {
      improvedSkills.push({
        name: ns.name,
        oldScore,
        newScore: ns.score,
      });
    }
  });

  reportOld.skills.forEach((os) => {
    if (!newSkillMap.has(os.name.toLowerCase())) {
      removedSkills.push(os.name);
    }
  });

  const oldGaps = new Set(reportOld.criticalGaps.map((g) => g.skill.toLowerCase()));
  const newGaps = new Set(reportNew.criticalGaps.map((g) => g.skill.toLowerCase()));

  const resolvedGaps: string[] = [];
  oldGaps.forEach((og) => {
    if (!newGaps.has(og)) {
      resolvedGaps.push(og);
    }
  });

  const addedCriticalGaps: string[] = [];
  newGaps.forEach((ng) => {
    if (!oldGaps.has(ng)) {
      addedCriticalGaps.push(ng);
    }
  });

  const avgOldMatch =
    reportOld.opportunities.reduce((acc, o) => acc + o.matchScore, 0) /
    (reportOld.opportunities.length || 1);
  const avgNewMatch =
    reportNew.opportunities.reduce((acc, o) => acc + o.matchScore, 0) /
    (reportNew.opportunities.length || 1);

  return {
    reportA: reportOld,
    reportB: reportNew,
    readinessDelta: reportNew.readinessScore - reportOld.readinessScore,
    newSkills,
    removedSkills,
    improvedSkills,
    resolvedGaps,
    newGaps: addedCriticalGaps,
    opportunityMatchChange: Math.round(avgNewMatch - avgOldMatch),
  };
}
