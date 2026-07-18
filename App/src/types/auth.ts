export type UserRole = "user" | "admin" | "guard";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  flatNo?: string;
  societyId: string;
  phone?: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  flatNo?: string;
  phone?: string;
}

export interface StoredUserRecord extends User {
  password: string;
}
