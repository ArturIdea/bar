import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AgentDashboardAccessLogTable } from './AgentDashboardAccessLogTable';
import { AgentsTable } from './AgentsTable';
import AgentTableFilterBar from './AgentTableFilterBar';

const AgentTabs = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'log'>('list');
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [excludeZeroUsers, setExcludeZeroUsers] = useState(true);
  const [sortBy, setSortBy] = useState('firstName');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const t = useTranslations();

  const sortOptions = [
    { value: 'fullName', label: 'Name' },
    { value: 'totalRequests', label: 'Total Users' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearch(inputValue);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex justify-between border-b ml-3">
        <div className="flex">
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer ${activeTab === 'list' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('list')}
          >
            Agent List
          </button>
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer ${activeTab === 'log' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('log')}
          >
            Agent Dashboard Access Log
          </button>
        </div>
        <AgentTableFilterBar
          inputValue={inputValue}
          onInputChange={handleSearchChange}
          onSearch={handleSearch}
          handleSearchKeyDown={handleSearchKeyDown}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          excludeZeroUsers={excludeZeroUsers}
          setExcludeZeroUsers={setExcludeZeroUsers}
          sortOptions={sortOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isSortDropdownOpen={isSortDropdownOpen}
          setIsSortDropdownOpen={setIsSortDropdownOpen}
          t={t}
        />
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'list' && (
          <AgentsTable
            search={search}
            excludeZeroUsers={excludeZeroUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        )}
        {activeTab === 'log' && (
          <AgentDashboardAccessLogTable
            search={search}
            excludeZeroUsers={excludeZeroUsers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            setSortBy={setSortBy}
          />
        )}
      </div>
    </div>
  );
};

export default AgentTabs;
