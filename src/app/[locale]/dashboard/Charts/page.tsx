import { AppUsageAgeDistributionRadialChart } from '@/ui/components/Dashboard/Graphs/AppUsageAgeDistribution/AppUsageAgeDistributionRadialChart';
import { CardTypesPieChart } from '@/ui/components/Dashboard/Graphs/CardTypes/CardTypesPieChart';
import { NewAccountsBarChart } from '@/ui/components/Dashboard/Graphs/NewAccounts/NewAccountsBarChart';
import { OnboardingChannelPieChart } from '@/ui/components/Dashboard/Graphs/OnboardingChannel/OnboardingChannelPieChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Graphs/RegistrationRequestsOverview/RegistrationRequestsAreaChart';

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
