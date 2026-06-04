import { useState } from 'react'

function Settings({ isDark, onToggleTheme, onClearTasks, pin, onSetPin }) {
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinMessage, setPinMessage] = useState('')

  function handleSetPin() {
    if (newPin.length < 4) {
      setPinMessage('PIN должен быть минимум 4 цифры')
      return
    }
    if (newPin !== confirmPin) {
      setPinMessage('PIN не совпадает')
      return
    }
    onSetPin(newPin)
    setNewPin('')
    setConfirmPin('')
    setPinMessage('PIN успешно установлен! ✅')
    setTimeout(() => setPinMessage(''), 3000)
  }

  function handleRemovePin() {
    onSetPin('')
    setPinMessage('PIN удалён')
    setTimeout(() => setPinMessage(''), 3000)
  }

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
            {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Безопасность</h2>
        <div className="settings-item">
          <div className="settings-info">
            <span className="settings-title">PIN код</span>
            <span className="settings-desc">
              {pin ? 'PIN установлен 🔒' : 'PIN не установлен'}
            </span>
          </div>
          {pin && (
            <button className="settings-btn danger" onClick={handleRemovePin}>
              Удалить PIN
            </button>
          )}
        </div>
        <div className="pin-setup">
          <input
            type="password"
            placeholder="Новый PIN (4-6 цифр)"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
          />
          <input
            type="password"
            placeholder="Повторите PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
          />
          {pinMessage && <p className="pin-message">{pinMessage}</p>}
          <button onClick={handleSetPin}>
            {pin ? '🔄 Изменить PIN' : '🔒 Установить PIN'}
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
            <span className="settings-title">Технологии</span>
            <span className="settings-desc">React, Vite, CSS Variables</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Settings