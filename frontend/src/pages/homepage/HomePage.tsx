import React, { useState } from "react";
import styles from "./homepage.module.css";
import SearchBar from "./components/search";
import ClassesBar from "./components/ClassesBar";
// API not ready yet — keep call for later
// import { getClasses as fetchClasses } from "../../api/classesApi";

type Class = {
  id: string;
  name: string;
};

const HomePage: React.FC = () => {
  // Mock data while API is not available
  const mockClasses: Class[] = [
    { id: "1", name: "Matematika" },
    { id: "2", name: "Zgodovina" },
    { id: "3", name: "Umetnost" },
    { id: "4", name: "Fizika" },
    { id: "5", name: "Umetnostna zgodovina" },
    { id: "6", name: "Biologija" },
    { id: "7", name: "Kemija" },
    { id: "8", name: "Geografija" },
  ];

  const [classList] = useState<Class[]>(mockClasses);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  /*
  // Uncomment when API is implemented
  const loadClasses = async () => {
    try {
      const response = await fetchClasses();
      const classes: Class[] = response?.data ?? [];
      setClassList(classes);
    } catch (error: any) {
      console.error("Error getting classes:", error);
      alert(error.response?.data?.message || "Failed to get classes");
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);
  */

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.classesBarContainer}>
        <ClassesBar
          classes={classList}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      </div>
    </>
  );
};

export default HomePage;
