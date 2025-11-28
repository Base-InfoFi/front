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
    if (typeof window === "undefined") return;
    
    // 1. iframe 내부인지 확인 (가장 확실한 방법)
    let isInIframe = false;
    try {
      isInIframe = window.self !== window.top;
    } catch (e) {
      // cross-origin iframe의 경우 접근이 차단되므로 에러가 발생
      // 이 경우도 iframe 내부로 간주
      isInIframe = true;
    }
    
    // 2. referrer 확인 (Base 앱에서 오는 경우)
    const referrer = document.referrer;
    const isBaseAppReferrer = referrer.includes("base.org") || 
                              referrer.includes("base.dev") || 
                              referrer.includes("farcaster");
    
    // 3. User-Agent 확인
    const userAgent = window.navigator.userAgent;
    const isBaseAppUserAgent = userAgent.includes("Base") || 
                               userAgent.includes("Farcaster") ||
                               userAgent.includes("Warpcast");
    
    // 4. URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const isBaseAppParam = urlParams.has("baseApp") || 
                          urlParams.has("farcaster") ||
                          urlParams.has("warpcast");
    
    // 5. window.parent 확인 (더 강력한 iframe 감지)
    let isInIframeParent = false;
    try {
      isInIframeParent = window.parent !== window;
    } catch (e) {
      isInIframeParent = true;
    }
    
    // 6. 화면 크기로 모바일 환경 감지 (Base 앱은 주로 모바일)
    const isMobileSize = window.innerWidth < 768;
    
    // 7. Base 앱의 특정 전역 변수 확인
    const hasBaseAppGlobal = typeof (window as any).base !== "undefined" || 
                             typeof (window as any).farcaster !== "undefined";
    
    const detected = isInIframe || 
                     isInIframeParent || 
                     isBaseAppReferrer || 
                     isBaseAppUserAgent || 
                     isBaseAppParam ||
                     hasBaseAppGlobal ||
                     (isMobileSize && (isInIframe || isInIframeParent));
    
    console.log("Base App Detection:", {
      isInIframe,
      isInIframeParent,
      isBaseAppReferrer,
      isBaseAppUserAgent,
      isBaseAppParam,
      hasBaseAppGlobal,
      isMobileSize,
      detected,
      referrer,
      userAgent,
      windowWidth: window.innerWidth,
    });
    
    setIsInBaseApp(detected);
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

