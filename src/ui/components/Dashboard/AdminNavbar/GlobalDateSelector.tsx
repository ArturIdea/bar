'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Option = 'day' | 'week' | 'month';

interface Props {
  selected: Option;
  onChange: (opt: Option) => void;
}

export function DateRangeSelector({ selected, onChange }: Props) {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center bg-[#fff] text-[#0B0B22] gap-1 px-3 h-[43px] rounded-full border">
        {t(`Charts.${selected}`)} <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['day', 'week', 'month'] as Option[]).map((opt) => (
          <DropdownMenuItem
            key={opt}
            onClick={() => onChange(opt)}
            className="flex justify-between"
          >
            {t(`Charts.${opt}`)} {selected === opt && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
