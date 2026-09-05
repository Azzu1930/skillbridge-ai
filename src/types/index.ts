export type UserRole = 'student' | 'industry' | 'faculty' | 'institution' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institution?: string;
  company?: string;
  department?: string;
  title?: string;
}

export type VerificationLabel =
  | 'Assessment Verified'
  | 'Evidence Submitted'
  | 'Certificate Added'
  | 'Pending Verification'
  | 'Estimated from resume evidence';

export interface SkillEvidenceItem {
  type: 'project' | 'assessment' | 'certification' | 'experience' | 'resume';
  title: string;
  score?: number;
  date: string;
  issuerOrRepo?: string;
  verified: boolean;
  statusText?: VerificationLabel;
}

export interface StudentSkill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'domain';
  score: number; // 0 - 100
  verified: boolean;
  verificationStatus: VerificationLabel;
  lastUpdated: string;
  evidenceCount: number;
  evidence: SkillEvidenceItem[];
  targetScore?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  tagline: string;
  email: string;
  phone: string;
  rollNumber: string;
  college: string;
  degree: string;
  department: string;
  year: number;
  cgpa: number;
  targetRole: string;
  readinessScore: number;
  technicalScore: number;
  softSkillScore: number;
  projectScore: number;
  interviewScore: number;
  skills: StudentSkill[];
  bio: string;
  github: string;
  linkedin: string;
  avatar: string;
  readinessTrend: { month: string; score: number }[];
  projects: {
    title: string;
    description: string;
    skills: string[];
    githubUrl?: string;
    liveUrl?: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
    verified: boolean;
    verificationStatus?: VerificationLabel;
  }[];
  internships: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  achievements: string[];
}

export interface TargetRoleBenchmark {
  role: string;
  description: string;
  averageStartingSalary: string;
  requiredSkills: {
    skill: string;
    importance: 'High' | 'Medium' | 'Low';
    targetScore: number;
    category?: 'Core' | 'Framework' | 'Infrastructure' | 'Architecture' | 'Tools';
  }[];
}

export interface SkillGapItem {
  skill: string;
  currentScore: number;
  targetScore: number;
  importance: 'High' | 'Medium' | 'Low';
  status: 'Acquired' | 'In Progress' | 'Missing';
  gapReason: string;
  recommendedAction: string;
  priority?: 'High' | 'Medium' | 'Low';
  gapPercentage?: number;
}

export interface SimulatorAction {
  id: string;
  title: string;
  description: string;
  skill: string;
  impactScore: number; // readiness boost
  effortWeeks: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  learningResource?: string;
}

export interface RoadmapMilestone {
  week: number;
  title: string;
  category: 'Fundamentals' | 'Framework' | 'Database' | 'Project' | 'DevOps' | 'Industry Project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  effortHours: number;
  reason: string;
  skillsImpacted: string[];
  completed: boolean;
  deliverable: string;
  suggestedProject?: string;
  expectedGain?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: 'Internship' | 'Full-time' | 'Live Project' | 'Training' | 'Mentorship';
  location: string;
  isRemote: boolean;
  stipend: string;
  duration: string;
  postedDate: string;
  deadline: string;
  description: string;
  requiredSkills: string[];
  openings: number;
  department: string[];
  minReadiness: number;
}

export interface ApplicationItem {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  matchScore: number;
  notes: string;
  interviewDate?: string;
}

export interface IndustrySkillDemandItem {
  skill: string;
  growth: number;
  demandCount: number;
  trend: 'up' | 'stable' | 'down';
  category: string;
  topRoles: string[];
  shortageSeverity: 'Critical' | 'Moderate' | 'Balanced';
}

export interface CandidateEvaluation {
  candidateId: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  matchScore: number;
  readinessScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceYears: number;
  projectsCount: number;
  assessmentScore: number;
  scoreBreakdown: {
    skillCompatibility: number;
    assessmentPerformance: number;
    projectRelevance: number;
    experience: number;
    evidenceStrength: number;
  };
  explanation: {
    skillMatchRatio: string;
    projectEvidence: string;
    assessmentProof: string;
    fitRecommendation: string;
  };
}

export interface CompanyFeedbackRecord {
  id: string;
  company: string;
  studentName: string;
  studentId?: string;
  role: string;
  restApiRating: number;
  codingRating: number;
  communicationRating: number;
  problemSolvingRating: number;
  dockerRating: number;
  qualitativeComments: string;
  detectedGaps: string[];
  date: string;
}

export interface TrainingRecommendationItem {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  skill: string;
  reason: string;
  recommendedAction: string;
  targetCohorts: string[];
  enrolledCount: number;
  durationWeeks: number;
  projectedReadinessBoost: number;
  suggestedFormat: string;
  industryMentor: string;
  status: 'Proposed' | 'Approved' | 'In Progress' | 'Completed';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  link?: string;
}

