function Progress({tasks}) {
  const total = tasks.length
  const done = tasks.filter (t => t.done).length
  const percent = total === 0 ? 0: Math.round((done / total) * 100)

  return (
    <section className="card">
      <h2>Сегодняшний прогресс</h2>
      <p>Выполнено: {done} из {total}</p>

      <div className="progress-bar-wrapper">
      <div 
      className="progress-bar-fill"
      style={{width: `${percent}%` }}
      ></div>
      </div>

      <p className="progress-percent">{percent}%</p>
    </section>
  )
}

export default Progress 