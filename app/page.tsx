import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { WalletProvider } from "@/contexts/WalletContext";

export default function Home() {
  return (
    <WalletProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <Dashboard />
          </main>
        </div>
      </div>
    </WalletProvider>
  );
}

