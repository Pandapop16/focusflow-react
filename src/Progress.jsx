import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

function Progress({ tasks }) {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const prevPercentRef = useRef(percent)

  useEffect(() => {
    if (percent === 100 && prevPercentRef.current !== 100 && total > 0) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#a78bfa', '#ffffff', '#ffd700']
      })
    }
    prevPercentRef.current = percent
  }, [percent, total])

  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Сегодняшний прогресс</h2>
      <p>Выполнено: {done} из {total}</p>

      <div className="progress-bar-wrapper">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            backgroundColor: percent === 100 ? '#4caf50' :
                             percent >= 50 ? '#ff9800' :
                             'var(--color-accent)'
          }}
        ></motion.div>
      </div>

      <motion.p
        className="progress-percent"
        key={percent}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {percent === 100 ? '🎉 100%' : `${percent}%`}
      </motion.p>
    </motion.section>
  )
}

export default Progress