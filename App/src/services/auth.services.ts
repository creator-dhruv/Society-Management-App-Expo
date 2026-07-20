import { api } from "@/utils/axios";
import { AuthSession, User, UserRole } from "@/types/auth";

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: any;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface AuthRegisterResponse {
  success: boolean;
  message: any;
  data: {};
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (data: LoginBody): Promise<AuthResponse> => {
    const { data: response } = await api.post<AuthResponse>(
      "/user/signIn",
      data,
    );

    return response;
  },

  register: async (data: RegisterBody): Promise<AuthRegisterResponse> => {
    const { data: response } = await api.post<AuthRegisterResponse>(
      "/user/signUp",
      data,
    );
    return response;
  },

  verifyEmail: async (code: string, email: string): Promise<AuthResponse> => {
    const { data: response } = await api.post<AuthResponse>(
      "/user/emailVerification",
      {
        otp: code,
        email: email,
      },
    );
    return response;
  },

  logout: async (token: AuthSession) => {
    const { data: response } = await api.post("/user/logout", {
      accessToken: token.accessToken,
    });

    return response;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<{ user: User }>("/api/v1/user");

    return data.user;
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await api.post<RefreshTokenResponse>(
      "/api/v1/user/refreshToken",
      {
        refreshToken,
      },
    );

    return data;
  },
};
