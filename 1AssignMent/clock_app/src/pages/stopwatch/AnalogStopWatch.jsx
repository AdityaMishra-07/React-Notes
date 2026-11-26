import React, { useState, useEffect, useRef, useMemo } from 'react';

const calculateAngles = (time) => {
    const totalSeconds = time / 1000;

    // 1. Main Seconds Hand (Red Hand)
    const secAngle = (totalSeconds % 60) * 6;

    // 2. Minutes Hand (Inner Sub-Dial)
    const minAngle = (totalSeconds / 1800) * 360;

    // 3. Digital Display Components
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (num) => num.toString().padStart(2, '0');
    const digitalTime = `${pad(minutes % 60)}:${pad(seconds)}:${pad(milliseconds)}`;

    return { secAngle, minAngle, digitalTime };
};

const Hand = ({ type, angle }) => {
    let lengthClass = '';
    let colorClass = 'bg-gray-800';
    let sizeClass = 'w-2'; // Default width

    if (type === 'second') {
        // ✅ Removed -mt and rebalanced height for perfect center pivot
        lengthClass = 'h-[46%] z-100';
        colorClass = 'bg-red-600';
        sizeClass = 'w-0.5';
    } else if (type === 'minute') {
        // ✅ Removed -mt and rebalanced height for perfect center pivot
        lengthClass = 'h-[25%] z-40';
        colorClass = 'bg-gray-800';
        sizeClass = 'w-1';
    }

    return (
        <div
            className={`absolute top-1/2 left-1/2 rounded-full transition-transform duration-100 ease-linear ${lengthClass} ${colorClass} ${sizeClass}`}
            style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                transformOrigin: 'bottom center',
            }}
        />
    );
};

// Component for the Start/Pause/Reset crowns
const CrownButton = ({ label, onClick, color, side }) => {
    // Fine-tuned positions to match the classic watch crown look
    const positionClasses = side === 'left'
        ? 'absolute top-[12%] left-[3%] transform -translate-y-1/2 -translate-x-full rotate-[-10deg]'
        : 'absolute top-[12%] right-[5%] transform -translate-y-1/2 translate-x-full rotate-[10deg]';

    const labelColor = label === 'Pause' ? 'bg-red-600' : (label === 'Start' ? 'bg-green-600' : (label === 'Resume' ? 'bg-green-600' : 'bg-gray-600'));

    return (
        <div className={positionClasses + ' flex items-center justify-center z-50'}>
            {/* The background visual crown element */}
            <div
                className="w-9 h-8 sm:w-10 sm:h-10 rounded-lg shadow-xl cursor-pointer "
                onClick={onClick}
            ></div>
            {/* The text label overlay */}
            <span
                className={`absolute text-white font-bold text-sm px-3 py-1 rounded-xl shadow-lg cursor-pointer transition duration-150 ${labelColor}`}
                style={{
                    // Rotate the label to match the aesthetic angle
                    transform: `rotate(${side === 'left' ? -40 : 40}deg)`,
                    // Fine-tuned placement relative to the crown
                    [side]: side === 'left' ? '45%' : '5%',
                    bottom: '5%'
                }}
                onClick={onClick}
            >
                {label}
            </span>
        </div>
    );
};

