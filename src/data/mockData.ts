
import { User, Consent, Template, Signature, Clause } from '@/types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "artist",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    rating: 4.8,
    industry: "Music",
    bio: "Professional singer-songwriter with 10+ years of experience in pop and indie music. Passionate about creating meaningful collaborations.",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus.chen@email.com",
    role: "artist",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.6,
    industry: "Visual Arts",
    bio: "Digital artist specializing in concept art for games and films. Love bringing imaginative worlds to life through visual storytelling.",
    createdAt: "2023-02-20T14:15:00Z"
  },
  {
    id: "3",
    name: "Creative Studios Inc",
    email: "contact@creativestudios.com",
    role: "company",
    profilePicture: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
    rating: 4.9,
    industry: "Entertainment",
    bio: "Leading entertainment company producing innovative content across multiple platforms. Always looking for talented artists to collaborate with.",
    createdAt: "2022-11-10T09:00:00Z"
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "elena.rodriguez@email.com",
    role: "artist",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    rating: 4.7,
    industry: "Fashion",
    bio: "Fashion designer and illustrator with a focus on sustainable and ethical fashion. Creating art that makes a difference.",
    createdAt: "2023-03-05T16:45:00Z"
  },
  {
    id: "5",
    name: "TechFlow Solutions",
    email: "hello@techflow.com",
    role: "company",
    profilePicture: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400",
    rating: 4.5,
    industry: "Technology",
    bio: "Innovative tech company developing cutting-edge applications. We believe in the power of creative-tech collaborations.",
    createdAt: "2022-08-22T11:20:00Z"
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@email.com",
    role: "artist",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    rating: 4.4,
    industry: "Gaming",
    bio: "Game developer and 3D artist with expertise in character design and environment creation. Passionate about immersive experiences.",
    createdAt: "2023-01-30T13:10:00Z"
  },
  {
    id: "7",
    name: "Maya Patel",
    email: "maya.patel@email.com",
    role: "artist",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    rating: 4.9,
    industry: "Music",
    bio: "Classical violinist and composer blending traditional and contemporary styles. Creating beautiful music for films and concerts.",
    createdAt: "2023-04-12T08:25:00Z"
  },
  {
    id: "8",
    name: "Bright Media Group",
    email: "partnerships@brightmedia.com",
    role: "company",
    profilePicture: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
    rating: 4.6,
    industry: "Entertainment",
    bio: "Media production company specializing in digital content creation. We help artists reach wider audiences through innovative platforms.",
    createdAt: "2022-12-01T15:30:00Z"
  }
];

// Mock Clauses Data
export const mockClauses: Clause[] = [
  {
    id: "clause-1",
    content: "The artist agrees to provide original musical compositions for the project soundtrack.",
    consentId: "consent-1"
  },
  {
    id: "clause-2",
    content: "Payment terms: 50% upfront, 50% upon project completion.",
    consentId: "consent-1"
  },
  {
    id: "clause-3",
    content: "The company retains exclusive rights to use the artwork for promotional purposes.",
    consentId: "consent-2"
  },
  {
    id: "clause-4",
    content: "Artist maintains ownership of original intellectual property.",
    consentId: "consent-2"
  }
];

// Mock Signatures Data
export const mockSignatures: Signature[] = [
  {
    id: "sig-1",
    userId: "1",
    consentId: "consent-1",
    signedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "sig-2",
    userId: "3",
    consentId: "consent-1",
    signedAt: "2024-01-15T11:45:00Z"
  },
  {
    id: "sig-3",
    userId: "2",
    consentId: "consent-2",
    signedAt: "2024-01-20T14:20:00Z"
  }
];

