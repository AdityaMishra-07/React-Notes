import { useState } from "react"
import AddTodo from "./AddTodo";
import TodoCart from "./TodoCart";

export default function Todo() {
    const [todoarr, setTodoarr] = useState([]);

    const handleTodo = (text) => {
        const todo = {
            id: Date.now(),
            title: text,
            status: text.length > 5 ? true : false,
        };
        const newTodo = [...todoarr, todo];
        setTodoarr(newTodo);

    }

    const handleToggle = (id) => {
        const newData = todoarr.map((todo) => {
            return todo.id == id ? { ...todo, status: !todo.status } : todo;
        });
        setTodoarr(newData);
    }

    const handleDelete = (id) => {
        const newData = todoarr.filter((todo) => todo.id != id);
        setTodoarr(newData);
    };

    return (
        <>
            <AddTodo handleTodo={handleTodo} />
            <hr />
            {todoarr.map((todo) => (
                <TodoCart todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />
            ))}
        </>
    );
}
