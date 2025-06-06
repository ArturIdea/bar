import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Search, X, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DotsVerticalIcon from '@/../public/images/icons/dashboard/dotsVertical.svg';
import { usePathname } from '@/i18n/routing';
import { useAgents } from '@/ui/hooks/ui/useAgents';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';
import { TableSkeleton } from '../TableSkeleton';
import ViewDetailsButton from '../ViewDetailsButton';
import AgentDetailsModal from './AgentDetailsModal';

export const AgentsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [excludeZeroUsers, setExcludeZeroUsers] = useState(true);
  const [sortBy, setSortBy] = useState('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const fromDate = useDateRangeStore((s) => s.fromDate);
  const toDate = useDateRangeStore((s) => s.toDate);
  const pathname = usePathname();

  const sortOptions = [
    { value: 'fullName', label: 'Name' },
    { value: 'totalRequests', label: 'Total Users' },
  ];

  const { agents, loading, error, pagination } = useAgents({
    search,
    excludeZeroUsers,
    page,
    size: 10,
    sort: `${sortBy},${sortDirection}`,
    fromDate,
    toDate,
  });
  const t = useTranslations();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearch(inputValue);
    setPage(0); // Reset to first page when searching
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSort = (column: string) => {
    const sortColumn = column === 'totalUsers' 
      ? 'totalRequests' 
      : column === 'name' 
        ? 'fullName' 
        : column;
    
    if (sortBy === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortColumn);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    const sortColumn = column === 'totalUsers' 
      ? 'totalRequests' 
      : column === 'name' 
        ? 'fullName' 
        : column;
    
    if (sortBy !== sortColumn) {
      return <ChevronDown size={16} className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <ArrowUp size={16} className="text-blue-600" /> : <ArrowDown size={16} className="text-blue-600" />;
  };

  if (loading) {
    return <TableSkeleton />;
  }

  const columns = [
    { key: 'name', label: t('UserManagement.name'), sortable: true },
    { key: 'pinfl', label: 'PINFL No' },
    { 
      key: 'totalUsers', 
      label: t('Agents.totalUsers'),
      sortable: true 
    },
    { key: 'totalFailedCases', label: t('Agents.totalFailedCases') },
    { key: 'dailyAvg', label: t('Agents.dailyAvg') },
    { key: 'action', label: 'Action' },
  ];

  return (
    <>
      {pathname === '/dashboard/user-management/baraka-agents' && (
        <>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <ArrowLeft /> {t('Buttons.back')}
              </Link>

              <div className="flex items-center gap-4 ">
                {/* Toggle for excludeZeroUsers */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setExcludeZeroUsers(!excludeZeroUsers)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      excludeZeroUsers ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        excludeZeroUsers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                  <button type="button" className="cursor-pointer" onClick={handleSearch}>
                    <Search size={15} />
                  </button>
                  <input
                    type="text"
                    placeholder={t('Filter.searchPlaceHolder')}
                    value={inputValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    className="outline-none bg-transparent text-sm placeholder:text-gray-400 placeholder:text-[14px]"
                  />
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M10 18H14"
                        stroke="#0B0B22"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 12H17"
                        stroke="#0B0B22"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 6H21"
                        stroke="#0B0B22"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Box */}
            {isFilterOpen && (
              <div className="fixed top-37 right-0 z-50">
                <div className="w-[300px]">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {t('Filter.filterBy')}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {/* Toggle for excludeZeroUsers */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Exclude Agent with Zero Users
                        </label>
                        <button
                          type="button"
                          onClick={() => setExcludeZeroUsers(!excludeZeroUsers)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            excludeZeroUsers ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              excludeZeroUsers ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {/* Sort Dropdown */}
                      <div className="relative">
                        <div className="flex justify-between items-center">
                          <h3>Sort by: </h3>
                          <button
                            type="button"
                            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                            className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 text-[10px] text-gray-700 hover:bg-gray-50"
                          >
                            {sortOptions.find((option) => option.value === sortBy)?.label}
                            <ChevronDown size={16} />
                          </button>
                        </div>

                        {isSortDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {sortOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setSortBy(option.value);
                                  setIsSortDropdownOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                  sortBy === option.value
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col border-t-0 border-b border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-gray-200">
          <h4 className="font-semibold text-[#0B0B22]">{t('Agents.title')} List</h4>
          <ViewDetailsButton href="/user-management/baraka-agents" />
        </div>

        {/* Error Message */}
        {/* {error && (
          <div className="px-6 py-4 text-red-500 text-sm">
            Failed to fetch agents. Please try again later.
          </div>
        )} */}

        {/* Table */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="border-t border-b border-gray-200 z-[999] ">
                <tr className="text-left text-gray-400 ">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-3 font-normal ${col.key === 'action' ? 'flex justify-end' : ''}`}
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
                  agents.map((agent: any) => (
                    <tr key={agent.userId} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">
                        {agent.firstName} {agent.lastName}
                      </td>
                      <td className="px-6 py-4 text-[#0B0B22] text-sm">{agent?.pinfl}</td>
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
                          onClick={() => toggleDropdown(agent.userId)}
                        >
                          <Image src={DotsVerticalIcon} alt="vertical dots" className="h-5 w-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen[agent.userId] && (
                          <div className="absolute right-16 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                              type="button"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setDropdownOpen({});
                              }}
                            >
                              View Agent Details
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      {error ? 'No data available' : 'No agents found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200">
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
                  const startPage = Math.max(
                    0,
                    Math.min(page - Math.floor(totalVisiblePages / 2), pagination.totalPages - totalVisiblePages)
                  );
                  const endPage = Math.min(startPage + totalVisiblePages, pagination.totalPages);

                  const pageButtons = [];
                  if (startPage > 0) {
                    pageButtons.push(
                      <button
                        key="start-ellipsis"
                        type="button"
                        onClick={() => setPage(0)}
                        className="px-3 py-1 rounded-full text-primary cursor-pointer"
                      >
                        1
                      </button>,
                      <span key="ellipsis-start" className="px-2">
                        ...
                      </span>
                    );
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

                  if (endPage < pagination.totalPages) {
                    pageButtons.push(
                      <span key="ellipsis-end" className="px-2">
                        ...
                      </span>,
                      <button
                        key="end-ellipsis"
                        type="button"
                        onClick={() => setPage(pagination.totalPages - 1)}
                        className="px-3 py-1 rounded-full text-primary cursor-pointer"
                      >
                        {pagination.totalPages}
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
