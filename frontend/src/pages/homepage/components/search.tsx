import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto flex items-center gap-3 px-4">
      <input
        type="text"
        className="flex-1 px-6 py-4 rounded-lg border-2 border-border bg-primary-bg text-primary-text placeholder-secondary-text font-medium focus:outline-none hover:bg-primary-text hover:text-primary-bg hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
        placeholder="Search for classes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        aria-label="Open chatbot"
        className="flex items-center justify-center px-6 py-4 rounded-lg border-2 border-border bg-primary-bg text-primary-text font-medium focus:outline-none hover:bg-primary-text hover:text-primary-bg hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
