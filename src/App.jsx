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
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Купить продукты', done: false },
      { id: 2, text: 'Сделать зарядку', done: false },
      { id: 3, text: 'Прочитать 10 страниц', done: false },
      { id: 4, text: 'Поспать в обед', done: false }
    ]
  })

  const [inputValue, setInputValue] = useState('')
  const [dateValue, setDataValue] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [filter, setFilter] = useState('all')

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
      date: dateValue
    }])
    setInputValue('')
    setDataValue('')
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

  function clearTask () {
    if (window.confirm('Удалить все задачи?')){
      setTasks([])
    }
  }

  return (
    <div>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={
          <main id="app">
            <Progress tasks={tasks} />
            <TaskForm 
            inputValue={inputValue}
            onInputChange={setInputValue}
            onAddTask={addTask}
            dateValue={dateValue}
            onDateChange={setDataValue}
            />
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              filter={filter}
              onFilterChange={setFilter}
            />
          </main>
        } />
        <Route path="/stats" element={<Stats tasks={tasks} />} />
        <Route path="/settings" element={<Settings
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onClearTasks={clearTask}
         />
        }/>
      </Routes>
    </div>
  )
}

export default App