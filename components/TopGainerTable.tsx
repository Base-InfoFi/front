"use client";

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

type Props = {
  data: LeaderboardData[];
  loading: boolean;
};

export default function TopGainerTable({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Top Gainer</h3>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  // currentShare를 퍼센트로 변환하고 정렬
  const sortedData = [...data]
    .map((item) => ({
      ...item,
      currentSharePercent: item.currentShare * 100,
    }))
    .sort((a, b) => b.currentSharePercent - a.currentSharePercent);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Top Gainer</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">Current</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">
                Δ1D (Absolute bps)
              </th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">
                Δ7D (Relative %)
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.slice(0, 10).map((item, index) => {
              const displayName = item.userDisplayName || item.userHandle || "Unknown";
              const displayInitial = displayName.charAt(0).toUpperCase();
              return (
                <tr
                  key={`${item.userId}-${item.projectId}`}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {item.userAvatarUrl ? (
                        <img
                          src={item.userAvatarUrl}
                          alt={displayName}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                          {displayInitial}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{displayName}</span>
                        <span className="text-xs text-gray-400">{item.projectName}</span>
                      </div>
                    </div>
                  </td>
                <td className="text-right py-3 px-4 font-semibold">
                  {item.currentSharePercent.toFixed(2)}%
                </td>
                <td className="text-right py-3 px-4 text-green-400">
                  ▲{Math.round(item.deltaAbs)}bps
                </td>
                <td className="text-right py-3 px-4 text-green-400">
                  ▲{item.deltaRel.toFixed(0)}%
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}








