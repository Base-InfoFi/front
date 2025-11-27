"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserInfo = {
  address: string;
  displayName: string;
  isConnected: boolean;
};

type WalletContextType = {
  userInfo: UserInfo;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    address: "",
    displayName: "",
    isConnected: false,
  });

  useEffect(() => {
    // 페이지 로드 시 연결된 지갑 확인
    checkWalletConnection();
    
    // 지갑 변경 이벤트 리스너
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0] as string;
        const displayName = formatAddress(address);
        setUserInfo({
          address,
          displayName,
          isConnected: true,
        });
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setUserInfo({
        address: "",
        displayName: "",
        isConnected: false,
      });
    } else {
      const address = accounts[0];
      const displayName = formatAddress(address);
      setUserInfo({
        address,
        displayName,
        isConnected: true,
      });
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask 또는 다른 지갑 확장 프로그램을 설치해주세요.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0] as string;
        const displayName = formatAddress(address);
        setUserInfo({
          address,
          displayName,
          isConnected: true,
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        alert("지갑 연결이 거부되었습니다.");
      } else {
        alert("지갑 연결 중 오류가 발생했습니다.");
      }
    }
  };

  const disconnectWallet = () => {
    setUserInfo({
      address: "",
      displayName: "",
      isConnected: false,
    });
  };

  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <WalletContext.Provider value={{ userInfo, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}











