import express from "express";
import {
    getLecturesList,
    createLecture,
    getLectureById,
    searchLecture
} from "../controllers/lectureController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createLecture);
router.get("/class/:id", authMiddleware, getLecturesList);
router.get("/:id", authMiddleware, getLectureById);
router.post("/search/lectures/:id", authMiddleware, searchLecture);

export default router;