import { useEffect, useState } from "react";
import iconSun from "../assets/icon-sun.svg";
import iconMoon from "../assets/icon-moon.svg";

export function ThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const text = theme === "light" ? "Dark" : "Light";
  const icon = theme === "light" ? iconMoon : iconSun;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button className="theme-toggle" type="button" onClick={() => switchTheme()}>
      {text}
      <img src={icon} alt="" />
    </button>
  );
}
