import React, { useEffect, useState } from "react";
import { getLectures } from "../../../api/lectureApi";
import CreateNewLecture from "./createNewLecture";

interface QuickViewItem {
  id: string;
  title: string;
  description: string;
  date: string;
  topics: string[];
}
type QuickViewProps = {
  classId: string;
};

const QuickView: React.FC<QuickViewProps> = ({ classId }) => {
  const [lectureList, setLectureList] = useState<QuickViewItem[]>([]);
  const loadLectures = async () => {
    try {
      const response = await getLectures(classId);
      console.log(response.data);
      console.log(lectureList);
      setLectureList(response.data);
      console.log(lectureList);

    } catch (err) {
      console.error("Error fetching lectures:", err);
    }
  };

  useEffect(() => {
  console.log("lectureList updated:", lectureList);
}, [lectureList]);
  useEffect(() => {
    if (classId) {
      loadLectures();
    }
  }, [classId]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
       <CreateNewLecture 
        onLectureCreated={loadLectures}
        classId={classId}
      />
      {lectureList.map((item, index) => {
        const dateObj = new Date(item.date);
        const monthYear = dateObj.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        const prevItem = lectureList[index - 1];
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
              <h2 className="text-3xl font-bold text-primary-text mb-6 mt-8 first:mt-0">
                {monthYear}
              </h2>
            )}

            <div className="mb-6 last:mb-0">
              <button className="inline-block rounded-lg border-2 p-2 pl-8 pr-8 border-border bg-primary-bg text-primary-text font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors ">
                {item.title}
              </button>
              <p className="max-char-width text-primary-text text-lg mb-3 mt-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-6 text-secondary-text font-medium">
                <span className="py-0.5">{displayDate}</span>
                {item.topics.map((tag, i) => (
                  <span
                    className="border border-border rounded-lg px-2 py-0.5"
                    key={i}
                  >
                    {tag}
                  </span>
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
