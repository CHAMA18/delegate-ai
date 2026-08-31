'use client';

import { useState, type FormEvent } from 'react';
import { AuthBrandPanel } from '@/components/auth/brand-panel';
import {
  GoogleOAuthButton,
  OrDivider,
  PasswordInput,
  TextInput,
} from '@/components/auth/form-fields';
import { getFirebase } from '@/lib/firebase';
import { trackEvent, EVENTS } from '@/lib/analytics';

type AuthError = {
  code: string;
  message: string;
};

function friendlyError(err: unknown): string {
  const e = err as AuthError;
  switch (e?.code) {
    case 'auth/invalid-email':
      return 'That email address is malformed.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again in a few minutes.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (v: string) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    setFormError('');
    if (err || !password) return;

    setSubmitting(true);
    trackEvent(EVENTS.SIGN_IN_ATTEMPT, { method: 'password' });

    try {
      const { auth } = await getFirebase();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
      trackEvent(EVENTS.SIGN_IN_SUCCESS, { method: 'password' });
      setSubmitted(true);
      setTimeout(() => {
        window.location.assign('/home');
      }, 1200);
    } catch (err) {
      trackEvent(EVENTS.SIGN_IN_FAILURE, {
        method: 'password',
        error_code: (err as AuthError)?.code,
      });
      setFormError(friendlyError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setFormError('');
    setGoogleLoading(true);
    trackEvent(EVENTS.GOOGLE_OAUTH_CLICK, { location: 'login' });

    try {
      const { auth, googleProvider } = await getFirebase();
      const { signInWithPopup } = await import('firebase/auth');
      await signInWithPopup(auth, googleProvider);
      trackEvent(EVENTS.SIGN_IN_SUCCESS, { method: 'google' });
      setSubmitted(true);
      setTimeout(() => {
        window.location.assign('/home');
      }, 800);
    } catch (err) {
      trackEvent(EVENTS.SIGN_IN_FAILURE, {
        method: 'google',
        error_code: (err as AuthError)?.code,
      });
      setFormError(friendlyError(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setEmailError('Enter your email first, then tap "Forgot password?"');
      return;
    }
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    try {
      const { auth } = await getFirebase();
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch {
      setFormError('Could not send reset email. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#031427] text-[#F5F7FA] flex">
      <AuthBrandPanel mode="login" />

      {/* Form panel — right side */}
      <main className="flex-1 lg:ml-[44%] xl:ml-[42%] flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Mobile logo (visible only on small screens) */}
          <a href="/" className="lg:hidden flex items-center gap-2.5 w-fit">
            <svg viewBox="0 0 64 64" className="h-9 w-9" role="img" aria-label="Delegate.ai">
              <defs>
                <linearGradient id="mLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4abff" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="64" height="64" rx="14" fill="#0A1E36" />
              <path
                d="M 12 18 L 12 46 L 22 46 L 22 37 L 31 32 L 22 27 L 22 18 Z"
                fill="url(#mLogo)"
              />
              <path
                d="M 35 18 L 35 27 L 44 32 L 35 37 L 35 46 L 54 32 Z"
                fill="none"
                stroke="url(#mLogo)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#F5F7FA]">
              Delegate<span className="ai-gradient-text">.ai</span>
            </span>
          </a>

          {submitted ? (
            <SuccessState mode="login" email={email} />
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <span className="text-eyebrow">Sign in</span>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#F5F7FA]">
                  Welcome back
                </h2>
                <p className="text-[14px] text-[#A9B4C4] leading-[1.55]">
                  Sign in to your Delegate.ai workspace and pick up where you left off.
                </p>
              </div>

              {/* Google OAuth */}
              <div onClick={handleGoogle}>
                <GoogleOAuthButton label={googleLoading ? 'Connecting…' : 'Continue with Google'} />
              </div>

              <OrDivider />

              {/* Form-level error */}
              {formError && (
                <div className="flex items-start gap-2 p-3 rounded-lg border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.05)] text-[13px] text-[#F87171]">
                  <span
                    className="material-symbols-outlined text-[16px] mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    error
                  </span>
                  <span>{formError}</span>
                </div>
              )}

              {/* Reset confirmation */}
              {resetSent && (
                <div className="flex items-start gap-2 p-3 rounded-lg border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.05)] text-[13px] text-[#34D399]">
                  <span
                    className="material-symbols-outlined text-[16px] mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    mark_email_read
                  </span>
                  <span>Password reset email sent to <strong className="font-mono">{email}</strong>. Check your inbox.</span>
                </div>
              )}

              {/* Email/password form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInput
                  id="email"
                  label="Work email"
                  type="email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (emailError) setEmailError('');
                    if (resetSent) setResetSent(false);
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  icon="alternate_email"
                  error={emailError}
                />

                <PasswordInput
                  id="password"
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  autoComplete="current-password"
                />

                {/* Remember + forgot row */}
                <div className="flex items-center justify-between text-[13px]">
                  <label className="flex items-center gap-2 cursor-pointer group select-none">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={remember}
                      className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-all ${
                        remember
                          ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                          : 'border-[rgba(255,255,255,0.18)] bg-transparent hover:border-[#8B5CF6]'
                      }`}
                    >
                      {remember && (
                        <span
                          className="material-symbols-outlined text-[12px] text-white"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                        >
                          check
                        </span>
                      )}
                    </button>
                    <span className="text-[#A9B4C4] group-hover:text-[#F5F7FA] transition-colors">
                      Keep me signed in
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[#c4abff] hover:text-[#F5F7FA] font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`btn-primary w-full justify-center mt-2 ${
                    submitting ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <span
                        className="material-symbols-outlined text-[18px] animate-spin"
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                      >
                        progress_activity
                      </span>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                      >
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Magic link */}
              <div className="text-center">
                <button className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors inline-flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-[#c4abff]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    auto_awesome
                  </span>
                  Send me a magic link instead
                </button>
              </div>

              {/* Sign up CTA */}
              <div className="pt-6 mt-2 border-t border-[rgba(255,255,255,0.06)] text-center">
                <p className="text-[13px] text-[#A9B4C4]">
                  Don&apos;t have an account?{' '}
                  <a
                    href="/signup"
                    className="text-[#c4abff] hover:text-[#F5F7FA] font-medium transition-colors"
                  >
                    Create one — it&apos;s free
                  </a>
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7689] font-mono">
                <span className="inline-flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#34D399]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    verified
                  </span>
                  SOC 2 Type II
                </span>
                <span className="inline-flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#34D399]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    verified
                  </span>
                  GDPR
                </span>
                <span className="inline-flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#6B7689]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    credit_card_off
                  </span>
                  No card required
                </span>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   Success state — shown after form submission
   ============================================================ */
function SuccessState({ mode, email }: { mode: 'login' | 'signup'; email: string }) {
  const headline = mode === 'login' ? 'Welcome back.' : 'Account created.';
  const body =
    mode === 'login'
      ? `Redirecting you to your dashboard…`
      : `Check ${email} to verify your address — we'll see you inside.`;

  return (
    <div className="flex flex-col items-center text-center gap-5 py-8">
      <div className="relative">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.2), transparent 70%)',
          }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#34D399] to-[#22D3EE] flex items-center justify-center shadow-[0_8px_32px_-8px_rgba(52,211,153,0.6)]">
            <span
              className="material-symbols-outlined text-[28px] text-[#031427]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
            >
              check
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#F5F7FA]">
          {headline}
        </h2>
        <p className="text-[14px] text-[#A9B4C4] max-w-xs">{body}</p>
      </div>
      {mode === 'login' && (
        <a href="/home" className="btn-primary mt-2">
          Go to dashboard
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            arrow_forward
          </span>
        </a>
      )}
    </div>
  );
}
