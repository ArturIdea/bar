import { useTranslations } from 'next-intl';
import { useAgents } from '@/ui/hooks/ui/useAgents';
import { TableSkeleton } from '../TableSkeleton';

export const AgentsTable: React.FC = () => {
  const { agents, loading, error } = useAgents();
  const t = useTranslations();

  if (loading) {
    return <TableSkeleton />;
  }

  const columns = [
    { key: 'name', label: t('UserManagement.name') },
    { key: 'totalUsers', label: t('Agents.totalUsers') },
    { key: 'totalFailedCases', label: t('Agents.totalFailedCases') },
    { key: 'dailyAvg', label: t('Agents.dailyAvg') },
  ];

  if (error) {
    return;
  }

  return (
    <div className="flex flex-col h-full border-t border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h4 className="font-semibold text-[#0B0B22]">{t('Agents.title')}</h4>

        {/* <ViewDetailsButton href="" /> */}
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-200 z-[999] ">
              <tr className="text-left text-gray-400 ">
                {columns.map((col) => (
                  <th key={col.key} className="lg:w-1/7 w-1/6 px-6 py-3 font-normal">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 lg:w-3/7 w-2/6" />
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="border-b border-gray-200">
              {agents.map((agent) => (
                <tr key={agent.userId} className={` hover:bg-neutral-50 transition-colors`}>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {agent.firstName} {agent.lastName}
                  </td>

                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {agent.totalRequests || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {agent.failedRequests || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-[#0B0B22] text-sm">
                    {agent.dailyAverageSuccessfulRequests || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
