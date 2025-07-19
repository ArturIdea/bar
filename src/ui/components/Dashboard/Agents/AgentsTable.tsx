import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, EyeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { useAgents } from '@/ui/hooks/ui/useAgents';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { TableSkeleton } from '../TableSkeleton';
import ViewDetailsButton from '../ViewDetailsButton';
import AgentDetailsModal from './AgentDetailsModal';
import ExportAgentsListDropdown from './ExportAgentsListDropdown';

interface AgentsTableProps {
  search: string;
  excludeZeroUsers: boolean;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (dir: 'asc' | 'desc') => void;
}

export const AgentsTable: React.FC<AgentsTableProps> = ({
  search,
  excludeZeroUsers,
  sortBy,
  sortDirection,
  setSortDirection,
}) => {
  const [page, setPage] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const pathname = usePathname();
  const t = useTranslations();

  const { agents, loading, error, pagination } = useAgents({
    search,
    excludeZeroUsers,
    page,
    size: 10,
    sort: `${sortBy},${sortDirection}`,
    fromDate,
    toDate,
  });

  const handleSort = (column: string) => {
    const sortColumn =
      column === 'totalUsers' ? 'totalRequests' : column === 'name' ? 'fullName' : column;

    if (sortBy === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    const sortColumn =
      column === 'totalUsers' ? 'totalRequests' : column === 'name' ? 'fullName' : column;

    if (sortBy !== sortColumn) {
      return <ChevronDown size={16} className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={16} className="text-blue-600" />
    ) : (
      <ArrowDown size={16} className="text-blue-600" />
    );
  };

  if (loading) {
    return <TableSkeleton />;
  }

  const columns = [
    { key: 'name', label: t('UserManagement.name'), sortable: true },
    { key: 'pinfl', label: t('Agents.PINFLNo') },
    {
      key: 'totalUsers',
      label: t('Agents.totalUsers'),
      sortable: true,
    },
    { key: 'totalFailedCases', label: t('Agents.totalFailedCases') },
    { key: 'dailyAvg', label: t('Agents.dailyAvg') },
    { key: 'action', label: t('Agents.Action') },
  ];

  return (
    <>
      <div className="flex flex-col m-3 p-3 bg-white rounded-[24px]">
        {/* Header */}
        {pathname === '/dashboard' && (
          <div className="flex items-center justify-between p-6 border-gray-200">
            <h4 className="font-semibold text-[#0B0B22]">{t('Agents.AgentList')}</h4>
            <div className="flex items-center gap-2">
              <ViewDetailsButton href="/user-management/baraka-agents" />
            </div>
          </div>
        )}
        {pathname === '/dashboard/user-management/baraka-agents' && (
          <div className="flex items-center justify-between p-6 border-gray-200">
            <h4 className="font-semibold text-[#0B0B22]">{t('Agents.AgentList')}</h4>
            <div className="flex items-center gap-2">
              {/* Export Dropdown */}
              <ExportAgentsListDropdown
                filters={{
                  search,
                  excludeZeroUsers,
                  fromDate,
                  toDate,
                }}
              />
            </div>
          </div>
        )}
        {/* Table */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-[#FAFAFA] rounded-[8px]">
                <tr className="text-left text-gray-400 ">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-3 font-normal ${col.key === 'action' ? 'flex justify-end' : ''} ${col.key === 'name' ? 'min-w-[180px]' : ''}`}
                    >
                      {col.sortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(col.key)}
                          className="flex items-center gap-1 hover:text-gray-600 w-full text-left group"
                        >
                          <span>{col.label}</span>
                          <span className="inline-flex items-center opacity-50 group-hover:opacity-100">
                            {getSortIcon(col.key)}
                          </span>
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {agents && agents.length > 0 ? (
                  agents.map((agent: any, index: number) => (
                    <tr
                      key={agent.userId || `agent-${index}`}
                      className="hover:bg-neutral-50 transition-colors border-b"
                    >
                      <td className="px-6 py-4 text-[#0B0B22] text-sm min-w-[200px]">
                        {agent.firstName || ''} {agent.lastName || ''}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{agent?.pinfl || 'N/A'}</td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {agent.totalRequests || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {agent.failedRequests || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {agent.dailyAverageSuccessfulRequests?.toFixed(2) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end relative">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <EyeIcon color="#0B0B22" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      {error ? t('Charts.NoDataAvailable') : t('Agents.NoAgentsFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="sticky bottom-0 bg-[#FAFAFA] rounded-[8px]">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{t('Pagination.showing')}</span>
                <select
                  className="border border-gray-300 rounded-xl px-4 py-2"
                  value={10}
                  onChange={(_e) => {
                    // TODO: Implement page size change
                  }}
                >
                  {[10, 20, 30, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>
                  {t('Pagination.itemsOf')} {pagination.totalElements} {t('Pagination.entries')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-1 ${page === 0 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
                >
                  <ChevronLeft />
                </button>

                {(() => {
                  const totalVisiblePages = 5;
                  const totalPages = pagination.totalPages;
                  let startPage = Math.max(0, page - Math.floor(totalVisiblePages / 2));
                  let endPage = startPage + totalVisiblePages;
                  if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(0, endPage - totalVisiblePages);
                  }

                  const pageButtons = [];
                  if (startPage > 0) {
                    pageButtons.push(
                      <button
                        key="first"
                        type="button"
                        onClick={() => setPage(0)}
                        className="px-3 py-1 rounded-full text-primary cursor-pointer"
                      >
                        1
                      </button>
                    );
                    if (startPage > 1) {
                      pageButtons.push(
                        <span key="ellipsis-start" className="px-2">
                          ...
                        </span>
                      );
                    }
                  }

                  for (let i = startPage; i < endPage; i++) {
                    pageButtons.push(
                      <button
                        type="button"
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-3 py-1 rounded-full ${
                          page === i ? 'bg-primary text-white' : 'text-primary cursor-pointer'
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pageButtons.push(
                        <span key="ellipsis-end" className="px-2">
                          ...
                        </span>
                      );
                    }
                    pageButtons.push(
                      <button
                        key="last"
                        type="button"
                        onClick={() => setPage(totalPages - 1)}
                        className="px-3 py-1 rounded-full text-primary cursor-pointer"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pageButtons;
                })()}

                <button
                  type="button"
                  disabled={page >= pagination.totalPages - 1}
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-1 ${page >= pagination.totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentDetailsModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </>
  );
};
