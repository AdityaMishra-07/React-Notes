import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function TaskCard({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (editText.trim() === "") return;

    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="edit-section">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit your task..."
          />

          <div className="task-actions">
            <Button label="Save" variant="success" onClick={handleSave} />

            <Button label="Cancel" variant="secondary" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <>
          <div className="task-info">
            <div className="task-left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />

              <h3 className={todo.completed ? "completed-text" : ""}>
                {todo.text}
              </h3>
            </div>

            <span
              className={
                todo.completed ? "task-status completed" : "task-status pending"
              }
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="task-actions">
            <Button
              label="Edit"
              variant="primary"
              onClick={() => setIsEditing(true)}
            />

            <Button
              label="Delete"
              variant="danger"
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </>
      )}
    </div>
  );
}
