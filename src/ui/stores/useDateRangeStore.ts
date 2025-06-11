import { format, subDays, subMonths, subWeeks } from 'date-fns';
import { create } from 'zustand';

type Granularity = 'day' | 'week' | 'month';

interface DateRangeState {
  fromDate: string;
  toDate: string;
  granularity: Granularity;
  setRange: (g: Granularity) => void;
  setCustomDates: (from: string, to: string) => void;
}

export const useDateRangeStore = create<DateRangeState>((set) => {
  const today = new Date();
  const defaultTo = format(today, 'yyyy-MM-dd');
  const defaultFrom = format(subMonths(today, 1), 'yyyy-MM-01');

  return {
    fromDate: defaultFrom,
    toDate: defaultTo,
    granularity: 'month',

    setRange: (g) => {
      const now = new Date();
      const yesterday = subDays(now, 1);
      let start: Date;
      switch (g) {
        case 'day':
          start = subDays(now, 1);
          break;
        case 'week':
          start = subWeeks(now, 1);
          break;
        case 'month':
          start = subMonths(now, 1);
          break;
      }
      set({
        granularity: g,
        fromDate: format(start, g === 'month' ? 'yyyy-MM-01' : 'yyyy-MM-dd'),
        toDate: format(g === 'week' ? yesterday : now, 'yyyy-MM-dd'),
      });
    },

    setCustomDates: (from, to) => {
      set({ fromDate: from, toDate: to });
    },
  };
});
