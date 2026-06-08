import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import TaskList from './TaskList'
import Progress from './Progress'
import Stats from './Stats'
import Settings from './Settings'
import TaskForm from './TaskForm'



function App() {
  const [tasks, setTasks] = useState(function() {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isDark, setIsDark] = useState(true)
  const [filter, setFilter] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [pin,setPin] = useState(localStorage.getItem('pin') || '')
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [category, setCategory] = useState('personal')


  function handleSetPin(newPin) {
    setPin(newPin)
    localStorage.setItem('pin', newPin)
  }

  function lockApp() {
    if(!pin) {
      alert('Сначала установите PIN в настройках')
      return
    }
    setIsLocked(true)
  }

  function unlockApp() {
    if (pinInput === pin) {
      setIsLocked(false)
      setPinInput('')
      setPinError(false)
    } else {
      setPinError(true)
      setPinInput('')
    }
  }

  useEffect(function() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function toggleTheme() {
    setIsDark(!isDark)
    document.body.classList.toggle('light-theme')
  }

  function addTask() {
    if (inputValue.trim() === '') return
    setTasks([...tasks, {
      id: Date.now(),
      text: inputValue,
      done: false,
      date: dateValue,
      time: timeValue,
      priority: priority,
      category: category,
      subtasks: []
    }])
    setInputValue('')
    setDateValue('')
    setTimeValue('')
    setPriority('medium')
    setCategory('personal')
  }

  function toggleTask(id) {
    setTasks(tasks.map(function(task) {
      if (task.id === id) return { ...task, done: !task.done }
      return task
    }))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(function(task) {
      return task.id !== id
    }))
  }

  function editTask(id, newText) {
    setTasks(tasks.map(function(task) {
      if (task.id === id) return {...task, text: newText}
      return task
    }))
  }

  function addSubtask(taskId,text) {
    setTasks(tasks.map(function(task) {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [
            ...(task.subtasks || []),
            {id: Date.now(), text:text, done: false}
          ]
        }
      }
      return task
    }))
  }

  function toggleSubtask(taskId,subtaskId) {
    setTasks(tasks.map(function(task){
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(function(sub) {
          if (sub.id === subtaskId) return {...sub, done: !sub.done}
          return sub
        })
        const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every(s => s.done)
        return {
          ...task, subtasks: updatedSubtasks,
          done: allDone
        }
      }
      return task
    }))
  }

  function deleteSubtask(taskId, subtaskId) {
    setTasks(tasks.map(function(task){
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter(function(sub) {
            return sub.id !== subtaskId
          })
        }
      }
      return task
    }))
  }

  function clearTask() {
    if (window.confirm('Удалить все задачи?')) {
      setTasks([])
    }
  }

  function exportTasks() {
    const text = tasks.map(function(task,i) {
      const status = task.done ? '✅' : '⬜'
      const priority = task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟡' 
      const date = task.date  ? `| ${new Date(task.date + 'T00:00:00').toLocaleDateString('ru-Ru')}` : ''
      const subtasks = task.subtasks && task.subtasks.length > 0
      ? '\n' + task.subtasks.map(s => ` ${s.done ? '✅' : '⬜'} ${s.text}`). join('\n')
      : ''
      return `${i + 1}. ${status} ${priority} ${task.text}${date}${subtasks}`
    }).join('\n\n')

    const blob = new Blob([text], {type: 'text/plan;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download ='focusflow-tasks.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
  <div>
    {isLocked ? (
      <div className="lock-screen">
        <div className="lock-card">
          <div className="lock-icon">🔒</div>
          <h2>FocusFlow заблокирован</h2>
          <p>Введите PIN для доступа</p>
          <input
            type="password"
            placeholder="Введите PIN..."
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && unlockApp()}
            maxLength={6}
            autoFocus
          />
          {pinError && <p className="pin-error">Неверный PIN</p>}
          <button onClick={unlockApp}>Разблокировать</button>
        </div>
      </div>
    ) : (
      <>
        <Header isDark={isDark} onToggleTheme={toggleTheme} onLock={lockApp} />
        <Routes>
          <Route path="/" element={
            <main id="app">
              <Progress tasks={tasks} />
              <TaskForm
                inputValue={inputValue}
                onInputChange={setInputValue}
                onAddTask={addTask}
                dateValue={dateValue}
                onDateChange={setDateValue}
                timeValue={timeValue}
                onTimeChange={setTimeValue}
                priority={priority}
                onPriorityChange={setPriority}
                formOpen={formOpen}
                onToggleForm={() => setFormOpen(!formOpen)}
                category={category}
                onCategoryChange={setCategory}
              />
              <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
                onAddSubtask={addSubtask}
                onToggleSubtask={toggleSubtask}
                onDeleteSubtask={deleteSubtask}
                filter={filter}
                onFilterChange={setFilter}
              />
            </main>
          } />
          <Route path="/stats" element={<Stats tasks={tasks} />} />
          <Route path="/settings" element={
            <Settings
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onClearTasks={clearTask}
              pin={pin}
              onSetPin={handleSetPin}
              onExport={exportTasks}
            />
          } />
        </Routes>
      </>
    )}
  </div>
)

}
export default App