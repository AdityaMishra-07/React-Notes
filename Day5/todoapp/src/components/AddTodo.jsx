import { useState } from "react";
export default function AddTodo({ handleTodo }) {
  const [text, setText] = useState("");
  const handleText = (e) => setText(e.target.value);

  const handleClk = () => {
    handleTodo(text);
    setText("");
  };

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Enter title..."
        onChange={handleText}
      />
      <button onClick={handleClk}>Add-Todo</button>
    </>
  );
}
