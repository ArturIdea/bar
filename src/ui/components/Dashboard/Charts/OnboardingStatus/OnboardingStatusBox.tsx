'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboardingStatusMetrics } from '@/ui/hooks/ui/useOnboardingStatusMetrics';
import { useTranslations } from 'next-intl';

export function OnboardingStatusBox() {
  const { data, loading, error } = useOnboardingStatusMetrics();
  const t = useTranslations();

  const STATUS_LABELS: Record<string, string> = {
    CREATED: t('OnboardingStatus.CREATED'),
    OTP_SENT: t('OnboardingStatus.OTP_SENT'),
    NASP_FAILED: t('OnboardingStatus.NASP_FAILED'),
    MOBILE_VERIFIED: t('OnboardingStatus.MOBILE_VERIFIED'),
    PERSONAL_INFO_VERIFIED: t('OnboardingStatus.PERSONAL_INFO_VERIFIED'),
    AGREEMENTS_ACCEPTED: t('OnboardingStatus.AGREEMENTS_ACCEPTED'),
    FACE_VERIFICATION_IN_PROGRESS: t('OnboardingStatus.FACE_VERIFICATION_IN_PROGRESS'),
    VERIFICATION_COMPLETED: t('OnboardingStatus.VERIFICATION_COMPLETED'),
    VERIFICATION_FAILED: t('OnboardingStatus.FAILED_FINALIZATION'),
    FAILED_FINALIZATION: t('OnboardingStatus.OTP_SENT'),
    COMPLETED: t('OnboardingStatus.COMPLETED'),
  };

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
        <CardHeader className="pb-3 pl-1">
          <CardTitle className="text-[#0B0B22] font-semibold text-[16px] leading-normal">
            {t('Navbar.OnboardingStatus')}
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
                {t('OnboardingStatus.TotalOnboardingApplications')}
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
                {t('OnboardingStatus.Successful')}
              </span>
            </div>
          </Card>

          {/* Highest Error */}
          <Card className="flex-1 p-6 bg-[#fff] border-none rounded-[24px] shadow-none">
            <div className="flex flex-col justify-center h-full">
              <span className="text-[#0B0B22] text-[32px] font-bold leading-normal">
                {t('OnboardingStatus.HighestError')}
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
