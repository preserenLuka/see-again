import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "light" | "dark" | "blue";
export type CharacterHeight = "small" | "medium" | "large";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  characterHeight: CharacterHeight;
  setCharacterHeight: (height: CharacterHeight) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to 'light' and 'medium' if no local storage (optional persistence can be added later)
  const [theme, setTheme] = useState<Theme>("light");
  const [characterHeight, setCharacterHeight] =
    useState<CharacterHeight>("medium");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-char-height", characterHeight);
  }, [theme, characterHeight]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, characterHeight, setCharacterHeight }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
