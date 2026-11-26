export default function Stats({ total, completed, pending }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <p>TOTAL TASKS</p>
        <h2>{total}</h2>
      </div>

      <div className="stat-card">
        <p>COMPLETED</p>
        <h2>{completed}</h2>
      </div>

      <div className="stat-card">
        <p>PENDING</p>
        <h2>{pending}</h2>
      </div>
    </div>
  );
}
