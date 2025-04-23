import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import PriceChart from "@/components/PriceChart";
import CoinConverter from "@/components/CoinConverter";
import WithdrawButton from "@/components/WithdrawButton";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-radial from-tave-950 to-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <BalanceCard />
              <WithdrawButton />
              <CoinConverter />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <PriceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
