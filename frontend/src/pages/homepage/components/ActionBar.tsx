import React from "react";
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
  const actions = [
    {
      id: "notes",
      label: "My notes",
      icon: FaBook,
      onClick: onMyNotes,
    },
    {
      id: "record",
      label: "Record lecture",
      icon: FaMicrophone,
      onClick: onRecordLecture,
    },
    {
      id: "add",
      label: "Add notes",
      icon: FaPen,
      onClick: onAddNotes,
    },
    {
      id: "custom",
      label: "Customize",
      icon: FaWrench,
      onClick: onCustomize,
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
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-6 rounded-lg border-2 border-gray-300 bg-white text-gray-900 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
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
