import React, { useRef } from "react";

type ClassItem = {
  id: string;
  name: string;
};

interface Props {
  classes: ClassItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const ClassesBar: React.FC<Props> = ({ classes, selectedId, onSelect }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Remove auto-focus on mount

  // Scroll focused pill into view, left-aligned
  const handleFocus = (idx: number) => {
    const pill = pillRefs.current[idx];
    if (pill) {
      pill.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <nav
      aria-label="Classes"
      ref={navRef}
      className="flex gap-3 p-4 overflow-x-auto items-center w-full max-w-6xl mx-auto hide-scrollbar border-y border-gray-300"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {classes.map((c, idx) => {
        const isSelected = selectedId === c.id;
        const base =
          "flex-shrink-0 px-4 py-2 rounded-full border-2 text-sm font-medium focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors";
        const normal =
          "border-border bg-primary-bg text-primary-text hover:bg-secondary-bg";
        const active = "bg-primary-text text-primary-bg border-primary-text";

        return (
          <button
            key={c.id}
            type="button"
            ref={(el) => {
              pillRefs.current[idx] = el;
            }}
            className={`flex-shrink-0 px-4 py-2 black-white-style`}
            aria-pressed={isSelected}
            onClick={() => onSelect?.(c.id)}
            onFocus={() => handleFocus(idx)}
            tabIndex={idx === 0 ? 0 : 0}
          >
            {c.name}
          </button>
        );
      })}
    </nav>
  );
};

export default ClassesBar;
