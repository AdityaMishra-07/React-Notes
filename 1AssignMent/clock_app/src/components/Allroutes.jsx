import { Route, Routes } from "react-router-dom";

import DigitalClock from "../pages/clock/DigitalClock";
import FlipCardClock from "../pages/clock/FlipCardClock";
import AnalogClock from "../pages/clock/AnalogClock";

import DigitalStopWatch from "../pages/stopwatch/DigitalStopWatch";
import FlipCardStopWatch from "../pages/stopwatch/FlipCardStopWatch";
import AnalogStopWatch from "../pages/stopwatch/AnalogStopWatch";

import DigitalTimer from "../pages/timer/DigitalTimer";
import FlipCardTimer from "../pages/timer/FlipCardTimer";
import AnalogTimer from "../pages/timer/AnalogTimer";

export default function Allroutes() {
    return (
        <div>
            <Routes>
                <Route path="/clock" element={<DigitalClock />}></Route>
                <Route path="clock/card" element={<FlipCardClock />}></Route>
                <Route path="clock/analog" element={<AnalogClock />}></Route>

                <Route path="/stopWatch" element={<DigitalStopWatch />}></Route>
                <Route path="/stopWatch/card" element={<FlipCardStopWatch />}></Route>
                <Route path="/stopWatch/analog" element={<AnalogStopWatch />}></Route>

                <Route path="/timer" element={<DigitalTimer />}></Route>
                <Route path="/timer/card" element={<FlipCardTimer />}></Route>
                <Route path="/timer/analog" element={<AnalogTimer />}></Route>

                <Route path="*" element={<DigitalClock />}></Route>
            </Routes>
        </div>
    );
}