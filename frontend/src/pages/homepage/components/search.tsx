import React, { useState } from "react";
import styles from "./search.module.css";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
