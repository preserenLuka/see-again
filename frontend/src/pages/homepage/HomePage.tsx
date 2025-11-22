import React, { useState } from 'react';
import ClassHistory from './components/ClassHistory';
import styles from './homepage.module.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for History (Last 3 accessed)
  const recentClasses = [
    { id: '1', name: 'Mathematics 101' },
    { id: '3', name: 'History of Art' },
    { id: '2', name: 'Physics 202' },
  ];

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Search icon could be positioned absolute inside wrapper if desired, 
              but for now input styling handles the look */}
        </div>
        
        <ClassHistory history={recentClasses} />
      </div>
    </>
  );
};

export default HomePage;
