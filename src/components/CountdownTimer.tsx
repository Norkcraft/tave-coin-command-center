
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getNextResetTime() {
  // Next "day" at local midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow;
}

function getRemainingTime() {
  const now = new Date();
  const reset = getNextResetTime();
  let diff = reset.getTime() - now.getTime();
  if (diff < 0) diff = 0;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

const CountdownTimer = () => {
  const [time, setTime] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-1 text-xs text-gray-200 w-fit animate-fade-in">
      <Clock className="w-4 h-4 opacity-70" />
      <span>
        Next daily bonus in{" "}
        <span className="font-semibold">{`${time.hours.toString().padStart(2,"0")}:${time.minutes
          .toString()
          .padStart(2,"0")}:${time.seconds.toString().padStart(2,"0")}`}</span>
      </span>
    </div>
  );
};

export default CountdownTimer;
