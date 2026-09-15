import { apiClient } from "./client";

import type {
  AuthResponse,
  SendEmailOtpRequest,
  SendOtpResponse,
  VerifyEmailOtpRequest,
  User,
} from "~/types/auth";

export const authApi = {
  /**
   * Send OTP to admin email.
   *
   * POST /api/v1/auth/otp/email/send
   */
  async sendEmailOtp(
    request: SendEmailOtpRequest
  ): Promise<SendOtpResponse> {
    const response = await apiClient.post<SendOtpResponse>(
      "/auth/otp/email/send",
      request
    );

    return response.data;
  },

  /**
   * Verify email OTP and authenticate user.
   *
   * POST /api/v1/auth/otp/email/verify
   */
  async verifyEmailOtp(
    request: VerifyEmailOtpRequest
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/otp/email/verify",
      {
        email: request.email,
        otp: request.otp,
        purpose: request.purpose ?? "LOGIN",
      }
    );

    return response.data;
  },

  /**
   * Get currently authenticated user.
   *
   * GET /api/v1/users/me
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<User>("/users/me");

    return response.data;
  },
};