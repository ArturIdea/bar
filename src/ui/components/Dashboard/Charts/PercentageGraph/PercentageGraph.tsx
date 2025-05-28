import React, { useState } from 'react';

import './PercentageBarGraph.css';

interface PercentageBarGraphProps {
  data: Array<{
    classification: string;
    percentage: number;
    count: number;
  }>;
  title?: string;
  width?: number;
  height?: number;
  barHeight?: number;
  colors?: { [key: string]: string };
  fromDate?: string;
  toDate?: string;
}

const PercentageBarGraph: React.FC<PercentageBarGraphProps> = ({
  data,
  title,
  width = 600,
  height = 400,
  barHeight = 30,
  colors,
//   fromDate,
//   toDate,
}) => {
  const [hoveredItem, setHoveredItem] = useState<{ x: number; y: number; count: number } | null>(null);

  // Filter out 'total' and sort data by percentage (descending)
  const sortedData = [...data]
    .filter(item => item.classification.toLowerCase() !== 'total')
    .sort((a, b) => b.percentage - a.percentage);

  const defaultColors = {
    total: 'rgb(33, 87, 226)',
    successful: 'rgb(19, 171, 63)',
    failed: 'rgb(220, 27, 37)',
    dropped_off: 'rgb(255, 165, 0)',
    default: '#2196F3',
  };

  // Calculate maximum percentage for scaling
  const maxPercentage = Math.max(...data.map((item) => item.percentage));

  return (
    <div className="bar-graph-container" style={{ width: `${width}px`, padding: '20px' }}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {/* {(fromDate || toDate) && (
        <div
          className="date-range"
          style={{
            display: 'flex',
            justifyContent: 'between',
            textAlign: 'center',
            marginBottom: '2px',
            color: '#666',
          }}
        >
          <div className="from-date mr-6">{fromDate ? formatDate(fromDate) : ''}</div>
          <div className="">-</div>
          <div className="to-date ml-6">{toDate ? formatDate(toDate) : ''}</div>
        </div>
      )} */}
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {/* Y-axis */}
        <line x1={50} y1={20} x2={50} y2={height - 50} stroke="#e3e0e0" strokeWidth="2" />

        {/* X-axis */}
        <line
          x1={50}
          y1={height - 50}
          x2={width - 20}
          y2={height - 50}
          stroke="#e3e0e0"
          strokeWidth="2"
        />

        {/* Y-axis labels */}
        {/* {[0, 25, 50, 75, 100].map((tick) => (
          <g key={`y-tick-${tick}`}>
            <line
              x1={45}
              y1={height - 50 - (tick * (height - 100)) / 100}
              x2={50}
              y2={height - 50 - (tick * (height - 100)) / 100}
              stroke="#e3e0e0"
              strokeWidth="1"
            />
            <text
              x={40}
              y={height - 50 - (tick * (height - 100)) / 100 + 5}
              textAnchor="end"
              fontSize="12"
              fill="#666"
            >
              {tick}%
            </text>
          </g>
        ))} */}

        {/* Bars */}
        {sortedData.map((item, index) => {
          const barColor = colors
            ? colors[item.classification] || colors.default || defaultColors.default
            : defaultColors[item.classification as keyof typeof defaultColors] ||
              defaultColors.default;

          const barLength = (item.percentage / maxPercentage) * (width - 100);
          const yPosition = 60 + index * (barHeight + 10);

          return (
            <g key={item.classification}>
              {/* Bar */}
              <rect
                x={50}
                y={yPosition}
                width={barLength}
                height={barHeight}
                fill={barColor}
                rx={3}
                ry={3}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredItem({
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                    count: item.count
                  });
                }}
                onMouseLeave={() => setHoveredItem(null)}
              />

              {/* Bar label */}
              <text
                x={55}
                y={yPosition + barHeight / 2 + 5}
                fill="#fff"
                fontSize="12"
                fontWeight="bold"
              >
                {item.classification.toUpperCase()} {(item.percentage || 0).toFixed(1)}%
              </text>

              {/* Count value at end of bar */}
              {item.count !== 0 && (
                <text
                  x={barLength + 55}
                  y={yPosition + barHeight / 2 + 5}
                  fill="#000"
                  fontSize="12"
                >
                  {item.count || 0}
                </text>
              )}
            </g>
          );
        })}

        {/* Tooltip */}
        {hoveredItem && (
          <g className="tooltip">
            <rect
              x={hoveredItem.x - 40}
              y={hoveredItem.y - 30}
              width={80}
              height={24}
              fill="rgba(0, 0, 0, 0.8)"
              rx={4}
              ry={4}
            />
            <text
              x={hoveredItem.x}
              y={hoveredItem.y - 15}
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              Count: {hoveredItem.count}
            </text>
          </g>
        )}

        {/* X-axis label */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="14" fill="#666">
          Percentage
        </text>

        {/* Y-axis label */}
        <text
          x={-height / 2}
          y={20}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="14"
          fill="#666"
        >
          Classification
        </text>
      </svg>
    </div>
  );
};

export default PercentageBarGraph;
