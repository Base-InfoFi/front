"use client";

import { WalletProvider } from "@/contexts/WalletContext";
import { GlobalStateProvider } from "@/contexts/GlobalStateContext";
import { BaseAppProvider } from "@/contexts/BaseAppContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseAppProvider>
      <GlobalStateProvider>
        <WalletProvider>{children}</WalletProvider>
      </GlobalStateProvider>
    </BaseAppProvider>
  );
}
