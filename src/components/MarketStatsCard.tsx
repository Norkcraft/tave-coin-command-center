import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Coins, Trophy } from "lucide-react";
import {
  get24hChange,
  get24hVolume,
  getAllTimeHigh,
  getMarketCap,
  formatCurrency,
  formatLargeNumber,
} from "@/utils/coinUtils";

const MarketStatsCard = () => {
  const [, force] = useState(0);

  useEffect(() => {
    const id = setInterval(() => force((v) => v + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const change = get24hChange();
  const positive = change >= 0;

  const stats = [
    {
      label: "24h Change",
      value: `${positive ? "+" : ""}${change.toFixed(2)}%`,
      icon: positive ? TrendingUp : TrendingDown,
      color: positive ? "text-green-400" : "text-red-400",
    },
    {
      label: "Market Cap",
      value: `$${formatLargeNumber(getMarketCap())}`,
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "24h Volume",
      value: `$${formatLargeNumber(get24hVolume())}`,
      icon: Coins,
      color: "text-accent",
    },
    {
      label: "All-Time High",
      value: formatCurrency(getAllTimeHigh()),
      icon: Trophy,
      color: "text-yellow-400",
    },
  ];

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="text-lg">Market Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                  {s.label}
                </div>
                <div className={`font-semibold ${s.color}`}>{s.value}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketStatsCard;