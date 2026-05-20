import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header({ isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header id="main-header">
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">FocusFlow</span>
      </div>
      <nav className= {`nav ${menuOpen ? 'nav-open' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={() => setMenuOpen(false)}
        >Задачи</NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={() => setMenuOpen(false)}
        >Статистика</NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={() => setMenuOpen(false)}
        >Настройки</NavLink>
      </nav>
      <div className="header-right">
        <button id="theme-toggle" onClick={onToggleTheme}>
        {isDark ? '🥮' : '☀️'}
      </button>
      <button
      className='burger'
      onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '❌': '☰'}
      </button>
      </div>
    </header>
  )
}

export default Header



 