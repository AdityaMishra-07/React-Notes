import React from "react";
export default function FlipCardClock() {

    const today = new Date().toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",     // 5
        month: "short",      // September
        year: "numeric"     // 2025
    }).replace(",", "-");

    // AnimatedCard component
    const AnimatedCard = ({ animation, digit }) => (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );

    // StaticCard component
    const StaticCard = ({ position, digit }) => (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );

    // FlipUnitContainer component
    const FlipUnitContainer = ({ digit, shuffle, unit }) => {
        let currentDigit = digit;
        let previousDigit = digit - 1;

        // Handle negative
        if (unit !== "hours") {
            previousDigit = previousDigit === -1 ? 59 : previousDigit;
        } else {
            previousDigit = previousDigit === -1 ? 12 : previousDigit;
        }

        // Zero padding
        if (currentDigit < 10) currentDigit = `0${currentDigit}`;
        if (previousDigit < 10) previousDigit = `0${previousDigit}`;

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

    // Class component FlipClock
    class FlipClock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hours: 0,
                hoursShuffle: true,
                minutes: 0,
                minutesShuffle: true,
                seconds: 0,
                secondsShuffle: true,
                meridiem: "AM",
            };
        }

        componentDidMount() {
            this.timerID = setInterval(() => this.updateTime(), 1000);
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        updateTime() {
            const time = new Date();
            let hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();

            const meridiem = hours >= 12 ? "PM" : "AM";
            // Convert 24h → 12h
            hours = hours % 12;
            if (hours === 0) hours = 12;

            if (hours !== this.state.hours) {
                this.setState({ hours, hoursShuffle: !this.state.hoursShuffle, meridiem });
            }
            if (minutes !== this.state.minutes) {
                this.setState({ minutes, minutesShuffle: !this.state.minutesShuffle });
            }
            if (seconds !== this.state.seconds) {
                this.setState({ seconds, secondsShuffle: !this.state.secondsShuffle });
            }
        }

        render() {
            const {
                hours,
                minutes,
                seconds,
                hoursShuffle,
                minutesShuffle,
                secondsShuffle,
                meridiem,
            } = this.state;

            return (
                // flipClock
                <div className="flex items-end justify-center space-x-4  ">
                    {/* space-x-4 */}

                    <div className="flex flex-col text-center">

                        <FlipUnitContainer
                            unit={"hours"}
                            digit={hours}
                            shuffle={hoursShuffle}
                            label="Hours"
                        />
                        <span class="text-white text-sm mt-1 font-mono">HOURS</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <FlipUnitContainer
                            unit={"minutes"}
                            digit={minutes}
                            shuffle={minutesShuffle}
                            label="Minutes"
                        />
                        <span class="text-white text-sm mt-1 font-mono">MINUTES</span>
                    </div>

                    <div className="flex flex-col text-center">
                        <FlipUnitContainer
                            unit={"seconds"}
                            digit={seconds}
                            shuffle={secondsShuffle}
                            label="Seconds"
                        />
                        <span class="text-white text-sm mt-1 font-mono">SECONDS</span>
                    </div>

                    {/* <div className=" bg-[#101010] flex flex-row  text-center -20 p-2 rounded-sm mb-6">
                        <span>{meridiem} /{ } {today}</span>
                    </div> */}


                </div>
            );
        }
    }

    return <FlipClock />;
}

