// Digital Clock 
import { useState, useEffect } from "react";

export default function DigitalClock() {
  const { time, today } = useClock();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="clock text-[90px] font-bold tracking-[12px] text-transparent bg-clip-text 
                   bg-gradient-to-r from-gray-300 via-cyan-800 to-slate-400
                   font-[Orbitron] text-center cursor-pointer
                   max-sm:text-[10vw] ">{time}</h1>
      <h1>{today}</h1>

    </div>
  );
}

// bg - gradient - to - r from - purple - 600 via - pink - 500 to - cyan - 400 

export function useClock() {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Digital time formatted
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // const hours = 12;
  // const minutes = 0;
  // const seconds = 0;

  const today = new Date().toLocaleDateString(undefined, {
    day: "numeric",     // 5
    month: "short",      // September
    year: "numeric"     // 2025
  });

  return { time, hours, minutes, seconds, today };
}