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
  barWidth?: number;
  colors?: { [key: string]: string };
  fromDate?: string;
  toDate?: string;
}

const PercentageBarGraph: React.FC<PercentageBarGraphProps> = ({
  data,
  title,
  width = 600,
  height = 400,
  barWidth = 60,
  colors,
}) => {
  const [hoveredItem, setHoveredItem] = useState<{ x: number; y: number; count: number; percentage: number } | null>(null);

  // Filter out 'total' and sort data by count (descending)
  const sortedData = [...data]
    .filter(item => item.classification.toLowerCase() !== 'total')
    .sort((a, b) => b.count - a.count);

  const defaultColors = {
    total: 'rgb(33, 87, 226)',
    successful: 'rgb(19, 171, 63)',
    failed: 'rgb(220, 27, 37)',
    dropped_off: 'rgb(255, 165, 0)',
    default: '#2196F3',
  };

  // Calculate maximum count for scaling (Y-axis)
  const maxCount = Math.max(...data.map((item) => item.count));

  // Define margins and graph area
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  // Calculate bar spacing
  const barSpacing = (graphWidth - sortedData.length * barWidth) / (sortedData.length + 4 );
  
  //Total Request
  const totalItem = data.find(item => item.classification === "total");

  return (
    <div className="bar-graph-container" style={{ width: `${width}px` }}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <div className="flex justify-end">Total Request : {totalItem?.count}</div>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y-axis */}
          <line x1={0} y1={0} x2={0} y2={graphHeight} stroke="#e3e0e0" strokeWidth="2" />

          {/* X-axis */}
          <line
            x1={0}
            y1={graphHeight}
            x2={graphWidth}
            y2={graphHeight}
            stroke="#e3e0e0"
            strokeWidth="2"
          />

          {/* Y-axis ticks and labels */}
          {[0, 25, 50, 75, 100].map((tick, index) => {
            const yPosition = graphHeight - (tick / 100) * graphHeight;
            return (
              <g key={`y-tick-${index}`}>
                <line
                  x1={-5}
                  y1={yPosition}
                  x2={0}
                  y2={yPosition}
                  stroke="#e3e0e0"
                  strokeWidth="1"
                />
                <text
                  x={-10}
                  y={yPosition + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#666"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {sortedData.map((item, index) => {
            const barColor = colors
              ? colors[item.classification] || colors.default || defaultColors.default
              : defaultColors[item.classification as keyof typeof defaultColors] ||
                defaultColors.default;

            const barHeightScaled = (item.count / maxCount) * graphHeight;
            const xPosition = barSpacing + index * (barWidth + barSpacing);
            const yPosition = graphHeight - barHeightScaled;

            return (
              <g key={item.classification}>
                {/* Bar */}
                <rect
                  x={xPosition}
                  y={yPosition}
                  width={barWidth}
                  height={barHeightScaled}
                  fill={barColor}
                  rx={3}
                  ry={3}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    if (svgRect) {
                      setHoveredItem({
                        x: rect.left - svgRect.left + rect.width / 2,
                        y: rect.top - svgRect.top,
                        count: item.count,
                        percentage: item.percentage
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                />

                {/* Bar Labels (Count and Percentage above bar) */}
                {/* {item.count > 0 && (
                  <text
                    x={xPosition + barWidth / 2}
                    y={yPosition - 5}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {item.count}
                  </text>
                )} */}
                {/* {item.percentage > 0 && (
                  <text
                    x={xPosition + barWidth / 2}
                    y={yPosition - 20}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="12"
                  >
                    {(item.percentage || 0).toFixed(0)}%
                  </text>
                )} */}

                {/* X-axis labels (Classification below bar) */}
                <text
                  x={xPosition + barWidth / 2}
                  y={graphHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {item.classification === 'dropped_off' ? 'ABANDONED' : item.classification.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hoveredItem && (
            <g className="tooltip" style={{ pointerEvents: 'none' }}>
              <rect
                x={hoveredItem.x - 60}
                y={hoveredItem.y - 45}
                width={120}
                height={40}
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="0.5"
                rx={4}
                ry={4}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
              <text
                x={hoveredItem.x}
                y={hoveredItem.y - 30}
                textAnchor="middle"
                fill="black"
                fontSize="12"
                style={{ fontWeight: 'bold' }}
              >
                Count: {hoveredItem.count}
              </text>
              <text
                x={hoveredItem.x}
                y={hoveredItem.y - 15}
                textAnchor="middle"
                fill="black"
                fontSize="12"
                style={{ fontWeight: 'bold' }}
              >
                Percentage: {hoveredItem.percentage.toFixed(1)}%
              </text>
            </g>
          )}

          {/* X-axis label */}
          {/* <text x={graphWidth / 2} y={graphHeight + 40} textAnchor="middle" fontSize="14" fill="#666">
            Classification
          </text> */}

          {/* Y-axis label */}
          {/* <text
            x={-graphHeight / 2}
            y={-40}
            transform="rotate(-90)"
            textAnchor="middle"
            fontSize="14"
            fill="#666"
          >
            Frequency of visit
          </text> */}
        </g>
      </svg>
    </div>
  );
};

export default PercentageBarGraph;
