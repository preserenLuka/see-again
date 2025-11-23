import { Lecture } from "../models/Lecture.js";
import { Class } from "../models/Class.js";

export const createLecture = async (req, res) => {
  try {
    const { classId, description, date, content, topics, title } = req.body;

    // Validate required fields
    if (!classId || !description || !date || !content || !title) {
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
      title,
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
    const classId = req.params.id;

    const lectures = await Lecture.find({class: classId})
      .sort({ date: -1 }); 
    console.log(lectures);
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

export const searchLecture = async (req, res) => {
  try {
    const userId = req.params.id;
    const searchString = req.body.searchString;

    const classes = await Class.find(
      { user: userId },
      { _id: 1 }
    );

    const classIds = classes.map((c) => c._id);

    const TitleLectures = await Lecture.find({
      class: { $in: classIds },
      title: { $regex: searchString, $options: "i" }
    });

    if (TitleLectures){
      return res.json({ TitleLectures });
    }

    const tagLectures = await Lecture.find({
      class: { $in: classIds },
      topics: { $regex: searchString, $options: "i" }
    });

    return res.json({ tagLectures });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};