import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowDownToLine } from "lucide-react";
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

const DepositButton = () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    toast({
      title: "Deposit Instructions",
      description:
        "Please contact your broker Ella Jerry to initiate your deposit. A confirmation will appear once funds are received.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-primary/40 hover:bg-primary/10 flex items-center gap-2"
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Deposits are processed through your assigned broker. Continue to receive
            the deposit instructions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-to-br from-primary to-accent text-black font-semibold"
          >
            Continue
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositButton;