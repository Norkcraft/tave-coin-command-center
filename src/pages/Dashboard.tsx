
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import PriceChart from "@/components/PriceChart";
import CoinConverter from "@/components/CoinConverter";
import WithdrawButton from "@/components/WithdrawButton";
import CountdownTimer from "@/components/CountdownTimer";
import GrowthInfoTooltip from "@/components/GrowthInfoTooltip";
import RefreshButton from "@/components/RefreshButton";
import TransactionHistory from "@/components/TransactionHistory";
import DarkModeToggle from "@/components/DarkModeToggle";
import { getCurrentBalance, getCurrentPrice } from "@/utils/coinUtils";

// Manual balance + coin price refresh (lifted state)
const Dashboard = () => {
  const navigate = useNavigate();
  // For manual refresh, force rerender by changing version counter
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  // Handler for refresh
  const handleRefresh = () => setRefresh((v) => v + 1);

  return (
    <div className="min-h-screen bg-gradient-radial from-tave-950 to-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header and dark mode toggle */}
        <div className="flex items-center justify-between">
          <Header />
          <div className="flex items-center">
            <GrowthInfoTooltip />
            <DarkModeToggle />
          </div>
        </div>

        {/* Top info section: Countdown and Refresh */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mt-2">
          <CountdownTimer />
          <RefreshButton onRefresh={handleRefresh} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1 flex flex-col gap-6">
            <BalanceCard key={refresh} />
            <WithdrawButton />
            <CoinConverter />
            <TransactionHistory />
          </div>
          
          <div className="md:col-span-2">
            <PriceChart key={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
