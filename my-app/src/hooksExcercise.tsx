import { useContext, useState } from "react";
import { ThemeContext, themes } from "./themeContext";

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        style={{
          backgroundColor: currentTheme.background,
          color: currentTheme.foreground,
        }}
      >
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;
