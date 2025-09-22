export interface User {
  id: string;
  username: string;
  role: 'manager' | 'kitchen-staff' | 'developer';
  name: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}