import React, { useState } from "react";
import styles from "./classdetails.module.css";

interface Lecture {
  id: string;
  title: string;
  date: string;
}

const ClassDetailsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"subject" | "topic">("subject");

  // Mock Data
  const classInfo = {
    name: "Mathematics 101",
    description:
      "Introduction to Algebra, Calculus, and Geometry. This course covers the fundamental concepts required for advanced mathematical studies.",
  };

  const lectures: Lecture[] = [
    { id: "1", title: "Lecture 1 - Introduction", date: "11.5.2023" },
    { id: "2", title: "Lecture 2 - Algebra Basics", date: "13.5.2023" },
    { id: "3", title: "Lecture 3 - Linear Equations", date: "15.5.2023" },
    { id: "4", title: "Lecture 4 - Quadratic Functions", date: "18.5.2023" },
    { id: "5", title: "Lecture 5 - Geometry Fundamentals", date: "20.5.2023" },
  ];

  const topics: Lecture[] = [
    { id: "t1", title: "Algebra", date: "Topic" },
    { id: "t2", title: "Geometry", date: "Topic" },
    { id: "t3", title: "Calculus", date: "Topic" },
    { id: "t4", title: "Trigonometry", date: "Topic" },
  ];

  const displayItems = viewMode === "subject" ? lectures : topics;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{classInfo.name}</h1>

        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleBtn} ${
              viewMode === "subject" ? styles.toggleBtnActive : ""
            }`}
            onClick={() => setViewMode("subject")}
          >
            Subject
          </button>
          <button
            className={`${styles.toggleBtn} ${
              viewMode === "topic" ? styles.toggleBtnActive : ""
            }`}
            onClick={() => setViewMode("topic")}
          >
            Topic
          </button>
        </div>
      </header>

      {/* Description */}
      <p className={styles.description}>{classInfo.description}</p>

      {/* Content Grid */}
      <div className={styles.grid}>
        {displayItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardTitle}>{item.title}</div>
            <div className={styles.cardDate}>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetailsPage;
