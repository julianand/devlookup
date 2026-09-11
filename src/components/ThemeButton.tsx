import { useEffect, useState, type MouseEvent } from 'react'
import Icon from './Icon.tsx'
import './ThemeButton.css'

function ThemeButton() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false) ? 'dark' : 'light',
  )
  const text = theme === 'light' ? 'Dark' : 'Light'
  const icon = theme === 'light' ? 'moon' : 'sun'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function switchTheme(event: MouseEvent<HTMLButtonElement>) {
    // This blur is to fix a bug where after a click and opening/closing devtools, the theme switches.
    event.currentTarget.blur()
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
