
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GrowthInfoTooltip = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="ml-2 cursor-pointer text-primary" tabIndex={0}>
        <Info className="w-4 h-4" aria-label="info" />
      </span>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="max-w-xs text-sm animate-fade-in">
      Tave Coin increases in value by <b>1.5% per day</b> (compounded), and your balance grows by <b>$10,000 daily</b>. All values are simulated.
    </TooltipContent>
  </Tooltip>
);

export default GrowthInfoTooltip;
