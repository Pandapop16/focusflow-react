function Progress({tasks}) {
  const total = tasks.length
  const done = tasks.filter(task => task.done).length
  const percent = total === 0 ? 0: Math.round((done / total) * 100)

  return (
    <section className="card">
      <h2>Сегодняшний прогресс</h2>
      <p>Выполнено: {done} из {total}</p>
      <p>Продуктивность: {percent}%</p>
    </section>
  )
}

export default Progress