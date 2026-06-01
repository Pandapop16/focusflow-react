function TaskForm({inputValue, onInputChange, onAddTask, dateValue, onDateChange, timeValue, onTimeChange, priority, onPriorityChange, formOpen, onToggleForm}) {
  return (
    <section className="card">
      <div className="form-header">
        <h2>Новая задача</h2>
        <button className="form-toggle-btn" onClick={onToggleForm}>
          {formOpen ? '✕' : '+'}
        </button>
      </div>

      <div className={`form-content ${formOpen ? 'form-open' : ''}`}>
        <label className="date-label">Название задачи <span style={{color: 'var(--color-accent)'}}>*</span></label>
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
        {dateValue && (
          <div className="date-wrapper">
            <label className="date-label">Время</label>
            <input
              type="time"
              value={timeValue}
              onChange={(e) => onTimeChange(e.target.value)}
            />
          </div>
        )}
        <div className="priority-wrapper">
          <label className="date-label">Приоритет</label>
          <div className="priority-buttons">
            <button type="button" className={`priority-btn ${priority === 'high' ? 'active' : ''}`} onClick={() => onPriorityChange('high')}>🔴 Высокий</button>
            <button type="button" className={`priority-btn ${priority === 'medium' ? 'active' : ''}`} onClick={() => onPriorityChange('medium')}>🟡 Средний</button>
            <button type="button" className={`priority-btn ${priority === 'low' ? 'active' : ''}`} onClick={() => onPriorityChange('low')}>🟢 Низкий</button>
          </div>
        </div>
        <button onClick={onAddTask}>Добавить</button>
      </div>
    </section>
  )
}

export default TaskForm