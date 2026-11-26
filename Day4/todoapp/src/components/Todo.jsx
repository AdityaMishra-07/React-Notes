import { useState } from "react"

export default function Todo() {
    const [text, setText] = useState("");
    console.log(text);
    const [todoarr, setTodoarr] = useState([]);
    console.log(todoarr)

    const styles = {
        border: "1px solid black",
        padding: "20px",
        margin: "20px",
        textAlign: "center"
    }
    const handleText = (e) => setText(e.target.value);

    const handleTodo = () => {
        const todo = {
            id: Date.now(),
            title: text,
            status: text.length > 5 ? true : false,
        };
        const newTodo = [...todoarr, todo];

        setTodoarr(newTodo);
        setText("")
    }


    return (
        <>
            {/* <p>{text}</p> */}
            <input
                type="text"
                value={text}
                placeholder="Enter title"
                onChange={handleText}
            />
            <button onClick={handleTodo} >Add-Todo</button>

            <hr />
            {todoarr.map((el) => (
                <div key={el.id} style={styles}>
                    <h4>Id: {el.id}</h4>
                    <h3>Title: {el.title}</h3>
                    <h3>Status: {el.status ? "Completed" : "Not Completed"} </h3>
                </div>
            ))}

        </>
    );
}