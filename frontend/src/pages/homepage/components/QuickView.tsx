import React from "react";

interface QuickViewItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

const mockItems: QuickViewItem[] = [
  {
    id: "1",
    title: "Etruščani",
    description:
      "V tem predavanju smo izvedeli, da so Etruščani ali Etrurci bili predrimsko ljudstvo v osrednji Italiji.",
    date: "2025-12-15",
    tags: ["metapodatki", "45 min", "1300 besed"],
  },
  {
    id: "2",
    title: "Modern Art Movements",
    description: "Analysis of impressionism and post-impressionism styles.",
    date: "2025-12-10",
    tags: ["Art", "History"],
  },
  {
    id: "3",
    title: "Organic Chemistry Lab",
    description:
      "Notes on the synthesis of aspirin and purification techniques.",
    date: "2025-11-28",
    tags: ["Chemistry", "Lab"],
  },
  {
    id: "4",
    title: "World War II Overview",
    description: "Key events and turning points of the European theater.",
    date: "2025-11-15",
    tags: ["History", "WWII"],
  },
  {
    id: "5",
    title: "Introduction to Physics",
    description: "Basic concepts of motion, force, and energy.",
    date: "2025-10-20",
    tags: ["Physics", "Mechanics"],
  },
];

const QuickView: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {mockItems.map((item, index) => {
        const dateObj = new Date(item.date);
        const monthYear = dateObj.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        const prevItem = mockItems[index - 1];
        const prevDateObj = prevItem ? new Date(prevItem.date) : null;
        const prevMonthYear = prevDateObj
          ? prevDateObj.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })
          : null;

        const showHeader = monthYear !== prevMonthYear;

        // Format date for display (e.g., 22.10.2025)
        const displayDate = dateObj.toLocaleDateString("sl-SI");

        return (
          <div key={item.id} className="mb-8">
            {showHeader && (
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                {monthYear}
              </h2>
            )}

            <div className="mb-6 last:mb-0">
              <button className="inline-block rounded-lg border-2 p-2 border-gray-300 bg-white text-gray-900 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors ">
                {item.title}
              </button>
              <p className="max-char-width text-gray-800 text-lg mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-6 text-gray-600 font-medium">
                <span>{displayDate}</span>
                {item.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickView;
