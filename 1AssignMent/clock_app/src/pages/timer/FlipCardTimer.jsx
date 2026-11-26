import React, { useState, useEffect, useRef } from "react";

export default function FlipCardTimer() {
    // core states
    const [totalTime, setTotalTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef();
    const alarmRef = useRef(new Audio("/morning_flower.mp3"));
    const [showAlert, setShowAlert] = useState(false);

    // animation control & previous-digit storage
    const [hShuffle, setHShuffle] = useState(false);
    const [mShuffle, setMShuffle] = useState(false);
    const [sShuffle, setSShuffle] = useState(false);

    const [hActive, setHActive] = useState(false);
    const [mActive, setMActive] = useState(false);
    const [sActive, setSActive] = useState(false);

    const [prevH, setPrevH] = useState(0);
    const [prevM, setPrevM] = useState(0);
    const [prevS, setPrevS] = useState(0);

    const timeoutsRef = useRef([]); // to clear animation timeouts

    const ANIM_DUR = 650; // animation duration in ms (match your CSS animation)

    // helpers
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

    // FlipCard subcomponents (rely on your existing CSS classes)
    const AnimatedCard = ({ animation, digit }) => (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );

    const StaticCard = ({ position, digit }) => (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );

    const FlipUnitContainer = ({ digit, prevDigit, active, shuffle }) => {
        const currentDigit = pad(digit);
        const previousDigit = pad(prevDigit);

        // When active => render animated cards (show previous/current during flip)
        // When not active => render static both top & bottom as current (no weird prev values)
        if (!active) {
            return (
                <div className="flipUnitContainer">
                    <StaticCard position={"upperCard"} digit={currentDigit} />
                    <StaticCard position={"lowerCard"} digit={currentDigit} />
                </div>
            );
        }

        // active flip rendering (same as original flip logic)
        const digit1 = shuffle ? previousDigit : currentDigit;
        const digit2 = !shuffle ? previousDigit : currentDigit;
        const animation1 = shuffle ? "fold" : "unfold";
        const animation2 = !shuffle ? "fold" : "unfold";

        return (
            <div className="flipUnitContainer">
                <StaticCard position={"upperCard"} digit={currentDigit} />
                <StaticCard position={"lowerCard"} digit={previousDigit} />
                <AnimatedCard digit={digit1} animation={animation1} />
                <AnimatedCard digit={digit2} animation={animation2} />
            </div>
        );
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                handleStart();
            } else if (event.key === " ") {
                event.preventDefault(); // stop page scrolling
                handlePause();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [isRunning, timeLeft]);


    // timer effect: decrement timeLeft and capture previous/new H:M:S in the same tick
    useEffect(() => {
        let intervalId = null;

        if (isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                // use functional update so we get latest prev value
                setTimeLeft((prevTotal) => {
                    if (prevTotal <= 0) return 0;

                    const nextTotal = prevTotal - 1;

                    // compute H:M:S for prevTotal and nextTotal
                    const prevHVal = Math.floor(prevTotal / 3600);
                    const prevMVal = Math.floor((prevTotal % 3600) / 60);
                    const prevSVal = prevTotal % 60;

                    const newHVal = Math.floor(nextTotal / 3600);
                    const newMVal = Math.floor((nextTotal % 3600) / 60);
                    const newSVal = nextTotal % 60;

                    // seconds changed?
                    if (prevSVal !== newSVal) {
                        // store previous second for animation
                        setPrevS(prevSVal);
                        // toggle shuffle to change animation direction/frames
                        setSShuffle((s) => !s);
                        // mark active for animation rendering
                        setSActive(true);
                        // cleanup active after animation duration
                        const tId = setTimeout(() => setSActive(false), ANIM_DUR);
                        timeoutsRef.current.push(tId);
                    }

                    // minutes changed?
                    if (prevMVal !== newMVal) {
                        setPrevM(prevMVal);
                        setMShuffle((m) => !m);
                        setMActive(true);
                        const tId = setTimeout(() => setMActive(false), ANIM_DUR);
                        timeoutsRef.current.push(tId);
                    }

                    // hours changed?
                    if (prevHVal !== newHVal) {
                        setPrevH(prevHVal);
                        setHShuffle((h) => !h);
                        setHActive(true);
                        const tId = setTimeout(() => setHActive(false), ANIM_DUR);
                        timeoutsRef.current.push(tId);
                    }

                    return nextTotal;
                });
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            // finished
            setIsRunning(false);
            setShowAlert(true);
            try {
                alarmRef.current.play();
            } catch (e) {
                // ignore play errors (autoplay policy), user can click OK to stop later
            }
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
        // we intentionally depend on isRunning and timeLeft to start/stop interval
    }, [isRunning, timeLeft]);

    // clear any pending animation timeouts on unmount
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((id) => clearTimeout(id));
            timeoutsRef.current = [];
        };
    }, []);

    // start / pause / reset handlers
    const handleStart = () => {
        const seconds = parseInt(inputRef.current.value);
        if (!seconds || seconds <= 0) return;

        // initialize prev digits to current derived values so initial render doesn't animate
        const hVal = Math.floor(seconds / 3600);
        const mVal = Math.floor((seconds % 3600) / 60);
        const sVal = seconds % 60;
        setPrevH(hVal);
        setPrevM(mVal);
        setPrevS(sVal);

        // reset active flags
        setHActive(false);
        setMActive(false);
        setSActive(false);

        // clear previous timeouts
        timeoutsRef.current.forEach((id) => clearTimeout(id));
        timeoutsRef.current = [];

        setTimeLeft(seconds);
        setTotalTime(seconds);
        setIsRunning(true);
        setShowAlert(false);
    };

    const handlePause = () => setIsRunning(false);

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setTotalTime(0);
        inputRef.current.value = "";
        // clear pending timeouts and deactivate animations
        timeoutsRef.current.forEach((id) => clearTimeout(id));
        timeoutsRef.current = [];
        setHActive(false);
        setMActive(false);
        setSActive(false);
    };

    // derived H:M:S for display
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;


    // keybord button
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                // Start only if not already running and no active time
                if (!isRunning && timeLeft === 0) {
                    handleStart();
                }
            } else if (event.key === " ") {
                event.preventDefault(); // stop page scroll
                if (isRunning) {
                    handlePause();
                } else if (timeLeft > 0) {
                    setIsRunning(true); // resume
                }
            } else if (event.key.toLowerCase() === "r") {
                handleReset();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [isRunning, timeLeft]);




    // UI
    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <h3 className="text-2xl font-semibold">⏱ Flip Countdown Timer</h3>

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

            {/* Flip timer display */}
            {totalTime > 0 && (
                <div className="flex items-end justify-center space-x-4 mt-6">
                    <div className="flex flex-col text-center">
                        <FlipUnitContainer
                            unit="hours"
                            digit={hours}
                            prevDigit={prevH}
                            active={hActive}
                            shuffle={hShuffle}
                        />
                        <span className="text-white text-sm mt-1 font-mono">HOURS</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <FlipUnitContainer
                            unit="minutes"
                            digit={minutes}
                            prevDigit={prevM}
                            active={mActive}
                            shuffle={mShuffle}
                        />
                        <span className="text-white text-sm mt-1 font-mono">MINUTES</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <FlipUnitContainer
                            unit="seconds"
                            digit={seconds}
                            prevDigit={prevS}
                            active={sActive}
                            shuffle={sShuffle}
                        />
                        <span className="text-white text-sm mt-1 font-mono">SECONDS</span>
                    </div>
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
