
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentPrice, taveToUsd, usdToTave } from "@/utils/coinUtils";

const CoinConverter = () => {
  const [coinPrice, setCoinPrice] = useState(getCurrentPrice());
  const [taveAmount, setTaveAmount] = useState(1000);
  const [usdAmount, setUsdAmount] = useState(taveToUsd(1000));
  const [converting, setConverting] = useState<'tave' | 'usd'>('tave');

  useEffect(() => {
    // Update coin price every minute
    const intervalId = setInterval(() => {
      const newPrice = getCurrentPrice();
      setCoinPrice(newPrice);
      
      // Update values based on which field was last edited
      if (converting === 'tave') {
        setUsdAmount(taveToUsd(taveAmount));
      } else {
        setTaveAmount(usdToTave(usdAmount));
      }
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [taveAmount, usdAmount, converting]);

  const handleTaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setTaveAmount(value);
    setUsdAmount(taveToUsd(value));
    setConverting('tave');
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setUsdAmount(value);
    setTaveAmount(usdToTave(value));
    setConverting('usd');
  };

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-lg">Coin Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="tave-amount" className="text-sm text-gray-400">
            Tave Coin Amount
          </label>
          <div className="relative">
            <Input
              id="tave-amount"
              type="number"
              value={taveAmount}
              onChange={handleTaveChange}
              className="bg-white/5 border-white/10"
              min={0}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-400">
              TAVE
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="h-px w-1/3 bg-white/10"></div>
          <div className="mx-4 text-gray-400 text-sm">= </div>
          <div className="h-px w-1/3 bg-white/10"></div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="usd-amount" className="text-sm text-gray-400">
            USD Value
          </label>
          <div className="relative">
            <Input
              id="usd-amount"
              type="number"
              value={usdAmount}
              onChange={handleUsdChange}
              className="bg-white/5 border-white/10"
              min={0}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-400">
              USD
            </div>
          </div>
        </div>
        
        <div className="pt-2 text-center text-sm text-gray-400">
          Current Exchange Rate: 1 TAVE = ${coinPrice.toFixed(4)} USD
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinConverter;
