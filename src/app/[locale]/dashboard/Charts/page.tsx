import { AppUsageAgeDistributionRadialChart } from '@/ui/components/Dashboard/Charts/AppUsageAgeDistribution/AppUsageAgeDistributionRadialChart';
// import { CardTypesPieChart } from '@/ui/components/Dashboard/Charts/CardTypes/CardTypesPieChart';
import { NewAccountsAreaChart } from '@/ui/components/Dashboard/Charts/NewAccounts/NewAccountsAreaChart';
import { OnboardingChannelPieChart } from '@/ui/components/Dashboard/Charts/OnboardingChannel/OnboardingChannelPieChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Charts/RegistrationRequestsOverview/RegistrationRequestsAreaChart';

export default function Charts() {
  return (
    <div>
      <RegistrationRequestsAreaChart />
      <div className="flex">
        <NewAccountsAreaChart />
        {/* <CardTypesPieChart /> */}
      </div>
      <div className="flex items-center gap-2">
        <OnboardingChannelPieChart />
        <AppUsageAgeDistributionRadialChart />
      </div>
      {/* <div className="flex"> */}
      <OnboardingChannelPieChart />
      <AppUsageAgeDistributionRadialChart />
      {/* </div> */}
    </div>
  );
}
