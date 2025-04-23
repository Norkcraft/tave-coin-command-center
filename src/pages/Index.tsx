
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-tave-950 to-background p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tave-400/20 rounded-full filter blur-3xl animate-float opacity-30" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-float opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="h-20 w-20 bg-gradient-to-br from-primary to-tave-400 rounded-full flex items-center justify-center mx-auto glow">
              <span className="font-bold text-3xl text-primary-foreground">T</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Tave Coin</h1>
          <p className="text-gray-400">Command Center</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2025 Tave Coin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
