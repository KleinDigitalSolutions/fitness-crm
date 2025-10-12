'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/forms/login-form';
import { RegisterForm } from '@/components/forms/register-form';
import { Activity } from 'lucide-react';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
              <Activity className="h-6 w-6 text-red-400" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              {isLoginView ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {isLoginView ? 'Sign in to your Fitness CRM account' : 'Start managing your fitness studio today'}
            </p>
          </div>

          {/* Forms */}
          {isLoginView ? <LoginForm /> : <RegisterForm />}

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {isLoginView ? (
                <>
                  Don't have an account? <span className="font-semibold text-red-400">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="font-semibold text-red-400">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/40">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
