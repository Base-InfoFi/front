"use client";

import { WalletProvider } from "@/contexts/WalletContext";
import { GlobalStateProvider } from "@/contexts/GlobalStateContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalStateProvider>
      <WalletProvider>{children}</WalletProvider>
    </GlobalStateProvider>
  );
}
