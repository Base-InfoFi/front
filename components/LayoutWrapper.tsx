"use client";

import { useBaseApp } from "@/contexts/BaseAppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isInBaseApp } = useBaseApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 화면 크기로 모바일 감지 (추가 체크)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Base 앱 내에서 실행될 때 또는 모바일 크기일 때는 모바일 친화적인 레이아웃
  if (isInBaseApp || isMobile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* 모바일 헤더 */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 hover:bg-gray-800 rounded-lg"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-blue-300">SHITFILTER</h1>
          <div className="w-10" /> {/* 공간 맞추기 */}
        </header>

        {/* 사이드바 오버레이 (모바일) */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <h1 className="text-2xl text-blue-300 font-bold">SHITFILTER</h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-white p-2 hover:bg-gray-800 rounded-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
              </div>
            </aside>
          </>
        )}

        {/* 메인 콘텐츠 */}
        <main className="w-full">{children}</main>
      </div>
    );
  }

  // 웹에서는 기존 레이아웃 유지
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

