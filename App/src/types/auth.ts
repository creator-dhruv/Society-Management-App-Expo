export type UserRole = "user" | "admin" | "security";

export interface Society {
  name: string;
  address: {
    flatNo?: string;
    towerNo: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string[];
  role: UserRole;
  society: Society[];
  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
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
}
