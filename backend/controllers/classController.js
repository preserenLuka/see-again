import { Class } from "../models/Class.js";

export const createClass = async (req, res) => {
  try {
    const { name, studyYear, userId } = req.body;

    const newClass = await Class.create({
      name,
      studyYear,
      user: userId,
    });

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to create class",
      error: err.message,
    });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Class.findById(id);

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(foundClass);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch class",
      error: err.message,
    });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ user: req.params.id });
    res.status(200).json(classes);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch classes",
      error: err.message,
    });
  }
};