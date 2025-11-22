import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../homepage.module.css';

interface ClassItem {
  id: string;
  name: string;
}

interface ClassHistoryProps {
  history: ClassItem[];
}

const ClassHistory: React.FC<ClassHistoryProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className={styles.historyContainer}>
      {history.map((item) => (
        <Link key={item.id} to={`/class/${item.id}`} className={styles.historyCard}>
          <span className={styles.historyName}>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default ClassHistory;
