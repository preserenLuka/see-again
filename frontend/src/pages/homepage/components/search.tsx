import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto flex items-center gap-3 px-4">
      <input
        type="text"
        className="flex-1 px-6 py-4 black-white-style"
        placeholder="Search for classes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        aria-label="Open chatbot"
        className="flex items-center justify-center px-6 py-4 black-white-style"
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
