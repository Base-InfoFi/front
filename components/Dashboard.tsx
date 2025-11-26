"use client";

import { useEffect, useState } from "react";
import TopGainerTable from "./TopGainerTable";
import LeaderboardCards from "./LeaderboardCards";

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

export default function Dashboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeRange]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/api/leaderboard?timeRange=${timeRange}`);
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Pre-TGE Arena</h1>
        <div className="h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-lg flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-semibold mb-2">Pre-TGE Arena</h2>
            <p className="text-gray-200">Building the future of Web3</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Pre-TGE Mindshare Arena</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TopGainerTable data={leaderboardData} loading={loading} />
        </div>
        <div>
          <LeaderboardCards 
            data={leaderboardData} 
            loading={loading}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>
      </div>
    </div>
  );
}

