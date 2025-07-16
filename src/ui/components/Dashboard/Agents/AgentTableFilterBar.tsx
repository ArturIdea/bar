import React from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

interface AgentTableFilterBarProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  excludeZeroUsers: boolean;
  setExcludeZeroUsers: (val: boolean) => void;
  sortOptions: { value: string; label: string }[];
  sortBy: string;
  setSortBy: (val: string) => void;
  isSortDropdownOpen: boolean;
  setIsSortDropdownOpen: (open: boolean) => void;
  t: any;
}

const AgentTableFilterBar: React.FC<AgentTableFilterBarProps> = ({
  inputValue,
  onInputChange,
  onSearch,
  handleSearchKeyDown,
  isFilterOpen,
  setIsFilterOpen,
  excludeZeroUsers,
  setExcludeZeroUsers,
  sortOptions,
  sortBy,
  setSortBy,
  isSortDropdownOpen,
  setIsSortDropdownOpen,
  t,
}) => {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          {/* Toggle for excludeZeroUsers */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setExcludeZeroUsers(!excludeZeroUsers)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
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
            <button type="button" className="cursor-pointer" onClick={onSearch}>
              <Search size={15} />
            </button>
            <input
              type="text"
              placeholder={t('Filter.searchPlaceHolder')}
              value={inputValue}
              onChange={onInputChange}
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
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H17"
                  stroke="#0B0B22"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="#0B0B22"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                <h3 className="text-lg font-semibold text-gray-700">{t('Filter.filterBy')}</h3>
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
                     {t('Agents.ExcludeAgentwithZeroUsers')}
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
                    <h3>{t('Agents.SortBy')}: </h3>
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
                            sortBy === option.value ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
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
  );
};

export default AgentTableFilterBar;
