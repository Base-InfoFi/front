"use client";

import { useState } from "react";

type LeaderboardData = {
  projectId: string;
  projectSlug: string;
  projectName: string;
  netScore: number;
  postCount: number;
  goodCount: number;
  shitCount: number;
  currentShare: number;
  deltaAbs: number;
  deltaRel: number;
};

type Props = {
  data: LeaderboardData[];
  loading: boolean;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
};

export default function LeaderboardCards({
  data,
  loading,
  timeRange,
  onTimeRangeChange,
}: Props) {
  const [selectedRange, setSelectedRange] = useState<"top20" | "top21-50" | "top51-100">("top20");

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  // currentShare를 퍼센트로 변환하고 정렬
  const sortedData = [...data]
    .map((item, index) => ({
      ...item,
      currentSharePercent: item.currentShare * 100,
      rank: index + 1,
    }))
    .sort((a, b) => b.currentSharePercent - a.currentSharePercent);

  // 범위별 데이터 필터링
  let displayData = sortedData;
  if (selectedRange === "top20") {
    displayData = sortedData.slice(0, 20);
  } else if (selectedRange === "top21-50") {
    displayData = sortedData.slice(20, 50);
  } else if (selectedRange === "top51-100") {
    displayData = sortedData.slice(50, 100);
  }

  // 간단한 라인 그래프 데이터 생성 (예시)
  const generateLineData = (share: number) => {
    const points = 10;
    const base = share * 0.8;
    const variation = share * 0.4;
    return Array.from({ length: points }, (_, i) => ({
      x: i,
      y: base + (Math.sin(i) * variation) / 2,
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
          See Creator Leaderboard
        </button>
        <div className="flex gap-2">
          <select
            defaultValue="all"
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm border border-gray-600"
          >
            <option value="all">All Languages</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm border border-gray-600"
          >
            <option value="all">All</option>
            <option value="24h">24H</option>
            <option value="7d">7D</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedRange("top20")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedRange === "top20"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Top20
        </button>
        <button
          onClick={() => setSelectedRange("top21-50")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedRange === "top21-50"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Top21-Top50
        </button>
        <button
          onClick={() => setSelectedRange("top51-100")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedRange === "top51-100"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Top51-Top100
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {displayData.map((item) => {
          const lineData = generateLineData(item.currentSharePercent);
          const isPositive = item.currentSharePercent > 0;
          const bgColor = isPositive ? "bg-green-600/20" : "bg-red-600/20";
          const borderColor = isPositive ? "border-green-500" : "border-red-500";

          return (
            <div
              key={item.projectId}
              className={`${bgColor} ${borderColor} border rounded-lg p-4 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                    {item.rank}
                  </div>
                  <span className="font-semibold text-sm">{item.projectName}</span>
                </div>
                <span className="text-sm font-bold">
                  {item.currentSharePercent.toFixed(2)}%
                </span>
              </div>

              {/* 간단한 라인 그래프 */}
              <div className="h-12 w-full mt-2 relative">
                <svg width="100%" height="100%" className="overflow-visible">
                  <polyline
                    points={lineData
                      .map((d, i) => `${(i / (lineData.length - 1)) * 100},${100 - (d.y / Math.max(...lineData.map(l => l.y))) * 100}`)
                      .join(" ")}
                    fill="none"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

