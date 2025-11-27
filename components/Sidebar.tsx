"use client";

import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";

export default function Sidebar() {
  const { userInfo } = useWallet();

  const menuItems = [
    { name: "Pre-TGE Arena", path: "/" },
    { name: "Project Leaderboards", path: "/leaderboards" },
    { name: "Project Summary", path: "/summary" },
    { name: "Vote", path: "/vote" },
    { name: "X Posts", path: "/posts" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Airdrops", path: "/airdrops" },
    { name: "My Wallet", path: "/wallet" },
    { name: "Social Card", path: "/social-card" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl text-blue-300 font-bold">SHITFILTER</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`px-4 py-2 rounded-md cursor-pointer transition-colors
              text-gray-400 hover:text-white hover:bg-gray-800`}
            >
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        {userInfo.isConnected ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-sm font-bold">
                {userInfo.displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{userInfo.displayName}</div>
              <div className="text-xs text-gray-400">HOLDER</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm py-2">
            지갑을 연결해주세요
          </div>
        )}
      </div>
    </aside>
  );
}
