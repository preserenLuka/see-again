import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from '../pages/homepage/homepage.module.css'; // Keeping this for now if MainLayout uses other styles, but ideally should have its own

const MainLayout: React.FC = () => {


  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
