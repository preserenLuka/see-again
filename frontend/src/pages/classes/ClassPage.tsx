import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from './classpage.module.css';

interface ClassItem {
  id: string;
  name: string;
  date: string;
  topic: string;
}

const ClassPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'classes' | 'topics'>('classes');

  // Mock data
  const classes: ClassItem[] = [
    { id: '1', name: 'Math 101', date: '2023-10-01', topic: 'Algebra' },
    { id: '2', name: 'Physics 202', date: '2023-10-05', topic: 'Mechanics' },
    { id: '3', name: 'History', date: '2023-10-10', topic: 'World War II' },
    { id: '4', name: 'Chemistry', date: '2023-10-12', topic: 'Organic' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Classes</h1>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'classes' ? styles.toggleBtnActive : ''}`}
            onClick={() => setViewMode('classes')}
          >
            Classes
          </button>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'topics' ? styles.toggleBtnActive : ''}`}
            onClick={() => setViewMode('topics')}
          >
            Topics
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Add New Card */}
        <div className={`${styles.card} ${styles.addCard}`}>
          <FaPlus className={styles.addIcon} />
          <span>New Class</span>
        </div>

        {/* Class Cards */}
        {classes.map((cls) => (
          <div key={cls.id} className={styles.card}>
            <div>
              <div className={styles.cardTitle}>{cls.name}</div>
              <div className={styles.cardMeta}>{cls.topic}</div>
            </div>
            <div className={styles.cardMeta}>{cls.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
