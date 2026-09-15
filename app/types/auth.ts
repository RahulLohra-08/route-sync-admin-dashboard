export type UserRole = "PASSENGER" | "DRIVER" | "ADMIN";

export type AuthProvider = "OTP" | "GOOGLE";

export interface User {
  userId: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  profileImage: string | null;
  authProvider: AuthProvider;
  role: UserRole;
  active: boolean;
}

export interface SendEmailOtpRequest {
  email: string;
  purpose: "LOGIN";
}

export interface VerifyEmailOtpRequest {
  email: string;
  otp: string;
  purpose?: "LOGIN";
}

export interface AuthResponse {
  userId: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  profileImage: string | null;
  authProvider: AuthProvider;
  role: UserRole;
  active: boolean;

  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  message: string;
}

export interface SendOtpResponse {
  message: string;
  expiresIn: number;
}