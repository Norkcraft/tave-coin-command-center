
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Banknote } from "lucide-react";

const WithdrawButton = () => {
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Notice",
      description: "Please deposit withdrawal fee of $1000 via your broker Ella Jerry.",
      variant: "default",
    });
  };

  return (
    <Button 
      onClick={handleWithdraw} 
      className="w-full bg-gradient-to-br from-primary to-accent text-black font-semibold shadow-md hover:from-primary/90 hover:to-accent/90 flex items-center gap-2"
    >
      <Banknote className="mr-2" />
      Withdraw
    </Button>
  );
};

export default WithdrawButton;
