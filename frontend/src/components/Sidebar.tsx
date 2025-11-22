import React from 'react';
import { FaHome, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

interface SidebarClass {
  id: string;
  name: string;
  date: string;
}

interface SidebarProps {
  classes: SidebarClass[];
}

const Sidebar: React.FC<SidebarProps> = ({ classes }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link to="/" className={styles.homeLink} aria-label="Home">
          <FaHome />
        </Link>
        {/* AI Assistant Button - Structurally here for accessibility */}
        <button className={styles.aiButton} aria-label="AI Assistant">
          <FaRobot />
        </button>
      </div>
      <div className={styles.sidebarContent}>
        <h2 className={styles.sidebarTitle}>Classes</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
             <Link to="/classes" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#007bff' }}>
              All Classes
            </Link>
          </li>
          {classes.map((cls) => (
            <li key={cls.id} style={{ marginBottom: '0.8rem' }}>
              <Link to={`/class/${cls.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ fontWeight: 500 }}>{cls.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{cls.date}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
