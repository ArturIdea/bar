import { CardTypesPieChart } from '@/ui/components/Dashboard/Graphs/CardTypes/CardTypesPieChart';
import { NewAccountsBarChart } from '@/ui/components/Dashboard/Graphs/NewAccounts/NewAccountsBarChart';
import { RegistrationRequestsAreaChart } from '@/ui/components/Dashboard/Graphs/RegistrationRequestsOverview/RegistrationRequestsAreaChart';

export default function Charts() {
  return (
    <div>
      <RegistrationRequestsAreaChart />
      <div className="flex">
        <NewAccountsBarChart />
        <CardTypesPieChart />
      </div>
    </div>
  );
}
