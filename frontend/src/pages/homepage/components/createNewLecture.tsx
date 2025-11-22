import React, { useState } from "react";
import { createLecture } from "../../../api/lectureApi";

type Class = {
  name: string;
  studyYear: string;
  classId: string;
};

interface CreateNewLectureProps {
  onLectureCreated?: () => void;
  classId: string
}

const CreateNewLecture: React.FC<CreateNewLectureProps> = ({
  onLectureCreated,
  classId,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateLecture = async (data: Class) => {
    try {
      const response = await createLecture({
        name: data.name,
        studyYear: data.studyYear,
        classId: classId,
      });

      console.log("Lecture created:", response.data);
      setIsCreating(false);
      setTitle("");
      setDescription("");
      if (onLectureCreated) {
        onLectureCreated();
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  const handleSave = () => {
    handleCreateLecture({
      name: title,
      studyYear: "2025",
      classId: classId,
    });
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="mb-8 px-6 py-2 black-white-style"
      >
        Create New Lecture
      </button>
    );
  }

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-[650] text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 black-white-style"
          placeholder="Enter lecture title"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-1 font-semibold">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 min-h-[120px] black-white-style"
          placeholder="Enter lecture description"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsCreating(false)}
          className="px-4 py-2 black-white-style"
        >
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 black-white-style">
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateNewLecture;
