'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSignupErrorCategories } from '@/ui/hooks/ui/useSignupErrorCategories';
import { ExportDropdown } from '../../ExportDropdown';
import { useTranslations } from 'next-intl';

export function SignupErrorCategoriesBarChart() {
  const { data, loading, error } = useSignupErrorCategories();
  const t = useTranslations();

  // Flatten subcategories for chart
  const chartData = data.flatMap(cat =>
    cat.subcategories && cat.subcategories.length > 0
      ? cat.subcategories.map(sub => ({
          category: cat.name,
          name: sub.name,
          count: sub.count,
        }))
      : [{
          category: cat.name,
          name: cat.name,
          count: cat.count,
        }]
  );

  // Helper to truncate long names
  const truncate = (str: string, max: number) =>
    str.length > max ? `${str.slice(0, max - 1)}…` : str;

  // Prepare export data and label mapping
  const exportData = chartData.map(row => ({
    Category: row.category,
    Subcategory: row.name,
    Count: row.count,
  }));
  const labelMapping = {
    Category: 'Category',
    Subcategory: 'Subcategory',
    Count: 'Count',
  };

  return (
    <Card className="m-3 p-3 mt-0 bg-white shadow-none border-t-0 border-b-0 border-l-0 border-r-0 rounded-[24px]">
      <div className="flex justify-between items-center pr-8">
        <CardHeader>
          <CardTitle className='text-[#0B0B22] font-semibold text-[16px] leading-normal'>{t('Navbar.ErrorOnFailedFinalization')}</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <ExportDropdown
            chartData={exportData}
            fileName="Error For Failed Finalization"
            labelMapping={labelMapping}
          />
        </div>
      </div>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[25vh] w-full">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
          </div>
        )}
        {error && <p className="text-red-500 px-4">{error}</p>}
        {!loading && !error && (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
              barCategoryGap={16}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                dataKey="name"
                type="category"
                width={260}
                tick={({ x, y, payload }) => {
                  const fullText = payload.value;
                  const displayText = truncate(fullText, 50);
                  return (
                    <text x={x} y={y + 5} textAnchor="end" className='text-[#0B0B22] text-left font-normal text-[12px] leading-normal'>
                      <title>{fullText}</title>
                      {displayText}
                    </text>
                  );
                }}
              />
              <Tooltip
                cursor={{ fill: '#f5f5f5' }}
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) {
                    return null;
                  }
                  const { name, count } = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded text-xs">
                      <div className="font-bold mb-1" title={name}>{truncate(name, 150)}</div>
                      {/* <div className="text-gray-500 mb-1">Category: {category}</div> */}
                      <div>Count: <b>{count}</b></div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="count" fill="#08678E" barSize={24}>
                {/* <LabelList dataKey="count" position="right" /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 