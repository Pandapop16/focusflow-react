function TaskList({ tasks, onToggle, onDelete, filter, onFilterChange }) {
  const filteredTasks = tasks.filter(function(task) {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  return (
    <section className="card">
      <h2>Задачи на сегодня</h2>

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('all')}
        >Все</button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('active')}
        >Активные</button>
        <button
          className={`filter-btn ${filter === 'done' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('done')}
        >Выполненные</button>
      </div>
        {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">✅</p>
          <p className="empty-title">
            {filter ==='done' ? 'Нет выполненных задач':
            filter ==='active' ? 'Все задачи выполнены!':
            'Добавьте первую задачу'}
          </p>
          <p className="empty-subtitle">
            {filter === 'all' ? 'Нажмите "Добавить" чтобы начать': ''}
          </p>
        </div>  
        ) : (
      <ul>
        {filteredTasks.map(function(task) {
          return (
            <li key={task.id} onClick={() => onToggle(task.id)}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggle(task.id)}
              />
              <span className={task.done ? 'completed' : ''}>
                 {task.priority === 'high' ? '🔴 ' : task.priority === 'low' ? '🟢 ' : '🟡 '}
                   {task.text}
                </span>
              {task.date && (
                <div className="task-meta">
                  <span className="task-date">
                  📅{new Date(task.date + 'T00:00:00').toLocaleDateString('ru-RU', {
                    day:'numeric',
                    month:'long',
                    year:'numeric'
                  })}
                  </span>
                  {task.time && (
                    <span className="task-time">
                      🕰️{task.time}
                      </span>
                  )}
                </div>
              )}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(task.id)
                }}
              >✕</button>
            </li>
          )
        })}
      </ul>
     )}
    </section>
  )
}

export default TaskList