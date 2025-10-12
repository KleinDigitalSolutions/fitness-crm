'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/forms/login-form';
import { RegisterForm } from '@/components/forms/register-form';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {isLoginView ? 'Login' : 'Create an Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLoginView ? 'Welcome back to Fitness CRM' : 'Start your journey with Fitness CRM'}
          </p>
        </div>
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <div className="text-center">
          <button 
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLoginView ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
