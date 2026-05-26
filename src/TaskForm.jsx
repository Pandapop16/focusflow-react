function TaskForm ({inputValue, onInputChange, onAddTask, dateValue, onDateChange, timeValue, onTimeChange, priority, onPriorityChange}) {
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
      <div className="date-wrapper">
        <label className="date-label">Время</label>
        <input 
        type="time"
        value={timeValue}
        onChange={(e) => onTimeChange(e.target.value)}
        />
      </div>
      <div className="priority-wrapper">
        <label className="date-b=label">Приоритет</label>
        <div className="priority-buttons">
          <button
            type= "button"
            className={`priority-btn ${priority === 'high' ? 'active' : ''}`}
            onClick={() => onPriorityChange('high')}
            >🔴Высокий</button>

            <button
            type= "button"
            className={`priority-btn ${priority === 'medium' ? 'active' : ''}`}
            onClick={() => onPriorityChange('medium')}
            >🟡Средний</button>

            <button
            type= "button"
            className={`priority-btn ${priority === 'low' ? 'active' : ''}`}
            onClick={() => onPriorityChange('low')}
            >🟢Низкий</button>
        </div>
      </div>
      <button onClick={onAddTask}>Добавить</button>
    </section>
  )
}

export default TaskForm