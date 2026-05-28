import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function TaskList({ tasks, onToggle, onDelete, onEdit, filter, onFilterChange }) {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [sortBy, setSortBy] = useState('none')

  const filteredTasks = tasks
    .filter(function(task) {
      if (filter === 'active') return !task.done
      if (filter === 'done') return task.done
      return true
    })
    .filter(function(task) {
      return task.text.toLowerCase().includes(search.toLowerCase())
    })

  const sortedTasks = [...filteredTasks].sort(function(a, b) {
    if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 }
      return order[a.priority] - order[b.priority]
    }
    if (sortBy === 'date') {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date) - new Date(b.date)
    }
    if (sortBy === 'name') {
      return a.text.localeCompare(b.text)
    }
    return 0
  })

  return (
    <section className="card">
      <h2>Задачи на сегодня</h2>

      <input
        placeholder="🔍 Поиск задач..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      <div className="sort-buttons">
        <span className="sort-label">Сортировка:</span>
        <button
          className={`filter-btn ${sortBy === 'none' ? 'active-filter' : ''}`}
          onClick={() => setSortBy('none')}
        >По умолчанию</button>
        <button
          className={`filter-btn ${sortBy === 'priority' ? 'active-filter' : ''}`}
          onClick={() => setSortBy('priority')}
        >По приоритету</button>
        <button
          className={`filter-btn ${sortBy === 'date' ? 'active-filter' : ''}`}
          onClick={() => setSortBy('date')}
        >По дате</button>
        <button
          className={`filter-btn ${sortBy === 'name' ? 'active-filter' : ''}`}
          onClick={() => setSortBy('name')}
        >По названию</button>
      </div>

      {sortedTasks.length === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="empty-icon">✅</p>
          <p className="empty-title">
            {filter === 'done' ? 'Нет выполненных задач' :
             filter === 'active' ? 'Все задачи выполнены!' :
             'Добавьте первую задачу'}
          </p>
          <p className="empty-subtitle">
            {filter === 'all' ? 'Нажмите "Добавить" чтобы начать' : ''}
          </p>
        </motion.div>
      ) : (
        <ul>
          <AnimatePresence>
            {sortedTasks.map(function(task) {
              return (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onToggle(task.id)}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                  />

                  {editingId === task.id ? (
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onEdit(task.id, editText)
                          setEditingId(null)
                        }
                        if (e.key === 'Escape') {
                          setEditingId(null)
                        }
                      }}
                      onBlur={() => {
                        onEdit(task.id, editText)
                        setEditingId(null)
                      }}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className={task.done ? 'completed' : ''}>
                      {task.priority === 'high' ? '🔴 ' : task.priority === 'low' ? '🟢 ' : '🟡 '}
                      {task.text}
                    </span>
                  )}

                  {task.date && (
                    <div className="task-meta">
                      <span className="task-date">
                        📅 {new Date(task.date + 'T00:00:00').toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      {task.time && (
                        <span className="task-time">
                          🕰️ {task.time}
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingId(task.id)
                      setEditText(task.text)
                    }}
                  >✏️</button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(task.id)
                    }}
                  >✕</button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  )
}

export default TaskList