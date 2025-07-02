'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingStatusMetrics } from '@/ui/hooks/ui/useOnboardingStatusMetrics';

const STATUS_LABELS: Record<string, string> = {
  CREATED: 'PNFL verification Failed',
  OTP_SENT: 'OTP Sent',
  NASP_FAILED: 'NASP API Failed',
  MOBILE_VERIFIED: 'Abandoned at OTP verification completed',
  PERSONAL_INFO_VERIFIED: 'Abandoned at personal verification completed',
  AGREEMENTS_ACCEPTED: 'Abandoned at T&C accepted',
  FACE_VERIFICATION_IN_PROGRESS: 'Abandoned while face verification in progress',
  VERIFICATION_COMPLETED: 'Abandoned at face verification completed',
  VERIFICATION_FAILED: 'Face verification failed',
  FAILED_FINALIZATION: 'Failed Finalization',
  COMPLETED: 'Bank Sign up successful',
};

export function OnboardingStatusBox() {
  const { data, loading, error } = useOnboardingStatusMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[25vh] w-full">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Card className="p-3 pb-0 bg-[#FAFAFA] shadow-none border-t-0 border-b-0 border-l-0 border-r-0 rounded-[24px]">
        <CardHeader className='pb-3 pl-1'>
          <CardTitle className="text-[#0B0B22] font-semibold text-[16px] leading-normal">
            Onboarding Status
          </CardTitle>
        </CardHeader>
        <div className="flex gap-3">
          {/* Total Applications */}
          <Card className="flex-1 p-6 bg-[#fff] border-none rounded-[24px] shadow-none">
            <div className="flex flex-col justify-center h-full">
              <span className="text-[#0B0B22] text-[24px] font-bold leading-normal">
                {data?.totalOnboardingApplications}
              </span>
              <span className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
                Total Onboarding Applications
              </span>
            </div>
          </Card>

          {/* Successful */}
          <Card className="flex-1 p-6 bg-[#fff] border-none rounded-[24px] shadow-none">
            <div className="flex flex-col justify-center h-full">
              <span className="text-[#0B0B22] text-[32px] font-bold leading-normal">
                {data?.successful}
              </span>
              <span className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
                Successful
              </span>
            </div>
          </Card>

          {/* Highest Error */}
          <Card className="flex-1 p-6 bg-[#fff] border-none rounded-[24px] shadow-none">
            <div className="flex flex-col justify-center h-full">
              <span className="text-[#0B0B22] text-[32px] font-bold leading-normal">
                Highest Error
              </span>
              <span className="text-[#9D9DA7] text-[14px] font-normal leading-normal">
                {STATUS_LABELS[data?.highestError ?? ''] || data?.highestError}
              </span>
            </div>
          </Card>
        </div>
      </Card>
    </>
  );
}
