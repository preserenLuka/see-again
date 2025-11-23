import React, { useState } from "react";
import { createLecture } from "../../../api/lectureApi";
import TagInput from "./TagInput";

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
  const [content, setContent] = useState("")
  const [topics, setTopics] = useState<string[]>([]);

  const handleSave = async () => {
    try {
      await createLecture({
        title: title,
        date: new Date().toISOString(),
        description: description,
        content: content,
        classId: classId,
        topics: topics,
      });

      setIsCreating(false);
      setTitle("");
      setDescription("");
      setTopics([]);
      setContent("")
      if (onLectureCreated) {
        onLectureCreated();
      }
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
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
      <TagInput tags={topics} setTags={setTopics} />
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-semibold">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 min-h-[120px] black-white-style"
          placeholder="Enter lecture description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-semibold">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 min-h-[260px] black-white-style"
          placeholder="Enter lecture content"
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
