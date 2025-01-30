import { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const SignupRequestsFilterModal = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    statuses?: string[]
  ) => void;
}) => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string;
  }>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });

  const [pinfl, setPinfl] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleRangeChange = (ranges: any) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  const formatLocalDate = (date: Date) => date.toLocaleDateString('en-CA');

  const handleApply = () => {
    const createdAtFrom = dateRange.startDate ? formatLocalDate(dateRange.startDate) : undefined;
    const createdAtTo = dateRange.endDate ? formatLocalDate(dateRange.endDate) : undefined;

    let statuses: string[] | undefined;
    if (statusFilter === 'completed') {
      statuses = ['COMPLETED'];
    } else if (statusFilter === 'notCompleted') {
      statuses = [
        'CREATED',
        'OTP_SENT',
        'MOBILE_VERIFIED',
        'AGREEMENTS_ACCEPTED',
        'FACE_VERIFICATION_IN_PROGRESS',
        'VERIFICATION_COMPLETED',
        'VERIFICATION_FAILED',
        'FAILED_FINALIZATION',
        'NOT_ELIGIBLE',
      ];
    }

    onApply(createdAtFrom, createdAtTo, pinfl || undefined, statuses);
    onClose();
  };

  const handleClearFilters = () => {
    setDateRange({ startDate: undefined, endDate: undefined, key: 'selection' });
    setPinfl('');
    setStatusFilter('all');
    onApply(undefined, undefined, undefined, undefined);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50">
      <div className="bg-white w-[450px] rounded-4xl p-6 shadow-lg">
        <h2 className="text-center text-xl pb-4">Filter By:</h2>

        <div className="flex flex-col gap-6">
          {/* PINFL Input */}
          <div>
            <label className="text-gray-400 mb-2">Pinfl</label>
            <input
              value={pinfl}
              onChange={(e) => setPinfl(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-gray-400 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'completed' | 'notCompleted')
              }
              className="w-full border border-gray-300 rounded-xl p-2"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="relative">
            <label className="text-gray-400 mb-2">Date</label>
            <input
              type="text"
              value={
                dateRange.startDate && dateRange.endDate
                  ? `${formatLocalDate(dateRange.startDate)} - ${formatLocalDate(dateRange.endDate)}`
                  : ''
              }
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              readOnly
              className="w-full border border-gray-300 rounded-xl p-2 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-3">
          <button
            type="button"
            className="border-2 border-gray-300 px-4 py-2 rounded-full cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border-2 bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={handleApply}
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-full cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>

        {isDatePickerOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <DateRange
              ranges={[dateRange]}
              onChange={handleRangeChange}
              months={2}
              direction="horizontal"
              rangeColors={['#08678e']}
              showDateDisplay={false}
            />
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
