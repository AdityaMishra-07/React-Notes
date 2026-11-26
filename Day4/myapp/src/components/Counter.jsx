import { useState } from "react"; // 1. import use state
export default function Counter() {
    const [count, setCount] = useState(0); // it is a state management => update actual value and update ui 
    console.log(count);

    const add = () => {
        setCount(count + 1);
    }
    const reduce = () => {
        setCount(count - 1);
    }
    return (
        <>
            <h1>Counter : {count}</h1>
            <button onClick={add}>Add</button>
            <button onClick={reduce} disabled={count < 1}>Reduce</button>

        </>
    )
}
//  use state is function that return an array of teo ele
// first is actual value
// second  updater fucniton 