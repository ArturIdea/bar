'use client';

import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import { Check, ChevronDown } from 'lucide-react';
import DateRangePicker from '@/components/ui/DateRangePicker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DateRangeOption = 'day' | 'week' | 'month' | 'custom';

interface DateRangeSelectorProps {
  onDateChange: (fromDate: string, toDate: string) => void;
}

export function DateRangeSelector({ onDateChange }: DateRangeSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<DateRangeOption>('month');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  // Update dates based on selected option
  useEffect(() => {
    const today = new Date();
    let fromDate: string;
    let toDate: string;

    switch (selectedOption) {
      case 'day':
        // today
        fromDate = format(subDays(today, 1), 'yyyy-MM-dd');
        toDate = format(today, 'yyyy-MM-dd');
        onDateChange(fromDate, toDate);
        setShowCustomPicker(false);
        break;

      case 'week':
        // last 7 days
        fromDate = format(subDays(today, 7), 'yyyy-MM-dd');
        toDate = format(today, 'yyyy-MM-dd');
        onDateChange(fromDate, toDate);
        setShowCustomPicker(false);
        break;

      case 'month':
        // last 31 days
        fromDate = format(subDays(today, 31), 'yyyy-MM-dd');
        toDate = format(today, 'yyyy-MM-dd');
        onDateChange(fromDate, toDate);
        setShowCustomPicker(false);
        break;
      case 'custom':
        setShowCustomPicker(true);
        break;
    }
  }, [selectedOption, onDateChange]);

  return (
    <div className="flex items-center gap-2">
      {showCustomPicker && (
        <DateRangePicker
          onDateChange={(start, end) => {
            onDateChange(start, end);
          }}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          {selectedOption === 'day' && 'Day'}
          {selectedOption === 'week' && 'Week'}
          {selectedOption === 'month' && 'Month'}
          {selectedOption === 'custom' && 'Custom'}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setSelectedOption('day')}
            className="flex justify-between cursor-pointer"
          >
            Day {selectedOption === 'day' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedOption('week')}
            className="flex justify-between cursor-pointer"
          >
            Week {selectedOption === 'week' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedOption('month')}
            className="flex justify-between cursor-pointer"
          >
            Month {selectedOption === 'month' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedOption('custom')}
            className="flex justify-between cursor-pointer"
          >
            Custom {selectedOption === 'custom' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
