'use client';

import { useState, type FormEvent } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { AuthBrandPanel } from '@/components/auth/brand-panel';
import {
  GoogleOAuthButton,
  OrDivider,
  PasswordInput,
  TextInput,
} from '@/components/auth/form-fields';
import { auth, googleProvider } from '@/lib/firebase';
import { trackEvent, EVENTS } from '@/lib/analytics';

type AuthError = {
  code: string;
  message: string;
};

function friendlyError(err: unknown): string {
  const e = err as AuthError;
  switch (e?.code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in.';
    case 'auth/invalid-email':
      return 'That email address is malformed.';
    case 'auth/weak-password':
      return 'Password should be at least 8 characters.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-up is not enabled. Contact support.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-up was cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  agree?: string;
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');

  const validate = () => {
    const e: Errors = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid work email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Must be at least 8 characters';
    if (!agree) e.agree = 'Please accept the terms to continue';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    setFormError('');
    if (Object.keys(e2).length > 0) return;

    setSubmitting(true);
    trackEvent(EVENTS.SIGN_UP_ATTEMPT, { method: 'password' });

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name from the name field
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      trackEvent(EVENTS.SIGN_UP_SUCCESS, { method: 'password' });
      setSubmitted(true);
      // Auto-redirect to /home after showing the success state
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    } catch (err) {
      trackEvent(EVENTS.SIGN_UP_FAILURE, {
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
    trackEvent(EVENTS.GOOGLE_OAUTH_CLICK, { location: 'signup' });

    try {
      await signInWithPopup(auth, googleProvider);
      trackEvent(EVENTS.SIGN_UP_SUCCESS, { method: 'google' });
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = '/home';
      }, 1200);
    } catch (err) {
      trackEvent(EVENTS.SIGN_UP_FAILURE, {
        method: 'google',
        error_code: (err as AuthError)?.code,
      });
      setFormError(friendlyError(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#031427] text-[#F5F7FA] flex">
      <AuthBrandPanel mode="signup" />

      {/* Form panel — right side */}
      <main className="flex-1 lg:ml-[44%] xl:ml-[42%] flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Mobile logo (visible only on small screens) */}
          <a href="/" className="lg:hidden flex items-center gap-2.5 w-fit">
            <svg viewBox="0 0 64 64" className="h-9 w-9" role="img" aria-label="Delegate.ai">
              <defs>
                <linearGradient id="mLogo2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4abff" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="64" height="64" rx="14" fill="#0A1E36" />
              <path
                d="M 12 18 L 12 46 L 22 46 L 22 37 L 31 32 L 22 27 L 22 18 Z"
                fill="url(#mLogo2)"
              />
              <path
                d="M 35 18 L 35 27 L 44 32 L 35 37 L 35 46 L 54 32 Z"
                fill="none"
                stroke="url(#mLogo2)"
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
            <SuccessState email={email} />
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <span className="text-eyebrow">Create account</span>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#F5F7FA]">
                  Start delegating today
                </h2>
                <p className="text-[14px] text-[#A9B4C4] leading-[1.55]">
                  Free tier · 25 actions per week · No credit card required.
                </p>
              </div>

              {/* Google OAuth */}
              <div onClick={handleGoogle}>
                <GoogleOAuthButton label={googleLoading ? 'Connecting…' : 'Sign up with Google'} />
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

              {/* Sign up form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInput
                  id="name"
                  label="Full name"
                  value={name}
                  onChange={(v) => {
                    setName(v);
                    if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
                  }}
                  placeholder="Maya Krishnan"
                  autoComplete="name"
                  icon="person"
                  error={errors.name}
                />

                <TextInput
                  id="email"
                  label="Work email"
                  type="email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  icon="alternate_email"
                  error={errors.email}
                />

                <TextInput
                  id="company"
                  label="Company (optional)"
                  value={company}
                  onChange={setCompany}
                  placeholder="Vertex Labs"
                  autoComplete="organization"
                  icon="apartment"
                  required={false}
                />

                <div>
                  <PasswordInput
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(v) => {
                      setPassword(v);
                      if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                    }}
                    autoComplete="new-password"
                    showStrength
                  />
                  {errors.password && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1 mt-1.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        error
                      </span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={agree}
                      onClick={() => {
                        setAgree((a) => !a);
                        if (errors.agree) setErrors((e) => ({ ...e, agree: undefined }));
                      }}
                      className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                        agree
                          ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                          : errors.agree
                            ? 'border-[rgba(248,113,113,0.5)]'
                            : 'border-[rgba(255,255,255,0.18)] bg-transparent hover:border-[#8B5CF6]'
                      }`}
                    >
                      {agree && (
                        <span
                          className="material-symbols-outlined text-[12px] text-white"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
                        >
                          check
                        </span>
                      )}
                    </button>
                    <span className="text-[13px] text-[#A9B4C4] leading-[1.5] group-hover:text-[#F5F7FA] transition-colors">
                      I agree to Delegate.ai&apos;s{' '}
                      <a href="#" className="text-[#c4abff] hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-[#c4abff] hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="text-[11px] text-[#F87171] ml-6">{errors.agree}</p>
                  )}
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
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create account
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

              {/* Sign in CTA */}
              <div className="pt-6 mt-2 border-t border-[rgba(255,255,255,0.06)] text-center">
                <p className="text-[13px] text-[#A9B4C4]">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-[#c4abff] hover:text-[#F5F7FA] font-medium transition-colors"
                  >
                    Sign in
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
   Success state — verification email sent
   ============================================================ */
function SuccessState({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-8">
      <div className="relative">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)',
          }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_8px_32px_-8px_rgba(139,92,246,0.6)]">
            <span
              className="material-symbols-outlined text-[28px] text-white"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
            >
              mail
            </span>
          </div>
        </div>
        <span
          className="material-symbols-outlined absolute -top-1 -right-1 text-[14px] text-[#c4abff] animate-pulse"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          auto_awesome
        </span>
        <span
          className="material-symbols-outlined absolute -bottom-2 -left-2 text-[10px] text-[#89ceff] animate-pulse"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400", animationDelay: '0.5s' }}
        >
          auto_awesome
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#F5F7FA]">
          Account created
        </h2>
        <p className="text-[14px] text-[#A9B4C4] max-w-xs leading-[1.55]">
          Welcome to Delegate.ai. We&apos;ve sent a verification link to{' '}
          <span className="text-[#F5F7FA] font-medium font-mono text-[13px]">{email}</span>.
          Redirecting you to your dashboard…
        </p>
      </div>

      <div className="flex flex-col gap-2 items-center mt-2 w-full">
        <a href="/home" className="btn-primary text-[13px]">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            arrow_forward
          </span>
          Go to dashboard
        </a>
        <p className="text-[11px] text-[#6B7689] font-mono">
          Didn&apos;t get it? Check spam — or{' '}
          <a href="/login" className="text-[#c4abff] hover:underline">sign in</a>{' '}
          if you already have an account.
        </p>
      </div>
    </div>
  );
}
