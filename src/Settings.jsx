function Settings ({isDark, onToggleTheme, onClearTasks}) {
  return (
    <main id="app">
        <section className="card">
          <h2>Настройки</h2>
          <div style={{display: 'flex', flexDirection: 'colum', gap: '15px'}}>
            <div>
              <h3 style={{marginBottom: '8px', fontSize: '16px'}}>Тема</h3>
              <button onClick={onToggleTheme}>
                {isDark ? '☀️ Светлая тема': '🥮 Тёмная тема'}
              </button>
            </div>

            <div>
              <h3 style={{marginBottom: '8px', fontSize: '16px'}}>Данные</h3>
              <button
              onClick={onClearTasks}
              style={{backgroundColor: '#c73652'}} 
              >
                🗑️ Очистить все задачи
              </button>
            </div>
          </div>
        </section>
    </main>
  )
}

export default Settings