// Mock Consents Data
export const mockConsents: Consent[] = [
  {
    id: "consent-1",
    title: "Music Collaboration - Indie Film Soundtrack",
    description: "Collaboration agreement for creating original music for an upcoming indie film. The project involves composing 8 tracks with a total runtime of 45 minutes.",
    createdBy: "3",
    involvedUsers: ["1", "3"],
    status: "ongoing",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    clauses: mockClauses.filter(clause => clause.consentId === "consent-1"),
    signatures: mockSignatures.filter(sig => sig.consentId === "consent-1")
  },
  {
    id: "consent-2",
    title: "Digital Art Commission - Game Assets",
    description: "Commission for creating character designs and environment art for a mobile gaming project. Includes concept art and final rendered assets.",
    createdBy: "5",
    involvedUsers: ["2", "5"],
    status: "waiting_acceptance",
    createdAt: "2024-01-18T14:30:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    clauses: mockClauses.filter(clause => clause.consentId === "consent-2"),
    signatures: mockSignatures.filter(sig => sig.consentId === "consent-2")
  },
  {
    id: "consent-3",
    title: "Fashion Photography Collaboration",
    description: "Partnership for a sustainable fashion photography series. Includes styling, photography, and social media content creation.",
    createdBy: "4",
    involvedUsers: ["4", "8"],
    status: "pending",
    createdAt: "2024-01-22T11:15:00Z",
    updatedAt: "2024-01-22T11:15:00Z",
    clauses: [],
    signatures: []
  },
  {
    id: "consent-4",
    title: "Classical Music Recording Project",
    description: "Recording contract for a classical music album featuring violin compositions. Includes studio time and distribution rights.",
    createdBy: "7",
    involvedUsers: ["7", "8"],
    status: "completed",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2024-01-05T16:30:00Z",
    clauses: [],
    signatures: []
  },
  {
    id: "consent-5",
    title: "Game Development Art Package",
    description: "Comprehensive art package for indie game development including character sprites, backgrounds, and UI elements.",
    createdBy: "6",
    involvedUsers: ["6", "5"],
    status: "on-hold",
    createdAt: "2024-01-12T13:20:00Z",
    updatedAt: "2024-01-25T09:45:00Z",
    clauses: [],
    signatures: []
  }
];

// Mock Templates Data
export const mockTemplates: Template[] = [
  {
    id: "template-1",
    title: "Music Licensing Agreement",
    content: "This agreement grants the licensee the right to use the musical composition(s) created by the artist for the specified project. Terms include usage rights, payment schedule, and attribution requirements.",
    description: "Standard template for music licensing agreements between artists and production companies.",
    createdBy: "1",
    category: "Music",
    isPublic: true,
    createdAt: "2023-11-15T10:00:00Z"
  },
  {
    id: "template-2",
    title: "Digital Art Commission Contract",
    content: "This contract outlines the terms for commissioning digital artwork. Includes project scope, deliverables, timeline, payment terms, and intellectual property rights.",
    description: "Comprehensive template for digital art commissions and freelance projects.",
    createdBy: "2",
    category: "Visual Arts",
    isPublic: true,
    createdAt: "2023-10-20T14:30:00Z"
  },
  {
    id: "template-3",
    title: "Video Production Collaboration",
    content: "Agreement for collaborative video production projects. Covers roles and responsibilities, creative control, revenue sharing, and distribution rights.",
    description: "Template for video content creators and production companies working together.",
    createdBy: "3",
    category: "Entertainment",
    isPublic: true,
    createdAt: "2023-12-05T16:45:00Z"
  },
  {
    id: "template-4",
    title: "Fashion Design Partnership",
    content: "Partnership agreement for fashion design collaborations. Includes design ownership, manufacturing rights, marketing responsibilities, and profit distribution.",
    description: "Template for fashion designers collaborating with brands or manufacturers.",
    createdBy: "4",
    category: "Fashion",
    isPublic: false,
    createdAt: "2023-09-10T11:20:00Z"
  },
  {
    id: "template-5",
    title: "Software Development Art Assets",
    content: "Contract for creating art assets for software applications. Covers asset specifications, delivery timeline, quality standards, and usage rights.",
    description: "Template for artists working with tech companies on digital assets.",
    createdBy: "5",
    category: "Technology",
    isPublic: true,
    createdAt: "2023-11-28T09:15:00Z"
  }
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get consents by user ID
export const getConsentsByUserId = (userId: string): Consent[] => {
  return mockConsents.filter(consent => 
    consent.involvedUsers.includes(userId) || consent.createdBy === userId
  );
};

// Helper function to get dashboard data for a user
export const getDashboardData = (userId: string) => {
  const userConsents = getConsentsByUserId(userId);
  
  return {
    ongoingContracts: userConsents.filter(c => c.status === 'ongoing'),
    contractsToAccept: userConsents.filter(c => 
      c.status === 'pending' && 
      c.createdBy !== userId &&
      !c.signatures.some(sig => sig.userId === userId)
    ),
    waitingForAcceptance: userConsents.filter(c => 
      c.status === 'waiting_acceptance' && c.createdBy === userId
    ),
    onHoldContracts: userConsents.filter(c => c.status === 'on-hold'),
    completedContracts: userConsents.filter(c => c.status === 'completed')
  };
};

export default {
  users: mockUsers,
  consents: mockConsents,
  templates: mockTemplates,
  clauses: mockClauses,
  signatures: mockSignatures,
  getUserById,
  getConsentsByUserId,
  getDashboardData
};
