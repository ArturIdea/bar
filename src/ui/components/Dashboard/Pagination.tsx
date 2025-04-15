import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  pageSizeOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [20, 50, 70, 100],
}) => {
  const t = useTranslations();

  //useMemo to avoid recalculating the value on every render
  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{t('Pagination.showing')}</span>
        <select
          className="border border-gray-300 rounded-xl px-4 py-2"
          value={pageSize}
          onChange={onPageSizeChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>
          {t('Pagination.itemsOf')} {total} {t('Pagination.entries')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className={`px-3 py-1 ${page === 0 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
        >
          <ChevronLeft />
        </button>

        {(() => {
          const totalVisiblePages = 5;
          const startPage = Math.max(
            0,
            Math.min(page - Math.floor(totalVisiblePages / 2), totalPages - totalVisiblePages)
          );
          const endPage = Math.min(startPage + totalVisiblePages, totalPages);

          const pageButtons = [];
          if (startPage > 0) {
            pageButtons.push(
              <button
                key="start-ellipsis"
                type="button"
                onClick={() => onPageChange(0)}
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
                onClick={() => onPageChange(i)}
                className={`px-3 py-1 rounded-full ${
                  page === i ? 'bg-primary text-white' : ' text-primary cursor-pointer'
                }`}
              >
                {i + 1}
              </button>
            );
          }

          if (endPage < totalPages) {
            pageButtons.push(
              <span key="ellipsis-end" className="px-2">
                ...
              </span>,
              <button
                key="end-ellipsis"
                type="button"
                onClick={() => onPageChange(totalPages - 1)}
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
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className={`px-3 py-1 ${page === totalPages - 1 ? 'text-gray-300' : 'text-blue-600 cursor-pointer'}`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
