
// Tave Coin utilities for price simulation and calculations

const INITIAL_COIN_PRICE = 0.33; // Starting price: $0.33
const DAILY_BALANCE_INCREASE = 10000; // Daily balance increase: $10,000
const INITIAL_BALANCE = 150000; // Starting balance: $150,000
const DAILY_GROWTH_RATE = 0.015; // 1.5% daily growth rate

// Fixed reference date: 5 months before launch. This is pinned so the
// price and balance keep compounding forward over time based on the
// model (1.5%/day for price, +$10k/day for balance) instead of resetting.
const REFERENCE_DATE = new Date(2026, 1, 4); // Feb 4, 2026 (~5 months before launch)

// Fractional days since reference so price/balance tick smoothly, not in daily jumps.
const getDaysSinceReference = (): number => {
  const diffMs = Date.now() - REFERENCE_DATE.getTime();
  return diffMs / (1000 * 60 * 60 * 24);
};

// Calculate the current Tave Coin price based on elapsed time
export const getCurrentPrice = (): number => {
  const days = getDaysSinceReference();
  // Exponential growth formula
  return INITIAL_COIN_PRICE * Math.pow(1 + DAILY_GROWTH_RATE, days);
};

// Calculate the user's current balance
export const getCurrentBalance = (): number => {
  const days = getDaysSinceReference();
  return INITIAL_BALANCE + (days * DAILY_BALANCE_INCREASE);
};

// Convert USD to Tave Coins
export const usdToTave = (usdAmount: number): number => {
  const currentPrice = getCurrentPrice();
  return usdAmount / currentPrice;
};

// Convert Tave Coins to USD
export const taveToUsd = (taveAmount: number): number => {
  const currentPrice = getCurrentPrice();
  return taveAmount * currentPrice;
};

// Generate historical price data for the chart
export const getHistoricalPriceData = (days: number = 30): { date: string, price: number }[] => {
  const data: { date: string, price: number }[] = [];
  const currentDate = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    
    // Calculate price with exponential growth
    const price = INITIAL_COIN_PRICE * Math.pow(1 + DAILY_GROWTH_RATE, getDaysSinceReference() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(4))
    });
  }
  
  return data;
};

// Format a number as a currency string
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

// Format a large number with abbreviation (K, M, B)
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + 'B';
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};