// Component for creating the tick marks and numbers
const TicksAndNumbers = ({ isInner = false }) => {
    // Outer dial: 60 ticks (6 degrees apart). Numbers at 5-second intervals.
    // Inner dial: 60 ticks (6 degrees apart). Numbers at 5-minute intervals.
    const numTicks = 60;
    const numIntervals = isInner ? 6 : 12; // 30 minutes total vs 60 seconds total
    const numStep = isInner ? 5 : 5;       // Number value step (5 or 5)
    const radius = isInner ? 28 : 43;      // Position of the numbers
    const tickLength = isInner ? 3 : 6;    // Length of the tick marks
    const fontSize = isInner ? 3 : 4.5;
    const numberOffset = isInner ? 37 : 42; // Radius for the number placement

    const getTickMark = (i) => {
        const isMainMark = i % 5 === 0;
        const y1 = 50 - numberOffset - (isMainMark ? tickLength : tickLength * 0.5);
        const y2 = 50 - numberOffset;

        return (
            <line
                key={`tick-${i}`}
                x1="50"
                y1={y1}
                x2="50"
                y2={y2}
                stroke={isMainMark ? '#333' : '#999'}
                strokeWidth={isInner ? (isMainMark ? 1 : 0.5) : (isMainMark ? 1 : 0.5)}
                transform={`rotate(${i * 6} 50 50)`}
            />
        );
    };

    const getNumber = (i) => {
        const value = (i * numStep);
        const rotationAngle = (i * 30); // 30 degrees per step (360/12)

        // Convert polar to cartesian coordinates for positioning
        const rad = ((rotationAngle - 90) * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);

        let textValue = value === 0 && !isInner ? '60' : value.toString();
        // Inner dial: start at 5, end at 30
        if (isInner) {
            textValue = value === 30 ? '30' : value === 0 ? '' : value.toString();
        }

        if (isInner && value === 0) return null; // Skip 0 on inner dial as it is 30 in the same place
        if (!isInner && value === 0) textValue = '60';

        return (
            <text
                key={`num-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#333"
                fontSize={fontSize}
                fontWeight="500"
                // Counter-rotate the text by +90deg to keep it upright
                transform={`rotate(${x} ${y})`}
            >
                {textValue}
            </text>
        );
    };

    // SVG transform is used to rotate the entire group for the inner dial
    const innerRotation = isInner ? 'rotate(-90 50 50)' : '';

    return (
        <g transform={innerRotation}>
            {/* Ticks */}
            {[...Array(numTicks)].map((_, i) => getTickMark(i))}
            {/* Numbers - Iterate over the 12/6 main sections */}
            {[...Array(numIntervals + 1)].map((_, i) => getNumber(i))}
        </g>
    );
};

const App = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);
    const startTimeRef = useRef(0);

    // Timer logic using setInterval
    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now();

            timerRef.current = setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime + (Date.now() - startTimeRef.current);
                    startTimeRef.current = Date.now();
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    // Handlers
    const handleStartPause = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - time; // Adjust start time for resumption
        }
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        clearInterval(timerRef.current);
    };

    // Calculate angles and digital time
    const { secAngle, minAngle, digitalTime } = useMemo(() => calculateAngles(time), [time]);

    const startPauseLabel = isRunning ? 'Pause' : (time > 0 ? 'Resume' : 'Start');

    return (
        <div className="min-h-screen  flex flex-col items-center justify-center p-4 font-sans">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wider">Analog Stopwatch</h1>

            <div className="relative w-88 h-88 sm:w-104 sm:h-104 bg-gray-600 rounded-full flex items-center justify-center shadow-2xl  border-5 border-gray-800" >

                {/* Main Watch Body */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 bg-gray-200 rounded-full shadow-2xl p-4 border-4 border-gray-800">

                    {/* Crown Buttons */}
                    <CrownButton
                        label={startPauseLabel}
                        onClick={handleStartPause}
                        color="" // Color determined internally
                        side="left"
                    />
                    <CrownButton
                        label="Restart"
                        onClick={handleReset}
                        color=""
                        side="right"
                    />

                    {/* Analog Clock Face (SVG) */}
                    <svg
                        className="absolute inset-0 w-full h-full p-2"
                        viewBox="0 0 100 100"
                    >
                        {/* Main Dial Ticks and Numbers (60 seconds) */}
                        <TicksAndNumbers isInner={false} />

                        {/* Inner Sub-Dial Area - Container Circle */}
                        <circle cx="50" cy="50" r="22" fill="#fff" stroke="#999" strokeWidth="0.5" />

                        {/* Inner Sub-Dial Ticks and Numbers (30 minutes) */}
                        {/* The inner component handles its own rotation to put the 30/0 mark at the top */}
                        <TicksAndNumbers isInner={true} />

                        {/* Digital Display Area (Below the inner dial) */}
                        <rect x="35" y="65" width="30" height="7" rx="1.5" ry="1.5" fill="#fff" stroke="#666" strokeWidth="0.5" />

                        {/* Digital Time Text */}
                        <text
                            x="50"
                            y="69"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill="#333"
                            fontSize="5"
                            fontWeight="bold"
                        >
                            {digitalTime}
                        </text>

                        {/* Center Point */}
                        <circle cx="50" cy="50" r="0.75" fill="#333" className="z-50" />
                    </svg>

                    {/* Stopwatch Hands */}
                    <div className="absolute inset-0">
                        {/* Minutes Hand (Inner Sub-Dial) - Rotates around the center of the watch */}
                        <Hand type="minute" angle={minAngle} />

                        {/* Main Seconds Hand */}
                        <Hand type="second" angle={secAngle} />

                        {/* Center Cap for Main Dial */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
