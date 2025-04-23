
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Banknote, BellDot } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Assume pending withdrawal fee for demo
const PENDING_FEE = true;

const WithdrawButton = () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    toast({
      title: "Withdrawal Notice",
      description: "Please deposit withdrawal fee of $1000 via your broker Ella Jerry.",
      variant: "default",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <Button
            className="w-full bg-gradient-to-br from-primary to-accent text-black font-semibold shadow-md hover:from-primary/90 hover:to-accent/90 flex items-center gap-2"
          >
            <Banknote className="mr-2" />
            Withdraw
            {PENDING_FEE && (
              <span className="absolute -top-2 -right-2">
                <BellDot className="text-red-500 w-5 h-5 animate-pulse" />
              </span>
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Withdrawal</DialogTitle>
          <DialogDescription>
            There's a $1000 withdrawal fee via broker Ella Jerry.<br />
            Please confirm to proceed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-to-br from-primary to-accent text-black font-semibold"
          >
            Confirm &amp; Show Instructions
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawButton;
