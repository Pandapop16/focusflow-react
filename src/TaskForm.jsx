function TaskForm ({inputValue, onInputChange, onAddTask, dateValue, onDateChange}) {
  return (
    <section className="card">
      <h2>Новая задача</h2>
      <input
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Введите задачу..."
      />
      <div className="date-wrapper">
        <label className="date-label">Дедлайн</label>
      <input
      type="date"
      value={dateValue}
      onChange={(e) => onDateChange(e.target.value)}
      />
      </div>
      <button onClick={onAddTask}>Добавить</button>
    </section>
  )
}

export default TaskForm