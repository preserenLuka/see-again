import React, { useState, useRef, useEffect } from "react";
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

  // 🔹 Refs for sections we want to focus
  const notesSectionRef = useRef<HTMLDivElement | null>(null);
  const recordSectionRef = useRef<HTMLDivElement | null>(null);
  const addSectionRef = useRef<HTMLDivElement | null>(null);
  const customSectionRef = useRef<HTMLDivElement | null>(null);

  // 🔹 When `view` changes, move focus into the corresponding section
  useEffect(() => {
    if (view === "notes" && notesSectionRef.current) {
      notesSectionRef.current.focus();
    } else if (view === "record" && recordSectionRef.current) {
      recordSectionRef.current.focus();
    } else if (view === "add" && addSectionRef.current) {
      addSectionRef.current.focus();
    } else if (view === "custom" && customSectionRef.current) {
      customSectionRef.current.focus();
    }
  }, [view]);

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
        <div
          ref={notesSectionRef}
          tabIndex={-1}
          role="region"
          aria-label="My notes section"
          className="w-full max-w-6xl space-y-4 outline-none"
        >
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
        <div
          ref={recordSectionRef}
          tabIndex={-1}
          role="region"
          aria-label="Record lecture section"
          className="w-full max-w-6xl space-y-4 p-6 outline-none"
        >
          <RecordNote />
        </div>
      )}

      {view === "add" && (
        <div
          ref={addSectionRef}
          tabIndex={-1}
          role="region"
          aria-label="Add class section"
          className="w-full max-w-6xl space-y-4 p-6 outline-none"
        >
          <AddClass />
        </div>
      )}

      {view === "custom" && (
        <div
          ref={customSectionRef}
          tabIndex={-1}
          role="region"
          aria-label="Settings section"
          className="w-full max-w-6xl space-y-4 p-6 outline-none"
        >
          <Settings />
        </div>
      )}
    </div>
  );
};

export default HomePage;
