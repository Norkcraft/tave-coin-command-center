
import { List } from "lucide-react";

const transactions = [
  { id: 1, type: "Deposit", amount: 50000, currency: "USD", date: "Apr 18, 2025" },
  { id: 2, type: "Conversion", amount: 20000, currency: "USD", date: "Apr 20, 2025" },
  { id: 3, type: "Tave Coin Buy", amount: 30000, currency: "TAVE", date: "Apr 21, 2025" },
  { id: 4, type: "Daily Bonus", amount: 10000, currency: "USD", date: "Apr 22, 2025" },
];

const TransactionHistory = () => (
  <div className="glass p-4 mt-6 border-0 rounded-lg shadow-md animate-fade-in">
    <div className="flex items-center gap-2 mb-3 text-sm text-gray-300 font-semibold">
      <List className="w-4 h-4" />
      Transaction History
    </div>
    <ul className="text-xs text-gray-200 space-y-2">
      {transactions.map(tx => (
        <li key={tx.id} className="flex justify-between border-b border-white/5 last:border-b-0 pb-1 last:pb-0">
          <span>
            <b>{tx.type}</b> <span className="text-gray-400">({tx.currency})</span>
          </span>
          <span className="font-mono">{tx.amount.toLocaleString()}</span>
          <span className="text-gray-400">{tx.date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionHistory;
