import { AppUsageAgeDistributionRadialChart } from '@/ui/components/Dashboard/Charts/AppUsageAgeDistribution/AppUsageAgeDistributionRadialChart';
import { CardTypesPieChart } from '@/ui/components/Dashboard/Charts/CardTypes/CardTypesPieChart';
import { NewAccountsBarChart } from '@/ui/components/Dashboard/Charts/NewAccounts/NewAccountsBarChart';
import { OnboardingChannelPieChart } from '@/ui/components/Dashboard/Charts/OnboardingChannel/OnboardingChannelPieChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Charts/RegistrationRequestsOverview/RegistrationRequestsAreaChart';

export default function Charts() {
  return (
    <div>
      <RegistrationRequestsAreaChart />
      <div className="flex">
        <NewAccountsBarChart />
        <CardTypesPieChart />
      </div>
      <div className="flex">
        <OnboardingChannelPieChart />
        <AppUsageAgeDistributionRadialChart />
      </div>
    </div>
  );
}
