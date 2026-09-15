import { useState } from "react";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

import { authApi } from "~/services/api/auth.api";
import { useAppDispatch } from "~/store/hooks";
import { setAuth } from "~/store/slices/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authApi.sendEmailOtp({
        email: email.trim(),
        purpose: "LOGIN",
      });

      setOtpSent(true);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ??
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authApi.verifyEmailOtp({
        email: email.trim(),
        otp,
        purpose: "LOGIN",
      });

      /*
       * IMPORTANT:
       *
       * RouteSync Admin Dashboard is only for ADMIN users.
       */
      if (response.role !== "ADMIN") {
        setError(
          "Access denied. Only administrators can access this dashboard."
        );

        return;
      }

      if (!response.active) {
        setError(
          "Your account is inactive. Please contact the administrator."
        );

        return;
      }

      dispatch(setAuth(response));

      navigate("/admin");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ??
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <ShieldCheck className="size-7" />
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-tight">
              RouteSync Admin
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Secure access to the public transport operations center
            </p>
          </div>

          {!otpSent ? (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Administrator Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="admin@example.com"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}

                {!loading && (
                  <ArrowRight className="size-4" />
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium"
                >
                  Enter OTP
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) =>
                    setOtp(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="000000"
                  className="h-12 w-full rounded-lg border bg-background text-center text-xl font-semibold tracking-[0.5em] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  OTP sent to {email}
                </p>
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                }}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          RouteSync • AI-Powered Public Transport Intelligence
        </p>
      </div>
    </main>
  );
}