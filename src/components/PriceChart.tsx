
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHistoricalPriceData, formatCurrency } from "@/utils/coinUtils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  date: string;
  price: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg border border-white/10 text-sm">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-medium">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const PriceChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<number>(30); // Default to 30 days
  
  useEffect(() => {
    // Get historical data based on selected timeframe
    const data = getHistoricalPriceData(timeframe);
    setChartData(data);
    
    // Update chart every minute
    const intervalId = setInterval(() => {
      const updatedData = getHistoricalPriceData(timeframe);
      setChartData(updatedData);
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [timeframe]);

  const timeframeOptions = [
    { label: "7D", value: 7 },
    { label: "30D", value: 30 },
    { label: "90D", value: 90 },
  ];

  return (
    <Card className="glass border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Tave Coin Price</CardTitle>
        <div className="flex items-center space-x-1">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeframe(option.value)}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                timeframe === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8E9196', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8E9196', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                width={60}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone"
                dataKey="price"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#9b87f5' }}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {chartData.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Starting Price</p>
              <p className="font-medium">{formatCurrency(chartData[0]?.price || 0)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Current Price</p>
              <p className="font-medium text-green-400">{formatCurrency(chartData[chartData.length - 1]?.price || 0)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceChart;