/* =========================================================================
   Phase 3: Real Resume Analysis, Personalization & Monitoring Types
========================================================================= */

export interface ExtractedSkillItem {
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'framework';
  score: number; // 0-100 estimated proficiency
  evidenceSnippet?: string;
  label: 'Estimated from resume evidence';
}

export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'txt';
  uploadedAt: string;
  rawText: string;
  name: string;
  email?: string;
  phone?: string;
  education: string;
  degree?: string;
  college?: string;
  experienceYears: number;
  technicalSkills: ExtractedSkillItem[];
  softSkills: string[];
  tools: string[];
  projects: {
    title: string;
    description: string;
    skills: string[];
  }[];
  certifications: string[];
  internships: {
    role: string;
    company: string;
    duration?: string;
  }[];
  achievements: string[];
  targetRole: string;
  readinessScore: number;
  scoreBreakdown: {
    technicalSkills: number; // out of 50
    projects: number; // out of 15
    experience: number; // out of 10
    certifications: number; // out of 10
    assessment: number; // out of 15
  };
}

export interface ResumeVersion {
  version: number;
  analyzedDate: string;
  fileName: string;
  targetRole: string;
  readinessScore: number;
  skillsCount: number;
  gapsCount: number;
  analysis: ResumeAnalysisResult;
}

export interface PersonalizedOpportunityMatch {
  opportunity: JobOpportunity;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  whyMatched: string[];
  recommendedAction: string;
}

/* =========================================================================
   Phase 4: User Accounts, Persistent Reports & Document Generation Types
========================================================================= */

export interface UserAccount {
  id: string; // e.g. usr_1725512345678
  fullName: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  avatar?: string;

  // Student fields
  phone?: string;
  institution?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  targetRole?: string;
  location?: string;

  // Faculty fields
  department?: string;
  designation?: string;
  yearsOfExperience?: number;
  areasOfExpertise?: string[];

  // Industry fields
  companyName?: string;
  industrySector?: string;
  companySize?: string;
  website?: string;
  contactPerson?: string;

  // Institution fields
  institutionName?: string;
  institutionType?: string;
  universityAffiliation?: string;
  administratorName?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  expiresAt: number;
}

export interface ApplicationSubmission {
  id: string;
  opportunityId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  role: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected' | 'Withdrawn' | 'Completed';
  matchScore: number;
  coverLetter?: string;
  availability?: string;
  expectedStartDate?: string;
  resumeFileName?: string;
}

export interface FacultyOpportunity {
  id: string;
  title: string;
  type: 'Faculty Internship' | 'Industrial Training' | 'FDP' | 'Industry Workshop' | 'Consultancy' | 'Research Collaboration';
  organization: string;
  location: string;
  duration: string;
  stipendOrFunding?: string;
  deadline: string;
  description: string;
  requiredExpertise: string[];
  applied?: boolean;
}

export interface ResumeRecord {
  id: string;
  userId: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'txt';
  uploadedAt: string;
  rawText: string;
  fileDataUrl?: string; // Stored Data URL to allow redownloading the original resume file
}

export interface CareerReport {
  id: string; // e.g. rep_1725512345678
  userId: string;
  resumeId: string;
  resumeRecordId?: string;
  analysisId: string;
  version: number;
  generatedAt: string;
  targetRole: string;
  readinessScore: number;
  scoreBreakdown: {
    technicalSkills: number; // out of 50
    projects: number; // out of 15
    experience: number; // out of 10
    certifications: number; // out of 10
    assessment: number; // out of 15
  };
  candidateInfo: {
    name: string;
    email?: string;
    phone?: string;
    education: string;
    degree?: string;
    college?: string;
    experienceYears: number;
  };
  resumeMeta: {
    fileName: string;
    fileSize: string;
    fileType: 'pdf' | 'docx' | 'txt';
    uploadedAt: string;
  };
  skills: ExtractedSkillItem[];
  softSkills: string[];
  tools: string[];
  projects: {
    title: string;
    description: string;
    skills: string[];
  }[];
  certifications: string[];
  internships: {
    role: string;
    company: string;
    duration?: string;
  }[];
  achievements: string[];
  skillGaps: SkillGapItem[];
  criticalGaps: SkillGapItem[];
  moderateGaps: SkillGapItem[];
  strongSkills: { name: string; score: number; target: number }[];
  roadmap: RoadmapMilestone[];
  opportunities: PersonalizedOpportunityMatch[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  actionPlan: string[];
  status: 'completed' | 'generating';
}

export interface ReportComparisonResult {
  reportA: CareerReport;
  reportB: CareerReport;
  readinessDelta: number;
  newSkills: string[];
  removedSkills: string[];
  improvedSkills: { name: string; oldScore: number; newScore: number }[];
  resolvedGaps: string[];
  newGaps: string[];
  opportunityMatchChange: number;
}
