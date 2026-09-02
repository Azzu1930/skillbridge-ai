export type UserRole = 'student' | 'industry' | 'faculty' | 'admin';

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
  | 'Pending Verification';

export interface SkillEvidenceItem {
  type: 'project' | 'assessment' | 'certification' | 'experience';
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
  growth: number; // percentage growth e.g. +42%
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
  matchScore: number; // 0-100 overall weighted
  readinessScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceYears: number;
  projectsCount: number;
  assessmentScore: number;
  scoreBreakdown: {
    skillCompatibility: number; // out of 50
    assessmentPerformance: number; // out of 15
    projectRelevance: number; // out of 15
    experience: number; // out of 10
    evidenceStrength: number; // out of 10
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
  restApiRating: number; // 1-5
  codingRating: number; // 1-5
  communicationRating: number; // 1-5
  problemSolvingRating: number; // 1-5
  dockerRating: number; // 1-5
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
