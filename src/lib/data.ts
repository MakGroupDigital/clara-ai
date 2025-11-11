import type { Job, Candidate, KPI, CandidateDetails } from './types';

export const kpis: KPI[] = [
  { title: 'Offres actives', value: '12', change: '+2', changeType: 'positive' },
  { title: 'Taux de complétion vidéo', value: '85%', change: '-5%', changeType: 'negative' },
  { title: 'Temps moyen de recrutement', value: '24 jours', change: '-3j', changeType: 'positive' },
  { title: 'Nouveaux candidats', value: '45', change: '+10', changeType: 'positive' },
];

export const completionData = [
  { name: 'Terminé', value: 85, fill: 'var(--color-completed)' },
  { name: 'En attente', value: 15, fill: 'var(--color-pending)' },
];
export const completionConfig = {
  completed: { label: "Terminé", color: "hsl(var(--primary))" },
  pending: { label: "En attente", color: "hsl(var(--secondary))" },
};

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Frontend Senior',
    department: 'Ingénierie',
    status: 'Actif',
    candidateCount: 18,
  },
  {
    id: '2',
    title: 'Chef de Produit',
    department: 'Produit',
    status: 'Actif',
    candidateCount: 25,
  },
  {
    id: '3',
    title: 'Designer UI/UX',
    department: 'Design',
    status: 'En pause',
    candidateCount: 12,
  },
  {
    id: '4',
    title: 'Développeur Backend (Node.js)',
    department: 'Ingénierie',
    status: 'Fermé',
    candidateCount: 32,
  },
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Amina Diallo',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    jobTitle: 'Développeur Frontend Senior',
    matchScore: 92,
    status: 'Présélectionné',
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    jobTitle: 'Chef de Produit',
    matchScore: 88,
    status: 'En attente',
  },
  {
    id: '3',
    name: 'Fatima Zahra',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    jobTitle: 'Développeur Frontend Senior',
    matchScore: 85,
    status: 'Rejeté',
  },
  {
    id: '4',
    name: 'John Doe',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    jobTitle: 'Designer UI/UX',
    matchScore: 76,
    status: 'En attente',
  },
   {
    id: '5',
    name: 'Li Wei',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    jobTitle: 'Chef de Produit',
    matchScore: 95,
    status: 'Présélectionné',
  },
];

export const candidateDetails: CandidateDetails = {
  id: '1',
  name: 'Amina Diallo',
  avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
  jobTitle: 'Développeur Frontend Senior',
  matchScore: 92,
  status: 'Présélectionné',
  email: 'amina.diallo@example.com',
  phone: '+221 77 123 45 67',
  location: 'Dakar, Senegal',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  videoThumbnail: 'https://picsum.photos/seed/video-thumb/800/450',
  jobDescription: 'Nous recherchons un développeur frontend senior pour rejoindre notre équipe. Le candidat idéal aura plus de 5 ans d\'expérience avec React, TypeScript et Node.js. De solides compétences en communication et en leadership sont indispensables.',
  aiAnalysis: null,
};
