import { useState, useEffect } from "react";
import "./../App.css";
import Input from "./Input";
import Button from "./Button";
import Stats from "./Stats";
import TaskCard from "./TaskCart";

export default function Todo() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [todoArr, setTodoArr] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todoArr");

      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }, [todoArr]);

  const total = todoArr.length;
  const completed = todoArr.filter((todo) => todo.completed).length;
  const pending = total - completed;

  function handleText(e) {
    setText(e.target.value);
  }
  function handleTodo() {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodoArr([...todoArr, newTodo]);
    setText("");
  }

  function handleToggle(id) {
    const updatedArr = todoArr.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodoArr(updatedArr);
  }

  function handleDelete(id) {
    const updatedArr = todoArr.filter((todo) => todo.id !== id);
    setTodoArr(updatedArr);
  }

  function handleEdit(id, updatedText) {
    const updatedArr = todoArr.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: updatedText,
        };
      }

      return todo;
    });

    setTodoArr(updatedArr);
  }

  const filteredTodos = todoArr.filter((todo) => {
    if (filter === "pending") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todo-container">
      {/* Header */}
      <div className="todo-header">
        <h1>My Tasks</h1>
        <p>Organize your day, one task at a time.</p>
      </div>

      {/* Statistics */}
      <Stats total={total} completed={completed} pending={pending} />

      {/* Add Todo */}
      <div className="add-section">
        <h3>Add a new task</h3>
        <Input
          value={text}
          placeholder="Enter your task..."
          onChange={handleText}
        />
        <Button label="Add Task" variant="primary" onClick={handleTodo} />
      </div>

      {/* Todo List */}
      <div className="task-section">
        <h2>Your Tasks</h2>

        {/* Filter Buttons */}
        <div className="filter-container">
          <Button
            label={`All (${total})`}
            variant={filter === "all" ? "primary" : "secondary"}
            onClick={() => setFilter("all")}
          />

          <Button
            label={`Pending (${pending})`}
            variant={filter === "pending" ? "primary" : "secondary"}
            onClick={() => setFilter("pending")}
          />

          <Button
            label={`Completed (${completed})`}
            variant={filter === "completed" ? "primary" : "secondary"}
            onClick={() => setFilter("completed")}
          />
        </div>

        {/* Filtered Task List */}
        {filteredTodos.map((todo) => (
          <TaskCard
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
        {filteredTodos.length === 0 && todoArr.length > 0 && (
          <p className="empty-filter">No tasks found for this filter.</p>
        )}
      </div>
    </div>
  );
}

// https://chatgpt.com/c/6b02658d-af94-83ee-a552-71b361c46a20?temporary-chat=true

// single page logic

// import { useState } from "react";
// export default function Todo() {
//   const [text, setText] = useState("");
//   const [todoArr, setTodoaArr] = useState([]);
//   const handleText = (e) => setText(e.target.value);

//   const handleTodo = () => {
//     if (text.trim() === "") return;

//     const todo = {
//       id: Date.now(),
//       title: text,
//       status: false,
//     };
//     setTodoaArr([...todoArr, todo]);
//     setText("");
//   };

//   const styles = {
//     border: "1px solid black",
//     padding: "20px",
//     margin: "20px",
//     textAlign: "center",
//   };

//   return (
//     <div>
//       <h1>My Todo</h1>
//       <div id="wrap">
//         <div>
//           <span>input Section</span>
//           <input
//             type="text"
//             value={text}
//             placeholder="Enter Title..."
//             onChange={handleText}
//           />
//           <button onClick={handleTodo}>Add Item</button>
//         </div>

//         <div>
//           <span>Cart section</span>
//           {todoArr.map((item) => (
//             <ul key={item.id} style={styles}>
//               <li>{item.id}</li>
//               <li>{item.title}</li>
//               <li>{item.status ? "Completed" : "Not Completed"}</li>
//             </ul>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
