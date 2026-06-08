import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function TaskList({ tasks, onToggle, onDelete, onEdit, onAddSubtask, onToggleSubtask, onDeleteSubtask, filter, onFilterChange }) {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [sortBy, setSortBy] = useState('none')
  const [subtaskInputId, setSubtaskInputId] = useState(null)
  const [subtaskText, setSubtaskText] = useState('')
  const [collapsedTasks, setCollapsedTasks] = useState({})

  function toggleCollapse(taskId) {
    setCollapsedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const filteredTasks = tasks
    .filter(function(task) {
      if (filter === 'active') return !task.done
      if (filter === 'done') return task.done
      return true
    })
    .filter(function(task) {
      return task.text.toLowerCase().includes(search.toLowerCase())
    })

  const sortedTasks = sortBy === 'none' ? filteredTasks : [...filteredTasks].sort(function(a, b) {
    if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 }
      return order[a.priority] - order[b.priority]
    }
    if (sortBy === 'date') {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date) - new Date(b.date)
    }
    if (sortBy === 'name') return a.text.localeCompare(b.text)
    return 0
  })

  return (
    <section className="card">
      <h2>Задачи на сегодня</h2>

      <input placeholder="🔍 Поиск задач..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="filters">
        <button className={`filter-btn ${filter === 'all' ? 'active-filter' : ''}`} onClick={() => onFilterChange('all')}>Все</button>
        <button className={`filter-btn ${filter === 'active' ? 'active-filter' : ''}`} onClick={() => onFilterChange('active')}>Активные</button>
        <button className={`filter-btn ${filter === 'done' ? 'active-filter' : ''}`} onClick={() => onFilterChange('done')}>Выполненные</button>
      </div>

      <div className="sort-buttons">
        <span className="sort-label">Сортировка:</span>
        <button className={`filter-btn ${sortBy === 'none' ? 'active-filter' : ''}`} onClick={() => setSortBy('none')}>По умолчанию</button>
        <button className={`filter-btn ${sortBy === 'priority' ? 'active-filter' : ''}`} onClick={() => setSortBy('priority')}>По приоритету</button>
        <button className={`filter-btn ${sortBy === 'date' ? 'active-filter' : ''}`} onClick={() => setSortBy('date')}>По дате</button>
        <button className={`filter-btn ${sortBy === 'name' ? 'active-filter' : ''}`} onClick={() => setSortBy('name')}>По названию</button>
      </div>

      {sortedTasks.length === 0 ? (
        <motion.div className="empty-state" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <p className="empty-icon">✅</p>
          <p className="empty-title">
            {filter === 'done' ? 'Нет выполненных задач' : filter === 'active' ? 'Все задачи выполнены!' : 'Добавьте первую задачу'}
          </p>
          <p className="empty-subtitle">{filter === 'all' ? 'Нажмите "Добавить" чтобы начать' : ''}</p>
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
                  style={{ flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <div className="task-row" onClick={() => onToggle(task.id)}>
                    <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />

                    {editingId === task.id ? (
                      <input
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { onEdit(task.id, editText); setEditingId(null) }
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                        onBlur={() => { onEdit(task.id, editText); setEditingId(null) }}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className={task.done ? 'completed' : ''}>
                        {task.priority === 'high' ? '🔴 ' : task.priority === 'low' ? '🟢 ' : '🟡 '}
                        {task.category === 'work' ? '💼 ' : task.category === 'health' ? '💪 ' : task.category === 'study' ? '📚 ' : '👤 '}
                        {task.text}
                      </span>
                    )}

                    {task.date && (
                      <div className="task-meta">
                        <span className="task-date">📅 {new Date(task.date + 'T00:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        {task.time && <span className="task-time">🕰️ {task.time}</span>}
                      </div>
                    )}

                    <button className="subtask-add-btn" onClick={(e) => { e.stopPropagation(); setSubtaskInputId(subtaskInputId === task.id ? null : task.id); setSubtaskText('') }}>➕</button>
                    <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setEditingId(task.id); setEditText(task.text) }}>✏️</button>
                    <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}>✖️</button>
                  </div>

                  {subtaskInputId === task.id && (
                    <div className="subtask-input-row" onClick={(e) => e.stopPropagation()}>
                      <input
                        placeholder="Введите подзадачу..."
                        value={subtaskText}
                        onChange={(e) => setSubtaskText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && subtaskText.trim()) {
                            onAddSubtask(task.id, subtaskText.trim())
                            setSubtaskText('')
                            setSubtaskInputId(null)
                          }
                          if (e.key === 'Escape') setSubtaskInputId(null)
                        }}
                        autoFocus
                      />
                      <button onClick={() => {
                        if (subtaskText.trim()) {
                          onAddSubtask(task.id, subtaskText.trim())
                          setSubtaskText('')
                          setSubtaskInputId(null)
                        }
                      }}>Добавить</button>
                    </div>
                  )}

                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="task-progress">
                      <div className="task-progress-fill" style={{ width: `${Math.round((task.subtasks.filter(s => s.done).length / task.subtasks.length) * 100)}%` }}></div>
                    </div>
                  )}

                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="subtask-section">
                      <div className="subtask-header" onClick={(e) => { e.stopPropagation(); toggleCollapse(task.id) }}>
                        <span className="subtask-counter">
                          {collapsedTasks[task.id] ? '▶' : '▼'} Подзадачи — {task.subtasks.filter(s => s.done).length} из {task.subtasks.length}
                        </span>
                      </div>
                      {!collapsedTasks[task.id] && (
                        <ul className="subtask-list">
                          {task.subtasks.map(function(sub) {
                            return (
                              <li key={sub.id} className="subtask-item">
                                <input type="checkbox" checked={sub.done} onChange={(e) => { e.stopPropagation(); onToggleSubtask(task.id, sub.id) }} />
                                <span className={sub.done ? 'completed' : ''} style={{ cursor: 'pointer', flex: 1 }} onClick={(e) => { e.stopPropagation(); onToggleSubtask(task.id, sub.id) }}>{sub.text}</span>
                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDeleteSubtask(task.id, sub.id) }}>✖️</button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  )}
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