
import { RefreshCw } from "lucide-react";

const RefreshButton = ({ onRefresh }: { onRefresh: () => void }) => (
  <button
    onClick={onRefresh}
    className="ml-2 px-2 py-1 bg-black/10 text-xs rounded-md hover:bg-black/20 transition-colors flex items-center gap-1"
    aria-label="Refresh"
    title="Refresh Balance"
  >
    <RefreshCw className="w-4 h-4 animate-spin" />
    Refresh
  </button>
);

export default RefreshButton;
