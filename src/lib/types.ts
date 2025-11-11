
import { AnalyzeCandidateVideoInterviewOutput } from "@/ai/flows/analyze-candidate-video-interview";

export type KPI = {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
};

export type JobStatus = 'Actif' | 'En pause' | 'Fermé';

export type Job = {
  id: string;
  title: string;
  department: string;
  description: string;
  status: JobStatus;
  candidateCount: number;
  hardSkills: string[];
  softSkills: string[];
  keywords: string[];
};

export type CandidateStatus = 'Présélectionné' | 'En attente' | 'Rejeté';

export type Candidate = {
  id: string;
  name: string;
  avatarUrl: string;
  jobTitle: string;
  matchScore: number;
  status: CandidateStatus;
};

export type CandidateDetails = {
  id: string;
  name: string;
  avatarUrl: string;
  jobTitle: string;
  matchScore: number;
  status: CandidateStatus;
  email: string;
  phone: string;
  location: string;
  videoUrl: string;
  cvUrl: string;
  videoThumbnail: string;
  jobDescription: string;
  aiAnalysis: AnalyzeCandidateVideoInterviewOutput | null;
};

export type Interview = {
  id: string;
  jobOfferId: string;
  jobTitle: string;
  avatar: string;
  questions: string[];
  participantCount: number;
  companyId: string;
  recruiterId: string;
};

export type Application = {
    id: string;
    candidateId: string;
    jobOfferId: string;
    status: CandidateStatus;
    cvUrl: string;
    videoInterviewUrl: string;
    iaScore: number;
    createdAt: any;
};

    