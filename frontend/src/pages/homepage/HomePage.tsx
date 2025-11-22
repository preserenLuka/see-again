import React, { useState } from "react";
import SearchBar from "./components/search";
import ActionBar from "./components/ActionBar";
import ClassesBar from "./components/ClassesBar";
import QuickView from "./components/QuickView";
import HomePageHeader from "./components/HomePageHeading";
import AddClass from "./components/AddClass";
import { getClasses } from "../../api/classesApi"
import { useAuthStore } from "../../store/authStore"
// API not ready yet — keep call for later
// import { getClasses as fetchClasses } from "../../api/classesApi";

type Class = {
  id: string;
  name: string;
};
type ViewMode = "none" | "notes" | "record" | "add" | "custom";


const HomePage: React.FC = () => {
  const [classList, setClassList] = useState<Class[]>([]);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [view, setView] = useState<ViewMode>("none");
  const { user } = useAuthStore();
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
      <div className="w-full max-w-6xl space-y-4">
        <HomePageHeader />
        <SearchBar />
        <ActionBar 
          onMyNotes={async () => {
            if(!user?.id) return;
            const response = await getClasses(user.id);
            setClassList(response.data)
            setView("notes")
          }}
          onRecordLecture={() => setView("record")}
          onAddNotes={() => setView("add")}
          onCustomize={() => setView("custom")}
            />
      </div>
      {view === "notes" &&
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
      }
      {view === "add" && 
      <div className="space-y-4 p-6">
        <AddClass />
      </div>
      }
    </div>
  );
};

export default HomePage;
