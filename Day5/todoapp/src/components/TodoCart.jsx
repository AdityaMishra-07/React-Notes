export default function TodoCart({ todo, handleToggle, handleDelete }) {
    const styles = {
        border: "1px solid black",
        padding: "20px",
        margin: "20px",
        textAlign: "center"
    }
    return (
        <div key={todo.id} style={styles}>
            <h4>Id: {todo.id}</h4>
            <h3>Title: {todo.title}</h3>
            <h3>Status: {todo.status ? "Completed" : "Not Completed"} </h3>
            <button onClick={() => handleToggle(todo.id)}>Toogle</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
    )
}