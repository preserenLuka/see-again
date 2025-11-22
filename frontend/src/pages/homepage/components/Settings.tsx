import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import type { Theme, CharacterHeight } from "../../../context/ThemeContext";

const Settings: React.FC = () => {
  const { theme, setTheme, characterHeight, setCharacterHeight } = useTheme();

  return (
    <div className="border-y border-border flex flex-col py-6 gap-8">
      <div>
        <h2 className="text-3xl font-bold text-primary-text mb-4">Font size</h2>
        <select
          value={characterHeight}
          onChange={(e) =>
            setCharacterHeight(e.target.value as CharacterHeight)
          }
          className="black-white-style px-4 py-2 w-full max-w-xs"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-primary-text mb-4">
          Theme color
        </h2>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="black-white-style px-4 py-2 w-full max-w-xs"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
