import { useState, useEffect, memo } from "react";

const BlackFridayCountdown = memo(() => {
  const [bfTime, setBfTime] = useState("00:00:00");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setBfTime(`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`);
    };
    
    updateCountdown();
    const id = setInterval(updateCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  return <span aria-live="polite" aria-label={`Tempo restante: ${bfTime}`}>{bfTime}</span>;
});

BlackFridayCountdown.displayName = "BlackFridayCountdown";

export default BlackFridayCountdown;