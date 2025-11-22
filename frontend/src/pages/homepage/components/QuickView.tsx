import React from "react";
import { FaClock, FaTag } from "react-icons/fa";

interface QuickViewItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lengthWords: number;
}

interface QuickViewSection {
  title: string;
  items: QuickViewItem[];
}

const mockData: QuickViewSection[] = [
  {
    title: "December 2025",
    items: [
      {
        id: "1",
        title: "Advanced Calculus Review",
        description:
          "Comprehensive review of derivatives and integrals for the final exam.",
        date: "2025-12-15",
        tags: ["Math", "Calculus", "Exam Prep"],
        lengthWords: 1200,
      },
      {
        id: "2",
        title: "Modern Art Movements",
        description: "Analysis of impressionism and post-impressionism styles.",
        date: "2025-12-10",
        tags: ["Art", "History"],
        lengthWords: 850,
      },
    ],
  },
  {
    title: "November 2025",
    items: [
      {
        id: "3",
        title: "Organic Chemistry Lab",
        description:
          "Notes on the synthesis of aspirin and purification techniques.",
        date: "2025-11-28",
        tags: ["Chemistry", "Lab"],
        lengthWords: 600,
      },
      {
        id: "4",
        title: "World War II Overview",
        description: "Key events and turning points of the European theater.",
        date: "2025-11-15",
        tags: ["History", "WWII"],
        lengthWords: 1500,
      },
    ],
  },
  {
    title: "October 2025",
    items: [
      {
        id: "5",
        title: "Introduction to Physics",
        description: "Basic concepts of motion, force, and energy.",
        date: "2025-10-20",
        tags: ["Physics", "Mechanics"],
        lengthWords: 950,
      },
    ],
  },
];

const QuickView: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {mockData.map((section, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-gray-200">
            {section.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {item.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-md text-gray-600 flex items-center gap-1"
                      >
                        <FaTag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock size={12} />
                    <span>{item.lengthWords} words</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Load More
        </button>
      </div>
    </div>
  );
};

export default QuickView;
