function Settings ({isDark, onToggleTheme, onClearTasks}) {
  return (
    <main id="app">
        <section className="card">
          <h2>Внешний вид</h2>
          <div className="settings-item">
            <div className="settings-info">
              <span className="settings-title">Тема оформления</span>
              <span className="settings-desc">
                {isDark ? 'Тёмная тема включена' : 'Светлая тема включена'}
              </span>
            </div>
            <button className="settings-btn" onClick={onToggleTheme}>
              {isDark ? '☀️ Светлая' : '🌑 Тёмная'}
            </button>
          </div>
        </section>

        <section className="card">
          <h2>Данные</h2>
          <div className="settings-item">
            <div className="settings-info">
              <span className="settings-title">Очистить задачи</span>
              <span className="settings-desc">Удалить все задачи без возможности восстановления</span>
            </div>
            <button className="settings-btn danger" onClick={onClearTasks}>
              🗑️ Удалить
            </button>
          </div>
        </section>
        <section className="card">
          <h2>О приложении</h2>
          <div className="settings-item">
            <div className="settings-info">
              <span className="settings-title">FocusFlow</span>
              <span className="settings-desc">Версия 1.0.0</span>
            </div>
          </div>
          <div className="settings-item">
            <div className="settings-info">
              <span className="settings-title">Разработчик</span>
              <span className="settings-desc">Pandapop</span>
            </div>
          </div>
          <div className="settings-item">
            <div className="settings-info">
              <span className="settings-title">Технoлогии</span>
              <span className="settings-desc">React, Vite, CSS Variables</span>
            </div>
          </div>
        </section>
    </main>
  )
}

export default Settings