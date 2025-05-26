
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'artist' | 'company' | 'admin';
  profilePicture?: string;
  rating?: number;
  industry?: string;
  bio?: string;
  createdAt: string;
}

export interface Consent {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  involvedUsers: string[];
  status: 'pending' | 'ongoing' | 'completed' | 'on-hold' | 'waiting_acceptance';
  createdAt: string;
  updatedAt: string;
  clauses: Clause[];
  signatures: Signature[];
}

export interface Clause {
  id: string;
  content: string;
  consentId: string;
}

export interface Signature {
  id: string;
  userId: string;
  consentId: string;
  signedAt: string;
}

export interface Template {
  id: string;
  title: string;
  content: string;
  description: string;
  createdBy: string;
  category: string;
  isPublic: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
