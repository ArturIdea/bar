import { AppUsageAgeDistributionRadialChart } from '@/ui/components/Dashboard/Charts/AppUsageAgeDistribution/AppUsageAgeDistributionRadialChart';
import { CardIssuancePieChart } from '@/ui/components/Dashboard/Charts/CardIssuance/CardIssuancePieChart';
import { CardTypesPieChart } from '@/ui/components/Dashboard/Charts/CardTypes/CardTypesPieChart';
// import { CardTypesPieChart } from '@/ui/components/Dashboard/Charts/CardTypes/CardTypesPieChart';
// import { NewAccountsAreaChart } from '@/ui/components/Dashboard/Charts/NewAccounts/NewAccountsAreaChart';
import { OnboardingChannelPieChart } from '@/ui/components/Dashboard/Charts/OnboardingChannel/OnboardingChannelPieChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Charts/RegistrationRequestsOverview/RegistrationRequestsAreaChart';
// import { SignupFailureRateAreaChart } from '@/ui/components/Dashboard/Charts/SignupFailureRate/SignupFailureRateAreaChart';
import { SignupStageBarChart } from '@/ui/components/Dashboard/Charts/SignupStage/SignupStageBarChart';
import { SignupStageHighestBarChart } from '@/ui/components/Dashboard/Charts/SignupStage/SignupStageHighestBarChart';
import DistrictBreakdownBarChart from '@/ui/components/Dashboard/Charts/UserRegionalBreakdown/DistrictBreakdownBarChart';
import UserRegionalBreakdownBarChart from '@/ui/components/Dashboard/Charts/UserRegionalBreakdown/UserRegionalBreakdownBarChart';

export default function Charts() {
  return (
    <div className="flex flex-col gap-3 m-3">
      <RegistrationRequestsAreaChart />
      <div className="w-[99.9%] flex gap-3">
        <div className="w-[32%]">
          <CardTypesPieChart />
        </div>
        <div className="w-[35%]">
          <OnboardingChannelPieChart />
        </div>
        <div className="w-[32%]">
          <AppUsageAgeDistributionRadialChart />
        </div>
      </div>
      {/* New chart comming here */}
      <div className="flex items-center">
        <CardIssuancePieChart />
      </div>
      <div className="flex gap-3">
        <SignupStageBarChart />
        <SignupStageHighestBarChart />
        {/* <SignupFailureRateAreaChart /> */}
      </div>
      <div className="flex items-center">
        <UserRegionalBreakdownBarChart />
      </div>
      <div className="flex items-center">
        <DistrictBreakdownBarChart />
      </div>
    </div>
  );
}
