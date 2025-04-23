
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const isSuccessful = login(email, password);
      
      if (isSuccessful) {
        toast({
          title: "Login successful",
          description: "Welcome to the Tave Coin dashboard!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto glass rounded-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gradient mb-2">Tave Coin</h2>
        <p className="text-gray-400">Sign in to access your dashboard</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="bogdan@tave.com"
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-200">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
