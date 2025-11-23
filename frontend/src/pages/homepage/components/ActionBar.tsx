import React, { useState } from "react";
import { FaBook, FaMicrophone, FaPen, FaWrench } from "react-icons/fa";

interface ActionBarProps {
  onMyNotes?: () => void;
  onRecordLecture?: () => void;
  onAddNotes?: () => void;
  onCustomize?: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onMyNotes,
  onRecordLecture,
  onAddNotes,
  onCustomize,
}) => {
  const [isActive, setActive] = useState<string>("");
  const actions = [
    {
      id: "notes",
      label: "My notes",
      icon: FaBook,
      onClick: () => {
        setActive("notes");
        onMyNotes?.();
      },
    },
    {
      id: "record",
      label: "Record lecture",
      icon: FaMicrophone,
      onClick: () => {
        setActive("record");
        onRecordLecture?.();
      },
    },
    {
      id: "add",
      label: "Add notes",
      icon: FaPen,
      onClick: () => {
        setActive("add");
        onAddNotes?.();
      },
    },
    {
      id: "custom",
      label: "Customize",
      icon: FaWrench,
      onClick: () => {
        setActive("custom");
        onCustomize?.();
      },
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl mx-auto flex gap-3 px-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex-1 flex flex-col items-center justify-center gap-2 px-6 py-6 black-white-style ${
                isActive === action.id ? "active" : ""
              }`}
            >
              <Icon size={24} />
              <span className="text-sm">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionBar;
