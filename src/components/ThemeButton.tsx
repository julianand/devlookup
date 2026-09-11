import { useEffect, useState } from 'react'
import Icon from './Icon.tsx'
import './ThemeButton.css'

function ThemeButton() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const text = theme === 'light' ? 'Dark' : 'Light'
  const icon = theme === 'light' ? 'moon' : 'sun'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function switchTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button className="theme-toggle" type="button" onClick={switchTheme}>
      {text}
      <Icon name={icon} />
    </button>
  )
}

export default ThemeButton
