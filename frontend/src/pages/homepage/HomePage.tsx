import React, { useState } from "react";
import SearchBar from "./components/search";
import ActionBar from "./components/ActionBar";
import ClassesBar from "./components/ClassesBar";
import QuickView from "./components/QuickView";
import HomePageHeader from "./components/HomePageHeading";
import AddClass from "./components/AddClass";
import { getClasses } from "../../api/classesApi";
import { useAuthStore } from "../../store/authStore";
import Settings from "./components/Settings";
import RecordNote from "./components/RecordNote";

// API not ready yet — keep call for later
// import { getClasses as fetchClasses } from "../../api/classesApi";

type Class = {
  id: string;
  name: string;
};
type ViewMode = "none" | "notes" | "record" | "add" | "custom";

const HomePage: React.FC = () => {
  const [classList, setClassList] = useState<Class[]>([]);

  const [selectedId, setSelectedId] = useState<string>("");
  const [view, setView] = useState<ViewMode>("none");
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col items-center justify-start pt-8 px-4">
      <div className="w-full max-w-6xl space-y-4">
        <HomePageHeader />
        <SearchBar />
        <ActionBar
          onMyNotes={async () => {
            if (!user?.id) return;
            const response = await getClasses(user.id);
            setClassList(response.data);
            setView("notes");
          }}
          onRecordLecture={() => setView("record")}
          onAddNotes={() => setView("add")}
          onCustomize={() => setView("custom")}
        />
      </div>
      {view === "notes" && (
        <div className="w-full max-w-6xl space-y-4">
          <div className="flex justify-center mt-6">
            <ClassesBar
              classes={classList}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
          <QuickView classId={selectedId} />
        </div>
      )}
      {view === "record" && (
        <div className="space-y-4 p-6">
          <RecordNote />
        </div>
      )}
      {view === "add" && (
        <div className="space-y-4 p-6">
          <AddClass />
        </div>
      )}
      {view === "custom" && (
        <div className="space-y-4 p-6">
          <Settings />
        </div>
      )}
    </div>
  );
};

export default HomePage;
