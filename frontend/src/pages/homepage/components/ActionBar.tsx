import React, { useState } from "react";
import { FaBook, FaMicrophone, FaWrench } from "react-icons/fa";

interface ActionBarProps {
  onMyNotes?: () => void;
  onRecordLecture?: () => void;
  onCustomize?: () => void;
}

type ActionId = "notes" | "record" | "custom";

const ActionBar: React.FC<ActionBarProps> = ({
  onMyNotes,
  onRecordLecture,
  onCustomize,
}) => {
  const [activeId, setActiveId] = useState<ActionId | "">("");

  const actions: {
    id: ActionId;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    handler?: () => void;
  }[] = [
    {
      id: "notes",
      label: "My Classes",
      icon: FaBook,
      handler: onMyNotes,
    },
    {
      id: "record",
      label: "Record lecture",
      icon: FaMicrophone,
      handler: onRecordLecture,
    },
    /*     {
      id: "add",
      label: "Add Class",
      icon: FaPen,
      handler: onAddNotes,
    }, */
    {
      id: "custom",
      label: "Customize",
      icon: FaWrench,
      handler: onCustomize,
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl mx-auto flex gap-3 px-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const isActive = activeId === action.id;

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                setActiveId(action.id);
                action.handler?.();
              }}
              onFocus={() => {
                setActiveId("");
              }}
              aria-pressed={isActive}
              className={`flex-1 flex flex-col items-center justify-center gap-2 px-6 py-6 black-white-style ${
                isActive ? "active" : ""
              }`}
            >
              <Icon size={24} aria-hidden="true" />
              <span className="text-sm">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionBar;
