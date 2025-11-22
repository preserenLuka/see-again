import React, { useState } from "react";
import SearchBar from "./components/search";
import ActionBar from "./components/ActionBar";
import ClassesBar from "./components/ClassesBar";
import QuickView from "./components/QuickView";
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
    { id: "9", name: "test1" },
    { id: "10", name: "test2" },
    { id: "11", name: "test3" },
    { id: "12", name: "test4" },
    { id: "13", name: "test5" },
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-start pt-8 px-4">
      <div className="w-full max-w-3xl space-y-4">
        <SearchBar />
        <ActionBar />
      </div>
      <div className="w-full max-w-6xl space-y-4">
        <div className="flex justify-center mt-6">
          <ClassesBar
            classes={classList}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
        </div>
        <QuickView />
      </div>
    </div>
  );
};

export default HomePage;
