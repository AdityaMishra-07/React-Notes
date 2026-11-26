// Timer.jsx
import { useState, useEffect } from "react";
function Timers() {
  const [time, setTime] = useState(10);

  useEffect(() => {
    console.log("hello from useEffect");
    const handleTimer = setInterval(() => {
      console.log("hello from timer", time);
      setTime((value) => {
        if (value == 0) {
          clearInterval(handleTimer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    const cleanup = () => {
      console.log("clenup function called");
      clearInterval(handleTimer);
    };
    return cleanup;
  }, []);

  return <h1>Time: {time}</h1>;
}

export default Timers;