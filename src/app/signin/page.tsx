'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email === 'jenil@gmail.com' && password === 'jenil') {
      router.push('/');
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Left Section – Company Name + Cards */}
      <div className="w-1/2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-gray-800 flex flex-col justify-between px-12 py-10 relative overflow-hidden">
        {/* Top Company Name */}
        <div className="text-3xl font-extrabold tracking-wide z-10">Legacy</div>

        {/* Center Cards */}
        <div className="flex flex-col gap-8 justify-center items-center flex-1 z-10">
          {[1].map((i) => (
            <div
              key={i}
              className="w-72 h-36 bg-white/60 backdrop-blur-lg rounded-2xl border border-gray-300 shadow-xl flex items-center justify-center text-xl font-semibold text-gray-700"
            >
              Legacy
            </div>
          ))}
        </div>

        {/* Decorative Blur Circle */}
        <div className="absolute w-80 h-80 bg-white/20 rounded-full -bottom-20 -right-20 blur-3xl z-0" />
      </div>

      {/* Right Section – Sign-In Form */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 px-10 py-12 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-500">Sign in to your Legacy account</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-gray-300 focus:border-gray-600 bg-white shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-lg border border-gray-300 focus:border-gray-600 bg-white shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSignIn}
              className="w-full rounded-full bg-gray-800 hover:bg-gray-900 text-white font-semibold text-md py-3 shadow-md hover:shadow-lg transition"
            >
              Sign In
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="#" className="text-gray-800 hover:underline font-medium">
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
