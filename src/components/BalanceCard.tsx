
import { useState, useEffect } from "react";
import { formatCurrency, getCurrentBalance, getCurrentPrice } from "@/utils/coinUtils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const BalanceCard = () => {
  const [balance, setBalance] = useState(getCurrentBalance());
  const [coinPrice, setCoinPrice] = useState(getCurrentPrice());
  const [taveCoins, setTaveCoins] = useState(0);
  
  // Update balance and coin price every minute
  useEffect(() => {
    const calculateValues = () => {
      const newBalance = getCurrentBalance();
      const newPrice = getCurrentPrice();
      setBalance(newBalance);
      setCoinPrice(newPrice);
      setTaveCoins(newBalance / newPrice);
    };
    
    // Calculate initial values
    calculateValues();
    
    // Set up interval for updates
    const intervalId = setInterval(calculateValues, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="glass overflow-hidden border-0">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Your Balance</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{formatCurrency(balance)}</span>
              <div className="ml-3 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-md flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +$10K/day
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <h4 className="text-xs text-gray-400 mb-1">Tave Coins</h4>
              <p className="font-medium text-lg">
                {taveCoins.toLocaleString(undefined, { maximumFractionDigits: 2 })} TAVE
              </p>
            </div>
            <div>
              <h4 className="text-xs text-gray-400 mb-1">Current Price</h4>
              <p className="font-medium text-lg">
                {formatCurrency(coinPrice)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
