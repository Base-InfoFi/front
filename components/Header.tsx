"use client";

import { useWallet } from "@/contexts/WalletContext";

export default function Header() {
  const { userInfo, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-end">
      {userInfo.isConnected ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-xs font-bold">
                {userInfo.displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium">{userInfo.displayName}</span>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
          >
            연결 해제
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
        >
          지갑 연결
        </button>
      )}
    </header>
  );
}








