
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/utils/auth";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 md:p-6 glass rounded-xl mb-6">
      <div className="flex items-center">
        <div className="mr-4 h-10 w-10 bg-gradient-to-br from-primary to-tave-400 rounded-full flex items-center justify-center">
          <span className="font-bold text-lg text-black">T</span>
        </div>
        <h1 className="text-2xl font-bold text-gradient">Tave Coin</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-sm text-gray-400">Welcome back</p>
          <p className="font-medium">{user?.name || 'User'}</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="border-white/10 hover:bg-white/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
