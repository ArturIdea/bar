'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { UsersTable } from '@/ui/components/Dashboard/Users/UsersTable';

const SignUpRequestsPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/en/dashboard');
  };
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft /> Back
        </button>
      </div>
      <UsersTable />
    </div>
  );
};

export default SignUpRequestsPage;
