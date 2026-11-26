import { LuFlagTriangleRight } from "react-icons/lu";
import { useState, useEffect } from "react";

export default function DigitalStopWatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    // timer
    useEffect(() => {
        if (isRunning) {
            const start = Date.now() - time;
            const timer = setInterval(() => {
                setTime(Date.now() - start);
            }, 10);
            return () => clearInterval(timer);
        }
    }, [isRunning]);
    // we  can also use  but previous one is more accurate
    //  useEffect(() => {
    //     let timer;
    //     if (isRunning) {
    //         timer = setInterval(() => {
    //             setTime((prev) => prev + 10);
    //         }, 10);
    //     }


    // Convert ms to mm:ss:ms
    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0") +
            ":" +
            String(milliseconds).padStart(2, "0")
        );
    };

    // Lap (Flag)
    const handleLap = () => {
        setLaps([...laps, time])
    }

    // Reset
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <h3 className="text-2xl font-semibold">⏱ Stopwatch</h3>

            <h1 className="text-5xl font-bold">{formatTime(time)}</h1>

            {/* Controls */}
            <div className="flex space-x-4">
                {!isRunning ? (
                    <button
                        onClick={() => setIsRunning(true)}
                        className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={() => setIsRunning(false)}
                        className="px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                    >
                        Pause
                    </button>
                )}

                <button
                    onClick={handleReset}
                    disabled={time === 0}
                    className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                >
                    Reset
                </button>

                <button
                    onClick={handleLap}
                    disabled={!isRunning}
                    className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition disabled:opacity-50 flex items-center space-x-1"
                >
                    <LuFlagTriangleRight /> <span>Lap</span>
                </button>
            </div>

            {/* Lap List */}
            {laps.length > 0 && (
                <div className="w-64 mt-4">
                    <h4 className="text-lg font-semibold mb-2">Laps</h4>
                    <ul className="space-y-1">
                        {laps.map((lap, index) => (
                            <li
                                key={index}
                                className="px-2 py-1 bg-gray-700 rounded-md flex justify-between"
                            >
                                <span>Lap {index + 1}</span>
                                <span>{formatTime(lap)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}