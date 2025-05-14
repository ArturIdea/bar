'use client';

import { useEffect, useState } from 'react';
import { format, subDays, subMonths, subWeeks } from 'date-fns';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DateRangeOption = 'day' | 'week' | 'month';

interface DateRangeSelectorProps {
  onDateChange: (fromDate: string, toDate: string, granularity: DateRangeOption) => void;
}

export function DateRangeSelector({ onDateChange }: DateRangeSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<DateRangeOption>('month');
  const t = useTranslations();

  useEffect(() => {
    const today = new Date();
    let fromDate: string;

    switch (selectedOption) {
      case 'day':
        fromDate = format(subDays(today, 8), 'yyyy-MM-dd');
        break;
      case 'week':
        fromDate = format(subWeeks(today, 8), 'yyyy-MM-dd');
        break;
      case 'month':
        fromDate = format(subMonths(today, 11), 'yyyy-MM-01');
        break;
    }

    const toDate = format(today, 'yyyy-MM-dd');
    onDateChange(fromDate, toDate, selectedOption);
  }, [selectedOption, onDateChange]);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1 px-3 h-[40px] text-sm font-medium rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          {selectedOption === 'day' && t('Charts.day')}
          {selectedOption === 'week' && t('Charts.week')}
          {selectedOption === 'month' && t('Charts.month')}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setSelectedOption('day')}
            className="flex justify-between cursor-pointer"
          >
            {t('Charts.day')} {selectedOption === 'day' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedOption('week')}
            className="flex justify-between cursor-pointer"
          >
            {t('Charts.week')} {selectedOption === 'week' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSelectedOption('month')}
            className="flex justify-between cursor-pointer"
          >
            {t('Charts.month')} {selectedOption === 'month' && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
