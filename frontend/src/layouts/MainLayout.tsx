import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../pages/homepage/homepage.module.css'; // Keeping this for now if MainLayout uses other styles, but ideally should have its own

const MainLayout: React.FC = () => {
  // Mock data for Sidebar (All Classes) - Moved from HomePage
  const allClasses = [
    { id: '1', name: 'Mathematics 101', date: '2023-10-01' },
    { id: '2', name: 'Physics 202', date: '2023-10-05' },
    { id: '3', name: 'History of Art', date: '2023-10-10' },
    { id: '4', name: 'Chemistry', date: '2023-10-12' },
    { id: '5', name: 'Biology', date: '2023-10-15' },
  ];

  return (
    <div className={styles.container}>
      <Sidebar classes={allClasses} />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
