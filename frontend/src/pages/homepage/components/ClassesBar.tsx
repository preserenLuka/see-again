import React from "react";
import styles from "./classesBar.module.css";

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
  return (
    <nav aria-label="Classes" className={styles.container}>
      {classes.map((c) => {
        const isSelected = selectedId === c.id;
        const className = `${styles.pill} ${isSelected ? styles.active : ""}`;

        return (
          <button
            key={c.id}
            type="button"
            className={className}
            aria-pressed={isSelected}
            onClick={() => onSelect?.(c.id)}
          >
            {c.name}
          </button>
        );
      })}
    </nav>
  );
};

export default ClassesBar;
