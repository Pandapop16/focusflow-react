function Stats ({tasks}) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const active = total - done
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const high = tasks.filter(t => t.priority === 'high').length
  const medium = tasks.filter(t => t.priority ==='medium').length
  const low = tasks.filter(t => t.priority ==='low').length

  return (
    <main id="app">
      <section className="card">
        <h2>Общая статистика</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Всего задач</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{color: '#4caf50'}}>{done}</span>
            <span className="stat-label">Выполнено</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{color: '#e94560'}}>{active}</span>
            <span className="stat-label">Активных</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{percent}%</span>
            <span className="stat-label">Продуктивность</span>
          </div>
        </div>

        <div className="progress-bar-wrapper">
          <div
          className="progress-bar-fill"
          style={{width: `${percent}`}}
          ></div>
        </div>
      </section>

      <section className="card">
        <h2>По приоритетам</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">🔴{high}</span>
            <span className="stat-label">Высокий</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">🟡{medium}</span>
            <span className="sta-label">Средний</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">🟢{low}</span>
            <span className="stat-label">Низкий</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Stats