// Anlog Clock
import { useClock } from "./DigitalClock";
export default function AnalogClock() {

    const { time, hours, minutes, seconds } = useClock();

    // Convert to degrees
    const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
    const minuteDeg = minutes * 6 + (seconds / 60) * 6;
    const secondDeg = seconds * 6;

    return (

        <div className="flex flex-col items-center justify-center h- bg-[black]">
            {/* Clock circle */}
            <div className="relative w-75 h-75 rounded-full border-4 border-gray-600 bg-[#111]">

                {/* Hour numbers 1-12 on the circle edge */}
                {[...Array(12)].map((_, i) => {
                    const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
                    // -90 so 12 is at top, numbers go clockwise
                    const radius = 124; // distance from center to border
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                        <div
                            key={i}
                            className="absolute text-white font-bold text-lg"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            {i + 1}
                        </div>
                    );
                })}

                {/* Hour hand */}
                <div
                    className="absolute w-2 h-20 bg-gray-400 top-16 left-35.5 origin-bottom rounded"
                    style={{ transform: `rotate(${hourDeg}deg)` }}
                ></div>

                {/* Minute hand */}
                <div
                    className="absolute w-1 h-28 bg-white top-8 left-36 origin-bottom rounded"
                    style={{ transform: `rotate(${minuteDeg}deg)` }}
                ></div>

                {/* Second hand */}
                <div
                    className="absolute w-0.5 h-32 bg-red-500 top-4 left-36.25 origin-bottom rounded"
                    style={{ transform: `rotate(${secondDeg}deg)` }}
                ></div>

            </div>

            {/* Digital time */}
            <h2 className="text-white mt-6 text-xl">{time}</h2>
        </div>


    );
}
