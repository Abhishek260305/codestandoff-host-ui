'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';

// Dynamic imports for remote components
const DashboardApp = dynamic(() => import('dashboard/Dashboard'), {
  ssr: false,
  loading: () => <div className="p-4">Loading Dashboard...</div>,
});

const TrainingApp = dynamic(() => import('training/Training'), {
  ssr: false,
  loading: () => <div className="p-4">Loading Training...</div>,
});

const OneVOneApp = dynamic(() => import('onevone/OneVOne'), {
  ssr: false,
  loading: () => <div className="p-4">Loading 1v1...</div>,
});

const PlaygroundApp = dynamic(() => import('playground/Playground'), {
  ssr: false,
  loading: () => <div className="p-4">Loading Playground...</div>,
});

const SignupApp = dynamic(() => import('signup/Signup'), {
  ssr: false,
  loading: () => <div className="p-4">Loading Signup...</div>,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                CodeStandoff 2.0
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/training"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Training
              </Link>
              <Link
                href="/1v1"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                1v1
              </Link>
              <Link
                href="/playground"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Playground
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CodeStandoff 2.0
          </h2>
          <p className="text-xl text-gray-600">
            Competitive coding platform built with Micro Frontend Architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <DashboardApp />
            </Suspense>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Training</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <TrainingApp />
            </Suspense>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">1v1</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <OneVOneApp />
            </Suspense>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Playground</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <PlaygroundApp />
            </Suspense>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <SignupApp />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

