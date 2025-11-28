"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type BaseAppContextType = {
  isInBaseApp: boolean;
};

const BaseAppContext = createContext<BaseAppContextType | undefined>(undefined);

export function BaseAppProvider({ children }: { children: ReactNode }) {
  const [isInBaseApp, setIsInBaseApp] = useState(false);

  useEffect(() => {
    // Base 앱 내에서 실행되는지 감지
    // 1. iframe 내부인지 확인
    const isInIframe = typeof window !== "undefined" && window.self !== window.top;
    
    // 2. Base 앱의 특정 전역 변수나 User-Agent 확인
    const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : "";
    const isBaseAppUserAgent = userAgent.includes("Base") || userAgent.includes("Farcaster");
    
    // 3. URL 파라미터 확인 (Base 앱이 전달할 수 있는 파라미터)
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const isBaseAppParam = urlParams?.has("baseApp") || urlParams?.has("farcaster");
    
    setIsInBaseApp(isInIframe || isBaseAppUserAgent || isBaseAppParam || false);
  }, []);

  return (
    <BaseAppContext.Provider value={{ isInBaseApp }}>
      {children}
    </BaseAppContext.Provider>
  );
}

export function useBaseApp() {
  const context = useContext(BaseAppContext);
  if (context === undefined) {
    throw new Error("useBaseApp must be used within a BaseAppProvider");
  }
  return context;
}

