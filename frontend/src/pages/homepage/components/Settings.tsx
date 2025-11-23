import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import type { Theme, CharacterHeight } from "../../../context/ThemeContext";

const Settings: React.FC = () => {
  const { theme, setTheme, characterHeight, setCharacterHeight } = useTheme();

  return (
    <div className="border-y border-border flex gap-12 py-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-text mb-4">Font size</h2>
        <div className="relative w-full max-w-xs">
          <select
            value={characterHeight}
            onChange={(e) =>
              setCharacterHeight(e.target.value as CharacterHeight)
            }
            className="black-white-style px-4 py-2 w-full appearance-none pr-10 peer"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 transition-transform duration-200 peer-focus:rotate-180" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-primary-text mb-4">
          Theme color
        </h2>
        <div className="relative w-full max-w-xs">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="black-white-style px-4 py-2 w-full appearance-none pr-10 peer"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 transition-transform duration-200 peer-focus:rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
