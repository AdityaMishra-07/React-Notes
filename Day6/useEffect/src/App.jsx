import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import Timers from "./components/Timers";
import { useState } from "react";

export default function App() {
  // const [showtimer, setShowtimer] = useState(false);
  return (
    <div>
      
      {/* 1. Loading and Error state: - useEffect Hook - 1[After Render Method ] */}
      {/* <Loading /> */}

      {/* 2. useEffect Hook -2  [ updating phase] */}
      {/* .Todo App using the useEffect hook [ Pagination task ] */}
      {/* <Pagination/> */}
      
      {/* 3. Timer  Unmount Phase*/}
    
    {/* <div className="App">
      {showtimer && <Timers />}
      <button onClick={() => setShowtimer(!showtimer)}>
        {showtimer ? "Hide Timer" : "show timer"}
      </button>
    </div> */}
 
    </div>
  );
}