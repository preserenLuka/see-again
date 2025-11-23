import { Lecture } from "../models/Lecture.js";


export const createLecture = async (req, res) => {
  try {
    const { classId, description, date, content, topics } = req.body;

    // Validate required fields
    if (!classId || !description || !date || !content) {
      return res.status(400).json({
        message: "classId, description, date, and content are required",
      });
    }

    const lecture = new Lecture({
      class: classId,
      description,
      date,
      content,
      topics: topics || [],
    });

    const savedLecture = await lecture.save();

    res.status(201).json(savedLecture);
  } catch (err) {
    res.status(400).json({
      message: "Failed to create lecture",
      error: err.message,
    });
  }
};

export const getLecturesList = async (req, res) => {
  try {
    const { classId } = req.params;
    const lectures = await Lecture.find({class: classId}, "description date")
      .sort({ date: -1 }); 

    res.status(200).json(lectures);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch lectures",
      error: err.message,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId).populate("class");

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json(lecture);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch lecture",
      error: err.message,
    });
  }
};