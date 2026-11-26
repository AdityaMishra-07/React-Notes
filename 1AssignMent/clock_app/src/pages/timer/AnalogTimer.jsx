import { useState, useEffect, useRef } from "react";
// import { BiPause } from "react-icons/bi";
export default function AnalogTimer() {
    const [totalTime, setTotalTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef();
    const alarmRef = useRef(new Audio("/morning_flower.mp3"));
    const [showAlert, setShowAlert] = useState(false);

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    // timer effect
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            setShowAlert(true);
            alarmRef.current.play();
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // start Timer
    const handleStart = () => {
        const seconds = parseInt(inputRef.current.value);
        if (seconds > 0) {
            setTimeLeft(seconds);
            setTotalTime(seconds);
            setIsRunning(true);
        }
    };

    // Pause
    const handlePause = () => setIsRunning(false);

    // Reset
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setTotalTime(0);
        inputRef.current.value = "";
    }

    // circle progress
    const progress = circumference - (timeLeft / totalTime) * circumference;

    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <h3 className="text-2xl font-semibold">⏱ Ring Timer</h3>

            {/* Input */}
            <input
                type="number"
                placeholder="Enter Seconds"
                ref={inputRef}
                className="px-3 py-2 rounded-md text-white w-40 text-center border-2 border-white-900"
            />

            {/* Controls */}
            <div className="flex space-x-4">
                {!isRunning ? (
                    <button
                        onClick={handleStart}
                        className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={handlePause}
                        className="px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                    >
                        Pause
                    </button>
                )}

                <button
                    onClick={handleReset}
                    disabled={!isRunning && timeLeft === 0}
                    className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                >
                    Reset
                </button>
            </div>

            {/* Circular Timer */}
            {totalTime > 0 && (
                <div className="relative mt-4 w-52 h-52">
                    <svg className="w-full h-full">
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke="#eee"
                            strokeWidth="15"
                            fill="none"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke="#00f"
                            strokeWidth="15"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={progress}
                            strokeLinecap="round"
                            transform="rotate(-90 100 100)"
                        />
                        <text
                            x="100"
                            y="110"
                            textAnchor="middle"
                            fontSize="24"
                            fill="white"
                        >
                            {timeLeft} sec
                        </text>
                    </svg>
                </div>
            )}

            {/* Alert Modal */}
            {showAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg text-center space-y-4">
                        <h2 className="text-xl font-semibold">⏰ Time's up!</h2>
                        <button
                            onClick={() => {
                                alarmRef.current.pause();
                                alarmRef.current.currentTime = 0;
                                setShowAlert(false);
                            }}
                            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}