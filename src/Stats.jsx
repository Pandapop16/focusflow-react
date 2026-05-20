function Stats({tasks}) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const active = total - done
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <main id="app">
      <section className="card">
        <h2>Статистика</h2>
        <p>Всего задач:{total}</p>
        <p>Выполнено:{done}</p>
        <p>Активных:{active}</p>
        <p>Продуктивность:{percent}%</p>
      </section>
    </main>
  )
}

export default Stats