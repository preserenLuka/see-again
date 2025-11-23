import React, { useRef } from "react";

type ClassItem = {
  id: string;
  name: string;
};

interface Props {
  classes: ClassItem[];
  selectedId?: string;
  onSelect?: (id: string) => void; // pass "" to clear selection
}

const ClassesBar: React.FC<Props> = ({ classes, selectedId, onSelect }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // 🔹 When focus ENTERS this nav from outside, clear the active class
  const handleNavFocusCapture: React.FocusEventHandler<HTMLDivElement> = (
    e
  ) => {
    const prev = e.relatedTarget as HTMLElement | null;

    if (!navRef.current) return;

    // If previous focused element is NOT inside this nav,
    // it means we're coming from another layer (above/below)
    const isComingFromOutside = !prev || !navRef.current.contains(prev);

    if (isComingFromOutside) {
      onSelect?.(""); // clear active class selection
    }
  };

  return (
    <nav
      aria-label="Classes"
      ref={navRef}
      className="flex gap-3 p-4 overflow-x-auto items-center w-full max-w-6xl mx-auto hide-scrollbar border-y border-gray-300"
      style={{ WebkitOverflowScrolling: "touch" }}
      onFocusCapture={handleNavFocusCapture}
    >
      {classes.map((c, idx) => {
        const isSelected = selectedId === c.id;

        return (
          <button
            key={c.id}
            type="button"
            ref={(el) => {
              pillRefs.current[idx] = el;
            }}
            className={`flex-shrink-0 px-4 py-2 black-white-style ${
              isSelected ? "active" : ""
            }`}
            aria-pressed={isSelected}
            onClick={() => onSelect?.(c.id)}
            onFocus={() => handleFocus(idx)}
            tabIndex={0}
          >
            {c.name}
          </button>
        );
      })}
    </nav>
  );
};

export default ClassesBar;
