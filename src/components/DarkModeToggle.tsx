
import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const DarkModeToggle = () => {
  const [dark, setDark] = useDarkMode();

  return (
    <button
      aria-label="Dark Mode"
      className="ml-4 bg-black/10 text-white rounded-full p-2 hover:bg-black/20 transition-colors"
      onClick={() => setDark(!dark)}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;
