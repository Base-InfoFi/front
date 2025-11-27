"use client";

import { useEffect, useState } from "react";
import TopGainerTable from "./TopGainerTable";
import LeaderboardCards from "./LeaderboardCards";

type LeaderboardData = {
  userId: string;
  userHandle: string | null;
  userDisplayName: string | null;
  userWallet: string | null;
  userAvatarUrl: string | null;
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
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [availableProjects, setAvailableProjects] = useState<
    { slug: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeRange, selectedProject]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      let url = `${backendUrl}/api/leaderboard?timeRange=${timeRange}`;
      if (selectedProject !== "all") {
        url += `&projectSlug=${selectedProject}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboardData(data);

      // 프로젝트 목록 추출 (중복 제거)
      const projectMap = new Map<string, { slug: string; name: string }>(
        data.map((item: LeaderboardData) => [
          item.projectSlug,
          { slug: item.projectSlug, name: item.projectName },
        ])
      );

      const projects = Array.from(projectMap.values());
      setAvailableProjects(projects);
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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pre-TGE Mindshare Arena</h2>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          <option value="all">All Projects</option>
          {availableProjects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.name}
            </option>
          ))}
        </select>
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
