import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto flex items-center gap-3 px-4">
      <input
        type="text"
        className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
        placeholder="Search for classes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        aria-label="Open chatbot"
        className="flex items-center justify-center px-6 py-4 rounded-lg border-2 border-gray-300 bg-white text-gray-900 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
