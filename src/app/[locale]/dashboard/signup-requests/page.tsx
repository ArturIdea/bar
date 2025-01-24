'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SignUpRequestsTable } from '@/ui/components/Dashboard/SignupRequests/SignupRequestsTable';

const SignUpRequestsPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/en/dashboard');
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="pb-6">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft /> Back
        </button>
      </div>
      <SignUpRequestsTable />
    </div>
  );
};

export default SignUpRequestsPage;
