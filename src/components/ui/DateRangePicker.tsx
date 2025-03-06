'use client';

import * as React from 'react';
import { format, isSameMonth } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps {
  onDateChange: (start: string, end: string) => void;
}

export default function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const jumpToToday = () => {
    setCurrentMonth(new Date());
  };

  const isCurrentMonthDisplayed = isSameMonth(currentMonth, new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-start text-left font-normal rounded-full cursor-pointer"
        >
          <CalendarIcon className="mr-2 h-4 w-4 " />
          <span>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              'Pick a date range'
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          showOutsideDays={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            if (newDate?.from && newDate?.to) {
              onDateChange(format(newDate.from, 'yyyy-MM-dd'), format(newDate.to, 'yyyy-MM-dd'));
            }
          }}
          numberOfMonths={2}
        />
        {!isCurrentMonthDisplayed && (
          <div className="flex justify-end p-2 border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={jumpToToday}
              className="text-xs rounded-full cursor-pointer"
            >
              Today
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
