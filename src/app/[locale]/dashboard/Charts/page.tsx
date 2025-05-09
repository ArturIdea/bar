import { AppUsageAgeDistributionRadialChart } from '@/ui/components/Dashboard/Charts/AppUsageAgeDistribution/AppUsageAgeDistributionRadialChart';
// import { CardTypesPieChart } from '@/ui/components/Dashboard/Charts/CardTypes/CardTypesPieChart';
import { NewAccountsAreaChart } from '@/ui/components/Dashboard/Charts/NewAccounts/NewAccountsAreaChart';
import { OnboardingChannelPieChart } from '@/ui/components/Dashboard/Charts/OnboardingChannel/OnboardingChannelPieChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Charts/RegistrationRequestsOverview/RegistrationRequestsAreaChart';
import { SignupStageBarChart } from '@/ui/components/Dashboard/Charts/SignupStage/SignupStageBarChart';

export default function Charts() {
  return (
    <div className="flex flex-col gap-6">
      <RegistrationRequestsAreaChart />
      <div className="flex">
        <NewAccountsAreaChart />
        {/* <CardTypesPieChart /> */}
      </div>
      <div className="flex items-center gap-2">
        <OnboardingChannelPieChart />
        <AppUsageAgeDistributionRadialChart />
      </div>
      <div>
        <SignupStageBarChart />
      </div>
    </div>
  );
}
