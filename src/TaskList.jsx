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
                {task.text}
              </span>
              {task.date && <span className="task-date">📅{task.date}</span>}
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
    </section>
  )
}

export default TaskList