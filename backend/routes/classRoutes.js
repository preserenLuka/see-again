import express from "express";
import {
    createClass,
    getClassById,
    getAllClasses,
} from "../controllers/classController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createClass);
router.get("/user/:id", authMiddleware, getAllClasses);
router.get("/:id", authMiddleware, getClassById);

export default router;