'use client';

import { useState, useMemo } from 'react';

/**
 * Password strength meter — brief: honest, actionable feedback.
 * Calculates entropy-based score 0–4 with label + color + bar segments.
 */
export function PasswordStrength({ password }: { password: string }) {
  const score = useMemo(() => calculateScore(password), [password]);

  if (!password) return null;

  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
  const colors = ['#F87171', '#FB923C', '#FBBF24', '#34D399', '#22D3EE'];

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < score ? colors[score - 1] : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span style={{ color: colors[score - 1] }}>{labels[score - 1]}</span>
        <span className="text-[#6B7689]">
          {password.length < 8 ? `${8 - password.length} more chars to min` : 'meets minimum'}
        </span>
      </div>
    </div>
  );
}

function calculateScore(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

/**
 * Password input with show/hide toggle.
 */
export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = '••••••••••••',
  autoComplete = 'current-password',
  showStrength = false,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  showStrength?: boolean;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-[#F5F7FA]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-[#031427] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 pr-11 text-[14px] text-[#F5F7FA] font-mono placeholder:text-[#6B7689]/60 focus:border-[rgba(139,92,246,0.4)] focus:ring-2 focus:ring-[rgba(139,92,246,0.15)] outline-none transition-all"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7689] hover:text-[#F5F7FA] transition-colors p-1"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            {show ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>
      {showStrength && <PasswordStrength password={value} />}
    </div>
  );
}

/**
 * Google OAuth button — premium variant.
 * Uses the official Google "G" multicolor mark.
 */
export function GoogleOAuthButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#0A1E36] hover:bg-[#102544] hover:border-[rgba(255,255,255,0.18)] transition-all duration-200"
    >
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="text-[14px] font-medium text-[#F5F7FA]">{label}</span>
    </button>
  );
}

/**
 * Divider with "or" text.
 */
export function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-grow h-px bg-[rgba(255,255,255,0.06)]" />
      <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B7689] font-mono">
        or continue with email
      </span>
      <div className="flex-grow h-px bg-[rgba(255,255,255,0.06)]" />
    </div>
  );
}

/**
 * Text input with optional icon and validation state.
 */
export function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
  required = true,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  icon?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-[#F5F7FA]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="material-symbols-outlined text-[18px] text-[#6B7689] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          style={{ paddingLeft: icon ? '44px' : '16px' }}
          className={`w-full bg-[#031427] border rounded-xl px-4 py-3 text-[14px] text-[#F5F7FA] placeholder:text-[#6B7689]/60 outline-none transition-all ${
            error
              ? 'border-[rgba(248,113,113,0.4)] focus:ring-2 focus:ring-[rgba(248,113,113,0.15)]'
              : 'border-[rgba(255,255,255,0.08)] focus:border-[rgba(139,92,246,0.4)] focus:ring-2 focus:ring-[rgba(139,92,246,0.15)]'
          }`}
        />
      </div>
      {error && (
        <p className="text-[11px] text-[#F87171] flex items-center gap-1 mt-0.5">
          <span
            className="material-symbols-outlined text-[12px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            error
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
